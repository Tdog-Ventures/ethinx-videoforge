import { useEffect, useRef, useState } from "react";

interface Props {
  end: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
}

const CountUp = ({ end, prefix = "", suffix = "", decimals = 0, duration = 2000 }: Props) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(eased * end);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  const display = decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString();

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
};

export default CountUp;
