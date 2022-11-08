import type { NextFunction, Request, Response } from "express";
import CustomError from "../../CustomError/CustomError.js";
import "../../loadEnvironments.js";
import { mockRobot } from "../../mocks/mockRobots.js";
import mockToken from "../../mocks/mockToken.js";
import { authorizationError, generalError, notFoundPage } from "./errors";

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const req: Partial<Request> = {
  params: {
    idRobot: mockRobot.robotId,
  },
  query: {
    token: mockToken,
  },
};

const next = jest.fn().mockReturnThis();

describe("Given the generalError function", () => {
  describe("When it receives a request and a customError with a status 500", () => {
    test("Then it should call its method status with a 500 and public message 'Coronel pete'", () => {
      const expectedStatus = 500;
      const expectedMessage = "Coronel pete";

      const error = new CustomError("", expectedStatus, expectedMessage);

      generalError(error, null, res as Response, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });

  describe("When it receives a request and a customError with no status and no public message", () => {
    test("Then it should call its method status with a 500 and public message 'Something went wrong, try again in 5 minutes'", () => {
      const error = new Error("");

      const expectedStatus = 500;
      const expectedMessage = "Something went wrong, try again in 5 minutes";

      generalError(error as CustomError, null, res as Response, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });
});

describe("Given the notFoundPage function", () => {
  describe("When it receives a request", () => {
    test("Then it should call its method status with a 404", () => {
      const expectedStatus = 404;
      const expectedMessage = { message: "Page not found" };

      res.json = jest.fn().mockReturnValue(expectedMessage);

      notFoundPage(null, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });
});

describe("Given the authorizationError function", () => {
  describe("When it receives a request with a token '4d186321c1a7f0f354b297e8914ab240'", () => {
    test("Then it should call the received function next", async () => {
      authorizationError(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it receives a request with a empty token", () => {
    test("Then it should call the received function next with a custom error", async () => {
      const token = "";

      const currentReq: Partial<Request> = {
        ...req,
        query: {
          token,
        },
      };

      const customError = new CustomError(
        `The token (${token}) provided is missing`,
        498,
        "The token provided is missing"
      );

      authorizationError(
        currentReq as Request,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(customError);
    });
  });

  describe("When it receives a request with a invalid token '1234'", () => {
    test("Then it should call the received function next with a custom error", async () => {
      const token = "1234";

      const currentReq: Partial<Request> = {
        ...req,
        query: {
          token,
        },
      };

      const customError = new CustomError(
        `The token (${token}) provided is not valid`,
        498,
        "The token provided is not valid"
      );

      authorizationError(
        currentReq as Request,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(customError);
    });
  });

  describe("When it receives a request with a valid token 'h29D8b23Llm45'", () => {
    test("Then it should call the received function next", async () => {
      authorizationError(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalled();
    });
  });
});
