import { Search, Wrench, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Audit & Strategy",
    description: "We analyze your current marketing, identify gaps, and map out a custom growth plan tailored to your goals.",
    details: ["Website audit", "SEO analysis", "Competitor research", "Growth roadmap"],
  },
  {
    icon: Wrench,
    step: "02",
    title: "Build The System",
    description: "We build your complete acquisition system: high-converting website, tracking, automations, and integrations.",
    details: ["Custom website", "Lead tracking", "CRM integration", "Automation setup"],
  },
  {
    icon: Rocket,
    step: "03",
    title: "Launch & Scale",
    description: "We launch your campaigns, optimize based on real data, and scale what's working to maximize ROI.",
    details: ["SEO optimization", "Paid ads launch", "Performance tracking", "Continuous testing"],
  },
  {
    icon: TrendingUp,
    step: "04",
    title: "Optimize & Grow",
    description: "Ongoing optimization, reporting, and strategic adjustments to keep your growth trajectory climbing.",
    details: ["Monthly reporting", "A/B testing", "Strategy calls", "Growth insights"],
  },
];

export function ProcessSection() {
  return (
    <section className="py-20 lg:py-28 bg-card relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      <div className="relative section-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
            How It Works
          </span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
            Your Path to{" "}
            <span className="gradient-text">Predictable Growth</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            No guesswork. No complexity. Just a proven system that delivers results in 90 days or less.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {steps.map((item, index) => (
            <div
              key={index}
              className="relative p-6 lg:p-8 rounded-2xl border border-border bg-background hover:border-primary/30 transition-all group"
            >
              {/* Connector Line (Desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-px">
                  <div className="w-full h-px bg-gradient-to-r from-border via-primary/30 to-transparent" />
                </div>
              )}

              {/* Step Number */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-4xl font-display font-bold text-border group-hover:text-primary/30 transition-colors">
                  {item.step}
                </span>
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {item.description}
              </p>

              {/* Details */}
              <ul className="space-y-2">
                {item.details.map((detail, i) => (
                  <li
                    key={i}
                    className="text-sm text-foreground/70 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
