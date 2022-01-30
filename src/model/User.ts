import mongoose from "mongoose";
import { TUser } from "../common/types";
import JWT, { Secret } from "jsonwebtoken";
import { JWT_KEY, SESSION_EXPIRES } from "../config/config";
import { NodeMailerServices } from "../services/";

const userSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      unique: true
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
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
    is_verify: {
      type: Boolean,
      required: true,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateToken = function () {
  const token: string = JWT.sign(
    {
      id: this._id,
      email: this.email,
      user_name: this.user_name,
    },
    JWT_KEY as Secret,
    { expiresIn: +(SESSION_EXPIRES as string) * 60 }
  );
  return token;
};

userSchema.methods.sendConfirmationEmail =  function(token: string) {
  return NodeMailerServices.sendConfirmationEmail(this.user_name, this.email, token)
}



export const User = mongoose.model<TUser>("users", userSchema);
