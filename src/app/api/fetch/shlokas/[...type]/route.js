import dbConnect from "@/lib/dbConnect";
import Scripture from "@/backend/models/Scripture";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    console.log("Connecting to database...");
    await dbConnect();
    console.log("Database connected successfully");

    console.log("Raw params received:", params);

   
    const typeParams = params?.type; 
    if (!typeParams || !Array.isArray(typeParams) || typeParams.length < 3) {
      return NextResponse.json(
        { message: "Scripture, book, and chapter are required" },
        { status: 400 }
      );
    }

    
    const [scripture, book, chapter] = typeParams.map((param) =>
      decodeURIComponent(param.trim())
    );

    console.log(`Fetching shlokas for: ${scripture} -> ${book} -> ${chapter}`);

  
    const bookData = await Scripture.findOne({
      scripture: { $regex: `^${scripture}$`, $options: "i" },
      book: { $regex: `^${book}$`, $options: "i" },
    });

    if (!bookData) {
      return NextResponse.json(
        { message: `No book found for "${book}" in "${scripture}"` },
        { status: 404 }
      );
    }

    // Find chapter
    const selectedChapter = bookData.chapters.find(
      (ch) => ch.chapterTitle.toLowerCase() === chapter.toLowerCase()
    );

    if (!selectedChapter) {
      return NextResponse.json(
        { message: `Chapter "${chapter}" not found in "${book}"` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        scripture: bookData.scripture,
        book: bookData.book,
        chapterTitle: selectedChapter.chapterTitle,
        chapterNumber: selectedChapter.chapterNumber,
        shlokas: selectedChapter.shlokas || [],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { message: "Error fetching data", error: error.message },
      { status: 500 }
    );
  }
};
