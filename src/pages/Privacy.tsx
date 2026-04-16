import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";

export default function PrivacyPage() {
  return (
    <>
      <SEOHead
        title="Privacy Policy"
        description="OneOfOneSystems LLC privacy policy. Learn how we collect, use, and protect your personal information."
        canonical="/privacy"
      />
      <Layout>
        <section className="pt-32 pb-16 lg:pb-24">
          <div className="section-container">
            <div className="max-w-3xl mx-auto">
              <h1 className="font-display text-4xl font-bold mb-8">Privacy Policy</h1>
              
              <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
                <p className="text-foreground">
                  Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>

                <h2 className="font-display text-xl font-bold text-foreground mt-8">Information We Collect</h2>
                <p>
                  We collect information you provide directly to us, including name, email, phone number, business information, and any other information you choose to provide when filling out forms on our website or communicating with us.
                </p>

                <h2 className="font-display text-xl font-bold text-foreground mt-8">How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Respond to your inquiries and provide customer service</li>
                  <li>Send you marketing communications (with your consent)</li>
                  <li>Send SMS/text messages related to our services (with your express consent)</li>
                  <li>Analyze and improve our services</li>
                  <li>Comply with legal obligations</li>
                </ul>

                <h2 className="font-display text-xl font-bold text-foreground mt-8">SMS/Text Messaging</h2>
                <p>
                  By providing your phone number and opting in, you consent to receive SMS/text messages from OneOfOneSystems LLC. These messages may include marketing promotions, service updates, appointment reminders, and other business-related communications.
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong className="text-foreground">Consent:</strong> You must expressly opt in to receive SMS messages. Consent is not a condition of purchase.</li>
                  <li><strong className="text-foreground">Message Frequency:</strong> Message frequency varies. You may receive up to 10 messages per month.</li>
                  <li><strong className="text-foreground">Message & Data Rates:</strong> Message and data rates may apply. Check with your mobile carrier for details.</li>
                  <li><strong className="text-foreground">Opt-Out:</strong> You can opt out at any time by replying STOP to any SMS message. After opting out, you will receive one final confirmation message and no further texts will be sent.</li>
                  <li><strong className="text-foreground">Help:</strong> For help, reply HELP to any SMS message or contact us at Johnp@oneofonesystems.com.</li>
                  <li><strong className="text-foreground">Carriers:</strong> Supported carriers include AT&T, T-Mobile, Verizon, Sprint, and most other major U.S. carriers. Carrier participation may vary.</li>
                  <li><strong className="text-foreground">No Sharing:</strong> We do not sell, rent, or share your phone number or SMS opt-in information with third parties or affiliates for marketing purposes.</li>
                </ul>
                <p className="font-semibold text-foreground">
                  No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. All other categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.
                </p>

                <h2 className="font-display text-xl font-bold text-foreground mt-8">Carrier Liability Disclaimer</h2>
                <p>
                  OneOfOneSystems LLC and mobile carriers (including but not limited to AT&T, T-Mobile, Verizon, and Sprint) are not liable for delayed or undelivered messages. Delivery of SMS messages is subject to effective transmission by your mobile carrier.
                </p>

                <h2 className="font-display text-xl font-bold text-foreground mt-8">Age Restriction</h2>
                <p>
                  You must be at least 18 years of age to opt in to our SMS messaging program. By opting in, you confirm that you are 18 years of age or older. We do not knowingly collect information from individuals under 18.
                </p>

                <h2 className="font-display text-xl font-bold text-foreground mt-8">Information Sharing</h2>
                <p>
                  We do not sell, trade, rent, or otherwise transfer your personal information to outside parties. We do not share your information with third parties or affiliates for marketing or promotional purposes.
                </p>

                <h2 className="font-display text-xl font-bold text-foreground mt-8">Data Security</h2>
                <p>
                  We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
                </p>

                <h2 className="font-display text-xl font-bold text-foreground mt-8">Cookies</h2>
                <p>
                  We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                </p>

                <h2 className="font-display text-xl font-bold text-foreground mt-8">Contact Us</h2>
                <p>
                  If you have questions about this Privacy Policy, please contact us at Johnp@oneofonesystems.com.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
