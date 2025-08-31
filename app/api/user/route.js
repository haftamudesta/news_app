import User from "../../../models/UsersModel";
import { connectToMongoDB } from "@/lib/mongoDB";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    console.log("Request is:",request)
    const { name, email, image, role = "user" } = await request.json();
    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

  await connectToMongoDB();
    const user = await User.findOneAndUpdate(
      { email },
      { name, image, role, lastLogin: new Date() },
      { new: true, upsert: true }
    );
    return NextResponse.json(
      { message: "User processed successfully", data: user },
      { status: 200 }
    );

  } catch (error) {
    console.error("User API Error:", error);
    return NextResponse.json(
      { message: "Authentication failed", error: error.message },
      { status: 500 }
    );
    }
}