import "reflect-metadata";
import express from "express";
import { dataSource } from "./config/db";
import { Tasks } from "./entities/Tasks";
import { Users } from "./entities/Users";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello Challenge!");
});

// CRUD TASKS

app.get("/tasks", async (_req, res) => {
  const tasks = await Tasks.find({
    relations: {
      user: true,
      tags: true,
    },
  });
  res.send(tasks);
});

app.post("/tasks", async (req, res) => {
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
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const result = await Tasks.delete(id);

    console.log(result);

    res.status(200).send("Task deleted");
  } catch (error) {
    console.log(error);
    res.status(400).send("Error deleting task");
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const task = await Tasks.findOneByOrFail({ id });

    const modifiedTask = Object.assign(task, req.body);

    const result = await modifiedTask.save();

    console.log(result);

    res.status(200).send("Task updated");
  } catch (error) {
    console.log(error);
    res.status(400).send("Error updating task");
  }
});

// CRUD USER

app.get("/users", async (_req, res) => {
  const users = await Users.find();
  res.send(users);
});

app.post("/users", async (req, res) => {
  try {
    const { name } = req.body;

    const user = new Users();

    user.name = name;

    const result = await user.save();

    console.log("User created", result);
    res.status(201).send(result);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error creating user");
  }
});

app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`Server is running at http://localhost:${port}`);
});
