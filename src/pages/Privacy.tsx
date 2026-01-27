import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";

export default function PrivacyPage() {
  return (
    <>
      <SEOHead
        title="Privacy Policy"
        description="OneofOne Marketing privacy policy. Learn how we collect, use, and protect your personal information."
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
                  <li>Analyze and improve our services</li>
                  <li>Comply with legal obligations</li>
                </ul>

                <h2 className="font-display text-xl font-bold text-foreground mt-8">Information Sharing</h2>
                <p>
                  We do not sell, trade, or otherwise transfer your personal information to outside parties except as described in this policy. We may share information with trusted third parties who assist us in operating our website or conducting our business.
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
                  If you have questions about this Privacy Policy, please contact us at hello@oneofonemarketing.com.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
