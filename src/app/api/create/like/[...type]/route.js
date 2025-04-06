import dbConnect from "@/lib/dbConnect";
import Shloka from "@/backend/models/Shloka";
import User from "@/backend/models/User";
import { NextResponse } from "next/server";

export const POST = async (req, { params }) => {
  try {
    console.log("Connecting to database...");
    await dbConnect();
    console.log("Database connected successfully");

    console.log("Raw params received:", params);

   
    const _id = await params.type?.[0]; 
    const { userId } = await req.json();

    if (!_id || !userId) {
        return NextResponse.json({ message: "Shloka ID and User ID are required" }, { status: 400 });
      }
      console.log(`Checking if user exists: ${userId}`);
      const userExists = await User.findOne({ _id: userId });
      if (!userExists) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }
      console.log(`Processing like for Shloka ID: ${_id} by User ID: ${userId}`);

      const shloka = await Shloka.findOne({ _id });
      if (!shloka) {
        return NextResponse.json({ message: "Shloka not found" }, { status: 404 });
      }
      if (shloka.likes.includes(userId)) {
        return NextResponse.json({ message: "User has already liked this shloka" }, { status: 400 });
      }
      shloka.likes.push(userId);
      await shloka.save();
      return NextResponse.json({ likeCount: shloka.likes.length }, { status: 200 });
    } catch (error) {
        console.error("Error updating like count:", error);
        return NextResponse.json(
          { message: "Error updating like count", error: error.message },
          { status: 500 }
        );
      }
    };
