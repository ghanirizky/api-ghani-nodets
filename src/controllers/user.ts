import { Request, Response } from "express";
import { User } from "../model/";
import bcrypt from "bcrypt";
import { hashPassword } from "../helpers/createPassword";
import JWT, { Secret } from "jsonwebtoken";
import { JWT_KEY } from "../config/config";
import { JwtPayload } from "../common/types";

export default class UserController {
  static register = async (req: Request, res: Response) => {
    try {
      const { user_name, email, password: plain_password } = req.body;

      if (plain_password.length < 5)
        return res
          .status(400)
          .send({ status: "Error", msg: "Password must be more than 5 words" });

      if (user_name.length < 5)
        return res
          .status(400)
          .send({ status: "Error", msg: "Username must be more than 5 words" });

      const hash_password: string = await hashPassword(plain_password);

      const user = await User.create({
        user_name: user_name,
        email: email,
        password: hash_password,
      });

      if (user) user.sendConfirmationEmail(user.generateToken());

      return res.status(200).send({
        status: "Ok",
      });
    } catch (error: any) {
      if (error.code === 11000)
        return res.status(400).send({
          status: "Error",
          msg: `${Object.keys(error.keyValue)}: ${
            error.keyValue[`${Object.keys(error.keyValue)}`]
          } is already used`,
        });

      return res.status(400).send({
        status: "Error",
        msg: error.message,
      });
    }
  };

  static login = async (req: Request, res: Response) => {
    try {
      const { user_name, password } = req.body;

      const user = await User.findOne({ user_name });

      if (!user)
        return res.status(401).send({
          status: "Error",
          msg: "Invalid Username / Password",
        });

      if (!(await bcrypt.compare(password, user.password)))
        return res.status(401).send({
          status: "Error",
          msg: "Invalid Password",
        });

      if (!user.is_verify)
        return res.status(401).send({
          status: "Error",
          msg: "Email Not Verified",
        });

      return res.status(200).json({
        status: "Ok",
        token: user.generateToken(),
      });
    } catch (error) {
      return res.status(400).send({
        status: "Error",
        msg: error,
      });
    }
  };

  static verify = async (req: Request, res: Response) => {
    try {
      const { token } = req.params;

      if (!token) {
        return res.status(404).send({
          status: "Error",
          response_message: "Token not found!",
        });
      }

      const decode = (await JWT.verify(token, JWT_KEY as Secret)) as JwtPayload;

      const user = await User.findById(decode.id);

      if (!user)
        return res.status(404).send({
          status: "Error",
          response_message: "User not found",
        });

      user.is_verify = true;
      user.save();

      return res.status(200).json({
        status: "Ok",
        msg: "Email Verified",
      });
    } catch (error) {
      return res.status(400).send({
        status: "Error",
        msg: error,
      });
    }
  };
}
