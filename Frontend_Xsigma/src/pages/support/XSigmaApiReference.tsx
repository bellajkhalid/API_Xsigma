import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Code, 
  Key, 
  Database, 
  Zap, 
  CheckCircle, 
  Copy, 
  ExternalLink, 
  Book, 
  FileText, 
  Globe,
  Calculator,
  TrendingUp,
  BarChart3,
  Activity,
  Target,
  Settings,
  Play,
  Download
} from 'lucide-react';

// TypeScript interfaces for API documentation structure
interface MarketModel {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  useCases: string[];
  documentation: string;
}

const XSigmaApiReference: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('models');

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Market Models from Sphinx documentation
  const marketModels: MarketModel[] = [
    {
      id: 'sabr',
      name: 'SABR/GSABR Models',
      category: 'Interest Rate Volatility',
      description: 'Stochastic Alpha Beta Rho model for interest rate derivatives with Enhanced AAD calibration',
      icon: <BarChart3 className="w-6 h-6" />,
      features: [
        'Stochastic volatility modeling',
        'Enhanced AAD calibration',
        'Real-time parameter estimation',
        'Multi-currency support'
      ],
      useCases: [
        'Interest rate options pricing',
        'Volatility surface construction',
        'Risk management',
        'Portfolio optimization'
      ],
      documentation: '/sphinx-doc/xsigma-1.1-3/market/SABR/index.html'
    },
    {
      id: 'asv',
      name: 'Analytical Sigma Volatility',
      category: 'Volatility Models',
      description: 'Advanced volatility modeling with analytical solutions and Enhanced AAD acceleration',
      icon: <TrendingUp className="w-6 h-6" />,
      features: [
        'Analytical volatility solutions',
        'Enhanced AAD acceleration',
        'Real-time calibration',
        'Multi-asset support'
      ],
      useCases: [
        'Volatility trading',
        'Options market making',
        'Risk analytics',
        'Hedge ratio calculation'
      ],
      documentation: '/sphinx-doc/xsigma-1.1-3/market/ASV/index.html'
    },
    {
      id: 'curve-construction',
      name: 'Curve Construction Framework',
      category: 'Interest Rate Curves',
      description: 'Comprehensive curve construction and risk framework with Enhanced AAD sensitivities',
      icon: <Activity className="w-6 h-6" />,
      features: [
        'Multi-curve bootstrapping',
        'Enhanced AAD sensitivities',
        'Cross-currency curves',
        'Real-time updates'
      ],
      useCases: [
        'Yield curve construction',
        'Cross-currency basis',
        'Risk factor mapping',
        'Regulatory reporting'
      ],
      documentation: '/sphinx-doc/xsigma-1.1-3/market/Curve%20Construction/index.html'
    },
    {
      id: 'lsv',
      name: 'Local Stochastic Volatility',
      category: 'Equity/FX Models',
      description: 'Local Stochastic Volatility models with PDE and Monte Carlo implementations',
      icon: <Target className="w-6 h-6" />,
      features: [
        'Local volatility surfaces',
        'Stochastic volatility dynamics',
        'PDE and Monte Carlo solvers',
        'Enhanced AAD Greeks'
      ],
      useCases: [
        'Exotic options pricing',
        'Volatility arbitrage',
        'Model calibration',
        'Sensitivity analysis'
      ],
      documentation: '/sphinx-doc/xsigma-1.1-3/market/LSV/index.html'
    }
  ];

  const languages = [
    { id: 'python', name: 'Python', icon: '🐍' },
    { id: 'cpp', name: 'C++', icon: '⚡' },
    { id: 'r', name: 'R', icon: '📊' },
    { id: 'javascript', name: 'JavaScript', icon: '🌐' }
  ];

  const sections = [
    { id: 'models', name: 'Market Models', icon: <Calculator className="w-4 h-4" /> },
    { id: 'examples', name: 'Code Examples', icon: <Play className="w-4 h-4" /> },
    { id: 'downloads', name: 'SDK Downloads', icon: <Download className="w-4 h-4" /> }
  ];

  return (
    <>
      <Helmet>
        <title>XSigma Enhanced AAD API Reference - Quantitative Finance Documentation</title>
        <meta name="description" content="Complete XSigma Enhanced AAD API reference with market models, derivatives pricing, risk calculations, and Monte Carlo simulations for quantitative finance." />
        <meta name="keywords" content="XSigma API, Enhanced AAD, quantitative finance API, derivatives pricing, risk management, SABR model, CVA calculation, Monte Carlo simulation" />
        <link rel="canonical" href="https://xsigma.co.uk/support/api-reference" />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Breadcrumb Navigation */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <a href="/" className="text-gray-500 hover:text-xsigma-navy transition-colors">Home</a>
              <span className="text-gray-400">/</span>
              <a href="/support" className="text-gray-500 hover:text-xsigma-navy transition-colors">Support</a>
              <span className="text-gray-400">/</span>
              <span className="text-xsigma-navy font-semibold">API Reference</span>
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
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Enhanced AAD API Reference
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto mb-8">
                Comprehensive API documentation for XSigma Enhanced AAD technology. 
                Build powerful quantitative finance applications with 10x faster calculations and machine precision.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="/sphinx-doc/xsigma-1.1-3/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-xsigma-teal hover:bg-xsigma-teal/90 text-white font-semibold rounded-lg transition-colors duration-300"
                >
                  <ExternalLink className="mr-2 w-5 h-5" />
                  Full Sphinx Documentation
                </a>
                <button
                  onClick={() => setActiveSection('examples')}
                  className="inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors duration-300"
                >
                  <Play className="mr-2 w-5 h-5" />
                  Try Code Examples
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section Navigation */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeSection === section.id
                      ? 'bg-xsigma-navy text-white shadow-lg'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md'
                  }`}
                >
                  <div className={activeSection === section.id ? 'text-xsigma-teal' : 'text-gray-500'}>
                    {section.icon}
                  </div>
                  <span>{section.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Market Models Section */}
          {activeSection === 'models' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-xsigma-navy mb-8 text-center">Market Models & Frameworks</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {marketModels.map((model, index) => (
                  <motion.div
                    key={model.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex items-center mb-4">
                      <div className="bg-xsigma-teal/10 p-3 rounded-lg mr-4">
                        <div className="text-xsigma-teal">{model.icon}</div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-xsigma-navy">{model.name}</h3>
                        <p className="text-sm text-gray-500">{model.category}</p>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{model.description}</p>

                    <div className="mb-4">
                      <h4 className="font-semibold text-xsigma-navy mb-2">Key Features</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {model.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center">
                            <CheckCircle className="w-3 h-3 text-xsigma-teal mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-xsigma-navy mb-2">Use Cases</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {model.useCases.map((useCase, idx) => (
                          <li key={idx} className="flex items-center">
                            <Target className="w-3 h-3 text-xsigma-teal mr-2" />
                            {useCase}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href={model.documentation}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-xsigma-navy hover:bg-xsigma-navy/90 text-white text-sm font-semibold rounded-lg transition-colors duration-300"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      View Documentation
                      <ExternalLink className="w-3 h-3 ml-2" />
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Code Examples Section */}
          {activeSection === 'examples' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-xsigma-navy mb-8 text-center">Interactive Code Examples</h2>

              {/* Language Selector */}
              <div className="flex justify-center mb-8">
                <div className="bg-gray-100 p-1 rounded-lg">
                  {languages.map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => setSelectedLanguage(lang.id)}
                      className={`px-4 py-2 rounded-md font-medium transition-colors ${
                        selectedLanguage === lang.id
                          ? 'bg-xsigma-navy text-white'
                          : 'text-gray-600 hover:text-xsigma-navy'
                      }`}
                    >
                      {lang.icon} {lang.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Example Categories */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Quick Start Example */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <Zap className="w-6 h-6 text-xsigma-teal mr-3" />
                    <h3 className="text-xl font-bold text-xsigma-navy">Quick Start</h3>
                  </div>
                  <p className="text-gray-600 mb-4">Get started with XSigma Enhanced AAD in minutes</p>
                  <div className="bg-gray-900 rounded-lg p-4 text-white relative">
                    <button
                      onClick={() => copyToClipboard(
                        selectedLanguage === 'python' ?
                          `import xsigma\n\n# Initialize client with Enhanced AAD\nclient = xsigma.Client(\n    api_key="your_api_key",\n    enhanced_aad=True\n)\n\n# Your first calculation\nresult = client.market.get_data("EUR/USD")\nprint(f"Success! Retrieved {len(result.data)} data points")` :
                        selectedLanguage === 'cpp' ?
                          `#include <xsigma/client.h>\n\n// Initialize client with Enhanced AAD\nxsigma::Client client("your_api_key", true);\n\n// Your first calculation\nauto result = client.market().get_data("EUR/USD");\nstd::cout << "Success! Retrieved " << result.size() << " data points" << std::endl;` :
                          `library(xsigma)\n\n# Initialize client with Enhanced AAD\nclient <- xsigma_client("your_api_key", enhanced_aad = TRUE)\n\n# Your first calculation\nresult <- get_market_data(client, "EUR/USD")\nprint(paste("Success! Retrieved", nrow(result$data), "data points"))`,
                        'quickstart'
                      )}
                      className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors"
                    >
                      {copiedCode === 'quickstart' ?
                        <CheckCircle className="w-4 h-4" /> :
                        <Copy className="w-4 h-4" />
                      }
                    </button>
                    <pre className="text-sm overflow-x-auto">
                      <code>
                        {selectedLanguage === 'python' ?
                          `import xsigma

# Initialize client with Enhanced AAD
client = xsigma.Client(
    api_key="your_api_key",
    enhanced_aad=True
)

# Your first calculation
result = client.market.get_data("EUR/USD")
print(f"Success! Retrieved {len(result.data)} data points")` :
                        selectedLanguage === 'cpp' ?
                          `#include <xsigma/client.h>

// Initialize client with Enhanced AAD
xsigma::Client client("your_api_key", true);

// Your first calculation
auto result = client.market().get_data("EUR/USD");
std::cout << "Success! Retrieved " << result.size()
          << " data points" << std::endl;` :
                          `library(xsigma)

# Initialize client with Enhanced AAD
client <- xsigma_client("your_api_key", enhanced_aad = TRUE)

# Your first calculation
result <- get_market_data(client, "EUR/USD")
print(paste("Success! Retrieved", nrow(result$data), "data points"))`
                        }
                      </code>
                    </pre>
                  </div>
                </div>

                {/* Advanced Example */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <Settings className="w-6 h-6 text-xsigma-teal mr-3" />
                    <h3 className="text-xl font-bold text-xsigma-navy">Advanced Portfolio Risk</h3>
                  </div>
                  <p className="text-gray-600 mb-4">Calculate portfolio CVA with Enhanced AAD sensitivities</p>
                  <div className="bg-gray-900 rounded-lg p-4 text-white relative">
                    <button
                      onClick={() => copyToClipboard(
                        selectedLanguage === 'python' ?
                          `# Portfolio risk calculation with Enhanced AAD\nportfolio_risk = client.risk.calculate_portfolio_cva(\n    portfolio_id="institutional_portfolio",\n    calculation_date="2024-01-15",\n    enhanced_aad=True,\n    sensitivities=["delta", "gamma", "vega"],\n    confidence_level=0.99\n)\n\nprint(f"Portfolio CVA: {portfolio_risk.cva_value}")\nprint(f"VaR (99%): {portfolio_risk.var_99}")\nprint(f"Calculation time: {portfolio_risk.execution_time}ms")` :
                        selectedLanguage === 'cpp' ?
                          `// Portfolio risk calculation with Enhanced AAD\nauto risk_request = xsigma::PortfolioRiskRequest()\n    .portfolio_id("institutional_portfolio")\n    .calculation_date("2024-01-15")\n    .enhanced_aad(true)\n    .sensitivities({"delta", "gamma", "vega"})\n    .confidence_level(0.99);\n\nauto portfolio_risk = client.risk().calculate_portfolio_cva(risk_request);\nstd::cout << "Portfolio CVA: $" << std::fixed << std::setprecision(2) \n          << portfolio_risk.cva_value << std::endl;` :
                          `# Portfolio risk calculation with Enhanced AAD\nportfolio_risk <- calculate_portfolio_cva(client,\n    portfolio_id = "institutional_portfolio",\n    calculation_date = "2024-01-15",\n    enhanced_aad = TRUE,\n    sensitivities = c("delta", "gamma", "vega"),\n    confidence_level = 0.99\n)\n\nprint(paste("Portfolio CVA:", scales::dollar(portfolio_risk$cva_value)))\nprint(paste("VaR (99%):", scales::dollar(portfolio_risk$var_99)))`,
                        'advanced'
                      )}
                      className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors"
                    >
                      {copiedCode === 'advanced' ?
                        <CheckCircle className="w-4 h-4" /> :
                        <Copy className="w-4 h-4" />
                      }
                    </button>
                    <pre className="text-sm overflow-x-auto">
                      <code>
                        {selectedLanguage === 'python' ?
                          `# Portfolio risk calculation with Enhanced AAD
portfolio_risk = client.risk.calculate_portfolio_cva(
    portfolio_id="institutional_portfolio",
    calculation_date="2024-01-15",
    enhanced_aad=True,
    sensitivities=["delta", "gamma", "vega"],
    confidence_level=0.99
)

print(f"Portfolio CVA: {portfolio_risk.cva_value}")
print(f"VaR (99%): {portfolio_risk.var_99}")
print(f"Calculation time: {portfolio_risk.execution_time}ms")` :
                        selectedLanguage === 'cpp' ?
                          `// Portfolio risk calculation with Enhanced AAD
auto risk_request = xsigma::PortfolioRiskRequest()
    .portfolio_id("institutional_portfolio")
    .calculation_date("2024-01-15")
    .enhanced_aad(true)
    .sensitivities({"delta", "gamma", "vega"})
    .confidence_level(0.99);

auto portfolio_risk = client.risk().calculate_portfolio_cva(risk_request);
std::cout << "Portfolio CVA: $" << std::fixed << std::setprecision(2)
          << portfolio_risk.cva_value << std::endl;` :
                          `# Portfolio risk calculation with Enhanced AAD
portfolio_risk <- calculate_portfolio_cva(client,
    portfolio_id = "institutional_portfolio",
    calculation_date = "2024-01-15",
    enhanced_aad = TRUE,
    sensitivities = c("delta", "gamma", "vega"),
    confidence_level = 0.99
)

print(paste("Portfolio CVA:", scales::dollar(portfolio_risk$cva_value)))
print(paste("VaR (99%):", scales::dollar(portfolio_risk$var_99)))`
                        }
                      </code>
                    </pre>
                  </div>
                </div>
              </div>

              {/* Performance Comparison */}
              <div className="mt-12 bg-gradient-to-r from-xsigma-navy/5 to-xsigma-teal/5 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-xsigma-navy mb-6 text-center">Enhanced AAD Performance</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-xsigma-teal mb-2">10x</div>
                    <div className="text-sm text-gray-600">Faster Calculations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-xsigma-teal mb-2">Machine</div>
                    <div className="text-sm text-gray-600">Precision Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-xsigma-teal mb-2">Real-time</div>
                    <div className="text-sm text-gray-600">Risk Sensitivities</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* SDK Downloads Section */}
          {activeSection === 'downloads' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-xsigma-navy mb-8 text-center">SDK Downloads & Installation</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                  {
                    name: 'Python SDK',
                    icon: '🐍',
                    version: 'v2.1.0',
                    size: '45 MB',
                    install: 'pip install xsigma-enhanced-aad',
                    docs: '/sphinx-doc/xsigma-1.1-3/getting_started/using_python.html'
                  },
                  {
                    name: 'C++ SDK',
                    icon: '⚡',
                    version: 'v2.1.0',
                    size: '120 MB',
                    install: 'Download and extract SDK package',
                    docs: '/sphinx-doc/xsigma-1.1-3/getting_started/using_cpp.html'
                  },
                  {
                    name: 'R Package',
                    icon: '📊',
                    version: 'v2.1.0',
                    size: '35 MB',
                    install: 'install.packages("xsigma")',
                    docs: '/sphinx-doc/xsigma-1.1-3/api/index.html'
                  },
                  {
                    name: 'JavaScript SDK',
                    icon: '🌐',
                    version: 'v2.1.0',
                    size: '25 MB',
                    install: 'npm install xsigma-sdk',
                    docs: '/sphinx-doc/xsigma-1.1-3/getting_started/using_js.html'
                  }
                ].map((sdk, index) => (
                  <motion.div
                    key={sdk.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">{sdk.icon}</div>
                      <h3 className="text-lg font-bold text-xsigma-navy">{sdk.name}</h3>
                      <div className="flex justify-center items-center space-x-2 text-sm text-gray-500">
                        <span>{sdk.version}</span>
                        <span>•</span>
                        <span>{sdk.size}</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <code className="text-sm text-xsigma-navy">{sdk.install}</code>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 bg-xsigma-teal hover:bg-xsigma-teal/90 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
                        <Download className="w-4 h-4 inline mr-1" />
                        Download
                      </button>
                      <a
                        href={sdk.docs}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
                      >
                        <Book className="w-4 h-4 inline" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* System Requirements */}
              <div className="bg-white border border-gray-200 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-xsigma-navy mb-6">System Requirements</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-xsigma-navy mb-3">Minimum Requirements</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-xsigma-teal mr-2" />
                        64-bit operating system (Windows 10+, macOS 10.15+, Linux)
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-xsigma-teal mr-2" />
                        8 GB RAM (16 GB recommended)
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-xsigma-teal mr-2" />
                        2 GB available disk space
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-xsigma-teal mr-2" />
                        Internet connection for API access
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-xsigma-navy mb-3">Recommended for Enhanced AAD</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-xsigma-teal mr-2" />
                        Multi-core CPU (8+ cores recommended)
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-xsigma-teal mr-2" />
                        32 GB RAM for large portfolios
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-xsigma-teal mr-2" />
                        GPU acceleration support (CUDA/OpenCL)
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-xsigma-teal mr-2" />
                        High-speed network connection
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-br from-xsigma-navy to-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Ready to Build with Enhanced AAD?</h2>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Join leading financial institutions using XSigma Enhanced AAD for faster, 
                more accurate quantitative finance calculations.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="/support/developers"
                  className="inline-flex items-center px-8 py-4 bg-xsigma-teal hover:bg-xsigma-teal/90 text-white font-semibold rounded-lg transition-colors duration-300"
                >
                  Developer Portal
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors duration-300"
                >
                  Contact Sales
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

export default XSigmaApiReference;
