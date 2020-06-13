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
            required: true
        },
        users: {
            type: [Schema.Types.ObjectId],
            ref: 'Users',
            default: []
        },
        messages: [
            {
                user: { type: Schema.Types.ObjectId, ref: 'Users' },
                message: { type: String },
                sent: { type: Date, default: Date.now },
            },
        ],
                    
    },
    {
        timestamps: true,
    },
);

module.exports = RoomSchema;
