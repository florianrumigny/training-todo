import "reflect-metadata";
import express from "express";
import { dataSource } from "./config/db";
import { Tasks } from "./entities/Tasks";
import { Users } from "./entities/Users";
import { Tags } from "./entities/Tags";

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

    console.log(modifiedTask);

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

app.delete("/users/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const result = await Users.delete(id);

    console.log("User deleted", result);

    res.status(200).send("User has been deleted");
  } catch (error) {
    console.log(error);
    res.status(404).send("Error deleting user");
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const user = await Users.findOneByOrFail({ id });

    const modifiedUser = Object.assign(user, req.body);

    const result = await modifiedUser.save();

    console.log(result);

    res.status(200).send("User updated");
  } catch (error) {
    console.log(error);
    res.status(404).send("App has been modified :)");
  }
});

// CRUD TAGS

app.get("/tags", async (_req, res) => {
  try {
    const result = await Tags.find({
      relations: {
        tasks: true,
      },
    });

    console.log(result);

    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(404).send("Error to get tags");
  }
});

app.post("/tags", async (req, res) => {
  try {
    const { title, color } = req.body;

    const tag = new Tags();

    tag.title = title;
    tag.color = color;

    const result = await tag.save();
    console.log(result);
    res.status(201).send("Tag created");
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

app.delete("/tags/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const deleteTags = await Tags.delete(id);

    console.log(deleteTags);

    res.status(200).send("Tag has been deleted");
  } catch (error) {
    console.log(error);
    res.status(400).send("Invalid request");
  }
});

app.put("/tags/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const findTag = await Tags.findOneByOrFail({ id });

    const updatedTag = Object.assign(findTag, req.body);

    const result = await updatedTag.save();

    console.log(result);

    res.status(200).send("Tag has been updated");
  } catch (error) {
    console.log(error);
    res.status(400).send("An error occur");
  }
});

app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`Server is running at http://localhost:${port}`);
});
