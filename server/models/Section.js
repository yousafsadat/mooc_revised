const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  course_id: { type: Number, required: true },
  order: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('Section', sectionSchema);