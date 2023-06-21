import { Request, Response } from "express";
import { CustomRequest } from "../types/interfaces";
import { CustomJwtPayload } from "jsonwebtoken";




const getProduct = async (req:Request, res:Response) => {
  const {username} = <CustomJwtPayload>(req as CustomRequest).user

  if (username) {
      res.status(200).json({username})
    }
    else {

      res.status(200).json({message : "coucou"})
    }
}

export {
  getProduct
}