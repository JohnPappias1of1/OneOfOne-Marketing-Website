import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  businessName: z.string().min(1, "Business name is required"),
  website: z.string().url("Please enter a valid URL").or(z.literal("")),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  monthlyAdSpend: z.string().optional(),
  services: z.array(z.string()).min(1, "Please select at least one service"),
  businessType: z.string().optional(),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const adSpendOptions = [
  "Not currently running ads",
  "$0 - $1,000/month",
  "$1,000 - $5,000/month",
  "$5,000 - $10,000/month",
  "$10,000 - $25,000/month",
  "$25,000+/month",
];

const serviceOptions = [
  "Optimized Website",
  "Google SEO",
  "Facebook/Instagram Ads",
  "Lead Gen Mobile App",
  "AI Receptionist",
  "Full Growth System",
];

const businessTypes = [
  "Local Service Business",
  "E-commerce / DTC",
  "Agency / B2B",
  "Other",
];

interface LeadCaptureFormProps {
  variant?: "full" | "compact";
  className?: string;
}

export function LeadCaptureForm({ variant = "full", className = "" }: LeadCaptureFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      services: [],
    },
  });

  const selectedServices = watch("services") || [];

  const toggleService = (service: string) => {
    const current = selectedServices;
    const updated = current.includes(service)
      ? current.filter((s) => s !== service)
      : [...current, service];
    setValue("services", updated);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Placeholder for webhook/CRM integration
      console.log("Form submitted:", data);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      toast({
        title: "Application Received!",
        description: "We'll be in touch within 24 hours to schedule your strategy call.",
      });
      
      reset();
      
      // Redirect to scheduling page after delay
      setTimeout(() => {
        // window.location.href = "/schedule"; // Placeholder
      }, 2000);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={`glass-card p-8 text-center ${className}`}>
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <h3 className="font-display text-xl font-bold mb-2">Application Received!</h3>
        <p className="text-muted-foreground">
          We'll review your information and reach out within 24 hours to schedule your free strategy call.
        </p>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className={`space-y-4 ${className}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input
              {...register("firstName")}
              placeholder="First Name *"
              className="form-input"
            />
            {errors.firstName && (
              <p className="text-destructive text-xs mt-1">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <input
              {...register("email")}
              type="email"
              placeholder="Email *"
              className="form-input"
            />
            {errors.email && (
              <p className="text-destructive text-xs mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>
        <div>
          <input
            {...register("phone")}
            type="tel"
            placeholder="Phone *"
            className="form-input"
          />
          {errors.phone && (
            <p className="text-destructive text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Submitting...
            </>
          ) : (
            "Get Your Free Audit"
          )}
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          No spam. Unsubscribe anytime.
        </p>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-6 ${className}`}>
      {/* Name Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">First Name *</label>
          <input {...register("firstName")} className="form-input" />
          {errors.firstName && (
            <p className="text-destructive text-xs mt-1">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Last Name *</label>
          <input {...register("lastName")} className="form-input" />
          {errors.lastName && (
            <p className="text-destructive text-xs mt-1">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      {/* Business Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Business Name *</label>
          <input {...register("businessName")} className="form-input" />
          {errors.businessName && (
            <p className="text-destructive text-xs mt-1">{errors.businessName.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Website</label>
          <input
            {...register("website")}
            placeholder="https://"
            className="form-input"
          />
          {errors.website && (
            <p className="text-destructive text-xs mt-1">{errors.website.message}</p>
          )}
        </div>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Email *</label>
          <input {...register("email")} type="email" className="form-input" />
          {errors.email && (
            <p className="text-destructive text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Phone *</label>
          <input {...register("phone")} type="tel" className="form-input" />
          {errors.phone && (
            <p className="text-destructive text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>
      </div>

      {/* Business Type */}
      <div>
        <label className="block text-sm font-medium mb-2">What best describes you?</label>
        <div className="grid grid-cols-2 gap-2">
          {businessTypes.map((type) => (
            <label
              key={type}
              className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${
                watch("businessType") === type
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <input
                type="radio"
                value={type}
                {...register("businessType")}
                className="sr-only"
              />
              <span className="text-sm">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Monthly Ad Spend */}
      <div>
        <label className="block text-sm font-medium mb-2">Monthly Ad Spend</label>
        <select {...register("monthlyAdSpend")} className="form-input">
          <option value="">Select an option</option>
          {adSpendOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Services */}
      <div>
        <label className="block text-sm font-medium mb-2">What do you need help with? *</label>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
          {serviceOptions.map((service) => (
            <button
              key={service}
              type="button"
              onClick={() => toggleService(service)}
              className={`p-3 rounded-lg border text-sm text-left transition-all ${
                selectedServices.includes(service)
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border hover:border-primary/50 text-muted-foreground"
              }`}
            >
              {service}
            </button>
          ))}
        </div>
        {errors.services && (
          <p className="text-destructive text-xs mt-1">{errors.services.message}</p>
        )}
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium mb-2">Anything else we should know?</label>
        <textarea
          {...register("notes")}
          rows={4}
          className="form-input resize-none"
          placeholder="Tell us about your goals, challenges, or questions..."
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full py-4 text-base"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Submitting...
          </>
        ) : (
          "Book Your Free Strategy Call"
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        By submitting, you agree to our Privacy Policy. We'll never share your information.
      </p>
    </form>
  );
}
