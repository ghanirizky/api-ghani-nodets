import { parseRssToJson } from "../helpers/getRss";
import { Settings, Game3rbFeed } from "../model/";
import { TFeed } from "../common/types";
import { game3rb_feedURI } from "../common/constant";

const getLatestFeed = async () => {
  try {
    const setting = await Settings.findOne({ name: "game3rb_latest" });
    const rssData: any = await parseRssToJson(game3rb_feedURI);
    const feed: TFeed[] = rssData.items;

    if (feed) {
      if (setting!.value != feed[0].isoDate) {
        let lastIndex = feed.findIndex(
          (e: TFeed) => e.isoDate == setting!.value
        );
        if (!lastIndex) lastIndex = feed.length - 1;

        let newestFeed: TFeed[] = feed
          .slice(0, lastIndex)
          .sort(function (a: TFeed, b: TFeed) {
            return +new Date(a.isoDate) - +new Date(b.isoDate);
          });

        const last_date: string = feed[0].isoDate;

        setting!.value = last_date;
        setting!.save();

        await Game3rbFeed.insertMany(newestFeed);

        console.log(`Feed fetched: ${newestFeed.length}`)

      }
    }

    console.log(`No new feed fetched`)

  } catch (err) {
    console.log("Error in fetching data", err);
  }
};

export {
    getLatestFeed
}
