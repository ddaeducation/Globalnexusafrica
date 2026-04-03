import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Services from "./pages/Services";
import Research from "./pages/Research";
import News from "./pages/News";
import Admissions from "./pages/Admissions";
import Apply from "./pages/Apply";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import ELearning from "./pages/ELearning";
import ELearningLogin from "./pages/ELearningLogin";
import ELearningSignup from "./pages/ELearningSignup";
import ELearningForgotPassword from "./pages/ELearningForgotPassword";
import ELearningResetPassword from "./pages/ELearningResetPassword";
import ELearningProfile from "./pages/ELearningProfile";
import WhyUs from "./pages/WhyUs";
import Career from "./pages/Career";
import Corporate from "./pages/Corporate";
import Collaborate from "./pages/Collaborate";
import FAQs from "./pages/FAQs";
import Donate from "./pages/Donate";
import CertificateVerify from "./pages/CertificateVerify";

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
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/research" element={<Research />} />
            <Route path="/news" element={<News />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<Layout><Donate /></Layout>} />
            <Route path="/elearning" element={<ELearning />} />
            <Route path="/elearning/login" element={<ELearningLogin />} />
            <Route path="/elearning/signup" element={<ELearningSignup />} />
            <Route path="/elearning/forgot-password" element={<ELearningForgotPassword />} />
            <Route path="/elearning/reset-password" element={<ELearningResetPassword />} />
            <Route path="/elearning/profile" element={<ELearningProfile />} />
            <Route path="/elearning/:courseSlug" element={<ELearning />} />
            <Route path="/why-us" element={<Layout><WhyUs /></Layout>} />
            <Route path="/career" element={<Layout><Career /></Layout>} />
            <Route path="/corporate" element={<Layout><Corporate /></Layout>} />
            <Route path="/collaborate" element={<Layout><Collaborate /></Layout>} />
            <Route path="/faqs" element={<Layout><FAQs /></Layout>} />
            <Route path="/certificate/verify" element={<CertificateVerify />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
