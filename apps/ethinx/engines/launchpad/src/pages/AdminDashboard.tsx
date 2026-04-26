import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { TopNav } from "@/components/TopNav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Search, Video, Users, ShoppingBag, GraduationCap, ClipboardList } from "lucide-react";

function StatCard({ label, value, icon: Icon }: { label: string; value: string | number; icon?: any }) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-4">
        {Icon && <Icon className="h-5 w-5 text-primary" />}
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-lg font-semibold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    pending: "bg-warning/15 text-warning border-warning/30",
    in_progress: "bg-info/15 text-info border-info/30",
    completed: "bg-success/15 text-success border-success/30",
    cancelled: "bg-destructive/15 text-destructive border-destructive/30",
    approved: "bg-success/15 text-success border-success/30",
    rejected: "bg-destructive/15 text-destructive border-destructive/30",
    under_review: "bg-info/15 text-info border-info/30",
  };
  return (
    <Badge variant="outline" className={colors[status] || ""}>
      {status.replace(/_/g, " ")}
    </Badge>
  );
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// ─── Video Requests Tab ───
function VideoRequestsTab() {
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    supabase.from("video_requests").select("*").order("created_at", { ascending: false }).then(({ data }) => setData(data || []));
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("video_requests").update({ status }).eq("id", id);
    setData((d) => d.map((r) => (r.id === id ? { ...r, status } : r)));
    toast({ title: "Status updated" });
  };

  const filtered = useMemo(() =>
    data.filter((r) => r.email?.toLowerCase().includes(search.toLowerCase()) || r.topic?.toLowerCase().includes(search.toLowerCase())),
    [data, search]
  );

  const counts = useMemo(() => ({
    total: data.length,
    pending: data.filter((r) => r.status === "pending").length,
    in_progress: data.filter((r) => r.status === "in_progress").length,
    completed: data.filter((r) => r.status === "completed").length,
  }), [data]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Total" value={counts.total} icon={Video} />
        <StatCard label="Pending" value={counts.pending} />
        <StatCard label="In Progress" value={counts.in_progress} />
        <StatCard label="Completed" value={counts.completed} />
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input className="pl-9" placeholder="Search by email or topic..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className="overflow-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Topic</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Tone</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-medium">{r.email}</TableCell>
                <TableCell>{r.topic}</TableCell>
                <TableCell>{r.platform}</TableCell>
                <TableCell>{r.tone}</TableCell>
                <TableCell>{r.duration}</TableCell>
                <TableCell>
                  <Select value={r.status} onValueChange={(v) => updateStatus(r.id, v)}>
                    <SelectTrigger className="h-8 w-32"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["pending", "in_progress", "completed", "cancelled"].map((s) => (
                        <SelectItem key={s} value={s}>{s.replace(/_/g, " ")}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>{formatDate(r.created_at)}</TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">No video requests found</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// ─── Partner Applications Tab ───
function PartnerApplicationsTab() {
  const [data, setData] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    supabase.from("partner_applications").select("*").order("created_at", { ascending: false }).then(({ data }) => setData(data || []));
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("partner_applications").update({ status }).eq("id", id);
    setData((d) => d.map((r) => (r.id === id ? { ...r, status } : r)));
    toast({ title: "Status updated" });
  };

  const counts = useMemo(() => ({
    total: data.length,
    pending: data.filter((r) => r.status === "pending").length,
    under_review: data.filter((r) => r.status === "under_review").length,
    approved: data.filter((r) => r.status === "approved").length,
    rejected: data.filter((r) => r.status === "rejected").length,
  }), [data]);

  const filtered = filter === "all" ? data : data.filter((r) => r.status === filter);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Total" value={counts.total} icon={Users} />
        <StatCard label="Pending" value={counts.pending} />
        <StatCard label="Approved" value={counts.approved} />
        <StatCard label="Rejected" value={counts.rejected} />
      </div>
      <div className="flex gap-2 overflow-auto">
        {[["all", "All"], ["pending", "Pending"], ["under_review", "Under Review"], ["approved", "Approved"], ["rejected", "Rejected"]].map(([val, label]) => (
          <Button key={val} variant={filter === val ? "default" : "outline"} size="sm" onClick={() => setFilter(val)}>
            {label} {val !== "all" ? `(${counts[val as keyof typeof counts] || 0})` : `(${counts.total})`}
          </Button>
        ))}
      </div>
      <div className="overflow-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Agency</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Website</TableHead>
              <TableHead>Clients</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Tier</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-medium">{r.agency_name}</TableCell>
                <TableCell>{r.contact_name}</TableCell>
                <TableCell>{r.email}</TableCell>
                <TableCell className="max-w-[120px] truncate">{r.website}</TableCell>
                <TableCell>{r.current_clients}</TableCell>
                <TableCell>{r.monthly_budget}</TableCell>
                <TableCell>{r.preferred_tier}</TableCell>
                <TableCell><StatusBadge status={r.status} /></TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => updateStatus(r.id, "approved")}>Approve</Button>
                    <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => updateStatus(r.id, "under_review")}>Review</Button>
                    <Button size="sm" variant="outline" className="h-7 text-xs text-destructive" onClick={() => updateStatus(r.id, "rejected")}>Reject</Button>
                  </div>
                </TableCell>
                <TableCell>{formatDate(r.created_at)}</TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow><TableCell colSpan={10} className="text-center text-muted-foreground py-8">No applications found</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// ─── DFY Orders Tab ───
function DfyOrdersTab() {
  const [data, setData] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    supabase.from("dfy_orders").select("*").order("created_at", { ascending: false }).then(({ data }) => setData(data || []));
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("dfy_orders").update({ status }).eq("id", id);
    setData((d) => d.map((r) => (r.id === id ? { ...r, status } : r)));
    toast({ title: "Status updated" });
  };

  const counts = useMemo(() => ({
    total: data.length,
    pending: data.filter((r) => r.status === "pending").length,
    in_progress: data.filter((r) => r.status === "in_progress").length,
    completed: data.filter((r) => r.status === "completed").length,
  }), [data]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Total" value={counts.total} icon={ShoppingBag} />
        <StatCard label="Pending" value={counts.pending} />
        <StatCard label="In Progress" value={counts.in_progress} />
        <StatCard label="Completed" value={counts.completed} />
      </div>
      <div className="overflow-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Business</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Payment Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-medium">{r.name}</TableCell>
                <TableCell>{r.email}</TableCell>
                <TableCell>{r.business_name}</TableCell>
                <TableCell>{r.business_type}</TableCell>
                <TableCell>{r.payment_plan}</TableCell>
                <TableCell>
                  <Select value={r.status} onValueChange={(v) => updateStatus(r.id, v)}>
                    <SelectTrigger className="h-8 w-32"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["pending", "in_progress", "completed", "cancelled"].map((s) => (
                        <SelectItem key={s} value={s}>{s.replace(/_/g, " ")}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>{formatDate(r.created_at)}</TableCell>
              </TableRow>
            ))}
            {data.length === 0 && (
              <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">No orders found</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// ─── Enrollments Tab ───
function EnrollmentsTab() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("enrollments").select("*").order("created_at", { ascending: false }).then(({ data }) => setData(data || []));
  }, []);

  const tierCounts = useMemo(() => {
    const map: Record<string, number> = {};
    data.forEach((r) => { map[r.tier] = (map[r.tier] || 0) + 1; });
    return map;
  }, [data]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Total" value={data.length} icon={GraduationCap} />
        {Object.entries(tierCounts).map(([tier, count]) => (
          <StatCard key={tier} label={tier} value={count} />
        ))}
      </div>
      <div className="overflow-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Tier</TableHead>
              <TableHead>Source Page</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-medium">{r.name}</TableCell>
                <TableCell>{r.email}</TableCell>
                <TableCell><Badge variant="secondary">{r.tier}</Badge></TableCell>
                <TableCell>{r.source_page}</TableCell>
                <TableCell>{formatDate(r.created_at)}</TableCell>
              </TableRow>
            ))}
            {data.length === 0 && (
              <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No enrollments found</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// ─── Audit Leads Tab ───
function AuditLeadsTab() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("audit_leads").select("*").order("created_at", { ascending: false }).then(({ data }) => setData(data || []));
  }, []);

  const avgScore = useMemo(() => {
    if (!data.length) return 0;
    const sum = data.reduce((a, r) => a + (r.audit_score || 0), 0);
    return Math.round(sum / data.length);
  }, [data]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        <StatCard label="Total Leads" value={data.length} icon={ClipboardList} />
        <StatCard label="Avg Audit Score" value={avgScore} />
      </div>
      <div className="overflow-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Niche</TableHead>
              <TableHead>Followers</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Goal</TableHead>
              <TableHead>Challenge</TableHead>
              <TableHead>Platforms</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-medium">{r.name}</TableCell>
                <TableCell>{r.email}</TableCell>
                <TableCell>{r.niche}</TableCell>
                <TableCell>{r.current_followers}</TableCell>
                <TableCell>{r.content_frequency}</TableCell>
                <TableCell>{r.revenue_level}</TableCell>
                <TableCell>{r.primary_goal}</TableCell>
                <TableCell className="max-w-[150px] truncate">{r.biggest_challenge}</TableCell>
                <TableCell>{r.platforms}</TableCell>
                <TableCell><Badge variant="secondary">{r.audit_score}</Badge></TableCell>
                <TableCell>{formatDate(r.created_at)}</TableCell>
              </TableRow>
            ))}
            {data.length === 0 && (
              <TableRow><TableCell colSpan={11} className="text-center text-muted-foreground py-8">No audit leads found</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// ─── Admin Dashboard ───
export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <main className="container py-6">
        <h1 className="mb-6 font-display text-2xl font-bold">Admin Dashboard</h1>
        <Tabs defaultValue="video" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="video" className="gap-1"><Video className="h-4 w-4 hidden sm:inline" /> Video Requests</TabsTrigger>
            <TabsTrigger value="partners" className="gap-1"><Users className="h-4 w-4 hidden sm:inline" /> Partners</TabsTrigger>
            <TabsTrigger value="dfy" className="gap-1"><ShoppingBag className="h-4 w-4 hidden sm:inline" /> DFY Orders</TabsTrigger>
            <TabsTrigger value="enrollments" className="gap-1"><GraduationCap className="h-4 w-4 hidden sm:inline" /> Enrollments</TabsTrigger>
            <TabsTrigger value="audits" className="gap-1"><ClipboardList className="h-4 w-4 hidden sm:inline" /> Audit Leads</TabsTrigger>
          </TabsList>
          <TabsContent value="video"><VideoRequestsTab /></TabsContent>
          <TabsContent value="partners"><PartnerApplicationsTab /></TabsContent>
          <TabsContent value="dfy"><DfyOrdersTab /></TabsContent>
          <TabsContent value="enrollments"><EnrollmentsTab /></TabsContent>
          <TabsContent value="audits"><AuditLeadsTab /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
