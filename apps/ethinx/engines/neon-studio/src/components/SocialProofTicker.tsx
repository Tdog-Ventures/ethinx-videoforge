import { useState, useEffect } from "react";

const messages = [
  "🎬 Sarah from Melbourne just generated 30 video ads",
  "📊 TechFlow Solutions completed their CreatorOS audit",
  "🚀 New partner signed up from London",
  "💰 Urban Eats hit $15K in tracked revenue",
  "🎯 Apex Digital onboarded 3 new clients using ETHINX",
];

const SocialProofTicker = () => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length);
        setVisible(true);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const now = new Date();
  const mins = Math.floor(Math.random() * 30) + 1;

  return (
    <section className="py-10 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <div
          className={`inline-flex items-center gap-3 bg-card border border-border rounded-full px-6 py-3 transition-all duration-400 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <span className="text-sm text-foreground">{messages[index]}</span>
          <span className="text-xs text-muted-foreground">{mins}m ago</span>
        </div>
      </div>
    </section>
  );
};

export default SocialProofTicker;
