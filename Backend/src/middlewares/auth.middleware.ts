import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";
import { AuthRequest } from "../interfaces/express.interface";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers?.authorization;

    if (!authHeader) {
      res.status(401).json({
        success: false,
        message: "Authorization header is missing",
      });
      return;
    }

    const token = authHeader?.split(" ")[1];

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Unauthorized request",
      });
      return;
    }

    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not a string");
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    (req as AuthRequest).user = decoded;

    next();
  } catch (error) {
    console.log("somethin went wrong or Unauthorized request");
    return;
  }
};
