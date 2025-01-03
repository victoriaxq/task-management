"use client";

import { useMemo, useState } from "react";
import { TaskTable } from "./TaskTable";
import { TaskFilter } from "./TaskFilter";
import { Button } from "@/components/ui/button";
import { TaskSheet } from "./TaskSheet";
import { EditTaskSheet } from "./EditTaskSheet";
import { Task as TaskType, TaskStatus } from "@/types/Task";
import { taskService } from "@/services/api";
import { useEffect } from "react";
import { Toaster } from "./ui/toaster";
import { useToast } from "./../hooks/use-toast";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { AdminPanel } from "./AdminPanel";

type SortField = "title" | "status";
type SortOrder = "asc" | "desc";

export type Task = TaskType;

export default function TaskPanel() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskStatus | "Todos">("Todos");
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("title");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;
  const { toast } = useToast();

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasksData = await taskService.getTasks();
        setTasks(tasksData);
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
        // Aqui você pode adicionar uma notificação de erro se desejar
      }
    };

    loadTasks();
  }, []);

  const addTask = async (task: Omit<Task, "id">) => {
    try {
      const newTask = await taskService.createTask(task);
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setIsAddSheetOpen(false);
      toast({
        title: "Tarefa adicionada",
        description: "A nova tarefa foi adicionada com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      toast({
        title: "Erro",
        description: "Erro ao adicionar tarefa.",
        variant: "destructive",
      });
    }
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditingTask(null);
    toast({
      title: "Tarefa atualizada",
      description: "A tarefa foi atualizada com sucesso.",
    });
  };

  const deleteTask = async (id: number) => {
    try {
      await taskService.deleteTask(id.toString());
      setTasks(tasks.filter((task) => task.id !== id));
      setEditingTask(null);
      toast({
        title: "Tarefa excluída",
        description: "A tarefa foi excluída com sucesso.",
        variant: "destructive",
      });
    } catch (error) {
      console.error("Erro ao deletar tarefa", error);
    }
  };

  const filteredAndSortedTasks = useMemo(() => {
    return tasks
      .filter(
        (task) =>
          (filter === "Todos" || task.status === filter) &&
          (task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      .sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
  }, [tasks, filter, searchTerm, sortField, sortOrder]);

  const paginatedTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * tasksPerPage;
    const endIndex = startIndex + tasksPerPage;
    return filteredAndSortedTasks.slice(startIndex, endIndex);
  }, [filteredAndSortedTasks, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedTasks.length / tasksPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <Tabs defaultValue="tasks" className="w-full">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="tasks">Tarefas</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>
            <Button onClick={() => setIsAddSheetOpen(true)}>
              Criar Tarefa
            </Button>
          </div>

          <TabsContent value="tasks">
            <div className="space-y-4">
              <div className="flex justify-between items-center flex gap-4">
                <TaskFilter currentFilter={filter} onFilterChange={setFilter} />
                <Input
                  placeholder="Buscar tarefas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>
              <div className="overflow-x-auto">
                <TaskTable
                  tasks={paginatedTasks}
                  onEditTask={setEditingTask}
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSort={toggleSort}
                />
              </div>
              <div className="flex justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Anterior
                </Button>
                <span className="flex items-center">
                  Página {currentPage} de {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Próxima
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="admin">
            <AdminPanel tasks={tasks} />
          </TabsContent>
        </Tabs>
      </div>

      <TaskSheet
        isOpen={isAddSheetOpen}
        onClose={() => setIsAddSheetOpen(false)}
        onAddTask={addTask}
      />
      <EditTaskSheet
        task={editingTask}
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        onUpdateTask={updateTask}
        onDeleteTask={deleteTask}
      />
      <Toaster />
    </div>
  );
}
