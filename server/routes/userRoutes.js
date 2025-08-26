// server/routes/userRoutes.js
import express from 'express';
import { getUsers } from '../controllers/userController.js'; // Import the controller functions

const router = express.Router();

// Define routes for users
router.route('/').get(getUsers); // GET request to /api/users will call getUsers controller

export default router;