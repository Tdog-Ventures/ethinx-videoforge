import { useEffect, useState } from 'react';
import ScrollReveal from './ScrollReveal';

const activities = [
  { icon: '🎬', text: 'Sarah from Melbourne just generated 30 video ads', time: '2 minutes ago' },
  { icon: '📊', text: 'TechFlow Solutions completed their CreatorOS audit', time: '5 minutes ago' },
  { icon: '🚀', text: 'New partner signed up from London', time: '8 minutes ago' },
  { icon: '💰', text: 'Urban Eats hit $15K in tracked revenue', time: '12 minutes ago' },
  { icon: '🎯', text: 'Apex Digital onboarded 3 new clients using ETHINX', time: '15 minutes ago' },
];

const ActivityFeedSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activities.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="px-4 py-20">
      <div className="max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Happening <span className="text-gradient-green">Right Now</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal stagger={1}>
          <div className="relative h-20 flex items-center justify-center">
            {activities.map((activity, i) => (
              <div
                key={i}
                className="absolute inset-0 flex items-center justify-center transition-all duration-500"
                style={{
                  opacity: i === currentIndex ? 1 : 0,
                  transform: i === currentIndex ? 'translateY(0)' : 'translateY(10px)',
                }}
              >
                <div className="rounded-lg border border-border bg-card px-6 py-4 inline-flex items-center gap-3">
                  <span className="text-2xl">{activity.icon}</span>
                  <div className="text-left">
                    <p className="text-sm font-medium">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ActivityFeedSection;
