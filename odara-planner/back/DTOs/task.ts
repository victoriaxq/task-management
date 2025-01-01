import { z } from "zod";

export enum Status {
    TO_DO,
    IN_PROGRESS,
    DONE,
}

// model Task {
//     id          Int     @id @default(autoincrement())
//     title       String
//     description String
//     status      Status
//   }

// zod schema for Task model não deixa espaços em branco
// o status vai ser uma string mas armazenado como um enum
export const Task = z.object({
    title: z.string().nonempty(),
    description: z.string().nonempty(),
    status: z.nativeEnum(Status),
});