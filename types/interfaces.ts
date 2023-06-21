import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";
import { Role } from "@prisma/client";

export interface CustomRequest extends Request {
  user: string | JwtPayload
 }


 declare module "jsonwebtoken" {

  export interface CustomJwtPayload extends JwtPayload {
    email: string  
    username: string
    role: Role
   }
 }
 