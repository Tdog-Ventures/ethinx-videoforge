import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/PasswordInput";
import { PasswordStrengthIndicator } from "@/components/PasswordStrengthIndicator";
import { PasswordMatchIndicator } from "@/components/PasswordMatchIndicator";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Loader2 } from "lucide-react";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check for recovery token in URL hash
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) {
      setReady(true);
    } else {
      // Also handle when supabase redirects with access_token
      supabase.auth.onAuthStateChange((event) => {
        if (event === "PASSWORD_RECOVERY") {
          setReady(true);
        }
      });
    }
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({ title: "Passwords don't match", variant: "destructive" });
      return;
    }
    if (password.length < 6) {
      toast({ title: "Password must be at least 6 characters", variant: "destructive" });
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: "Password updated!", description: "You can now sign in with your new password." });
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <div className="mb-8 text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight text-primary">ETHINX</h1>
        <p className="mt-1 text-sm text-muted-foreground">Reset your password</p>
      </div>
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader>
          <CardTitle>New Password</CardTitle>
          <CardDescription>
            {ready ? "Enter your new password below" : "Waiting for recovery link verification..."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {ready ? (
            <form onSubmit={handleReset} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <PasswordInput id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
                <PasswordStrengthIndicator password={password} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <PasswordInput id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" required />
                <PasswordMatchIndicator password={password} confirmPassword={confirmPassword} />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update Password
              </Button>
            </form>
          ) : (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
