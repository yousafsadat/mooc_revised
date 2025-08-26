const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  message: { type: String, required: true },
  type: { type: String, required: true }
  // date will be handled by timestamps: true
}, { timestamps: true });

module.exports = mongoose.model('Log', logSchema);