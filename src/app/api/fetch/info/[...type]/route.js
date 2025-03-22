import dbConnect from "@/lib/dbConnect";
import Shloka from "@/backend/models/Shloka";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    console.log("Connecting to database...");
    await dbConnect();
    console.log("Database connected successfully");

    console.log("Raw params received:", params);

   
    const _id = params.type?.[0]; 

    if (!_id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    console.log(`Fetching shloka with ID: ${_id}`);

    const bookData = await Shloka.findOne({ _id });

    if (!bookData) {
      return NextResponse.json({ message: "No data found" }, { status: 404 });
    }

    return NextResponse.json({ bookData }, { status: 200 });

  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { message: "Error fetching data", error: error.message },
      { status: 500 }
    );
  }
};
