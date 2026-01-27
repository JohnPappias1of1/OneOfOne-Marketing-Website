import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How much does it cost?",
    answer: "Our pricing is customized based on your needs and goals. Most clients invest between $2,500-$10,000/month depending on the services included. We focus on ROI—if we can't show you a clear path to positive returns, we'll tell you upfront. Book a call for a custom quote.",
  },
  {
    question: "How long until I see results?",
    answer: "Most clients see initial improvements within 30 days and significant results within 90 days. SEO typically takes 3-6 months for full impact, while paid ads and website conversions often show improvements within the first month.",
  },
  {
    question: "What industries do you work with?",
    answer: "We specialize in service-based businesses and DTC/e-commerce brands. Our sweet spot includes home services, legal, medical/dental, real estate, beauty/wellness, and professional services. If you generate revenue through leads or online sales, we can likely help.",
  },
  {
    question: "Do you require long-term contracts?",
    answer: "No. We work on month-to-month agreements. We believe in earning your business every month. That said, marketing is a long game, and clients who commit for 6+ months see the best results.",
  },
  {
    question: "What's included in the free audit?",
    answer: "Our free audit includes a complete website analysis, SEO health check, competitor research, and a 90-day growth roadmap with prioritized recommendations. It's a $1,500+ value, delivered on a 30-minute call.",
  },
  {
    question: "Do I own everything you create?",
    answer: "Yes, 100%. Your website, content, creative assets, and data all belong to you. If we ever part ways, everything transfers to you with no strings attached.",
  },
  {
    question: "What if I already have a website?",
    answer: "We can either optimize your existing site or build you a new one—whatever makes the most strategic sense. During our audit, we'll assess whether your current site can be improved or if a rebuild would deliver better ROI.",
  },
  {
    question: "How do you measure success?",
    answer: "We track everything: leads, calls, conversions, cost per acquisition, revenue generated, and ROI. You'll have access to a real-time dashboard, and we review performance on monthly strategy calls.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 lg:py-28 bg-card">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary/50 mb-4">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Got Questions?</span>
          </div>
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
            Frequently Asked{" "}
            <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about working with OneofOne Marketing.
          </p>
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="faq-item rounded-xl border border-border overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left bg-background hover:bg-secondary/30 transition-colors"
              >
                <span className="font-display font-semibold text-lg pr-8">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <p className="p-6 pt-0 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
