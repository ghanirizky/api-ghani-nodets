import express, { Express, Request, Response } from "express";
import Game3rbRouter from "./routes/game3rb";
import mongoose from "mongoose";

const app: Express = express();
const username = "ghani";
const password = "test";
const cluster = "cluster0.ov2w0";
const dbname = "api-ghani";

mongoose.Promise = global.Promise;
mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true`,
  function (error) {
      if(error) console.log(error)
      console.log("connection succes")
  }
//   { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);

app.use(express.json());

app.use("/game3rb", Game3rbRouter);



app.use((req: Request, res: Response) => {
  res.status(404).send("No route found with those value!");
});

//Routes

app.listen(8000, () => {
  console.log(`Application is running at port: 8000`);
});
