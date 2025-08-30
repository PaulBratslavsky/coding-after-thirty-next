import { Button } from "@/components/ui/button"
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface IScheduleHeaderProps {
  readonly icon: LucideIcon
  readonly title: string
  readonly description: string
  readonly buttonIcon: LucideIcon
  readonly buttonText: string
  readonly onButtonClick?: () => void
}

export function ScheduleHeader({ 
  icon: Icon, 
  title, 
  description, 
  buttonIcon: ButtonIcon, 
  buttonText, 
  onButtonClick 
}: IScheduleHeaderProps) {
  return (
    <CardHeader className="flex flex-row items-center justify-between">
      <div>
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
      <Button className="flex items-center gap-2" onClick={onButtonClick}>
        <ButtonIcon className="h-4 w-4" />
        {buttonText}
      </Button>
    </CardHeader>
  )
}