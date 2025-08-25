import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Key, Database, Zap, CheckCircle, Copy, ExternalLink, Book, FileText, Globe } from 'lucide-react';

const ApiDocumentation: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState('authentication');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

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

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const documentationTabs = [
    {
      id: 'overview',
      name: 'API Overview',
      description: 'Quick start guide and key endpoints',
      icon: <Zap className="w-5 h-5" />
    },
    {
      id: 'detailed',
      name: 'Detailed Documentation',
      description: 'Complete API reference and specifications',
      icon: <FileText className="w-5 h-5" />
    },
    {
      id: 'interactive',
      name: 'Interactive Docs',
      description: 'Try API endpoints with live examples',
      icon: <Globe className="w-5 h-5" />
    }
  ];

  const endpoints = [
    {
      id: 'authentication',
      name: 'Authentication',
      method: 'POST',
      path: '/api/v1/auth',
      description: 'Authenticate and obtain access tokens',
      icon: <Key className="w-5 h-5" />
    },
    {
      id: 'cva',
      name: 'CVA Calculation',
      method: 'POST',
      path: '/api/v1/cva/calculate',
      description: 'Calculate Credit Value Adjustment with Enhanced AAD',
      icon: <Database className="w-5 h-5" />
    },
    {
      id: 'greeks',
      name: 'Greeks',
      method: 'GET',
      path: '/api/v1/greeks/{instrument_id}',
      description: 'Real-time Greeks calculations',
      icon: <Zap className="w-5 h-5" />
    },
    {
      id: 'montecarlo',
      name: 'Monte Carlo',
      method: 'POST',
      path: '/api/v1/simulation/montecarlo',
      description: 'Monte Carlo simulations with AAD acceleration',
      icon: <Code className="w-5 h-5" />
    }
  ];

  const codeExamples = {
    authentication: {
      python: 'import xsigma\n\nclient = xsigma.Client(api_key="your_api_key")\nauth_response = client.authenticate()\nprint(f"Token: {auth_response.access_token}")',
      r: 'library(xsigma)\n\nclient <- xsigma_client("your_api_key")\nauth_response <- authenticate(client)\nprint(paste("Token:", auth_response$access_token))',
      cpp: '#include <xsigma/client.h>\n\nxsigma::Client client("your_api_key");\nauto auth_response = client.authenticate();\nstd::cout << "Token: " << auth_response.access_token << std::endl;'
    },
    cva: {
      python: 'result = client.cva.calculate(\n    portfolio_id="portfolio_123",\n    counterparty_id="cp_456",\n    enhanced_aad=True\n)\nprint(f"CVA: {result.cva_value}")',
      r: 'result <- calculate_cva(client,\n    portfolio_id = "portfolio_123",\n    counterparty_id = "cp_456",\n    enhanced_aad = TRUE\n)\nprint(paste("CVA:", result$cva_value))',
      cpp: 'auto result = client.cva().calculate({\n    .portfolio_id = "portfolio_123",\n    .counterparty_id = "cp_456",\n    .enhanced_aad = true\n});\nstd::cout << "CVA: " << result.cva_value << std::endl;'
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverviewContent();
      case 'detailed':
        return renderDetailedContent();
      case 'interactive':
        return renderInteractiveContent();
      default:
        return renderOverviewContent();
    }
  };

  const renderOverviewContent = () => (
    <div>
      {/* Quick Start Guide */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Quick Start Guide</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started with XSigma Enhanced AAD API in minutes. Follow our step-by-step guide 
              to integrate powerful quantitative finance calculations into your applications.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-xsigma-navy mb-6">Installation & Setup</h3>
              <div className="space-y-4">
                {[
                  { step: '1', title: 'Install SDK', description: 'Choose your preferred language SDK' },
                  { step: '2', title: 'Get API Key', description: 'Register and obtain your API credentials' },
                  { step: '3', title: 'Initialize Client', description: 'Set up the client with your API key' },
                  { step: '4', title: 'Make First Call', description: 'Start with authentication endpoint' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-xsigma-teal text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-xsigma-navy">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gray-900 rounded-xl p-6 text-white"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xsigma-teal font-semibold">Python Example</span>
                <button
                  onClick={() => copyToClipboard(codeExamples.authentication.python, 'quick-start')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {copiedCode === 'quick-start' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <pre className="text-sm overflow-x-auto">
                <code>{codeExamples.authentication.python}</code>
              </pre>
            </motion.div>
          </div>
        </div>
      </section>

      {/* API Endpoints Overview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Core API Endpoints</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive API endpoints designed for quantitative finance applications.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {endpoints.map((endpoint, index) => (
              <motion.div
                key={endpoint.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setSelectedEndpoint(endpoint.id)}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                  selectedEndpoint === endpoint.id
                    ? 'bg-xsigma-navy text-white shadow-xl'
                    : 'bg-white hover:shadow-lg'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg ${
                    selectedEndpoint === endpoint.id ? 'bg-xsigma-teal/20' : 'bg-xsigma-teal/10'
                  }`}>
                    <div className={selectedEndpoint === endpoint.id ? 'text-xsigma-teal' : 'text-xsigma-teal'}>
                      {endpoint.icon}
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    selectedEndpoint === endpoint.id
                      ? 'bg-xsigma-teal text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {endpoint.method}
                  </span>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${
                  selectedEndpoint === endpoint.id ? 'text-white' : 'text-xsigma-navy'
                }`}>
                  {endpoint.name}
                </h3>
                <p className={`text-sm mb-3 ${
                  selectedEndpoint === endpoint.id ? 'text-gray-200' : 'text-gray-600'
                }`}>
                  {endpoint.description}
                </p>
                <code className={`text-xs ${
                  selectedEndpoint === endpoint.id ? 'text-xsigma-teal' : 'text-gray-500'
                }`}>
                  {endpoint.path}
                </code>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const renderDetailedContent = () => (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Complete API Documentation</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Access the comprehensive Sphinx-generated API documentation with detailed specifications, 
            examples, and technical references for all XSigma Enhanced AAD endpoints.
          </p>
        </motion.div>

        {/* Documentation Access Options */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-50 p-8 rounded-xl"
          >
            <div className="flex items-center mb-4">
              <FileText className="w-8 h-8 text-xsigma-teal mr-3" />
              <h3 className="text-2xl font-bold text-xsigma-navy">Embedded Documentation</h3>
            </div>
            <p className="text-gray-600 mb-6">
              View the complete API documentation within the XSigma interface, 
              maintaining consistent navigation and branding.
            </p>
            <button
              onClick={() => setActiveTab('interactive')}
              className="inline-flex items-center px-6 py-3 bg-xsigma-teal hover:bg-xsigma-teal/90 text-white font-semibold rounded-lg transition-colors duration-300"
            >
              View Embedded Docs
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gray-50 p-8 rounded-xl"
          >
            <div className="flex items-center mb-4">
              <ExternalLink className="w-8 h-8 text-xsigma-teal mr-3" />
              <h3 className="text-2xl font-bold text-xsigma-navy">Full Documentation</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Access the complete Sphinx documentation in a dedicated view 
              with full navigation and search capabilities.
            </p>
            <a
              href="/sphinx-doc/xsigma-1.1-3/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-xsigma-navy hover:bg-xsigma-navy/90 text-white font-semibold rounded-lg transition-colors duration-300"
            >
              Open Full Docs
              <ExternalLink className="ml-2 w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Quick Links to Key Documentation Sections */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white border border-gray-200 rounded-xl p-8"
        >
          <h3 className="text-2xl font-bold text-xsigma-navy mb-6 text-center">Quick Access to Key Sections</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Getting Started', path: '/sphinx-doc/xsigma-1.1-3/getting_started.html', icon: <Key className="w-5 h-5" /> },
              { name: 'API Reference', path: '/sphinx-doc/xsigma-1.1-3/api_reference.html', icon: <Code className="w-5 h-5" /> },
              { name: 'CVA/DVA Guide', path: '/sphinx-doc/xsigma-1.1-3/cva_dva.html', icon: <Database className="w-5 h-5" /> },
              { name: 'Examples', path: '/sphinx-doc/xsigma-1.1-3/examples.html', icon: <Book className="w-5 h-5" /> }
            ].map((section, index) => (
              <a
                key={index}
                href={section.path}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-300 group"
              >
                <div className="text-xsigma-teal mr-3 group-hover:text-xsigma-navy transition-colors">
                  {section.icon}
                </div>
                <div>
                  <div className="font-semibold text-xsigma-navy group-hover:text-xsigma-teal transition-colors">
                    {section.name}
                  </div>
                  <div className="text-xs text-gray-500">View documentation</div>
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );

  const renderInteractiveContent = () => (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Interactive API Documentation</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Explore the XSigma Enhanced AAD API documentation with integrated navigation 
            and XSigma branding. Full Sphinx documentation embedded seamlessly.
          </p>
        </motion.div>

        {/* Embedded Sphinx Documentation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg"
        >
          <div className="bg-xsigma-navy text-white p-4 flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="w-5 h-5 text-xsigma-teal mr-2" />
              <span className="font-semibold">XSigma Enhanced AAD API Documentation</span>
            </div>
            <div className="flex items-center space-x-2">
              <a
                href="/sphinx-doc/xsigma-1.1-3/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1 bg-xsigma-teal hover:bg-xsigma-teal/90 text-white text-sm font-medium rounded transition-colors duration-300"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                Full Screen
              </a>
            </div>
          </div>
          <div className="relative" style={{ height: '800px' }}>
            <iframe
              src="/sphinx-doc/xsigma-1.1-3/index.html"
              className="w-full h-full border-0"
              title="XSigma Enhanced AAD API Documentation"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );

  return (
    <>
      <Helmet>
        <title>API Documentation - XSigma Enhanced AAD API Reference | Quantitative Finance</title>
        <meta name="description" content="Complete XSigma API documentation for Enhanced AAD technology. CVA/DVA calculations, Greeks, Monte Carlo simulations, and risk management APIs for quantitative finance." />
        <meta name="keywords" content="XSigma API documentation, Enhanced AAD API, CVA API, derivatives pricing API, quantitative finance API, risk management API" />
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
              <span className="text-xsigma-navy font-semibold">API Documentation</span>
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
                API Documentation
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto mb-8">
                Complete reference for XSigma Enhanced AAD API. Build powerful quantitative finance 
                applications with our comprehensive documentation and interactive examples.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="/sphinx-doc/xsigma-1.1-3/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-xsigma-teal hover:bg-xsigma-teal/90 text-white font-semibold rounded-lg transition-colors duration-300"
                >
                  <ExternalLink className="mr-2 w-5 h-5" />
                  View Full Documentation
                </a>
                <button
                  onClick={() => setActiveTab('interactive')}
                  className="inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors duration-300"
                >
                  <Globe className="mr-2 w-5 h-5" />
                  Try Interactive Docs
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Documentation Navigation Tabs */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4">
              {documentationTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-3 px-6 py-4 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-xsigma-navy text-white shadow-lg'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md'
                  }`}
                >
                  <div className={activeTab === tab.id ? 'text-xsigma-teal' : 'text-gray-500'}>
                    {tab.icon}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">{tab.name}</div>
                    <div className={`text-xs ${activeTab === tab.id ? 'text-gray-200' : 'text-gray-500'}`}>
                      {tab.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Tab Content */}
        {renderTabContent()}

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-br from-xsigma-navy to-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
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

export default ApiDocumentation;
