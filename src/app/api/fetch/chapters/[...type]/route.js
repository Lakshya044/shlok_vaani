import dbConnect from "@/lib/dbConnect";
import Shloka from "@/backend/models/Shloka";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    console.log("Connecting to database...");
    await dbConnect();
    console.log("Database connected successfully");

    console.log("Raw params received:", params);

    const typeParams = await params?.type;
    if (!typeParams || !Array.isArray(typeParams) || typeParams.length < 2) {
      return NextResponse.json(
        { message: "Scripture and bookNo are required" },
        { status: 400 }
      );
    }

    const [scripture, bookNoRaw] = typeParams.map((param) =>
      decodeURIComponent(param.trim())
    );

    const bookNo = String(bookNoRaw);

    console.log(`Fetching shlokas for: ${scripture} -> ${bookNo} `);

    const bookData = await Shloka.find({
      scripture: scripture,
      bookNo: bookNo,
    });

    if (!bookData.length) {
      return NextResponse.json(
        { message: `No data found for "${scripture}" -> Book "${bookNo}` },
        { status: 404 }
      );
    }

    const uniqueChapters = [
      ...new Set(bookData.map(({ chapterNo }) => chapterNo)),
    ];

    const formattedChapters = uniqueChapters.map((chapterNo) => ({
      chapterNo,
    }));

    return NextResponse.json(
      { chapterNumber: formattedChapters },
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
