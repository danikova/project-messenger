const mongoose = require('mongoose');
const RoomSchema = require('./schema');
const generateColors = require('../../shared/random.color');
const Message = require('../messages/model');

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
        if (this.users.indexOf(user.id) < 0) this.users.push(user);
        if (this.activeUsers.indexOf(user.id) < 0) this.activeUsers.push(user);
    },
    removeUser: async function (user) {
        if (0 <= this.activeUsers.indexOf(user.id)) {
            this.activeUsers.pull(user.id);
            if (this.activeUsers.length === 0) {
                await RoomsModel.deleteOne({ _id: this.id });
            }
        }
    },
    pushMessage: async function (messageData) {
        const message = await Message.create(messageData);
        this.messages.push(message);
        return message;
    },
};

const RoomsModel = mongoose.model('Rooms', RoomSchema);
module.exports = RoomsModel;
