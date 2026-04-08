import { useEffect } from "react";
import { SEOHead } from "@/components/seo/SEOHead";

const SmsOptin = () => {
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
        title="SMS Updates | OneofOne Marketing"
        description="Opt in to receive exclusive marketing tips and updates via SMS from OneofOne Marketing."
      />
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <iframe
            src="https://api.oneofonesystems.com/widget/form/CoczR2UbrkbyvSztB50z"
            style={{ width: "100%", height: "808px", border: "none", borderRadius: "3px" }}
            scrolling="yes"
            id="inline-CoczR2UbrkbyvSztB50z"
            data-layout='{"id":"INLINE"}'
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="OneOfOneSystems Sms Opt In Form"
            data-height="808"
            data-layout-iframe-id="inline-CoczR2UbrkbyvSztB50z"
            data-form-id="CoczR2UbrkbyvSztB50z"
            title="OneOfOneSystems Sms Opt In Form"
          />
        </div>
      </div>
    </>
  );
};

export default SmsOptin;
