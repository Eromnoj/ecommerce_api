import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "./customAPIError";

class UnauthenticatedError extends CustomAPIError {
  statusCode= StatusCodes.UNAUTHORIZED;
  constructor(message: string) {
    super(message);
  
  }
}

export {
  UnauthenticatedError
}