import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/User";

connect();

export async function DELETE(request: NextRequest) {
  try {
    const { userID } = await request.json();
    const user = await User.findOne({ _id: userID });
    if (!user) throw new Error("User does not exist!");
    await User.deleteOne({ _id: userID });
    return NextResponse.json({ message: "Deleted user!" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
