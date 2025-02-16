import express from "express";
import { createUser } from "./../controller/user.controller";

const router = express.Router();

//http://localhost:3000/api/user
router.route("/register").post(createUser);

export default router;
