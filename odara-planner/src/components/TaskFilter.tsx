import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TaskStatus } from '@/types/Task'

type TaskFilterProps = {
  currentFilter: TaskStatus | 'Todos'
  onFilterChange: (filter: TaskStatus | 'Todos') => void
}

export function TaskFilter({ currentFilter, onFilterChange }: TaskFilterProps) {
  return (
    <Select value={currentFilter} onValueChange={onFilterChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Todos">Todos</SelectItem>
        <SelectItem value={TaskStatus.TO_DO}>{TaskStatus.TO_DO}</SelectItem>
        <SelectItem value={TaskStatus.IN_PROGRESS}>{TaskStatus.IN_PROGRESS}</SelectItem>
        <SelectItem value={TaskStatus.DONE}>{TaskStatus.DONE}</SelectItem>
      </SelectContent>
    </Select>
  )
}

