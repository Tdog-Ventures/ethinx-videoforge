import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Monitor } from 'lucide-react';
import { useThemeContext } from '@/components/ThemeProvider';

const navLinks = [
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Results', href: '#results' },
  { label: 'Partners', href: '#partners' },
  { label: 'Pricing', href: '#pricing' },
];

const themeOptions = [
  { mode: 'light' as const, icon: Sun, label: 'Light' },
  { mode: 'dark' as const, icon: Moon, label: 'Dark' },
  { mode: 'system' as const, icon: Monitor, label: 'System' },
];

const StickyNav = () => {
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { mode, setMode } = useThemeContext();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = navLinks.map((l) => l.href.slice(1));
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-lg border-b border-border shadow-lg shadow-background/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#" className="text-xl font-bold tracking-tight shrink-0">
          ETHINX<span className="text-primary">.</span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {/* Pill-shaped theme toggle */}
          <div className="flex items-center rounded-full border border-border bg-muted/50 p-0.5 gap-0.5">
            {themeOptions.map(({ mode: m, icon: Icon, label }) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`p-1.5 rounded-full transition-all duration-200 ${
                  mode === m
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                aria-label={`${label} theme`}
              >
                <Icon size={14} />
              </button>
            ))}
          </div>

          <a
            href="https://creator-compass-dash.lovable.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:scale-105 glow-green-hover"
          >
            Get Started
          </a>

          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          mobileOpen
            ? 'max-h-80 opacity-100 border-b border-border'
            : 'max-h-0 opacity-0'
        } bg-background/95 backdrop-blur-lg`}
      >
        <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link, i) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-300 ${
                  mobileOpen
                    ? 'translate-y-0 opacity-100'
                    : '-translate-y-2 opacity-0'
                } ${
                  isActive
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
                style={{ transitionDelay: mobileOpen ? `${i * 50}ms` : '0ms' }}
              >
                {link.label}
              </a>
            );
          })}
          <a
            href="https://creator-compass-dash.lovable.app"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className={`mt-2 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 glow-green-hover ${
              mobileOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
            }`}
            style={{ transitionDelay: mobileOpen ? `${navLinks.length * 50}ms` : '0ms' }}
          >
            Get Started
          </a>
        </nav>
      </div>
    </header>
  );
};

export default StickyNav;
