const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema(
    {
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
            maxlength: 255,
        },
        online: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = UserSchema;
