import { Request, Response } from "express";
import { ZodError } from "zod";
import { IRequest } from "../interfaces/express.interface";
import userModel from "../models/user.model";
import {
  createUserSchema,
  loginUserSchema,
  userLoginInput,
  userRegisterInput,
} from "../validation/user.validatoin";

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password }: userRegisterInput = createUserSchema.parse(
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
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        message: error.issues,
      });
      return;
    }

    console.log("something went wrong while creating user", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    return;
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password }: userLoginInput = loginUserSchema.parse(req.body);

    const user = await userModel.findOne({ email });

    if (!user) {
      res.status(400).json({
        success: false,
        message: "User not found with this email",
      });
      return;
    }

    const result = await user.comparePassword(password);

    if (result === false) {
      res.status(400).json({
        success: false,
        message: "Incorrect Password",
      });
      return;
    }

    const token = user.generateToken();

    if (!token) {
      throw new Error("Something went wrong while creating token");
    }

    res.status(200).json({
      success: false,
      message: "user login successfully",
      data: user,
      token: token,
    });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        message: error.issues,
      });
      return;
    }

    console.log("something went wrong while creating user session", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    return;
  }
};

// export const getUser = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { email } = (req as IRequest).user;

//     const user = await userModel.findOne({ email }).populate("File");

//     if (!user) {
//       res.status(400).json({
//         success: false,
//         message: "user not found or Unauthorized user",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Files found successfully",
//       file: user?.file,
//     });
//   } catch (error) {
//     console.log("something went wrong while getting the user", error);
//   }
// };

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = (req as IRequest).user;

    const user = await userModel.findOne({ email }).select("-password");

    if (!user) {
      res.status(400).json({
        success: false,
        message: "user not found or Unauthorized user",
      });
    }
    res.status(200).json({
      success: true,
      message: "Files found successfully",
      user,
    });
  } catch (error) {
    console.log("something went wrong while getting the user", error);
  }
};
