import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Calculator, 
  BarChart3, 
  CheckCircle, 
  Zap,
  Target,
  Award,
  Clock,
  Database,
  Activity,
  LineChart,
  Shield,
  Building,
  Globe,
  Users,
  TrendingUp,
  Star,
  Settings,
  Code,
  FileText,
  AlertTriangle
} from 'lucide-react';

const CvaDva: React.FC = () => {
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
      icon: <Calculator className="w-8 h-8" />,
      title: "Comprehensive CVA/DVA Engine",
      description: "Full counterparty risk calculation suite with Enhanced AAD acceleration",
      benefits: ["Credit Value Adjustment (CVA)", "Debit Value Adjustment (DVA)", "Funding Value Adjustment (FVA)"]
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Enhanced AAD Performance",
      description: "10x faster calculations with real-time sensitivity analysis",
      benefits: ["Sub-second calculations", "Real-time Greeks", "Parallel processing"]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Regulatory Compliance",
      description: "Built-in compliance with Basel III, FRTB, and other regulatory frameworks",
      benefits: ["Basel III SA-CCR", "FRTB compliance", "Regulatory reporting"]
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Enterprise Integration",
      description: "Seamless integration with existing risk management infrastructure",
      benefits: ["Real-time data feeds", "API integration", "Scalable architecture"]
    }
  ];

  const calculationTypes = [
    {
      name: "Credit Value Adjustment (CVA)",
      description: "Market value of counterparty credit risk",
      formula: "CVA = LGD × ∫ EE(t) × PD(t) × DF(t) dt",
      applications: ["Trading book valuation", "Regulatory capital", "Risk management"]
    },
    {
      name: "Debit Value Adjustment (DVA)",
      description: "Market value of own credit risk",
      formula: "DVA = LGD × ∫ NEE(t) × Own_PD(t) × DF(t) dt",
      applications: ["Fair value accounting", "P&L attribution", "Capital allocation"]
    },
    {
      name: "Funding Value Adjustment (FVA)",
      description: "Cost of funding uncollateralized exposure",
      formula: "FVA = ∫ (Funding_Spread × Expected_Exposure) × DF(t) dt",
      applications: ["Funding cost allocation", "Pricing adjustments", "Capital optimization"]
    },
    {
      name: "Bilateral CVA (BCVA)",
      description: "Net counterparty risk adjustment",
      formula: "BCVA = CVA - DVA",
      applications: ["Net risk exposure", "Bilateral netting", "Portfolio optimization"]
    }
  ];

  const technicalSpecs = [
    {
      category: "Calculation Methods",
      specifications: [
        "Monte Carlo simulation",
        "Semi-analytical methods",
        "Regression-based approaches",
        "Machine learning models",
        "Hybrid methodologies"
      ]
    },
    {
      category: "Risk Factors",
      specifications: [
        "Interest rate curves",
        "Credit spreads",
        "FX rates",
        "Equity prices",
        "Commodity prices"
      ]
    },
    {
      category: "Netting & Collateral",
      specifications: [
        "ISDA master agreements",
        "CSA collateral modeling",
        "Margin period of risk",
        "Threshold and minimum transfer",
        "Currency mismatches"
      ]
    },
    {
      category: "Performance",
      specifications: [
        "Real-time calculation",
        "Parallel processing",
        "GPU acceleration",
        "Memory optimization",
        "Scalable architecture"
      ]
    }
  ];

  const useCases = [
    {
      icon: <Building className="w-6 h-6" />,
      title: "Investment Banks",
      description: "Trading book CVA/DVA calculations and regulatory compliance",
      applications: [
        "Daily CVA P&L calculation",
        "Regulatory capital requirements",
        "Trading limit monitoring",
        "Counterparty risk reporting"
      ]
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Commercial Banks",
      description: "Corporate lending and derivatives portfolio management",
      applications: [
        "Corporate loan pricing",
        "Derivatives portfolio valuation",
        "Credit risk management",
        "Basel III compliance"
      ]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Asset Managers",
      description: "Fund valuation and counterparty risk assessment",
      applications: [
        "Fund NAV calculations",
        "Counterparty selection",
        "Risk budgeting",
        "Performance attribution"
      ]
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Central Counterparties",
      description: "Margin calculations and default fund sizing",
      applications: [
        "Initial margin calculation",
        "Default fund contributions",
        "Stress testing",
        "Risk management"
      ]
    }
  ];

  const performanceMetrics = [
    { metric: "10x", description: "Faster than traditional methods" },
    { metric: "<5s", description: "Portfolio-wide CVA calculation" },
    { metric: "99.9%", description: "Calculation accuracy" },
    { metric: "24/7", description: "Real-time monitoring" }
  ];

  return (
    <>
      <Helmet>
        <title>CVA/DVA Calculation - XSigma Counterparty Risk Solutions</title>
        <meta name="description" content="XSigma CVA/DVA calculation engine with Enhanced AAD technology. Real-time counterparty risk calculations, regulatory compliance, and institutional-grade performance." />
        <meta name="keywords" content="CVA DVA calculation, counterparty risk, Enhanced AAD, Basel III, FRTB, credit value adjustment, XSigma solutions" />
        <link rel="canonical" href="https://xsigma.co.uk/solutions/cva-dva" />
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
              <span className="text-xsigma-navy font-semibold">CVA/DVA Calculation</span>
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
                  <Calculator className="w-12 h-12 text-xsigma-teal" />
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                CVA/DVA Calculation
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto mb-8">
                Advanced counterparty risk calculation engine with Enhanced AAD technology. 
                Real-time CVA/DVA/FVA calculations for regulatory compliance and risk management.
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
              <h2 className="text-3xl font-bold text-xsigma-navy mb-4">Advanced Counterparty Risk Engine</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive CVA/DVA calculation suite designed for institutional counterparty risk management
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

        {/* Calculation Types */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-xsigma-navy mb-4">Comprehensive Calculation Suite</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Full spectrum of counterparty risk adjustments with mathematical precision
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {calculationTypes.map((calc, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-xl font-bold text-xsigma-navy mb-2">{calc.name}</h3>
                  <p className="text-gray-600 mb-4">{calc.description}</p>
                  
                  <div className="bg-white p-4 rounded-lg mb-4 border-l-4 border-xsigma-teal">
                    <code className="text-sm text-xsigma-navy font-mono">{calc.formula}</code>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-xsigma-navy mb-2">Applications</h4>
                    <ul className="space-y-1">
                      {calc.applications.map((app, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <Star className="w-3 h-3 text-xsigma-teal mr-2 flex-shrink-0" />
                          {app}
                        </li>
                      ))}
                    </ul>
                  </div>
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
                Enterprise-grade technical capabilities for institutional deployment
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
                Trusted by leading financial institutions for counterparty risk management
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
              <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Counterparty Risk Management?</h2>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Experience the power of Enhanced AAD technology for institutional-grade CVA/DVA calculations.
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

export default CvaDva;
