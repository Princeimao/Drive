import { Request, Response } from "express";
import userModel from "../models/user.model";
import { createUserSchema, userInput } from "../validation/user.validatoin";

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password }: userInput = createUserSchema.parse(
      req.body
    );

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "User already exists",
      });
      return;
    }

    const user = await userModel.create({
      name,
      email,
      password,
    });

    if (!user) {
      res.status(501).json({
        success: false,
        message: "Internal sever error, creating user",
      });
      return;
    }

    const token = user.generateToken();

    if (!token) {
      throw new Error("Something went wrong while creating token");
    }

    res.status(200).json({
      success: false,
      message: "User created successfully",
      data: user,
      token: token,
    });
  } catch (error) {
    console.log("something went wrong while creating user", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
