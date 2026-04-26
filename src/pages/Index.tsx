import { AppLayout } from "@/components/AppLayout";
import { StatCard } from "@/components/StatCard";
import { WorldMap } from "@/components/WorldMap";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Users,
  HandHeart,
  DollarSign,
  Satellite,
  Activity,
  ArrowRight,
  Radio,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  alerts,
  disasters,
  disasterIcons,
  formatPopulation,
  globalMetrics,
  severityColor,
  severityLabel,
  statusColor,
} from "@/data/mockData";
import heroImg from "@/assets/hero-earth.jpg";
import { cn } from "@/lib/utils";

const Index = () => {
  const topDisasters = [...disasters]
    .sort((a, b) => b.severity - a.severity || b.affectedPopulation - a.affectedPopulation)
    .slice(0, 4);
  const recentAlerts = alerts.slice(0, 4);

  return (
    <AppLayout>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Earth seen from orbit at night with city lights"
            className="h-full w-full object-cover opacity-40"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
        </div>

        <div className="relative px-6 py-12 md:px-10 md:py-16">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                Live Operations · 7 disasters tracked
              </span>
            </div>

            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              When the world breaks,{" "}
              <span className="text-gradient-primary">we see it first.</span>
            </h1>

            <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              AEGIS is a satellite-powered disaster relief command platform.
              Real-time imagery, AI damage assessment, and coordinated response —
              compressing hours of analysis into seconds when every minute matters.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow">
                <Link to="/assessment">
                  <Satellite className="mr-2 h-4 w-4" />
                  Run Satellite Assessment
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-secondary/40 text-secondary hover:bg-secondary/10">
                <Link to="/map">
                  Explore Disaster Map
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="px-6 py-8 md:px-10">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold">Global Operations</h2>
            <p className="text-sm text-muted-foreground">Live snapshot · refreshes every 30s</p>
          </div>
          <Badge variant="outline" className="font-mono text-[10px] border-success/40 text-success bg-success/10">
            <Radio className="mr-1.5 h-3 w-3 animate-pulse" />
            ALL SYSTEMS NOMINAL
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard
            label="Active Incidents"
            value={globalMetrics.activeIncidents}
            icon={AlertTriangle}
            accent="critical"
            trend={{ value: "+2", up: true }}
            sublabel="Across 6 regions"
          />
          <StatCard
            label="People Affected"
            value={formatPopulation(globalMetrics.affectedPopulation)}
            icon={Users}
            accent="warning"
            trend={{ value: "+340K", up: true }}
            sublabel="Across all events"
          />
          <StatCard
            label="Aid Delivered"
            value={`${globalMetrics.aidDelivered}t`}
            icon={HandHeart}
            accent="success"
            trend={{ value: "+18%", up: true }}
            sublabel="Last 24 hours"
          />
          <StatCard
            label="Damage Estimate"
            value={`$${(globalMetrics.damageEstimate / 1000).toFixed(1)}B`}
            icon={DollarSign}
            accent="primary"
            sublabel="USD across events"
          />
        </div>
      </section>

      {/* Map + Alerts */}
      <section className="grid gap-6 px-6 pb-8 md:px-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold">Global Incident Map</h2>
            <Link to="/map" className="font-mono text-[10px] uppercase text-secondary hover:underline">
              Open full map →
            </Link>
          </div>
          <WorldMap />
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold">Live Alerts</h2>
            <Link to="/alerts" className="font-mono text-[10px] uppercase text-secondary hover:underline">
              All alerts →
            </Link>
          </div>
          <div className="space-y-2">
            {recentAlerts.map((a) => (
              <div
                key={a.id}
                className={cn(
                  "rounded-lg border p-3 transition-colors hover:border-primary/40",
                  a.level === "critical" && "border-critical/40 bg-critical/5",
                  a.level === "warning" && "border-warning/40 bg-warning/5",
                  a.level === "info" && "border-border bg-card/50",
                )}
              >
                <div className="mb-1 flex items-center justify-between">
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
                  <span className="font-mono text-[10px] text-muted-foreground">{a.timestamp}</span>
                </div>
                <p className="text-sm font-medium leading-tight">{a.title}</p>
                <p className="mt-1 font-mono text-[10px] text-muted-foreground">{a.source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top disasters */}
      <section className="px-6 pb-12 md:px-10">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold">Priority Incidents</h2>
          <span className="font-mono text-[10px] uppercase text-muted-foreground">
            Sorted by severity
          </span>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {topDisasters.map((d) => {
            const Icon = disasterIcons[d.type];
            return (
              <div
                key={d.id}
                className="group stat-card relative overflow-hidden p-4 transition-all hover:border-primary/40 hover:shadow-glow"
              >
                <div className="flex items-start justify-between">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: `${severityColor[d.severity]}22`,
                      color: severityColor[d.severity],
                    }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <Badge variant="outline" className={cn("font-mono text-[9px] uppercase", statusColor[d.status])}>
                    {d.status}
                  </Badge>
                </div>

                <h3 className="mt-3 font-display text-base font-bold">{d.name}</h3>
                <p className="font-mono text-[10px] uppercase text-muted-foreground">
                  {d.location} · {d.country}
                </p>

                <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border pt-3 text-xs">
                  <div>
                    <p className="font-mono text-[9px] uppercase text-muted-foreground">Severity</p>
                    <p className="font-semibold" style={{ color: severityColor[d.severity] }}>
                      L{d.severity} · {severityLabel[d.severity]}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[9px] uppercase text-muted-foreground">Affected</p>
                    <p className="font-mono font-semibold">{formatPopulation(d.affectedPopulation)}</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Activity className="h-3 w-3 text-secondary" />
                  <span>{d.responseTeams} teams deployed</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </AppLayout>
  );
};

export default Index;
