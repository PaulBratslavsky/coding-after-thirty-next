import { Badge } from "@/components/ui/badge"
import type { TItemData } from "@/types"

interface ICalendarViewProps {
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

const getDaysInMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

const getFirstDayOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
}

const getItemForDate = (date: string, items: TItemData[]) => {
  return items.find((item) => {
    const itemDate = new Date(item.dueDate)
    const itemDateString = `${itemDate.getFullYear()}-${String(itemDate.getMonth() + 1).padStart(2, "0")}-${String(itemDate.getDate()).padStart(2, "0")}`
    return itemDateString === date
  })
}

export function CalendarView({ items }: ICalendarViewProps) {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()
  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const days = []

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-24 p-2"></div>)
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    const item = getItemForDate(dateString, items)
    const isToday = day === currentDate.getDate()

    days.push(
      <div
        key={day}
        className={`h-24 p-2 border border-border rounded-lg ${
          isToday ? "bg-primary/10 border-primary" : "bg-card hover:bg-muted/50"
        } transition-colors`}
      >
        <div className={`text-sm font-medium mb-1 ${isToday ? "text-primary" : "text-foreground"}`}>{day}</div>
        {item && (
          <div className="space-y-1">
            <div className="text-xs font-medium text-foreground truncate" title={item.title}>
              {item.title}
            </div>
            <div className="flex items-center gap-1">{getStatusBadge(item.step)}</div>
          </div>
        )}
      </div>,
    )
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold">
          {monthNames[currentMonth]} {currentYear}
        </h3>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
            {day}
          </div>
        ))}
        {days}
      </div>
    </div>
  )
}