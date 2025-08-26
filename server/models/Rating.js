const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  rating: { type: Number },
  user_id: { type: Number, required: true },
  rating_wishlist: { type: Number },
  review: { type: String },
  course_id: { type: Number, required: true },
  // date_added is handled by timestamps: true
}, { timestamps: true });

module.exports = mongoose.model('Rating', ratingSchema);