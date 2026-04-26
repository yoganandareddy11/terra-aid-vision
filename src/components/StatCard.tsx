import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: string; up: boolean };
  accent?: "primary" | "secondary" | "critical" | "success" | "warning";
  sublabel?: string;
}

const accentMap = {
  primary: "from-primary/20 to-primary/0 text-primary",
  secondary: "from-secondary/20 to-secondary/0 text-secondary",
  critical: "from-critical/20 to-critical/0 text-critical",
  success: "from-success/20 to-success/0 text-success",
  warning: "from-warning/20 to-warning/0 text-warning",
};

export function StatCard({ label, value, icon: Icon, trend, accent = "primary", sublabel }: StatCardProps) {
  return (
    <div className="stat-card group relative overflow-hidden p-5 transition-all hover:border-primary/30 hover:shadow-glow">
      <div className={cn("absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br opacity-50 blur-2xl transition-opacity group-hover:opacity-80", accentMap[accent])} />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {label}
            </p>
            <p className="mt-2 font-display text-3xl font-bold tracking-tight">
              {value}
            </p>
            {sublabel && (
              <p className="mt-1 text-xs text-muted-foreground">{sublabel}</p>
            )}
          </div>
          <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br", accentMap[accent])}>
            <Icon className="h-4 w-4" />
          </div>
        </div>

        {trend && (
          <div className="mt-3 flex items-center gap-1">
            {trend.up ? (
              <TrendingUp className="h-3 w-3 text-success" />
            ) : (
              <TrendingDown className="h-3 w-3 text-destructive" />
            )}
            <span className={cn("font-mono text-xs", trend.up ? "text-success" : "text-destructive")}>
              {trend.value}
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">vs 24h</span>
          </div>
        )}
      </div>
    </div>
  );
}
