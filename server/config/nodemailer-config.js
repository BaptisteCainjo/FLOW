import nodemailer from "nodemailer";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const transporter = nodemailer.createTransport({
  host: "smtp.orange.fr",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_MAIL,
    pass: process.env.PASSWORD_MAIL,
  },
});

async function sendEmail(to, subject, text, html) {
  try {
    var message = await transporter.sendMail({
      from: process.env.USER_MAIL,
      to,
      subject,
      text,
      html,
    });
    console.log("Message sent: %s", message.messageId);
    return message;
  } catch (error) {
    console.error(error);
  }
}

export default sendEmail;