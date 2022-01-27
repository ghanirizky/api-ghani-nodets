import mongoose from "mongoose";

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

export const Settings = mongoose.model("settings", settingSchema);
