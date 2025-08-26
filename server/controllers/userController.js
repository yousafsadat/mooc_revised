// server/controllers/userController.js
import User from '../models/User.js'; // Import your User Mongoose model
import asyncHandler from 'express-async-handler'; // For handling async errors

// @desc    Get all users
// @route   GET /api/users
// @access  Public (for now, will add auth later)
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}); // Fetch all users from the database
  res.json(users); // Send them as a JSON response
});

// You can add more user-related functions here (e.g., getUserById, createUser, updateUser, deleteUser)

export {
  getUsers,
};