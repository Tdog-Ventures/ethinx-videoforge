import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { label: "What's Included", href: "#included" },
  { label: "Results", href: "#results" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container max-w-6xl mx-auto flex items-center justify-between h-16 px-4">
        {/* Brand */}
        <a href="#" className="flex items-center gap-2 font-display font-bold text-lg text-foreground">
          <Zap className="w-5 h-5 text-primary" />
          <span>VideoForge</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="neon" size="sm" className="hidden md:inline-flex" asChild>
            <a href="#stripe-full">
              <Zap className="w-4 h-4" />
              Get Started
            </a>
          </Button>
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border overflow-hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-muted-foreground hover:text-foreground py-2 px-3 rounded-md hover:bg-muted transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Button variant="neon" size="sm" className="mt-2" asChild>
                <a href="#stripe-full" onClick={() => setMobileOpen(false)}>
                  <Zap className="w-4 h-4" />
                  Get Started
                </a>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
