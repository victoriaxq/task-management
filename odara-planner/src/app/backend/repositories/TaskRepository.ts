import { prisma } from "../lib/prisma";
import { Prisma, Task } from "@prisma/client";

class TaskRepository {
  async create(data: Prisma.TaskCreateInput): Promise<Task> {
    const task = await prisma.task.create({ data });
    return task;
  }

  async readById(id: number): Promise<Task | null> {
    const task = await prisma.task.findUnique({ where: { id } });
    return task;
  }

  async readAll(): Promise<Task[]> {
    const tasks = await prisma.task.findMany();
    return tasks;
  }

  async update(id: number, data: Prisma.TaskUpdateInput): Promise<Task | null> {
    const task = await prisma.task.update({ where: { id }, data });
    return task;
  }

  async delete(id: number): Promise<Task | null> {
    const task = await prisma.task.delete({ where: { id } });
    return task;
  }
}

const taskRepository = new TaskRepository();
export default taskRepository;
