import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, ExternalLink, Globe } from "lucide-react";

type Preview = {
  id: string;
  slug: string;
  client_name: string;
  preview_url: string;
  headline: string | null;
  description: string | null;
};

export default function OurWork() {
  const [items, setItems] = useState<Preview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("ghl_website_previews")
        .select("id, slug, client_name, preview_url, headline, description")
        .eq("is_active", true)
        .order("created_at", { ascending: false });
      setItems((data as Preview[]) || []);
      setLoading(false);
    })();
  }, []);

  return (
    <Layout>
      <SEOHead
        title="Our Work — Website & Lead System Samples | OneofOne"
        description="Real website builds and lead systems we've shipped for service businesses and DTC brands. Browse live samples."
        canonical="/our-work"
      />
      <section className="pt-32 pb-16">
        <div className="section-container">
          <div className="max-w-3xl mb-12">
            <p className="text-primary font-mono text-sm uppercase tracking-wider mb-3">Our Work</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
              Sites & systems <span className="gradient-text">we've shipped</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Live samples of websites and lead systems built for service businesses. Click any card to step inside the demo.
            </p>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="glass-card p-6 h-64 animate-pulse" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold mb-2">Samples coming soon</h3>
              <p className="text-muted-foreground mb-6">
                We're loading new builds into the showcase. Want one built for your business?
              </p>
              <Link to="/book-now">
                <Button className="btn-primary">Book a Strategy Call</Button>
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((p) => (
                <Link
                  key={p.id}
                  to={`/site-preview/${p.slug}`}
                  className="glass-card p-6 group hover:border-primary/50 transition-all hover:-translate-y-1 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Globe className="w-5 h-5 text-primary" />
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-1">{p.client_name}</h3>
                  {p.headline && (
                    <p className="text-sm text-primary mb-3">{p.headline}</p>
                  )}
                  {p.description && (
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{p.description}</p>
                  )}
                  <div className="mt-auto pt-4 flex items-center text-sm font-medium text-primary group-hover:gap-3 gap-2 transition-all">
                    View live demo <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-16 glass-card p-8 md:p-12 text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
              Want one of these built for your business?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              We design the site, wire the lead system, and hand you a setup that works while you're on the roof.
            </p>
            <Link to="/book-now">
              <Button className="btn-primary">Book a Strategy Call</Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
