import mongoose from "mongoose";
import { TFeed } from "../common/types"

const feedSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  enclosure: Array,
  content: String,
  contentSnippet : String,
  guid : String,
  categories : Array,
  isoDate : String
});

export const Game3rbFeed = mongoose.model<TFeed>("game3rb_feed", feedSchema);

