import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Play, PlayCircle, Quote, Star } from "lucide-react";
import { getVideoEmbedUrl } from "@/lib/loom";

/**
 * Unlisted client testimonial page.
 * Not linked from the nav, footer, sitemap, or llms.txt — share the URL directly.
 */
const TESTIMONIAL_VIDEO_URL = "https://youtube.com/shorts/V-2HPmDd-cw";
const embedUrl = getVideoEmbedUrl(TESTIMONIAL_VIDEO_URL);
const videoId = TESTIMONIAL_VIDEO_URL.match(/(?:shorts\/|watch\?v=|youtu\.be\/)([\w-]+)/)?.[1];
const thumbnailUrl = videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : null;
const largeThumbnailUrl = videoId ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg` : null;

const ClientTestimonial = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
  <>
    <Helmet>
      <title>Client Testimonial | OneOfOneSystems LLC</title>
      <meta name="description" content="A client testimonial from OneOfOneSystems LLC." />
      <meta name="robots" content="noindex, nofollow" />
      {thumbnailUrl && <link rel="preconnect" href="https://i.ytimg.com" />}
    </Helmet>

    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient gold glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[420px] h-[420px] sm:w-[700px] sm:h-[700px] rounded-full bg-primary/10 blur-3xl" />

      <div className="relative section-container py-10 min-h-screen flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-12">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <span className="text-2xl font-display font-bold gradient-text">1</span>
              <span className="text-2xl font-display font-bold text-foreground">/</span>
              <span className="text-2xl font-display font-bold gradient-text">1</span>
            </div>
            <span className="font-display font-bold text-lg text-foreground hidden sm:block">
              OneofOne
            </span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to site
          </Link>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
              Client Testimonial
            </span>
          </div>

          <h1 className="font-display font-bold text-foreground text-3xl sm:text-5xl max-w-3xl leading-tight mb-4">
            Don't take our word for it.
            <span className="block gradient-text">Take theirs.</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mb-10">
            A quick word from a client about what it's like working with OneOfOne.
          </p>

          {/* Load only a thumbnail until the visitor asks to play the video. */}
          {embedUrl ? (
            <div className="relative w-full max-w-[340px]">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-primary/15 blur-2xl" />
              <div className="relative rounded-[2.5rem] border border-primary/30 bg-card/80 p-3 shadow-2xl">
                <div className="relative w-full aspect-[9/16] rounded-[2rem] overflow-hidden bg-secondary">
                  {isVideoPlaying ? (
                    <iframe
                      src={`${embedUrl.replace("www.youtube.com", "www.youtube-nocookie.com")}?autoplay=1&rel=0&playsinline=1`}
                      title="Client video testimonial"
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsVideoPlaying(true)}
                      className="group absolute inset-0 w-full h-full"
                      aria-label="Play client testimonial video"
                    >
                      {thumbnailUrl && (
                        <img
                          src={thumbnailUrl}
                          srcSet={largeThumbnailUrl ? `${thumbnailUrl} 480w, ${largeThumbnailUrl} 1280w` : undefined}
                          sizes="340px"
                          width="480"
                          height="360"
                          alt=""
                          fetchPriority="high"
                          decoding="async"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      )}
                      <span className="absolute inset-0 bg-background/10 transition-colors group-hover:bg-background/0" />
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-xl transition-transform group-hover:scale-105">
                          <Play className="w-9 h-9 ml-1 fill-current" aria-hidden="true" />
                        </span>
                      </span>
                      <span className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-background/85 px-4 py-2 text-sm font-semibold text-foreground whitespace-nowrap">
                        Tap to play
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl border border-border bg-card text-muted-foreground">
              <PlayCircle className="w-5 h-5 text-primary" />
              This video isn't available yet.
            </div>
          )}

          {/* Quote mark accent */}
          <div className="mt-12 flex items-center gap-3 text-primary/40">
            <span className="h-px w-16 bg-primary/30" />
            <Quote className="w-6 h-6" />
            <span className="h-px w-16 bg-primary/30" />
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <Link to="/book-now" className="btn-primary">
              Book Your Free Strategy Call
            </Link>
            <Link to="/case-studies" className="btn-secondary">
              See More Results
            </Link>
          </div>
        </div>

        <p className="mt-16 text-xs text-muted-foreground/60 text-center">
          © {new Date().getFullYear()} OneOfOneSystems LLC
        </p>
      </div>
    </div>
  </>
  );
};

export default ClientTestimonial;
