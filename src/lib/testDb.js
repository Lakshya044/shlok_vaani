import dbConnect from "./dbConnect.js";

const testConnection = async () => {
  console.log("🚀 Testing MongoDB connection...");
  await dbConnect();
};

testConnection();
