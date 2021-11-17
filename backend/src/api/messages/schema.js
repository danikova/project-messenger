const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceMessage = new Schema({
    templateName: { type: String },
    templateVariables: { type: Object },
});

const File = new Schema({
    uri: { type: String },
    name: { type: String },
    mimetype: { type: String },
});

const MessageSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, default: null },
    message: { type: String },
    serviceMessage: serviceMessage,
    files: [File],
    sent: { type: Date, default: Date.now },
    number: { type: Number },
});

module.exports = MessageSchema;
