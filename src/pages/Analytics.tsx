import { AppLayout } from "@/components/AppLayout";
import { Badge } from "@/components/ui/badge";
import { disasters, formatPopulation } from "@/data/mockData";
import { TrendingUp, Clock, HandHeart, Users, Satellite, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

// Simulated trend data
const monthlyIncidents = [
  { m: "Apr", v: 4 }, { m: "May", v: 6 }, { m: "Jun", v: 5 },
  { m: "Jul", v: 9 }, { m: "Aug", v: 11 }, { m: "Sep", v: 14 },
];

const responseTimes = [
  { region: "North America", h: 2.4 },
  { region: "South America", h: 4.1 },
  { region: "Europe", h: 1.8 },
  { region: "Africa", h: 5.2 },
  { region: "Asia", h: 3.6 },
  { region: "Oceania", h: 4.8 },
];

export default function Analytics() {
  const maxIncident = Math.max(...monthlyIncidents.map((m) => m.v));
  const maxResponse = Math.max(...responseTimes.map((r) => r.h));

  const typeBreakdown = disasters.reduce<Record<string, number>>((acc, d) => {
    acc[d.type] = (acc[d.type] || 0) + 1;
    return acc;
  }, {});

  const totalAffected = disasters.reduce((s, d) => s + d.affectedPopulation, 0);
  const totalDamage = disasters.reduce((s, d) => s + d.damageEstimate, 0);

  return (
    <AppLayout>
      <div className="px-6 py-8 md:px-10">
        <div className="mb-6">
          <h1 className="font-display text-3xl font-bold md:text-4xl">Analytics & Reports</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Mission performance, response trends, and impact metrics.
          </p>
        </div>

        {/* KPI strip */}
        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          <Kpi icon={Activity} label="Avg Response Time" value="3.2h" trend="-18%" trendUp accent="success" />
          <Kpi icon={Satellite} label="Satellite Passes" value="248" trend="+12%" trendUp accent="secondary" />
          <Kpi icon={HandHeart} label="Aid Delivered" value="1,842t" trend="+34%" trendUp accent="primary" />
          <Kpi icon={Users} label="People Reached" value={formatPopulation(totalAffected)} trend="+8%" trendUp accent="warning" />
        </div>

        {/* Charts */}
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Bar chart - incidents per month */}
          <div className="stat-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-display text-base font-bold">Incidents Over Time</h3>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Last 6 months
                </p>
              </div>
              <Badge variant="outline" className="font-mono text-[10px] border-warning/40 text-warning bg-warning/10">
                <TrendingUp className="mr-1 h-3 w-3" />
                +250%
              </Badge>
            </div>
            <div className="flex h-48 items-end gap-3">
              {monthlyIncidents.map((m, i) => (
                <div key={m.m} className="flex flex-1 flex-col items-center gap-2">
                  <div className="relative w-full flex-1">
                    <div
                      className="absolute bottom-0 w-full rounded-t bg-gradient-to-t from-primary to-primary-glow transition-all hover:opacity-80"
                      style={{ height: `${(m.v / maxIncident) * 100}%`, animation: `fade-in-up 0.5s ease-out ${i * 80}ms both` }}
                    />
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground">{m.m}</span>
                  <span className="font-mono text-xs font-bold">{m.v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Response times by region */}
          <div className="stat-card p-5">
            <div className="mb-4">
              <h3 className="font-display text-base font-bold">Response Time by Region</h3>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Hours from alert to first responder
              </p>
            </div>
            <div className="space-y-3">
              {responseTimes.map((r) => (
                <div key={r.region}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs">{r.region}</span>
                    <span className="font-mono text-xs font-semibold">{r.h}h</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        r.h < 3 ? "bg-success" : r.h < 4.5 ? "bg-warning" : "bg-critical",
                      )}
                      style={{ width: `${(r.h / maxResponse) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Type breakdown */}
          <div className="stat-card p-5">
            <h3 className="mb-4 font-display text-base font-bold">Incident Type Breakdown</h3>
            <div className="space-y-2">
              {Object.entries(typeBreakdown).map(([type, count]) => {
                const pct = (count / disasters.length) * 100;
                return (
                  <div key={type}>
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="capitalize">{type}</span>
                      <span className="font-mono text-muted-foreground">{count} ({pct.toFixed(0)}%)</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                      <div className="h-full bg-gradient-cyan" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Damage estimate */}
          <div className="stat-card overflow-hidden p-5">
            <h3 className="mb-4 font-display text-base font-bold">Damage Estimate (USD millions)</h3>
            <div className="space-y-2">
              {[...disasters].sort((a, b) => b.damageEstimate - a.damageEstimate).slice(0, 5).map((d) => {
                const pct = (d.damageEstimate / totalDamage) * 100;
                return (
                  <div key={d.id}>
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="truncate">{d.name}</span>
                      <span className="font-mono font-semibold text-primary">${d.damageEstimate}M</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                      <div className="h-full bg-gradient-primary" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-4 border-t border-border pt-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Total estimate: <span className="text-primary">${(totalDamage / 1000).toFixed(2)}B</span>
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function Kpi({
  icon: Icon, label, value, trend, trendUp, accent,
}: {
  icon: typeof Activity; label: string; value: string; trend: string; trendUp: boolean; accent: string;
}) {
  const accentClass = {
    primary: "text-primary bg-primary/10",
    secondary: "text-secondary bg-secondary/10",
    success: "text-success bg-success/10",
    warning: "text-warning bg-warning/10",
  }[accent] || "";
  return (
    <div className="stat-card p-4">
      <div className={cn("mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg", accentClass)}>
        <Icon className="h-4 w-4" />
      </div>
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-2xl font-bold">{value}</p>
      <p className={cn("mt-1 font-mono text-[10px]", trendUp ? "text-success" : "text-destructive")}>
        {trend} this quarter
      </p>
    </div>
  );
}
