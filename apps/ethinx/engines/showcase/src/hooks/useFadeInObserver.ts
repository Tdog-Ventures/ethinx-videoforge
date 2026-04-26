import { useEffect, useRef, useCallback } from 'react';

export const useFadeInObserver = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const setupObserver = useCallback(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );

    const elements = containerRef.current.querySelectorAll('.fade-in-up');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Small delay to ensure all children are rendered
    const timer = setTimeout(setupObserver, 100);
    return () => clearTimeout(timer);
  }, [setupObserver]);

  return containerRef;
};
