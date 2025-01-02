import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Task, TaskStatus } from '@/types/Task'
import { Pencil } from 'lucide-react'

interface TaskTableProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  sortField: 'title' | 'status';
  sortOrder: 'asc' | 'desc';
  onSort: (field: 'title' | 'status') => void;
}

export function TaskTable({ tasks, onEditTask }: TaskTableProps) {
  const getStatusStyle = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.DONE:
        return 'bg-green-100 text-green-800'
      case TaskStatus.IN_PROGRESS:
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Título</TableHead>
            <TableHead className="hidden md:table-cell">Descrição</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{task.title}</TableCell>
              <TableCell className="hidden md:table-cell">{task.description}</TableCell>
              <TableCell>
                <div className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${getStatusStyle(task.status)}`}>
                  {task.status}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" onClick={() => onEditTask(task)}>
                  <Pencil className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

