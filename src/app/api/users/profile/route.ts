import User from "@/models/user.model.js";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/db_config/dbConfig";
import { getDataFromToken } from "@/utils/getDataFromToken";

connect();

export async function GET(req: NextRequest) {
  try {
    const userIDFromToken = getDataFromToken(req);
    const userData = await User.findOne({ _id: userIDFromToken }).select(
      "-password"
    );
    return NextResponse.json(
      { message: "User found", data: userData },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
