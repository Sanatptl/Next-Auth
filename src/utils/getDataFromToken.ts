import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/user.model";

export const getDataFromToken = (req: NextRequest) => {
  try {
    //extract data from token
    const token = req.cookies.get("token")?.value || ""; //fall back empty string
    console.log(token);
    const decodedData: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    return decodedData.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
