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
    if (!typeParams || !Array.isArray(typeParams) || typeParams.length < 3) {
      return NextResponse.json(
        { message: "Scripture, bookNo, and chapterNo are required" },
        { status: 400 }
      );
    }

    const [scripture, bookNoRaw, chapterNoRaw] = typeParams.map((param) =>
      decodeURIComponent(param.trim())
    );

    const bookNo = String(bookNoRaw);
    const chapterNo = Number(chapterNoRaw);

    console.log(
      `Fetching shlokas for: ${scripture} -> ${bookNo} -> ${chapterNo}`
    );

    const bookData = await Shloka.find({
      scripture: scripture,
      bookNo: bookNo,
      chapterNo: chapterNo,
    });

    if (!bookData.length) {
      return NextResponse.json(
        {
          message: `No data found for "${scripture}" -> Book "${bookNo}" -> Chapter "${chapterNo}"`,
        },
        { status: 404 }
      );
    }

    const filteredData = bookData.map(({ _id,shlokaNo, text }) => ({
      _id,
      shlokaNo,
      text,
    }));

    return NextResponse.json({ shlokas: filteredData }, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { message: "Error fetching data", error: error.message },
      { status: 500 }
    );
  }
};
