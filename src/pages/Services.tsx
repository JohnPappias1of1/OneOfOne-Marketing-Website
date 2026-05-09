import { Layout } from "@/components/layout/Layout";
import { SEOHead, generateServiceSchema } from "@/components/seo/SEOHead";
import { Link } from "react-router-dom";
import { 
  Globe, 
  Search, 
  Target, 
  Smartphone, 
  Bot, 
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    id: "websites",
    icon: Globe,
    title: "Conversion-Optimized Websites",
    subtitle: "Websites That Actually Convert",
    description: "Custom-built websites engineered to turn visitors into leads and customers. No templates—every design is crafted for your specific business goals and audience.",
    whoFor: ["Service-based businesses", "E-commerce brands", "Local businesses", "Professional services"],
    included: [
      "Custom design & development",
      "Mobile-first responsive design",
      "Conversion-optimized layouts",
      "Lead capture forms & CTAs",
      "Speed optimization",
      "Analytics & tracking setup",
      "CRM integration",
      "Ongoing maintenance",
    ],
    timeline: "7-9 days",
    outcomes: ["2-3x higher conversion rates", "Faster load times", "Mobile traffic capture", "Clear user journeys"],
  },
  {
    id: "seo",
    icon: Search,
    title: "Google SEO",
    subtitle: "Dominate Search Results",
    description: "Comprehensive SEO strategy to get your business found by customers actively searching for your services. Local and national rankings that drive qualified traffic.",
    whoFor: ["Local service businesses", "Multi-location companies", "E-commerce stores", "B2B companies"],
    included: [
      "Technical SEO audit & fixes",
      "Keyword research & strategy",
      "On-page optimization",
      "Local SEO & Google Business",
      "Content strategy & creation",
      "Link building",
      "Monthly reporting",
      "Competitor monitoring",
    ],
    timeline: "Ongoing (3-6 months for results)",
    outcomes: ["Page 1 Google rankings", "Increased organic traffic", "More qualified leads", "Long-term ROI"],
  },
  {
    id: "ads",
    icon: Target,
    title: "Facebook & Instagram Ads",
    subtitle: "Profitable Paid Campaigns",
    description: "Strategic paid social campaigns that generate leads at scale. We handle everything from strategy to creative to optimization—you just get the results.",
    whoFor: ["DTC/E-commerce brands", "Local service businesses", "B2C companies", "Appointment-based businesses"],
    included: [
      "Campaign strategy & planning",
      "Audience research & targeting",
      "Ad creative & copy",
      "Landing page optimization",
      "Pixel & conversion setup",
      "A/B testing",
      "Daily monitoring & optimization",
      "Weekly performance reports",
    ],
    timeline: "Ongoing (results in 2-4 weeks)",
    outcomes: ["Predictable lead flow", "Lower cost per acquisition", "Scalable growth", "Full-funnel tracking"],
  },
  {
    id: "app",
    icon: Smartphone,
    title: "Lead Gen Mobile App",
    subtitle: "Never Miss a Lead",
    description: "Your own branded mobile app to track leads, get instant notifications, manage your pipeline, and stay connected with your team—all from your phone.",
    whoFor: ["Sales teams", "Service businesses", "Agencies", "Multi-location businesses"],
    included: [
      "Custom branded app",
      "Real-time lead notifications",
      "Pipeline management",
      "Lead details & history",
      "Team collaboration",
      "Call & text from app",
      "Performance dashboards",
      "CRM sync",
    ],
    timeline: "2-3 weeks",
    outcomes: ["Instant lead response", "Better follow-up rates", "Team accountability", "Mobile productivity"],
  },
  {
    id: "ai",
    icon: Bot,
    title: "AI Receptionist",
    subtitle: "24/7 Lead Capture",
    description: "AI-powered phone system that answers calls, qualifies leads, and books appointments around the clock. Never miss an opportunity—even at 3 AM.",
    whoFor: ["Service businesses", "Medical/Dental practices", "Law firms", "Any business with phone leads"],
    included: [
      "Custom AI voice agent",
      "24/7 call answering",
      "Lead qualification scripting",
      "Appointment scheduling",
      "Call routing & transfers",
      "SMS follow-up",
      "CRM integration",
      "Call recordings & transcripts",
    ],
    timeline: "1-2 weeks",
    outcomes: ["100% call answer rate", "Automated qualification", "More booked appointments", "Time savings"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <SEOHead
        title="Digital Marketing Services | Web Design, SEO, Ads & AI"
        description="Explore our full suite of marketing services: conversion-optimized websites, Google SEO, Facebook ads, lead gen mobile app, and AI receptionist."
        canonical="/services"
        schema={generateServiceSchema(
          "Digital Marketing Services",
          "Complete marketing services including web design, SEO, paid advertising, and AI automation.",
          "https://www.oneofonemarketing.com/services"
        )}
      />
      <Layout>
        {/* Hero */}
        <section className="pt-32 pb-16 lg:pb-24 bg-gradient-hero relative">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="relative section-container text-center">
            <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
              Our Services
            </span>
            <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 max-w-4xl mx-auto">
              Everything You Need to{" "}
              <span className="gradient-text">Acquire Customers</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              We don't just offer services—we build complete acquisition systems that work together to generate leads and grow revenue.
            </p>
            <Link to="/contact">
              <Button className="btn-primary">
                Book a Free Strategy Call
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Services Detail */}
        {services.map((service, index) => (
          <section
            key={service.id}
            id={service.id}
            className={`py-20 lg:py-28 ${index % 2 === 0 ? "bg-background" : "bg-card"}`}
          >
            <div className="section-container">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                {/* Content */}
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <service.icon className="w-7 h-7 text-primary" />
                    </div>
                    <span className="text-sm text-primary font-medium">{service.subtitle}</span>
                  </div>

                  <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    {service.description}
                  </p>

                  {/* Who It's For */}
                  <div className="mb-8">
                    <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      Who It's For
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {service.whoFor.map((item, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full text-sm border border-border bg-secondary/50"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-secondary/30 mb-8">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <span className="text-sm text-muted-foreground">Timeline: </span>
                      <span className="font-medium">{service.timeline}</span>
                    </div>
                  </div>

                  <Link to="/contact">
                    <Button className="btn-primary">
                      Get Started with {service.title.split(" ")[0]}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>

                {/* Features Card */}
                <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  {/* What's Included */}
                  <div className="glass-card p-6 lg:p-8">
                    <h3 className="font-display font-semibold text-lg mb-6">What's Included</h3>
                    <ul className="space-y-3">
                      {service.included.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-foreground/90">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Expected Outcomes */}
                  <div className="p-6 rounded-2xl border border-primary/30 bg-primary/5">
                    <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Expected Outcomes
                    </h3>
                    <ul className="space-y-2">
                      {service.outcomes.map((outcome, i) => (
                        <li key={i} className="flex items-center gap-2 text-foreground/90">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Final CTA */}
        <section className="py-20 lg:py-28 bg-gradient-hero relative">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="relative section-container text-center">
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-6">
              Ready to Build Your{" "}
              <span className="gradient-text">Growth System?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Let's discuss which services make sense for your business and goals.
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
