import type { Request, RequestHandler, Response } from "express";

import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { taskService } from "./taskService";

class TaskController {
  public getTasks: RequestHandler = async (_req: Request, res: Response) => {
    const serviceResponse = await taskService.findAll();
    return handleServiceResponse(serviceResponse, res);
  };

  public createTask: RequestHandler = async (req: Request, res: Response) => {
    const task = req.body;
    const serviceResponse = await taskService.create(task);
    return handleServiceResponse(serviceResponse, res);
  };

  public updateTask: RequestHandler = async (req: Request, res: Response) => {
    const task = req.body;
    const serviceResponse = await taskService.update(task);
    return handleServiceResponse(serviceResponse, res);
  };
}

export const taskController = new TaskController();
