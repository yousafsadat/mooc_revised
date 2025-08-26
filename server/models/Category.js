const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  code: { type: String },
  name: { type: String },
  parent: { type: Number },
  slug: { type: String },
  font_awesome_class: { type: String },
  thumbnail: { type: String }
}, { timestamps: true }); // date_added and last_modified are handled by timestamps: true

module.exports = mongoose.model('Category', categorySchema);