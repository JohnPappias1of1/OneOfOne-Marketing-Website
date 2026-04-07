import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";

export function GhlStickyWidget() {
  const [isOpen, setIsOpen] = useState(false);

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
    <div className="fixed bottom-6 left-6 z-50">
      {isOpen && (
        <div className="mb-3 w-[380px] h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-border bg-background animate-fade-in">
          <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground">
            <span className="font-semibold text-sm">📲 SMS Opt-In</span>
            <button onClick={() => setIsOpen(false)} aria-label="Close">
              <X className="w-5 h-5" />
            </button>
          </div>
          <iframe
            src="https://api.oneofonesystems.com/widget/form/CoczR2UbrkbyvSztB50z"
            style={{ width: "100%", height: "calc(100% - 48px)", border: "none", overflowY: "auto" }}
            scrolling="yes"
            id="sticky-sidebar-left-CoczR2UbrkbyvSztB50z"
            data-layout='{"id":"INLINE"}'
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="OneOfOneSystems Sms Opt In Form"
            data-height="808"
            data-layout-iframe-id="sticky-sidebar-left-CoczR2UbrkbyvSztB50z"
            data-form-id="CoczR2UbrkbyvSztB50z"
            title="OneOfOneSystems Sms Opt In Form"
          />
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
        aria-label="Open SMS Opt-In"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
}
