import { NextRequest, NextResponse } from "next/server";
import { taskRepository } from "../../../backend/repositories";
import { UpdateTask } from "../../../backend/DTOs";

export async function GET(
  req: NextRequest,
  { }: { params: { id: string } }
): Promise<NextResponse> {
    try {
      // Extrair o ID do final da URL
      const pathParts = req.nextUrl.pathname.split("/");
      const id = parseInt(pathParts[pathParts.length - 1], 10);
  
      // Verificar se o ID é um número válido
      if (isNaN(id)) {
        return NextResponse.json(
          {
            success: false,
            message: "ID inválido. O ID da tarefa deve ser um número inteiro.",
          },
          { status: 400 }
        );
      }
  
      // Obter a tarefa do repositório
      const task = await taskRepository.readById(id);
  
      if (!task) {
        return NextResponse.json(
          {
            success: false,
            message: "Tarefa não encontrada.",
          },
          { status: 404 }
        );
      }
  
      return NextResponse.json({ success: true, data: task });
    } catch (error) {
      console.error("Erro ao obter tarefa:", error);
      return NextResponse.json(
        {
          success: false,
          message:
            "Ocorreu um erro ao obter a tarefa. Por favor, tente novamente.",
        },
        { status: 500 }
      );
    }
  }
  
  export async function PUT(
    req: NextRequest,
    { }: { params: { id: string } }
  ): Promise<NextResponse> {
    try {
      // Extrair o ID do final da URL
      const pathParts = req.nextUrl.pathname.split("/");
      const id = parseInt(pathParts[pathParts.length - 1], 10);
  
      // Verificar se o ID é válido
      if (isNaN(id)) {
        return NextResponse.json(
          {
            success: false,
            message: "ID inválido. O ID da tarefa deve ser um número inteiro.",
          },
          { status: 400 }
        );
      }
  
      // Validar e obter os dados do corpo da requisição
      const body = await req.json();
      const data = UpdateTask.parse(body); // Usando o DTO UpdateTask para validação
  
      // Verificar se a tarefa existe
      const existingTask = await taskRepository.readById(id);
      if (!existingTask) {
        return NextResponse.json(
          {
            success: false,
            message: "Tarefa não encontrada.",
          },
          { status: 404 }
        );
      }
  
      // Atualizar a tarefa no repositório
      const updatedTask = await taskRepository.update(id, data);
  
      return NextResponse.json({
        success: true,
        message: `Task ${id} updated successfully`,
        data: updatedTask,
      });
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
  
      if (error instanceof Error && error.name === "ZodError") {
        return NextResponse.json(
          {
            success: false,
            message: "Erro de validação dos dados enviados.",
          },
          { status: 400 }
        );
      }
  
      return NextResponse.json(
        {
          success: false,
          message:
            "Ocorreu um erro ao atualizar a tarefa. Por favor, tente novamente.",
        },
        { status: 500 }
      );
    }
  }
  
  export async function DELETE(
    req: NextRequest,
    { }: { params: { id: string } }
  ): Promise<NextResponse> {
    try {
      // Extrair o ID do final da URL
      const pathParts = req.nextUrl.pathname.split("/");
      const id = parseInt(pathParts[pathParts.length - 1], 10);
  
      // Verificar se o ID é válido
      if (isNaN(id)) {
        return NextResponse.json(
          {
            success: false,
            message: "ID inválido. O ID da tarefa deve ser um número inteiro.",
          },
          { status: 400 }
        );
      }
  
      // Verificar se a tarefa existe
      const existingTask = await taskRepository.readById(id);
      if (!existingTask) {
        return NextResponse.json(
          {
            success: false,
            message: "Tarefa não encontrada.",
          },
          { status: 404 }
        );
      }
  
      // Deletar a tarefa do repositório
      await taskRepository.delete(id);
  
      return NextResponse.json({
        success: true,
        message: `Task ${id} deleted successfully`,
      });
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
  
      return NextResponse.json(
        {
          success: false,
          message:
            "Ocorreu um erro ao deletar a tarefa. Por favor, tente novamente.",
        },
        { status: 500 }
      );
    }
  }