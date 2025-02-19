import { JwtPayload } from "jsonwebtoken";
import { Schema } from "mongoose";

export interface IUserPayload extends JwtPayload {
  _id: Schema.Types.ObjectId;
  email: String;
  name: String;
}
