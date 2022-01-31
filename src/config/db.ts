import mongoose from "mongoose";

const {
  DB_USER,
  DB_PASSWORD,
  DB_CLUSTER,
  DB_NAME,
} = process.env;

const dbConnect = async() => {
    try {
        await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}.mongodb.net/${DB_NAME}?retryWrites=true`);
        console.log("Succesfully Connected to Databases");
      } catch (err: unknown) {
        console.log("Error in Connecting to Databases:: " + err);
      }
}

export {
    dbConnect
}
