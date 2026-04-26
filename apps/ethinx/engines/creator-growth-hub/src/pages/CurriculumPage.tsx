import { DashboardLayout } from "@/components/DashboardLayout";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Check, Lock, Play, FileText, Video as VideoIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Lesson {
  title: string;
  type: string;
  duration?: string;
}

interface CurriculumWeek {
  id: string;
  week_number: number;
  title: string;
  description: string | null;
  content: Lesson[];
  is_locked: boolean;
}

const iconMap: Record<string, React.ElementType> = {
  Video: Play,
  Worksheet: FileText,
};

const CurriculumPage = () => {
  const [weeks, setWeeks] = useState<CurriculumWeek[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const email = session?.user?.email;

      // Fetch member progress
      if (email) {
        const { data: progress } = await supabase
          .from("member_progress")
          .select("current_week, modules_completed")
          .eq("email", email)
          .maybeSingle();

        if (progress) {
          setCurrentWeek(progress.current_week);
          setCompletedModules(progress.modules_completed ?? []);
        }
      }

      // Fetch curriculum — locked weeks return from DB but we strip content client-side
      const { data, error } = await supabase
        .from("curriculum_weeks")
        .select("id, week_number, title, description, content, is_locked")
        .order("week_number");

      if (!error && data) {
        setWeeks(
          data.map((w) => ({
            ...w,
            content: (w.content as unknown as Lesson[]) ?? [],
          }))
        );
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <ScrollReveal>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Curriculum</h1>
            <p className="text-sm text-muted-foreground mt-1">8-week Creator Operating System program</p>
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          {weeks.map((week, idx) => {
            const isCompleted = week.week_number < currentWeek;
            const isCurrent = week.week_number === currentWeek;
            const locked = week.is_locked && !isCompleted && !isCurrent;
            // Don't expose lesson content for locked weeks
            const lessons = locked ? [] : week.content;

            return (
              <ScrollReveal key={week.id} delay={idx * 50}>
                <div className={`card-glow rounded-xl overflow-hidden ${locked ? "opacity-60" : ""}`}>
                  <div className="flex items-center justify-between p-5 border-b border-border">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                          isCompleted
                            ? "bg-primary text-primary-foreground"
                            : isCurrent
                            ? "border-2 border-primary text-primary"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {isCompleted ? <Check className="h-4 w-4" /> : week.week_number}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">
                          Week {week.week_number}: {week.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {week.description}
                        </p>
                      </div>
                    </div>
                    {isCurrent && (
                      <span className="text-[10px] font-mono uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded">
                        Current
                      </span>
                    )}
                    {locked && <Lock className="h-4 w-4 text-muted-foreground" />}
                  </div>

                  {!locked && lessons.length > 0 && (
                    <div className="divide-y divide-border">
                      {lessons.map((lesson, i) => {
                        const Icon = iconMap[lesson.type] || VideoIcon;
                        const lessonKey = `w${week.week_number}-${i}`;
                        const done = completedModules.includes(lessonKey);
                        return (
                          <div key={i} className="flex items-center justify-between px-5 py-3 hover:bg-secondary/50 transition-colors">
                            <div className="flex items-center gap-3">
                              <Icon className="h-4 w-4 text-primary shrink-0" />
                              <div>
                                <p className={`text-sm ${done ? "text-muted-foreground line-through" : "text-foreground"}`}>
                                  {lesson.title}
                                </p>
                                <p className="text-[10px] text-muted-foreground font-mono">
                                  {lesson.type}{lesson.duration ? ` · ${lesson.duration}` : ""}
                                </p>
                              </div>
                            </div>
                            {done ? (
                              <Check className="h-4 w-4 text-primary" />
                            ) : (
                              <Button variant="ghost" size="sm" className="text-xs text-primary hover:text-primary">
                                Start
                              </Button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CurriculumPage;
