const Footer = () => {
  return (
    <footer className="border-t border-border px-4 py-12">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-2xl font-bold tracking-tight">
          ETHINX<span className="text-primary">.</span>
        </div>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms</a>
          <a href="#" className="hover:text-primary transition-colors">Contact</a>
          <a href="#" className="hover:text-primary transition-colors">Submit Your Results</a>
        </div>
        <p className="text-xs text-muted-foreground">ETHINX Systems © 2025. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
