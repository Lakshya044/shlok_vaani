import { signOut } from "@/auth";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await signOut({ redirect: false });
    return NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
