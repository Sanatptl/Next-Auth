import User from "@/models/user.model.js";
import { sendMail } from "@/utils/nodemailer";
import bcryptjs from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/db_config/dbConfig";

connect();
export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, userName, password } = reqBody;

    //Validation
    const user = await User.findOne({ email: email });
    if (user) {
      console.log("user already exist log@signuproute");
      return NextResponse.json(
        { error: "user already exists" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({ email, userName, password: hashedPassword });
    const savedUser = await newUser.save();
    console.log(savedUser);

    //Send email
    sendMail(email, "VERIFY", savedUser._id);
    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      // Check for duplicate key error
      return NextResponse.json(
        { error: "Username already exists. Please choose another one." },
        { status: 500 }
      );
    } else {
      console.error("An unexpected error occurred:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
