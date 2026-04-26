import { useState, useEffect } from "react";

const DURATION_MS = 48 * 60 * 60 * 1000; // 48 hours

const getTimeLeft = () => {
  const now = Date.now();
  // Create a "rolling" deadline that's always within 48h based on a stable anchor
  // Uses a daily anchor so it looks consistent within a session
  const anchor = Math.floor(now / DURATION_MS) * DURATION_MS + DURATION_MS;
  const diff = Math.max(0, anchor - now);

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
};

const CountdownTimer = () => {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <span className="font-mono text-[10px] text-primary-foreground/80">
      {pad(time.hours)}:{pad(time.minutes)}:{pad(time.seconds)}
    </span>
  );
};

export default CountdownTimer;
