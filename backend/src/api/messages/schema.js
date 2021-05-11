const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceMessage = new Schema({
    templateName: { type: String },
    templateVariables: { type: Object },
});

const MessageSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'Users', default: null },
    message: { type: String },
    serviceMessage: serviceMessage,
    sent: { type: Date, default: Date.now },
    number: { type: Number },
});

module.exports = MessageSchema;
