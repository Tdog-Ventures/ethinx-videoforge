import { Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFadeIn } from "@/hooks/useFadeIn";
import featureBranding from "@/assets/feature-branding.jpg";
import featureAiContent from "@/assets/feature-ai-content.jpg";
import featureRevenue from "@/assets/feature-revenue.jpg";

interface BlockProps {
  heading: string;
  description: string;
  bullets: string[];
  image: string;
  reverse?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
}

const Block = ({ heading, description, bullets, image, reverse, ctaLabel, ctaHref }: BlockProps) => {
  const ref = useFadeIn();
  return (
    <div
      ref={ref}
      className={`fade-in-section flex flex-col items-center gap-10 lg:flex-row ${reverse ? "lg:flex-row-reverse" : ""}`}
    >
      <div className="flex w-full items-center justify-center lg:w-1/2">
        <img
          src={image}
          alt={heading}
          className="h-64 w-full max-w-md rounded-lg border border-border object-cover sm:h-80"
          loading="lazy"
        />
      </div>
      <div className="w-full lg:w-1/2">
        <h3 className="text-2xl font-bold sm:text-3xl">{heading}</h3>
        <p className="mt-3 text-muted-foreground">{description}</p>
        <ul className="mt-5 space-y-2">
          {bullets.map((b) => (
            <li key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="h-4 w-4 shrink-0 text-primary" /> {b}
            </li>
          ))}
        </ul>
        {ctaLabel && ctaHref && (
          <Button variant="ghost-green" size="sm" className="mt-5" asChild>
            <a href={ctaHref} target="_blank" rel="noopener noreferrer">
              {ctaLabel} <ExternalLink className="ml-1 h-3.5 w-3.5" />
            </a>
          </Button>
        )}
      </div>
    </div>
  );
};

const WhatYouGetSection = () => (
  <section id="features" className="py-24">
    <div className="container mx-auto space-y-24 px-4">
      <Block
        heading="Your Brand. Our Technology."
        description="Fully white-labeled dashboard with your logo, colors, and domain. Your clients never see ETHINX."
        bullets={["Custom domain", "Your branding", "Your pricing", "Your client portal"]}
        image={featureBranding}
        ctaLabel="See Platform"
        ctaHref="https://pro-clip-gen.lovable.app"
      />
      <Block
        heading="AI-Powered Content at Scale"
        description="Generate professional video ads, social content, email sequences, and landing pages in seconds — not days."
        bullets={["60-second video generation", "30+ ad variants per campaign", "Automated email sequences", "Landing page builder"]}
        image={featureAiContent}
        reverse
        ctaLabel="Explore Creator System"
        ctaHref="https://creator-blueprint-builder.lovable.app"
      />
      <Block
        heading="Built-In Revenue Engine"
        description="Set your own prices. Keep 70% of every sale. We handle the tech, infrastructure, and updates."
        bullets={["You set pricing", "70/30 revenue split (you keep 70%)", "Recurring SaaS revenue", "No inventory or fulfillment"]}
        image={featureRevenue}
        ctaLabel="See Results"
        ctaHref="https://ethinx-win-showcase.lovable.app"
      />
    </div>
  </section>
);

export default WhatYouGetSection;
