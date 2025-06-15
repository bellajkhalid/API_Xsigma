
import { motion } from "framer-motion";
import { ArrowRight, Command, BarChart3, TrendingUp, Zap, Shield, Cpu, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { PricingSection } from "@/components/pricing/PricingSection";
import LogoCarousel from "@/components/LogoCarousel";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/contexts/ThemeContext";
import ThemeContainer, { ThemeCard, ThemeGlass } from "@/components/ui/ThemeContainer";

const Index = () => {
  const { isDark, getThemeClasses } = useTheme();
  const theme = getThemeClasses();

  return (
    <div className={`min-h-screen ${theme.background} ${theme.text} transition-colors duration-300`}>
      <ThemeToggle />
      <Navigation />
      
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative container px-4 pt-40 pb-20 text-center"
      >
        {/* Background */}
        <div
          className={`absolute inset-0 -z-10 ${isDark ? 'bg-[#0A0A0A]' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6 ${theme.cardBg} ${theme.borderColor} border backdrop-blur-sm`}
        >
          <span className="text-sm font-mono font-medium text-gray-400 uppercase tracking-wider">
            Advanced Quantitative Finance Platform
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-7xl font-corporate font-bold mb-6 tracking-tight text-center"
        >
          <div className="mb-2">
            <div className={`flicker-glow ${isDark ? 'text-outline-dark' : 'text-outline-light'}`}>
              {["XSigma", "Analytics", "and", "Business"].map((word, wordIndex) => (
                <span
                  key={wordIndex}
                  className="flicker-word mr-4"
                  style={{
                    '--word-delay': `${wordIndex * 0.5}s`
                  } as React.CSSProperties}
                >
                  {word.split("").map((letter, letterIndex) => (
                    <span
                      key={letterIndex}
                      className="flicker-letter"
                      style={{
                        '--delay': `${(wordIndex * 6 + letterIndex) * 0.1}s`
                      } as React.CSSProperties}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
          <div className={`flicker-glow ${isDark ? 'text-outline-dark' : 'text-outline-light'}`}>
            {["Intelligence", "Platform"].map((word, wordIndex) => (
              <span
                key={wordIndex}
                className="flicker-word mr-4"
                style={{
                  '--word-delay': `${(4 + wordIndex) * 0.5}s`
                } as React.CSSProperties}
              >
                {word.split("").map((letter, letterIndex) => (
                  <span
                    key={letterIndex}
                    className="flicker-letter"
                    style={{
                      '--delay': `${(24 + wordIndex * 6 + letterIndex) * 0.1}s`
                    } as React.CSSProperties}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`text-xl md:text-2xl ${theme.textSecondary} mb-8 max-w-4xl mx-auto font-clean`}
        >
          Comprehensive quantitative finance framework designed for advanced financial modeling,
          risk management, and analytics. Built on robust C++ core with Python bindings.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`text-lg ${theme.textMuted} mb-10 max-w-3xl mx-auto leading-relaxed font-clean`}
        >
          Offering high-performance computation and accessible scripting interfaces for
          quantitative analysts, risk managers, and financial engineers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Button
            size="lg"
            className="button-gradient px-8 py-3 text-lg"
            onClick={() => window.location.href = '/dashboard'}
          >
            🚀 Start Building
          </Button>
          <Button
            size="lg"
            variant="outline"
            className={`px-8 py-3 text-lg ${theme.buttonSecondary}`}
            onClick={() => window.location.href = '/sphinx-doc/xsigma-1.1-3/index.html'}
          >
            📖 View Documentation
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="relative mx-auto max-w-5xl"
        >
          <div className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border rounded-xl overflow-hidden`}>
            <img
              src="/Image-uploads/c32c6788-5e4a-4fee-afee-604b03113c7f.png"
              alt="XSigma Risk Management Dashboard"
              className="w-full h-auto"
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Statistics Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container px-4 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border rounded-2xl p-6 text-center pricing-card-hover`}
          >
            <div className="relative z-10">
              <div className={`text-sm font-clean font-medium ${theme.textMuted} uppercase tracking-wider mb-3`}>Active Models</div>
              <div className="text-4xl font-mono font-bold bg-gradient-to-r from-primary to-[#22c55e] bg-clip-text text-transparent mb-2">24</div>
              <div className="text-sm text-green-400 flex items-center justify-center gap-1 font-clean">
                <TrendingUp className="w-4 h-4" />
                +6 this month
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border rounded-2xl p-6 text-center pricing-card-hover`}
          >
            <div className="relative z-10">
              <div className={`text-sm font-clean font-medium ${theme.textMuted} uppercase tracking-wider mb-3`}>Portfolio Value</div>
              <div className="text-4xl font-mono font-bold bg-gradient-to-r from-primary to-[#22c55e] bg-clip-text text-transparent mb-2">$4.2M</div>
              <div className="text-sm text-green-400 flex items-center justify-center gap-1 font-clean">
                <TrendingUp className="w-4 h-4" />
                +8.3%
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border rounded-2xl p-6 text-center pricing-card-hover`}
          >
            <div className="relative z-10">
              <div className={`text-sm font-clean font-medium ${theme.textMuted} uppercase tracking-wider mb-3`}>Risk Metrics</div>
              <div className="text-4xl font-mono font-bold bg-gradient-to-r from-primary to-[#22c55e] bg-clip-text text-transparent mb-2">0.94</div>
              <div className="text-sm text-green-400 flex items-center justify-center gap-1 font-clean">
                <TrendingUp className="w-4 h-4" />
                Optimal
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border rounded-2xl p-6 text-center pricing-card-hover`}
          >
            <div className="relative z-10">
              <div className={`text-sm font-clean font-medium ${theme.textMuted} uppercase tracking-wider mb-3`}>Processing Speed</div>
              <div className="text-4xl font-mono font-bold bg-gradient-to-r from-primary to-[#22c55e] bg-clip-text text-transparent mb-2">2.1ms</div>
              <div className="text-sm text-green-400 flex items-center justify-center gap-1 font-clean">
                <TrendingUp className="w-4 h-4" />
                -15% faster
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Logo Carousel */}
      <LogoCarousel />

      {/* Core Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container px-4 py-24"
      >
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-corporate font-bold mb-6 bg-gradient-to-r from-primary to-[#22c55e] bg-clip-text text-transparent"
          >
            Core Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-xl ${theme.textMuted} max-w-3xl mx-auto font-clean`}
          >
            Enterprise-grade financial modeling platform combining academic rigor with practical implementation
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border rounded-2xl p-8 text-center feature-card-hover`}
          >
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-primary to-[#22c55e] flex items-center justify-center text-2xl">
                🏦
              </div>
              <h3 className={`text-xl font-corporate font-bold mb-4 ${theme.text}`}>Curve Construction</h3>
              <p className={`${theme.textMuted} leading-relaxed font-clean`}>
                Advanced arbitrage-free curve construction using optimization techniques with multi-curve framework support
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border rounded-2xl p-8 text-center feature-card-hover`}
          >
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-primary to-[#22c55e] flex items-center justify-center text-2xl">
                📊
              </div>
              <h3 className={`text-xl font-corporate font-bold mb-4 ${theme.text}`}>Volatility Modeling</h3>
              <p className={`${theme.textMuted} leading-relaxed font-clean`}>
                Sophisticated volatility models including SABR, ZABR, and mean-reverting interpolation methods
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border rounded-2xl p-8 text-center feature-card-hover`}
          >
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-primary to-[#22c55e] flex items-center justify-center text-2xl">
                <Zap className={`w-8 h-8 ${isDark ? 'text-black' : 'text-white'}`} />
              </div>
              <h3 className={`text-xl font-corporate font-bold mb-4 ${theme.text}`}>High Performance</h3>
              <p className={`${theme.textMuted} leading-relaxed font-clean`}>
                C++ core with Python bindings delivering enterprise-grade performance for real-time applications
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border rounded-2xl p-8 text-center feature-card-hover`}
          >
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-primary to-[#22c55e] flex items-center justify-center text-2xl">
                <Shield className={`w-8 h-8 ${isDark ? 'text-black' : 'text-white'}`} />
              </div>
              <h3 className={`text-xl font-corporate font-bold mb-4 ${theme.text}`}>Risk Management</h3>
              <p className={`${theme.textMuted} leading-relaxed font-clean`}>
                Comprehensive risk analytics with Monte Carlo simulation and advanced scenario analysis
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border rounded-2xl p-8 text-center feature-card-hover`}
          >
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-primary to-[#22c55e] flex items-center justify-center text-2xl">
                🔬
              </div>
              <h3 className={`text-xl font-corporate font-bold mb-4 ${theme.text}`}>Derivatives Pricing</h3>
              <p className={`${theme.textMuted} leading-relaxed font-clean`}>
                Extensive library of financial instruments with advanced pricing engines and calibration tools
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border rounded-2xl p-8 text-center feature-card-hover`}
          >
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-primary to-[#22c55e] flex items-center justify-center text-2xl">
                <Calculator className={`w-8 h-8 ${isDark ? 'text-black' : 'text-white'}`} />
              </div>
              <h3 className={`text-xl font-corporate font-bold mb-4 ${theme.text}`}>Mathematical Core</h3>
              <p className={`${theme.textMuted} leading-relaxed font-clean`}>
                Advanced numerical methods with algorithmic differentiation for precise risk calculations
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Quick Start Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container px-4 py-24"
      >
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-corporate font-bold mb-6 bg-gradient-to-r from-primary to-[#22c55e] bg-clip-text text-transparent"
          >
            Quick Start
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-xl ${theme.textMuted} max-w-3xl mx-auto font-clean`}
          >
            Get started with XSigma in minutes using our intuitive Python API
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border rounded-2xl overflow-hidden`}>
            <div className={`flex items-center justify-between p-6 border-b ${theme.borderColor}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-[#22c55e] flex items-center justify-center text-black font-bold">
                  💻
                </div>
                <h3 className={`text-xl font-corporate font-bold ${theme.text}`}>Python Example</h3>
              </div>
              <Button
                variant="outline"
                size="sm"
                className={`${theme.buttonSecondary}`}
              >
                📋 Copy Code
              </Button>
            </div>
            <div className="p-6">
              <pre className={`${theme.codeBg} rounded-xl p-6 overflow-x-auto text-sm leading-relaxed border ${theme.borderColor}`}>
                <code className={`whitespace-pre block ${theme.codeText} font-code`}>
                  <div className={isDark ? "text-purple-400" : "text-purple-600"}>import</div> <span className={isDark ? "text-white" : "text-gray-800"}>xsigma</span> <span className={isDark ? "text-purple-400" : "text-purple-600"}>as</span> <span className={isDark ? "text-white" : "text-gray-800"}>xs</span>
                  {'\n'}
                  <span className={isDark ? "text-purple-400" : "text-purple-600"}>from</span> <span className={isDark ? "text-white" : "text-gray-800"}>xsigma.market</span> <span className={isDark ? "text-purple-400" : "text-purple-600"}>import</span> <span className={isDark ? "text-blue-300" : "text-blue-600"}>YieldCurve</span>
                  {'\n'}
                  <span className={isDark ? "text-purple-400" : "text-purple-600"}>from</span> <span className={isDark ? "text-white" : "text-gray-800"}>xsigma.instruments</span> <span className={isDark ? "text-purple-400" : "text-purple-600"}>import</span> <span className={isDark ? "text-blue-300" : "text-blue-600"}>EuropeanOption</span>
                  {'\n\n'}
                  <span className={isDark ? "text-gray-500" : "text-gray-600"}># Build yield curve</span>
                  {'\n'}
                  <span className={isDark ? "text-green-400" : "text-green-600"}>curve</span> <span className={isDark ? "text-white" : "text-gray-800"}>=</span> <span className={isDark ? "text-blue-300" : "text-blue-600"}>YieldCurve</span><span className={isDark ? "text-yellow-300" : "text-yellow-600"}>(</span><span className={isDark ? "text-orange-400" : "text-orange-600"}>"USD"</span><span className={isDark ? "text-yellow-300" : "text-yellow-600"}>)</span>
                  {'\n'}
                  <span className={isDark ? "text-green-400" : "text-green-600"}>curve</span><span className={isDark ? "text-white" : "text-gray-800"}>.</span><span className={isDark ? "text-cyan-300" : "text-cyan-600"}>add_instrument</span><span className={isDark ? "text-yellow-300" : "text-yellow-600"}>(</span><span className={isDark ? "text-orange-400" : "text-orange-600"}>"3M"</span><span className={isDark ? "text-white" : "text-gray-800"}>,</span> <span className={isDark ? "text-pink-400" : "text-pink-600"}>0.0325</span><span className={isDark ? "text-yellow-300" : "text-yellow-600"}>)</span>
                  {'\n'}
                  <span className={isDark ? "text-green-400" : "text-green-600"}>curve</span><span className={isDark ? "text-white" : "text-gray-800"}>.</span><span className={isDark ? "text-cyan-300" : "text-cyan-600"}>add_instrument</span><span className={isDark ? "text-yellow-300" : "text-yellow-600"}>(</span><span className={isDark ? "text-orange-400" : "text-orange-600"}>"1Y"</span><span className={isDark ? "text-white" : "text-gray-800"}>,</span> <span className={isDark ? "text-pink-400" : "text-pink-600"}>0.0385</span><span className={isDark ? "text-yellow-300" : "text-yellow-600"}>)</span>
                  {'\n'}
                  <span className={isDark ? "text-green-400" : "text-green-600"}>curve</span><span className={isDark ? "text-white" : "text-gray-800"}>.</span><span className={isDark ? "text-cyan-300" : "text-cyan-600"}>calibrate</span><span className={isDark ? "text-yellow-300" : "text-yellow-600"}>()</span>
                  {'\n\n'}
                  <span className={isDark ? "text-gray-500" : "text-gray-600"}># Price European option</span>
                  {'\n'}
                  <span className={isDark ? "text-green-400" : "text-green-600"}>option</span> <span className={isDark ? "text-white" : "text-gray-800"}>=</span> <span className={isDark ? "text-blue-300" : "text-blue-600"}>EuropeanOption</span><span className={isDark ? "text-yellow-300" : "text-yellow-600"}>(</span>
                  {'\n'}
                  <span className={isDark ? "text-white" : "text-gray-800"}>    </span><span className={isDark ? "text-red-300" : "text-red-600"}>spot</span><span className={isDark ? "text-white" : "text-gray-800"}>=</span><span className={isDark ? "text-pink-400" : "text-pink-600"}>100</span><span className={isDark ? "text-white" : "text-gray-800"}>,</span> <span className={isDark ? "text-red-300" : "text-red-600"}>strike</span><span className={isDark ? "text-white" : "text-gray-800"}>=</span><span className={isDark ? "text-pink-400" : "text-pink-600"}>105</span><span className={isDark ? "text-white" : "text-gray-800"}>,</span>
                  {'\n'}
                  <span className={isDark ? "text-white" : "text-gray-800"}>    </span><span className={isDark ? "text-red-300" : "text-red-600"}>expiry</span><span className={isDark ? "text-white" : "text-gray-800"}>=</span><span className={isDark ? "text-orange-400" : "text-orange-600"}>"1Y"</span><span className={isDark ? "text-white" : "text-gray-800"}>,</span> <span className={isDark ? "text-red-300" : "text-red-600"}>vol</span><span className={isDark ? "text-white" : "text-gray-800"}>=</span><span className={isDark ? "text-pink-400" : "text-pink-600"}>0.25</span>
                  {'\n'}
                  <span className={isDark ? "text-yellow-300" : "text-yellow-600"}>)</span>
                  {'\n\n'}
                  <span className={isDark ? "text-green-400" : "text-green-600"}>price</span> <span className={isDark ? "text-white" : "text-gray-800"}>=</span> <span className={isDark ? "text-green-400" : "text-green-600"}>option</span><span className={isDark ? "text-white" : "text-gray-800"}>.</span><span className={isDark ? "text-cyan-300" : "text-cyan-600"}>price</span><span className={isDark ? "text-yellow-300" : "text-yellow-600"}>(</span><span className={isDark ? "text-green-400" : "text-green-600"}>curve</span><span className={isDark ? "text-yellow-300" : "text-yellow-600"}>)</span>
                  {'\n'}
                  <span className={isDark ? "text-green-400" : "text-green-600"}>greeks</span> <span className={isDark ? "text-white" : "text-gray-800"}>=</span> <span className={isDark ? "text-green-400" : "text-green-600"}>option</span><span className={isDark ? "text-white" : "text-gray-800"}>.</span><span className={isDark ? "text-cyan-300" : "text-cyan-600"}>greeks</span><span className={isDark ? "text-yellow-300" : "text-yellow-600"}>(</span><span className={isDark ? "text-green-400" : "text-green-600"}>curve</span><span className={isDark ? "text-yellow-300" : "text-yellow-600"}>)</span>
                  {'\n\n'}
                  <span className={isDark ? "text-blue-300" : "text-blue-600"}>print</span><span className={isDark ? "text-yellow-300" : "text-yellow-600"}>(</span><span className={isDark ? "text-orange-400" : "text-orange-600"}>f"Option Price: </span><span className={isDark ? "text-yellow-300" : "text-yellow-600"}>$</span><span className={isDark ? "text-yellow-300" : "text-yellow-600"}>{'{'}price:.2f{'}'}</span><span className={isDark ? "text-orange-400" : "text-orange-600"}>"</span><span className={isDark ? "text-yellow-300" : "text-yellow-600"}>)</span>
                  {'\n'}
                  <span className={isDark ? "text-blue-300" : "text-blue-600"}>print</span><span className={isDark ? "text-yellow-300" : "text-yellow-600"}>(</span><span className={isDark ? "text-orange-400" : "text-orange-600"}>f"Delta: </span><span className={isDark ? "text-yellow-300" : "text-yellow-600"}>{'{'}greeks.delta:.3f{'}'}</span><span className={isDark ? "text-orange-400" : "text-orange-600"}>"</span><span className={isDark ? "text-yellow-300" : "text-yellow-600"}>)</span>
                </code>
              </pre>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="button-gradient px-8 py-3 text-lg">
              🚀 Get Started Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className={`px-8 py-3 text-lg ${theme.buttonSecondary}`}
            >
              📞 Schedule Demo
            </Button>
          </div>
        </motion.div>
      </motion.section>

      {/* Pricing Section */}
      <div id="pricing" className={theme.background}>
        <PricingSection />
      </div>

      {/* Testimonials Section */}
      <div className={theme.background}>
        <TestimonialsSection />
      </div>

      {/* CTA Section */}
      <section className={`container px-4 py-20 relative ${theme.background}`}>
        <div
          className={`absolute inset-0 ${isDark ? 'opacity-40' : 'opacity-20'}`}
          style={{
            backgroundImage: 'url("/Image-uploads/21f3edfb-62b5-4e35-9d03-7339d803b980.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border rounded-2xl p-8 md:p-12 text-center relative z-10`}
        >
          <h2 className={`text-3xl md:text-4xl font-corporate font-bold mb-4 ${theme.text}`}>
            Ready to accelerate your quantitative analysis?
          </h2>
          <p className={`text-lg ${theme.textMuted} mb-8 max-w-2xl mx-auto font-clean`}>
            Join computational finance teams who have already discovered the power of XSigma's high-performance framework.
          </p>
          <Button size="lg" className="button-gradient">
            Start Implementation
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <div className={theme.background}>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
