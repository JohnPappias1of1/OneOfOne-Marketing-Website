import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";

const BookNow = () => {
  useEffect(() => {
    const scriptId = "ghl-form-embed-js";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://api.oneofonesystems.com/js/form_embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <>
      <SEOHead
        title="Book Now | OneOfOneSystems LLC"
        description="Schedule your free strategy call with OneOfOneSystems LLC. Pick a time that works for you and let's build your growth plan."
        canonical="/book-now"
      />
      <Layout>
        <section className="pt-32 pb-20 lg:pb-28">
          <div className="section-container">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Book Your <span className="gradient-text text-shadow-gold">Free Strategy Call</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Pick a time that works for you and let's map out your growth plan.
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <iframe
                src="https://go.oneofonesystems.com/widget/booking/rfSGgAr2Jw5gsrQNmPrw"
                style={{ width: "100%", border: "none", overflow: "hidden", minHeight: "1000px" }}
                scrolling="no"
                id="booking-page-rfSGgAr2Jw5gsrQNmPrw"
                title="Book a Strategy Call"
              />
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default BookNow;
