import { Mail, Calendar } from "lucide-react";

const Footer = () => (
  <footer className="py-16 px-6 border-t border-border">
    <div className="container max-w-4xl text-center space-y-6">
      <h3 className="font-display text-2xl font-bold">
        Creator<span className="text-gradient-neon">o</span>system
      </h3>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
        <a href="mailto:hello@creatorosystem.com" className="flex items-center gap-2 hover:text-primary transition-colors">
          <Mail className="w-4 h-4" />
          hello@creatorosystem.com
        </a>
        <a href="#order-form" className="flex items-center gap-2 hover:text-primary transition-colors">
          <Calendar className="w-4 h-4" />
          Schedule a call with founder
        </a>
      </div>
      <p className="text-xs text-muted-foreground/60">
        © {new Date().getFullYear()} Creatorosystem. All rights reserved.
      </p>
      <a
        href="https://ethinx-win-showcase.lovable.app"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-muted-foreground/40 hover:text-primary transition-colors"
      >
        Part of the ETHINX ecosystem
      </a>
    </div>
  </footer>
);

export default Footer;
