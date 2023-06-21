import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "./customAPIError";

class UnauthorizedError extends CustomAPIError {
  statusCode= StatusCodes.FORBIDDEN;
  constructor(message: string) {
    super(message);
  
  }
}

export {
  UnauthorizedError
}