import { Role } from "@prisma/client";

export type userToken = {
  email:string,
  username:string;
  role:Role
}