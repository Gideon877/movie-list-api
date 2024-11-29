import { Types } from "mongoose";

export interface JwtPayload {
    username: string;
    sub: Types.ObjectId; 
  }
  