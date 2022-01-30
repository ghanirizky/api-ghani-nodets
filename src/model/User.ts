import mongoose from "mongoose";
import { TUser } from "../common/types";
import JWT from "jsonwebtoken";
import { JWT_KEY, SESSION_EXPIRES } from "../config/config";

const userSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    is_active: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateToken = function () {
  const token: string = JWT.sign(
    {
      id: this._id,
      user_name: this.user_name,
      
    },
    JWT_KEY,
    {expiresIn: +SESSION_EXPIRES * 60}
  );
  return token;
};

export const User = mongoose.model<TUser>("users", userSchema);
