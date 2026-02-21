import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import HowItWorks from "./pages/HowItWorks";
import Privacy from "./pages/Privacy";
import GuidedDemo from "./pages/GuidedDemo";
import AgentDashboard from "./pages/agent/AgentDashboard";
import EnrollFarmer from "./pages/agent/EnrollFarmer";
import FarmerRecords from "./pages/agent/FarmerRecords";
import FarmerHome from "./pages/farmer/FarmerHome";
import FarmProfile from "./pages/farmer/FarmProfile";
import ConsentCenter from "./pages/farmer/ConsentCenter";
import ProviderDashboard from "./pages/provider/ProviderDashboard";
import EligibilityCheck from "./pages/provider/EligibilityCheck";
import IssueRequest from "./pages/provider/IssueRequest";
import QuickVerify from "./pages/verify/QuickVerify";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/demo" element={<GuidedDemo />} />
            <Route path="/agent" element={<AgentDashboard />} />
            <Route path="/agent/enroll" element={<EnrollFarmer />} />
            <Route path="/agent/records" element={<FarmerRecords />} />
            <Route path="/farmer" element={<FarmerHome />} />
            <Route path="/farmer/profile" element={<FarmProfile />} />
            <Route path="/farmer/consent" element={<ConsentCenter />} />
            <Route path="/provider" element={<ProviderDashboard />} />
            <Route path="/provider/eligibility" element={<EligibilityCheck />} />
            <Route path="/provider/request" element={<IssueRequest />} />
            <Route path="/verify" element={<QuickVerify />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
