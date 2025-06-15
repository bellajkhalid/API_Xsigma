import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import BackHomeButton from "@/components/BackHomeButton";
import ModelSelector from "@/components/TrustedByQuants";
import PlatformStats from "@/components/PlatformStats";
import XSigmaLogo from "@/components/XSigmaLogo";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, ChevronRight } from "lucide-react";

import ZABRModel from "@/components/models/ZABRModel";
import HJMModel from "@/components/models/HJMModel";
import SVIModel from "@/components/models/SVIModel";
import AnalyticalSigmaVolatilityModel from "@/components/models/AnalyticalSigmaVolatilityModel";
import AnalyticalSigmaVolatilityCalibration from "@/components/models/AnalyticalSigmaVolatilityCalibration";
import AnalyticalSigmaVolatilityCalibrationMain from "@/components/models/AnalyticalSigmaVolatilityCalibrationMain";
import FXVolatilityModel from "@/components/models/FXVolatilityModel";
import HartmanWatsonDistributionModel from "@/components/models/HartmanWatsonDistributionModel";

const Dashboard = () => {
  const { getThemeClasses, isDark } = useTheme();
  const theme = getThemeClasses();
  const [activeModel, setActiveModel] = useState<string | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(true);
  const [expandedASV, setExpandedASV] = useState(false);
  const [expandedASVCalibration, setExpandedASVCalibration] = useState(false);
  const modelsContainerRef = useRef<HTMLDivElement>(null);

  const financialModels = [
    {
      id: 'zabr',
      name: 'ZABR Models',
      description: 'Zero Correlation SABR models with Classical, Mixture, and PDE implementations for volatility surface modeling.',
      icon: '📊',
      color: 'from-blue-500 to-blue-600',
      features: ['Classical ZABR Analytics', 'Mixture ZABR Models', 'PDE SABR Implementation']
    },
    {
      id: 'hjm',
      name: 'HJM Models',
      description: 'Heath-Jarrow-Morton interest rate models for yield curve dynamics and derivatives pricing.',
      icon: '📈',
      color: 'from-green-500 to-green-600',
      features: ['Multi-factor HJM', 'Yield Curve Construction', 'Interest Rate Derivatives']
    },
    {
      id: 'svi',
      name: 'SVI Models',
      description: 'Stochastic Volatility Inspired models for robust volatility surface parameterization.',
      icon: '🌊',
      color: 'from-purple-500 to-purple-600',
      features: ['Raw SVI Parameterization', 'Natural SVI Parameters', 'Arbitrage-free Surfaces']
    },
    {
      id: 'asv',
      name: 'ASV Models',
      description: 'Analytical Sigma Volatility models for efficient volatility surface calibration.',
      icon: '⚡',
      color: 'from-red-500 to-red-600',
      features: ['Fast Calibration', 'Analytical Solutions', 'Market Data Integration']
    },
    {
      id: 'asv-calibration',
      name: 'ASV Calibration',
      description: 'Interactive volatility model calibration with real-time parameter adjustment and 5 visualization graphs.',
      icon: '🔧',
      color: 'from-cyan-500 to-cyan-600',
      features: ['Interactive Calibration', 'Real-time Visualization', '5 Dynamic Graphs', 'Parameter Sliders']
    },
    {
      id: 'fx',
      name: 'FX Models',
      description: 'Lognormal FX models with stochastic interest rates for cross-currency derivatives.',
      icon: '💱',
      color: 'from-orange-500 to-orange-600',
      features: ['Lognormal FX Dynamics', 'Multi-currency HJM', 'FX Options Pricing']
    },
    {
      id: 'hartman-watson',
      name: 'Hartman Watson Distribution',
      description: 'Advanced distribution modeling with Gaussian quadrature for statistical analysis.',
      icon: '📈',
      color: 'from-teal-500 to-teal-600',
      features: ['Gaussian Quadrature', 'Distribution Modeling', 'Statistical Analysis']
    },
    {
      id: 'risk',
      name: 'Risk Measures',
      description: 'Comprehensive risk analytics including VaR, Expected Shortfall, and stress testing.',
      icon: '🛡️',
      color: 'from-indigo-500 to-indigo-600',
      features: ['Value at Risk (VaR)', 'Expected Shortfall', 'Stress Testing']
    }
  ];

  // ASV Sub-models
  const asvSubModels = [
    {
      id: 'asv-volatility-surface',
      name: 'Volatility Surface',
      icon: '📈',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'asv-sensitivity',
      name: 'Sensitivity',
      icon: '📊',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'asv-density',
      name: 'Density',
      icon: '🌊',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'asv-probability',
      name: 'Probability',
      icon: '📉',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  // ASV Calibration Sub-models
  const asvCalibrationSubModels = [
    {
      id: 'asv-calibration-volatility-asv',
      name: 'ASV Volatility',
      icon: '📈',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'asv-calibration-density',
      name: 'Density Function',
      icon: '🌊',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'asv-calibration-volatility-svi',
      name: 'SVI Volatility',
      icon: '⚡',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'asv-calibration-dynamic-asv',
      name: 'Dynamic ASV',
      icon: '🎛️',
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      id: 'asv-calibration-dynamic-svi',
      name: 'Dynamic SVI',
      icon: '🎚️',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const updateScrollIndicators = (container: HTMLDivElement) => {
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;

    setCanScrollUp(scrollTop > 0);
    setCanScrollDown(scrollTop < scrollHeight - clientHeight - 1);
    setScrollPosition(scrollTop);
  };

  const scrollUp = () => {
    if (modelsContainerRef.current) {
      const container = modelsContainerRef.current;
      const scrollAmount = 120; // Height of one model button + gap
      const newScrollTop = Math.max(0, container.scrollTop - scrollAmount);
      container.scrollTo({ top: newScrollTop, behavior: 'smooth' });
    }
  };

  const scrollDown = () => {
    if (modelsContainerRef.current) {
      const container = modelsContainerRef.current;
      const scrollAmount = 120; // Height of one model button + gap
      const maxScroll = container.scrollHeight - container.clientHeight;
      const newScrollTop = Math.min(maxScroll, container.scrollTop + scrollAmount);
      container.scrollTo({ top: newScrollTop, behavior: 'smooth' });
    }
  };

  // Function to get the correct title and description for active model
  const getActiveModelInfo = () => {
    // Check if it's an ASV sub-model
    const asvSubModel = asvSubModels.find(sub => sub.id === activeModel);
    if (asvSubModel) {
      return {
        name: asvSubModel.name,
        description: `Analytical Sigma Volatility - ${asvSubModel.name} analysis with real-time calculations and advanced visualizations.`
      };
    }

    // Check if it's an ASV Calibration sub-model
    const asvCalibrationSubModel = asvCalibrationSubModels.find(sub => sub.id === activeModel);
    if (asvCalibrationSubModel) {
      return {
        name: asvCalibrationSubModel.name,
        description: `ASV Calibration - ${asvCalibrationSubModel.name} with interactive parameter adjustment and real-time visualization.`
      };
    }

    // Otherwise, find in main financial models
    const mainModel = financialModels.find(m => m.id === activeModel);
    return {
      name: mainModel?.name || 'Unknown Model',
      description: mainModel?.description || 'Model description not available.'
    };
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme.background} ${theme.text}`} style={{
      background: isDark
        ? 'linear-gradient(135deg, #0c0c1d 0%, #161629 50%, #1a1a2e 100%)'
        : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)'
    }}>
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 opacity-40">
        <div className="absolute inset-0">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>
      </div>

      {/* Back Home Button with Theme Toggle */}
      <BackHomeButton />

      {/* Sidebar Navigation */}
      <div className={`fixed left-0 top-0 w-64 h-full ${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border-r z-50 flex flex-col py-6`}>
        <div className="px-6 mb-8">
          <XSigmaLogo />
        </div>

        {/* Dashboard Button */}
        <div className="px-4 mb-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              variant="ghost"
              size="sm"
              className={`w-full justify-start gap-3 h-12 px-4 transition-all duration-300 ${
                activeModel === null
                  ? 'bg-gradient-to-r from-primary to-[#22c55e] text-black shadow-lg shadow-primary/25'
                  : `${theme.text} hover:${isDark ? 'bg-white/10' : 'bg-black/10'} hover:shadow-md hover:shadow-${isDark ? 'white' : 'black'}/10`
              }`}
              onClick={() => setActiveModel(null)}
            >
              <span className="text-xl">📊</span>
              <span className="font-corporate font-medium">XSigma Models</span>
            </Button>
          </motion.div>
        </div>

        {/* Models Section Header */}
        <motion.div
          className="px-4 mb-2 flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className={`text-xs font-mono font-semibold ${theme.textMuted} uppercase tracking-wider`}>Models</p>

          {/* Scroll Controls */}
          <div className="flex flex-col gap-1">
            <Button
              variant="ghost"
              size="sm"
              className={`w-6 h-6 p-0 transition-colors ${
                canScrollUp
                  ? `${theme.textMuted} hover:${theme.text}`
                  : `${theme.textMuted} opacity-30 cursor-not-allowed`
              }`}
              onClick={scrollUp}
              disabled={!canScrollUp}
            >
              <ChevronUp className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`w-6 h-6 p-0 transition-colors ${
                canScrollDown
                  ? `${theme.textMuted} hover:${theme.text}`
                  : `${theme.textMuted} opacity-30 cursor-not-allowed`
              }`}
              onClick={scrollDown}
              disabled={!canScrollDown}
            >
              <ChevronDown className="w-3 h-3" />
            </Button>
          </div>
        </motion.div>

        {/* Scrollable Models Container */}
        <div className="flex-1 overflow-hidden px-4">
          <div
            ref={modelsContainerRef}
            className="h-full overflow-y-auto scrollbar-hide space-y-2 scroll-smooth"
            style={{
              maxHeight: 'calc(100vh - 280px)',
              scrollBehavior: 'smooth'
            }}
            onScroll={(e) => updateScrollIndicators(e.currentTarget)}
          >
            {financialModels.map((model, index) => (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {model.id === 'asv' ? (
                  // ASV Models with expansion
                  <div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`w-full justify-between gap-3 h-12 px-4 transition-all duration-300 ${
                        activeModel === model.id || expandedASV
                          ? 'bg-gradient-to-r from-primary to-[#22c55e] text-black shadow-lg shadow-primary/25'
                          : `${theme.text} hover:${isDark ? 'bg-white/10' : 'bg-black/10'} hover:shadow-md hover:shadow-${isDark ? 'white' : 'black'}/10`
                      }`}
                      onClick={() => {
                        setExpandedASV(!expandedASV);
                        if (!expandedASV) {
                          setActiveModel(model.id);
                        }
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{model.icon}</span>
                        <span className="font-corporate font-medium">{model.name}</span>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform duration-200 ${
                          expandedASV ? 'rotate-90' : ''
                        }`}
                      />
                    </Button>

                    {/* ASV Sub-models */}
                    {expandedASV && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-6 mt-2 space-y-1"
                      >
                        {asvSubModels.map((subModel, subIndex) => (
                          <motion.div
                            key={subModel.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: subIndex * 0.05 }}
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`w-full justify-start gap-3 h-10 px-3 text-sm transition-all duration-300 ${
                                activeModel === subModel.id
                                  ? 'bg-gradient-to-r from-primary/80 to-[#22c55e]/80 text-black shadow-md'
                                  : `${theme.textMuted} hover:${isDark ? 'bg-white/5' : 'bg-black/5'} hover:${theme.text}`
                              }`}
                              onClick={() => setActiveModel(subModel.id)}
                            >
                              <span className="text-base">{subModel.icon}</span>
                              <span className="font-clean font-medium">{subModel.name}</span>
                            </Button>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ) : model.id === 'asv-calibration' ? (
                  // ASV Calibration with expansion
                  <div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`w-full justify-between gap-3 h-12 px-4 transition-all duration-300 ${
                        activeModel === model.id || expandedASVCalibration
                          ? 'bg-gradient-to-r from-primary to-[#22c55e] text-black shadow-lg shadow-primary/25'
                          : `${theme.text} hover:${isDark ? 'bg-white/10' : 'bg-black/10'} hover:shadow-md hover:shadow-${isDark ? 'white' : 'black'}/10`
                      }`}
                      onClick={() => {
                        setExpandedASVCalibration(!expandedASVCalibration);
                        if (!expandedASVCalibration) {
                          setActiveModel(model.id);
                        }
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{model.icon}</span>
                        <span className="font-corporate font-medium">{model.name}</span>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform duration-200 ${
                          expandedASVCalibration ? 'rotate-90' : ''
                        }`}
                      />
                    </Button>

                    {/* ASV Calibration Sub-models */}
                    {expandedASVCalibration && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-6 mt-2 space-y-1"
                      >
                        {asvCalibrationSubModels.map((subModel, subIndex) => (
                          <motion.div
                            key={subModel.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: subIndex * 0.05 }}
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`w-full justify-start gap-3 h-10 px-3 text-sm transition-all duration-300 ${
                                activeModel === subModel.id
                                  ? 'bg-gradient-to-r from-primary/80 to-[#22c55e]/80 text-black shadow-md'
                                  : `${theme.textMuted} hover:${isDark ? 'bg-white/5' : 'bg-black/5'} hover:${theme.text}`
                              }`}
                              onClick={() => setActiveModel(subModel.id)}
                            >
                              <span className="text-base">{subModel.icon}</span>
                              <span className="font-clean font-medium">{subModel.name}</span>
                            </Button>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ) : (
                  // Regular models
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`w-full justify-start gap-3 h-12 px-4 transition-all duration-300 ${
                      activeModel === model.id
                        ? 'bg-gradient-to-r from-primary to-[#22c55e] text-black shadow-lg shadow-primary/25'
                        : `${theme.text} hover:${isDark ? 'bg-white/10' : 'bg-black/10'} hover:shadow-md hover:shadow-${isDark ? 'white' : 'black'}/10`
                    }`}
                    onClick={() => setActiveModel(model.id)}
                  >
                    <span className="text-xl">{model.icon}</span>
                    <span className="font-corporate font-medium">{model.name}</span>
                  </Button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">




        {/* Main Content Area */}
        {activeModel === null ? (
          // Dashboard Overview
          <motion.div
            className="space-y-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Model Selection Section */}
            <ModelSelector
              financialModels={financialModels}
              onModelSelect={setActiveModel}
            />

            {/* Platform Stats at the bottom */}
            <PlatformStats />
          </motion.div>
        ) : (
          // Model-specific content
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Model Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-corporate font-bold mb-4 bg-gradient-to-r from-primary to-[#22c55e] bg-clip-text text-transparent">
                {getActiveModelInfo().name}
              </h1>
              <p className={`${theme.textSecondary} text-lg font-clean`}>
                {getActiveModelInfo().description}
              </p>
            </motion.div>

            {/* Model Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {activeModel === 'zabr' && <ZABRModel />}
              {activeModel === 'hjm' && <HJMModel />}
              {activeModel === 'svi' && <SVIModel />}
              {activeModel === 'asv' && <AnalyticalSigmaVolatilityModel />}
              {activeModel === 'asv-volatility-surface' && <AnalyticalSigmaVolatilityModel outputType="volatility_surface" />}
              {activeModel === 'asv-sensitivity' && <AnalyticalSigmaVolatilityModel outputType="vols_plus_minus" />}
              {activeModel === 'asv-density' && <AnalyticalSigmaVolatilityModel outputType="density" />}
              {activeModel === 'asv-probability' && <AnalyticalSigmaVolatilityModel outputType="probability" />}
              {activeModel === 'asv-calibration' && <AnalyticalSigmaVolatilityCalibrationMain />}
              {activeModel === 'asv-calibration-volatility-asv' && <AnalyticalSigmaVolatilityCalibration computationType="volatility_asv" />}
              {activeModel === 'asv-calibration-density' && <AnalyticalSigmaVolatilityCalibration computationType="density" />}
              {activeModel === 'asv-calibration-volatility-svi' && <AnalyticalSigmaVolatilityCalibration computationType="volatility_svi" />}
              {activeModel === 'asv-calibration-dynamic-asv' && <AnalyticalSigmaVolatilityCalibration computationType="dynamic_asv" />}
              {activeModel === 'asv-calibration-dynamic-svi' && <AnalyticalSigmaVolatilityCalibration computationType="dynamic_svi" />}
              {activeModel === 'fx' && <FXVolatilityModel />}
              {activeModel === 'hartman-watson' && <HartmanWatsonDistributionModel />}
              {activeModel === 'risk' && (
                <div className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300`}>
                  <div className="text-center">
                    <motion.div
                      className="text-6xl mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                    >
                      {financialModels.find(m => m.id === activeModel)?.icon}
                    </motion.div>
                    <h2 className="text-3xl font-corporate font-bold mb-4 bg-gradient-to-r from-primary to-[#22c55e] bg-clip-text text-transparent">
                      {financialModels.find(m => m.id === activeModel)?.name}
                    </h2>
                    <p className={`${theme.textMuted} mb-8 text-lg font-clean`}>
                      Model interface will be implemented here
                    </p>
                    <motion.p
                      className={`${theme.textMuted} font-clean`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      Coming soon: Interactive model interface with real-time calculations
                    </motion.p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Ensure smooth scrolling and mouse wheel support */
        .scrollbar-hide {
          scroll-behavior: smooth;
          overscroll-behavior: contain;
        }

        /* Add subtle hover effect for scrollable area */
        .scrollbar-hide:hover {
          background: ${isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)'};
          border-radius: 8px;
          transition: background 0.2s ease;
        }

        .floating-shapes {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .shape {
          position: absolute;
          border-radius: 50%;
          animation: float 20s infinite ease-in-out;
          filter: blur(1px);
        }

        .shape-1 {
          width: 100px;
          height: 100px;
          background: ${isDark
            ? 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)'
            : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
          };
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 150px;
          height: 150px;
          background: ${isDark
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            : 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
          };
          top: 60%;
          right: 20%;
          animation-delay: -7s;
        }

        .shape-3 {
          width: 80px;
          height: 80px;
          background: ${isDark
            ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
            : 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
          };
          bottom: 30%;
          left: 30%;
          animation-delay: -14s;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
