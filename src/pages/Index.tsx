import { Layout } from "@/components/layout/Layout";
import { SEOHead, organizationSchema, localBusinessSchema, generateFAQSchema } from "@/components/seo/SEOHead";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustSection } from "@/components/home/TrustSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ResultsSection } from "@/components/home/ResultsSection";
import { OfferSection } from "@/components/home/OfferSection";
import { FAQSection } from "@/components/home/FAQSection";
import { FinalCTASection } from "@/components/home/FinalCTASection";
import { BookingSection } from "@/components/home/BookingSection";

const faqs = [
  { question: "How much does it cost?", answer: "Our pricing is customized based on your needs and goals. Most clients invest between $2,500-$10,000/month depending on the services included." },
  { question: "How long until I see results?", answer: "Most clients see initial improvements within 30 days and significant results within 90 days." },
  { question: "What industries do you work with?", answer: "We specialize in service-based businesses and DTC/e-commerce brands." },
  { question: "Do you require long-term contracts?", answer: "No. We work on month-to-month agreements." },
  { question: "What's included in the free audit?", answer: "A complete website analysis, SEO health check, competitor research, and a 90-day growth roadmap." },
  { question: "Do I own everything you create?", answer: "Yes, 100%. Your website, content, creative assets, and data all belong to you." },
];

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    organizationSchema,
    localBusinessSchema,
    generateFAQSchema(faqs),
  ],
};

const Index = () => {
  return (
    <>
      <SEOHead
        title="Marketing Agency | Web Design, SEO & Lead Generation"
        description="OneofOne Marketing builds customer-acquisition systems: high-converting websites, SEO, paid ads & AI automation. Book a free strategy call today."
        canonical="/"
        schema={homeSchema}
      />
      <Layout>
        <HeroSection />
        <TrustSection />
        <ServicesSection />
        <ProcessSection />
        <ResultsSection />
        <OfferSection />
        <FAQSection />
        <FinalCTASection />
      </Layout>
    </>
  );
};

export default Index;
