import { Request, Response } from "express";
import { User } from "../model/";
import bcrypt from "bcrypt";
import {hashPassword} from "../helpers/createPassword"

export default class UserController {
  static register = async (req: Request, res: Response) => {
    try {
      const { user_name, password: plain_password } = req.body;

      if (plain_password.length < 5)
        return res
          .status(400)
          .send({ status: "Error", msg: "Password must be more than 5 words" });

      if (user_name.length < 5)
        return res
          .status(400)
          .send({ status: "Error", msg: "Username must be more than 5 words" });

      const hash_password: string= await hashPassword(plain_password);


      await User.create({
        user_name: user_name,
        password: hash_password,
      });

      return res.status(200).send({
        status: "Ok",
      });

    } catch (error: any) {
      if (error.code === 11000)
        return res.status(400).send({
          status: "Error",
          msg: "Username already used",
        });
    }
  };

  static login = async (req: Request, res: Response) => {
    try {
      const { user_name, password } = req.body;

      const user = await User.findOne({ user_name });

      if (!user)
        return res.status(400).send({
          status: "Error",
          msg: "Invalid Username / Password",
        });

      if (!(await bcrypt.compare(password, user.password)))
        return res.status(400).send({
          status: "Error",
          msg: "Invalid Password",
        });

        return res.status(200).json({
          status: "Ok",
          token : user.generateToken()
        })

    } catch (error) {
      return res.status(400).send({
        status: "Error",
        msg: error,
      });
    }
  };
}
