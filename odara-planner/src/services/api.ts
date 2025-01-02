import { Task, TaskStatus } from '@/types/Task';

const API_URL = '/api/task'; // Note que agora usamos rota relativa já que está no Next.js

// Função auxiliar para converter o status do backend para o frontend
const convertStatusFromServer = (status: string): TaskStatus => {
  const statusMap: Record<string, TaskStatus> = {
    TO_DO: TaskStatus.TO_DO,
    IN_PROGRESS: TaskStatus.IN_PROGRESS,
    DONE: TaskStatus.DONE
  };
  return statusMap[status] || TaskStatus.TO_DO;
};

// Função auxiliar para converter o status do frontend para o backend
const convertStatusToServer = (status: TaskStatus): string => {
  const statusMap: Record<TaskStatus, string> = {
    [TaskStatus.TO_DO]: 'TO_DO',
    [TaskStatus.IN_PROGRESS]: 'IN_PROGRESS',
    [TaskStatus.DONE]: 'DONE'
  };
  return statusMap[status];
};

export const taskService = {
  async getTasks(): Promise<Task[]> {
    const response = await fetch(API_URL);
    const data = await response.json();
    
    // Convertendo os dados do backend para o formato do frontend
    return data.data.map((task: Task) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      status: convertStatusFromServer(task.status)
    }));
  },

  async createTask(task: Omit<Task, 'id'>) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...task,
        status: convertStatusToServer(task.status)
      }),
    });
    const data = await response.json();
    return {
      ...data.data,
      status: convertStatusFromServer(data.data.status)
    };
  },

  async updateTask(task: Task) {
    const response = await fetch(`${API_URL}/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...task,
        status: convertStatusToServer(task.status)
      }),
    });
    const data = await response.json();
    return {
      ...data.data,
      status: convertStatusFromServer(data.data.status)
    };
  },

  async deleteTask(id: string | number) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao deletar tarefa');
    }
  },
}; 