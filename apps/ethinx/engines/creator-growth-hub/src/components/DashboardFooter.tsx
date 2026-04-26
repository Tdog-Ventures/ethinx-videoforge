export function DashboardFooter() {
  return (
    <footer className="mt-8 rounded-xl bg-secondary p-5 text-center">
      <p className="text-sm text-foreground">
        You're on <span className="font-bold neon-text">Week 2 of 8</span> → Keep going! 🔥
      </p>
      <div className="mt-3 mx-auto max-w-xs progress-bar-track h-2">
        <div className="progress-bar-fill h-full" style={{ width: "25%" }} />
      </div>
      <p className="mt-2 text-xs text-muted-foreground font-mono">25% complete</p>
      <p className="mt-4 text-xs text-muted-foreground">
        <a href="https://ethinx-win-showcase.lovable.app" target="_blank" rel="noopener noreferrer" className="text-primary/70 hover:text-primary transition-colors">
          Part of the ETHINX ecosystem
        </a>
      </p>
    </footer>
  );
}
