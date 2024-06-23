import { NextFunction, Request, Response } from "express";
import UnauthorizedException from "../exceptions/UnauthorizedException";

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    next(new UnauthorizedException());
    return;
  }

  const token = authHeader?.split(" ")[1];

  if (!token) {
    next(new UnauthorizedException());
    return;
  }

  req.user = {
    id: token,
  };
  next();
};

export { authenticate };
