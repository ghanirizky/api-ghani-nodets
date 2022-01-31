import { Request, Response } from "express";
import { Game3rbFeed } from "../model/";

export default class Game3rbController {
  static async getFeed(req: Request, res: Response) {
    try {
      const feed = await Game3rbFeed.find({}, { __v: 0 }).exec();

      return res.status(200).send({
        data: feed,
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}
