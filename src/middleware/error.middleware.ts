import { NextFunction, Request, Response } from "express";
import HttpExpception from "../exceptions/HttpException";

const handleError = (
  error: HttpExpception | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof HttpExpception) {
    const status = error.status;
    const message = error.message;

    res.status(status).json({ status, message });
    return;
  }

  console.error(
    "---Unexpected-Error---",
    "Rquest",
    req,
    "Response",
    res,
    "Error message",
    error.message,
    "Error Stack",
    error.stack,
    "---Unexpected-Error---"
  );

  const status = 500;
  const message = "Something went wrong";

  res.status(status).json({ status, message });
  return;
};

export default handleError;
