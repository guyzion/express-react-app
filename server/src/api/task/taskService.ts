import { StatusCodes } from "http-status-codes";

import type { User } from "@/api/user/userModel";
import { UserRepository } from "@/api/user/userRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
import { TaskRepository } from "./taskRepository";
import { CreateTaskDto, Task, UpdateTaskDto } from "./taskModel";

export class TaskService {
  private taskRepository: TaskRepository;

  constructor(repository: TaskRepository = new TaskRepository()) {
    this.taskRepository = repository;
  }

  // Retrieves all taks from the database
  async findAll(): Promise<ServiceResponse<Task[] | null>> {
    try {
      const tasks = await this.taskRepository.findAllAsync();
      return ServiceResponse.success<Task[]>("Tasks found", tasks);
    } catch (ex) {
      const errorMessage = `Error finding all tasks: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving tasks.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async create(task: CreateTaskDto): Promise<ServiceResponse<Task | null>> {
    try {
      const newTask = await this.taskRepository.createAsync(task);
      return ServiceResponse.success<Task>("Task created", newTask);
    } catch (ex) {
      const errorMessage = `Error creating task: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while creating task.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(task: UpdateTaskDto): Promise<ServiceResponse<Task | null>> {
    try {
      const updatedTask = await this.taskRepository.updateAsync(task);
      return ServiceResponse.success<Task>("Task updated", updatedTask);
    } catch (ex) {
      const errorMessage = `Error updating task: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while updating task.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export const taskService = new TaskService();
