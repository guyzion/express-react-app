import axios from "axios";
import type { AxiosInstance } from "axios";
import type { Task } from "../interfaces/task.interface";
import { ServiceResponse } from "src/interfaces/service-response.interface";

class TaskService {
  private api: AxiosInstance;
  private url: string = import.meta.env.VITE_API_URL;

  constructor() {
    this.api = axios.create({
      baseURL: this.url,
    });
  }

  async getTasks() {
    return this.api
      .get<ServiceResponse<Task[]>>("/tasks")
      .then((res) => res.data.responseObject);
  }

  async createTask(task: Task) {
    return this.api
      .post<ServiceResponse<Task>>("/tasks", task)
      .then((res) => res.data.responseObject);
  }

  async updateTask(task: Task) {
    return this.api
      .put<ServiceResponse<Task>>("/tasks", task)
      .then((res) => res.data.responseObject);
  }
}

export const taskService = new TaskService();
