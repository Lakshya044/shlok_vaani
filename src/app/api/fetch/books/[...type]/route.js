import dbConnect from "@/lib/dbConnect";
import Shloka from "@/backend/models/Shloka";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    console.log("Connecting to database...");
    await dbConnect();
    console.log("Database connected successfully");

    console.log("Raw params received:", params);

    const typeParams = params?.type;
    if (!typeParams || !Array.isArray(typeParams) || typeParams.length < 1) {
      return NextResponse.json(
        { message: "Scripture is required" },
        { status: 400 }
      );
    }

    const [scripture] = typeParams.map((param) =>
      decodeURIComponent(param.trim())
    );

    console.log(`Fetching shlokas for: ${scripture}  `);

    const bookData = await Shloka.find({
      scripture: scripture,
    });

    if (!bookData.length) {
      return NextResponse.json(
        { message: `No data found for "${scripture}` },
        { status: 404 }
      );
    }

    const uniqueChapters = [...new Set(bookData.map(({ bookNo }) => bookNo))];

    const formattedChapters = uniqueChapters.map((bookNo) => ({ bookNo }));

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
