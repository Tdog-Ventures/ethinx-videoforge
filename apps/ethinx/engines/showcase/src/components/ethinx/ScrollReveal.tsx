import { useEffect, useRef, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
}

const ScrollReveal = ({ children, className = '', stagger }: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const staggerClass = stagger ? `stagger-${stagger}` : '';

  return (
    <div ref={ref} className={`fade-in-up ${staggerClass} ${className}`}>
      {children}
    </div>
  );
};

export default ScrollReveal;
