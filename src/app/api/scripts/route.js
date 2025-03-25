import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Shloka from "@/backend/models/Shloka";
import fs from "fs";
import path from "path";

export async function POST() {
  try {
    // Connect to MongoDB
    await dbConnect();
    console.log("✅ Connected to MongoDB");

    // Read the entire JSON file
    const filePath = path.join(process.cwd(), "src/backend/scripts/bhagwad_geeta.json");
    const rawData = fs.readFileSync(filePath, "utf-8");

    // Parse the JSON content
    const shlokasData = JSON.parse(rawData).BhagavadGitaChapter.flatMap((shloka) => ({
      scripture: "Bhagavad Gita",
      bookNo: shloka.book || 1 ,
      chapterNo: shloka.chapter || 1,
      shlokaNo: shloka.verse || 1,
      text: shloka.text,
    }));

    // Insert all data at once
    await Shloka.insertMany(shlokasData, { ordered: false });

    console.log("✅ Shlokas Imported Successfully!");
    return NextResponse.json({ message: "✅ Shlokas Imported Successfully!" });
  } catch (error) {
    console.error("❌ Error importing data:", error.message);
    return NextResponse.json({ error: `❌ Error: ${error.message}` }, { status: 500 });
  }
}
