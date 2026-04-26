import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "Problem", href: "#problem" },
  { label: "System", href: "#solution" },
  { label: "Included", href: "#included" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const StickyNav = () => {
  const [visible, setVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg"
        >
          <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-14">
            <a href="#" className="font-display font-bold text-lg">
              Creator<span className="text-primary">OS</span>
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden overflow-hidden border-t border-border/50 bg-background/95 backdrop-blur-lg"
              >
                <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors py-2"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default StickyNav;
