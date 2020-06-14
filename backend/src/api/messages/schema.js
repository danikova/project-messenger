const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'Users' },
    message: { type: String },
    sent: { type: Date, default: Date.now },
});

module.exports = MessageSchema;