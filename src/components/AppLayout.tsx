import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Activity, Globe2 } from "lucide-react";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const now = new Date();
  const utc = now.toISOString().slice(11, 19);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />

        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
              <div className="hidden items-center gap-2 md:flex">
                <Globe2 className="h-4 w-4 text-secondary" />
                <span className="font-mono text-xs text-muted-foreground">
                  GLOBAL · OPERATIONAL
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden items-center gap-2 sm:flex">
                <span className="font-mono text-xs text-muted-foreground">UTC</span>
                <span className="font-mono text-xs font-semibold text-foreground">
                  {utc}
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1">
                <Activity className="h-3 w-3 text-success animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-success">
                  Live
                </span>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-x-hidden">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
