import { z } from "zod";

// model Task {
//     id          Int     @id @default(autoincrement())
//     title       String
//     description String
//     status      Status
//   }

export const Task = z.object({
  title: z
    .string()
    .nonempty("Title must not be empty")
    .min(3, "Title must be at least 3 characters long")
    .max(50, "Title must be at most 50 characters long"),
  description: z
    .string()
    .nonempty("Description must not be empty")
    .min(3, "Description must be at least 3 characters long")
    .max(500, "Description must be at most 500 characters long"),
  status: z.enum(['TO_DO', 'IN_PROGRESS', 'DONE']),
});

export const UpdateTask = Task.partial();
