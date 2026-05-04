const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    chat_id: { type: String, required: true, index: true },
    sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content_type: { type: String, enum: ['text', 'image', 'video', 'gift'], default: 'text' },
    content: { type: String, required: true },
    media_url: { type: String, default: null },
    read_by: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);