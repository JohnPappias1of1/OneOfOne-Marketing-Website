import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function CheckoutReturn() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <>
      <SEOHead title="Payment Complete | OneofOne Marketing" description="Thanks for your purchase." canonical="/checkout/return" />
      <Layout>
        <section className="pt-32 pb-20 min-h-[70vh] flex items-center">
          <div className="section-container max-w-xl text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle2 className="w-16 h-16 text-primary" />
            </div>
            <h1 className="font-display text-4xl font-bold mb-4">
              {sessionId ? "Payment Received" : "No session found"}
            </h1>
            <p className="text-muted-foreground mb-8">
              {sessionId
                ? "Thanks for signing up — we'll be in touch within 24 hours to kick off your onboarding."
                : "We couldn't find your checkout session. If you were charged, contact us and we'll sort it out."}
            </p>
            <div className="flex gap-3 justify-center">
              <Link to="/">
                <Button variant="outline">Back to home</Button>
              </Link>
              <Link to="/contact">
                <Button className="btn-primary">Contact us</Button>
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
