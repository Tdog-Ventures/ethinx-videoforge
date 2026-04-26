import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Lock, Eye, EyeOff, AlertCircle, CheckCircle2, Mail, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

export function AuthPortal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [shake, setShake] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);
  const navigate = useNavigate();
  const { session } = useAuth();

  useEffect(() => {
    if (session) navigate("/dashboard", { replace: true });
  }, [session, navigate]);

  useEffect(() => {
    setIsValid(email.length > 0 && password.length >= 12);
    if (error && (email.length > 0 || password.length > 0)) setError("");
  }, [email, password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;

    if (password.length < 12) {
      setError("Password must be at least 12 characters");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setIsLoading(true);
    setError("");

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError(authError.message);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      toast({ title: "Login Failed", description: authError.message, variant: "destructive" });
    } else {
      toast({ title: "Welcome back", description: "Successfully authenticated." });
      navigate("/dashboard");
    }
    setIsLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signupPassword.length < 12) {
      toast({ title: "Password too short", description: "Minimum 12 characters required.", variant: "destructive" });
      return;
    }
    setSignupLoading(true);
    const { error } = await supabase.auth.signUp({
      email: signupEmail,
      password: signupPassword,
      options: { emailRedirectTo: window.location.origin },
    });
    if (error) {
      toast({ title: "Signup Failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Account Created", description: "Check your email to confirm your account." });
      setShowSignup(false);
    }
    setSignupLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <div className="w-1 md:w-2 bg-primary shadow-glow" />
      <div className="flex-1 flex items-center justify-center p-6">
        <div className={`w-full max-w-md ${shake ? 'animate-shake' : ''}`}>
          {/* Logo */}
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/30 mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">
              ETHINX<span className="text-primary">.</span>
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">Executive Command Portal</p>
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in-up delay-200">
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="absolute -left-[9999px] opacity-0 pointer-events-none"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ethinx.com"
                className="bg-secondary/50 border-border/50"
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={`pr-12 bg-secondary/50 border-border/50 ${error ? 'border-destructive focus-visible:ring-destructive/20' : ''} ${isValid ? 'border-success/50' : ''}`}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className={`flex items-center gap-1 transition-colors ${password.length >= 12 ? 'text-success' : 'text-muted-foreground'}`}>
                  {password.length >= 12 ? <CheckCircle2 className="w-3 h-3" /> : <span className="w-3 h-3 rounded-full border border-current" />}
                  Minimum 12 characters
                </span>
                <span className="text-muted-foreground font-mono">{password.length}/12</span>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-destructive text-sm p-3 bg-destructive/10 rounded-md border border-destructive/20 animate-fade-in-up">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading || !isValid}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base font-semibold"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Authenticating...
                </div>
              ) : (
                "Access Dashboard"
              )}
            </Button>
          </form>

          {/* Create account link */}
          <div className="mt-6 text-center animate-fade-in-up delay-300">
            <button
              onClick={() => setShowSignup(true)}
              className="text-sm text-primary hover:text-primary/80 transition-colors underline underline-offset-4"
            >
              Create Account
            </button>
          </div>

          {/* Security notice */}
          <div className="mt-8 text-center animate-fade-in-up delay-300">
            <p className="text-xs text-muted-foreground/60">Protected by enterprise-grade encryption</p>
            <div className="flex items-center justify-center gap-4 mt-4 text-muted-foreground/40">
              <span className="flex items-center gap-1 text-xs">
                <span className="w-2 h-2 rounded-full bg-success status-live" />
                256-bit SSL
              </span>
              <span className="flex items-center gap-1 text-xs">
                <span className="w-2 h-2 rounded-full bg-success status-live" />
                SOC 2 Type II
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Signup Modal */}
      {showSignup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-md mx-4 bg-card border border-border rounded-lg p-8 relative animate-fade-in-up">
            <button onClick={() => setShowSignup(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-foreground mb-1">Create Account</h2>
            <p className="text-sm text-muted-foreground mb-6">Join the ETHINX executive portal</p>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <Input
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="bg-secondary/50 border-border/50"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Password</label>
                <Input
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  placeholder="Min 12 characters"
                  className="bg-secondary/50 border-border/50"
                  required
                />
                <p className="text-xs text-muted-foreground">{signupPassword.length}/12 characters</p>
              </div>
              <Button
                type="submit"
                disabled={signupLoading || signupPassword.length < 12}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12"
              >
                {signupLoading ? "Creating..." : "Create Account"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
