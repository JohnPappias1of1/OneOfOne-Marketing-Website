import { ArrowRight, Phone, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function FinalCTASection() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />

      <div className="relative section-container">
        <div className="max-w-4xl mx-auto text-center">
          {/* Content */}
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Build Your{" "}
            <span className="gradient-text text-shadow-gold">Acquisition System?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Stop piecing together marketing tactics. Get a complete system that generates leads, books calls, and scales your business predictably.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link to="/contact">
              <Button className="btn-primary text-base group w-full sm:w-auto">
                <Calendar className="w-5 h-5 mr-2" />
                Book Your Free Strategy Call
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="tel:+1234567890">
              <Button variant="outline" className="btn-outline w-full sm:w-auto">
                <Phone className="w-4 h-4 mr-2" />
                Call (123) 456-7890
              </Button>
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <span>✓ No obligation</span>
            <span>✓ 30-minute call</span>
            <span>✓ Custom growth roadmap</span>
            <span>✓ $1,500+ value</span>
          </div>
        </div>
      </div>
    </section>
  );
}
