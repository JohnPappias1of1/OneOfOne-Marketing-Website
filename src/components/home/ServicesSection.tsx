import { Link } from "react-router-dom";
import { 
  Globe, 
  Search, 
  Target, 
  Smartphone, 
  Bot, 
  ArrowRight,
  TrendingUp,
  Users,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Globe,
    title: "Conversion-Optimized Websites",
    description: "Custom websites engineered to convert visitors into leads. No templates—built for your business goals.",
    outcomes: [
      "2-3x higher conversion rates",
      "Mobile-first design",
      "Built-in tracking & analytics",
    ],
    href: "/services#websites",
  },
  {
    icon: Search,
    title: "Google SEO",
    description: "Dominate local and organic search results. Get found by customers actively looking for your services.",
    outcomes: [
      "Page 1 rankings in 90 days",
      "Local SEO optimization",
      "Ongoing content strategy",
    ],
    href: "/services#seo",
  },
  {
    icon: Target,
    title: "Facebook & Instagram Ads",
    description: "Profitable paid campaigns that scale. We handle strategy, creative, targeting, and optimization.",
    outcomes: [
      "Predictable lead flow",
      "Lower cost per acquisition",
      "Full-funnel tracking",
    ],
    href: "/services#ads",
  },
  {
    icon: Smartphone,
    title: "Lead Gen Mobile App",
    description: "Your own branded app to track leads, get instant notifications, and never miss an opportunity.",
    outcomes: [
      "Real-time lead alerts",
      "Pipeline management",
      "Team collaboration",
    ],
    href: "/services#app",
  },
  {
    icon: Bot,
    title: "AI Receptionist",
    description: "24/7 AI that answers calls, qualifies leads, and books appointments—even when you're sleeping.",
    outcomes: [
      "Never miss a call",
      "Automated qualification",
      "Instant appointment booking",
    ],
    href: "/services#ai",
  },
];

export function ServicesSection() {
  return (
    <section className="py-20 lg:py-28 relative">
      {/* Background accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -translate-y-1/2" />
      
      <div className="relative section-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
            Our Services
          </span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="gradient-text">Scale Your Business</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            We don't just build websites—we build complete customer acquisition systems that generate leads, book calls, and grow revenue.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <Link
              key={index}
              to={service.href}
              className="service-card group cursor-pointer"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-6 h-6 text-primary" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {service.description}
              </p>

              {/* Outcomes */}
              <ul className="space-y-2 mb-6">
                {service.outcomes.map((outcome, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                    <TrendingUp className="w-4 h-4 text-primary flex-shrink-0" />
                    {outcome}
                  </li>
                ))}
              </ul>

              {/* Link */}
              <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                Learn more <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/services">
            <Button className="btn-primary">
              View All Services
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
