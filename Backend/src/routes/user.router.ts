import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  createUser,
  getUser,
  loginUser,
} from "./../controller/user.controller";

const router = express.Router();

//http://localhost:3000/api/user
router.route("/register").post(createUser);
router.route("/login").post(loginUser);
router.route("/get-user").get(authMiddleware, getUser);

export default router;
