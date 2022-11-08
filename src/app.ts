import cors from "cors";
import type { NextFunction, Request, Response } from "express";
import express from "express";
import morgan from "morgan";
import { generalError, notFoundPage } from "./server/middlewares/errors.js";
import robotRouter from "./server/routers/robotRouter.js";
import usersRouter from "./server/routers/usersRouter.js";

const application = express();

application.disable("x-powered-by");

application.use((req: Request, res: Response, next: NextFunction) => {
  req.headers["access-control-allow-origin"] = "*";
  next();
});

const configCors: cors.CorsOptions = {
  origin: "*",
};

application.use(cors(configCors));

application.use(morgan("dev"));
application.use(express.json());

application.use("/robots", robotRouter);
application.use("/users", usersRouter);

application.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Robotland",
  });
});

application.use(notFoundPage);
application.use(generalError);

export default application;
