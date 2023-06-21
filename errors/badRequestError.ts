import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "./customAPIError";

class BadRequestError extends CustomAPIError {
  statusCode= StatusCodes.BAD_REQUEST;
  constructor(message: string) {
    super(message);
  
  }
}

export {
  BadRequestError
}