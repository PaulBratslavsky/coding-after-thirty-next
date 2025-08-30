import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"
import type { TItemData } from "@/types"

interface IScheduleTableProps {
  readonly items: TItemData[]
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return (
        <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
          Completed
        </Badge>
      )
    case "progress":
      return (
        <Badge variant="default" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          In Progress
        </Badge>
      )
    case "schedule":
      return <Badge variant="secondary">Scheduled</Badge>
    case "inbox":
      return <Badge variant="outline">Inbox</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export function ScheduleTable({ items }: IScheduleTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Due Date
            </TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.documentId}>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell>
                <Badge variant="outline">{item.category.title}</Badge>
              </TableCell>
              <TableCell>{getStatusBadge(item.step)}</TableCell>
              <TableCell>
                {new Date(item.dueDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell className="max-w-xs truncate" title={item.description}>
                {item.description}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}