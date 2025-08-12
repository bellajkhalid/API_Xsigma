import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Sparkles, TrendingUp, Shield, Zap, Globe, BarChart3, Users, Code, Database, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/contexts/ThemeContext";
import { useEffect, useState } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";

// Dynamic AI Chat Component (without blue button)
const DynamicAIChat = () => {
  const { isDark } = useTheme();
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState('');

  const aiPhrases = [
    "💡 Ask me about XVA calculations and risk analytics...",
    "🚀 Discover our advanced portfolio optimization tools...",
    "📊 Learn about real-time market data integration...",
    "⚡ Explore our high-performance computing solutions...",
    "🔬 Get insights on quantitative modeling frameworks...",
    "🎯 Find out about regulatory reporting automation...",
    "🌐 Understand our cross-asset pricing engines...",
    "🔧 See how our APIs can transform your workflow..."
  ];

  useEffect(() => {
    const phraseInterval = setInterval(() => {
      setIsTyping(true);
      setDisplayedText('');

      const phrase = aiPhrases[currentPhrase];
      let charIndex = 0;

      const typingInterval = setInterval(() => {
        if (charIndex < phrase.length) {
          setDisplayedText(phrase.substring(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          setTimeout(() => {
            setCurrentPhrase((prev) => (prev + 1) % aiPhrases.length);
          }, 3000);
        }
      }, 50);

      return () => clearInterval(typingInterval);
    }, 6000);

    // Initial typing
    setIsTyping(true);
    const initialPhrase = aiPhrases[0];
    let charIndex = 0;
    const initialTyping = setInterval(() => {
      if (charIndex < initialPhrase.length) {
        setDisplayedText(initialPhrase.substring(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(initialTyping);
        setIsTyping(false);
      }
    }, 50);

    return () => {
      clearInterval(phraseInterval);
      clearInterval(initialTyping);
    };
  }, [currentPhrase]);

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
};




const Index = () => {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'} transition-colors duration-300`}>
      <ThemeToggle />
      <Navigation />

      {/* Hero Section - Goldman Sachs Style */}
      <section className="relative min-h-screen">
        {/* Animated Background */}
        <AnimatedBackground />

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 pt-32 pb-20 min-h-screen flex items-center">
            <div className="max-w-4xl mx-auto text-center">

              {/* Main Headline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mb-8"
              >
                <h1 className={`text-5xl md:text-6xl lg:text-7xl font-light leading-tight ${isDark ? 'text-white' : 'text-gray-900'} mb-6 drop-shadow-lg`}>
                  XSigma Financial
                </h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className={`text-xl md:text-2xl ${isDark ? 'text-gray-200' : 'text-gray-700'} max-w-3xl mx-auto leading-relaxed drop-shadow-md`}
                >
                  Unlock advanced quantitative finance capabilities by embedding our developer solutions into your ecosystem.
                </motion.p>
              </motion.div>

              {/* Dynamic AI Chat */}
              <DynamicAIChat />

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 mt-16"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <Button
                    onClick={() => window.location.href = '/register-interest'}
                    size="lg"
                    className={`px-8 py-4 text-lg font-medium ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-gray-900 text-white hover:bg-gray-800'} rounded-none transition-colors shadow-lg relative overflow-hidden group`}
                  >
                    <span className="relative z-10">Register Interest</span>
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
                    onClick={() => window.location.href = '/solutions/analytics'}
                    size="lg"
                    variant="outline"
                    className={`px-8 py-4 text-lg font-medium ${isDark ? 'border-white text-white hover:bg-white hover:text-black' : 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'} rounded-none transition-colors shadow-lg backdrop-blur-sm relative overflow-hidden group`}
                  >
                    <span className="relative z-10">Discover Solutions</span>
                    <motion.div
                      className={`absolute inset-0 ${isDark ? 'bg-blue-500/10' : 'bg-blue-500/5'}`}
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
      </section>

      {/* Featured Product Spotlight - Goldman Sachs Style */}
      <section className={`${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-20`}>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">

              {/* XVA Engine Spotlight */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center space-x-2 text-blue-600 font-medium">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>XVA Engine®</span>
                </div>

                <h2 className={`text-4xl md:text-5xl font-light ${isDark ? 'text-white' : 'text-black'}`}>
                  Advanced Risk Analytics
                </h2>

                <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                  A comprehensive platform for XVA calculations, risk management, and regulatory reporting.
                  Leverage our quantitative expertise built over decades of financial innovation.
                </p>

                <Button
                  onClick={() => window.location.href = '/solutions/analytics'}
                  variant="outline"
                  className={`${isDark ? 'border-white text-white hover:bg-white hover:text-black' : 'border-black text-black hover:bg-black hover:text-white'} rounded-none px-6 py-3`}
                >
                  Learn more
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </motion.div>

              {/* Visual Element */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`${isDark ? 'bg-black' : 'bg-white'} p-8 rounded-lg shadow-lg`}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="h-4 bg-blue-200 rounded"></div>
                    <div className="h-4 bg-purple-200 rounded w-3/4"></div>
                    <div className="h-4 bg-green-200 rounded w-1/2"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-4 bg-blue-200 rounded"></div>
                    <div className="h-4 bg-purple-200 rounded w-3/4"></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse Solutions Section - Goldman Sachs Style */}
      <section className={`${isDark ? 'bg-black' : 'bg-white'} py-20`}>
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
              <h2 className={`text-4xl md:text-5xl font-light ${isDark ? 'text-white' : 'text-black'} mb-4`}>
                Browse Solutions
              </h2>
            </motion.div>

            {/* Solutions Grid */}
            <div className="grid md:grid-cols-3 gap-8">

              {/* Data Solution */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="space-y-6"
              >
                <h3 className={`text-2xl font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                  Data
                </h3>
                <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                  Discover, organize, manage, and analyze data. Leverage our unique position as a leading quantitative finance platform.
                  Access historical and real-time cross-asset data through our unified data platform.
                </p>
                <Button
                  onClick={() => window.location.href = '/solutions/data'}
                  variant="ghost"
                  className={`p-0 h-auto ${isDark ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-700'} font-medium`}
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Learn more
                </Button>
              </motion.div>

              {/* Analytics Solution */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <h3 className={`text-2xl font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                  Analytics
                </h3>
                <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                  Analyze and interpret data at scale using our front-office tools for investment analysis and risk management.
                  Advanced XVA calculations and portfolio optimization.
                </p>
                <Button
                  onClick={() => window.location.href = '/solutions/analytics'}
                  variant="ghost"
                  className={`p-0 h-auto ${isDark ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-700'} font-medium`}
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Learn more
                </Button>
              </motion.div>

              {/* Risk Management Solution */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="space-y-6"
              >
                <h3 className={`text-2xl font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                  Risk Management
                </h3>
                <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                  Comprehensive risk assessment and regulatory reporting tools. Real-time monitoring and stress testing
                  capabilities for complex financial portfolios.
                </p>
                <Button
                  onClick={() => window.location.href = '/solutions/portfolio'}
                  variant="ghost"
                  className={`p-0 h-auto ${isDark ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-700'} font-medium`}
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Learn more
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className={`${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-20`}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h2 className={`text-4xl md:text-5xl font-light ${isDark ? 'text-white' : 'text-black'}`}>
                Find which solutions are right for your business
              </h2>

              <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto leading-relaxed`}>
                Contact our team to make sure our services meet your unique quantitative finance needs.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Button
                  size="lg"
                  className={`px-8 py-4 text-lg font-medium ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'} rounded-none transition-colors`}
                >
                  Register Interest
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
