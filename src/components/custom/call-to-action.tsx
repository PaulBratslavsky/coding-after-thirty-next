import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"

interface ICallToActionProps {
  readonly title: string
  readonly description: string
  readonly buttonText: string
  readonly onButtonClick?: () => void
}

export function CallToAction({ 
  title,
  description,
  buttonText,
  onButtonClick
}: ICallToActionProps) {
  return (
    <Card className="bg-muted/50">
      <CardContent className="pt-6">
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-muted-foreground">
            {description}
          </p>
          <Button size="lg" className="flex items-center gap-2" onClick={onButtonClick}>
            <Plus className="h-4 w-4" />
            {buttonText}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}