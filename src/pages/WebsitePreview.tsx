import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { getLoomEmbedUrl } from "@/lib/loom";
import { Loader2 } from "lucide-react";

type Preview = {
  id: string;
  slug: string;
  client_name: string;
  loom_url: string;
  headline: string | null;
  description: string | null;
  cta_label: string | null;
  cta_url: string | null;
};

export default function WebsitePreview() {
  const { slug } = useParams<{ slug: string }>();
  const [preview, setPreview] = useState<Preview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!slug) return;
      const { data } = await supabase
        .from("website_previews")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .maybeSingle();
      setPreview(data as Preview | null);
      setLoading(false);
    };
    load();
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!preview) {
    return (
      <>
        <SEOHead title="Preview Not Found" description="This website preview is unavailable." canonical={`/website/${slug}`} />
        <Layout>
          <div className="section-container py-24 text-center">
            <h1 className="font-display text-4xl font-bold mb-4">Preview Not Found</h1>
            <p className="text-muted-foreground mb-8">This preview link is inactive or no longer exists.</p>
            <Button asChild><Link to="/">Return Home</Link></Button>
          </div>
        </Layout>
      </>
    );
  }

  const embedUrl = getLoomEmbedUrl(preview.loom_url);
  const headline = preview.headline || `Your Website Preview, ${preview.client_name}`;
  const ctaLabel = preview.cta_label || "Book a Call";
  const ctaUrl = preview.cta_url || "/book-now";
  const isExternal = /^https?:\/\//.test(ctaUrl);

  return (
    <>
      <SEOHead
        title={`${preview.client_name} — Website Preview`}
        description={preview.description || `Custom website preview for ${preview.client_name}.`}
        canonical={`/website/${preview.slug}`}
       
      />
      <Layout>
        <section className="py-16 lg:py-24 bg-gradient-hero">
          <div className="section-container">
            <div className="max-w-4xl mx-auto text-center mb-10">
              <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-3">
                Prepared for {preview.client_name}
              </p>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                <span className="gradient-text text-shadow-gold">{headline}</span>
              </h1>
              {preview.description && (
                <p className="text-lg text-muted-foreground">{preview.description}</p>
              )}
            </div>

            <div className="max-w-5xl mx-auto glass-card p-2 sm:p-4">
              <div className="relative w-full overflow-hidden rounded-xl bg-black" style={{ paddingBottom: "56.25%" }}>
                {embedUrl ? (
                  <iframe
                    src={embedUrl}
                    title={`${preview.client_name} website preview`}
                    allowFullScreen
                    allow="autoplay; fullscreen; picture-in-picture"
                    className="absolute inset-0 w-full h-full border-0"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    Invalid Loom URL
                  </div>
                )}
              </div>
            </div>

            <div className="text-center mt-10">
              {isExternal ? (
                <a href={ctaUrl} target="_blank" rel="noopener noreferrer" className="btn-primary inline-block">
                  {ctaLabel}
                </a>
              ) : (
                <Link to={ctaUrl} className="btn-primary inline-block">
                  {ctaLabel}
                </Link>
              )}
              <p className="text-sm text-muted-foreground mt-4">
                Questions? Reply to the email or text we sent you.
              </p>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
