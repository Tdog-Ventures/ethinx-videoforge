const Footer = () => (
  <footer className="border-t border-border py-10">
    <div className="container mx-auto flex flex-col items-center gap-6 px-4 text-center sm:flex-row sm:justify-between sm:text-left">
      <div className="text-xl font-bold tracking-tight">
        ETHINX<span className="text-primary">.</span>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
        <a href="#" className="transition-colors hover:text-foreground">Privacy</a>
        <a href="#" className="transition-colors hover:text-foreground">Terms</a>
        <a href="#" className="transition-colors hover:text-foreground">Contact</a>
        <a href="#" className="transition-colors hover:text-foreground">Partner Login</a>
        <a href="/login" className="transition-colors hover:text-foreground">Sign In</a>
        <a href="/admin" className="transition-colors hover:text-foreground">Admin</a>
      </div>
      <div className="flex flex-col items-center gap-1 sm:items-end">
        <p className="text-xs text-muted-foreground">© 2025 ETHINX Systems. All rights reserved.</p>
        <a href="https://ethinx-win-showcase.lovable.app" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground transition-colors hover:text-foreground">Part of the ETHINX ecosystem</a>
      </div>
    </div>
  </footer>
);

export default Footer;
