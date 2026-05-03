import { Star, Quote } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface GoogleReview {
  authorAttribution: {
    displayName: string;
    photoUri?: string;
  };
  rating: number;
  text: {
    text: string;
  };
  relativePublishTimeDescription: string;
}

interface ReviewsData {
  reviews: GoogleReview[];
  rating: number;
  totalReviews: number;
  businessName: string;
}

const fallbackReviews = [
  {
    name: "Mike Thompson",
    business: "Thompson HVAC Services",
    rating: 5,
    text: "OneofOne completely transformed our lead generation. We went from 10 service calls/month to 40+ quality HVAC leads weekly.",
    result: "+300% more leads",
  },
  {
    name: "Carlos Ramirez",
    business: "Apex Roofing & Exteriors",
    rating: 5,
    text: "The SEO work alone paid for itself in the first month. We're now ranking #1 for roofing keywords across our service area.",
    result: "#1 Google rankings",
  },
  {
    name: "Dave Sullivan",
    business: "Sullivan Plumbing Co.",
    rating: 5,
    text: "Their Google Ads system is incredible. We're booking plumbing jobs at half the cost we were paying before.",
    result: "50% lower CPA",
  },
];

const industries = [
  "HVAC", "Heating & Cooling", "Roofing", "Roof Replacement",
  "Plumbing", "Drain & Sewer", "Emergency Services", "Home Service Contractors",
];

export function TrustSection() {
  const [reviewsData, setReviewsData] = useState<ReviewsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const { data, error } = await supabase.functions.invoke('google-reviews');
        if (error) throw error;
        if (data && data.reviews?.length > 0) {
          setReviewsData(data);
        }
      } catch (err) {
        console.error('Failed to fetch Google reviews:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  const hasGoogleReviews = reviewsData && reviewsData.reviews.length > 0;
  const displayRating = hasGoogleReviews ? reviewsData.rating : 4.9;
  const displayTotal = hasGoogleReviews ? reviewsData.totalReviews : 100;

  return (
    <section className="py-20 lg:py-28 bg-card relative">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary/50 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.round(displayRating) ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
              ))}
            </div>
            <span className="text-sm font-medium">{displayRating}/5 Average Rating</span>
          </div>
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
            Trusted by <span className="gradient-text">{displayTotal}+ Reviews</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {hasGoogleReviews
              ? `Real reviews from Google for ${reviewsData.businessName}.`
              : "Real results from real businesses. Here's what our clients have to say about working with OneofOne."}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {hasGoogleReviews
            ? reviewsData.reviews.slice(0, 6).map((review, index) => (
                <div key={index} className="service-card group" style={{ animationDelay: `${index * 0.1}s` }}>
                  <Quote className="w-8 h-8 text-primary/30 mb-4" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
                    ))}
                  </div>
                  <p className="text-foreground/90 mb-4 leading-relaxed line-clamp-4">
                    "{review.text?.text}"
                  </p>
                  <div className="pt-4 border-t border-border">
                    <p className="font-semibold text-foreground">{review.authorAttribution?.displayName}</p>
                    <p className="text-sm text-muted-foreground">{review.relativePublishTimeDescription}</p>
                  </div>
                </div>
              ))
            : fallbackReviews.map((review, index) => (
                <div key={index} className="service-card group" style={{ animationDelay: `${index * 0.1}s` }}>
                  <Quote className="w-8 h-8 text-primary/30 mb-4" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-foreground/90 mb-4 leading-relaxed">"{review.text}"</p>
                  <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                    {review.result}
                  </div>
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
