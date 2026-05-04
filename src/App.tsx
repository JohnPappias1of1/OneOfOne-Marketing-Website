import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Services from "./pages/Services";
import CaseStudies from "./pages/CaseStudies";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import ContractorsLP from "./pages/lp/Contractors";
import SmsOptin from "./pages/SmsOptin";
import ClientQuestionnaire from "./pages/ClientQuestionnaire";
import GhlContact from "./pages/GhlContact";
import BookNow from "./pages/BookNow";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminLeads from "./pages/admin/Leads";
import AdminAppointments from "./pages/admin/Appointments";
import AdminChatSessions from "./pages/admin/ChatSessions";
import AdminTeam from "./pages/admin/Team";
import AdminWebsitePreviews from "./pages/admin/WebsitePreviews";
import AdminGhlWebsitePreviews from "./pages/admin/GhlWebsitePreviews";
import WebsitePreview from "./pages/WebsitePreview";
import GhlWebsitePreview from "./pages/GhlWebsitePreview";
import { ChatbotWidget } from "./components/chatbot/ChatbotWidget";
import { GhlStickyWidget } from "./components/GhlStickyWidget";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
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
            <Route path="/website/:slug" element={<WebsitePreview />} />
            <Route path="/site-preview/:slug" element={<GhlWebsitePreview />} />
            <Route path="/lp/contractors" element={<ContractorsLP />} />
            <Route path="/sms-optin" element={<SmsOptin />} />
            <Route path="/client-questionnaire" element={<ClientQuestionnaire />} />
            <Route path="/ghl-contact" element={<GhlContact />} />
            <Route path="/book-now" element={<BookNow />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ChatbotWidget />
          <GhlStickyWidget />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
