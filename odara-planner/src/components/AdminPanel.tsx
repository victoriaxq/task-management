import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Task } from './TaskPanel'

type AdminPanelProps = {
  tasks: Task[]
}

export function AdminPanel({ tasks }: AdminPanelProps) {
  const totalTasks = tasks.length
  const tasksByStatus = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1
    return acc
  }, {} as Record<Task['status'], number>)

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Dashboard Admin</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Tarefas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTasks}</div>
          </CardContent>
        </Card>
        {Object.entries(tasksByStatus).map(([status, count]) => (
          <Card key={status}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tarefas {status}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{count}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

