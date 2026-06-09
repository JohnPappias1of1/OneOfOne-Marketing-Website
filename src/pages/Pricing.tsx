import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { StripeEmbeddedCheckout } from "@/components/StripeEmbeddedCheckout";
import { Check, ArrowRight, Shield, Star, Loader2 } from "lucide-react";

type Feature = { label: string; highlight?: boolean };

type Plan = {
  id: string;
  tier: string;
  name: string;
  tagline: string;
  price: number;
  priceId: string;
  popularBadge?: string;
  guarantee?: string;
  guaranteeNote?: string;
  bestFor: string[];
  featuresIntro?: string;
  features: Feature[];
  ctaLabel: string;
  ctaNote: string;
};

const plans: Plan[] = [
  {
    id: "solo_operator",
    tier: "Capture — Tier 1",
    name: "The Solo Operator",
    tagline:
      "You're already getting found online. This makes sure every one of those leads actually reaches you.",
    price: 347,
    priceId: "solo_operator_monthly",
    guarantee:
      "3 to 5 new jobs in your first 30 days, guaranteed — or your money back.",
    guaranteeNote:
      "Capture system, not lead gen. We convert your existing organic traffic — not cold audiences.",
    bestFor: [
      "1-truck operations under 10 Google reviews",
      "Newer businesses getting found but not converting",
      "Owners tired of looking smaller than they are",
      "Anyone building their first real online presence",
    ],
    featuresIntro:
      "Six pieces that work together as one system — so organic leads find you, reach you, and don't slip through the cracks.",
    features: [
      { label: "Missed-call auto text-back in under 60 seconds — before the lead calls your competitor", highlight: true },
      { label: "Custom website built to turn organic visitors into booked calls" },
      { label: "Live chat widget captures leads while you're on the job" },
      { label: "Lead capture form so no overnight inquiry slips through" },
      { label: "All-in-One Lead Management App — every lead in one place, nothing lost" },
      { label: "Automated review funnel turns happy customers into 5-star Google reviews" },
      { label: "Local Search Visibility setup so you rank when nearby homeowners search" },
    ],
    ctaLabel: "Start Capturing",
    ctaNote: "Setup included · Live in 4–5 days · No contracts",
  },
  {
    id: "pipeline_builder",
    tier: "Capture — Tier 2",
    name: "The Pipeline Builder",
    tagline:
      "Your organic traffic is already sending you leads. This system makes sure not a single one goes unanswered.",
    price: 647,
    priceId: "pipeline_builder_monthly",
    popularBadge: "90% of operators choose this",
    guarantee:
      "3 to 5 new jobs in your first 30 days, guaranteed — or your money back.",
    guaranteeNote:
      "Capture system, not lead gen. We convert your existing organic traffic — not cold audiences.",
    bestFor: [
      "2–5 truck operations with an existing online presence",
      "Owners with 20+ Google reviews getting steady organic traffic",
      "Businesses losing jobs to missed calls and slow follow-up",
      "Operators ready to stop leaking revenue they're already earning",
    ],
    featuresIntro:
      "Everything in Solo Operator plus the response layer — leads don't just reach you, they get answered instantly before they call your competitor.",
    features: [
      { label: "Everything in The Solo Operator" },
      { label: "AI receptionist answers, qualifies, and books organic leads 24/7 — even when you're on a job", highlight: true },
      { label: "Missed-call text-back in under 60 seconds — before the lead calls your competitor", highlight: true },
      { label: "Full automation sequences nurture every captured lead until they book" },
      { label: "Advanced review funnel with filtering — only 5-star experiences go public" },
      { label: "Priority support — real humans, fast responses" },
    ],
    ctaLabel: "Build My Pipeline",
    ctaNote: "Setup included · 30-day capture guarantee · No contracts",
  },
  {
    id: "market_dominator",
    tier: "Capture + Generation",
    name: "The Market Dominator",
    tagline:
      "Capture running clean. Now we pour fuel on it — LSA, Google Search, and retargeting to own your market.",
    price: 1497,
    priceId: "market_dominator_monthly",
    bestFor: [
      "5+ truck operations doing $500K+ annually",
      "Multi-location businesses managing multiple service areas",
      "Owners already spending on ads but not seeing real ROI",
      "Operators who want the full system running on autopilot",
    ],
    featuresIntro:
      "The full system — capture everything coming in organically, then add paid channels to bring more in on top of it.",
    features: [
      { label: "Everything in The Pipeline Builder" },
      { label: "LSA (Local Service Ads) setup and management — highest-intent paid channel for trades, you pay per verified lead", highlight: true },
      { label: "Google Search Ads layered on top of LSA to capture demand LSA misses", highlight: true },
      { label: "Facebook retargeting for visitors who found you but didn't book — follows them until they do", highlight: true },
      { label: "Full SEO optimization — rank above competitors organically while ads run alongside" },
      { label: "Competitor analysis — know exactly where their traffic and ad spend is coming from" },
      { label: "Dedicated account manager — not a ticket system, a real person on your account" },
      { label: "Monthly strategy call reviewing traffic, capture rates, ad performance, and growth plan" },
      { label: "Custom automation builds specific to your operation and service area" },
    ],
    ctaLabel: "Dominate My Market",
    ctaNote: "Setup included · Onboarded in 5 days · No contracts",
  },
];

function PlanCard({
  plan,
  onSubscribe,
  isLoading,
}: {
  plan: Plan;
  onSubscribe: (plan: Plan) => void;
  isLoading: boolean;
}) {
  const isPopular = plan.id === "pipeline_builder";

  return (
    <div
      className={`relative rounded-2xl p-7 flex flex-col transition-all duration-200 hover:-translate-y-1 ${
        isPopular
          ? "bg-card border-2 border-primary shadow-[0_0_50px_hsl(var(--primary)/0.08)] hover:shadow-[0_16px_60px_hsl(var(--primary)/0.18)]"
          : "bg-card/50 border border-border hover:border-border/80 hover:shadow-2xl"
      }`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-extrabold tracking-[0.13em] uppercase">
            <Star className="w-3 h-3 fill-current" />
            Most Popular
          </span>
        </div>
      )}

      <span className="text-primary text-[10px] font-bold tracking-[0.14em] uppercase mb-1.5">
        {plan.tier}
      </span>

      <h3 className="font-display text-2xl font-extrabold text-foreground mb-2 leading-tight">
        {plan.name}
      </h3>

      <p className="text-sm text-muted-foreground leading-relaxed mb-6 min-h-[3.75rem]">
        {plan.tagline}
      </p>

      <div className="flex items-baseline gap-0.5 mb-1">
        <span className="text-xl font-semibold text-muted-foreground/60">$</span>
        <span className="text-5xl font-extrabold text-foreground tracking-tight leading-none">
          {plan.price.toLocaleString()}
        </span>
        <span className="text-sm text-muted-foreground/60 ml-1">/mo</span>
      </div>
      <p className="text-[11px] text-muted-foreground/60 mb-1">
        Setup included — live in 4–5 days
      </p>
      {plan.popularBadge ? (
        <p className="text-[11px] font-semibold text-primary mb-5">{plan.popularBadge}</p>
      ) : (
        <div className="mb-5" />
      )}

      <div className="h-px bg-border mb-5" />

      <p className="text-[9px] font-bold tracking-[0.14em] uppercase text-muted-foreground/60 mb-2.5">
        Best for
      </p>
      <ul className="space-y-1.5 mb-5">
        {plan.bestFor.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className="w-1 h-1 rounded-full bg-primary/60 mt-2 flex-shrink-0" />
            <span className="text-sm text-muted-foreground leading-snug">{item}</span>
          </li>
        ))}
      </ul>

      <div className="h-px bg-border mb-5" />

      <p className="text-[9px] font-bold tracking-[0.14em] uppercase text-muted-foreground/60 mb-3">
        What's included
      </p>
      {plan.featuresIntro && (
        <p className="text-xs italic text-muted-foreground border-l-2 border-border pl-2.5 mb-3.5 leading-relaxed">
          {plan.featuresIntro}
        </p>
      )}
      <ul className="space-y-2.5 mb-6 flex-1">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <Check
              className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                f.highlight ? "text-primary" : "text-muted-foreground/60"
              }`}
              strokeWidth={2.5}
            />
            <span
              className={`text-sm leading-snug ${
                f.highlight ? "text-foreground font-semibold" : "text-muted-foreground"
              }`}
            >
              {f.label}
            </span>
          </li>
        ))}
      </ul>

      {plan.guarantee && (
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-3.5 mb-5">
          <div className="flex items-start gap-2.5 mb-2">
            <Shield className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-xs text-primary leading-relaxed font-medium m-0">
              {plan.guarantee}
            </p>
          </div>
          {plan.guaranteeNote && (
            <p className="text-[11px] text-muted-foreground/70 italic ml-6 leading-snug">
              {plan.guaranteeNote}
            </p>
          )}
        </div>
      )}

      <button
        onClick={() => onSubscribe(plan)}
        disabled={isLoading}
        className={`w-full py-3.5 px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-150 disabled:opacity-60 disabled:cursor-wait ${
          isPopular
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "border border-border bg-transparent text-foreground hover:bg-muted"
        }`}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Processing…
          </>
        ) : (
          <>
            {plan.ctaLabel}
            <ArrowRight className="w-3.5 h-3.5" />
          </>
        )}
      </button>
      <p className="text-[11px] text-muted-foreground/60 text-center mt-2 leading-snug">
        {plan.ctaNote}
      </p>
    </div>
  );
}

export default function PricingPage() {
  const [checkoutPriceId, setCheckoutPriceId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleSubscribe = (plan: Plan) => {
    setLoadingId(plan.id);
    setCheckoutPriceId(plan.priceId);
    setTimeout(() => setLoadingId(null), 600);
  };

  return (
    <>
      <SEOHead
        title="Pricing | OneofOne Marketing Capture & Growth Systems"
        description="Capture and convert the organic leads you're already getting. Three tiers from $347/mo — Solo Operator, Pipeline Builder, and Market Dominator."
        canonical="/pricing"
      />
      <Layout>
        <section className="pt-28 pb-12 bg-gradient-hero relative">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="relative section-container text-center max-w-3xl">
            <span className="inline-block px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-[0.16em] uppercase mb-5">
              OneofOne Systems · Pricing
            </span>
            <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-[1.1] tracking-tight mb-2">
              Start with capture.
            </h1>
            <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-[1.1] tracking-tight gradient-text mb-6">
              Scale with generation.
            </h1>
            <p className="text-muted-foreground text-base lg:text-lg leading-relaxed max-w-xl mx-auto mb-3">
              Tiers one and two capture and convert the organic traffic and inbound leads
              you're already getting — the ones currently going unanswered. Tier three adds
              paid acquisition on top of a system that's already working.
            </p>
            <p className="text-xs text-muted-foreground/60">
              No contracts &nbsp;·&nbsp; Setup included &nbsp;·&nbsp; Cancel anytime
            </p>
          </div>
        </section>

        <section className="pb-20">
          <div className="section-container">
            <div className="grid lg:grid-cols-3 gap-5 max-w-6xl mx-auto items-start">
              {plans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  onSubscribe={handleSubscribe}
                  isLoading={loadingId === plan.id}
                />
              ))}
            </div>

            <div className="max-w-2xl mx-auto mt-9 rounded-2xl border border-border bg-card/50 p-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex-1 min-w-[260px]">
                <p className="text-sm font-bold text-foreground mb-1">
                  Doing $500K+ annually with multiple locations or aggressive growth targets?
                </p>
                <p className="text-sm text-muted-foreground">
                  We build custom full-stack acquisition systems — organic capture, LSA,
                  Google Search, and Facebook cold campaigns — from{" "}
                  <span className="text-primary font-semibold">$2,500/month.</span>
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-foreground/80 text-sm font-bold hover:bg-muted transition-colors whitespace-nowrap"
              >
                Book a strategy call
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="max-w-md mx-auto mt-10 text-center">
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-5" />
              <p className="text-xs text-muted-foreground/60 leading-relaxed">
                Tiers 1 and 2 are organic capture systems. We convert the traffic and inbound
                leads you already have — not cold audiences. Tier 3 adds paid channels on top
                of a working capture foundation.
              </p>
            </div>
          </div>
        </section>
      </Layout>

      <Dialog
        open={!!checkoutPriceId}
        onOpenChange={(open) => {
          if (!open) {
            setCheckoutPriceId(null);
            setLoadingId(null);
          }
        }}
      >
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Complete your subscription</DialogTitle>
          </DialogHeader>
          {checkoutPriceId && <StripeEmbeddedCheckout priceId={checkoutPriceId} />}
        </DialogContent>
      </Dialog>
    </>
  );
}
