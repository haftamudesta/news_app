import User from "../../../models/UsersModel";
import { NextResponse } from "next/server";
import { getCollection } from "../../../lib/mongoDB";

export async function POST(request) {
  try {
    const { name, email, image, role = "user" } = await request.json();
    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const userCollection=await getCollection("users")
    console.log(userCollection)
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