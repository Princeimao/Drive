import { Request } from "express";
import { IUserPayload } from "./jwt.interface";

export interface IRequest extends Request {
  headers: {
    authorization?: string;
  };
  user: IUserPayload;
}

// export interface IResponse extends Response {
//   user: JwtPayload;
// }
