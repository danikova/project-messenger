const mongoose = require('mongoose');
const Messages = require('../messages/schema');
const Schema = mongoose.Schema;

const RoomSchema = new Schema(
    {
        color: {
            primary: { type: String },
            secondary: { type: String },
        },
        name: {
            type: String,
            required: true,
        },
        activeUsers: [Schema.Types.ObjectId],
        messages: [Messages],
    },
    {
        timestamps: true,
    },
);

module.exports = RoomSchema;
