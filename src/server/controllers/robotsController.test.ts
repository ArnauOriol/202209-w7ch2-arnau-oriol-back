import type { NextFunction, Request, Response } from "express";
import CustomError from "../../CustomError/CustomError.js";
import Robot from "../../database/models/Robot.js";
import "../../loadEnvironments.js";
import { mockRobot, mockRobots } from "../../mocks/mockRobots.js";
import mockToken from "../../mocks/mockToken.js";
import { deleteRobot, getRobot, getRobots } from "./robotsController.js";

beforeEach(() => {
  jest.clearAllMocks();
});

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

describe("Given the getRobots function", () => {
  describe("When it receives a request with a list of robots", () => {
    test("Then it should call its method status with a 200 and a list of robots", async () => {
      const expectedStatus = 200;

      Robot.find = jest.fn().mockReturnValue({
        exec: jest.fn().mockReturnValue(mockRobots),
      });

      await getRobots(null, res as Response, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(mockRobots);
    });
  });

  describe("When it receives a request with an error", () => {
    test("Then it should call the received function next with a custom error", async () => {
      const customError = new CustomError("", 500, "Infernal pete");

      Robot.find = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(Error()),
      });

      await getRobots(null, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});

describe("Given the getRobot function", () => {
  describe("When it receives a request with an id", () => {
    test("Then it should call its method status with a 200 and a robot", async () => {
      const expectedStatus = 200;

      Robot.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockReturnValue(mockRobot),
      });

      await getRobot(req as Request, res as Response, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(mockRobot);
    });
  });

  describe("When it receives a request with a valid id that is not in the database", () => {
    test("Then it should call the received function next with a custom error", async () => {
      const idRobot = mockRobot.robotId;

      const currentReq: Partial<Request> = {
        ...req,
        params: {
          idRobot,
        },
      };

      const customError = new CustomError(
        `The robot searched by id (${idRobot}) provided does not exist`,
        404,
        "The robot searched does not exist"
      );

      Robot.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockReturnValue(null),
      });

      await getRobot(
        currentReq as Request,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(customError);
    });
  });

  describe("When it receives a request with the invalid id 'mario'", () => {
    test("Then it should call the received next function with a custom error", async () => {
      const idRobot = "mario";

      const currentReq: Partial<Request> = {
        ...req,
        params: {
          idRobot,
        },
      };

      const customError = new CustomError(
        `The id (${idRobot}) provided is not valid`,
        404,
        "The id provided is not valid"
      );

      await getRobot(
        currentReq as Request,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(customError);
    });
  });

  describe("When it receives a request with an id and could not contact the database", () => {
    test("Then it should call the received next function with a custom error", async () => {
      const customError = new CustomError("", 500, "Infernal pete");

      Robot.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(Error()),
      });

      await getRobot(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});

describe("Given the deleteRobot function", () => {
  describe("When it receives a request with an id and the robot is succesfully deleted", () => {
    test("Then it should call its method status with a 200 and id robot", async () => {
      const expectedStatus = 200;
      const expectedId = {
        id: mockRobot.robotId,
      };

      Robot.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockReturnValue(mockRobot),
      });

      Robot.deleteOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockReturnValue({
          acknowledged: true,
        }),
      });

      await deleteRobot(req as Request, res as Response, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedId);
    });
  });

  describe("When it receives a request with the invalid id 'mario'", () => {
    test("Then it should call the next function with a custom error", async () => {
      const idRobot = "mario";

      const currentReq: Partial<Request> = {
        ...req,
        params: {
          idRobot,
        },
      };

      const customError = new CustomError(
        `The id (${idRobot}) provided is not valid`,
        404,
        "The id provided is not valid"
      );

      await deleteRobot(
        currentReq as Request,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(customError);
    });
  });

  describe("When it receives a request with a valid id that is not in the database", () => {
    test("Then it should call the received function next with a custom error", async () => {
      const idRobot = mockRobot.robotId;

      const currentReq: Partial<Request> = {
        ...req,
        params: {
          idRobot,
        },
      };

      const customError = new CustomError(
        `The robot searched by id (${idRobot}) provided does not exist`,
        404,
        "The robot searched does not exist"
      );

      Robot.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockReturnValue(null),
      });

      await deleteRobot(
        currentReq as Request,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(customError);
    });
  });

  describe("When it receives a request with a valid id but the robot could not be deleted", () => {
    test("Then it should call the received function next with a custom error", async () => {
      const idRobot = mockRobot.robotId;

      const currentReq: Partial<Request> = {
        ...req,
        params: {
          idRobot,
        },
      };

      const customError = new CustomError(
        `Could not delete the robot with id (${idRobot})`,
        404,
        "Could not delete the robot"
      );

      Robot.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockReturnValue(mockRobot),
      });

      Robot.deleteOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockReturnValue({
          acknowledged: false,
        }),
      });

      await deleteRobot(
        currentReq as Request,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(customError);
    });
  });

  describe("When it receives a request with an id and could not contact the database", () => {
    test("Then it should call the received function next with a custom error", async () => {
      const customError = new CustomError("", 500, "Infernal pete");

      Robot.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(Error()),
      });

      await deleteRobot(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});
