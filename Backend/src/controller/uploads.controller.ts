import { Request, Response } from "express";
import { IRequest } from "../interfaces/express.interface";
import userModel from "../models/user.model";

export const uploadFile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = (req as IRequest).user;

    const user = userModel.findOne({ email });

    if (!user) {
      res.status(400).json({
        success: false,
        message: "unauthorized Request",
      });
      return;
    }

    

  } catch (error) {
    console.log("something went wrong while uploading the file"), error;
  }
};
