import { useState, useEffect } from "react";
import { Sun, Moon, Monitor, Menu, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { label: "Products", href: "#products" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Results", href: "#results" },
  { label: "Partners", href: "#partners" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const themeIcons = [
    { value: "light" as const, icon: Sun },
    { value: "dark" as const, icon: Moon },
    { value: "system" as const, icon: Monitor },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <a href="#" className="text-xl font-bold tracking-tight text-foreground">
          ETHINX<span className="text-primary">.</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center bg-muted rounded-lg p-1 gap-0.5">
            {themeIcons.map(({ value, icon: Icon }) => (
              <button
                key={value}
                onClick={() => setTheme(value)}
                className={`p-1.5 rounded-md transition-colors ${
                  theme === value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon size={14} />
              </button>
            ))}
          </div>
          <a
            href="https://creator-compass-dash.lovable.app"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:bg-secondary transition-colors"
          >
            Free Audit
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border px-4 pb-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-2 mt-3">
            {themeIcons.map(({ value, icon: Icon }) => (
              <button
                key={value}
                onClick={() => setTheme(value)}
                className={`p-2 rounded-md transition-colors ${
                  theme === value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon size={16} />
              </button>
            ))}
          </div>
          <a
            href="https://creator-compass-dash.lovable.app"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block text-center bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold"
          >
            Free Audit
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
