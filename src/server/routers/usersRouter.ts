import { Router } from "express";
import { userLogin } from "../controllers/usersController";

const usersRouter = Router();

usersRouter.post("/login", userLogin);

export default usersRouter;
