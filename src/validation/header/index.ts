import { Request, Response, NextFunction } from "express";
import JWT, { Secret } from "jsonwebtoken";
import { JWT_KEY, API_KEY } from "../../config/config";
import { User } from "../../model";
import { JwtPayload } from "../../common/types";

export default class ValidationHeader {
  static verifyApiKey = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const api_key: any = req.headers["x-api-key"];

    if (!api_key)
      return res.status(404).send({
        status: "Error",
        response_message: "API key not found",
      });

    if (api_key !== API_KEY)
      return res.status(404).send({
        status: "Error",
        response_message: "API key is incorrect",
      });

    next();
  };

  static verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const access_token = req.headers["x-access-token"];

    try {
      if (!access_token) {
        return res.status(404).send({
          status: "Error",
          response_message: "Token not found!",
        });
      }

      if (Array.isArray(access_token)) {
        return res.status(404).send({
          status: "Error",
          response_message: "Token must be a string!",
        });
      }

      const decode = (await JWT.verify(access_token, JWT_KEY as Secret)) as JwtPayload;

      const user = await User.findById(decode.id);

      if (!user)
        return res.status(404).send({
          status: "Error",
          response_message: "User not found",
        });

      if (!user!.is_active)
        return res.status(404).send({
          status: "Error",
          response_message: "Inactive User",
        });

      next();
    } catch (error) {
      return res.status(404).send({
        status: "Error",
        response_message: "Invalid Token",
      });
    }
  };
}
