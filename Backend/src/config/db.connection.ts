import mongoose from "mongoose";
import { DOCUMENT_NAME, MONGODB_URI } from "./env";

export const dbConnection = async () => {
  try {
    await mongoose.connect(`${MONGODB_URI}/${DOCUMENT_NAME}`);
    console.log("connected to database successfully");
  } catch (error) {
    console.log("something went wrong while connection to database", error);
    process.exit(1);
  }
};
