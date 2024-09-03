import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export type Task = z.infer<typeof TaskSchema>;
export const TaskSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  status: z.enum(["Pending", "In Progress", "Completed"]),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateTaskSchema = TaskSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type CreateTaskDto = z.infer<typeof CreateTaskSchema>;

export const PartialTaskSchema = TaskSchema.partial();
export type UpdateTaskDto = z.infer<typeof PartialTaskSchema>;
