import { NextRequest, NextResponse } from "next/server";
import { taskRepository } from "../../backend/repositories";
import { Task } from "../../backend/DTOs";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Validar e obter os dados do corpo da requisição
    const body = await req.json(); // O Next.js precisa que o JSON seja parseado explicitamente
    const data = Task.parse(body); // Supondo que Task usa Zod para validação

    // Criar a nova tarefa no repositório
    const task = await taskRepository.create(data);

    // Mensagem de sucesso
    const message = `Task ${task.id} created successfully`;

    // Retornar a resposta para o cliente
    return NextResponse.json(
      {
        success: true,
        message,
        data: task, // Inclui a tarefa criada para o cliente
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        {
          success: false,
          message: "Erro de validação dos dados enviados.",
        },
        { status: 400 }
      );
    }

    // Erro interno genérico
    return NextResponse.json(
      {
        success: false,
        message:
          "Ocorreu um erro ao criar a tarefa. Por favor, tente novamente.",
      },
      { status: 500 }
    );
  }
}

export async function GET(): Promise<NextResponse> {
  try {
    // Obter todas as tarefas do repositório
    const tasks = await taskRepository.readAll();
    
    // Convertendo o status do banco para o formato da API
    const formattedTasks = tasks.map(task => ({
      ...task,
      status: task.status.toUpperCase() // Convertendo para o formato esperado pelo frontend
    }));

    // Retornar as tarefas para o cliente
    return NextResponse.json({ success: true, data: formattedTasks });
  } catch (error) {
    console.error("Erro ao obter tarefas:", error);

    // Erro interno genérico
    return NextResponse.json(
      {
        success: false,
        message:
          "Ocorreu um erro ao obter as tarefas. Por favor, tente novamente.",
      },
      { status: 500 }
    );
  }
}

