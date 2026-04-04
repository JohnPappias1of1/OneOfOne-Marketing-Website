import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const ClientQuestionnaire = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://api.oneofonesystems.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Client Questionnaire | OneofOne Marketing</title>
        <meta name="description" content="Fill out our client website content questionnaire to get started with OneofOne Marketing." />
      </Helmet>
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-display font-bold text-foreground text-center mb-8">
            Client Website Content Questionnaire
          </h1>
          <iframe
            src="https://api.oneofonesystems.com/widget/form/ZlWAQ0MY84rMkaO6I5fF"
            style={{ width: "100%", height: "2694px", border: "none", borderRadius: "4px" }}
            id="inline-ZlWAQ0MY84rMkaO6I5fF"
            data-layout='{"id":"INLINE"}'
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="1. ⭐Client Website Content Questionnaire👑✅"
            data-height="2694"
            data-layout-iframe-id="inline-ZlWAQ0MY84rMkaO6I5fF"
            data-form-id="ZlWAQ0MY84rMkaO6I5fF"
            title="Client Website Content Questionnaire"
          />
        </div>
      </div>
    </>
  );
};

export default ClientQuestionnaire;
