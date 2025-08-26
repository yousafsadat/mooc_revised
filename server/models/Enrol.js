const mongoose = require('mongoose');

const enrolSchema = new mongoose.Schema({
  user_id: { type: Number, required: true },
  course_id: { type: Number, required: true },
  // date_added will be handled by timestamps: true
}, { timestamps: true });

module.exports = mongoose.model('Enrol', enrolSchema);