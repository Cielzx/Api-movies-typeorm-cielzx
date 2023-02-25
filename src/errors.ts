import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

class appError extends Error {
  message: string;
  statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

const handleErrors = async (
  error: Error,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  if (error instanceof appError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  if (error instanceof ZodError) {
    return res.status(400).json({ message: error.flatten().fieldErrors });
  }

  console.log(error);

  return res.status(500).json({
    message: "Internal server error",
  });
};

export { appError, handleErrors };
