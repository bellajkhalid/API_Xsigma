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
  PieChart
} from 'lucide-react';

const XvfModel: React.FC = () => {
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

  const keyFeatures = [
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Advanced Volatility Modeling",
      description: "Sophisticated volatility surface construction with Enhanced AAD optimization",
      benefits: ["Real-time surface calibration", "Arbitrage-free construction", "Multi-asset support"]
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Enhanced AAD Integration",
      description: "Native Enhanced AAD support for 10x faster volatility calculations and Greeks",
      benefits: ["Sub-second calibration", "Real-time Greeks", "Machine precision accuracy"]
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Multi-Asset Framework",
      description: "Comprehensive volatility modeling across equities, FX, commodities, and rates",
      benefits: ["Cross-asset correlations", "Unified framework", "Consistent methodology"]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Production Validated",
      description: "Extensively tested in tier-1 banks with proven market-making performance",
      benefits: ["99.99% uptime", "Regulatory compliance", "Battle-tested algorithms"]
    }
  ];

  const volatilityModels = [
    {
      name: "Black-Scholes-Merton",
      description: "Classic volatility model with Enhanced AAD acceleration",
      features: ["Constant volatility assumption", "Analytical Greeks", "Real-time pricing"]
    },
    {
      name: "Local Volatility",
      description: "Dupire local volatility model with PDE solver optimization",
      features: ["State-dependent volatility", "Exotic option pricing", "Calibration to market"]
    },
    {
      name: "Stochastic Volatility",
      description: "Heston and SABR models with Monte Carlo acceleration",
      features: ["Volatility smile modeling", "Path-dependent options", "Correlation effects"]
    },
    {
      name: "Jump Diffusion",
      description: "Merton jump-diffusion with Enhanced AAD sensitivities",
      features: ["Discontinuous price moves", "Tail risk modeling", "Crisis scenario analysis"]
    }
  ];

  const technicalSpecs = [
    {
      category: "Asset Classes",
      specifications: [
        "Equity indices and single stocks",
        "FX spot and forwards",
        "Interest rate derivatives",
        "Commodity futures",
        "Credit default swaps"
      ]
    },
    {
      category: "Calibration Methods",
      specifications: [
        "Market option prices",
        "Implied volatility surfaces",
        "Historical time series",
        "Risk-neutral densities",
        "Model-free approaches"
      ]
    },
    {
      category: "Numerical Methods",
      specifications: [
        "Finite difference schemes",
        "Monte Carlo simulation",
        "Fourier transform methods",
        "Tree-based algorithms",
        "Analytical approximations"
      ]
    },
    {
      category: "Performance",
      specifications: [
        "Sub-second surface construction",
        "Real-time Greeks calculation",
        "Parallel processing support",
        "Memory-efficient algorithms",
        "GPU acceleration ready"
      ]
    }
  ];

  const useCases = [
    {
      icon: <Building className="w-6 h-6" />,
      title: "Investment Banks",
      description: "Options market making and exotic derivatives pricing",
      applications: [
        "Real-time options pricing",
        "Volatility arbitrage strategies",
        "Exotic derivatives valuation",
        "Risk management and hedging"
      ]
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Hedge Funds",
      description: "Quantitative strategies and alpha generation",
      applications: [
        "Volatility trading strategies",
        "Statistical arbitrage",
        "Risk-adjusted returns",
        "Portfolio optimization"
      ]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Asset Managers",
      description: "Portfolio risk management and structured products",
      applications: [
        "Portfolio volatility forecasting",
        "Structured product pricing",
        "Risk budgeting",
        "Performance attribution"
      ]
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Proprietary Trading",
      description: "High-frequency trading and market making",
      applications: [
        "Real-time volatility signals",
        "Market making algorithms",
        "Cross-asset arbitrage",
        "Latency-sensitive pricing"
      ]
    }
  ];

  const performanceMetrics = [
    { metric: "10x", description: "Faster volatility surface construction" },
    { metric: "<100ms", description: "Real-time Greeks calculation" },
    { metric: "99.9%", description: "Calibration accuracy" },
    { metric: "24/7", description: "Production availability" }
  ];

  return (
    <>
      <Helmet>
        <title>XVF Model - XSigma Volatility Framework</title>
        <meta name="description" content="XSigma XVF Model: Advanced volatility framework with Enhanced AAD technology. Multi-asset volatility modeling, real-time calibration, and institutional-grade performance." />
        <meta name="keywords" content="XVF model, volatility modeling, volatility surfaces, Enhanced AAD, options pricing, volatility framework, XSigma technology" />
        <link rel="canonical" href="https://xsigma.co.uk/solutions/xvf-model" />
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
              <span className="text-xsigma-navy font-semibold">XVF Model</span>
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
                  <Activity className="w-12 h-12 text-xsigma-teal" />
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                XVF Model
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto mb-8">
                XSigma Volatility Framework - Advanced multi-asset volatility modeling 
                with Enhanced AAD technology for institutional options trading and risk management.
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

        {/* Key Features */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-xsigma-navy mb-4">Advanced Volatility Modeling Capabilities</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Cutting-edge volatility framework designed for institutional options trading and risk management
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
                  className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
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

        {/* Volatility Models */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-xsigma-navy mb-4">Comprehensive Model Library</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From classic Black-Scholes to advanced stochastic volatility models
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {volatilityModels.map((model, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-lg font-bold text-xsigma-navy mb-2">{model.name}</h3>
                  <p className="text-gray-600 mb-4">{model.description}</p>
                  <ul className="space-y-2">
                    {model.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <Star className="w-3 h-3 text-xsigma-teal mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
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
                        <CheckCircle className="w-3 h-3 text-xsigma-teal mr-2 flex-shrink-0" />
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
                Powering volatility trading and risk management across financial institutions
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
              <h2 className="text-3xl font-bold mb-6">Ready to Revolutionize Your Volatility Modeling?</h2>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Experience the power of XVF Model with Enhanced AAD technology for institutional-grade volatility modeling.
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

export default XvfModel;
