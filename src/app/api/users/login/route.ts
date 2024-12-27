import User from "@/models/user.model.js";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/db_config/dbConfig";
import bcryptjs from "bcrypt";
import jwt from "jsonwebtoken";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });
    if (!user)
      return NextResponse.json(
        { error: "user does not exists" },
        { status: 400 }
      );

    //validate pass
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Password is incorrect" },
        { status: 400 }
      );
    }

    //issue jwt
    const tokenData = {
      id: user._id,
      name: user.userName,
    };
    const token = jwt.sign(
      tokenData,
      // process.env.JWT_SECRET_KEY as string, // assert the type to ensure it's treated as a string.or at the end mark !
      process.env.JWT_SECRET_KEY!, //exclamation mark (!) is a non-null assertion operator. This operator tells TypeScript that you are certain the value will not be null or undefined
      { expiresIn: "1h" }
    );
    const response = NextResponse.json(
      { message: "You're logged in!" },
      { status: 200 }
    );
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
