import { Router } from "express";
import { TasksController } from "../controllers/tasks";

export const tasksRouter = Router();

tasksRouter.get("/", TasksController.getAll);

tasksRouter.post("/", TasksController.createTask);

tasksRouter.put("/:id", TasksController.updateTask);

tasksRouter.delete("/:id", TasksController.deleteTask);
