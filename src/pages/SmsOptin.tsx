import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CheckCircle, MessageSquare, Shield } from "lucide-react";
import { SEOHead } from "@/components/seo/SEOHead";

const GHL_WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/IbBPe6rBCbWUsygEJSjo/webhook-trigger/c5e1a1a4-3bc8-42ce-97f9-6a8e2cfb6098";

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(10, "Enter a valid phone number").max(20),
  businessName: z.string().trim().min(1, "Business name is required").max(200),
});

type FormValues = z.infer<typeof formSchema>;

const SmsOptin = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", phone: "", businessName: "" },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      await fetch(GHL_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        mode: "no-cors",
      });
      setSubmitted(true);
    } catch {
      console.error("Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md space-y-4">
          <CheckCircle className="w-16 h-16 text-primary mx-auto" />
          <h2 className="text-2xl font-bold text-foreground">You're In! 🎉</h2>
          <p className="text-muted-foreground">
            You'll receive a text from our team shortly. Keep an eye on your phone!
          </p>
          <Button onClick={() => window.location.href = "/"} variant="outline">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="SMS Updates | OneofOne Marketing"
        description="Opt in to receive exclusive marketing tips and updates via SMS from OneofOne Marketing."
      />
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <MessageSquare className="w-4 h-4" />
              Exclusive SMS Updates
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              Get Insider Marketing Tips
            </h1>
            <p className="text-muted-foreground">
              Join contractors who get exclusive growth strategies delivered straight to their phone.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Smith" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="(555) 123-4567" type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Smith Roofing LLC" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Get SMS Updates →"}
                </Button>
              </form>
            </Form>

            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <Shield className="w-4 h-4 mt-0.5 shrink-0" />
              <p>
                By submitting, you agree to receive SMS messages from OneofOne Marketing. 
                Msg & data rates may apply. Reply STOP to unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmsOptin;
