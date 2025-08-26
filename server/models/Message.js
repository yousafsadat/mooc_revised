const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  message_thread_code: { type: String },
  message: { type: String },
  sender: { type: Number },
  // timestamp is handled by timestamps: true
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);