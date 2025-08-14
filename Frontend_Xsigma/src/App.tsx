import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Blog from "./pages/Blog";
import Data from "./pages/solutions/Data";
import Analytics from "./pages/solutions/Analytics";
import PlotTool from "./pages/solutions/PlotTool";
import Portfolio from "./pages/solutions/Portfolio";
import Quant from "./pages/solutions/Quant";
import Banking from "./pages/solutions/Banking";
import Dap from "./pages/solutions/Dap";
import RegisterInterest from "./pages/RegisterInterest";
import Account from "./pages/Account";
import LinkedIn from "./pages/LinkedIn";
import LinkedInCallback from "./pages/LinkedInCallback";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
              {/* Solution placeholder routes */}
              <Route path="/solutions/data" element={<Data />} />
              <Route path="/solutions/analytics" element={<Analytics />} />
              <Route path="/solutions/plottool" element={<PlotTool />} />
              <Route path="/solutions/portfolio" element={<Portfolio />} />
              <Route path="/solutions/quant" element={<Quant />} />
              <Route path="/solutions/banking" element={<Banking />} />
              <Route path="/solutions/dap" element={<Dap />} />
              <Route path="/register-interest" element={<RegisterInterest />} />
              <Route path="/account" element={<Account />} />
              <Route path="/linkedin" element={<LinkedIn />} />
              <Route path="/linkedin/callback" element={<LinkedInCallback />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;