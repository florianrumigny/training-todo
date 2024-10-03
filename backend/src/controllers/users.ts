import { Request, Response } from "express";
import { Users } from "../entities/Users";

export class UsersController {
  static async getAll(_req: Request, res: Response) {
    try {
      const users = await Users.find();
      res.send(users);
    } catch (error) {
      console.log(error);
      res.status(400).send("invalid input");
    }
  }

  static async createUser(req: Request, res: Response) {
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
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      const result = await Users.delete(id);

      console.log("User deleted", result);

      res.status(200).send("User has been deleted");
    } catch (error) {
      console.log(error);
      res.status(404).send("Error deleting user");
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      const user = await Users.findOneByOrFail({ id });

      const modifiedUser = Object.assign(user, req.body);

      const result = await modifiedUser.save();

      console.log(result);

      res.status(200).send("User updated");
    } catch (error) {
      console.log(error);
      res.status(404).send("usersRouter has been modified :)");
    }
  }
}
