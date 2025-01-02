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
import { Input } from "./ui/input";

type SortField = 'title' | 'status'
type SortOrder = 'asc' | 'desc'

export type Task = TaskType;

export default function TaskPanel() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskStatus | "Todos">("Todos");
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<SortField>('title')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

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
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
    }
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditingTask(null);
  };

  const deleteTask = async (id: number) => {
    try {
      await taskService.deleteTask(id.toString());
      setTasks(tasks.filter((task) => task.id !== id));
      setEditingTask(null);
    } catch (error) {
      console.error("Erro ao deletar tarefa", error);
    }
  };

  const filteredAndSortedTasks = useMemo(() => {
    return tasks
      .filter(task => 
        (filter === 'Todos' || task.status === filter) &&
        (task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
         task.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      .sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1
        if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1
        return 0
      })
  }, [tasks, filter, searchTerm, sortField, sortOrder])

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <TaskFilter currentFilter={filter} onFilterChange={setFilter} />
        <Button onClick={() => setIsAddSheetOpen(true)}>Criar Tarefa</Button>
      </div>
      <Input
          placeholder="Buscar tarefas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      <div className="overflow-x-auto">
      <TaskTable 
            tasks={filteredAndSortedTasks} 
            onEditTask={setEditingTask}
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={toggleSort}
          />
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
