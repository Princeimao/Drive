import cors from "cors";
import express from "express";

export const app = express();

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// routes
import uploadRouter from "./src/routes/upload.route";
import userRouter from "./src/routes/user.router";

app.use("/api/user", userRouter);
app.use("/api/user/upload", uploadRouter);
