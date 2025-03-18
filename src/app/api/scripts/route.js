import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Scripture from "@/backend/models/Scripture";
import fs from "fs";
import path from "path";

export async function POST() {
  try {
    await dbConnect();

    const filePath = path.join(process.cwd(), "src/backend/scripts/mahabharat2.json");
    const rawData = fs.readFileSync(filePath, "utf-8");
    const shlokasData = JSON.parse(rawData);

    await Scripture.create({
      scripture: "Mahabharata",
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

    return NextResponse.json({ message: "✅ Shlokas Imported Successfully!" });
  } catch (error) {
    console.error("❌ Error importing data:", error.message);
    return NextResponse.json({ error: `❌ Error: ${error.message}` }, { status: 500 });
  }
}
