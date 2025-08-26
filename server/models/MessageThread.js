const mongoose = require('mongoose');

const messageThreadSchema = new mongoose.Schema({
  message_thread_code: { type: String },
  sender: { type: Number },
  reciever: { type: Number },
  last_message_timestamp: { type: Number }, // Explicitly kept as Number, not handled by timestamps: true
  // date_added is handled by timestamps: true
}, { timestamps: true });

module.exports = mongoose.model('MessageThread', messageThreadSchema);