import { Request, Response, NextFunction } from 'express'
import { CustomAPIError } from '../errors/customAPIError'

const errorHandler = (err:CustomAPIError, req: Request, res: Response, next: NextFunction) => {
  
  let customError = {
    statusCode: err.statusCode,
    message: err.message
  }
  return res.status(customError.statusCode).json({message : customError.message})


}

export default errorHandler