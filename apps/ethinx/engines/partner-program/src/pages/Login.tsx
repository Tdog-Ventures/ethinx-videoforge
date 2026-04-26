import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [forgotMode, setForgotMode] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  useEffect(() => {
    const checkExisting = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: isAdmin } = await supabase.rpc("is_admin", { p_user_id: session.user.id });
        if (isAdmin) {
          navigate("/admin", { replace: true });
          return;
        }
      }
      setChecking(false);
    };
    checkExisting();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    const { data: isAdmin } = await supabase.rpc("is_admin", { p_user_id: data.user.id });
    if (isAdmin) {
      navigate("/admin", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
    setLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Check your email for the reset link.");
      setForgotMode(false);
    }
    setResetLoading(false);
  };

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md border-border">
        <CardHeader className="space-y-1 text-center">
          <div className="text-2xl font-bold tracking-tight">
            ETHINX<span className="text-primary">.</span>
          </div>
          <p className="text-sm text-muted-foreground">Partner Program</p>
        </CardHeader>
        <CardContent>
          {forgotMode ? (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Enter your email and we'll send you a password reset link.
              </p>
              <div className="space-y-2">
                <Label htmlFor="reset-email">Email</Label>
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="you@example.com"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={resetLoading}>
                {resetLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send Reset Link"}
              </Button>
              <button
                type="button"
                onClick={() => setForgotMode(false)}
                className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to Sign In
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
              </Button>
              <button
                type="button"
                onClick={() => setForgotMode(true)}
                className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Forgot password?
              </button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
