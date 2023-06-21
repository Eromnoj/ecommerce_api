import jwt, {CustomJwtPayload, JwtPayload} from 'jsonwebtoken'
import type {userToken} from '../types/types'
import {Response} from 'express'


const createJWT = ({email,username, role}: userToken ):string => {
  return jwt.sign({email, username, role}, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_LIFETIME
  })
}

const verifyToken = (token:string): CustomJwtPayload => {
  return <CustomJwtPayload>jwt.verify(token, process.env.JWT_SECRET!)
}

const attachCookiesToResponse = (res:Response, token:string) => {
  const oneDay = 1000 * 60 * 60 * 24
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    // secure: true,
    // signed: true,
    // sameSite: 'none'
  })
}

export {
  createJWT,
  verifyToken,
  attachCookiesToResponse
}