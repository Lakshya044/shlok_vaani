import dbConnect from "@/lib/dbConnect";
import Shloka from "@/backend/models/Shloka";
import User from "@/backend/models/User";
import { NextResponse } from "next/server";

export const POST = async (req, { params }) => {
  try {
    console.log("Connecting to database...");
    await dbConnect();
    console.log("Database connected successfully");

    const { userId, text } = await req.json();
    const _id = params.type?.[0]; 

    if (!_id || !userId || !text) {
      return NextResponse.json({ message: "Shloka ID, user ID, and text are required" }, { status: 400 });
    }

    console.log(`Fetching user with ID: ${userId}`);
    const userExists = await User.findById(userId);
    if (!userExists) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    console.log(`Fetching shloka with ID: ${_id}`);
    const shloka = await Shloka.findOne({ _id });
    if (!shloka) {
      return NextResponse.json({ message: "Shloka not found" }, { status: 404 });
    }

   
    const newComment = {
      userId,
      text,
      likes: [], 
      timestamp: new Date()
    };

    
    shloka.comments.push(newComment);
    shloka.commentCount += 1; 

    
    await shloka.save();

    return NextResponse.json({ message: "Comment added successfully", comment: newComment }, { status: 201 });

  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json(
      { message: "Error adding comment", error: error.message },
      { status: 500 }
    );
  }
};
