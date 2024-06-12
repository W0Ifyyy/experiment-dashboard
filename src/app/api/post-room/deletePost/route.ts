import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Post from "@/models/Post";
import User from "@/models/User";
import { getDataFromToken } from "@/helpers/extractDataFromToken";

connect();

export async function DELETE(request: NextRequest) {
  try {
    const userID = await getDataFromToken(request);
    const user = await User.findOne({ _id: userID });
    if (!user)
      return NextResponse.json(
        { error: "There is no user logged in!" },
        { status: 500 }
      );
    if (!user.isAdmin)
      return NextResponse.json({ error: "Unauthorized" }, { status: 500 });
    const { postID } = await request.json();
    const post = await Post.findOne({ _id: postID });
    if (!post) throw new Error("The post is not here!");
    await Post.deleteOne({ _id: postID });
    return NextResponse.json({ message: "Deleted post!" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
