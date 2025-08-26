const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  student_id: { type: Number },
  course_id: { type: Number },
  shareable_url: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);