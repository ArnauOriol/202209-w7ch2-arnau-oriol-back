import type { NextFunction, Request } from "express";
import CustomError from "../../CustomError/CustomError";
import { userLogin } from "./usersController";

describe("Given the userLogin function", () => {
  describe("When it receives a request with the username 'Paco' that is not registered", () => {
    test("Then it should call the next function with a custom error", async () => {
      const req: Partial<Request> = {
        body: {
          username: "Paco",
        },
      };
      const next = jest.fn();
      const customError = new CustomError(
        "Username not found",
        401,
        "Wrong credentials"
      );

      await userLogin(req as Request, null, next as NextFunction);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});
