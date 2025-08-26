import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  TrendingUp, 
  BarChart3, 
  CheckCircle, 
  Zap,
  Target,
  Award,
  Clock,
  Database,
  Activity,
  LineChart,
  Calculator,
  Building,
  Globe,
  Users,
  Shield,
  Star,
  Settings,
  Code,
  FileText
} from 'lucide-react';

const XcfModel: React.FC = () => {
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
      icon: <Zap className="w-8 h-8" />,
      title: "Enhanced AAD Integration",
      description: "Native Enhanced AAD support for 10x faster curve construction and real-time sensitivities",
      benefits: ["Sub-second curve building", "Real-time risk sensitivities", "Machine precision accuracy"]
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Multi-Curve Framework",
      description: "Comprehensive multi-curve bootstrapping with cross-currency basis and collateral curves",
      benefits: ["OIS discounting curves", "IBOR projection curves", "Cross-currency basis curves"]
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Advanced Interpolation",
      description: "Sophisticated interpolation methods optimized for institutional requirements",
      benefits: ["Log-linear interpolation", "Cubic spline methods", "Monotonic preserving algorithms"]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Production Tested",
      description: "Battle-tested in tier-1 banks with proven reliability and regulatory compliance",
      benefits: ["99.99% uptime", "Regulatory validation", "Stress-tested performance"]
    }
  ];

  const technicalSpecs = [
    {
      category: "Curve Types",
      specifications: [
        "Zero-coupon yield curves",
        "Forward rate curves", 
        "Discount factor curves",
        "Credit spread curves",
        "Volatility surfaces"
      ]
    },
    {
      category: "Instruments",
      specifications: [
        "Interest rate swaps",
        "FRA (Forward Rate Agreements)",
        "Futures contracts",
        "Basis swaps",
        "Cross-currency swaps"
      ]
    },
    {
      category: "Currencies",
      specifications: [
        "USD, EUR, GBP, JPY",
        "AUD, CAD, CHF, SEK",
        "Emerging market currencies",
        "Custom currency support",
        "Multi-currency portfolios"
      ]
    },
    {
      category: "Performance",
      specifications: [
        "Sub-second curve construction",
        "Real-time sensitivity calculation",
        "Parallel processing support",
        "Memory-efficient algorithms",
        "Scalable architecture"
      ]
    }
  ];

  const useCases = [
    {
      icon: <Building className="w-6 h-6" />,
      title: "Investment Banks",
      description: "Trading desk curve construction and risk management",
      applications: [
        "Real-time curve updates for trading",
        "Cross-currency basis trading",
        "Regulatory capital calculations",
        "Stress testing and scenario analysis"
      ]
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Asset Managers",
      description: "Portfolio valuation and risk analytics",
      applications: [
        "Fixed income portfolio valuation",
        "Duration and convexity analysis",
        "Performance attribution",
        "Risk budgeting and allocation"
      ]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Central Banks",
      description: "Monetary policy and financial stability analysis",
      applications: [
        "Yield curve analysis",
        "Monetary policy transmission",
        "Financial stability monitoring",
        "Market surveillance"
      ]
    },
    {
      icon: <Calculator className="w-6 h-6" />,
      title: "Pension Funds",
      description: "Asset-liability matching and risk management",
      applications: [
        "Liability valuation",
        "Asset-liability duration matching",
        "Funding ratio calculations",
        "Regulatory reporting"
      ]
    }
  ];

  const performanceMetrics = [
    { metric: "10x", description: "Faster curve construction vs traditional methods" },
    { metric: "<1s", description: "Real-time curve updates" },
    { metric: "99.99%", description: "Production uptime reliability" },
    { metric: "50+", description: "Supported currencies and markets" }
  ];

  return (
    <>
      <Helmet>
        <title>XCF Model - XSigma Curve Construction Framework</title>
        <meta name="description" content="XSigma XCF Model: Production-tested curve construction framework with Enhanced AAD technology. Multi-curve bootstrapping, real-time sensitivities, and institutional-grade performance." />
        <meta name="keywords" content="XCF model, curve construction, yield curves, Enhanced AAD, multi-curve framework, interest rate curves, XSigma technology" />
        <link rel="canonical" href="https://xsigma.co.uk/solutions/xcf-model" />
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
              <span className="text-xsigma-navy font-semibold">XCF Model</span>
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
                  <TrendingUp className="w-12 h-12 text-xsigma-teal" />
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                XCF Model
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto mb-8">
                XSigma Curve Construction Framework - Production-tested multi-curve bootstrapping 
                with Enhanced AAD technology for institutional-grade performance.
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
              <h2 className="text-3xl font-bold text-xsigma-navy mb-4">Advanced Curve Construction Capabilities</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Built by practitioners for practitioners, XCF Model combines academic rigor with real-world performance
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

        {/* Technical Specifications */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-xsigma-navy mb-4">Technical Specifications</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive technical capabilities designed for institutional deployment
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {technicalSpecs.map((spec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl p-6"
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
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-xsigma-navy mb-4">Industry Applications</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Trusted by leading financial institutions across diverse use cases
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
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
              <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Curve Construction?</h2>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Experience the power of XCF Model with Enhanced AAD technology for institutional-grade curve construction.
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

export default XcfModel;
