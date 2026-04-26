import { useState } from "react";
import {
  Play,
  FileText,
  Video,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  Download,
  Lock,
} from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Progress } from "@/components/ui/progress";
import { useMemberProgress } from "@/hooks/useMemberProgress";

interface Lesson {
  id: string;
  title: string;
  type: "video" | "worksheet" | "live";
  duration: string;
}

interface Week {
  num: number;
  title: string;
  description: string;
  lessons: Lesson[];
  unlocked: boolean;
}

const CURRICULUM: Week[] = [
  {
    num: 1, title: "Foundation", description: "Set up your creator identity, niche positioning, and core offer.",
    unlocked: true,
    lessons: [
      { id: "1-1", title: "Finding Your Niche Sweet Spot", type: "video", duration: "18 min" },
      { id: "1-2", title: "Creator Identity Blueprint", type: "worksheet", duration: "PDF" },
      { id: "1-3", title: "Positioning Statement Workshop", type: "video", duration: "12 min" },
      { id: "1-4", title: "Week 1 Live Q&A Recording", type: "live", duration: "45 min" },
    ],
  },
  {
    num: 2, title: "Content Strategy", description: "Build your content pillars and create a repeatable system.",
    unlocked: true,
    lessons: [
      { id: "2-1", title: "Content Pillars Deep Dive", type: "video", duration: "15 min" },
      { id: "2-2", title: "Content Calendar Template", type: "worksheet", duration: "PDF" },
      { id: "2-3", title: "Hook Writing Masterclass", type: "video", duration: "20 min" },
      { id: "2-4", title: "Live Call: Q&A with Coach", type: "live", duration: "Thu 2PM EST" },
    ],
  },
  {
    num: 3, title: "Audience Growth", description: "Organic strategies to grow from 0 to 10K followers.",
    unlocked: true,
    lessons: [
      { id: "3-1", title: "Platform Algorithm Decoded", type: "video", duration: "22 min" },
      { id: "3-2", title: "Growth Tracker Spreadsheet", type: "worksheet", duration: "PDF" },
      { id: "3-3", title: "Collaboration & Cross-Promo", type: "video", duration: "14 min" },
      { id: "3-4", title: "Week 3 Live Q&A", type: "live", duration: "Thu 2PM EST" },
    ],
  },
  {
    num: 4, title: "Monetization", description: "Launch your first digital product and start earning.",
    unlocked: false,
    lessons: [
      { id: "4-1", title: "Revenue Model Selection", type: "video", duration: "16 min" },
      { id: "4-2", title: "Pricing Strategy Worksheet", type: "worksheet", duration: "PDF" },
      { id: "4-3", title: "Sales Page Copywriting", type: "video", duration: "25 min" },
      { id: "4-4", title: "Week 4 Live Q&A", type: "live", duration: "Thu 2PM EST" },
    ],
  },
  {
    num: 5, title: "Ads & Funnels", description: "Set up paid acquisition and automated funnels.",
    unlocked: false,
    lessons: [
      { id: "5-1", title: "Facebook & Instagram Ads 101", type: "video", duration: "28 min" },
      { id: "5-2", title: "Funnel Map Template", type: "worksheet", duration: "PDF" },
      { id: "5-3", title: "Retargeting & Lookalikes", type: "video", duration: "18 min" },
      { id: "5-4", title: "Week 5 Live Q&A", type: "live", duration: "Thu 2PM EST" },
    ],
  },
  {
    num: 6, title: "Email Marketing", description: "Build your list and write emails that convert.",
    unlocked: false,
    lessons: [
      { id: "6-1", title: "List Building Strategies", type: "video", duration: "20 min" },
      { id: "6-2", title: "Email Sequence Templates", type: "worksheet", duration: "PDF" },
      { id: "6-3", title: "Subject Line Swipe File", type: "video", duration: "12 min" },
      { id: "6-4", title: "Week 6 Live Q&A", type: "live", duration: "Thu 2PM EST" },
    ],
  },
  {
    num: 7, title: "Scaling", description: "Automate, delegate, and scale to $10K/month+.",
    unlocked: false,
    lessons: [
      { id: "7-1", title: "Automation Playbook", type: "video", duration: "22 min" },
      { id: "7-2", title: "SOPs & Delegation Guide", type: "worksheet", duration: "PDF" },
      { id: "7-3", title: "Hiring Your First VA", type: "video", duration: "15 min" },
      { id: "7-4", title: "Week 7 Live Q&A", type: "live", duration: "Thu 2PM EST" },
    ],
  },
  {
    num: 8, title: "Launch & Beyond", description: "Your big launch plan and long-term growth roadmap.",
    unlocked: false,
    lessons: [
      { id: "8-1", title: "Launch Day Checklist", type: "video", duration: "18 min" },
      { id: "8-2", title: "90-Day Growth Plan", type: "worksheet", duration: "PDF" },
      { id: "8-3", title: "Building a Team", type: "video", duration: "20 min" },
      { id: "8-4", title: "Final Live Call & Graduation", type: "live", duration: "Thu 2PM EST" },
    ],
  },
];

const lessonTypeIcon = (type: Lesson["type"]) => {
  switch (type) {
    case "video": return Play;
    case "worksheet": return FileText;
    case "live": return Video;
  }
};

const lessonTypeColor = (type: Lesson["type"]) => {
  switch (type) {
    case "video": return "bg-primary/10 text-primary";
    case "worksheet": return "bg-blue-500/10 text-blue-500";
    case "live": return "bg-amber-500/10 text-amber-500";
  }
};

const Curriculum = () => {
  const [expandedWeeks, setExpandedWeeks] = useState<number[]>([2]);
  const { progress, loading: progressLoading, toggleModule } = useMemberProgress();

  const completedSet = new Set(progress?.modules_completed ?? []);

  const toggleWeek = (num: number) => {
    setExpandedWeeks((prev) =>
      prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num]
    );
  };

  const totalLessons = CURRICULUM.reduce((sum, w) => sum + w.lessons.length, 0);
  const completedCount = completedSet.size;
  const overallProgress = Math.round((completedCount / totalLessons) * 100);

  return (
    <DashboardLayout title="Curriculum" subtitle="8-Week Creator Growth Program">
      {/* Overall progress */}
      <div className="bg-card rounded-xl border border-border p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-display font-semibold text-base text-foreground">Overall Progress</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {completedCount} of {totalLessons} lessons completed
            </p>
          </div>
          <span className="font-display font-bold text-2xl text-primary">{overallProgress}%</span>
        </div>
        <Progress value={overallProgress} className="h-2.5 bg-secondary" />
      </div>

      {progressLoading && (
        <div className="flex justify-center py-4">
          <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Week modules */}
      <div className="space-y-3">
        {CURRICULUM.map((week) => {
          const isExpanded = expandedWeeks.includes(week.num);
          const weekCompleted = week.lessons.filter((l) => completedSet.has(l.id)).length;
          const weekProgress = Math.round((weekCompleted / week.lessons.length) * 100);

          return (
            <div
              key={week.num}
              className={`bg-card rounded-xl border transition-colors ${
                !week.unlocked ? "border-border opacity-60" : "border-border hover:border-primary/20"
              }`}
            >
              <button
                onClick={() => week.unlocked && toggleWeek(week.num)}
                className="w-full flex items-center gap-4 p-5 text-left"
                disabled={!week.unlocked}
              >
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 border-2 ${
                    weekProgress === 100
                      ? "bg-primary border-primary text-primary-foreground"
                      : week.unlocked
                      ? "border-primary/50 text-primary bg-primary/10"
                      : "border-border text-muted-foreground bg-muted"
                  }`}
                >
                  {weekProgress === 100 ? <CheckCircle2 className="h-5 w-5" /> : week.unlocked ? week.num : <Lock className="h-4 w-4" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-display font-semibold text-sm text-foreground">
                      Week {week.num}: {week.title}
                    </h4>
                    {weekProgress === 100 && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                        Complete
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">{week.description}</p>
                  {week.unlocked && (
                    <div className="flex items-center gap-3 mt-2">
                      <Progress value={weekProgress} className="h-1.5 bg-secondary flex-1 max-w-[200px]" />
                      <span className="text-[10px] text-muted-foreground font-medium">
                        {weekCompleted}/{week.lessons.length}
                      </span>
                    </div>
                  )}
                </div>

                {week.unlocked && (
                  isExpanded
                    ? <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
                    : <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                )}
              </button>

              {isExpanded && week.unlocked && (
                <div className="border-t border-border px-5 pb-4 pt-2 space-y-1">
                  {week.lessons.map((lesson) => {
                    const Icon = lessonTypeIcon(lesson.type);
                    const colorClass = lessonTypeColor(lesson.type);
                    const done = completedSet.has(lesson.id);

                    return (
                      <div
                        key={lesson.id}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-muted/50 ${
                          done ? "opacity-70" : ""
                        }`}
                      >
                        <button
                          onClick={() => toggleModule(lesson.id)}
                          className="shrink-0"
                          aria-label={done ? "Mark incomplete" : "Mark complete"}
                        >
                          {done ? (
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                          )}
                        </button>

                        <div className={`h-8 w-8 rounded-md ${colorClass} flex items-center justify-center shrink-0`}>
                          <Icon className="h-4 w-4" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${done ? "line-through text-muted-foreground" : "text-foreground"}`}>
                            {lesson.title}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                            {lesson.duration}
                          </span>
                          {lesson.type === "worksheet" && (
                            <Download className="h-3.5 w-3.5 text-muted-foreground hover:text-primary cursor-pointer" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
};

export default Curriculum;
