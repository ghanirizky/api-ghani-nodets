import "dotenv/config";
import express, { Express, Request, Response } from "express";
import routes from "./routes";
import morgan from "morgan";
import { PORT } from "./config/config";
import { dbConnect } from "./config/db";
import { run } from "./cron/";

const app: Express = express();

app.use(morgan("combined"));
app.use(express.json());

//Routes
app.use("/", routes);

app.use((req: Request, res: Response) => {
  res.status(404).send("No route found with those value!");
});

app.listen(PORT, async () => {
  console.log(`Application is running at port: ${PORT}`);
  await dbConnect();
  await run();
});
