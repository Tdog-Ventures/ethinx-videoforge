import { ExternalLink, Video, BarChart3, Compass, GraduationCap, Trophy } from "lucide-react";
import { useFadeIn } from "@/hooks/useFadeIn";

const ecosystemApps = [
  {
    icon: <Video className="h-5 w-5" />,
    label: "AdEngine Platform",
    description: "AI-powered video & ad generation",
    href: "https://pro-clip-gen.lovable.app",
  },
  {
    icon: <Trophy className="h-5 w-5" />,
    label: "Case Studies",
    description: "Real partner results & wins",
    href: "https://ethinx-win-showcase.lovable.app",
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    label: "Creator System",
    description: "Blueprint for content creators",
    href: "https://creator-blueprint-builder.lovable.app",
  },
  {
    icon: <Compass className="h-5 w-5" />,
    label: "Free Audit",
    description: "Assess your growth potential",
    href: "https://creator-compass-dash.lovable.app",
  },
  {
    icon: <GraduationCap className="h-5 w-5" />,
    label: "8-Week Course",
    description: "Creator growth accelerator",
    href: "https://biz-creator-path.lovable.app",
  },
];

const EcosystemSection = () => {
  const ref = useFadeIn();

  return (
    <section className="py-24">
      <div ref={ref} className="fade-in-section container mx-auto px-4">
        <p className="text-center text-sm font-medium uppercase tracking-widest text-primary">
          Explore the Ecosystem
        </p>
        <h2 className="mt-3 text-center text-3xl font-bold sm:text-4xl">
          ETHINX Tools & Resources
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
          Everything you need to launch, grow, and scale your AI-powered agency.
        </p>

        <div className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ecosystemApps.map((app) => (
            <a
              key={app.label}
              href={app.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 glow-green-hover"
            >
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-primary/20 bg-primary/10 text-primary">
                {app.icon}
              </div>
              <div className="min-w-0">
                <p className="flex items-center gap-1 text-sm font-semibold text-foreground">
                  {app.label}
                  <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100 text-primary" />
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">{app.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
