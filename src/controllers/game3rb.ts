import { Request, Response } from "express";
import { parseRssToJson } from "../helpers/getRss";
import { Settings, Game3rbFeed } from "../model/";

// import { Mongoose } from "mongoose";

export default class Game3rbController {
  static async getFeed(req: Request, res: Response) {
    try {
      const feed: {}[] = await Game3rbFeed.find({}, { __v: 0 }).exec();

      return res.status(200).send({
        data: feed,
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  static async getLatestFeed(req: Request, res: Response) {
    try {
      const setting = await Settings.findOne({ name: "game3rb_latest" });
      const rssData = await parseRssToJson("https://www.game3rb.com/feed/");
      const feed = rssData.items;

      if (feed) {
        if (setting.value != feed[0].isoDate) {
          let lastIndex = feed.findIndex((e) => e.isoDate == setting.value);
          if (!lastIndex) {
            lastIndex = feed.length - 1;
          }
          const newestFeed = feed.slice(0, lastIndex);
          const last_date = feed[0].isoDate;

          setting.value = last_date;
          setting.save();

          const insertedFeed = newestFeed.sort(function (a: any, b: any) {
            return +new Date(a.isoDate) - +new Date(b.isoDate);
          });

          const createMany = await Game3rbFeed.insertMany(insertedFeed);

          return res.status(200).send({
            data: createMany,
            msg: `New feed fetched ${createMany.length}`,
          });
        }
        return res.status(200).send({
          data: [],
          msg: `New feed fetched : 0`,
        });
      }
    } catch (err) {
      return res.send(err);
    }
  }
}
