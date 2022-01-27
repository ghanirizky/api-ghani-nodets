import { Request, Response } from "express";
import { User } from "../model/";
import bcrypt from "bcrypt";
import { SALT, JWT_KEY } from "../config/config";
import JWT from "jsonwebtoken";

export default class UserController {
  static register = async (req: Request, res: Response) => {
    try {
      const { user_name, password: plain_password } = req.body;

      const gen_salt: string = await bcrypt.genSaltSync(SALT);
      const hash_password: string= await bcrypt.hashSync(plain_password, gen_salt);

      if (plain_password.length < 5)
        return res
          .status(400)
          .send({ status: "Error", msg: "Password must be more than 5 words" });

      if (user_name.length < 5)
        return res
          .status(400)
          .send({ status: "Error", msg: "Username must be more than 5 words" });

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

        const token: string = JWT.sign({
            id: user._id,
            user_name: user.user_name
          
        }, JWT_KEY )

        return res.status(200).json({
          status: "Ok",
          token : token
        })
        



    } catch (error) {
      return res.status(400).send({
        status: "Error",
        msg: error,
      });
    }
  };
}
