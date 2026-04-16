import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const caseStudies = [
  {
    id: 1,
    client: "Premier Home Services",
    industry: "Home Services",
    problem: "Low-quality leads from outdated website and no digital presence. Getting only 10-15 leads per month with poor close rates.",
    approach: "Complete website rebuild with conversion optimization, local SEO campaign, and Google Ads implementation. Added lead tracking and CRM integration.",
    outcomes: [
      { metric: "+312%", label: "Increase in leads" },
      { metric: "15 → 62", label: "Leads per month" },
      { metric: "42%", label: "Close rate improvement" },
      { metric: "$240K", label: "Additional revenue" },
    ],
    testimonial: "OneofOne completely transformed our lead generation. The website they built converts like crazy and we're now getting more calls than we can handle.",
    testimonialAuthor: "Mike Davidson, Owner",
    services: ["Website", "SEO", "Google Ads"],
    timeline: "6 months",
  },
  {
    id: 2,
    client: "Johnson Law Group",
    industry: "Legal",
    problem: "Losing market share to competitors with stronger digital presence. Spending $5K/month on ads with poor ROI and no organic traffic.",
    approach: "SEO-focused strategy with content creation, local optimization, and Google Business Profile management. Rebuilt website for conversions and optimized ad campaigns.",
    outcomes: [
      { metric: "#1", label: "Google ranking for 12+ keywords" },
      { metric: "+580%", label: "Organic traffic increase" },
      { metric: "47", label: "Consultation calls per week" },
      { metric: "-65%", label: "Cost per lead" },
    ],
    testimonial: "The SEO work alone paid for itself in the first month. We're now ranking #1 for our main keywords and the phone hasn't stopped ringing.",
    testimonialAuthor: "Sarah Johnson, Managing Partner",
    services: ["SEO", "Website", "PPC"],
    timeline: "8 months",
  },
  {
    id: 3,
    client: "Luxe Beauty Studio",
    industry: "Beauty & Wellness",
    problem: "Inconsistent bookings and high no-show rates. Spending money on social media with no clear ROI tracking.",
    approach: "Implemented Facebook/Instagram ad campaigns with booking integration. Added AI receptionist for after-hours calls and appointment reminders.",
    outcomes: [
      { metric: "-58%", label: "Lower CPA" },
      { metric: "3x", label: "More bookings" },
      { metric: "-72%", label: "No-show rate" },
      { metric: "24/7", label: "Lead response" },
    ],
    testimonial: "Their Facebook ads system is incredible. We're getting bookings at half the cost we were paying before. Plus the AI receptionist handles all our missed calls.",
    testimonialAuthor: "Emily Chen, Owner",
    services: ["Facebook Ads", "AI Receptionist"],
    timeline: "4 months",
  },
  {
    id: 4,
    client: "Elite HVAC Solutions",
    industry: "HVAC",
    problem: "Seasonal fluctuations in business. Heavy reliance on word-of-mouth with no predictable lead flow.",
    approach: "Year-round SEO and paid ads strategy. Built lead tracking mobile app for the sales team. Implemented 24/7 AI answering service.",
    outcomes: [
      { metric: "+420%", label: "Increase in leads" },
      { metric: "$1.2M", label: "Revenue generated" },
      { metric: "100%", label: "Call answer rate" },
      { metric: "<5 min", label: "Lead response time" },
    ],
    testimonial: "We used to have slow seasons. Now we're busy year-round. The mobile app helps our team stay on top of every lead.",
    testimonialAuthor: "James Martinez, CEO",
    services: ["SEO", "PPC", "Mobile App", "AI Receptionist"],
    timeline: "12 months",
  },
  {
    id: 5,
    client: "Coastal Dental Care",
    industry: "Dental",
    problem: "New practice struggling to fill schedule. No online presence and competing against established practices with big budgets.",
    approach: "Local SEO dominance strategy, patient-focused website, targeted Facebook ads, and automated appointment booking.",
    outcomes: [
      { metric: "0 → 200+", label: "New patients" },
      { metric: "85%", label: "Schedule utilization" },
      { metric: "$89", label: "Cost per new patient" },
      { metric: "4.9★", label: "Google rating" },
    ],
    testimonial: "From zero to a full schedule in 6 months. OneofOne understood exactly what a new dental practice needed to grow.",
    testimonialAuthor: "Dr. Amanda Rodriguez",
    services: ["SEO", "Website", "Facebook Ads"],
    timeline: "6 months",
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <SEOHead
        title="Case Studies | Real Results for Real Businesses"
        description="See how OneOfOneSystems LLC has helped businesses increase leads, book more calls, and grow revenue with our proven marketing systems."
        canonical="/case-studies"
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
              Real Results for{" "}
              <span className="gradient-text">Real Businesses</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. See exactly how we've helped businesses like yours grow with our proven marketing systems.
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
                    {study.services.map((service, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-xs border border-border bg-secondary/50 text-muted-foreground"
                      >
                        {service}
                      </span>
                    ))}
                  </div>

                  <h2 className="font-display text-2xl lg:text-3xl font-bold mb-4">
                    {study.client}
                  </h2>

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

                  {/* Testimonial */}
                  <div className="p-6 rounded-2xl border border-border bg-card">
                    <Quote className="w-8 h-8 text-primary/30 mb-3" />
                    <p className="text-foreground/90 italic mb-4">"{study.testimonial}"</p>
                    <p className="text-sm font-medium text-primary">{study.testimonialAuthor}</p>
                  </div>
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
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 lg:py-28 bg-card">
          <div className="section-container text-center">
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-6">
              Ready to Be Our Next{" "}
              <span className="gradient-text">Success Story?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Let's discuss how we can achieve similar results for your business.
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
