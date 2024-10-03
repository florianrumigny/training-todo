import { Request, Response } from "express";
import { Tasks } from "../entities/Tasks";

export class TasksController {
  static async getAll(_req: Request, res: Response) {
    try {
      const tasks = await Tasks.find({
        relations: {
          user: true,
          tags: true,
        },
      });
      res.send(tasks);
    } catch (error) {
      console.log(error);
      res.status(400).send("Error fetching tasks");
    }
  }

  static async createTask(req: Request, res: Response) {
    try {
      const { description, userId, tags } = req.body;

      const task = new Tasks();
      task.user = userId;
      task.description = description;
      task.tags = tags ? tags : [];

      const result = await task.save();

      console.log(result);

      res.status(201).send(result);
    } catch (error) {
      console.log(error);
      res.status(400).send("Error creating task");
    }
  }

  static async updateTask(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      const task = await Tasks.findOneByOrFail({ id });

      const modifiedTask = Object.assign(task, req.body);

      console.log(modifiedTask);

      const result = await modifiedTask.save();

      console.log(result);

      res.status(200).send("Task updated");
    } catch (error) {
      console.log(error);
      res.status(400).send("Error updating task");
    }
  }

  static async deleteTask(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      const result = await Tasks.delete(id);

      console.log(result);

      res.status(200).send("Task deleted");
    } catch (error) {
      console.log(error);
      res.status(400).send("Error deleting task");
    }
  }
}
