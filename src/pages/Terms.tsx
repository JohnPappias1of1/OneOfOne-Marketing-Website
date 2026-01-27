import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";

export default function TermsPage() {
  return (
    <>
      <SEOHead
        title="Terms of Service"
        description="OneofOne Marketing terms of service. Read our terms and conditions for using our services."
        canonical="/terms"
      />
      <Layout>
        <section className="pt-32 pb-16 lg:pb-24">
          <div className="section-container">
            <div className="max-w-3xl mx-auto">
              <h1 className="font-display text-4xl font-bold mb-8">Terms of Service</h1>
              
              <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
                <p className="text-foreground">
                  Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>

                <h2 className="font-display text-xl font-bold text-foreground mt-8">Agreement to Terms</h2>
                <p>
                  By accessing our website and using our services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
                </p>

                <h2 className="font-display text-xl font-bold text-foreground mt-8">Services</h2>
                <p>
                  OneofOne Marketing provides digital marketing services including web design, SEO, paid advertising, and related services. The specific scope of services will be outlined in individual client agreements.
                </p>

                <h2 className="font-display text-xl font-bold text-foreground mt-8">Intellectual Property</h2>
                <p>
                  All work product created for clients becomes the property of the client upon full payment. Our proprietary systems, processes, and methodologies remain the property of OneofOne Marketing.
                </p>

                <h2 className="font-display text-xl font-bold text-foreground mt-8">Payment Terms</h2>
                <p>
                  Payment terms will be specified in individual client agreements. We reserve the right to suspend services for accounts with outstanding balances.
                </p>

                <h2 className="font-display text-xl font-bold text-foreground mt-8">Limitation of Liability</h2>
                <p>
                  OneofOne Marketing shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
                </p>

                <h2 className="font-display text-xl font-bold text-foreground mt-8">Termination</h2>
                <p>
                  Either party may terminate services with written notice as specified in individual client agreements. We work on month-to-month arrangements unless otherwise agreed.
                </p>

                <h2 className="font-display text-xl font-bold text-foreground mt-8">Changes to Terms</h2>
                <p>
                  We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website.
                </p>

                <h2 className="font-display text-xl font-bold text-foreground mt-8">Contact Us</h2>
                <p>
                  If you have questions about these Terms of Service, please contact us at hello@oneofonemarketing.com.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
