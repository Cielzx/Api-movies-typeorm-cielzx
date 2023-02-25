import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

const EnsureDataIsValid =
  (Data: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    const validateData = Data.parse(req.body);

    req.body = validateData;

    return next();
  };

export default EnsureDataIsValid;
