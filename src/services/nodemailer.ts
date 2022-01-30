import nodemailer from "nodemailer";
import { EMAIL, EMAIL_PASS } from "../config/config";

const user: string = EMAIL as string;
const pass: string = EMAIL_PASS as string;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

export default class NodeMailerServices {
  static sendConfirmationEmail = async (
    user_name: string,
    email: string,
    confirmationCode: string
  ) => {
    try {
      transport
        .sendMail({
          from: user,
          to: email,
          subject: "Please confirm your account",
          html: `<h1>Email Confirmation</h1>
        <h2>Hello ${user_name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:8000/user/verify/${confirmationCode}> Click here</a>
        </div>`,
        })
        .catch((err) => console.log(err));
    } catch (error) {}
  };
}
