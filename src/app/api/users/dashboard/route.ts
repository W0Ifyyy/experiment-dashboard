import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/extractDataFromToken";
import User from "@/models/User";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select(
      "-password -isVerified"
    );
    if (!user.isAdmin) throw new Error("The user is not an Admin!");
    const users = await User.find({}).select("-password -isVerified");
    return NextResponse.json({
      message: "Users extracted!",
      data: users,
      user,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
