import { Router } from "express";
import { UsersController } from "../controllers/users";

export const usersRouter = Router();

usersRouter.get("/", UsersController.getAll);

usersRouter.post("/", UsersController.createUser);

usersRouter.delete("/:id", UsersController.deleteUser);

usersRouter.put("/:id", UsersController.updateUser);
