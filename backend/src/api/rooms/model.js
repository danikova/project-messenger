const mongoose = require('mongoose');
const RoomSchema = require('./schema');
const generateColors = require('../../shared/random.color');
const Message = require('../messages/model');
const SocketGlobals = require('../../socket/SocketGlobals');

RoomSchema.statics = {
    create: async function (data) {
        const randomColor = generateColors();
        data.color = {
            primary: randomColor.primary,
            secondary: randomColor.secondary,
        };
        const room = new this(data);
        await room.save();
        return room;
    },
    get: async function (query) {
        return await this.find(query);
    },
    getById: async function (id) {
        return await this.findOne({ _id: id });
    },
    update: async function (query, updateData) {
        return await this.findOneAndUpdate(
            query,
            { $set: updateData },
            { new: true },
        );
    },
    delete: async function (query) {
        return await this.findOneAndDelete(query);
    },
};

RoomSchema.methods = {
    addUser: async function (user) {
        if (this.activeUsers.indexOf(user.id) < 0) {
            this.activeUsers.push(user);
            await this.pushMessage({
                message: `'${user.username}' is joined the room.`,
            });
            if (user.id in SocketGlobals.activeUsers)
                SocketGlobals.activeUsers[user.id].joinRoom(this);
        }
    },
    removeUser: async function (user) {
        if (0 <= this.activeUsers.indexOf(user.id)) {
            this.activeUsers.pull(user.id);
            if (this.activeUsers.length === 0) {
                await RoomsModel.deleteOne({ _id: this.id });
                return false;
            } else {
                await this.pushMessage({
                    message: `'${user.username}' is leaved the room.`,
                });
            }
        }
        return true;
    },
    pushMessage: async function (messageData, socket = null) {
        messageData.number = this.messages.length;
        const message = await Message.create(messageData);
        this.messages.push(message);
        const messageJson = message.toJSON();
        if (this.id in SocketGlobals.activeRooms) {
            SocketGlobals.activeRooms[this.id].forEach((s) => {
                if (s !== socket) {
                    s.emit('newMessage', {
                        roomId: this.id,
                        message: messageJson,
                    });
                }
            });
        }
        return message;
    },
};

const RoomsModel = mongoose.model('Rooms', RoomSchema);
module.exports = RoomsModel;
