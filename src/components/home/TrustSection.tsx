import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Sarah Mitchell",
    business: "Premier Home Services",
    rating: 5,
    text: "OneofOne completely transformed our lead generation. We went from 10 calls/month to 40+ quality leads weekly. The website they built converts like crazy.",
    result: "+300% more leads",
  },
  {
    name: "Marcus Johnson",
    business: "Johnson Law Group",
    rating: 5,
    text: "The SEO work alone paid for itself in the first month. We're now ranking #1 for our main keywords and the phone hasn't stopped ringing.",
    result: "#1 Google rankings",
  },
  {
    name: "Emily Chen",
    business: "Luxe Beauty Studio",
    rating: 5,
    text: "Their Facebook ads system is incredible. We're getting bookings at half the cost we were paying before. Plus the AI receptionist handles all our missed calls.",
    result: "50% lower CPA",
  },
];

const industries = [
  "Home Services",
  "Legal",
  "Medical & Dental",
  "Real Estate",
  "Beauty & Wellness",
  "E-commerce",
  "Automotive",
  "Professional Services",
];

export function TrustSection() {
  return (
    <section className="py-20 lg:py-28 bg-card relative">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary/50 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-sm font-medium">4.9/5 Average Rating</span>
          </div>
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
            Trusted by <span className="gradient-text">100+ Businesses</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real results from real businesses. Here's what our clients have to say about working with OneofOne.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="service-card group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Quote className="w-8 h-8 text-primary/30 mb-4" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              
              {/* Text */}
              <p className="text-foreground/90 mb-4 leading-relaxed">"{review.text}"</p>
              
              {/* Result Badge */}
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                {review.result}
              </div>
              
              {/* Author */}
              <div className="pt-4 border-t border-border">
                <p className="font-semibold text-foreground">{review.name}</p>
                <p className="text-sm text-muted-foreground">{review.business}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Industries Served */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-6">Industries We Serve</p>
          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((industry, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full border border-border bg-secondary/30 text-sm text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
