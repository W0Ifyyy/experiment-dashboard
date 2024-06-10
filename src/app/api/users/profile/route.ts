import { getDataFromToken } from "@/helpers/extractDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    if (!user) throw new Error("User not found!");
    return NextResponse.json({ message: "User found!", data: user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
