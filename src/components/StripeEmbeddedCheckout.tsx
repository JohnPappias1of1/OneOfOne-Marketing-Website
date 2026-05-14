import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { useCallback, useMemo } from "react";
import { getStripe, getStripeEnvironment } from "@/lib/stripe";
import { supabase } from "@/integrations/supabase/client";

interface StripeEmbeddedCheckoutProps {
  priceId: string;
  customerEmail?: string;
  returnUrl?: string;
}

export function StripeEmbeddedCheckout({
  priceId,
  customerEmail,
  returnUrl,
}: StripeEmbeddedCheckoutProps) {
  const fetchClientSecret = useCallback(async (): Promise<string> => {
    const finalReturnUrl =
      returnUrl ||
      `${window.location.origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`;
    const { data, error } = await supabase.functions.invoke("create-checkout", {
      body: {
        priceId,
        customerEmail,
        returnUrl: finalReturnUrl,
        environment: getStripeEnvironment(),
      },
    });
    if (error || !data?.clientSecret) {
      throw new Error(error?.message || "Failed to create checkout session");
    }
    return data.clientSecret;
  }, [customerEmail, priceId, returnUrl]);

  const options = useMemo(() => ({ fetchClientSecret }), [fetchClientSecret]);

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={getStripe()} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
