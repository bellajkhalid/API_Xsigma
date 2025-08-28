import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Sparkles, TrendingUp, Shield, Zap, Globe, BarChart3, Users, Code, Database, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { useTheme } from "@/contexts/ThemeContext";
import AnimatedBackground from "@/components/AnimatedBackground";
import { authService } from "@/services/authService";

// Dynamic AI Chat Component - Optimized for Performance
const DynamicAIChat = React.memo(() => {
  const { isDark } = useTheme();
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState('');

  // Memoize phrases to prevent recreation on every render
  const aiPhrases = useMemo(() => [
    "💡 Ask about CVA/DVA calculations and counterparty risk analytics...",
    "📊 Discover our SABR volatility calibration and curve construction...",
    "⚡ Explore Monte Carlo simulation with enhanced AAD acceleration...",
    "🔬 Learn about multi-factor interest rate and FX modeling...",
    "🎯 Find out about regulatory capital and FRTB compliance...",
    "🌐 Understand our cross-asset derivative pricing engines...",
    "🔧 See how our Python APIs integrate with your risk systems...",
    "📈 Get insights on exotic option pricing and Greeks calculation..."
  ], []);

  // Optimize typing animation with proper cleanup
  useEffect(() => {
    let phraseInterval: NodeJS.Timeout;
    let typingInterval: NodeJS.Timeout;
    let timeoutId: NodeJS.Timeout;

    const startTyping = (phrase: string, isInitial = false) => {
      setIsTyping(true);
      setDisplayedText('');
      let charIndex = 0;

      typingInterval = setInterval(() => {
        if (charIndex < phrase.length) {
          setDisplayedText(phrase.substring(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);

          if (!isInitial) {
            timeoutId = setTimeout(() => {
              setCurrentPhrase((prev) => (prev + 1) % aiPhrases.length);
            }, 3000);
          }
        }
      }, 50);
    };

    // Initial typing
    startTyping(aiPhrases[0], true);

    // Set up phrase rotation after initial load
    const setupRotation = () => {
      phraseInterval = setInterval(() => {
        const nextPhrase = aiPhrases[(currentPhrase + 1) % aiPhrases.length];
        startTyping(nextPhrase);
      }, 6000);
    };

    const rotationTimeout = setTimeout(setupRotation, 4000);

    return () => {
      clearInterval(phraseInterval);
      clearInterval(typingInterval);
      clearTimeout(timeoutId);
      clearTimeout(rotationTimeout);
    };
  }, [aiPhrases, currentPhrase]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.02,
        y: -4,
        boxShadow: isDark
          ? "0 20px 40px rgba(59, 130, 246, 0.15), 0 0 0 1px rgba(59, 130, 246, 0.1)"
          : "0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(59, 130, 246, 0.1)"
      }}
      transition={{
        delay: 1.2,
        duration: 0.8,
        hover: { duration: 0.3, ease: "easeOut" }
      }}
      className={`mt-8 mx-auto max-w-2xl ${isDark ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-md rounded-2xl border ${isDark ? 'border-gray-700 hover:border-blue-500/50' : 'border-gray-200 hover:border-blue-400/50'} shadow-xl cursor-pointer transition-colors duration-300`}
      role="region"
      aria-label="AI Assistant Preview"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          // Handle keyboard interaction
          console.log('AI Chat activated via keyboard');
        }
      }}
    >
      <div className="p-6">
        <div className="flex items-start space-x-4">
          {/* Removed the blue MessageCircle icon */}

          <div className="flex-1 min-h-[60px]">
            <div className={`text-lg ${isDark ? 'text-gray-200' : 'text-gray-700'} leading-relaxed`}>
              {displayedText}
              {isTyping && (
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="ml-1 text-blue-500"
                >
                  |
                </motion.span>
              )}
            </div>
          </div>

          <motion.div
            animate={{
              y: [0, -5, 0],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            className="flex-shrink-0"
          >
            <Sparkles className={`w-5 h-5 ${isDark ? 'text-purple-400' : 'text-purple-500'}`} />
          </motion.div>
        </div>

        {/* Start Conversation Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="mt-4 flex justify-end"
        >
          <motion.div
            whileHover={{ scale: 1.05, x: 4 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Button
              variant="ghost"
              size="sm"
              className={`text-xs ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-500 hover:text-blue-600'} hover:bg-transparent relative overflow-hidden group`}
            >
              <span className="relative z-10">Start Conversation →</span>
              <motion.div
                className={`absolute inset-0 ${isDark ? 'bg-blue-500/10' : 'bg-blue-400/15'} rounded`}
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
});




const Index = () => {
  const { isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state for better UX
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className={`w-12 h-12 border-4 border-t-transparent rounded-full mx-auto mb-4 ${isDark ? 'border-white' : 'border-gray-900'}`}
          />
          <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-medium`}>
            Loading XSigma Analytics...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'} transition-colors duration-300`}>
      <Navigation />

      {/* Hero Section - Professional Quantitative Finance */}
      <section className="relative min-h-screen" role="banner" aria-label="XSigma Homepage Hero">
        {/* Animated Background */}
        <AnimatedBackground />

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 pt-32 pb-20 min-h-screen flex items-center">
            <header className="max-w-4xl mx-auto text-center">

              {/* Logo and Main Headline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mb-8"
              >
                {/* Hero Logo */}


                <motion.h1
                  className={`finance-heading text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight mb-8`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                >
                  <span className={`${isDark ? 'text-white' : 'xsigma-navy'} font-semibold xsigma-hero-segment transition-colors duration-300 ${isDark ? '' : 'xsigma-hero-light-glow'}`}>
                    <span className="xsigma-hero-emphasis">Production-Tested</span> Market Models
                  </span>,{' '}
                  <span
                    className={`${isDark ? 'xsigma-teal xsigma-hero-glow' : 'text-white'} font-bold xsigma-hero-segment relative transition-all duration-300`}
                    style={{
                      textShadow: isDark
                        ? '0 0 20px rgba(0, 191, 196, 0.4), 0 0 40px rgba(0, 191, 196, 0.2)'
                        : '0 2px 12px rgba(0, 0, 0, 0.5), 0 4px 24px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    Built by Practitioners
                  </span>,{' '}
                  <span className={`${isDark ? 'text-gray-200' : 'xsigma-navy'} font-medium xsigma-hero-segment transition-colors duration-300 ${isDark ? '' : 'xsigma-hero-light-glow'}`}>
                    Trusted by{' '}
                    <span
                      className={`xsigma-teal font-semibold xsigma-hero-emphasis transition-all duration-300`}
                      style={{
                        textShadow: isDark
                          ? '0 0 15px rgba(0, 191, 196, 0.4), 0 0 25px rgba(0, 191, 196, 0.2)'
                          : '0 1px 8px rgba(0, 191, 196, 0.3), 0 2px 16px rgba(0, 191, 196, 0.2)'
                      }}
                    >
                      Banks
                    </span>
                  </span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="mb-8"
                >
                  <div className={`flex flex-wrap justify-center gap-4 mb-6`}>
                    <span className={`finance-caption px-3 py-1 rounded-full ${isDark ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'} border ${isDark ? 'border-blue-800' : 'border-blue-200'}`}>
                      Production-Tested
                    </span>
                    <span className={`finance-caption px-3 py-1 rounded-full ${isDark ? 'bg-teal-900/30 text-teal-300' : 'bg-teal-100 text-teal-700'} border ${isDark ? 'border-teal-800' : 'border-teal-200'}`}>
                      Bank-Grade
                    </span>
                    <span className={`finance-caption px-3 py-1 rounded-full ${isDark ? 'bg-gray-800/50 text-gray-300' : 'bg-gray-100 text-gray-700'} border ${isDark ? 'border-gray-700' : 'border-gray-300'}`}>
                      Practitioner-Built
                    </span>
                  </div>
                  <p className={`finance-body text-base md:text-lg lg:text-xl ${isDark ? 'text-gray-200' : 'text-gray-700'} max-w-5xl mx-auto leading-relaxed`}>
                    Enterprise-grade quantitative analytics delivering curve construction, volatility calibration, and Monte Carlo simulation — powered by models deployed in tier-1 bank trading desks, accelerated by our proprietary <span className="xsigma-teal font-medium">enhanced AAD technology</span>
                  </p>
                </motion.div>

              </motion.div>

              {/* Dynamic AI Chat */}
              <DynamicAIChat />

              {/* Professional CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 mt-16"
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <Button
                    onClick={() => window.location.href = '#aad-framework'}
                    size="lg"
                    className={`finance-body px-10 py-4 text-base font-semibold ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-xsigma-navy text-white hover:bg-opacity-90'} rounded-none transition-all duration-300 shadow-lg relative overflow-hidden group border-0`}
                  >
                    <span className="relative z-10 tracking-wide">Discover AAD Framework</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <Button
                    onClick={() => window.location.href = '#contact'}
                    size="lg"
                    variant="outline"
                    className={`finance-body px-8 py-4 text-base font-semibold ${isDark ? 'border-white text-white hover:bg-white hover:text-black' : 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'} rounded-lg transition-colors shadow-lg backdrop-blur-sm relative overflow-hidden group`}
                  >
                    <span className="relative z-10">Request Demo</span>
                    <motion.div
                      className={`absolute inset-0 ${isDark ? 'bg-blue-500/10' : 'bg-blue-500/5'}`}
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </motion.div>
              </motion.div>
            </header>
          </div>
      </section>

      {/* About XSigma / AAD Framework Section - Professional Clean Background */}
      <section id="aad-framework" className={`relative py-24 ${isDark ? 'bg-gray-900' : 'bg-white'} aad-framework-section gpu-accelerated border-t ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>


        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-20 items-center">

              {/* AAD Framework Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <motion.div
                  className={`inline-flex items-center ${isDark ? 'bg-gray-800 border-gray-600' : 'bg-blue-50 border-blue-200'} backdrop-blur-md border rounded-full px-5 py-2 mb-8`}
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(59, 130, 246, 0.2)',
                      '0 0 30px rgba(59, 130, 246, 0.4)',
                      '0 0 20px rgba(59, 130, 246, 0.2)'
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <motion.div
                    className="w-2 h-2 bg-blue-500 rounded-full mr-2"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <span className={`${isDark ? 'text-white' : 'text-blue-700'} font-semibold text-sm uppercase tracking-wider`}>
                    Enhanced AAD Technology
                  </span>
                </motion.div>

                <motion.h2
                  className={`finance-heading text-4xl md:text-5xl lg:text-6xl leading-tight ${isDark ? 'text-white' : 'text-gray-900'} mb-8`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Proprietary <span className="xsigma-teal">Enhanced AAD</span><br />
                  <span className="text-3xl md:text-4xl lg:text-5xl font-normal">Accelerating Production Models</span>
                </motion.h2>

                <motion.div
                  className="grid md:grid-cols-3 gap-6 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-blue-50'} border ${isDark ? 'border-gray-700' : 'border-blue-200'}`}>
                    <h4 className={`finance-subheading text-lg ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>Faster Calibration</h4>
                    <p className={`finance-body text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Enhanced AAD accelerates model calibration by orders of magnitude compared to finite differences
                    </p>
                  </div>
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-teal-50'} border ${isDark ? 'border-gray-700' : 'border-teal-200'}`}>
                    <h4 className={`finance-subheading text-lg ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>Accurate Sensitivities</h4>
                    <p className={`finance-body text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Machine-precision Greeks and risk sensitivities for all model parameters and market inputs
                    </p>
                  </div>
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <h4 className={`finance-subheading text-lg ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>Scalable Analytics</h4>
                    <p className={`finance-body text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Efficient computation of portfolio-level risk metrics and regulatory capital requirements
                    </p>
                  </div>
                </motion.div>

                <motion.p
                  className={`finance-body text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed mb-10`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Our enhanced AAD technology powers production-tested market models already deployed in bank trading desks.
                  The orbital diagram below showcases the seamless integration of <strong>Calibration, Pricing, Risk Management,
                  PDE Solvers, and Monte Carlo Simulation</strong> — all accelerated by our proprietary algorithmic automatic differentiation.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <motion.button
                    onClick={() => window.location.href = '#offerings'}
                    className={`inline-flex items-center ${isDark ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white' : 'bg-gradient-to-r from-gray-900 to-gray-800 text-white'} px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 relative overflow-hidden shadow-lg`}
                    whileHover={{
                      y: -2,
                      boxShadow: isDark
                        ? '0 15px 35px rgba(59, 130, 246, 0.4)'
                        : '0 15px 35px rgba(0, 0, 0, 0.2)'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">Explore Our Solutions</span>
                    <motion.div
                      className="ml-3 relative z-10"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Enhanced AAD Framework Diagram */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex justify-center items-center"
              >
                <div className="relative w-[500px] h-[500px] max-w-full flex items-center justify-center lg:w-[500px] lg:h-[500px] md:w-[400px] md:h-[400px] sm:w-[350px] sm:h-[350px] aad-diagram">
                  {/* Central Core - Static */}
                  <div
                    className={`absolute w-32 h-32 lg:w-32 lg:h-32 md:w-28 md:h-28 sm:w-24 sm:h-24 ${isDark ? 'bg-gradient-to-br from-blue-900 to-purple-900' : 'bg-gradient-to-br from-gray-900 to-gray-800'} rounded-full flex flex-col items-center justify-center border-4 ${isDark ? 'border-white border-opacity-10' : 'border-gray-200'} z-20 aad-core gpu-accelerated`}
                    style={{
                      boxShadow: isDark
                        ? '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 60px rgba(59, 130, 246, 0.4), inset 0 2px 10px rgba(255, 255, 255, 0.2)'
                        : '0 20px 40px rgba(0, 0, 0, 0.15), 0 0 30px rgba(59, 130, 246, 0.2), inset 0 2px 10px rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <h3 className="text-white text-3xl lg:text-3xl md:text-2xl sm:text-xl font-extrabold tracking-wider mb-1" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}>
                      AAD
                    </h3>
                    <span className="text-blue-400 text-sm lg:text-sm md:text-xs sm:text-xs font-semibold uppercase tracking-wide">Core</span>
                  </div>

                  {/* Orbital Modules - True Mobile Animation like HTML version */}
                  {[
                    { name: 'χ', label: 'CALIB', color: 'from-blue-600 to-blue-800', title: 'Calibration', shadow: 'rgba(59, 130, 246, 0.3)', orbitClass: 'orbit-module-1' },
                    { name: 'Σ', label: 'PRICE', color: 'from-green-600 to-green-800', title: 'Pricing', shadow: 'rgba(16, 185, 129, 0.3)', orbitClass: 'orbit-module-2' },
                    { name: 'API', label: 'INTEG', color: 'from-purple-600 to-purple-800', title: 'API Integration', shadow: 'rgba(139, 92, 246, 0.3)', orbitClass: 'orbit-module-3' },
                    { name: '⚡', label: 'RISK', color: 'from-green-600 to-green-800', title: 'Risk Management', shadow: 'rgba(16, 185, 129, 0.3)', orbitClass: 'orbit-module-4' },
                    { name: '∂', label: 'PDE', color: 'from-blue-600 to-blue-800', title: 'PDE Solvers', shadow: 'rgba(59, 130, 246, 0.3)', orbitClass: 'orbit-module-5' },
                    { name: 'MC', label: 'SIM', color: 'from-green-600 to-green-800', title: 'Monte Carlo Simulation', shadow: 'rgba(16, 185, 129, 0.3)', orbitClass: 'orbit-module-6' }
                  ].map((module) => (
                    <div
                      key={module.name}
                      className={`absolute top-1/2 left-1/2 ${module.orbitClass} gpu-accelerated`}
                      style={{
                        marginLeft: '-40px',
                        marginTop: '-40px'
                      }}
                    >
                      <motion.div
                        className={`w-20 h-20 lg:w-20 lg:h-20 md:w-16 md:h-16 sm:w-14 sm:h-14 bg-gradient-to-br ${module.color} rounded-full flex flex-col items-center justify-center cursor-pointer border-2 border-white border-opacity-20 backdrop-blur-md aad-module`}
                        style={{
                          boxShadow: `0 10px 25px ${module.shadow}`
                        }}
                        whileHover={{
                          scale: 1.2,
                          zIndex: 25,
                          filter: 'brightness(1.2)',
                          boxShadow: `0 20px 40px ${module.shadow.replace('0.3', '0.6')}`
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          // Interactive click functionality
                          console.log(`Exploring ${module.title}...`);
                          // You can add navigation or modal functionality here
                          // Example: window.location.href = `#${module.name.toLowerCase()}`;
                        }}
                        title={`Click to explore ${module.title}`}
                      >
                        <div className="text-white text-lg lg:text-lg md:text-base sm:text-sm font-bold mb-1" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)' }}>
                          {module.name}
                        </div>
                        <div className="text-white text-xs lg:text-xs md:text-xs sm:text-xs font-semibold uppercase tracking-wide opacity-90">
                          {module.label}
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Offerings Grid Section */}
      <section id="offerings" className={`${isDark ? 'bg-black' : 'bg-white'} py-20`}>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">

            {/* Professional Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <motion.p
                className={`finance-caption ${isDark ? 'text-blue-400' : 'text-blue-600'} mb-4`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Production-Ready Solutions
              </motion.p>
              <h2 className={`finance-heading text-3xl md:text-4xl lg:text-5xl ${isDark ? 'text-white' : 'text-gray-900'} mb-8`}>
                Market Models & Risk Engines
              </h2>
              <p className={`finance-body text-lg md:text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-4xl mx-auto leading-relaxed`}>
                Practitioner-grade curve and volatility frameworks, pricing engines, and Monte Carlo platforms —
                all powered by models already implemented in production trading desks
              </p>
            </motion.div>

            {/* Solutions Grid - 2x2 Layout */}
            <div className="grid md:grid-cols-2 gap-8">

              {/* Market Construction & Calibration */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className={`${isDark ? 'bg-gray-900' : 'bg-gray-50'} p-8 rounded-xl shadow-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="w-16 h-16 bg-blue-500 bg-opacity-10 rounded-lg flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className={`text-xl md:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4 leading-tight`}>
                  Market Construction & Calibration
                </h3>
                <ul className={`${isDark ? 'text-gray-300' : 'text-gray-600'} space-y-3 mb-6 text-sm md:text-base leading-relaxed`}>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Advanced interest rate curve construction and bootstrapping
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    SABR and stochastic volatility model calibration
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Multi-currency yield curve framework
                  </li>
                </ul>
                <Button
                  onClick={() => window.location.href = '#contact'}
                  variant="ghost"
                  className={`p-0 h-auto ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} font-semibold`}
                >
                  Learn More <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </motion.div>

              {/* Instrument Pricing & Risk */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`${isDark ? 'bg-gray-900' : 'bg-gray-50'} p-8 rounded-xl shadow-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="w-16 h-16 bg-green-500 bg-opacity-10 rounded-lg flex items-center justify-center mb-6">
                  <BarChart3 className="w-8 h-8 text-green-500" />
                </div>
                <h3 className={`text-xl md:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4 leading-tight`}>
                  Instrument Pricing & Risk
                </h3>
                <ul className={`${isDark ? 'text-gray-300' : 'text-gray-600'} space-y-3 mb-6 text-sm md:text-base leading-relaxed`}>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Vanilla and exotic option pricing engines
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Real-time Greeks calculation and risk sensitivities
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Portfolio-level risk aggregation and reporting
                  </li>
                </ul>
                <Button
                  onClick={() => window.location.href = '#contact'}
                  variant="ghost"
                  className={`p-0 h-auto ${isDark ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-700'} font-semibold`}
                >
                  Learn More <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </motion.div>

              {/* Complex Derivatives & XVA */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className={`${isDark ? 'bg-gray-900' : 'bg-gray-50'} p-8 rounded-xl shadow-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="w-16 h-16 bg-purple-500 bg-opacity-10 rounded-lg flex items-center justify-center mb-6">
                  <Database className="w-8 h-8 text-purple-500" />
                </div>
                <h3 className={`text-xl md:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4 leading-tight`}>
                  Complex Derivatives & XVA
                </h3>
                <ul className={`${isDark ? 'text-gray-300' : 'text-gray-600'} space-y-3 mb-6 text-sm md:text-base leading-relaxed`}>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    High-performance PDE solvers for exotic derivatives
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Monte Carlo simulation with variance reduction
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Comprehensive XVA calculations (CVA, DVA, FVA, KVA)
                  </li>
                </ul>
                <Button
                  onClick={() => window.location.href = '#contact'}
                  variant="ghost"
                  className={`p-0 h-auto ${isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'} font-semibold`}
                >
                  Learn More <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </motion.div>

              {/* Multi-Factor Simulation */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className={`${isDark ? 'bg-gray-900' : 'bg-gray-50'} p-8 rounded-xl shadow-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="w-16 h-16 bg-orange-500 bg-opacity-10 rounded-lg flex items-center justify-center mb-6">
                  <Cpu className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className={`text-xl md:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4 leading-tight`}>
                  Multi-Factor Simulation
                </h3>
                <ul className={`${isDark ? 'text-gray-300' : 'text-gray-600'} space-y-3 mb-6 text-sm md:text-base leading-relaxed`}>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Unified interest rates, FX, and equity modeling
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Inflation and commodity derivative pricing
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Cross-asset correlation and dependency modeling
                  </li>
                </ul>
                <Button
                  onClick={() => window.location.href = '#contact'}
                  variant="ghost"
                  className={`p-0 h-auto ${isDark ? 'text-orange-400 hover:text-orange-300' : 'text-orange-600 hover:text-orange-700'} font-semibold`}
                >
                  Learn More <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose XSigma Section */}
      <section className={`${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-20`}>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">

            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className={`finance-heading text-2xl md:text-3xl lg:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>
                Why Choose XSigma?
              </h2>
              <p className={`finance-body text-base md:text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto leading-relaxed`}>
                Built by quants, for quants. Experience the difference of practitioner-developed solutions.
              </p>
            </motion.div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

              {/* Python-First APIs */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className={`${isDark ? 'bg-black' : 'bg-white'} p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="w-16 h-16 bg-blue-500 bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className={`finance-heading text-base md:text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-3 leading-tight`}>
                  Python-First APIs
                </h3>
                <p className={`finance-body ${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm md:text-base leading-relaxed`}>
                  Intuitive Python interfaces designed for rapid development and seamless integration with your existing workflows.
                </p>
              </motion.div>

              {/* Multi-Asset Integration */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`${isDark ? 'bg-black' : 'bg-white'} p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="w-16 h-16 bg-green-500 bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-green-500" />
                </div>
                <h3 className={`finance-heading text-base md:text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-3 leading-tight`}>
                  Multi-Asset Integration
                </h3>
                <p className={`finance-body ${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm md:text-base leading-relaxed`}>
                  Unified framework spanning interest rates, FX, equities, commodities, and inflation derivatives.
                </p>
              </motion.div>

              {/* High-Performance Engine */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className={`${isDark ? 'bg-black' : 'bg-white'} p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="w-16 h-16 bg-purple-500 bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-purple-500" />
                </div>
                <h3 className={`finance-heading text-base md:text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-3 leading-tight`}>
                  High-Performance Engine
                </h3>
                <p className={`finance-body ${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm md:text-base leading-relaxed`}>
                  C++/Rust computational backend delivering institutional-grade performance without compromising ease of use.
                </p>
              </motion.div>

              {/* Practitioner-Trusted */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className={`${isDark ? 'bg-black' : 'bg-white'} p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="w-16 h-16 bg-orange-500 bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className={`finance-heading text-base md:text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-3 leading-tight`}>
                  Practitioner-Trusted
                </h3>
                <p className={`finance-body ${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm md:text-base leading-relaxed`}>
                  Developed by industry experts with decades of experience in quantitative finance and risk management.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact/CTA Footer Section */}
      <section id="contact" className={`${isDark ? 'bg-black' : 'bg-white'} py-20`}>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">

              {/* Demo Request Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6 leading-tight`}>
                  Ready to Transform Your Quant Operations?
                </h2>
                <p className={`text-lg md:text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-8 leading-relaxed`}>
                  Schedule a personalized demo and discover how XSigma can accelerate your quantitative finance workflows.
                </p>

                <form
                  className="space-y-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    // Handle form submission
                    console.log('Demo request submitted');
                  }}
                  noValidate
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="fullName"
                        className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                      >
                        Full Name *
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        aria-required="true"
                        className={`w-full px-4 py-3 ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'} border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                      >
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        aria-required="true"
                        className={`w-full px-4 py-3 ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'} border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Company
                    </label>
                    <input
                      type="text"
                      className={`w-full px-4 py-3 ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'} border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="Your Financial Institution"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Message
                    </label>
                    <textarea
                      rows={4}
                      className={`w-full px-4 py-3 ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'} border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="Tell us about your quantitative finance requirements..."
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className={`w-full px-6 py-4 text-lg font-semibold ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'} rounded-lg transition-colors`}
                  >
                    Request Demo
                  </Button>
                </form>
              </motion.div>

              {/* Newsletter & Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="mb-12">
                  <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'} mb-4`}>
                    Stay Updated
                  </h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
                    Subscribe to our newsletter for the latest insights in quantitative finance and XSigma updates.
                  </p>

                  <form className="flex gap-4">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className={`flex-1 px-4 py-3 ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'} border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                    <Button
                      type="submit"
                      className={`px-6 py-3 font-semibold ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'} rounded-lg`}
                    >
                      Subscribe
                    </Button>
                  </form>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-black'}`}>
                      Connect With Us
                    </h4>
                    <div className="flex space-x-4">
                      <a href="#" className="w-12 h-12 bg-blue-500 bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors">
                        <Users className="w-6 h-6 text-blue-500" />
                      </a>
                      <a href="#" className="w-12 h-12 bg-blue-500 bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors">
                        <Code className="w-6 h-6 text-blue-500" />
                      </a>
                      <a href="#" className="w-12 h-12 bg-blue-500 bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors">
                        <MessageCircle className="w-6 h-6 text-blue-500" />
                      </a>
                    </div>
                  </div>

                  <div>
                    <h4 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-black'}`}>
                      Contact Information
                    </h4>
                    <div className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      <p>📧 contact@xsigma.com</p>
                      <p>📞 +1 (555) 123-4567</p>
                      <p>📍 New York, NY | London, UK</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-300'} mt-12 pt-8 text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <p>&copy; 2024 XSigma - Advanced Quantitative Finance Solutions. All rights reserved.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
