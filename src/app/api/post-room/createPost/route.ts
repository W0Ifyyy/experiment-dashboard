import { connect } from "@/dbConfig/dbConfig";
import Post from "@/models/Post";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/extractDataFromToken";
import User from "@/models/User";

connect();

export async function POST(request: NextRequest) {
  try {
    const userID = await getDataFromToken(request);
    const user = await User.findOne({ _id: userID });
    if (!user)
      return NextResponse.json(
        { error: "User does not exist!" },
        { status: 500 }
      );
    const { text } = await request.json();
    const newPost = new Post({
      username: user.username,
      text: text === "" ? "Empty message" : text
    });
    const savedPost = await newPost.save();
    console.log(savedPost);
    return NextResponse.json({ message: "Created new post!" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
