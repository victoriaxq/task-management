import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Task, TaskStatus } from '@/types/Task'
import { useState, useEffect } from 'react'
import { taskService } from '@/services/api'

type EditTaskSheetProps = {
  task: Task | null
  isOpen: boolean
  onClose: () => void
  onUpdateTask: (task: Task) => void
  onDeleteTask: (id: number) => void
}

export function EditTaskSheet({ task, isOpen, onClose, onUpdateTask, onDeleteTask }: EditTaskSheetProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.TO_DO)

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setDescription(task.description)
      setStatus(task.status)
    }
  }, [task])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (task) {
      try {
        const updatedTask = await taskService.updateTask({ ...task, title, description, status })
        onUpdateTask(updatedTask)
        onClose()
      } catch (error) {
        console.error('Erro ao atualizar tarefa:', error)
      }
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Editar Tarefa</SheetTitle>
          <SheetDescription>
            Faça as alterações necessárias na tarefa.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">Título</label>
            <Input 
              id="title"
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Descrição</label>
            <Textarea 
              id="description"
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              required 
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-medium">Status</label>
            <Select value={status} onValueChange={(value: TaskStatus) => setStatus(value)}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={TaskStatus.TO_DO}>{TaskStatus.TO_DO}</SelectItem>
                <SelectItem value={TaskStatus.IN_PROGRESS}>{TaskStatus.IN_PROGRESS}</SelectItem>
                <SelectItem value={TaskStatus.DONE}>{TaskStatus.DONE}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-between">
            <Button type="button" variant="destructive" onClick={() => task && onDeleteTask(task.id)}>
              Excluir Tarefa
            </Button>
            <Button type="submit">Salvar Alterações</Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}

