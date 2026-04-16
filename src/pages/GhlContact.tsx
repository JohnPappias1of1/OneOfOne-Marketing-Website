import { useEffect } from "react";
import { SEOHead } from "@/components/seo/SEOHead";

const GhlContact = () => {
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
        title="Contact Us | OneOfOneSystems LLC"
        description="Get in touch with OneOfOneSystems LLC. Fill out our contact form and we'll get back to you."
      />
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <iframe
            src="https://api.oneofonesystems.com/widget/form/gUfRRzwRJyGB8uJPs55d"
            style={{ width: "100%", height: "790px", border: "none", borderRadius: "0px" }}
            scrolling="yes"
            id="inline-gUfRRzwRJyGB8uJPs55d"
            data-layout='{"id":"INLINE"}'
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="3.0 Contact Form"
            data-height="790"
            data-layout-iframe-id="inline-gUfRRzwRJyGB8uJPs55d"
            data-form-id="gUfRRzwRJyGB8uJPs55d"
            title="3.0 Contact Form"
          />
        </div>
      </div>
    </>
  );
};

export default GhlContact;
