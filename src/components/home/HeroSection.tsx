import { Link } from "react-router-dom";
import { ArrowRight, Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";

const benefits = [
  "Conversion-optimized websites that actually book calls",
  "SEO systems that generate leads on autopilot",
  "Paid ads that deliver predictable ROI",
  "AI automation that works 24/7",
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen pt-20 overflow-hidden bg-gradient-hero">
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-[100px]" />

      <div className="relative section-container py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 animate-fade-in-up">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-sm font-medium text-foreground">5.0 on Google</span>
              <span className="text-sm text-muted-foreground">• 50+ Reviews</span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
                More Leads.{" "}
                <span className="gradient-text text-shadow-gold">More Booked Calls.</span>{" "}
                Built Through a Real Acquisition System.
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-xl">
                We build complete customer-acquisition systems: high-converting websites + SEO + paid ads + AI automation. Stop piecing it together—get results.
              </p>
            </div>

            {/* Benefits */}
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-foreground/90"
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                >
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button className="btn-primary group">
                  Book a Free Strategy Call
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/case-studies">
                <Button variant="outline" className="btn-outline">
                  See Our Results
                </Button>
              </Link>
            </div>

            {/* Mini Trust */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                100+ Businesses Scaled
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                $10M+ Revenue Generated
              </span>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:pl-8">
            <div className="glass-card p-6 lg:p-8 glow-gold animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="text-center mb-6">
                <h2 className="font-display text-xl font-bold mb-2">Get Your Free Growth Audit</h2>
                <p className="text-sm text-muted-foreground">
                  See exactly what's holding your business back + a 90-day roadmap to fix it.
                </p>
              </div>
              <LeadCaptureForm
                variant="compact"
                webhookUrl="https://services.leadconnectorhq.com/hooks/iHzub8lZ7JkGC1SLf02S/webhook-trigger/1c37eaed-f9ad-473d-a94d-2bd94b5b5058"
                source="website-home-hero"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
