import cron from "node-cron";
import { getLatestFeed } from "./game3rbfeed";

const run = async () => {
  console.log("Scheduler Succesfully Running");
  await cron.schedule("* * * * *", async function () {
    console.log("Run Cron: Get Latest Feed");
    await getLatestFeed();
  });
};

export { run };
