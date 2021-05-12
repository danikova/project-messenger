const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceMessage = new Schema({
    templateName: { type: String },
    templateVariables: { type: Object },
});

const MessageSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, default: null },
    message: { type: String },
    serviceMessage: serviceMessage,
    sent: { type: Date, default: Date.now },
    number: { type: Number },
});

module.exports = MessageSchema;
