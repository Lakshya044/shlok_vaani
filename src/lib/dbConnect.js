import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

// Force load .env correctly from the root
dotenv.config({ path: path.resolve(process.cwd(), ".env") });
console.log("✅ dotenv loaded successfully!");

const dbConnect = async () => {
  try {
    console.log("🔍 Checking MONGODB_URI:", process.env.MONGODB_URI);

    if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is undefined!");

    if (mongoose.connections[0].readyState) {
      console.log("✅ Already connected to MongoDB.");
      return;
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

export default dbConnect;
