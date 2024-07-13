export const dynamic = 'force-dynamic';

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
    if (!user) {
      return NextResponse.json(
        { error: "The user does not exist!" },
        { status: 500 }
      ); 
    }

    const { searchParams } = new URL(request.url); // Parse query parameters from the URL
    const page = parseInt(searchParams.get("page") || "1", 10); // Get the page number from query params
    const limit = parseInt(searchParams.get("limit") || "10", 10); // Get the limit from query params

    const posts = await Post.find({})
      .skip((page - 1) * limit) // Skip documents based on page number and limit
      .limit(limit) // Limit the number of documents returned
      .sort({ date: -1 }); // Sort posts by date in descending order

    const totalPosts = await Post.countDocuments({});
    const totalPages = Math.ceil(totalPosts / limit);

    return NextResponse.json({
      message: "Posts extracted!",
      posts,
      user,
      totalPages,
    }); 
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 }); 
  }
}
