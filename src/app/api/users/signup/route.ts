import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import bcrypt from "bcryptjs";
import User from "@/models/User";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    if (!username || !email || !password) throw new Error("Data is missing!");

    const user = await User.findOne({ email, username });
    if (user) throw new Error("User already exists!");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isBanned: false,
    });
    const savedUser = await newUser.save();
    console.log(savedUser); //delete later

    return NextResponse.json(
      { message: "User Created succesfully!" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
