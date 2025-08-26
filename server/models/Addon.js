const mongoose = require('mongoose');

const addonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  unique_identifier: { type: String, required: true },
  version: { type: String },
  status: { type: Number, required: true },
  about: { type: String },
  purchase_code: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Addon', addonSchema);