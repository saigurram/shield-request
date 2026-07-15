import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppNav from "./components/AppNav";
import ScrollToTop from "./components/ScrollToTop";
import Landing from "./pages/Landing";
import Triage from "./pages/Triage";
import EvidenceChecklist from "./pages/EvidenceChecklist";
import LegalTemplate from "./pages/LegalTemplate";
import PostReportTracker from "./pages/PostReportTracker";
import Fallback from "./pages/Fallback";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex min-h-screen flex-col">
          <AppNav />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/triage" element={<Triage />} />
            <Route path="/evidence" element={<EvidenceChecklist />} />
            <Route path="/template" element={<LegalTemplate />} />
            <Route path="/tracker" element={<PostReportTracker />} />
            <Route path="/fallback" element={<Fallback />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
