import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, CheckCircle2, Zap, Target, TrendingUp, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const NICHES = ["Tech & SaaS", "Finance & Investing", "Health & Fitness", "Lifestyle & Travel", "Education", "Gaming & Entertainment", "Business & Marketing", "Art & Design", "Other"];
const FOLLOWER_RANGES = ["0 – 500", "500 – 2K", "2K – 10K", "10K – 50K", "50K+"];
const FREQUENCIES = ["Rarely / never", "1–2× per month", "Weekly", "3–5× per week", "Daily"];
const REVENUE_LEVELS = ["$0", "< $500/mo", "$500 – $2K/mo", "$2K – $5K/mo", "$5K+/mo"];
const GOALS = ["Grow my audience", "Monetize my content", "Go full-time creator", "Launch a product/course"];
const TIMELINES = ["1 month", "3 months", "6 months", "12+ months"];
const CHALLENGES = ["No audience yet", "Inconsistent content", "Don't know how to monetize", "Burnout / time management", "Tech / tools overwhelm"];
const PLATFORMS = ["YouTube", "TikTok", "Instagram", "Twitter / X", "LinkedIn", "Newsletter", "Podcast", "Blog"];
const CONTENT_TYPES = ["Short-form video", "Long-form video", "Written posts", "Carousels / graphics", "Audio / podcasts", "Live streams"];

type AuditData = {
  name: string;
  email: string;
  niche: string;
  followers: string;
  frequency: string;
  revenue: string;
  goal: string;
  timeline: string;
  challenge: string;
  platforms: string[];
  contentTypes: string[];
};

const initialData: AuditData = {
  name: "",
  email: "",
  niche: "",
  followers: "",
  frequency: "",
  revenue: "",
  goal: "",
  timeline: "",
  challenge: "",
  platforms: [],
  contentTypes: [],
};

function calculateScore(data: AuditData): number {
  let score = 20; // base
  const fi = FOLLOWER_RANGES.indexOf(data.followers);
  score += fi >= 0 ? fi * 6 : 0;
  const fri = FREQUENCIES.indexOf(data.frequency);
  score += fri >= 0 ? fri * 5 : 0;
  const ri = REVENUE_LEVELS.indexOf(data.revenue);
  score += ri >= 0 ? ri * 5 : 0;
  score += data.platforms.length * 3;
  score += data.contentTypes.length * 2;
  if (data.goal === "Go full-time creator") score += 5;
  return Math.min(score, 100);
}

function getRecommendations(data: AuditData): string[] {
  const recs: string[] = [];
  const fi = FOLLOWER_RANGES.indexOf(data.followers);
  if (fi <= 1) recs.push("Focus on one platform and post consistently 3× per week to build initial traction.");
  if (data.revenue === "$0" || data.revenue === "< $500/mo") recs.push("Start monetizing with a simple digital product or paid community before scaling.");
  if (data.platforms.length <= 1) recs.push("Repurpose content across 2–3 platforms to multiply your reach with minimal extra effort.");
  if (data.platforms.length > 3) recs.push("You're spread thin — double down on your top 2 platforms for deeper engagement.");
  const fri = FREQUENCIES.indexOf(data.frequency);
  if (fri <= 1) recs.push("Create a content calendar and batch-produce content to stay consistent without burnout.");
  if (data.challenge === "Burnout / time management") recs.push("Systematize your workflow with templates and automation to reclaim 10+ hours per week.");
  if (data.challenge === "Don't know how to monetize") recs.push("Map your audience's top 3 pain points — each one is a potential revenue stream.");
  if (recs.length < 3) recs.push("Build an email list from day one — it's the only platform you truly own.");
  return recs.slice(0, 3);
}

function OptionCard({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border px-4 py-3 text-sm font-medium transition-all duration-200 text-left ${
        selected
          ? "border-primary bg-primary/10 text-primary neon-glow"
          : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-primary/5"
      }`}
    >
      {label}
    </button>
  );
}

function MultiOptionCard({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border px-4 py-3 text-sm font-medium transition-all duration-200 text-left flex items-center gap-2 ${
        selected
          ? "border-primary bg-primary/10 text-primary neon-glow"
          : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-primary/5"
      }`}
    >
      <div className={`w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 ${selected ? "bg-primary border-primary" : "border-muted-foreground"}`}>
        {selected && <CheckCircle2 className="w-3 h-3 text-primary-foreground" />}
      </div>
      {label}
    </button>
  );
}

const stepVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

export default function AuditQuestionnaire() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<AuditData>(initialData);
  const [complete, setComplete] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const totalSteps = 4;

  const progress = complete ? 100 : ((step + 1) / totalSteps) * 100;

  function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function canProceed() {
    if (step === 0) return data.name.trim() && data.email.trim() && validateEmail(data.email) && data.niche;
    if (step === 1) return data.followers && data.frequency && data.revenue;
    if (step === 2) return data.goal && data.timeline && data.challenge;
    if (step === 3) return data.platforms.length > 0 && data.contentTypes.length > 0;
    return false;
  }

  function getStepErrors(): Record<string, string> {
    const errs: Record<string, string> = {};
    if (step === 0) {
      if (!data.name.trim()) errs.name = "Name is required";
      if (!data.email.trim()) errs.email = "Email is required";
      else if (!validateEmail(data.email)) errs.email = "Please enter a valid email";
      if (!data.niche) errs.niche = "Please select a niche";
    }
    if (step === 1) {
      if (!data.followers) errs.followers = "Please select your follower range";
      if (!data.frequency) errs.frequency = "Please select posting frequency";
      if (!data.revenue) errs.revenue = "Please select revenue level";
    }
    if (step === 2) {
      if (!data.goal) errs.goal = "Please select a goal";
      if (!data.timeline) errs.timeline = "Please select a timeline";
      if (!data.challenge) errs.challenge = "Please select a challenge";
    }
    if (step === 3) {
      if (data.platforms.length === 0) errs.platforms = "Select at least one platform";
      if (data.contentTypes.length === 0) errs.contentTypes = "Select at least one content type";
    }
    return errs;
  }

  async function next() {
    const errs = getStepErrors();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      setSaving(true);
      const auditScore = calculateScore(data);
      const { error } = await supabase.from("audit_leads").insert({
        name: data.name,
        email: data.email,
        niche: data.niche,
        current_followers: data.followers,
        content_frequency: data.frequency,
        revenue_level: data.revenue,
        primary_goal: data.goal,
        biggest_challenge: data.challenge,
        platforms: data.platforms,
        audit_score: auditScore,
      });
      setSaving(false);
      if (error) {
        toast.error("Failed to save your audit. Please try again.");
        console.error("Supabase insert error:", error);
        return;
      }
      setComplete(true);
      toast.success(`Audit complete, ${data.name}!`, {
        description: "Your personalized results are ready.",
      });
    }
  }

  function back() {
    if (step > 0) setStep(step - 1);
  }

  function toggleMulti(field: "platforms" | "contentTypes", value: string) {
    setData((prev) => {
      const arr = prev[field];
      return { ...prev, [field]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value] };
    });
  }

  const score = calculateScore(data);
  const recs = getRecommendations(data);

  const recIcons = [
    <Target key="t" className="w-5 h-5 text-primary shrink-0 mt-0.5" />,
    <TrendingUp key="tr" className="w-5 h-5 text-primary shrink-0 mt-0.5" />,
    <Zap key="z" className="w-5 h-5 text-primary shrink-0 mt-0.5" />,
  ];

  if (complete) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg space-y-8"
        >
          <div className="text-center space-y-2">
            <p className="text-sm font-medium text-primary uppercase tracking-widest">Your Creator Audit</p>
            <h1 className="text-3xl md:text-4xl font-bold font-display">Results for {data.name}</h1>
          </div>

          {/* Score ring */}
          <div className="flex justify-center">
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
                <motion.circle
                  cx="60" cy="60" r="52" fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 52}
                  initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - score / 100) }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                  className="text-4xl font-bold font-display text-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {score}
                </motion.span>
                <span className="text-xs text-muted-foreground">/ 100</span>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold font-display text-center">Your Top 3 Recommendations</h2>
            {recs.map((rec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.15 }}
                className="flex gap-3 p-4 rounded-lg border border-border bg-card"
              >
                {recIcons[i]}
                <p className="text-sm text-foreground leading-relaxed">{rec}</p>
              </motion.div>
            ))}
          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Button variant="neon" size="lg" className="flex-1 text-base py-6 animate-pulse-glow" asChild>
              <a href="https://creator-blueprint-builder.lovable.app" target="_blank" rel="noopener noreferrer">
                Get the Creator System — $297/mo
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button variant="neon-outline" size="lg" className="flex-1 text-base py-6" asChild>
              <a href="https://premium-video-forge.lovable.app" target="_blank" rel="noopener noreferrer">
                Book a Strategy Call
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Progress */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border px-4 py-3">
        <div className="max-w-lg mx-auto space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground font-medium">
            <span>Step {step + 1} of {totalSteps}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {step === 0 && (
                <>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-primary uppercase tracking-widest">Step 1 — Basics</p>
                    <h1 className="text-2xl md:text-3xl font-bold font-display">Let's get to know you</h1>
                    <p className="text-muted-foreground text-sm">We'll use this to personalize your audit results.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">Your name</label>
                      <Input placeholder="e.g. Alex" value={data.name} onChange={(e) => { setData({ ...data, name: e.target.value }); setErrors((prev) => ({ ...prev, name: "" })); }} className={errors.name ? "border-destructive" : ""} />
                      {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">Email</label>
                      <Input type="email" placeholder="you@example.com" value={data.email} onChange={(e) => { setData({ ...data, email: e.target.value }); setErrors((prev) => ({ ...prev, email: "" })); }} className={errors.email ? "border-destructive" : ""} />
                      {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">What's your niche?</label>
                      {errors.niche && <p className="text-xs text-destructive">{errors.niche}</p>}
                      <div className="grid grid-cols-2 gap-2">
                        {NICHES.map((n) => (
                          <OptionCard key={n} label={n} selected={data.niche === n} onClick={() => { setData({ ...data, niche: n }); setErrors((prev) => ({ ...prev, niche: "" })); }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-primary uppercase tracking-widest">Step 2 — Current State</p>
                    <h1 className="text-2xl md:text-3xl font-bold font-display">Where are you now?</h1>
                  </div>
                  <div className="space-y-5">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">Current followers (all platforms)</label>
                      <div className="grid grid-cols-2 gap-2">
                        {FOLLOWER_RANGES.map((f) => (
                          <OptionCard key={f} label={f} selected={data.followers === f} onClick={() => setData({ ...data, followers: f })} />
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">How often do you post?</label>
                      <div className="grid grid-cols-2 gap-2">
                        {FREQUENCIES.map((f) => (
                          <OptionCard key={f} label={f} selected={data.frequency === f} onClick={() => setData({ ...data, frequency: f })} />
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">Current creator revenue</label>
                      <div className="grid grid-cols-2 gap-2">
                        {REVENUE_LEVELS.map((r) => (
                          <OptionCard key={r} label={r} selected={data.revenue === r} onClick={() => setData({ ...data, revenue: r })} />
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-primary uppercase tracking-widest">Step 3 — Goals</p>
                    <h1 className="text-2xl md:text-3xl font-bold font-display">What are you building toward?</h1>
                  </div>
                  <div className="space-y-5">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">Primary goal</label>
                      <div className="grid grid-cols-2 gap-2">
                        {GOALS.map((g) => (
                          <OptionCard key={g} label={g} selected={data.goal === g} onClick={() => setData({ ...data, goal: g })} />
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">Timeline to reach your goal</label>
                      <div className="grid grid-cols-2 gap-2">
                        {TIMELINES.map((t) => (
                          <OptionCard key={t} label={t} selected={data.timeline === t} onClick={() => setData({ ...data, timeline: t })} />
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">Biggest challenge right now</label>
                      <div className="grid grid-cols-2 gap-2">
                        {CHALLENGES.map((c) => (
                          <OptionCard key={c} label={c} selected={data.challenge === c} onClick={() => setData({ ...data, challenge: c })} />
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-primary uppercase tracking-widest">Step 4 — Platforms</p>
                    <h1 className="text-2xl md:text-3xl font-bold font-display">Where do you create?</h1>
                    <p className="text-muted-foreground text-sm">Select all that apply.</p>
                  </div>
                  <div className="space-y-5">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">Platforms you use</label>
                      <div className="grid grid-cols-2 gap-2">
                        {PLATFORMS.map((p) => (
                          <MultiOptionCard key={p} label={p} selected={data.platforms.includes(p)} onClick={() => toggleMulti("platforms", p)} />
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">Content types you create</label>
                      <div className="grid grid-cols-2 gap-2">
                        {CONTENT_TYPES.map((c) => (
                          <MultiOptionCard key={c} label={c} selected={data.contentTypes.includes(c)} onClick={() => toggleMulti("contentTypes", c)} />
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button variant="ghost" onClick={back} disabled={step === 0} className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <Button variant="neon" onClick={next} disabled={!canProceed() || saving} className="gap-2">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {saving ? "Saving…" : step === totalSteps - 1 ? "See My Results" : "Continue"}
              {!saving && <ArrowRight className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
