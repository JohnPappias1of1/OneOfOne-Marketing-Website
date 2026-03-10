import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { SEOHead } from "@/components/seo/SEOHead";
import { Loader2, CheckCircle, Play, Shield, TrendingUp, Users, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(10, "Please enter a valid phone number").max(20),
  businessType: z.string().min(1, "Please select your business type"),
  monthlyRevenue: z.string().min(1, "Please select your monthly revenue"),
  biggestChallenge: z.string().min(1, "Please select your biggest challenge"),
  monthlyBudget: z.string().min(1, "Please select your marketing budget"),
});

type FormData = z.infer<typeof formSchema>;

const businessTypes = [
  "General Contractor",
  "Roofing",
  "HVAC",
  "Plumbing",
  "Electrical",
  "Landscaping",
  "Remodeling / Renovation",
  "Other",
];

const revenueRanges = [
  "Under $10K/mo",
  "$10K - $50K/mo",
  "$50K - $100K/mo",
  "$100K - $250K/mo",
  "$250K+/mo",
];

const challenges = [
  "Not enough leads",
  "Leads aren't qualified",
  "Too dependent on referrals",
  "Can't scale past current revenue",
  "Competitors are outranking me",
];

const budgets = [
  "Under $1,000/mo",
  "$1,000 - $3,000/mo",
  "$3,000 - $5,000/mo",
  "$5,000 - $10,000/mo",
  "$10,000+/mo",
];

const proofPoints = [
  { stat: "347%", label: "Avg. increase in qualified leads" },
  { stat: "60+", label: "Contractors scaled past 7 figures" },
  { stat: "21 Days", label: "Avg. time to first booked job" },
  { stat: "$4.2M", label: "Revenue generated for clients" },
];

export default function ContractorsLP() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("leads").insert({
        first_name: data.firstName,
        email: data.email,
        phone: data.phone,
        business_type: data.businessType,
        monthly_ad_spend: data.monthlyBudget,
        notes: `Revenue: ${data.monthlyRevenue} | Challenge: ${data.biggestChallenge}`,
        source: "lp-contractors",
        status: "new",
      });

      if (error) console.error("DB error:", error);

      setIsSuccess(true);
      toast({
        title: "Application Received!",
        description: "We'll reach out within 24 hours.",
      });
      reset();
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <SEOHead
        title="Marketing For Contractors | Get More Jobs Booked"
        description="The #1 marketing system built for contractors. Get qualified leads, book more jobs, and dominate your local market. Free strategy call."
        canonical="/lp/contractors"
      />

      <div className="min-h-screen bg-background text-foreground">
        {/* Minimal Top Bar */}
        <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <span className="font-display text-lg font-bold tracking-tight">
              <span className="text-primary">OneofOne</span> Marketing
            </span>
            <Button onClick={scrollToForm} size="sm" className="btn-primary">
              Apply Now
            </Button>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              Exclusively For Contractors
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] mb-6">
              The #1 Marketing System Built For Contractors Who Want To{" "}
              <span className="text-primary">Dominate Their Local Market</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Stop chasing leads on Angi and HomeAdvisor. We build you a predictable,
              automated system that brings homeowners directly to you — ready to book.
            </p>

            <Button onClick={scrollToForm} className="btn-primary text-lg px-8 py-6 h-auto">
              Get Your Free Growth Plan →
            </Button>

            <p className="text-sm text-muted-foreground mt-4">
              Limited to 5 contractors per market. Check availability.
            </p>
          </div>
        </section>

        {/* Social Proof Bar */}
        <section className="border-y border-border/50 bg-card/50">
          <div className="max-w-5xl mx-auto px-4 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {proofPoints.map((p) => (
                <div key={p.label}>
                  <div className="font-display text-3xl md:text-4xl font-black text-primary mb-1">
                    {p.stat}
                  </div>
                  <div className="text-sm text-muted-foreground">{p.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VSL Section */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-8">
              Watch How We Help Contractors Book{" "}
              <span className="text-primary">20+ Jobs Per Month</span>
            </h2>

            {/* VSL Placeholder */}
            <div className="relative aspect-video rounded-xl overflow-hidden border border-border bg-card shadow-2xl shadow-primary/5">
              {!isPlaying ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-card to-secondary cursor-pointer group"
                  onClick={() => setIsPlaying(true)}
                >
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                    <Play className="w-8 h-8 text-primary ml-1" />
                  </div>
                  <p className="text-muted-foreground text-sm">Click to play video</p>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-card">
                  {/* Replace this div with your actual video embed */}
                  <p className="text-muted-foreground">
                    Replace with your VSL embed (YouTube, Vimeo, Wistia, etc.)
                  </p>
                </div>
              )}
            </div>

            <div className="text-center mt-8">
              <Button onClick={scrollToForm} className="btn-primary text-base px-8 py-5 h-auto">
                Apply For Your Free Strategy Call →
              </Button>
            </div>
          </div>
        </section>

        {/* What You Get */}
        <section className="py-16 md:py-20 bg-card/30">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-12">
              What You Get When You Work With Us
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: TrendingUp,
                  title: "High-Converting Website",
                  desc: "Custom-built to turn visitors into booked jobs. No templates. Optimized for your specific trades and service area.",
                },
                {
                  icon: Users,
                  title: "Qualified Lead Machine",
                  desc: "Google Ads + SEO + retargeting that bring homeowners who are ready to hire — not tire-kickers from lead-gen sites.",
                },
                {
                  icon: Phone,
                  title: "AI Follow-Up System",
                  desc: "Automated texts, emails, and an AI receptionist that books calls 24/7 so you never miss another job.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-6 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lead Form Section */}
        <section id="apply-form" className="py-16 md:py-24">
          <div className="max-w-2xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Ready To <span className="text-primary">Dominate Your Market?</span>
              </h2>
              <p className="text-muted-foreground">
                Answer 4 quick questions so we can build your custom growth plan. Only
                takes 60 seconds.
              </p>
            </div>

            {isSuccess ? (
              <div className="p-8 rounded-xl border border-primary/30 bg-card text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold mb-2">
                  Application Received!
                </h3>
                <p className="text-muted-foreground">
                  We'll review your info and reach out within 24 hours to schedule your
                  free strategy call.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5 p-6 md:p-8 rounded-xl border border-border bg-card"
              >
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      First Name *
                    </label>
                    <input {...register("firstName")} className="form-input" />
                    {errors.firstName && (
                      <p className="text-destructive text-xs mt-1">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Email *</label>
                    <input
                      {...register("email")}
                      type="email"
                      className="form-input"
                    />
                    {errors.email && (
                      <p className="text-destructive text-xs mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">Phone *</label>
                  <input {...register("phone")} type="tel" className="form-input" />
                  {errors.phone && (
                    <p className="text-destructive text-xs mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Q1: Business Type */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    1. What type of contracting do you do? *
                  </label>
                  <select {...register("businessType")} className="form-input">
                    <option value="">Select one...</option>
                    {businessTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  {errors.businessType && (
                    <p className="text-destructive text-xs mt-1">
                      {errors.businessType.message}
                    </p>
                  )}
                </div>

                {/* Q2: Monthly Revenue */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    2. What's your current monthly revenue? *
                  </label>
                  <select {...register("monthlyRevenue")} className="form-input">
                    <option value="">Select one...</option>
                    {revenueRanges.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  {errors.monthlyRevenue && (
                    <p className="text-destructive text-xs mt-1">
                      {errors.monthlyRevenue.message}
                    </p>
                  )}
                </div>

                {/* Q3: Biggest Challenge */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    3. What's your biggest growth challenge right now? *
                  </label>
                  <select {...register("biggestChallenge")} className="form-input">
                    <option value="">Select one...</option>
                    {challenges.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  {errors.biggestChallenge && (
                    <p className="text-destructive text-xs mt-1">
                      {errors.biggestChallenge.message}
                    </p>
                  )}
                </div>

                {/* Q4: Budget */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    4. What's your monthly marketing budget? *
                  </label>
                  <select {...register("monthlyBudget")} className="form-input">
                    <option value="">Select one...</option>
                    {budgets.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                  {errors.monthlyBudget && (
                    <p className="text-destructive text-xs mt-1">
                      {errors.monthlyBudget.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-5 h-auto text-base"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    "Get My Free Growth Plan →"
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  🔒 Your info is 100% confidential. No spam, ever.
                </p>
              </form>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/50 py-8">
          <div className="max-w-5xl mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} OneofOne Marketing. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
