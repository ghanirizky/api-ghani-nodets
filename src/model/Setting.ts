import mongoose from "mongoose";
import { TSettings } from "../common/types"

const settingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  last_update : String
});

export const Settings = mongoose.model<TSettings>("settings", settingSchema);
