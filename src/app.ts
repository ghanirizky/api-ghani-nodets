import "dotenv/config";
import express, { Express, Request, Response } from "express";
import Game3rbRouter from "./routes/game3rb";
import mongoose from "mongoose";
import morgan from "morgan";
import { DB_URI } from "./common/constant";

const app: Express = express();

(async () => {
  try {
    await mongoose.connect(DB_URI)
    console.log("Succesfully Connected to Databases")
  } catch (err: unknown) {
    console.log('Error in Connecting to Databases:: ' + err)
  }
})()


app.use(morgan("tiny"));
app.use(express.json());
app.use("/game3rb", Game3rbRouter);

app.use((req: Request, res: Response) => {
  res.status(404).send("No route found with those value!");
});

//Routes
app.listen(8000, () => {
  console.log(`Application is running at port: 8000`);
});
