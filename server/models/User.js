// server/models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // For password hashing
import jwt from 'jsonwebtoken'; // For generating JWTs

const userSchema = new mongoose.Schema({
  // Core authentication fields from your provided User.js (username replaces first_name/last_name)
  username: {
    type: String,
    required: [true, 'Please add a username'],
    unique: true,
    trim: true,
    maxlength: [50, 'Username cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // This means when you query a user, the password won't be returned by default
  },
  role: {
    type: String,
    enum: ['student', 'instructor', 'admin'], // Enforce specific roles
    default: 'student'
  },

  // Merged relevant fields from the 'users' table in the SQL dump
  social_links: {
    type: Object // Stored as JSON string in SQL, Mongoose can handle it as Object or Mixed
  },
  biography: {
    type: String
  },
  image: {
    type: String
  },
  is_instructor: { // From tinyint(1) in SQL
    type: Boolean,
    default: false
  },
  status: { // From int(11) in SQL
    type: Number,
    default: 0 // Assuming a default status if none provided
  },
  otp_code: {
    type: String
  },
  watch_history: { // Stored as JSON string in SQL
    type: String
    // If you later need to query/manipulate this as an array/object directly in Mongoose,
    // you might change this to type: [mongoose.Schema.Types.ObjectId] or Mixed.
    // For now, String reflects how it's stored in the dump.
  },
  certificates: { // Stored as JSON string in SQL
    type: String
    // Similar to watch_history.
  },
  referral_code: {
    type: String
  },
  referred_by: {
    type: Number // This would typically be a User ID, could be ref: 'User' for Mongoose relations
  },
  is_google_oauth_user: { // From tinyint(1) in SQL
    type: Boolean,
    default: false
  },
  is_course_creator: { // From tinyint(1) in SQL
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // This will automatically add createdAt and updatedAt fields of Date type
});

// Mongoose Middleware: Encrypt password before saving user
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) { // Only hash if password has been modified (or is new)
    return next(); // Use 'return next()' for clarity and proper flow
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to get signed JWT
userSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Method to match user entered password to hashed password in database
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;