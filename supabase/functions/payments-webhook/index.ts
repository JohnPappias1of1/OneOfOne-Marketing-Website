import { createClient } from "npm:@supabase/supabase-js@2";
import { type StripeEnv, createStripeClient, verifyWebhook } from "../_shared/stripe.ts";

const GHL_WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/iHzub8lZ7JkGC1SLf02S/webhook-trigger/b39ab4b2-b163-4110-9bc5-9cf43aa11bfc";

let _supabase: ReturnType<typeof createClient> | null = null;
function getSupabase() {
  if (!_supabase) {
    _supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
  }
  return _supabase;
}

async function notifyGHL(payload: Record<string, unknown>) {
  try {
    await fetch(GHL_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    console.error("GHL webhook error:", e);
  }
}

function priceFromItem(item: any): { priceId: string; productId: string } {
  return {
    priceId: item?.price?.lookup_key || item?.price?.metadata?.lovable_external_id || item?.price?.id,
    productId: item?.price?.product,
  };
}

async function upsertSubscription(subscription: any, env: StripeEnv) {
  const item = subscription.items?.data?.[0];
  const { priceId, productId } = priceFromItem(item);
  const periodStart = item?.current_period_start ?? subscription.current_period_start;
  const periodEnd = item?.current_period_end ?? subscription.current_period_end;

  // Fetch customer email
  let email: string | null = null;
  try {
    const stripe = createStripeClient(env);
    const customer = await stripe.customers.retrieve(subscription.customer);
    if (customer && !("deleted" in customer)) email = (customer as any).email ?? null;
  } catch (e) {
    console.error("Customer fetch error:", e);
  }

  await getSupabase().from("subscriptions").upsert(
    {
      user_id: subscription.metadata?.userId || null,
      customer_email: email,
      stripe_subscription_id: subscription.id,
      stripe_customer_id: subscription.customer,
      product_id: productId,
      price_id: priceId,
      status: subscription.status,
      current_period_start: periodStart ? new Date(periodStart * 1000).toISOString() : null,
      current_period_end: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
      cancel_at_period_end: subscription.cancel_at_period_end || false,
      environment: env,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "stripe_subscription_id" },
  );

  return { priceId, productId, email };
}

async function handleWebhook(req: Request, env: StripeEnv) {
  const event = await verifyWebhook(req, env);
  const obj: any = event.data.object;

  switch (event.type) {
    case "customer.subscription.created": {
      const info = await upsertSubscription(obj, env);
      await notifyGHL({
        event: "subscription_created",
        environment: env,
        email: info.email,
        plan: info.priceId,
        stripe_customer_id: obj.customer,
        stripe_subscription_id: obj.id,
        amount: obj.items?.data?.[0]?.price?.unit_amount,
        currency: obj.currency,
      });
      break;
    }
    case "customer.subscription.updated": {
      const info = await upsertSubscription(obj, env);
      await notifyGHL({
        event: obj.cancel_at_period_end ? "subscription_canceled_at_period_end" : "subscription_updated",
        environment: env,
        email: info.email,
        plan: info.priceId,
        status: obj.status,
        cancel_at_period_end: obj.cancel_at_period_end,
        current_period_end: obj.current_period_end
          ? new Date(obj.current_period_end * 1000).toISOString()
          : null,
        stripe_subscription_id: obj.id,
      });
      break;
    }
    case "customer.subscription.deleted": {
      const info = await upsertSubscription({ ...obj, status: "canceled" }, env);
      await notifyGHL({
        event: "subscription_ended",
        environment: env,
        email: info.email,
        plan: info.priceId,
        stripe_subscription_id: obj.id,
      });
      break;
    }
    case "checkout.session.completed": {
      // One-time setup-fee payments (mode=payment) — notify so john can follow up
      if (obj.mode === "payment") {
        await notifyGHL({
          event: "one_time_payment",
          environment: env,
          email: obj.customer_details?.email || obj.customer_email,
          name: obj.customer_details?.name,
          amount_total: obj.amount_total,
          currency: obj.currency,
          stripe_session_id: obj.id,
        });
      }
      break;
    }
    default:
      console.log("Unhandled event:", event.type);
  }
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  const rawEnv = new URL(req.url).searchParams.get("env");
  if (rawEnv !== "sandbox" && rawEnv !== "live") {
    console.error("Webhook with invalid env:", rawEnv);
    return new Response(JSON.stringify({ received: true, ignored: "invalid env" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
  try {
    await handleWebhook(req, rawEnv as StripeEnv);
    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Webhook error:", e);
    return new Response("Webhook error", { status: 400 });
  }
});
