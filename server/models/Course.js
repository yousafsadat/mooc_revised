const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  user_id: { type: Number },
  title: { type: String, required: true },
  short_description: { type: String },
  description: { type: String },
  outcomes: { type: String },
  language_made_in: { type: String },
  enable_drip_content: { type: Number },
  is_top_course: { type: Number },
  user_id_for_course_expiry: { type: Number },
  category_id: { type: Number, required: true },
  sub_category_id: { type: Number, required: true },
  section: { type: String }, // JSON text
  requirements: { type: String }, // JSON text
  price: { type: Number },
  discount_flag: { type: Number },
  discounted_price: { type: Number },
  level: { type: String },
  course_overview_provider: { type: String },
  course_overview_url: { type: String },
  course_thumbnail: { type: String },
  video_url: { type: String },
  is_free_course: { type: Number },
  status: { type: String },
  course_id: { type: String }, // uuid
  total_lesson: { type: Number },
  total_section: { type: Number },
  serp_tags: { type: String }, // JSON text
  meta_keywords: { type: String },
  meta_description: { type: String },
  is_featured: { type: Number },
  total_rating: { type: Number },
  number_of_ratings: { type: Number },
  average_rating: { type: Number },
  no_of_bookmark: { type: Number }
}, { timestamps: true }); // date_added and last_modified are handled by timestamps: true

module.exports = mongoose.model('Course', courseSchema);