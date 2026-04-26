import { AppLayout } from "@/components/AppLayout";
import { SatelliteComparison } from "@/components/SatelliteComparison";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Satellite, Layers, Calendar, MapPin, Cpu } from "lucide-react";
import { useState } from "react";
import { disasters } from "@/data/mockData";

export default function Assessment() {
  const [selectedRegion, setSelectedRegion] = useState(disasters[0].id);
  const [layer, setLayer] = useState("rgb");

  return (
    <AppLayout>
      <div className="px-6 py-8 md:px-10">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Satellite className="h-5 w-5 text-primary" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                AI-Powered Damage Assessment
              </span>
            </div>
            <h1 className="font-display text-3xl font-bold md:text-4xl">
              Satellite Imagery Assessment
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Compare before & after satellite imagery, run AI damage analysis, and
              generate response recommendations in seconds.
            </p>
          </div>

          <Badge variant="outline" className="border-secondary/40 bg-secondary/10 text-secondary font-mono text-[10px]">
            <Cpu className="mr-1.5 h-3 w-3" />
            AEGIS Vision Model v2.4
          </Badge>
        </div>

        {/* Controls */}
        <div className="mb-6 grid gap-3 rounded-xl border border-border bg-card p-4 md:grid-cols-4">
          <ControlSelect
            icon={MapPin}
            label="Region"
            value={selectedRegion}
            onValueChange={setSelectedRegion}
            options={disasters.map((d) => ({ value: d.id, label: `${d.name} · ${d.location}` }))}
          />
          <ControlSelect
            icon={Layers}
            label="Spectral Band"
            value={layer}
            onValueChange={setLayer}
            options={[
              { value: "rgb", label: "RGB · True Color" },
              { value: "nir", label: "NIR · Near Infrared" },
              { value: "swir", label: "SWIR · Burn Detection" },
              { value: "ndvi", label: "NDVI · Vegetation" },
            ]}
          />
          <ControlSelect
            icon={Calendar}
            label="Resolution"
            value="10m"
            onValueChange={() => {}}
            options={[
              { value: "10m", label: "10m · Sentinel-2" },
              { value: "3m", label: "3m · Planet Labs" },
              { value: "0.5m", label: "0.5m · WorldView-3" },
            ]}
          />
          <ControlSelect
            icon={Satellite}
            label="Source"
            value="esa"
            onValueChange={() => {}}
            options={[
              { value: "esa", label: "ESA Sentinel-2" },
              { value: "nasa", label: "NASA Landsat-9" },
              { value: "modis", label: "MODIS Terra" },
              { value: "planet", label: "Planet SkySat" },
            ]}
          />
        </div>

        {/* Comparison + AI */}
        <SatelliteComparison />

        {/* Method explanation */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              n: "01",
              title: "Capture",
              desc: "Multi-spectral imagery from a fleet of partner satellites with sub-daily revisit times.",
            },
            {
              n: "02",
              title: "Analyze",
              desc: "Computer vision models segment damage, classify severity, and estimate population impact.",
            },
            {
              n: "03",
              title: "Coordinate",
              desc: "Generated response plans flow directly to field teams, logistics, and aid matching.",
            },
          ].map((s) => (
            <div key={s.n} className="stat-card p-5">
              <p className="font-mono text-xs font-bold text-primary">{s.n}</p>
              <h3 className="mt-2 font-display text-lg font-bold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

function ControlSelect({
  icon: Icon,
  label,
  value,
  onValueChange,
  options,
}: {
  icon: typeof Satellite;
  label: string;
  value: string;
  onValueChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <Icon className="h-3 w-3" />
        {label}
      </label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="bg-background">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
