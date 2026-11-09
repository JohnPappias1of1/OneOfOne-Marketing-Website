import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { PaymentTestModeBanner } from "./components/PaymentTestModeBanner";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Services = lazy(() => import("./pages/Services"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Blog = lazy(() => import("./pages/Blog"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const ContractorsLP = lazy(() => import("./pages/lp/Contractors"));
const SmsOptin = lazy(() => import("./pages/SmsOptin"));
const ClientQuestionnaire = lazy(() => import("./pages/ClientQuestionnaire"));
const GhlContact = lazy(() => import("./pages/GhlContact"));
const BookNow = lazy(() => import("./pages/BookNow"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminLeads = lazy(() => import("./pages/admin/Leads"));
const AdminAppointments = lazy(() => import("./pages/admin/Appointments"));
const AdminChatSessions = lazy(() => import("./pages/admin/ChatSessions"));
const AdminTeam = lazy(() => import("./pages/admin/Team"));
const AdminWebsitePreviews = lazy(() => import("./pages/admin/WebsitePreviews"));
const AdminGhlWebsitePreviews = lazy(() => import("./pages/admin/GhlWebsitePreviews"));
const AdminPrivatePreviews = lazy(() => import("./pages/admin/PrivatePreviews"));
const WebsitePreview = lazy(() => import("./pages/WebsitePreview"));
const GhlWebsitePreview = lazy(() => import("./pages/GhlWebsitePreview"));
const OurWork = lazy(() => import("./pages/OurWork"));
const CheckoutReturn = lazy(() => import("./pages/CheckoutReturn"));
const ClientTestimonial = lazy(() => import("./pages/ClientTestimonial"));
const ChatbotWidget = lazy(() =>
  import("./components/chatbot/ChatbotWidget").then((m) => ({ default: m.ChatbotWidget }))
);
const GhlStickyWidget = lazy(() =>
  import("./components/GhlStickyWidget").then((m) => ({ default: m.GhlStickyWidget }))
);

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
  </div>
);

const GlobalWidgets = () => {
  const { pathname } = useLocation();

  // Keep the shared testimonial page focused and avoid loading unused integrations.
  if (pathname === "/client-testimonial") return null;

  return (
    <Suspense fallback={null}>
      <ChatbotWidget />
      <GhlStickyWidget />
    </Suspense>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <PaymentTestModeBanner />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/our-work" element={<OurWork />} />
              <Route path="/about" element={<Navigate to="/book-now" replace />} />
              <Route path="/contact" element={<Navigate to="/book-now" replace />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/leads" element={<AdminLeads />} />
              <Route path="/admin/appointments" element={<AdminAppointments />} />
              <Route path="/admin/chats" element={<AdminChatSessions />} />
              <Route path="/admin/team" element={<AdminTeam />} />
              <Route path="/admin/website-previews" element={<AdminWebsitePreviews />} />
              <Route path="/admin/ghl-previews" element={<AdminGhlWebsitePreviews />} />
              <Route path="/admin/private-previews" element={<AdminPrivatePreviews />} />
              <Route path="/website/:slug" element={<WebsitePreview />} />
              <Route path="/site-preview/:slug" element={<GhlWebsitePreview />} />
              <Route path="/lp/contractors" element={<ContractorsLP />} />
              <Route path="/sms-optin" element={<SmsOptin />} />
              <Route path="/client-questionnaire" element={<ClientQuestionnaire />} />
              <Route path="/ghl-contact" element={<GhlContact />} />
              <Route path="/book-now" element={<BookNow />} />
              <Route path="/checkout/return" element={<CheckoutReturn />} />
              <Route path="/client-testimonial" element={<ClientTestimonial />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <GlobalWidgets />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
