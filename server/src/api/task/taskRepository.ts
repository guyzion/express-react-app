import { CreateTaskDto, Task, UpdateTaskDto } from "./taskModel";

const tasks: Task[] = [
  {
    id: 1,
    title: "Task 1",
    description: "This is task 1",
    status: "Pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    title: "Task 2",
    description: "This is task 2",
    status: "Completed",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    title: "Task 3",
    description: "This is task 3",
    status: "In Progress",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    title: "Task 4",
    description: "This is task 4",
    status: "In Progress",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    title: "Task 5",
    description: "This is task 5",
    status: "In Progress",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    title: "Task 6",
    description: "This is task 6",
    status: "In Progress",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 7,
    title: "Task 7",
    description: "This is task 7",
    status: "In Progress",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 8,
    title: "Task 8",
    description: "This is task 8",
    status: "In Progress",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 9,
    title: "Task 9",
    description: "This is task 9",
    status: "In Progress",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 10,
    title: "Task 10",
    description: "This is task 10",
    status: "In Progress",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export class TaskRepository {
  async findAllAsync(): Promise<Task[]> {
    return tasks;
  }

  async createAsync(task: CreateTaskDto): Promise<Task> {
    const newTask: Task = {
      id: tasks.length + 1,
      title: task.title,
      description: task.description,
      status: task.status ?? "Pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    tasks.push(newTask);
    return newTask;
  }

  async updateAsync(task: UpdateTaskDto): Promise<Task> {
    const index = tasks.findIndex((t) => t.id === task.id);
    tasks[index] = { ...tasks[index], ...task, updatedAt: new Date() };
    return tasks[index];
  }
}
