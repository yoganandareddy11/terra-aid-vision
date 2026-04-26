import { useMemo, useState } from "react";
import { disasters, disasterIcons, formatPopulation, severityColor, type Disaster } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface WorldMapProps {
  selected?: Disaster | null;
  onSelect?: (d: Disaster) => void;
  filterTypes?: string[];
}

export function WorldMap({ selected, onSelect, filterTypes }: WorldMapProps) {
  const [hovered, setHovered] = useState<Disaster | null>(null);

  const visible = useMemo(
    () => (filterTypes && filterTypes.length > 0 ? disasters.filter((d) => filterTypes.includes(d.type)) : disasters),
    [filterTypes],
  );

  return (
    <div className="relative aspect-[2/1] w-full overflow-hidden rounded-xl border border-border bg-[hsl(220_50%_4%)] shadow-cyan-glow">
      {/* Grid + radar bg */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute inset-0 bg-[var(--gradient-radar)]" />

      {/* Stylized world map (SVG continents — abstract) */}
      <svg viewBox="0 0 1000 500" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="continentGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(188 60% 18%)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(220 50% 12%)" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        {/* Abstract continent shapes */}
        <g fill="url(#continentGrad)" stroke="hsl(188 60% 35% / 0.4)" strokeWidth="1">
          {/* North America */}
          <path d="M 80,100 L 160,90 L 230,110 L 280,170 L 270,240 L 200,280 L 150,260 L 110,200 Z" />
          {/* South America */}
          <path d="M 240,300 L 290,290 L 320,360 L 300,440 L 260,460 L 240,400 Z" />
          {/* Europe */}
          <path d="M 470,120 L 540,110 L 580,150 L 560,200 L 500,210 L 470,170 Z" />
          {/* Africa */}
          <path d="M 490,230 L 580,225 L 610,310 L 580,400 L 520,420 L 490,340 Z" />
          {/* Asia */}
          <path d="M 580,100 L 760,90 L 880,130 L 900,200 L 820,260 L 720,250 L 620,210 L 590,160 Z" />
          {/* Oceania */}
          <path d="M 800,360 L 890,350 L 910,400 L 870,420 L 810,410 Z" />
        </g>
      </svg>

      {/* Radar sweep */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-0 origin-center animate-radar">
          <div className="absolute left-1/2 top-1/2 h-1/2 w-px origin-bottom -translate-x-1/2 bg-gradient-to-t from-secondary/60 via-secondary/20 to-transparent" />
        </div>
      </div>

      {/* Disaster markers */}
      {visible.map((d) => {
        const Icon = disasterIcons[d.type];
        const isActive = selected?.id === d.id || hovered?.id === d.id;
        return (
          <button
            key={d.id}
            onMouseEnter={() => setHovered(d)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onSelect?.(d)}
            className="group absolute -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110"
            style={{ left: `${d.coords.x}%`, top: `${d.coords.y}%` }}
          >
            <span
              className={cn(
                "absolute inset-0 rounded-full",
                d.severity >= 4 ? "animate-pulse-critical" : "animate-pulse-glow",
              )}
              style={{ background: severityColor[d.severity] }}
            />
            <span
              className={cn(
                "relative flex h-8 w-8 items-center justify-center rounded-full border-2 shadow-lg",
                isActive ? "border-foreground scale-110" : "border-background",
              )}
              style={{ backgroundColor: severityColor[d.severity] }}
            >
              <Icon className="h-4 w-4 text-background" />
            </span>
          </button>
        );
      })}

      {/* Hover tooltip */}
      {hovered && (
        <div
          className="pointer-events-none absolute z-10 w-56 -translate-x-1/2 -translate-y-[calc(100%+1rem)] rounded-lg border border-border bg-popover/95 p-3 shadow-elevated backdrop-blur-xl"
          style={{ left: `${hovered.coords.x}%`, top: `${hovered.coords.y}%` }}
        >
          <p className="font-display text-sm font-semibold">{hovered.name}</p>
          <p className="font-mono text-[10px] uppercase text-muted-foreground">
            {hovered.location} · {hovered.country}
          </p>
          <div className="mt-2 grid grid-cols-2 gap-2 border-t border-border pt-2 text-xs">
            <div>
              <p className="text-muted-foreground">Affected</p>
              <p className="font-mono font-semibold">{formatPopulation(hovered.affectedPopulation)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Severity</p>
              <p className="font-mono font-semibold" style={{ color: severityColor[hovered.severity] }}>
                Level {hovered.severity}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Coordinates overlay */}
      <div className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
        AEGIS · Global Incident Map · v4.2
      </div>
      <div className="absolute right-3 top-3 flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-2.5 py-1">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary" />
        <span className="font-mono text-[10px] uppercase text-secondary">Tracking {visible.length}</span>
      </div>
    </div>
  );
}
