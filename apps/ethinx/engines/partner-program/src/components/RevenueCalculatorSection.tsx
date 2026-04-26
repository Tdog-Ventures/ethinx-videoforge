import { useState, useEffect, useRef } from "react";
import { Calculator } from "lucide-react";
import { useFadeIn } from "@/hooks/useFadeIn";

function useAnimatedNumber(target: number, duration = 600) {
  const [display, setDisplay] = useState(target);
  const prev = useRef(target);

  useEffect(() => {
    const from = prev.current;
    const diff = target - from;
    if (diff === 0) return;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(from + eased * diff));
      if (p < 1) requestAnimationFrame(tick);
      else prev.current = target;
    };
    requestAnimationFrame(tick);
  }, [target, duration]);

  return display;
}

const RevenueCalculatorSection = () => {
  const [clients, setClients] = useState(25);
  const [price, setPrice] = useState(297);
  const ref = useFadeIn();

  const monthlyRevenue = clients * price;
  const annualRevenue = monthlyRevenue * 12;
  const platformCost = 200;
  const netProfit = monthlyRevenue - platformCost;

  const animMonthly = useAnimatedNumber(monthlyRevenue);
  const animAnnual = useAnimatedNumber(annualRevenue);
  const animNet = useAnimatedNumber(netProfit);

  return (
    <section id="calculator" className="py-24">
      <div ref={ref} className="fade-in-section container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          <Calculator className="mr-2 inline-block h-8 w-8 text-primary" />
          Calculate Your Partner Revenue
        </h2>

        <div className="mx-auto mt-14 max-w-2xl rounded-lg border border-border bg-card p-6 sm:p-10">
          {/* Clients slider */}
          <div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Number of Clients</span>
              <span className="font-semibold text-primary">{clients}</span>
            </div>
            <input
              type="range"
              min={5}
              max={200}
              value={clients}
              onChange={(e) => setClients(Number(e.target.value))}
              className="mt-2 w-full accent-[hsl(153,100%,50%)] cursor-pointer"
            />
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>5</span><span>200</span>
            </div>
          </div>

          {/* Price slider */}
          <div className="mt-8">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Average Monthly Price You Charge</span>
              <span className="font-semibold text-primary">${price}</span>
            </div>
            <input
              type="range"
              min={97}
              max={997}
              step={10}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="mt-2 w-full accent-[hsl(153,100%,50%)] cursor-pointer"
            />
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>$97</span><span>$997</span>
            </div>
          </div>

          {/* Results */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-muted/50 p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Monthly Revenue</p>
              <p className="mt-1 text-2xl font-bold text-primary">${animMonthly.toLocaleString()}</p>
            </div>
            <div className="rounded-lg border border-border bg-muted/50 p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Annual Revenue</p>
              <p className="mt-1 text-2xl font-bold text-primary">${animAnnual.toLocaleString()}</p>
            </div>
            <div className="rounded-lg border border-border bg-muted/50 p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">ETHINX Platform Cost</p>
              <p className="mt-1 text-2xl font-bold text-foreground">${platformCost}/mo</p>
            </div>
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 text-center glow-green">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Your Net Profit</p>
              <p className="mt-1 text-2xl font-bold text-primary">${animNet.toLocaleString()}/mo</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RevenueCalculatorSection;
