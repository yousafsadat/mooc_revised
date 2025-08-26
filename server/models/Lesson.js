const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  course_id: { type: Number, required: true },
  section_id: { type: Number, required: true },
  title: { type: String, required: true },
  duration: { type: String },
  lesson_type: { type: String },
  video_type: { type: String },
  video_url: { type: String },
  date_added: { type: Number }, // Explicitly kept as Number, not handled by timestamps: true
  lesson_no: { type: Number },
  attachment: { type: String },
  summary: { type: String }
}, { timestamps: true }); // Mongoose will add its own createdAt/updatedAt.

module.exports = mongoose.model('Lesson', lessonSchema);