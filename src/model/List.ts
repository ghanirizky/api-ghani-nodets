import mongoose from "mongoose";
import { TList } from "../common/types"

const userSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  is_resolved: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
    timestamps: true
});

export const List = mongoose.model<TList>("list", userSchema);
