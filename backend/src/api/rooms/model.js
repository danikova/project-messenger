var mongoose = require('mongoose');
var RoomSchema = require('./schema');

RoomSchema.statics = {
    create: async function (data) {
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

var RoomsModel = mongoose.model('Rooms', RoomSchema);
module.exports = RoomsModel;