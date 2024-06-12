import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/User";

connect();

export async function DELETE(request: NextRequest) {
  try {
    const { userID } = await request.json();
    const user = await User.findOne({ _id: userID });
    if (!user) throw new Error("User does not exist!");
    await User.updateOne({ _id: userID }, { isBanned: true });
    return NextResponse.json({ message: "Banned user!" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
