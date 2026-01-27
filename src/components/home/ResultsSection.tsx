import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, DollarSign, Phone, Users, Target, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const results = [
  {
    metric: "+312%",
    label: "Increase in Leads",
    description: "Home services company went from 15 to 62 leads/month",
    icon: TrendingUp,
  },
  {
    metric: "$2.4M",
    label: "Revenue Generated",
    description: "E-commerce brand scaled from $200K to $2.4M in 12 months",
    icon: DollarSign,
  },
  {
    metric: "47",
    label: "Booked Calls/Week",
    description: "Law firm now averages 47 consultation calls weekly",
    icon: Phone,
  },
  {
    metric: "-58%",
    label: "Lower CPA",
    description: "Dental practice cut cost per acquisition by more than half",
    icon: Target,
  },
  {
    metric: "#1",
    label: "Google Rankings",
    description: "HVAC company ranks #1 for 12+ high-intent keywords",
    icon: Users,
  },
  {
    metric: "24/7",
    label: "Lead Response",
    description: "AI receptionist handles calls and books appointments around the clock",
    icon: Clock,
  },
];

export function ResultsSection() {
  return (
    <section className="py-20 lg:py-28 relative">
      {/* Background accent */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -translate-y-1/2" />
      
      <div className="relative section-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
            Real Results
          </span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
            Numbers That{" "}
            <span className="gradient-text">Speak for Themselves</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            We don't just promise results—we deliver them. Here's a snapshot of what we've achieved for our clients.
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {results.map((result, index) => (
            <div
              key={index}
              className="stat-card group hover:border-primary/30 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <result.icon className="w-8 h-8 text-primary/50" />
                <span className="font-display text-3xl lg:text-4xl font-bold gradient-text">
                  {result.metric}
                </span>
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{result.label}</h3>
              <p className="text-sm text-muted-foreground">{result.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/case-studies">
            <Button className="btn-primary">
              View Full Case Studies
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
