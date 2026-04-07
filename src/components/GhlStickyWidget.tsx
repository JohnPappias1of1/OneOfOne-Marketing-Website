import { useEffect } from "react";

export function GhlStickyWidget() {
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
    <iframe
      src="https://api.oneofonesystems.com/widget/form/CoczR2UbrkbyvSztB50z"
      style={{ display: "none", width: "100%", height: "100%", border: "none", borderRadius: "3px" }}
      id="sticky-sidebar-left-CoczR2UbrkbyvSztB50z"
      data-layout='{"id":"STICKY_SIDEBAR","minimizedTitle":"","isLeftAligned":true,"isRightAligned":false,"allowMinimize":false}'
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
  );
}
