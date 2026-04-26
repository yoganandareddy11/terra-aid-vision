import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { aidRequests as initial, type AidRequest } from "@/data/mockData";
import { HandHeart, Plus, MapPin, Users, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const urgencyColor = {
  Critical: "border-critical text-critical bg-critical/10",
  High: "border-warning text-warning bg-warning/10",
  Medium: "border-info text-info bg-info/10",
  Low: "border-muted-foreground text-muted-foreground bg-muted/30",
};

const statusColor = {
  Pending: "border-muted-foreground/40 text-muted-foreground",
  Matched: "border-info text-info",
  "In Transit": "border-warning text-warning",
  Delivered: "border-success text-success",
};

export default function Aid() {
  const [requests, setRequests] = useState<AidRequest[]>(initial);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<string>("all");
  const [form, setForm] = useState({ type: "Medical", urgency: "High", location: "", quantity: "", beneficiaries: "" });

  const filtered = filter === "all" ? requests : requests.filter((r) => r.urgency === filter);

  const submit = () => {
    if (!form.location || !form.quantity) {
      toast.error("Please fill in location and resource details.");
      return;
    }
    const newReq: AidRequest = {
      id: `AR-${Math.floor(7300 + Math.random() * 100)}`,
      type: form.type as AidRequest["type"],
      urgency: form.urgency as AidRequest["urgency"],
      location: form.location,
      quantity: form.quantity,
      requested: "just now",
      status: "Pending",
      beneficiaries: parseInt(form.beneficiaries) || 0,
    };
    setRequests([newReq, ...requests]);
    setOpen(false);
    setForm({ type: "Medical", urgency: "High", location: "", quantity: "", beneficiaries: "" });
    toast.success("Aid request submitted — matching nearby resources.");
  };

  const totals = {
    pending: requests.filter((r) => r.status === "Pending").length,
    inTransit: requests.filter((r) => r.status === "In Transit").length,
    delivered: requests.filter((r) => r.status === "Delivered").length,
    beneficiaries: requests.reduce((s, r) => s + r.beneficiaries, 0),
  };

  return (
    <AppLayout>
      <div className="px-6 py-8 md:px-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold md:text-4xl">Aid Requests</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Match resources to needs — automatically routed by urgency and proximity.
            </p>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow">
                <Plus className="mr-2 h-4 w-4" />
                New Request
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="font-display">Submit Aid Request</DialogTitle>
              </DialogHeader>
              <div className="grid gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block font-mono text-[10px] uppercase text-muted-foreground">Type</label>
                    <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {["Medical", "Shelter", "Food & Water", "Search & Rescue", "Transport"].map((t) => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="mb-1 block font-mono text-[10px] uppercase text-muted-foreground">Urgency</label>
                    <Select value={form.urgency} onValueChange={(v) => setForm({ ...form, urgency: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {["Critical", "High", "Medium", "Low"].map((u) => (
                          <SelectItem key={u} value={u}>{u}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="mb-1 block font-mono text-[10px] uppercase text-muted-foreground">Location</label>
                  <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="District / shelter / coordinates" />
                </div>
                <div>
                  <label className="mb-1 block font-mono text-[10px] uppercase text-muted-foreground">Resources Needed</label>
                  <Textarea value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} placeholder="e.g., 200 trauma kits, 5000L water" rows={3} />
                </div>
                <div>
                  <label className="mb-1 block font-mono text-[10px] uppercase text-muted-foreground">Beneficiaries (est.)</label>
                  <Input type="number" value={form.beneficiaries} onChange={(e) => setForm({ ...form, beneficiaries: e.target.value })} placeholder="0" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={submit} className="bg-gradient-primary text-primary-foreground">Submit</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Mini stats */}
        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          <MiniStat label="Pending" value={totals.pending} accent="muted-foreground" />
          <MiniStat label="In Transit" value={totals.inTransit} accent="warning" />
          <MiniStat label="Delivered" value={totals.delivered} accent="success" />
          <MiniStat label="People Helped" value={totals.beneficiaries.toLocaleString()} accent="primary" />
        </div>

        {/* Filter */}
        <div className="mb-3 flex flex-wrap gap-2">
          {["all", "Critical", "High", "Medium", "Low"].map((u) => (
            <button
              key={u}
              onClick={() => setFilter(u)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs transition-colors",
                filter === u ? "bg-primary text-primary-foreground border-primary" : "border-border bg-card hover:bg-muted",
              )}
            >
              {u === "all" ? "All requests" : u}
            </button>
          ))}
        </div>

        {/* Table-like list */}
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="hidden grid-cols-12 gap-3 border-b border-border bg-muted/30 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:grid">
            <div className="col-span-1">ID</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-2">Urgency</div>
            <div className="col-span-3">Location</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2 text-right">Beneficiaries</div>
          </div>
          {filtered.map((r) => (
            <div key={r.id} className="grid grid-cols-1 gap-2 border-b border-border px-4 py-3 transition-colors hover:bg-muted/20 md:grid-cols-12 md:gap-3 md:items-center">
              <div className="col-span-1 font-mono text-xs text-muted-foreground">{r.id}</div>
              <div className="col-span-2 flex items-center gap-2">
                <HandHeart className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{r.type}</span>
              </div>
              <div className="col-span-2">
                <Badge variant="outline" className={cn("font-mono text-[9px] uppercase", urgencyColor[r.urgency])}>
                  {r.urgency}
                </Badge>
              </div>
              <div className="col-span-3 flex items-center gap-1.5 text-sm">
                <MapPin className="h-3 w-3 text-muted-foreground" />
                {r.location}
                <span className="ml-1 text-xs text-muted-foreground">· {r.quantity}</span>
              </div>
              <div className="col-span-2">
                <Badge variant="outline" className={cn("font-mono text-[9px] uppercase", statusColor[r.status])}>
                  {r.status}
                </Badge>
              </div>
              <div className="col-span-2 flex items-center justify-end gap-1 text-sm">
                <Users className="h-3 w-3 text-muted-foreground" />
                <span className="font-mono font-semibold">{r.beneficiaries.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

function MiniStat({ label, value, accent }: { label: string; value: number | string; accent: string }) {
  return (
    <div className="stat-card p-4">
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className={cn("mt-1 font-display text-2xl font-bold", `text-${accent}`)}>{value}</p>
    </div>
  );
}
