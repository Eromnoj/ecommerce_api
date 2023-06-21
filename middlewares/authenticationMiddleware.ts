import { Request, Response, NextFunction } from "express"
import type { CustomRequest } from "../types/interfaces"
import { verifyToken } from "../utils/jwt"
import { Role } from "@prisma/client"
import { CustomJwtPayload } from "jsonwebtoken"

const authenticateUser = async( req:Request, res:Response, next:NextFunction) =>{
  let token

  const authHeader = req.headers.authorization

  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1]
  } else if (req.cookies.token) {
    token = req.cookies.token
  }

  if (!token) {
    res.status(500).json({message : "Token invalide"})
  }
  
  try {
  (req as CustomRequest).user = verifyToken(token)

  next()
  } catch (error) {
    res.status(500).json({message : "Token invalide", error})
    
  }

}

const authorizeRoles = (...roles:Role[]) => {
  return (req: Request, res:Response, next:NextFunction) => {

  const {role} = <CustomJwtPayload>(req as CustomRequest).user

    if(!roles.includes(role)) {
      throw new Error
    }
  }
}

export {
  authenticateUser
}