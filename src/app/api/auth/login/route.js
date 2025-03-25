import { signIn,auth } from "@/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 401 });
    }
    // await new Promise((resolve) => setTimeout(resolve, 100));
    // const session = await auth();
    // console.log("session",session);
    // if (!session) {
    //   return NextResponse.json({ error: "Failed to retrieve user session" }, { status: 500 });
    // }

    return NextResponse.json({ 
      message: "Login successful",
      // user: session.user 
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
