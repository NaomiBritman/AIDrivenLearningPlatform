import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// חיבור ל-MongoDB Atlas עם טיפול בשגיאות
export async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log(' Connected to MongoDB Atlas');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    throw err; 
  }
}