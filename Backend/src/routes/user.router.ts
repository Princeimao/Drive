import express from "express";
import { createUser, loginUser } from "./../controller/user.controller";

const router = express.Router();

//http://localhost:3000/api/user
router.route("/register").post(createUser);
router.route("/login").post(loginUser);

export default router;
