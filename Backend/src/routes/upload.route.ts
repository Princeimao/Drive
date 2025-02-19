import express from "express";
import { uploadFile } from "../controller/uploads.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

//http://localhost:3000/api/user/upload
router.route("/upload-file").post(authMiddleware, uploadFile);

export default router;
