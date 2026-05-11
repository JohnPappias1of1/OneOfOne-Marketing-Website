import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Check, ArrowRight, Sparkles, Gift } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    setup: "$500",
    monthly: "$297",
    tagline: "Get the foundation in place fast.",
    highlight: false,
    includes: [
      "Custom website",
      "Chat widget",
      "Lead capture form",
      "Lead Connector mobile app",
      "Review funnel",
      "Basic local SEO",
    ],
    bestFor: [
      "Newer businesses under 10 reviews",
      "Smaller single-truck operations",
      "Price-sensitive prospects",
      "First few clients while building case studies",
    ],
  },
  {
    name: "Core",
    setup: "$1,000",
    monthly: "$497",
    tagline: "Our most popular package — built to grow with you.",
    highlight: true,
    includes: [
      "Everything in Starter",
      "Missed-call text-back",
      "Full automation sequences",
      "Advanced review funnel with filtering",
      
      "Priority support",
    ],
    bestFor: [
      "Established businesses with 2–5 trucks",
      "20+ Google reviews already",
      "Owners actively trying to grow",
      "Bread-and-butter clients",
    ],
  },
  {
    name: "Premium",
    setup: "$1,500",
    monthly: "$797",
    tagline: "Full acquisition system for serious operators.",
    highlight: false,
    includes: [
      "Everything in Core",
      "AI receptionist",
      "Full SEO optimization",
      "Competitor analysis",
      "Quarterly strategy call",
      "Custom automation builds",
      "Lead nurture sequences",
    ],
    bestFor: [
      "Larger operations with 5+ trucks",
      "Multi-location businesses",
      "Owners already spending on ads",
      "Businesses doing $500K+ annually",
    ],
  },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  const formatAnnual = (monthlyStr: string) => {
    const num = parseInt(monthlyStr.replace(/[^0-9]/g, ""), 10);
    return `$${(num * 12).toLocaleString()}`;
  };

  return (
    <>
      <SEOHead
        title="Pricing | OneofOne Marketing Packages & Plans"
        description="Transparent pricing for our Starter, Core, and Premium packages. Custom websites, automation, SEO, and AI built for service businesses."
        canonical="/pricing"
      />
      <Layout>
        {/* Hero */}
        <section className="pt-32 pb-12 lg:pb-16 bg-gradient-hero relative">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="relative section-container text-center">
            <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
              Pricing
            </span>
            <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 max-w-4xl mx-auto">
              Simple, Honest <span className="gradient-text">Pricing</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Pick the package that matches where your business is right now. Upgrade anytime as you grow.
            </p>

            {/* Billing toggle */}
            <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full border border-border bg-card/50 backdrop-blur">
              <span className={`text-sm font-medium ${!annual ? "text-foreground" : "text-muted-foreground"}`}>
                Monthly
              </span>
              <Switch checked={annual} onCheckedChange={setAnnual} aria-label="Toggle annual billing" />
              <span className={`text-sm font-medium flex items-center gap-2 ${annual ? "text-foreground" : "text-muted-foreground"}`}>
                Annual
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/15 text-primary text-xs font-semibold">
                  <Gift className="w-3 h-3" />
                  +12 weeks free
                </span>
              </span>
            </div>
          </div>
        </section>

        {/* Tiers */}
        <section className="py-16 lg:py-24">
          <div className="section-container">
            <div className="grid lg:grid-cols-3 gap-8">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`relative rounded-2xl p-8 flex flex-col ${
                    tier.highlight
                      ? "border-2 border-primary bg-primary/5 shadow-xl"
                      : "border border-border bg-card"
                  }`}
                >
                  {tier.highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider">
                        <Sparkles className="w-3 h-3" />
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="font-display text-2xl font-bold mb-2">{tier.name} Package</h3>
                    <p className="text-sm text-muted-foreground">{tier.tagline}</p>
                  </div>

                  <div className="mb-8 pb-8 border-b border-border">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl font-display font-bold gradient-text">{tier.monthly}</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{tier.setup}</span> one-time setup
                    </p>
                  </div>

                  <div className="mb-8 flex-1">
                    <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">
                      What's included
                    </h4>
                    <ul className="space-y-3">
                      {tier.includes.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-foreground/90">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-8">
                    <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">
                      Best for
                    </h4>
                    <ul className="space-y-2">
                      {tier.bestFor.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link to="/contact" className="block">
                    <Button
                      className={tier.highlight ? "btn-primary w-full" : "w-full"}
                      variant={tier.highlight ? "default" : "outline"}
                    >
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-hero relative">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="relative section-container text-center">
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-6">
              Not Sure Which Package Fits?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Book a free strategy call and we'll help you pick the right starting point — no pressure.
            </p>
            <Link to="/contact">
              <Button className="btn-primary">
                Book a Free Strategy Call
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </Layout>
    </>
  );
}
