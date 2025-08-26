import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Activity, 
  BarChart3, 
  CheckCircle, 
  Zap,
  Target,
  Award,
  Clock,
  Database,
  TrendingUp,
  LineChart,
  Calculator,
  Building,
  Globe,
  Users,
  Shield,
  Star,
  Settings,
  Code,
  FileText,
  PieChart,
  Gauge
} from 'lucide-react';

const Greeks: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const greeksTypes = [
    {
      name: "Delta (Δ)",
      symbol: "Δ",
      description: "Price sensitivity to underlying asset price changes",
      formula: "Δ = ∂V/∂S",
      interpretation: "Rate of change of option value with respect to underlying price",
      applications: ["Delta hedging", "Portfolio risk management", "Market making"]
    },
    {
      name: "Gamma (Γ)",
      symbol: "Γ", 
      description: "Rate of change of delta with respect to underlying price",
      formula: "Γ = ∂²V/∂S²",
      interpretation: "Convexity measure for options portfolios",
      applications: ["Gamma hedging", "Convexity trading", "Risk monitoring"]
    },
    {
      name: "Vega (ν)",
      symbol: "ν",
      description: "Sensitivity to implied volatility changes",
      formula: "ν = ∂V/∂σ",
      interpretation: "Exposure to volatility risk",
      applications: ["Volatility trading", "Vega hedging", "Volatility arbitrage"]
    },
    {
      name: "Theta (Θ)",
      symbol: "Θ",
      description: "Time decay of option value",
      formula: "Θ = ∂V/∂t",
      interpretation: "Rate of time value erosion",
      applications: ["Time decay strategies", "Portfolio optimization", "Risk budgeting"]
    },
    {
      name: "Rho (ρ)",
      symbol: "ρ",
      description: "Sensitivity to interest rate changes",
      formula: "ρ = ∂V/∂r",
      interpretation: "Interest rate risk exposure",
      applications: ["Interest rate hedging", "Curve risk management", "ALM strategies"]
    }
  ];

  const keyFeatures = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-time Calculation",
      description: "Enhanced AAD technology delivers instantaneous Greeks calculations",
      benefits: ["Sub-millisecond updates", "Real-time risk monitoring", "Dynamic hedging support"]
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Machine Precision",
      description: "Exact derivatives with 15+ decimal places accuracy",
      benefits: ["Numerical stability", "Consistent results", "Regulatory compliance"]
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Cross-Asset Support",
      description: "Comprehensive Greeks across all asset classes",
      benefits: ["Equities & indices", "FX & commodities", "Interest rates & credit"]
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Portfolio Aggregation",
      description: "Efficient portfolio-level Greeks calculation and aggregation",
      benefits: ["Net portfolio exposure", "Risk factor attribution", "Scenario analysis"]
    }
  ];

  const technicalSpecs = [
    {
      category: "Calculation Methods",
      specifications: [
        "Analytical Greeks (Black-Scholes)",
        "Finite difference methods",
        "Enhanced AAD derivatives",
        "Monte Carlo sensitivities",
        "Pathwise derivatives"
      ]
    },
    {
      category: "Asset Classes",
      specifications: [
        "Equity options & futures",
        "FX options & forwards",
        "Interest rate derivatives",
        "Commodity options",
        "Credit derivatives"
      ]
    },
    {
      category: "Risk Factors",
      specifications: [
        "Spot prices & rates",
        "Volatility surfaces",
        "Interest rate curves",
        "Dividend yields",
        "Credit spreads"
      ]
    },
    {
      category: "Performance",
      specifications: [
        "Real-time calculation",
        "Parallel processing",
        "Memory optimization",
        "GPU acceleration",
        "Scalable architecture"
      ]
    }
  ];

  const useCases = [
    {
      icon: <Building className="w-6 h-6" />,
      title: "Investment Banks",
      description: "Trading desk risk management and market making",
      applications: [
        "Real-time delta hedging",
        "Options market making",
        "Exotic derivatives trading",
        "Risk limit monitoring"
      ]
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Hedge Funds",
      description: "Quantitative strategies and alpha generation",
      applications: [
        "Volatility arbitrage",
        "Gamma scalping strategies",
        "Risk-adjusted returns",
        "Dynamic hedging"
      ]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Asset Managers",
      description: "Portfolio risk management and optimization",
      applications: [
        "Portfolio Greeks monitoring",
        "Risk budgeting",
        "Performance attribution",
        "Structured products"
      ]
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Proprietary Trading",
      description: "High-frequency trading and algorithmic strategies",
      applications: [
        "Real-time risk signals",
        "Automated hedging",
        "Market making algorithms",
        "Cross-asset arbitrage"
      ]
    }
  ];

  const performanceMetrics = [
    { metric: "10x", description: "Faster than finite difference methods" },
    { metric: "<1ms", description: "Real-time Greeks calculation" },
    { metric: "15+", description: "Decimal places accuracy" },
    { metric: "100%", description: "Consistent with analytical results" }
  ];

  return (
    <>
      <Helmet>
        <title>Greeks & Sensitivities - XSigma Risk Management Solutions</title>
        <meta name="description" content="XSigma Greeks & Sensitivities engine with Enhanced AAD technology. Real-time Delta, Gamma, Vega, Theta, Rho calculations for institutional options trading." />
        <meta name="keywords" content="Greeks sensitivities, Delta Gamma Vega, Enhanced AAD, options trading, risk management, derivatives pricing, XSigma solutions" />
        <link rel="canonical" href="https://xsigma.co.uk/solutions/greeks" />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Breadcrumb Navigation */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <a href="/" className="text-gray-500 hover:text-xsigma-navy transition-colors">Home</a>
              <span className="text-gray-400">/</span>
              <a href="/solutions" className="text-gray-500 hover:text-xsigma-navy transition-colors">Solutions</a>
              <span className="text-gray-400">/</span>
              <span className="text-xsigma-navy font-semibold">Greeks & Sensitivities</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-xsigma-navy via-xsigma-navy to-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="bg-xsigma-teal/20 p-4 rounded-full">
                  <Gauge className="w-12 h-12 text-xsigma-teal" />
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Greeks & Sensitivities
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto mb-8">
                Real-time Greeks calculation engine with Enhanced AAD technology. 
                Instantaneous Delta, Gamma, Vega, Theta, and Rho for dynamic hedging and risk management.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-xsigma-teal hover:bg-xsigma-teal/90 text-white font-semibold rounded-lg transition-colors duration-300"
                >
                  Request Demo
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
                <a
                  href="/support/documentation"
                  className="inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors duration-300"
                >
                  Technical Documentation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Performance Metrics */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {performanceMetrics.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="text-4xl font-bold text-xsigma-teal mb-2">{item.metric}</div>
                  <div className="text-gray-600">{item.description}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Greeks Types */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-xsigma-navy mb-4">Complete Greeks Suite</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive risk sensitivities for all derivatives and portfolios
              </p>
            </motion.div>

            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
              {greeksTypes.map((greek, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-xsigma-teal/10 p-4 rounded-lg flex-shrink-0">
                      <div className="text-2xl font-bold text-xsigma-teal">{greek.symbol}</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-xsigma-navy mb-2">{greek.name}</h3>
                      <p className="text-gray-600 mb-3">{greek.description}</p>
                      
                      <div className="bg-gray-50 p-3 rounded-lg mb-3">
                        <code className="text-sm text-xsigma-navy font-mono">{greek.formula}</code>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{greek.interpretation}</p>
                      
                      <div>
                        <h4 className="font-semibold text-xsigma-navy mb-2">Applications</h4>
                        <div className="flex flex-wrap gap-2">
                          {greek.applications.map((app, idx) => (
                            <span key={idx} className="bg-xsigma-teal/10 text-xsigma-teal text-xs px-2 py-1 rounded-full">
                              {app}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-xsigma-navy mb-4">Advanced Greeks Engine</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Revolutionary Enhanced AAD technology for institutional-grade risk sensitivity calculations
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              className="grid md:grid-cols-2 gap-8"
            >
              {keyFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-xsigma-teal/10 p-3 rounded-lg flex-shrink-0">
                      <div className="text-xsigma-teal">{feature.icon}</div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-xsigma-navy mb-2">{feature.title}</h3>
                      <p className="text-gray-600 mb-4">{feature.description}</p>
                      <ul className="space-y-2">
                        {feature.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-xsigma-teal mr-2 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-xsigma-navy mb-4">Technical Specifications</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive technical capabilities for institutional deployment
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {technicalSpecs.map((spec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <h3 className="text-lg font-bold text-xsigma-navy mb-4">{spec.category}</h3>
                  <ul className="space-y-2">
                    {spec.specifications.map((item, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <Star className="w-3 h-3 text-xsigma-teal mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-xsigma-navy mb-4">Industry Applications</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Powering risk management and trading strategies across financial institutions
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="bg-xsigma-teal/10 p-3 rounded-lg w-fit mb-4">
                    <div className="text-xsigma-teal">{useCase.icon}</div>
                  </div>
                  <h3 className="text-lg font-bold text-xsigma-navy mb-2">{useCase.title}</h3>
                  <p className="text-gray-600 mb-4">{useCase.description}</p>
                  <ul className="space-y-2">
                    {useCase.applications.map((app, idx) => (
                      <li key={idx} className="flex items-start text-xs text-gray-500">
                        <CheckCircle className="w-3 h-3 text-xsigma-teal mr-2 mt-0.5 flex-shrink-0" />
                        {app}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-br from-xsigma-navy to-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Risk Management?</h2>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Experience the power of Enhanced AAD technology for institutional-grade Greeks calculations.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-xsigma-teal hover:bg-xsigma-teal/90 text-white font-semibold rounded-lg transition-colors duration-300"
                >
                  Schedule Demo
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
                <a
                  href="/support/api-reference"
                  className="inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors duration-300"
                >
                  API Reference
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Greeks;
