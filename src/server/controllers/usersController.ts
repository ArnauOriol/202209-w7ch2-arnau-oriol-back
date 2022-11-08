import type { NextFunction, Request, Response } from "express";

export interface BodyCredentials {
  username: string;
  password: string;
}

export const userLogin = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({
      message: "Login",
    });
  } catch (error: unknown) {
    next(error);
  }
};
