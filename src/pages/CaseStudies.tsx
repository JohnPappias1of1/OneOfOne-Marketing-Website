import { Layout } from "@/components/layout/Layout";
import { SEOHead, generateCollectionPageSchema } from "@/components/seo/SEOHead";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Quote, MapPin, Calendar, Info, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getVideoEmbedUrl } from "@/lib/loom";

type CaseStudy = {
  id: number;
  client: string;
  anonymized?: boolean;
  industry: string;
  location: string;
  period: string;
  problem: string;
  approach: string;
  outcomes: { metric: string; label: string }[];
  honestNote?: string;
  testimonial?: string;
  testimonialAuthor?: string;
  /** Video testimonial URL (Loom, YouTube, or Vimeo). Rendered as an embedded player. */
  videoUrl?: string;
  videoAuthor?: string;
  services: string[];
  timeline: string;
};

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    client: "Apex Gutters & Powerwash",
    industry: "Gutters / Exterior Cleaning",
    location: "Middle Island, Long Island, NY",
    period: "Active engagement — started 2025",
    problem:
      "Strong word-of-mouth business with no real digital front door. Quotes were getting lost in text threads, missed calls were going un-followed-up, spam inquiries were eating time, and there was no way to track which marketing dollars were actually producing jobs.",
    approach:
      "Deployed the full capture system: a conversion-focused website with instant quote request, a live chat widget that grabs leads while the crew is on a job, and a lead capture form wired into GoHighLevel with SMS + email follow-up. Missed-call auto text-back fires in under 60 seconds so no inbound call goes cold, automated Google review requests go out after every completed job, and spam filtering keeps junk leads out of the pipeline. Currently layering in local search visibility.",
    outcomes: [
      { metric: "+$30K", label: "Added revenue in first 2–3 months" },
      { metric: "<2 min", label: "Avg. lead response time" },
      { metric: "100%", label: "Inbound calls captured" },
      { metric: "1 hub", label: "All leads in one CRM" },
      { metric: "Live", label: "Site + automations shipped" },
    ],
    honestNote:
      "This is an active build — we're 90 days in. Lead capture, text-back, and review automation are live; SEO and review volume are still ramping. Happy to walk through the actual GHL dashboard on a call.",
    services: [
      "Website",
      "Chat Widget",
      "Missed-Call Text-Back",
      "Google Review Automation",
      "Spam Filtering",
    ],
    timeline: "Ongoing",
  },
  {
    id: 2,
    client: "Legacy Climate Systems",
    industry: "HVAC",
    location: "Plano, TX",
    period: "2024 engagement",
    problem:
      "Outdated site, almost no inbound from Google, and a sales process that depended on the owner answering his cell phone. Roughly 10–15 service calls per month and no clear picture of where leads were coming from.",
    approach:
      "Rebuilt the site around a single conversion goal (book a service call), launched Google Business Profile optimization and a small Local Services Ads budget, and added call tracking so every lead source was attributed.",
    outcomes: [
      { metric: "3–4x", label: "Service calls per month" },
      { metric: "~40%", label: "Close rate (up from ~25%)" },
      { metric: "Top 3", label: "Map pack for core terms" },
    ],
    honestNote:
      "Took about 60 days before SEO contributed meaningfully — paid traffic carried the first month.",
    services: ["Website", "Local SEO", "Google LSA"],
    timeline: "~6 months",
  },
  {
    id: 3,
    client: "Roofing contractor (Northeast)",
    anonymized: true,
    industry: "Roofing",
    location: "Suffolk County, NY",
    period: "2024 engagement",
    problem:
      "Spending ~$5K/month on Google Ads with no tracking, no landing page, and leads going to a generic contact form that nobody followed up on quickly enough.",
    approach:
      "Built a dedicated roof inspection landing page, restructured the ad account around high-intent terms only, and implemented an SMS-first follow-up so leads got a text within minutes of submitting.",
    outcomes: [
      { metric: "~50%", label: "Lower cost per lead" },
      { metric: "+3x", label: "Booked inspections / week" },
      { metric: "<5 min", label: "Lead response time" },
    ],
    honestNote:
      "First two weeks of the new ad structure actually dipped before recovering — that's normal for a Google Ads rebuild. We were transparent with the client about the learning period.",
    services: ["Landing Page", "Google Ads", "SMS Automation"],
    timeline: "~4 months",
  },
  {
    id: 4,
    client: "Plumbing company (TX)",
    anonymized: true,
    industry: "Plumbing",
    location: "Dallas–Fort Worth, TX",
    period: "2024 engagement",
    problem:
      "Inconsistent bookings and a high after-hours missed-call rate. Emergency plumbing jobs were going to whoever picked up first.",
    approach:
      "Deployed a missed-call-text-back system, set up an AI receptionist for after-hours triage, and integrated everything with their existing scheduling tool so booked jobs flowed straight to the calendar.",
    outcomes: [
      { metric: "~70%", label: "Drop in missed-call losses" },
      { metric: "24/7", label: "After-hours coverage" },
      { metric: "Same week", label: "Setup → live" },
    ],
    honestNote:
      "AI receptionist needed two rounds of script tuning before it sounded right. We don't pretend that part is plug-and-play.",
    services: ["AI Receptionist", "Missed-Call Text-Back", "GHL"],
    timeline: "~3 months",
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <SEOHead
        title="Case Studies | Real Client Work"
        description="Real engagements, real numbers, and the honest context behind them. See how OneofOne builds lead systems for service businesses."
        canonical="/case-studies"
        schema={generateCollectionPageSchema(
          "Case Studies",
          "Real client engagements with outcomes, approach, and honest context.",
          "https://www.oneofonemarketing.com/case-studies",
          caseStudies.map((c) => ({
            name: `${c.client} — ${c.industry}`,
            description: c.problem,
          }))
        )}
      />
      <Layout>
        {/* Hero */}
        <section className="pt-32 pb-16 lg:pb-24 bg-gradient-hero relative">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="relative section-container text-center">
            <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
              Case Studies
            </span>
            <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 max-w-4xl mx-auto">
              Real Client Work,{" "}
              <span className="gradient-text">Honest Numbers</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              No inflated metrics, no fictional "Mike the contractor." Active engagements with the context behind them — most clients prefer to stay anonymous, so names are kept private unless they've given the green light.
            </p>
          </div>
        </section>

        {/* Disclosure bar */}
        <section className="border-y border-border bg-card/40">
          <div className="section-container py-4 flex items-start gap-3 text-sm text-muted-foreground">
            <Info className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <p>
              Anonymized studies use the client's actual industry, region, and metrics — only the business name is withheld. We're happy to walk through any engagement live on a call (with the client's permission).
            </p>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-16 lg:py-24">
          <div className="section-container space-y-24">
            {caseStudies.map((study, index) => (
              <div
                key={study.id}
                className={`grid lg:grid-cols-2 gap-12 items-start ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium border border-primary/30 bg-primary/10 text-primary">
                      {study.industry}
                    </span>
                    {study.anonymized && (
                      <span className="px-3 py-1 rounded-full text-xs border border-border bg-secondary/50 text-muted-foreground">
                        Name withheld
                      </span>
                    )}
                    {study.services.map((service, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-xs border border-border bg-secondary/50 text-muted-foreground"
                      >
                        {service}
                      </span>
                    ))}
                  </div>

                  <h2 className="font-display text-2xl lg:text-3xl font-bold mb-3">
                    {study.client}
                  </h2>

                  <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground mb-6">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" /> {study.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" /> {study.period}
                    </span>
                  </div>

                  {/* Problem */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-foreground mb-2">The Problem</h3>
                    <p className="text-muted-foreground">{study.problem}</p>
                  </div>

                  {/* Approach */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-foreground mb-2">Our Approach</h3>
                    <p className="text-muted-foreground">{study.approach}</p>
                  </div>

                  {/* Honest note */}
                  {study.honestNote && (
                    <div className="p-5 rounded-xl border border-primary/20 bg-primary/5 mb-6">
                      <h4 className="text-sm font-semibold text-primary mb-1.5 uppercase tracking-wide">
                        Straight talk
                      </h4>
                      <p className="text-sm text-foreground/80">{study.honestNote}</p>
                    </div>
                  )}

                  {/* Video testimonial */}
                  {study.videoUrl && getVideoEmbedUrl(study.videoUrl) && (
                    <div className="p-6 rounded-2xl border border-primary/20 bg-card mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <PlayCircle className="w-5 h-5 text-primary" />
                        <h4 className="font-display font-semibold">
                          Video Testimonial{study.videoAuthor ? ` — ${study.videoAuthor}` : ""}
                        </h4>
                      </div>
                      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border">
                        <iframe
                          src={getVideoEmbedUrl(study.videoUrl)!}
                          title={`Video testimonial — ${study.client}`}
                          className="absolute inset-0 w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  )}

                  {/* Testimonial */}
                  {study.testimonial && (
                    <div className="p-6 rounded-2xl border border-border bg-card">
                      <Quote className="w-8 h-8 text-primary/30 mb-3" />
                      <p className="text-foreground/90 italic mb-4">"{study.testimonial}"</p>
                      {study.testimonialAuthor && (
                        <p className="text-sm font-medium text-primary">{study.testimonialAuthor}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Results Card */}
                <div className={`glass-card p-6 lg:p-8 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="w-6 h-6 text-primary" />
                    <h3 className="font-display font-semibold text-lg">Results</h3>
                    <span className="text-sm text-muted-foreground ml-auto">{study.timeline}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {study.outcomes.map((outcome, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl border border-border bg-background/50 text-center"
                      >
                        <span className="block text-2xl lg:text-3xl font-display font-bold gradient-text mb-1">
                          {outcome.metric}
                        </span>
                        <span className="text-sm text-muted-foreground">{outcome.label}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-muted-foreground mt-6 text-center">
                    Metrics pulled from the client's CRM / ad accounts. Available for review on a call.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Solo Operator tie-in */}
        <section className="pb-8">
          <div className="section-container">
            <div className="glass-card p-8 max-w-3xl mx-auto text-center">
              <p className="text-primary text-sm font-semibold tracking-wider uppercase mb-3">
                The system behind the results
              </p>
              <h3 className="font-display text-2xl font-bold mb-4">
                Every engagement above runs on our{" "}
                <span className="gradient-text">Solo Operator</span> capture layer
              </h3>
              <p className="text-muted-foreground mb-6">
                Conversion website, live chat widget, missed-call auto text-back, automated Google review
                requests, spam filtering, and every lead in one app. The same system we install in week one.
              </p>
              <Link to="/pricing">
                <Button variant="outline" className="btn-primary">
                  See the Solo Operator Package
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 lg:py-28 bg-card">
          <div className="section-container text-center">
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-6">
              Want to see the actual{" "}
              <span className="gradient-text">dashboards?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Book a call and we'll walk through a live client account — leads, response times, the whole pipeline.
            </p>
            <Link to="/contact">
              <Button className="btn-primary text-base">
                Book Your Free Strategy Call
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </Layout>
    </>
  );
}
