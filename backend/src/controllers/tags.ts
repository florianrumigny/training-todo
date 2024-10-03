import { Request, Response } from "express";
import { Tags } from "../entities/Tags";

export class TagsController {
  static async getAll(_req: Request, res: Response) {
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
  }

  static async createTag(req: Request, res: Response) {
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
  }

  static async deleteTag(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      const deleteTags = await Tags.delete(id);

      console.log(deleteTags);

      res.status(200).send("Tag has been deleted");
    } catch (error) {
      console.log(error);
      res.status(400).send("Invalid request");
    }
  }

  static async updateTag(req: Request, res: Response) {
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
  }
}
