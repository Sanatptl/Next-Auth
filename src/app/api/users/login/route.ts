import User from "@/models/user.model.js";
import { sendMail } from "@/utils/nodemailer";
import bcryptjs from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/db_config/dbConfig";

connect();

async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;
    const user = await User.findOne({ email: email });
  } catch (err) {}
}
