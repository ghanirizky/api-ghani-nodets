import { Request, Response } from "express";
import { parseRssToJson } from "../helpers/getRss";
import { Settings, Game3rbFeed } from "../model/";
import { TFeed } from "../common/types";
import { game3rb_feedURI } from "../common/constant";

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

  static async getLatestFeed(req: Request, res: Response) {
    try {
      const setting = await Settings.findOne({ name: "game3rb_latest" });
      const rssData: any = await parseRssToJson(game3rb_feedURI);
      const feed: TFeed[] = rssData.items;

      if (feed) {
        if (setting!.value != feed[0].isoDate) {
          let lastIndex = feed.findIndex(
            (e: TFeed) => e.isoDate == setting!.value
          );
          if (!lastIndex) {
            lastIndex = feed.length - 1;
          }
          let newestFeed: TFeed[] = feed.slice(0, lastIndex);
          const last_date: string = feed[0].isoDate;

          setting!.value = last_date;
          setting!.save();

          newestFeed = newestFeed.sort(function (
            a: TFeed,
            b: TFeed
          ) {
            return +new Date(a.isoDate) - +new Date(b.isoDate);
          });

          await Game3rbFeed.insertMany(newestFeed);

          return res.status(200).send({
            status: "Ok",
            msg: `New feed fetched ${newestFeed.length}`,
          });
        }
        return res.status(200).send({
          status: "Ok",
          msg: `New feed fetched : 0`,
        });
      }
    } catch (err) {
      return res.send(err);
    }
  }
}
