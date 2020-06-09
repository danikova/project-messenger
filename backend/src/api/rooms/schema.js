const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var RoomSchema = new Schema(
    {
        activeUsers: {
            type: [Schema.Types.ObjectId],
            ref: 'User',
            default: []
        },
        messages: [
            {
                user: { type: Schema.Types.ObjectId, ref: 'User' },
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
