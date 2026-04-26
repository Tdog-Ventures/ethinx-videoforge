import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Shield, CheckCircle, XCircle, Clock, FileText, LogOut, ArrowLeft } from "lucide-react";

type Application = {
  id: string;
  agency_name: string;
  contact_name: string;
  email: string;
  website: string;
  current_clients: string;
  monthly_budget: string;
  why_partner: string;
  preferred_tier: string;
  status: string;
  created_at: string;
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  under_review: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  approved: "bg-primary/20 text-primary border-primary/30",
  rejected: "bg-destructive/20 text-destructive border-destructive/30",
};

const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);
  const [filter, setFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    checkAdminAndLoad();
  }, []);

  const checkAdminAndLoad = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/login", { replace: true });
      return;
    }

    const { data: isAdmin } = await supabase.rpc("is_admin", { p_user_id: session.user.id });
    if (!isAdmin) {
      navigate("/", { replace: true });
      return;
    }

    await loadApplications();
  };

  const loadApplications = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("partner_applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load applications");
      console.error(error);
    } else {
      setApplications(data || []);
    }
    setLoading(false);
  };

  const updateStatus = async (app: Application, newStatus: string) => {
    setUpdatingId(app.id);
    const { error } = await supabase
      .from("partner_applications")
      .update({ status: newStatus })
      .eq("id", app.id);

    if (error) {
      toast.error("Failed to update status");
      console.error(error);
    } else {
      setApplications((prev) =>
        prev.map((a) => (a.id === app.id ? { ...a, status: newStatus } : a))
      );
      toast.success(`Status updated to ${newStatus}`);

      // Send approval email
      if (newStatus === "approved") {
        supabase.functions.invoke("send-partner-notification", {
          body: {
            type: "approved",
            agency_name: app.agency_name,
            contact_name: app.contact_name,
            email: app.email,
            website: app.website,
            current_clients: app.current_clients,
            monthly_budget: app.monthly_budget,
            why_partner: app.why_partner,
            preferred_tier: app.preferred_tier,
          },
        });
      }
    }
    setUpdatingId(null);
  };

  const filtered = filter === "all" ? applications : applications.filter((a) => a.status === filter);
  const counts = {
    all: applications.length,
    pending: applications.filter((a) => a.status === "pending").length,
    under_review: applications.filter((a) => a.status === "under_review").length,
    approved: applications.filter((a) => a.status === "approved").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Partner Applications</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="text-muted-foreground">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to site
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                await supabase.auth.signOut();
                navigate("/login", { replace: true });
              }}
            >
              <LogOut className="h-4 w-4 mr-1" /> Sign Out
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Total", value: counts.all, icon: FileText },
            { label: "Pending", value: counts.pending, icon: Clock },
            { label: "Approved", value: counts.approved, icon: CheckCircle },
            { label: "Rejected", value: counts.rejected, icon: XCircle },
          ].map((s) => (
            <Card key={s.label} className="border-border">
              <CardContent className="flex items-center gap-3 p-4">
                <s.icon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Tabs value={filter} onValueChange={setFilter} className="mb-6">
          <TabsList>
            {(["all", "pending", "under_review", "approved", "rejected"] as const).map((t) => (
              <TabsTrigger key={t} value={t} className="capitalize">
                {t.replace("_", " ")} ({counts[t]})
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Table */}
        <div className="rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agency</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="hidden lg:table-cell">Website</TableHead>
                <TableHead className="hidden md:table-cell">Clients</TableHead>
                <TableHead className="hidden md:table-cell">Budget</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell">Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center text-muted-foreground py-8">
                    No applications found.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.agency_name}</TableCell>
                    <TableCell>{app.contact_name}</TableCell>
                    <TableCell className="text-xs">{app.email}</TableCell>
                    <TableCell className="hidden lg:table-cell text-xs">
                      <a href={app.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        {app.website.replace(/^https?:\/\//, "")}
                      </a>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{app.current_clients}</TableCell>
                    <TableCell className="hidden md:table-cell">{app.monthly_budget}</TableCell>
                    <TableCell>{app.preferred_tier}</TableCell>
                    <TableCell>
                      <Badge className={statusColors[app.status] || ""} variant="outline">
                        {app.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-xs text-muted-foreground">
                      {new Date(app.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {app.status !== "approved" && (
                          <Button
                            size="sm"
                            variant="ghost-green"
                            disabled={updatingId === app.id}
                            onClick={() => updateStatus(app, "approved")}
                          >
                            {updatingId === app.id ? <Loader2 className="h-3 w-3 animate-spin" /> : "Approve"}
                          </Button>
                        )}
                        {app.status !== "under_review" && (
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={updatingId === app.id}
                            onClick={() => updateStatus(app, "under_review")}
                          >
                            Review
                          </Button>
                        )}
                        {app.status !== "rejected" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-destructive hover:text-destructive"
                            disabled={updatingId === app.id}
                            onClick={() => updateStatus(app, "rejected")}
                          >
                            Reject
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
