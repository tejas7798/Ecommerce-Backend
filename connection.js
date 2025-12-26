import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";
const MongoDB_URL = process.env.MONGO_URL;

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MongoDB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};