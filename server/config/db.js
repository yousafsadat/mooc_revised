// server/config/db.js
import mongoose from 'mongoose';
import chalk from 'chalk';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(chalk.cyan.underline.bold(`MongoDB Connected: ${conn.connection.host}`));
  } catch (error) {
    console.error(chalk.red.bold(`Error: ${error.message}`));
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;