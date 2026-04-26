import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { WorldMap } from "@/components/WorldMap";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import {
  disasters,
  disasterIcons,
  formatPopulation,
  severityColor,
  severityLabel,
  statusColor,
  type Disaster,
  type DisasterType,
} from "@/data/mockData";
import { Filter, Users, Activity, DollarSign, Clock, MapPin, Wind, Flame, Waves, Mountain, Snowflake, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const filterOptions: { type: DisasterType; label: string; icon: typeof Wind }[] = [
  { type: "wildfire", label: "Wildfire", icon: Flame },
  { type: "flood", label: "Flood", icon: Waves },
  { type: "hurricane", label: "Hurricane", icon: Wind },
  { type: "earthquake", label: "Earthquake", icon: Mountain },
  { type: "blizzard", label: "Blizzard", icon: Snowflake },
  { type: "tornado", label: "Tornado", icon: Zap },
];

export default function MapPage() {
  const [selected, setSelected] = useState<Disaster | null>(disasters[0]);
  const [activeFilters, setActiveFilters] = useState<DisasterType[]>([]);

  const toggleFilter = (t: DisasterType) => {
    setActiveFilters((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  };

  return (
    <AppLayout>
      <div className="px-6 py-8 md:px-10">
        <div className="mb-6">
          <h1 className="font-display text-3xl font-bold md:text-4xl">Disaster Map</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Real-time geospatial view of every active incident.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-4 flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card p-3">
          <div className="flex items-center gap-1.5 pr-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Filter
            </span>
          </div>
          {filterOptions.map((f) => (
            <Toggle
              key={f.type}
              pressed={activeFilters.includes(f.type)}
              onPressedChange={() => toggleFilter(f.type)}
              size="sm"
              className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              <f.icon className="mr-1.5 h-3 w-3" />
              {f.label}
            </Toggle>
          ))}
          {activeFilters.length > 0 && (
            <Button size="sm" variant="ghost" onClick={() => setActiveFilters([])} className="ml-auto text-xs">
              Clear all
            </Button>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <WorldMap selected={selected} onSelect={setSelected} filterTypes={activeFilters} />

            {/* Legend */}
            <div className="mt-3 flex flex-wrap items-center gap-3 rounded-lg border border-border bg-card px-4 py-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Severity
              </span>
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: severityColor[s as 1 | 2 | 3 | 4 | 5] }} />
                  <span className="font-mono text-[10px] text-muted-foreground">L{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Detail panel */}
          <div className="space-y-4">
            {selected ? (
              <>
                <div className="stat-card overflow-hidden">
                  <div
                    className="h-1.5 w-full"
                    style={{ backgroundColor: severityColor[selected.severity] }}
                  />
                  <div className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                          {selected.id}
                        </p>
                        <h2 className="mt-1 font-display text-xl font-bold">{selected.name}</h2>
                        <p className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" /> {selected.location}, {selected.country}
                        </p>
                      </div>
                      <Badge variant="outline" className={cn("font-mono text-[9px] uppercase", statusColor[selected.status])}>
                        {selected.status}
                      </Badge>
                    </div>

                    <p className="mt-3 text-sm text-muted-foreground">{selected.description}</p>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <DetailMetric icon={Activity} label="Severity" value={`L${selected.severity} · ${severityLabel[selected.severity]}`} color={severityColor[selected.severity]} />
                      <DetailMetric icon={Users} label="Affected" value={formatPopulation(selected.affectedPopulation)} />
                      <DetailMetric icon={DollarSign} label="Damage" value={`$${selected.damageEstimate}M`} />
                      <DetailMetric icon={Clock} label="Started" value={new Date(selected.startedAt).toLocaleDateString()} />
                    </div>

                    <Button className="mt-4 w-full bg-gradient-primary text-primary-foreground hover:opacity-90">
                      View Response Plan
                    </Button>
                  </div>
                </div>

                <div className="stat-card p-4">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Response Status
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm">Teams deployed</span>
                    <span className="font-mono font-bold text-primary">{selected.responseTeams}</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full bg-gradient-primary"
                      style={{ width: `${Math.min(100, selected.responseTeams * 1.2)}%` }}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="stat-card p-8 text-center">
                <p className="text-sm text-muted-foreground">Select a marker on the map</p>
              </div>
            )}

            {/* Other incidents */}
            <div>
              <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                All Incidents ({disasters.length})
              </p>
              <div className="space-y-1.5">
                {disasters.map((d) => {
                  const Icon = disasterIcons[d.type];
                  return (
                    <button
                      key={d.id}
                      onClick={() => setSelected(d)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg border p-2.5 text-left transition-colors",
                        selected?.id === d.id
                          ? "border-primary/50 bg-primary/5"
                          : "border-border bg-card hover:border-primary/30",
                      )}
                    >
                      <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md"
                        style={{
                          backgroundColor: `${severityColor[d.severity]}22`,
                          color: severityColor[d.severity],
                        }}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold">{d.name}</p>
                        <p className="font-mono text-[10px] text-muted-foreground">
                          {formatPopulation(d.affectedPopulation)} affected
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function DetailMetric({ icon: Icon, label, value, color }: { icon: typeof Activity; label: string; value: string; color?: string }) {
  return (
    <div className="rounded-lg border border-border bg-background/50 p-2.5">
      <div className="flex items-center gap-1 text-muted-foreground">
        <Icon className="h-3 w-3" />
        <span className="font-mono text-[9px] uppercase tracking-wider">{label}</span>
      </div>
      <p className="mt-0.5 text-sm font-bold" style={color ? { color } : undefined}>
        {value}
      </p>
    </div>
  );
}
