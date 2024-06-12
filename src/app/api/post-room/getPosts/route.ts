import { connect } from "@/dbConfig/dbConfig";
import Post from "@/models/Post";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/extractDataFromToken";
import User from "@/models/User";

connect();

export async function GET(request: NextRequest) {
  try {
    const userID = await getDataFromToken(request);
    const user = await User.findOne({ _id: userID });
    if (!user)
      return NextResponse.json(
        { error: "The user does not exist!" },
        { status: 500 }
      );
    const posts = await Post.find({});
    return NextResponse.json({
      message: "Posts extracted!",
      posts,
      user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
