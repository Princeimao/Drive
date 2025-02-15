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
import userRouter from "./src/routes/user.router";

app.use("/api/user", userRouter);
