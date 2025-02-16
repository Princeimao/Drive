import mongoose, { Document } from "mongoose";

export interface Iuser extends Document {
  name: string;
  email: string;
  password: string;
  file: mongoose.Schema.Types.ObjectId;
  generateToken(): string;
  comparePassword(password: string): Promise<boolean>;
}
