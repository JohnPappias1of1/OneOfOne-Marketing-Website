import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Target, Users, Zap, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const values = [
  {
    icon: Target,
    title: "Results-Obsessed",
    description: "We measure everything and only celebrate when you hit your goals. Vanity metrics don't pay the bills.",
  },
  {
    icon: Zap,
    title: "Speed Matters",
    description: "Business moves fast. We launch quickly, iterate constantly, and never let perfect be the enemy of profitable.",
  },
  {
    icon: Users,
    title: "Partnership Mindset",
    description: "Your success is our success. We work alongside you, not just for you. Strategy calls, not just reports.",
  },
  {
    icon: Award,
    title: "Ownership Culture",
    description: "Everything we build belongs to you. No lock-in, no hostage situations. We earn your business every month.",
  },
];

const principles = [
  "Systems over tactics—we build machines, not one-off campaigns",
  "Data informs decisions—but we're not afraid to take calculated risks",
  "Simplicity wins—complexity is the enemy of execution",
  "Transparency always—no jargon, no BS, just honest conversations",
  "Long-term thinking—we optimize for relationships, not transactions",
];

export default function AboutPage() {
  return (
    <>
      <SEOHead
        title="About Us | The Team Behind Your Growth"
        description="Learn about OneofOne Marketing—our story, values, and the principles that guide how we build customer acquisition systems for businesses."
        canonical="/about"
      />
      <Layout>
        {/* Hero */}
        <section className="pt-32 pb-16 lg:pb-24 bg-gradient-hero relative">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="relative section-container">
            <div className="max-w-4xl">
              <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
                About Us
              </span>
              <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
                We Build Growth Systems,{" "}
                <span className="gradient-text">Not Just Marketing</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                OneofOne Marketing was founded on a simple belief: businesses don't need more marketing—they need a system that actually works.
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 lg:py-24">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <h2 className="font-display text-3xl lg:text-4xl font-bold mb-6">
                  Why We Exist
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    After years of watching businesses waste money on disconnected marketing tactics, we knew there had to be a better way.
                  </p>
                  <p>
                    Too many agencies sell websites that don't convert, run ads without proper tracking, or promise SEO results they can't deliver. Businesses end up with a collection of tools that don't work together—and no real growth to show for it.
                  </p>
                  <p>
                    OneofOne was built to fix that. We don't just offer services—we build complete customer acquisition systems where every piece works together to generate leads, book calls, and grow revenue.
                  </p>
                  <p className="text-foreground font-medium">
                    Our name says it all: every business is one of one. Cookie-cutter solutions don't cut it. We build custom systems that match your unique goals, audience, and growth stage.
                  </p>
                </div>
              </div>

              <div className="glass-card p-8">
                <h3 className="font-display text-xl font-bold mb-6">What We Believe</h3>
                <ul className="space-y-4">
                  {principles.map((principle, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/90">{principle}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 lg:py-24 bg-card">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
              <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
                Our <span className="gradient-text">Values</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                These aren't just words on a wall. They guide every decision we make and every system we build.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div key={index} className="service-card text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-bold mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Philosophy */}
        <section className="py-16 lg:py-24">
          <div className="section-container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl lg:text-4xl font-bold mb-6">
                How We <span className="gradient-text">Work</span>
              </h2>
              <div className="text-muted-foreground space-y-4 mb-8">
                <p>
                  Every engagement starts with understanding your business—not just your marketing. We dig into your customers, your competition, and your goals before we write a single line of code or launch a single ad.
                </p>
                <p>
                  From there, we build a system designed specifically for you. Not a template with your logo slapped on it. A real, custom-engineered growth machine.
                </p>
                <p>
                  We launch, we measure, we optimize. Monthly strategy calls keep us aligned. Real-time dashboards keep you informed. And we don't stop until you're hitting your targets.
                </p>
              </div>
              <Link to="/contact">
                <Button className="btn-primary">
                  Let's Talk About Your Business
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 lg:py-28 bg-gradient-hero relative">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="relative section-container text-center">
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-6">
              Ready to Work with a Team That{" "}
              <span className="gradient-text">Gets It?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              No sales pitch. Just an honest conversation about your goals and how we might help.
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
