import "reflect-metadata";
import express from "express";
import { tasksRouter } from "./routes/tasks";
import { tagsRouter } from "./routes/tags";
import { usersRouter } from "./routes/users";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello Challenge!");
});

app.use("/tasks", tasksRouter);
app.use("/tags", tagsRouter);
app.use("/users", usersRouter);

export default app;
