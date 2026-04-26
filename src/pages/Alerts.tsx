import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { alerts as initial } from "@/data/mockData";
import { AlertTriangle, Bell, Info, Volume2, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function Alerts() {
  const [filter, setFilter] = useState<"all" | "critical" | "warning" | "info">("all");
  const [audio, setAudio] = useState(false);
  const [push, setPush] = useState(true);
  const [list] = useState(initial);

  const filtered = filter === "all" ? list : list.filter((a) => a.level === filter);
  const counts = {
    critical: list.filter((a) => a.level === "critical").length,
    warning: list.filter((a) => a.level === "warning").length,
    info: list.filter((a) => a.level === "info").length,
  };

  return (
    <AppLayout>
      <div className="px-6 py-8 md:px-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold md:text-4xl">Live Alerts</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Real-time signals from satellites, sensors, and field teams.
            </p>
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-border bg-card px-4 py-2">
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs">Audio</span>
              <Switch checked={audio} onCheckedChange={(v) => { setAudio(v); toast.success(v ? "Audio alerts on" : "Audio alerts off"); }} />
            </div>
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs">Push</span>
              <Switch checked={push} onCheckedChange={(v) => { setPush(v); toast.success(v ? "Push alerts on" : "Push alerts off"); }} />
            </div>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="mb-4 flex flex-wrap gap-2">
          <FilterChip label="All" count={list.length} active={filter === "all"} onClick={() => setFilter("all")} />
          <FilterChip label="Critical" count={counts.critical} active={filter === "critical"} onClick={() => setFilter("critical")} variant="critical" />
          <FilterChip label="Warning" count={counts.warning} active={filter === "warning"} onClick={() => setFilter("warning")} variant="warning" />
          <FilterChip label="Info" count={counts.info} active={filter === "info"} onClick={() => setFilter("info")} variant="info" />
        </div>

        {/* Alert list */}
        <div className="space-y-3">
          {filtered.map((a) => {
            const Icon = a.level === "critical" ? AlertTriangle : a.level === "warning" ? Bell : Info;
            return (
              <div
                key={a.id}
                className={cn(
                  "group flex gap-4 rounded-xl border p-4 transition-all hover:-translate-y-0.5 hover:shadow-card",
                  a.level === "critical" && "border-critical/40 bg-critical/5",
                  a.level === "warning" && "border-warning/40 bg-warning/5",
                  a.level === "info" && "border-border bg-card",
                )}
              >
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                    a.level === "critical" && "bg-critical/15 text-critical",
                    a.level === "warning" && "bg-warning/15 text-warning",
                    a.level === "info" && "bg-info/15 text-info",
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant="outline"
                      className={cn(
                        "font-mono text-[9px] uppercase",
                        a.level === "critical" && "border-critical text-critical",
                        a.level === "warning" && "border-warning text-warning",
                        a.level === "info" && "border-info text-info",
                      )}
                    >
                      {a.level}
                    </Badge>
                    <span className="font-mono text-[10px] text-muted-foreground">{a.id}</span>
                    <span className="font-mono text-[10px] text-muted-foreground">·</span>
                    <span className="font-mono text-[10px] text-muted-foreground">{a.timestamp}</span>
                  </div>
                  <h3 className="mt-1 text-sm font-semibold leading-tight md:text-base">{a.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{a.message}</p>
                  <p className="mt-2 font-mono text-[10px] uppercase text-muted-foreground">
                    Source: {a.source}
                  </p>
                </div>

                <div className="flex shrink-0 items-start gap-2">
                  <Button size="sm" variant="outline" onClick={() => toast.success(`Acknowledged ${a.id}`)}>
                    <ShieldCheck className="mr-1.5 h-3 w-3" />
                    Ack
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}

function FilterChip({
  label,
  count,
  active,
  onClick,
  variant = "default",
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
  variant?: "default" | "critical" | "warning" | "info";
}) {
  const variantStyles = {
    default: "border-border",
    critical: "border-critical/40",
    warning: "border-warning/40",
    info: "border-info/40",
  };
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-xs transition-colors hover:bg-muted",
        variantStyles[variant],
        active && "bg-primary text-primary-foreground border-primary",
      )}
    >
      <span className="font-medium">{label}</span>
      <span className="font-mono text-[10px] opacity-70">{count}</span>
    </button>
  );
}
