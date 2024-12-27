import { NextRequest, NextResponse } from "next/server";
import connect from "@/db_config/dbConfig";
import User from "@/models/user.model";

//coz next uses Edge runtime, every function/route,need to connect to db
connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { token } = reqBody;
    console.log(token);
    const verifiedUser = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (!verifiedUser) {
      return NextResponse.json({ error: "Invalid token!" }, { status: 400 });
    }
    console.log(verifiedUser);
    verifiedUser.isVerified = true;
    verifiedUser.verifyToken = undefined;
    verifiedUser.verifyTokenExpiry = undefined;

    // Save to database
    await verifiedUser.save();

    return NextResponse.json(
      { message: "user verifies successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
