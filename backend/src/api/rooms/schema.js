const mongoose = require('mongoose');
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
        users: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Users',
            },
        ],
        activeUsers: [Schema.Types.ObjectId],
        messages: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Messages',
            },
        ],
    },
    {
        timestamps: true,
    },
);

module.exports = RoomSchema;
