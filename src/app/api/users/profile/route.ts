import { getDataFromToken } from "@/helpers/extractDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = await User.findOne({ _id: userId }).select("-password");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "User found!", data: user });
  } catch (error: any) {
    console.error("Error fetching user profile: ", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
