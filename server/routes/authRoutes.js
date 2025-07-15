// server/routes/authRoutes.js
import express from 'express';
import { registerUser, loginUser, getMe, logout } from '../controllers/authController.js'; // Import all controller functions
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Private routes (require authentication)
router.get('/me', protect, getMe);
router.get('/logout', protect, logout); // Add the logout route, protected

export default router;