import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { TopNav } from "@/components/TopNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/PasswordInput";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Lock, Unlock, CheckCircle, BookOpen, ShoppingBag, Settings, Loader2, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

// ─── Curriculum Section ───
function CurriculumSection({ userEmail }: { userEmail: string }) {
  const [weeks, setWeeks] = useState<any[]>([]);
  const [progress, setProgress] = useState<any>(null);
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);
  const [completing, setCompleting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    supabase.from("curriculum_weeks").select("*").order("week_number").then(({ data }) => setWeeks(data || []));
    supabase.from("member_progress").select("*").eq("email", userEmail).maybeSingle().then(({ data }) => setProgress(data));
  }, [userEmail]);

  const markComplete = async (weekNum: number) => {
    if (!progress) return;
    setCompleting(true);
    const newModules = (progress.modules_completed || 0) + 1;
    const newWeek = weekNum + 1;
    await supabase.from("member_progress").update({
      modules_completed: newModules,
      current_week: newWeek,
    }).eq("id", progress.id);
    setProgress({ ...progress, modules_completed: newModules, current_week: newWeek });
    setCompleting(false);
    toast({ title: `Week ${weekNum} completed!` });
  };

  const currentWeek = progress?.current_week || 1;

  return (
    <div className="space-y-3">
      <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
        <BookOpen className="h-5 w-5 text-primary" /> Curriculum Progress
      </h2>
      <p className="text-sm text-muted-foreground">
        You're on Week {currentWeek} · {progress?.modules_completed || 0} modules completed
      </p>
      <div className="space-y-2">
        {weeks.map((week) => {
          const isUnlocked = !week.is_locked || week.week_number <= currentWeek;
          const isCompleted = week.week_number < currentWeek;
          return (
            <Collapsible
              key={week.id}
              open={expandedWeek === week.week_number}
              onOpenChange={(open) => setExpandedWeek(open ? week.week_number : null)}
            >
              <Card className={!isUnlocked ? "opacity-60" : ""}>
                <CollapsibleTrigger asChild disabled={!isUnlocked}>
                  <CardHeader className="cursor-pointer p-4 hover:bg-accent/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {isCompleted ? (
                          <CheckCircle className="h-5 w-5 text-success" />
                        ) : isUnlocked ? (
                          <Unlock className="h-5 w-5 text-primary" />
                        ) : (
                          <Lock className="h-5 w-5 text-muted-foreground" />
                        )}
                        <div>
                          <CardTitle className="text-sm">
                            Week {week.week_number}: {week.title}
                          </CardTitle>
                          <CardDescription className="text-xs">{week.description}</CardDescription>
                        </div>
                      </div>
                      {isUnlocked && <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="space-y-3 pt-0">
                    <div className="prose prose-sm max-w-none text-foreground">
                      {week.content}
                    </div>
                    {isUnlocked && !isCompleted && week.week_number === currentWeek && (
                      <Button size="sm" onClick={() => markComplete(week.week_number)} disabled={completing}>
                        {completing && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
                        Mark Complete
                      </Button>
                    )}
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          );
        })}
        {weeks.length === 0 && (
          <p className="py-4 text-center text-sm text-muted-foreground">No curriculum content available yet.</p>
        )}
      </div>
    </div>
  );
}

// ─── My Orders Section ───
function MyOrdersSection({ userEmail }: { userEmail: string }) {
  const [dfyOrders, setDfyOrders] = useState<any[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("dfy_orders").select("*").eq("email", userEmail).then(({ data }) => setDfyOrders(data || []));
    supabase.from("enrollments").select("*").eq("email", userEmail).then(({ data }) => setEnrollments(data || []));
  }, [userEmail]);

  if (!dfyOrders.length && !enrollments.length) {
    return (
      <div>
        <h2 className="flex items-center gap-2 font-display text-lg font-semibold mb-2">
          <ShoppingBag className="h-5 w-5 text-primary" /> My Orders
        </h2>
        <p className="text-sm text-muted-foreground">No orders or enrollments yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
        <ShoppingBag className="h-5 w-5 text-primary" /> My Orders
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {dfyOrders.map((o) => (
          <Card key={o.id}>
            <CardContent className="p-4 space-y-1">
              <p className="font-medium">{o.business_name || "DFY Order"}</p>
              <p className="text-xs text-muted-foreground">{o.business_type} · {o.payment_plan}</p>
              <Badge variant="secondary">{o.status?.replace(/_/g, " ")}</Badge>
            </CardContent>
          </Card>
        ))}
        {enrollments.map((e) => (
          <Card key={e.id}>
            <CardContent className="p-4 space-y-1">
              <p className="font-medium">Enrollment</p>
              <p className="text-xs text-muted-foreground">Tier: {e.tier}</p>
              <p className="text-xs text-muted-foreground">Source: {e.source_page}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Account Settings Section ───
function AccountSettings() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({ title: "Passwords don't match", variant: "destructive" });
      return;
    }
    if (newPassword.length < 6) {
      toast({ title: "Password must be at least 6 characters", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setLoading(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Password updated!" });
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="space-y-3">
      <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
        <Settings className="h-5 w-5 text-primary" /> Account Settings
      </h2>
      <Card>
        <CardContent className="p-4 space-y-4">
          <div>
            <Label className="text-xs text-muted-foreground">Email</Label>
            <p className="font-medium">{user?.email}</p>
          </div>
          <form onSubmit={handleChangePassword} className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="newPass">New Password</Label>
              <PasswordInput id="newPass" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPass">Confirm Password</Label>
              <PasswordInput id="confirmPass" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" required />
            </div>
            <Button type="submit" size="sm" disabled={loading}>
              {loading && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Member Dashboard ───
export default function MemberDashboard() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <main className="container max-w-3xl space-y-8 py-6">
        <div className="animate-fade-in">
          <h1 className="font-display text-2xl font-bold">Welcome back 👋</h1>
          <p className="text-sm text-muted-foreground">
            {user.email} · Member since {formatDate(user.created_at)}
          </p>
        </div>
        <CurriculumSection userEmail={user.email || ""} />
        <MyOrdersSection userEmail={user.email || ""} />
        <AccountSettings />
      </main>
    </div>
  );
}
