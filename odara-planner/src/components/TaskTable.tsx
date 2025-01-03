import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Task, TaskStatus } from "@/types/Task";
import { Pencil, ChevronUp, ChevronDown } from "lucide-react";

interface TaskTableProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  sortField: "title" | "status";
  sortOrder: "asc" | "desc";
  onSort: (field: "title" | "status") => void;
}

export function TaskTable({
  tasks,
  onEditTask,
  sortField,
  sortOrder,
  onSort,
}: TaskTableProps) {
  const getStatusStyle = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.DONE:
        return "bg-green-100 text-green-800";
      case TaskStatus.IN_PROGRESS:
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderSortIcon = (field: "title" | "status") => {
    const Icon = sortOrder === "asc" ? ChevronUp : ChevronDown;
    const isActive = sortField === field;
    return (
      <Icon
        className={`inline ml-2 transition-all ${
          isActive ? "h-4 w-4" : "h-3 w-3 text-gray-400"
        }`}
      />
    );
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className="w-[200px] cursor-pointer"
              onClick={() => onSort("title")}
            >
              Título {renderSortIcon("title")}
            </TableHead>
            <TableHead className="">Descrição</TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => onSort("status")}
            >
              Status {renderSortIcon("status")}
            </TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{task.title}</TableCell>
              <TableCell className="">{task.description}</TableCell>
              <TableCell>
                <div
                  className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${getStatusStyle(
                    task.status
                  )}`}
                >
                  {task.status}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEditTask(task)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
