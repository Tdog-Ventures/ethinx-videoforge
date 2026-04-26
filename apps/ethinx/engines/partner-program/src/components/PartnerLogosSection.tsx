import { useEffect, useRef } from "react";

const partners = [
  "Apex Digital",
  "NovaBrand",
  "ScaleUp Co.",
  "MediaPulse",
  "BrightPath",
  "VelocityAI",
  "ClearEdge",
  "SynergyX",
  "PeakGrowth",
  "FluxMedia",
];

const PartnerLogosSection = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf: number;
    let pos = 0;
    const speed = 0.4;
    const tick = () => {
      pos -= speed;
      if (Math.abs(pos) >= el.scrollWidth / 2) pos = 0;
      el.style.transform = `translateX(${pos}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const logos = [...partners, ...partners];

  return (
    <section className="overflow-hidden border-y border-border bg-muted/30 py-10">
      <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
        Trusted by agencies worldwide
      </p>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div ref={trackRef} className="flex w-max items-center gap-12 whitespace-nowrap">
          {logos.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex h-10 items-center justify-center rounded-md border border-border/50 bg-card/60 px-6 text-sm font-semibold tracking-wide text-muted-foreground/70 select-none"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerLogosSection;
