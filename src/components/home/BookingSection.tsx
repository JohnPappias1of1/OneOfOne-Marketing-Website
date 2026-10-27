import { useEffect, useRef, useState } from "react";

export function BookingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    const scriptId = "ghl-form-embed-js";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://api.oneofonesystems.com/js/form_embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [shouldLoad]);

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-muted/30">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Book Your <span className="gradient-text text-shadow-gold">Free Strategy Call</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Pick a time that works for you and let's map out your growth plan.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          {shouldLoad ? (
            <iframe
              src="https://api.oneofonesystems.com/widget/booking/uNDDgOE7bK1v2TpURbK3"
              style={{ width: "100%", border: "none", overflow: "hidden", minHeight: "1000px" }}
              scrolling="no"
              id="uNDDgOE7bK1v2TpURbK3_1776186054690"
              title="Book a Strategy Call"
              loading="lazy"
            />
          ) : (
            <div style={{ minHeight: "1000px" }} className="flex items-center justify-center">
              <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
