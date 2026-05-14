import { type StripeEnv, createStripeClient } from "../_shared/stripe.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, x-supabase-client-platform, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface CheckoutBody {
  priceId: string;
  customerEmail?: string;
  returnUrl: string;
  environment: StripeEnv;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = (await req.json()) as CheckoutBody;
    const { priceId, customerEmail, returnUrl, environment } = body;

    if (!priceId || !/^[a-zA-Z0-9_-]+$/.test(priceId)) {
      throw new Error("Invalid priceId");
    }
    if (!returnUrl) throw new Error("Missing returnUrl");
    if (environment !== "sandbox" && environment !== "live") {
      throw new Error("Invalid environment");
    }

    const stripe = createStripeClient(environment);

    const prices = await stripe.prices.list({ lookup_keys: [priceId], expand: ["data.product"] });
    if (!prices.data.length) throw new Error(`Price not found: ${priceId}`);
    const stripePrice = prices.data[0];
    const isRecurring = stripePrice.type === "recurring";

    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: stripePrice.id, quantity: 1 }],
      mode: isRecurring ? "subscription" : "payment",
      ui_mode: "embedded_page",
      return_url: returnUrl,
      ...(customerEmail && { customer_email: customerEmail }),
    });

    return new Response(JSON.stringify({ clientSecret: session.client_secret }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("create-checkout error:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
