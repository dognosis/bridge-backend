import { plainToInstance } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import HttpExpception from "../exceptions/HttpException";

const validateData = (schema: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
      next(new HttpExpception(400, "Request body should be a JSON Object"));
      return;
    }

    const errors = await validate(plainToInstance(schema, req.body));

    if (errors.length > 0) {
      const message = errors
        .map(
          (error: ValidationError) =>
            error.constraints && Object.values(error.constraints)
        )
        .join(", ");

      next(new HttpExpception(422, message));
      return;
    }

    next();
  };
};

export default validateData;
