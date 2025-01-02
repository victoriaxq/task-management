import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { TaskForm } from "./TaskForm";
import { Task } from "./TaskPanel";

type TaskSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: Omit<Task, "id">) => void;
};

export function TaskSheet({ isOpen, onClose, onAddTask }: TaskSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Criar Nova Tarefa</SheetTitle>
          <SheetDescription>
            Preencha os detalhes da nova tarefa abaixo.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 px-1">
          <TaskForm onAddTask={onAddTask} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
