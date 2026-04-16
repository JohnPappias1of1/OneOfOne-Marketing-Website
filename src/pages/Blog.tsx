import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

// Placeholder blog posts
const posts = [
  {
    id: 1,
    title: "How to Build a Lead Generation Website That Actually Converts",
    excerpt: "Most business websites look pretty but don't generate leads. Here's how to build one that does both.",
    category: "Web Design",
    date: "Coming Soon",
    slug: "#",
  },
  {
    id: 2,
    title: "Local SEO in 2024: The Complete Guide for Service Businesses",
    excerpt: "Everything you need to know about ranking in Google Maps and local search results.",
    category: "SEO",
    date: "Coming Soon",
    slug: "#",
  },
  {
    id: 3,
    title: "Facebook Ads for Local Businesses: A Proven Strategy",
    excerpt: "How to run profitable Facebook ad campaigns that generate calls and appointments.",
    category: "Paid Ads",
    date: "Coming Soon",
    slug: "#",
  },
];

export default function BlogPage() {
  return (
    <>
      <SEOHead
        title="Blog | Marketing Insights & Growth Strategies"
        description="Learn proven marketing strategies, SEO tips, and growth tactics from the OneOfOneSystems LLC team. Actionable insights for service businesses and DTC brands."
        canonical="/blog"
      />
      <Layout>
        {/* Hero */}
        <section className="pt-32 pb-16 lg:pb-24 bg-gradient-hero relative">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="relative section-container text-center">
            <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
              Blog
            </span>
            <h1 className="font-display text-4xl lg:text-5xl font-bold mb-6 max-w-3xl mx-auto">
              Marketing Insights &{" "}
              <span className="gradient-text">Growth Strategies</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Actionable insights, proven strategies, and no-fluff advice from our team.
            </p>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-16 lg:py-24">
          <div className="section-container">
            <div className="max-w-4xl mx-auto">
              {/* Coming Soon Message */}
              <div className="glass-card p-8 lg:p-12 text-center mb-12">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
                <h2 className="font-display text-2xl font-bold mb-4">
                  Blog Coming Soon
                </h2>
                <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                  We're working on creating valuable content to help you grow your business. In the meantime, book a call to get personalized insights.
                </p>
                <Link to="/contact">
                  <Button className="btn-primary">
                    Book a Free Strategy Call
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>

              {/* Preview Posts */}
              <h3 className="font-display text-xl font-bold mb-6">Coming Up</h3>
              <div className="space-y-6">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="p-6 rounded-2xl border border-border bg-card/50 opacity-70"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 rounded-full text-xs font-medium border border-primary/30 bg-primary/10 text-primary">
                        {post.category}
                      </span>
                      <span className="text-sm text-muted-foreground">{post.date}</span>
                    </div>
                    <h4 className="font-display text-lg font-bold mb-2">{post.title}</h4>
                    <p className="text-muted-foreground text-sm">{post.excerpt}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
