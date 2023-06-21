import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { encryptPassword, comparePassword } from "../utils/securePassword" 

import {createJWT, attachCookiesToResponse, verifyToken} from '../utils/jwt'
import customError from "../errors"
const prisma = new PrismaClient()

const login = async (req:Request, res:Response) => {
  const {email, password} = req.body
try {
  const user = await prisma.user.findUniqueOrThrow({
    where :{
      email
    }
  })
  
  const isPasswordMatch = await comparePassword(password, user.password)

  if(isPasswordMatch){
    const token = createJWT({email:user.email, username: user.username, role: user.role})
    await prisma.$disconnect()

    attachCookiesToResponse(res, token)
    res.status(200).json({message : "Utilisateur connecté", token})
  } else {
    await prisma.$disconnect()

    throw new customError.BadRequestError('Mauvais mot de passe')
  }
} catch (error) {
  await prisma.$disconnect()

  throw new customError.NotFoundError('Aucun utilisateur trouvé')
}

}

const register = async (req:Request, res:Response) => {
  const {email, username, password } =req.body

  const encryptedPassword = await encryptPassword(password)
  try {

    const user = await prisma.user.create({
      data: {
        email: email,
        username: username,
        password: encryptedPassword
      }
    })

    await prisma.$disconnect()

    const token = createJWT({email:user.email, username: user.username, role: user.role})
    attachCookiesToResponse(res, token)
    res.status(200).json({message : "utilisateur créé", token})
  } catch (error) {
    await prisma.$disconnect()
    throw new customError.BadRequestError('Erreur')
  }
}

const logout = async (req:Request, res:Response) => {

  res.cookie('token', 'logout', {
    httpOnly: true,
    // expires: new Date(Date.now()),
    secure: process.env.NODE_ENV === 'production',
    // secure: true,
    signed: true,
    maxAge: -1,
    // sameSite: 'none'
  })
  
  res.clearCookie('token')
  res.status(200).json({message : "Utilisateur déconnecté"})
}

export {
  login,
  register,
  logout
}