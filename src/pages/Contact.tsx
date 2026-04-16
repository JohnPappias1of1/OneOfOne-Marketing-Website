import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import { Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "Johnp@oneofonesystems.com",
    href: "mailto:Johnp@oneofonesystems.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Dallas, TX United States",
    href: null,
  },
];

const benefits = [
  "Free 30-minute strategy call",
  "Complete website & SEO audit",
  "Custom 90-day growth roadmap",
  "No obligation or commitment",
];

export default function ContactPage() {
  return (
    <>
      <SEOHead
        title="Contact Us | Book a Free Strategy Call"
        description="Ready to grow your business? Book a free strategy call with OneOfOneSystems LLC. Get a website audit, SEO analysis, and custom growth roadmap."
        canonical="/contact"
      />
      <Layout>
        {/* Hero */}
        <section className="pt-32 pb-8 lg:pb-12 bg-gradient-hero relative">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="relative section-container text-center">
            <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
              Get In Touch
            </span>
            <h1 className="font-display text-4xl lg:text-5xl font-bold mb-6 max-w-3xl mx-auto">
              Let's Build Your{" "}
              <span className="gradient-text">Growth System</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Fill out the form below and we'll reach out within 24 hours to schedule your free strategy call.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 lg:py-20">
          <div className="section-container">
            <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
              {/* Form */}
              <div className="lg:col-span-2">
                <div className="glass-card p-6 lg:p-8">
                  <h2 className="font-display text-2xl font-bold mb-6">
                    Book Your Free Strategy Call
                  </h2>
                  <LeadCaptureForm variant="full" />
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* What You Get */}
                <div className="glass-card p-6">
                  <h3 className="font-display font-semibold text-lg mb-4">
                    What You'll Get
                  </h3>
                  <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground/90">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact Info */}
                <div className="glass-card p-6">
                  <h3 className="font-display font-semibold text-lg mb-4">
                    Contact Information
                  </h3>
                  <ul className="space-y-4">
                    {contactInfo.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{item.label}</p>
                          {item.href ? (
                            <a
                              href={item.href}
                              className="font-medium text-foreground hover:text-primary transition-colors"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="font-medium text-foreground">{item.value}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick Note */}
                <div className="p-6 rounded-2xl border border-primary/30 bg-primary/5">
                  <p className="text-sm text-foreground/90">
                    <strong>Quick Note:</strong> We only work with businesses we're confident we can help. If we don't think we're the right fit, we'll tell you honestly and point you in the right direction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Calendar Embed */}
        <section className="py-12 lg:py-20 bg-card">
          <div className="section-container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-display text-2xl lg:text-3xl font-bold mb-4">
                Prefer to Book Directly?
              </h2>
              <p className="text-muted-foreground mb-8">
                Skip the form and pick a time that works for you.
              </p>
              
              {/* Calendly Inline Embed */}
              <div className="glass-card p-4 lg:p-8">
                <div 
                  className="calendly-inline-widget" 
                  data-url="https://calendly.com/john-oneofonemarketing/30min"
                  style={{ minWidth: '320px', height: '700px' }}
                />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
