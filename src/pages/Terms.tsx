import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";

export default function TermsPage() {
  return (
    <>
      <SEOHead
        title="Terms of Service | OneofOne Marketing"
        description="OneOfOneSystems LLC terms of service. Read our terms and conditions for using our services."
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
                  OneOfOneSystems LLC provides digital marketing services including web design, SEO, paid advertising, and related services. The specific scope of services will be outlined in individual client agreements.
                </p>

                <h2 className="font-display text-xl font-bold text-foreground mt-8">Intellectual Property</h2>
                <p>
                  All work product created for clients becomes the property of the client upon full payment. Our proprietary systems, processes, and methodologies remain the property of OneOfOneSystems LLC.
                </p>

                <h2 className="font-display text-xl font-bold text-foreground mt-8">Payment Terms</h2>
                <p>
                  Payment terms will be specified in individual client agreements. We reserve the right to suspend services for accounts with outstanding balances.
                </p>

                <h2 className="font-display text-xl font-bold text-foreground mt-8">Limitation of Liability</h2>
                <p>
                  OneOfOneSystems LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
                </p>

                <h2 className="font-display text-xl font-bold text-foreground mt-8">Termination</h2>
                <p>
                  Either party may terminate services with written notice as specified in individual client agreements. We work on month-to-month arrangements unless otherwise agreed.
                </p>

                <h2 className="font-display text-xl font-bold text-foreground mt-8">SMS/Text Messaging Terms</h2>
                <p>
                  By opting in to receive SMS/text messages from OneOfOneSystems LLC, you agree to the following:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>You consent to receive recurring automated marketing and informational text messages from OneOfOneSystems LLC at the phone number you provided.</li>
                  <li>Consent is not required as a condition of purchasing any goods or services.</li>
                  <li>Message frequency varies; up to 10 messages per month.</li>
                  <li>Message and data rates may apply.</li>
                  <li>You may opt out at any time by replying STOP. You will receive a one-time confirmation and no further messages.</li>
                  <li>For help, reply HELP or email Johnp@oneofonesystems.com.</li>
                  <li>We will not share your opt-in information or phone number with any third parties for their own marketing purposes.</li>
                  <li>By opting in, you acknowledge that you have read and agree to our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.</li>
                </ul>

                <h2 className="font-display text-xl font-bold text-foreground mt-8">Carrier Liability Disclaimer</h2>
                <p>
                  OneOfOneSystems LLC and mobile carriers (including but not limited to AT&T, T-Mobile, Verizon, and Sprint) are not liable for delayed or undelivered messages. Delivery of SMS messages is subject to effective transmission by your mobile carrier.
                </p>

                <h2 className="font-display text-xl font-bold text-foreground mt-8">Age Restriction</h2>
                <p>
                  You must be at least 18 years of age to opt in to our SMS messaging program. By opting in, you confirm that you are 18 years of age or older. We do not knowingly collect information from individuals under 18.
                </p>

                <h2 className="font-display text-xl font-bold text-foreground mt-8">Changes to Terms</h2>
                <p>
                  We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website.
                </p>

                <h2 className="font-display text-xl font-bold text-foreground mt-8">Contact Us</h2>
                <p>
                  If you have questions about these Terms of Service, please contact us at Johnp@oneofonesystems.com.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
