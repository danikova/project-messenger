const mongoose = require('mongoose');
const MessageSchema = require('./schema');

MessageSchema.statics = {
    create: async function (data) {
        const message = new this(data);
        await message.save();
        return message;
    },
};

const MessageModel = mongoose.model('Messages', MessageSchema);
module.exports = MessageModel;
