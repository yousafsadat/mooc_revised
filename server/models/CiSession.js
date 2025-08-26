const mongoose = require('mongoose');

const ciSessionSchema = new mongoose.Schema({
  id: { type: String, required: true }, // Not auto_increment, so explicitly included
  ip_address: { type: String, required: true },
  timestamp: { type: Number, required: true }, // Explicitly kept as Number as per SQL type
  data: { type: Buffer, required: true }
}, { timestamps: true }); // Adds Mongoose's own createdAt and updatedAt Date fields

module.exports = mongoose.model('CiSession', ciSessionSchema);