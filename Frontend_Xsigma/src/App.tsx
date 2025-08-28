import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Blog from "./pages/Blog";
import Data from "./pages/solutions/Data";
import Analytics from "./pages/solutions/Analytics";
import PlotTool from "./pages/solutions/PlotTool";
import Portfolio from "./pages/solutions/Portfolio";
import Quant from "./pages/solutions/Quant";
import MarketModels from "./pages/solutions/MarketModels";
import PricingRisk from "./pages/solutions/PricingRisk";
import MonteCarlo from "./pages/solutions/MonteCarlo";
import Banking from "./pages/solutions/Banking";
import Dap from "./pages/solutions/Dap";
import XcfModel from "./pages/solutions/XcfModel";
import XvfModel from "./pages/solutions/XvfModel";
import CvaDva from "./pages/solutions/CvaDva";
import Greeks from "./pages/solutions/Greeks";
import RegisterInterest from "./pages/RegisterInterest";
import Account from "./pages/Account";
import Careers from "./pages/Careers";
import LinkedIn from "./pages/LinkedIn";
import LinkedInCallback from "./pages/LinkedInCallback";
import AuthTest from "./pages/AuthTest";
// Download pages
import CppLibraries from "./pages/downloads/CppLibraries";
import InstallationGuide from "./pages/downloads/InstallationGuide";
import WhitePapers from "./pages/downloads/WhitePapers";
import Publications from "./pages/downloads/Publications";
import CaseStudies from "./pages/downloads/CaseStudies";
import UserManual from "./pages/downloads/UserManual";
import DeveloperGuide from "./pages/downloads/DeveloperGuide";
import Tutorials from "./pages/downloads/Tutorials";
// Company pages
import About from "./pages/company/About";
import Leadership from "./pages/company/Leadership";
import Partners from "./pages/company/Partners";
import News from "./pages/company/News";
import Academic from "./pages/company/Academic";
import Integrations from "./pages/company/Integrations";
import PartnerProgram from "./pages/company/PartnerProgram";

// Support pages
import ApiDocumentation from "./pages/support/ApiDocumentation";
import XSigmaApiReference from "./pages/support/XSigmaApiReference";
import ComprehensiveDocumentation from "./pages/support/ComprehensiveDocumentation";
import Developers from "./pages/support/Developers";
import Integration from "./pages/support/Integration";
import Releases from "./pages/support/Releases";
import Technical from "./pages/support/Technical";
import Training from "./pages/support/Training";
import Professional from "./pages/support/Professional";
import Community from "./pages/support/Community";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <ThemeProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-background">
            <Toaster />
            <Sonner />
            <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:postId" element={<Blog />} />
              {/* Production-Ready Solution Routes */}
              <Route path="/solutions/xcf-model" element={<XcfModel />} />
              <Route path="/solutions/xvf-model" element={<XvfModel />} />
              <Route path="/solutions/cva-dva" element={<CvaDva />} />
              <Route path="/solutions/greeks" element={<Greeks />} />
              <Route path="/solutions/market-models" element={<MarketModels />} />
              <Route path="/solutions/pricing-risk" element={<PricingRisk />} />
              <Route path="/solutions/monte-carlo" element={<MonteCarlo />} />
              <Route path="/solutions/portfolio" element={<Portfolio />} />
              {/* Legacy Solution Routes */}
              <Route path="/solutions/data" element={<Data />} />
              <Route path="/solutions/analytics" element={<Analytics />} />
              <Route path="/solutions/plottool" element={<PlotTool />} />
              <Route path="/solutions/quant" element={<Quant />} />
              <Route path="/solutions/banking" element={<Banking />} />
              <Route path="/solutions/dap" element={<Dap />} />
              <Route path="/register-interest" element={<RegisterInterest />} />
              <Route path="/account" element={<Account />} />
              <Route path="/careers" element={<Careers />} />
              {/* Download routes */}
              <Route path="/downloads/cpp-libraries" element={<CppLibraries />} />
              <Route path="/downloads/installation-guide" element={<InstallationGuide />} />
              <Route path="/downloads/white-papers" element={<WhitePapers />} />
              <Route path="/downloads/publications" element={<Publications />} />
              <Route path="/downloads/case-studies" element={<CaseStudies />} />
              <Route path="/downloads/user-manual" element={<UserManual />} />
              <Route path="/downloads/developer-guide" element={<DeveloperGuide />} />
              <Route path="/downloads/tutorials" element={<Tutorials />} />
              {/* Company routes */}
              <Route path="/company/about" element={<About />} />
              <Route path="/company/leadership" element={<Leadership />} />
              <Route path="/company/partners" element={<Partners />} />
              <Route path="/company/news" element={<News />} />
              <Route path="/company/academic" element={<Academic />} />
              <Route path="/company/integrations" element={<Integrations />} />
              <Route path="/company/partner-program" element={<PartnerProgram />} />

              {/* Support routes */}
              <Route path="/support/api-documentation" element={<ApiDocumentation />} />
              <Route path="/support/api-reference" element={<XSigmaApiReference />} />
              <Route path="/support/documentation" element={<ComprehensiveDocumentation />} />
              <Route path="/support/developers" element={<Developers />} />
              <Route path="/support/integration" element={<Integration />} />
              <Route path="/support/releases" element={<Releases />} />
              <Route path="/support/technical" element={<Technical />} />
              <Route path="/support/training" element={<Training />} />
              <Route path="/support/professional" element={<Professional />} />
              <Route path="/support/community" element={<Community />} />
              <Route path="/linkedin" element={<LinkedIn />} />
              <Route path="/linkedin/callback" element={<LinkedInCallback />} />
              <Route path="/auth-test" element={<AuthTest />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </ThemeProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;