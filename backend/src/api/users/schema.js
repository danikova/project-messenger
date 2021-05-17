const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema(
    {
        color: {
            primary: { type: String },
            secondary: { type: String },
        },
        imageUrl: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
            maxlength: 254,
        },
        username: {
            type: String,
            unique: true,
            required: true,
            minlength: 3,
            maxlength: 50,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
            maxlength: 254,
            select: false
        },
        openChatroom: {
            type: Schema.Types.ObjectId,
            ref: 'Rooms'
        }
    },
    {
        timestamps: true,
    },
);

module.exports = UserSchema;
