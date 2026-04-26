import { Mail, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const templates = [
  { title: "Welcome email for your audience", tag: "Onboarding" },
  { title: "Product launch sequence", tag: "Launch" },
  { title: "Sales follow-up sequence", tag: "Sales" },
];

export function EmailTemplates() {
  return (
    <section>
      <h3 className="text-lg font-bold text-foreground mb-1">Email Templates</h3>
      <p className="text-sm text-muted-foreground mb-4">30 ready-to-use templates</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((t, i) => (
          <div key={i} className="card-glow rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  {t.tag}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-foreground">{t.title}</h4>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="mt-4 w-full border-border text-foreground hover:bg-secondary"
              onClick={() => toast.success("Template copied to clipboard!")}
            >
              <Copy className="h-3.5 w-3.5 mr-1" /> Copy Template
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
