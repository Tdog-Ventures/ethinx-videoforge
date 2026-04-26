import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

const FooterSection = () => {
  const [email, setEmail] = useState("");

  return (
    <footer className="border-t border-border/50">
      {/* Final CTA */}
      <div className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4">
              Claim Your <span className="text-primary text-glow">Free Audit</span>
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">Limited spots available. Start your creator journey today.</p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button variant="neon" size="lg" className="px-6">
                Get Free Audit
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-4">
              ✓ No spam. Unsubscribe anytime. &nbsp; ✓ 30-day money-back guarantee.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Footer links */}
      <div className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-display font-bold text-lg">
            Creator<span className="text-primary">OS</span>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
          <div className="flex flex-col items-center sm:items-end gap-1">
            <p className="text-xs text-muted-foreground">© 2026 CreatorOS. All rights reserved.</p>
            <a
              href="https://ethinx-win-showcase.lovable.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Part of the ETHINX ecosystem
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
