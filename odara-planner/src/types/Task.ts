export enum TaskStatus {
  TO_DO = 'A fazer',
  IN_PROGRESS = 'Em progresso',
  DONE = 'Concluído'
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
}

// Função helper para exibição amigável do status
export const getStatusDisplay = (status: TaskStatus): string => {
  const displayMap: Record<TaskStatus, string> = {
    [TaskStatus.TO_DO]: 'A Fazer',
    [TaskStatus.IN_PROGRESS]: 'Em Progresso',
    [TaskStatus.DONE]: 'Concluído'
  };
  return displayMap[status];
}; 