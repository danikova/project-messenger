const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'Users', default: null },
    message: { type: String },
    sent: { type: Date, default: Date.now }
});

module.exports = MessageSchema;
