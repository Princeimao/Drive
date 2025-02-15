import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import { JWT_SECRET } from "../config/env";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: [3, "Name should atleast 3 character long"],
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: [8, "Password should atleast 8 character long"],
  },
  file: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);

  next();
});

userSchema.methods.comparePassword = async function (password: string) {
  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    console.log("something went wrong while comparing password", error);
  }
};

userSchema.methods.generateToken = async function () {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not a string");
  }
  try {
    const token = await jwt.sign(
      {
        _id: this._id,
        email: this.email,
        name: this.name,
      },
      JWT_SECRET
    );
  } catch (error) {
    console.log("something went wrong while generating token", error);
  }
};

export default mongoose.model("User", userSchema);
