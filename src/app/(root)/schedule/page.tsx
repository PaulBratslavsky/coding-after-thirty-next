import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Video, CalendarDays } from "lucide-react"
import { CalendarView } from "@/components/custom/calendar-view"
import { ScheduleTable } from "@/components/custom/schedule-table"
import { PageHeader } from "@/components/custom/page-header"
import { loaders } from "@/data-utils/loaders"
import { validateApiResponse } from "@/lib/error-handler"


async function loader() {
  const response = await loaders.getAllItems()
  const data = validateApiResponse(response, "items")
  return data
}


export default async function SchedulePage() {
  const items = await loader()
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <PageHeader 
          title="Video Recording Schedule"
          description="Stay updated with my upcoming video topics and recording schedule. Have a topic suggestion? Let me know!"
        />

        <div className="space-y-8">
          <Card>
            <CardContent>
              <Tabs defaultValue="table" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 mx-auto max-w-sm h-12">
                  <TabsTrigger value="table" className="flex items-center justify-center gap-2 text-sm font-medium">
                    <Video className="h-4 w-4" />
                    Table View
                  </TabsTrigger>
                  <TabsTrigger value="calendar" className="flex items-center justify-center gap-2 text-sm font-medium">
                    <CalendarDays className="h-4 w-4" />
                    Calendar View
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="table">
                  <ScheduleTable items={items} />
                </TabsContent>

                <TabsContent value="calendar">
                  <CalendarView items={items} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
