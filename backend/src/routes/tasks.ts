import { Router } from "express";
import { TasksController } from "../controllers/tasks";
import { validateData } from "../middleware/validationMiddleware";
import { genericTaskSchema } from "../schemas/taskSchema";

export const tasksRouter = Router();

tasksRouter.get("/", TasksController.getAll);

tasksRouter.post(
  "/",
  validateData(genericTaskSchema),
  TasksController.createTask
);

tasksRouter.put(
  "/:id",
  validateData(genericTaskSchema),
  TasksController.updateTask
);

tasksRouter.delete("/:id", TasksController.deleteTask);
