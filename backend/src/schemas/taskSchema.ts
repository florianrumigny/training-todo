import { z } from "zod";
import { userGenericSchema } from "./userSchema";
import { tagGenericSchema } from "./tagSchema";

export const genericTaskSchema = z.object({
  description: z
    .string()
    .min(5, { message: "Description is too short" })
    .max(200, { message: "Description is too long" }),
  user: userGenericSchema.optional(),
  tags: z.array(tagGenericSchema).optional(),
});
