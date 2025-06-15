import { BarChart3, Cpu, Calculator, Zap } from "lucide-react";

export const features = [
  {
    title: "High-Performance Computing",
    description: "Vectorized computations, parallel processing via MPI, CUDA GPU acceleration, and multi-threading for optimal performance.",
    icon: <Cpu className="w-6 h-6" />,
    image: "/lovable-uploads/86329743-ee49-4f2e-96f7-50508436273d.png"
  },
  {
    title: "Quantitative Analysis",
    description: "Advanced mathematical modeling, financial instrument pricing, market data analysis, and Monte Carlo simulations.",
    icon: <Calculator className="w-6 h-6" />,
    image: "/lovable-uploads/7335619d-58a9-41ad-a233-f7826f56f3e9.png"
  },
  {
    title: "Modular Architecture",
    description: "Comprehensive suite with Analytics, Market, Math, PDE, Random, and Vectorization modules for flexible development.",
    icon: <BarChart3 className="w-6 h-6" />,
    image: "/lovable-uploads/b6436838-5c1a-419a-9cdc-1f9867df073d.png"
  },
  {
    title: "Python Integration",
    description: "Seamless Python bindings for the C++ core, enabling rapid prototyping and integration with data science workflows.",
    icon: <Zap className="w-6 h-6" />,
    image: "/lovable-uploads/79f2b901-8a4e-42a5-939f-fae0828e0aef.png"
  }
];