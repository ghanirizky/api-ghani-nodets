import mongoose from "mongoose";
import { TUser } from "../common/types"

const userSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  is_active: {
      type: Boolean,
      required: true,
      default: true
  }
}, {
    timestamps: true
});

export const User = mongoose.model<TUser>("users", userSchema);
