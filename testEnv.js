import dotenv from "dotenv";
import fs from "fs";
import path from "path";

// Check if .env file exists
const envPath = path.resolve(process.cwd(), ".env");
console.log("Checking .env file at:", envPath);

if (fs.existsSync(envPath)) {
  console.log("✅ .env file exists!");

  dotenv.config({ path: envPath });

  console.log("MONGODB_URI:", process.env.MONGODB_URI);
} else {
  console.error("❌ .env file not found!");
}
