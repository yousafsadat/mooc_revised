// server/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js'; // Re-use our asyncHandler
import ErrorResponse from '../utils/errorResponse.js'; // Re-use our ErrorResponse
import User from '../models/User.js'; // To find the user by ID

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if token is in headers (Bearer token)
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    // Format: "Bearer TOKEN"
    token = req.headers.authorization.split(' ')[1];
  }
  // You could also check for a token in cookies if you implement that later
  // else if (req.cookies.token) {
  //   token = req.cookies.token;
  // }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to the request object, excluding the password field
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return next(new ErrorResponse('User not found for this token', 404));
    }

    next(); // Move to the next middleware/controller
  } catch (error) {
    console.error(error);
    return next(new ErrorResponse('Not authorized to access this route, token failed', 401));
  }
});

export { protect };