import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const { PORT, JWT_SECRET, JWT_EXPIRY, MONGODB_URI, DOCUMENT_NAME } =
  process.env;
