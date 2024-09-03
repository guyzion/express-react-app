import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { PartialTaskSchema, TaskSchema } from "@/api/task/taskModel";
import { taskController } from "./taskController";
import { validateRequest } from "@/common/utils/httpHandlers";

export const taskRegistry = new OpenAPIRegistry();
export const taskRouter: Router = express.Router();

taskRegistry.register("Task", TaskSchema);

taskRegistry.registerPath({
  method: "get",
  path: "/tasks",
  tags: ["Task"],
  responses: createApiResponse(z.array(TaskSchema), "Success"),
});

taskRouter.get("/", taskController.getTasks);

taskRegistry.registerPath({
  method: "post",
  path: "/tasks",
  tags: ["Task"],
  responses: createApiResponse(TaskSchema, "Success"),
});
taskRouter.post(
  "/",
  validateRequest(PartialTaskSchema),
  taskController.createTask
);

taskRegistry.registerPath({
  method: "put",
  path: "/tasks",
  tags: ["Task"],
  responses: createApiResponse(TaskSchema, "Success"),
});
taskRouter.put(
  "/",
  validateRequest(PartialTaskSchema),
  taskController.updateTask
);
