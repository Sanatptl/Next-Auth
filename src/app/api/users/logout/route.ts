import { NextResponse } from "next/server";
import connect from "@/db_config/dbConfig";

connect();

export async function GET() {
  try {
    const response = NextResponse.json(
      {
        message: "Logged out sucess",
      },
      { status: 200 }
    );

    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}