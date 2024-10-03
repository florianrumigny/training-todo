import { Router } from "express";
import { TagsController } from "../controllers/tags";

export const tagsRouter = Router();

tagsRouter.get("/", TagsController.getAll);

tagsRouter.post("/", TagsController.createTag);

tagsRouter.delete("/:id", TagsController.deleteTag);

tagsRouter.put("/:id", TagsController.updateTag);
