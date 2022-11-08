import type { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import CustomError from "../../CustomError/CustomError.js";
import Robot from "../../database/models/Robot.js";

export const getRobots = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const robots = await Robot.find().exec();

    res.status(200).json(robots);
  } catch (error: unknown) {
    next(error);
  }
};

export const getRobot = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idRobot } = req.params;

    if (!mongoose.isValidObjectId(idRobot)) {
      throw new CustomError(
        `The id (${idRobot}) provided is not valid`,
        404,
        "The id provided is not valid"
      );
    }

    const robot = await Robot.findById(idRobot).exec();

    if (!robot) {
      throw new CustomError(
        `The robot searched by id (${idRobot}) provided does not exist`,
        404,
        "The robot searched does not exist"
      );
    }

    res.status(200).json(robot);
  } catch (error: unknown) {
    next(error);
  }
};

export const deleteRobot = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idRobot } = req.params;

    if (!mongoose.isValidObjectId(idRobot)) {
      throw new CustomError(
        `The id (${idRobot}) provided is not valid`,
        404,
        "The id provided is not valid"
      );
    }

    const robot = await Robot.findById(idRobot).exec();

    if (!robot) {
      throw new CustomError(
        `The robot searched by id (${idRobot}) provided does not exist`,
        404,
        "The robot searched does not exist"
      );
    }

    const { acknowledged } = await Robot.deleteOne({
      _id: idRobot,
    }).exec();

    if (!acknowledged) {
      throw new CustomError(
        `Could not delete the robot with id (${idRobot})`,
        404,
        "Could not delete the robot"
      );
    }

    res.status(200).json({
      id: idRobot,
    });
  } catch (error: unknown) {
    next(error);
  }
};
