import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  ExternalLink,
  Smartphone,
  Star,
  MessageCircle,
  LayoutDashboard,
  ArrowRight,
  CheckCircle2,
  X,
  PhoneMissed,
  Zap,
  Bot,
  MapPin,
} from "lucide-react";

type Preview = {
  id: string;
  slug: string;
  client_name: string;
  preview_url: string;
  headline: string | null;
  description: string | null;
  cta_label: string | null;
  cta_url: string | null;
  cta_business_name: string | null;
};

export default function GhlWebsitePreview() {
  const { slug } = useParams<{ slug: string }>();
  const [preview, setPreview] = useState<Preview | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDemoBadge, setShowDemoBadge] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!slug) return;
      const { data } = await supabase
        .from("ghl_website_previews")
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
        <SEOHead title="Preview Not Found" description="This website preview is unavailable." canonical={`/site-preview/${slug}`} />
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

  const headline = preview.headline || `Your Website Preview, ${preview.client_name}`;
  const businessName = preview.cta_business_name?.trim() || preview.client_name;
  const ctaLabelTemplate = preview.cta_label || "See how this would work for [Business Name]";
  const ctaLabel = ctaLabelTemplate.replace(/\[Business Name\]/gi, businessName);
  const ctaUrl = preview.cta_url || "/book-now";
  const isExternal = /^https?:\/\//.test(ctaUrl);

  return (
    <>
      <SEOHead
        title={`${preview.client_name} — Website Preview`}
        description={preview.description || `Custom website preview for ${preview.client_name}.`}
        canonical={`/site-preview/${preview.slug}`}
      />
      <Layout>
        <section className="py-12 lg:py-16 bg-gradient-hero">
          <div className="section-container">
            <div className="max-w-4xl mx-auto text-center mb-8">
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

            {/* "What's Behind This Site" strip */}
            <div className="max-w-6xl mx-auto mb-10">
              <p className="text-center text-sm uppercase tracking-wider text-muted-foreground mb-5">
                What's actually behind this site
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  {
                    icon: Smartphone,
                    title: "Lead notifications in 30 seconds",
                    why: "Buzz on your phone before they call your competitor",
                  },
                  {
                    icon: Star,
                    title: "Auto-review requests after every job",
                    why: "Every happy customer, asked automatically",
                  },
                  {
                    icon: MessageCircle,
                    title: "24/7 chat capture",
                    why: "Capture leads at 9pm when you're already home",
                  },
                  {
                    icon: LayoutDashboard,
                    title: "One dashboard, one app",
                    why: "Stop juggling 5 tools — one login for everything",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="glass-card p-4 flex flex-col items-center text-center gap-2 hover:border-primary/40 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-xs sm:text-sm font-semibold leading-snug text-foreground">{item.title}</p>
                    <p className="text-[11px] sm:text-xs leading-snug text-muted-foreground">{item.why}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Live website preview with floating demo badge */}
            <div className="max-w-7xl mx-auto glass-card p-2 sm:p-4 relative">
              {showDemoBadge && (
                <div className="absolute -top-3 right-3 sm:right-6 z-20 animate-fade-in">
                  <div className="relative inline-flex items-center gap-2 pl-3 pr-8 py-2 rounded-full bg-primary text-primary-foreground text-xs sm:text-sm font-semibold shadow-lg shadow-primary/30">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-foreground opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-foreground"></span>
                    </span>
                    👋 Try the chat widget — it's live
                    <button
                      onClick={() => setShowDemoBadge(false)}
                      aria-label="Dismiss"
                      className="absolute right-2 top-1/2 -translate-y-1/2 hover:opacity-70"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
              <div className="relative w-full overflow-hidden rounded-xl bg-black" style={{ height: "80vh", minHeight: "600px" }}>
                <iframe
                  src={preview.preview_url}
                  title={`${preview.client_name} website preview`}
                  className="absolute inset-0 w-full h-full border-0"
                  allow="fullscreen"
                />
              </div>
              <div className="flex justify-end mt-2">
                <a
                  href={preview.preview_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1"
                >
                  Open in new tab <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Phone notification mockup */}
            <div className="max-w-6xl mx-auto mt-16">
              {/* Phone mockup */}
              <div className="flex flex-col items-center">
                <p className="text-primary font-semibold uppercase tracking-wider text-xs mb-3">
                  This is what happens when a lead hits your site
                </p>
                <h3 className="font-display text-2xl font-bold text-center mb-6">
                  A push notification, in <span className="text-primary">12 seconds</span>.
                </h3>
                <div className="relative mx-auto w-[280px] h-[560px] rounded-[44px] bg-neutral-900 border-[10px] border-neutral-800 shadow-2xl shadow-primary/10 overflow-hidden">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-neutral-900 rounded-b-2xl z-10"></div>
                  {/* Lockscreen bg */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-black">
                    {/* Time */}
                    <div className="pt-14 text-center text-white">
                      <p className="text-xs opacity-80">Tuesday, May 5</p>
                      <p className="font-display text-6xl font-light tracking-tight mt-1">9:42</p>
                    </div>
                    {/* Notification */}
                    <div className="absolute top-44 left-3 right-3 animate-fade-in">
                      <div className="bg-white/95 backdrop-blur rounded-2xl p-3 shadow-xl">
                        <div className="flex items-start gap-2">
                          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                            LC
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-[11px] font-semibold text-neutral-700 uppercase">Lead Connector</p>
                              <p className="text-[10px] text-neutral-500">12s ago</p>
                            </div>
                            <p className="text-sm font-bold text-neutral-900 mt-0.5">🔔 New Lead — John D.</p>
                            <p className="text-xs text-neutral-700 leading-snug mt-0.5">
                              2847 Oak St — needs roof inspection
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4 text-center max-w-xs">
                  Every lead. Every channel. Straight to your pocket — before your competitor even sees it.
                </p>
              </div>
            </div>

            {/* Built To Catch Every Lead — 4-card grid */}
            <div className="max-w-6xl mx-auto mt-16">
              <div className="text-center mb-8">
                <h3 className="font-display text-2xl sm:text-3xl font-bold mb-2">
                  Built To Catch Every Lead — <span className="text-primary">Even The Ones You'd Normally Lose</span>
                </h3>
                <p className="text-muted-foreground italic">This is where the system pays for itself.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: PhoneMissed,
                    tag: "📞 Missed-Call Auto Text-Back",
                    headline: "Stop Losing $20K/Month To Voicemail",
                    why: "Every missed call gets an instant text-back — so the lead is still yours when you climb down off the roof.",
                  },
                  {
                    icon: Zap,
                    tag: "⚡ Instant Lead Reply (Under 5 Seconds)",
                    headline: "Be First, Or Be Forgotten",
                    why: "Your leads get a real reply in under 5 seconds. Your competitors take 11 hours. That's the whole game.",
                  },
                  {
                    icon: Bot,
                    tag: "🤖 AI Receptionist (optional add-on)",
                    headline: "A $50K Receptionist For $200/Month",
                    why: "Answers every call. Qualifies every lead. Books every appointment. Even at 11pm on a Sunday.",
                  },
                  {
                    icon: MapPin,
                    tag: "📍 Local SEO Optimized",
                    headline: "Show Up Where The Money Is",
                    why: "Built from day one to rank in the Google Map Pack — because nobody scrolls to page two.",
                  },
                ].map((item) => (
                  <div key={item.tag} className="glass-card p-5 hover:border-primary/40 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{item.tag}</p>
                    </div>
                    <h4 className="font-display text-lg font-bold text-primary mb-2">{item.headline}</h4>
                    <p className="text-sm text-muted-foreground italic leading-relaxed">{item.why}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Review funnel flowchart */}
            <div className="max-w-3xl mx-auto mt-16">
              <div>
                <p className="text-primary font-semibold uppercase tracking-wider text-xs mb-3">
                  Reputation insurance, on autopilot
                </p>
                <h3 className="font-display text-2xl font-bold mb-6">
                  How we filter <span className="text-primary">5-star reviews</span> to Google.
                </h3>
                <div className="space-y-3">
                  {/* Step 1 */}
                  <div className="glass-card p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/15 text-primary font-bold flex items-center justify-center flex-shrink-0">
                      1
                    </div>
                    <div>
                      <p className="font-semibold">Customer finishes job</p>
                      <p className="text-xs text-muted-foreground">Job marked complete in your CRM</p>
                    </div>
                  </div>
                  <div className="flex justify-center"><ArrowRight className="w-4 h-4 text-primary rotate-90" /></div>
                  {/* Step 2 */}
                  <div className="glass-card p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/15 text-primary font-bold flex items-center justify-center flex-shrink-0">
                      2
                    </div>
                    <div>
                      <p className="font-semibold">Auto-text asks for a rating</p>
                      <p className="text-xs text-muted-foreground">"How'd we do? Rate us 1–5 ⭐"</p>
                    </div>
                  </div>
                  <div className="flex justify-center"><ArrowRight className="w-4 h-4 text-primary rotate-90" /></div>
                  {/* Step 3 — split */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="glass-card p-4 border-primary/40">
                      <div className="flex items-center gap-1 text-primary mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-primary" />
                        ))}
                      </div>
                      <p className="text-sm font-semibold">4–5 stars</p>
                      <p className="text-xs text-muted-foreground mt-1 inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-primary" /> Routed to Google
                      </p>
                    </div>
                    <div className="glass-card p-4">
                      <div className="flex items-center gap-1 text-muted-foreground mb-1">
                        {[...Array(3)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-muted-foreground/40" />
                        ))}
                      </div>
                      <p className="text-sm font-semibold">1–3 stars</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Routed to a private form — you fix it before it goes public.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-16">
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
