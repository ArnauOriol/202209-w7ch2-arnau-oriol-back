import type { NextFunction, Request, Response } from "express";
import CustomError from "../../CustomError/CustomError.js";

const { SECRET: secret } = process.env;

export const notFoundPage = (req: Request, res: Response) => {
  res.status(404).json({ message: "Page not found" });
};

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction
) => {
  const statusCode = error.statusCode ?? 500;
  const message =
    error.publicMessage || "Something went wrong, try again in 5 minutes";
  res.status(statusCode).json(message);
};

export const authorizationError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.query as {
      token: string;
    };

    if (!token?.length) {
      throw new CustomError(
        `The token (${token}) provided is missing`,
        498,
        "The token provided is missing"
      );
    }

    if (token !== secret) {
      throw new CustomError(
        `The token (${token}) provided is not valid`,
        498,
        "The token provided is not valid"
      );
    }

    next();
  } catch (error: unknown) {
    next(error);
  }
};
