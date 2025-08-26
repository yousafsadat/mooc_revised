// server/index.js
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import chalk from 'chalk';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'; // <--- NEW: Import the cors package

// Import your routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Load env vars
dotenv.config({ path: './.env' });

// Connect to database
connectDB();

const app = express();

// Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan(function (tokens, req, res) {
    const status = tokens.status(req, res);
    const statusColor = status >= 500 ? 'red' : status >= 400 ? 'yellow' : status >= 300 ? 'cyan' : 'green';

    return [
      chalk.blue(tokens.method(req, res)),
      chalk.magenta(tokens.url(req, res)),
      chalk[statusColor](status),
      chalk.grey(tokens['response-time'](req, res) + ' ms'),
    ].join(' ');
  }));
}

app.use(express.json()); // Body parser for JSON
app.use(express.urlencoded({ extended: false })); // Body parser for URL-encoded data
app.use(cookieParser()); // Cookie parser for handling cookies

// --- CORS Configuration ---
// This middleware should be placed before your route definitions
app.use(cors({
  origin: 'http://localhost:5173', // IMPORTANT: This must be your frontend's exact origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods for CORS requests
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed request headers (crucial for JWTs)
  credentials: true, // Allow cookies to be sent with cross-origin requests (if you use them)
}));
// --- End CORS Configuration ---


// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
// ... other routes

// Basic route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(chalk.yellow.bold(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
});

process.on('unhandledRejection', (err, promise) => {
  console.log(chalk.red.bold(`Error: ${err.message}`));
  process.exit(1);
});