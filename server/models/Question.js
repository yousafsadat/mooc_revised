const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  course_id: { type: Number, required: true },
  lesson_id: { type: Number, required: true },
  question_title: { type: String },
  options: { type: String }, // JSON text
  correct_answers: { type: String }, // JSON text
  order: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);