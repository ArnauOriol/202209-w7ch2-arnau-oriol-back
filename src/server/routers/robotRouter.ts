import { Router } from "express";
import {
  deleteRobot,
  getRobot,
  getRobots,
} from "../controllers/robotsController.js";
import { authorizationError } from "../middlewares/errors.js";

const robotRouter = Router();

robotRouter.get("/", getRobots);
robotRouter.get("/:idRobot", getRobot);
robotRouter.delete("/delete/:idRobot", authorizationError, deleteRobot);

export default robotRouter;
