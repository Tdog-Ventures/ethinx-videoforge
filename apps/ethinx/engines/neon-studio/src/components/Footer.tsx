const footerCols = [
  {
    title: "Products",
    links: [
      { label: "VideoForge", href: "https://pro-clip-gen.lovable.app" },
      { label: "Creator System", href: "https://biz-creator-path.lovable.app" },
      { label: "Free Audit", href: "https://creator-compass-dash.lovable.app" },
      { label: "DFY Package", href: "https://premium-video-forge.lovable.app" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Results", href: "https://ethinx-win-showcase.lovable.app" },
      { label: "Partners", href: "https://brand-cascade.lovable.app" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Refund Policy", href: "#" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Instagram", href: "#" },
      { label: "Facebook", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "X", href: "#" },
    ],
  },
];

const Footer = () => (
  <footer className="border-t border-border bg-card/50 py-16">
    <div className="container mx-auto px-4 sm:px-6">
      <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-8 mb-12">
        <div className="sm:col-span-2 md:col-span-1">
          <span className="text-xl font-bold text-foreground">
            ETHINX<span className="text-primary">.</span>
          </span>
          <p className="text-sm text-muted-foreground mt-2">AI-powered marketing engine for creators and businesses.</p>
          <a
            href="https://ethinx-central-hub.lovable.app/login"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline mt-3 inline-block"
          >
            Sign In
          </a>
        </div>
        {footerCols.map((col) => (
          <div key={col.title}>
            <h4 className="font-semibold text-foreground mb-3 text-sm">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-muted-foreground">
        <p>© 2026 ETHINX Systems. All rights reserved.</p>
        <p>Adelaide, Australia</p>
      </div>
    </div>
  </footer>
);

export default Footer;
