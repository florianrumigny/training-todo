import { z } from "zod";

export const tagGenericSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title is too short" })
    .max(200, { message: "Title is too long" }),
  color: z.string().regex(/^#([0-9A-F]{3}|[0-9A-F]{6})$/i, {
    message: "Invalid color format",
  }),
});
