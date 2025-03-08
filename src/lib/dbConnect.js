import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbConnect = async () => {
  if (mongoose.connections[0].readyState) {
    console.log('Already connected to MongoDB.');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Successfully connected to MongoDB.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

export default dbConnect;
