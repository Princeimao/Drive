import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface AuthRequest extends Request {
  headers: {
    authorization?: string;
  };
  user: string | JwtPayload;
}

// export interface IResponse extends Response {
//   user: JwtPayload;
// }
