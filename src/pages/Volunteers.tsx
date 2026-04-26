import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { volunteers as initial, type Volunteer } from "@/data/mockData";
import { Search, MapPin, Clock, CheckCircle2, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const availabilityStyle = {
  "On Mission": "border-warning text-warning bg-warning/10",
  Available: "border-success text-success bg-success/10",
  Standby: "border-info text-info bg-info/10",
  "Off-duty": "border-muted-foreground text-muted-foreground bg-muted/30",
};

export default function Volunteers() {
  const [list] = useState<Volunteer[]>(initial);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string>("all");

  const filtered = list.filter((v) => {
    const matchQ = !query || `${v.name} ${v.role} ${v.skills.join(" ")} ${v.location}`.toLowerCase().includes(query.toLowerCase());
    const matchA = filter === "all" || v.availability === filter;
    return matchQ && matchA;
  });

  const stats = {
    total: list.length,
    onMission: list.filter((v) => v.availability === "On Mission").length,
    available: list.filter((v) => v.availability === "Available").length,
    hours: list.reduce((s, v) => s + v.hours, 0),
  };

  return (
    <AppLayout>
      <div className="px-6 py-8 md:px-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold md:text-4xl">Volunteer Network</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Skilled responders ready to deploy where they're needed most.
            </p>
          </div>
          <Button className="bg-gradient-cyan text-secondary-foreground hover:opacity-90" onClick={() => toast.success("Recruiting form opened")}>
            <UserPlus className="mr-2 h-4 w-4" />
            Recruit Volunteer
          </Button>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          <Stat label="Total Volunteers" value={stats.total} />
          <Stat label="On Mission" value={stats.onMission} accent="text-warning" />
          <Stat label="Available Now" value={stats.available} accent="text-success" />
          <Stat label="Hours Logged" value={stats.hours.toLocaleString()} accent="text-primary" />
        </div>

        {/* Search + filter */}
        <div className="mb-4 flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, skill, location..."
              className="pl-9"
            />
          </div>
          <div className="flex gap-1.5">
            {["all", "Available", "On Mission", "Standby"].map((a) => (
              <button
                key={a}
                onClick={() => setFilter(a)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs transition-colors",
                  filter === a ? "bg-primary text-primary-foreground border-primary" : "border-border bg-card hover:bg-muted",
                )}
              >
                {a === "all" ? "All" : a}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((v) => (
            <div key={v.id} className="stat-card group p-4 transition-all hover:border-primary/40 hover:shadow-glow">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-primary font-display text-base font-bold text-primary-foreground shadow-glow">
                  {v.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-display text-base font-bold">{v.name}</h3>
                      <p className="text-xs text-muted-foreground">{v.role}</p>
                    </div>
                    <Badge variant="outline" className={cn("font-mono text-[9px] uppercase whitespace-nowrap", availabilityStyle[v.availability])}>
                      {v.availability}
                    </Badge>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-1">
                    {v.skills.map((s) => (
                      <span key={s} className="rounded border border-border bg-muted/40 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-border pt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {v.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {v.hours}h
                    </span>
                  </div>
                </div>
              </div>

              <Button
                size="sm"
                variant="outline"
                className="mt-3 w-full"
                disabled={v.availability === "On Mission"}
                onClick={() => toast.success(`Deployment request sent to ${v.name}`)}
              >
                <CheckCircle2 className="mr-1.5 h-3 w-3" />
                {v.availability === "On Mission" ? "Currently Deployed" : "Request Deployment"}
              </Button>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="stat-card mt-3 p-12 text-center">
            <p className="text-sm text-muted-foreground">No volunteers match your filters.</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

function Stat({ label, value, accent }: { label: string; value: number | string; accent?: string }) {
  return (
    <div className="stat-card p-4">
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className={cn("mt-1 font-display text-2xl font-bold", accent)}>{value}</p>
    </div>
  );
}
