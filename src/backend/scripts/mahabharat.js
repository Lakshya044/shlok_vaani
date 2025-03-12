// src/backend/scripts/importData.js

import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import Scripture from "../models/Scripture.js";
import dbConnect from "../../lib/dbConnect.js";
dotenv.config();

const importData = async () => {
  try {
    // Ensure DB connection
    await dbConnect();

    // Read JSON file
    const filePath = path.join(process.cwd(), "src/backend/scripts/mahabharat.json");
    const rawData = fs.readFileSync(filePath, "utf-8");
    const shlokasData = JSON.parse(rawData);

    // Insert data into DB
    const scripture = await Scripture.create({
      type: "Mahabharata",
      book: "Adi Parva",
      chapters: [
        {
          chapterNumber: 1,
          chapterTitle: "Introduction",
          shlokas: shlokasData.map((s) => ({
            shlokaNumber: s.shloka,
            text: s.text,
          })),
        },
      ],
    });

    console.log("✅ Shlokas Imported Successfully!", scripture);
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error importing data:", error);
    process.exit(1);
  }
};

// Run the import function
importData();
