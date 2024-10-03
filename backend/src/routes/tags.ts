import { Router } from "express";
import { TagsController } from "../controllers/tags";
import { validateData } from "../middleware/validationMiddleware";
import { tagGenericSchema } from "../schemas/tagSchema";

export const tagsRouter = Router();

tagsRouter.get("/", TagsController.getAll);

tagsRouter.post("/", validateData(tagGenericSchema), TagsController.createTag);

tagsRouter.put(
  "/:id",
  validateData(tagGenericSchema),
  TagsController.updateTag
);

tagsRouter.delete("/:id", TagsController.deleteTag);
