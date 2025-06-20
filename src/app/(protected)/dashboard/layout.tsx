import { getUserMeLoader } from "@/lib/services/user";
import { Header } from "@/components/custom/header";

import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

async function loader() {
  try {
    const user = await getUserMeLoader();
    return user?.data;
  } catch (error) {
    console.error("Failed to load user:", error);
    throw error;
  }
}

export default async function DashboardRoute({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const user = await loader();
  const { username, email } = user;


  return (
    <TooltipProvider delayDuration={0}>
      <Header user={user}/>
      <Separator />
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={25}>
          <ScrollArea className="h-[calc(100vh-72px)] w-full p-4">
            <div className="space-y-2">
              <div>
                <h2 className="text-xl font-bold mb-4">User Menu</h2>
                <div className="space-y-2">
                  <div>Username: {username}</div>
                  <div>Email: {email}</div>
                </div>
              </div>
            </div>
          </ScrollArea>
          <Separator />
        </ResizablePanel>

        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>{children}</ResizablePanel>
      </ResizablePanelGroup>
      <Separator />
    </TooltipProvider>
  );
}
