import User from "@/models/user.model";
import nodemailer from "nodemailer";
import bcryptjs from "bcrypt";

export const sendMail = async function (
  email: string,
  emailType: string,
  userID: string
) {
  const hashedToken = await bcryptjs.hash(userID.toString(), 10);

  if (emailType == "VERIFY") {
    await User.findByIdAndUpdate(userID, {
      verifyToken: hashedToken,
      verifyTokenExpiry: Date.now() + 86400000,
    });
  } else if (emailType == "RESET") {
    await User.findByIdAndUpdate(userID, {
      resetKeyToken: hashedToken,
      resetKeyTokenExpiry: Date.now() + 7200,
    });
  }
  const host = process.env.MAILTRAP_HOST as string;
  const port = Number(process.env.MAILTRAP_PORT);
  const user = process.env.MAILTRAP_USER as string;
  const pass = process.env.MAILTRAP_PASSWORD as string;
  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      auth: {
        user,
        pass,
      },
    });

    const mailOptions = {
      from: "sanat@patel.io", // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "verify your email" : "reset you password", // Subject line
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
            or copy and paste the link below in your browser. <br> ${
              process.env.DOMAIN
            }/verifyemail?token=${hashedToken}
            </p>`, // html body
    };

    const mailresponse = await transporter.sendMail(mailOptions);
    console.log(mailresponse);
    return mailresponse;
  } catch (error: any) {
    console.log(error.message);
  }
};
