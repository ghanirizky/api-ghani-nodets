import "dotenv/config";
import express, { Express, Request, Response } from "express";
import routes from "./routes"
import mongoose from "mongoose";
import morgan from "morgan";
import { DB_URI } from "./config/config";

const app: Express = express();

(async () => {
  try {
    await mongoose.connect(DB_URI)
    console.log("Succesfully Connected to Databases")
  } catch (err: unknown) {
    console.log('Error in Connecting to Databases:: ' + err)
  }
})()

app.use(morgan("combined"));
app.use(express.json());

//Routes
app.use("/", routes)

app.use((req: Request, res: Response) => {
  res.status(404).send("No route found with those value!");
});


app.listen(8000, () => {
  console.log(`Application is running at port: 8000`);
});
