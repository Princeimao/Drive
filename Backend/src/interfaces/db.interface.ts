import mongoose, { Document } from "mongoose";

export interface Iuser extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  file: mongoose.Schema.Types.ObjectId[];
  generateToken(): string;
  comparePassword(password: string): Promise<boolean>;
  __v: number;
}

export interface IFile extends Document {
  owner: mongoose.Schema.Types.ObjectId;
  filename: string;
  filepath: string;
  mimetype: string;
  size: number;
}
