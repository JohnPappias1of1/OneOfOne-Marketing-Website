import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight, Clock, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

const included = [
  "Complete website & SEO audit",
  "Competitor analysis",
  "90-day growth roadmap",
  "Custom strategy recommendations",
  "ROI projection",
  "No obligation—completely free",
];

export function OfferSection() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-radial opacity-50" />
      
      <div className="relative section-container">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8 lg:p-12 glow-gold relative overflow-hidden">
            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2" />
            
            <div className="relative">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-6">
                <Gift className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Limited Availability</span>
              </div>

              {/* Content */}
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div>
                  <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
                    Get Your Free{" "}
                    <span className="gradient-text">Growth Audit</span>
                  </h2>
                  <p className="text-muted-foreground text-lg mb-6">
                    See exactly what's holding your business back and get a custom 90-day roadmap to fix it. No fluff, no sales pitch—just actionable insights.
                  </p>

                  {/* What's Included */}
                  <ul className="space-y-3 mb-8">
                    {included.map((item, index) => (
                      <li key={index} className="flex items-center gap-3 text-foreground/90">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link to="/contact">
                    <Button className="btn-primary text-base group">
                      Claim Your Free Audit
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>

                {/* Right side - urgency/stats */}
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl border border-border bg-background/50">
                    <div className="flex items-center gap-3 mb-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <span className="font-semibold">Limited Spots Available</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      We only take on 5 new clients per month to ensure every business gets the attention they deserve.
                    </p>
                    <div className="flex items-center gap-4">
                      <div>
                        <span className="text-3xl font-display font-bold gradient-text">3</span>
                        <span className="text-muted-foreground text-sm ml-2">spots left</span>
                      </div>
                      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="w-3/5 h-full bg-primary rounded-full" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 rounded-xl border border-border bg-background/50">
                      <span className="block text-2xl font-display font-bold gradient-text">100+</span>
                      <span className="text-sm text-muted-foreground">Audits Delivered</span>
                    </div>
                    <div className="text-center p-4 rounded-xl border border-border bg-background/50">
                      <span className="block text-2xl font-display font-bold gradient-text">92%</span>
                      <span className="text-sm text-muted-foreground">Book a Call</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
