import express from "express";
import { createUser } from "./../controller/user.controller";

const router = express.Router();

router.route("/register").post(createUser);

export default router;
