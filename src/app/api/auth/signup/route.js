import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/backend/models/User";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json(); // Extract data from request

    if (!name || !email || !password) {
      return Response.json({ error: "All fields are required" }, { status: 400 });
    }

    await dbConnect();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      authProvider: "email",
    });

    await newUser.save();
    console.log("SignUp Response", newUser)
    return Response.json({ message: "User registered successfully" }, { status: 201 });

  } catch (error) {
    console.error("Signup error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
