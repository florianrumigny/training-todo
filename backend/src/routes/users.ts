import { Router } from "express";
import { UsersController } from "../controllers/users";
import { validateData } from "../middleware/validationMiddleware";
import { userGenericSchema } from "../schemas/userSchema";

export const usersRouter = Router();

usersRouter.get("/", UsersController.getAll);

usersRouter.post(
  "/",
  validateData(userGenericSchema),
  UsersController.createUser
);

usersRouter.put(
  "/:id",
  validateData(userGenericSchema),
  UsersController.updateUser
);

usersRouter.delete("/:id", UsersController.deleteUser);
