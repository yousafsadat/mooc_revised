const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true }
}, { timestamps: true }); // date_added and last_modified are handled by timestamps: true

module.exports = mongoose.model('Role', roleSchema);