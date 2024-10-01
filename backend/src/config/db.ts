import { Tags } from "../entities/Tags";
import { Tasks } from "../entities/Tasks";
import { Users } from "../entities/Users";
import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "training_todo.sqlite",
  entities: [Tasks, Tags, Users],
  synchronize: true,
  logging: ["query", "error", "schema"],
});
