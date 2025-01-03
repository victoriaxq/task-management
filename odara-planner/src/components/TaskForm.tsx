import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Task, TaskStatus } from '@/types/Task'

type TaskFormProps = {
  onAddTask: (task: Omit<Task, 'id'>) => void
  onClose: () => void
}

export function TaskForm({ onAddTask, onClose }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.TO_DO)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onAddTask({
      title,
      description,
      status,
    })
    setTitle('')
    setDescription('')
    setStatus(TaskStatus.TO_DO)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">Título</label>
        <Input 
          id="title"
          placeholder="Título da tarefa" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">Descrição</label>
        <Textarea 
          id="description"
          placeholder="Descrição da tarefa" 
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
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">Adicionar Tarefa</Button>
      </div>
    </form>
  )
}

