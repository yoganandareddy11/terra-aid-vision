import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Scan, Sparkles, AlertTriangle, Building2, TreePine, Waves } from "lucide-react";
import beforeImg from "@/assets/satellite-before.jpg";
import afterImg from "@/assets/satellite-after.jpg";
import { cn } from "@/lib/utils";

interface AnalysisResult {
  damagePercent: number;
  buildingsDamaged: number;
  buildingsDestroyed: number;
  floodedArea: number;
  vegetationLoss: number;
  affectedPeople: number;
  confidence: number;
  severity: 1 | 2 | 3 | 4 | 5;
  recommendations: string[];
}

const mockResult: AnalysisResult = {
  damagePercent: 73,
  buildingsDamaged: 412,
  buildingsDestroyed: 187,
  floodedArea: 4.8,
  vegetationLoss: 38,
  affectedPeople: 12_400,
  confidence: 94.2,
  severity: 5,
  recommendations: [
    "Deploy 3 mobile medical units to grid sectors B4–C6 within 6 hours",
    "Establish emergency shelter for ~12,400 displaced residents",
    "Prioritize search & rescue in northern grid (highest collapse density)",
    "Coordinate water purification — primary supply contaminated",
    "Request airlift for blocked road corridors RD-12 and RD-18",
  ],
};

export function SatelliteComparison() {
  const [sliderPos, setSliderPos] = useState([50]);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);

  const runAnalysis = () => {
    setAnalyzing(true);
    setResult(null);
    setShowOverlay(false);
    setTimeout(() => {
      setAnalyzing(false);
      setResult(mockResult);
      setShowOverlay(true);
    }, 2400);
  };

  return (
    <div className="space-y-6">
      {/* Comparison viewer */}
      <div className="relative overflow-hidden rounded-xl border border-border bg-card shadow-elevated">
        <div className="relative aspect-video w-full select-none overflow-hidden">
          {/* AFTER (base layer) */}
          <img
            src={afterImg}
            alt="Satellite imagery after disaster"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            width={1024}
            height={1024}
          />

          {/* BEFORE (clipped layer) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPos[0]}% 0 0)` }}
          >
            <img
              src={beforeImg}
              alt="Satellite imagery before disaster"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              width={1024}
              height={1024}
            />
          </div>

          {/* Damage overlay */}
          {showOverlay && (
            <svg className="pointer-events-none absolute inset-0 h-full w-full animate-fade-in-up" viewBox="0 0 100 56">
              <defs>
                <pattern id="dmg" width="3" height="3" patternUnits="userSpaceOnUse">
                  <circle cx="1.5" cy="1.5" r="0.4" fill="hsl(var(--destructive))" opacity="0.6" />
                </pattern>
              </defs>
              {/* Damage zones with severity colors */}
              <polygon points="55,15 78,18 82,38 70,46 50,40 48,25" fill="hsl(var(--destructive) / 0.25)" stroke="hsl(var(--destructive))" strokeWidth="0.3" strokeDasharray="1,0.5" />
              <polygon points="40,30 55,32 50,48 35,46" fill="hsl(var(--warning) / 0.2)" stroke="hsl(var(--warning))" strokeWidth="0.3" strokeDasharray="1,0.5" />
              <polygon points="20,40 35,42 32,52 18,50" fill="hsl(var(--severity-3) / 0.2)" stroke="hsl(var(--severity-3))" strokeWidth="0.3" strokeDasharray="1,0.5" />
              {/* Markers */}
              <circle cx="68" cy="28" r="0.8" fill="hsl(var(--destructive))" />
              <circle cx="60" cy="35" r="0.8" fill="hsl(var(--destructive))" />
              <circle cx="45" cy="38" r="0.8" fill="hsl(var(--warning))" />
            </svg>
          )}

          {/* Scan animation */}
          {analyzing && (
            <div className="scan-line absolute inset-0">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background/80 px-4 py-2 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-secondary" />
                  <span className="font-mono text-xs uppercase tracking-wider text-secondary">
                    Analyzing imagery...
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Slider divider line */}
          <div
            className="pointer-events-none absolute inset-y-0 w-0.5 bg-primary shadow-glow"
            style={{ left: `${sliderPos[0]}%` }}
          >
            <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-background px-2 py-1">
              <span className="font-mono text-[10px] font-bold text-primary">{sliderPos[0]}%</span>
            </div>
          </div>

          {/* Labels */}
          <div className="absolute left-3 top-3 rounded-md border border-success/40 bg-background/80 px-2 py-1 backdrop-blur-md">
            <span className="font-mono text-[10px] uppercase tracking-widest text-success">
              ◀ BEFORE · 2024-09-04
            </span>
          </div>
          <div className="absolute right-3 top-3 rounded-md border border-destructive/40 bg-background/80 px-2 py-1 backdrop-blur-md">
            <span className="font-mono text-[10px] uppercase tracking-widest text-destructive">
              AFTER · 2024-09-13 ▶
            </span>
          </div>
        </div>

        {/* Slider control */}
        <div className="border-t border-border bg-card p-4">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Compare
            </span>
            <Slider
              value={sliderPos}
              onValueChange={setSliderPos}
              min={0}
              max={100}
              step={1}
              className="flex-1"
            />
            <Button
              onClick={runAnalysis}
              disabled={analyzing}
              className="bg-gradient-primary text-primary-foreground hover:opacity-90"
            >
              {analyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Scanning
                </>
              ) : (
                <>
                  <Scan className="mr-2 h-4 w-4" />
                  Run AI Analysis
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Analysis result */}
      {result && (
        <div className="animate-fade-in-up rounded-xl border border-primary/30 bg-card p-6 shadow-glow">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="font-display text-lg font-bold">AI Damage Assessment</h3>
              <Badge variant="outline" className="border-secondary/40 bg-secondary/10 text-secondary font-mono text-[10px]">
                {result.confidence}% confidence
              </Badge>
            </div>
            <Badge className="bg-destructive text-destructive-foreground font-mono uppercase">
              Severity {result.severity} · Catastrophic
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            <MetricBox icon={AlertTriangle} label="Damage" value={`${result.damagePercent}%`} accent="critical" />
            <MetricBox icon={Building2} label="Destroyed" value={result.buildingsDestroyed.toString()} accent="critical" />
            <MetricBox icon={Building2} label="Damaged" value={result.buildingsDamaged.toString()} accent="warning" />
            <MetricBox icon={Waves} label="Flooded" value={`${result.floodedArea}km²`} accent="info" />
            <MetricBox icon={TreePine} label="Veg. Loss" value={`${result.vegetationLoss}%`} accent="warning" />
          </div>

          <div className="mt-5">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              AI-Generated Response Recommendations
            </p>
            <ul className="space-y-2">
              {result.recommendations.map((rec, i) => (
                <li
                  key={i}
                  className="flex gap-3 rounded-lg border border-border bg-background/50 p-3 text-sm"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <span className="font-mono text-xs font-semibold text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function MetricBox({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: typeof AlertTriangle;
  label: string;
  value: string;
  accent: "critical" | "warning" | "info";
}) {
  const colors = {
    critical: "text-critical border-critical/30 bg-critical/5",
    warning: "text-warning border-warning/30 bg-warning/5",
    info: "text-info border-info/30 bg-info/5",
  };
  return (
    <div className={cn("rounded-lg border p-3", colors[accent])}>
      <div className="flex items-center gap-1.5">
        <Icon className="h-3 w-3" />
        <span className="font-mono text-[10px] uppercase tracking-wider">{label}</span>
      </div>
      <p className="mt-1 font-display text-xl font-bold text-foreground">{value}</p>
    </div>
  );
}
