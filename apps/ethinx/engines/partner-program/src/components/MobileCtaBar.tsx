import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const MobileCtaBar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToForm = () => {
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 px-4 py-3 backdrop-blur-lg sm:hidden"
        >
          <Button variant="neon" size="lg" className="w-full" onClick={scrollToForm}>
            Apply for Partnership <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileCtaBar;
