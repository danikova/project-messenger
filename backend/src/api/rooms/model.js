const mongoose = require('mongoose');
const RoomSchema = require('./schema');
const generateColors = require('../../shared/random.color');

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
        return await this.findOne(query);
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
    }
}

// RoomSchema.methods = {
//     addUser: async function
// }

const RoomsModel = mongoose.model('Rooms', RoomSchema);
module.exports = RoomsModel;