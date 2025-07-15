// server/controllers/authController.js
import User from '../models/User.js';
import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/asyncHandler.js';

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password, role } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new ErrorResponse('User with this email already exists', 400));
  }

  // Create user
  const user = await User.create({
    username,
    email,
    password,
    role
  });

  // Get token
  const token = user.getSignedJwtToken();

  res.status(201).json({
    success: true,
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    }
  });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    return next(new ErrorResponse('Please enter an email and password', 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Get token
  const token = user.getSignedJwtToken();

  // OPTIONAL: If you decide to store JWT in HTTP-only cookies, uncomment this block
  // const options = {
  //   expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000), // e.g., 30 days
  //   httpOnly: true // Prevents client-side JavaScript from accessing the cookie
  // };
  // if (process.env.NODE_ENV === 'production') {
  //   options.secure = true; // Only send over HTTPS
  // }
  // res.status(200).cookie('token', token, options).json({
  //   success: true,
  //   token, // Still send token in body for client-side storage if not using cookies exclusively
  //   user: {
  //     id: user._id,
  //     username: user.username,
  //     email: user.email,
  //     role: user.role
  //   }
  // });

  // Current implementation: Sends token in JSON response
  res.status(200).json({
    success: true,
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    }
  });
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res, next) => {
  // req.user is set by the protect middleware
  res.status(200).json({
    success: true,
    user: req.user
  });
});

// @desc    Log user out / clear cookie (if used)
// @route   GET /api/auth/logout
// @access  Private (optional, but good practice)
const logout = asyncHandler(async (req, res, next) => {
  // If you were setting a cookie in loginUser (uncommented above), you would clear it like this:
  // res.cookie('token', 'none', {
  //   expires: new Date(Date.now() + 10 * 1000), // Expires in 10 seconds
  //   httpOnly: true
  // });

  // For header-based JWTs, client-side token removal is the primary logout mechanism.
  // This server endpoint primarily signals success and can clear server-side sessions if any.
  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
});

export { registerUser, loginUser, getMe, logout }; // Export all functions, including logout