const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  title: { type: String, required: true },
  course_id: { type: Number, required: true },
  // date_added and last_modified are handled by timestamps: true
}, { timestamps: true });

module.exports = mongoose.model('Tag', tagSchema);