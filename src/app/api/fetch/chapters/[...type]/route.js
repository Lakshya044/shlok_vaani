import dbConnect from "@/lib/dbConnect";
import Scripture from "@/backend/models/Scripture";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    console.log("Connecting to database...");
    await dbConnect();
    console.log("Database connected successfully");

    
    const pathParts = req.nextUrl.pathname.split("/");
    let type = decodeURIComponent(pathParts[pathParts.length - 1])
      .replace(/\n/g, "")
      .replace(/\r/g, "")
      .trim();

    console.log(`Fetching all books of type: "${type}"`);

    if (!type) {
      return NextResponse.json(
        { message: "Type parameter is missing" },
        { status: 400 }
      );
    }

    const books = await Scripture.find({
      scripture: { $regex: `^${type}$`, $options: "i" },
    }).select("book chapters");

    if (!books || books.length === 0) {
      console.warn(`No books found for type "${type}"`);
      return NextResponse.json(
        { message: `No books found for "${type}"` },
        { status: 404 }
      );
    }
    console.log("MongoDB Query Result:", books);

    const formattedBooks = books.map((entry) => ({
      book: entry.book,
      chapters: entry.chapters.map((chapter) => ({
        chapterNumber: chapter.chapterNumber ?? null,
        chapterTitle: chapter.chapterTitle ?? "Untitled",
      })),
    }));
    return NextResponse.json({ books: formattedBooks }, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { message: "Error fetching data", error: error.message },
      { status: 500 }
    );
  }
};
