import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Terminal, GitBranch, Zap, Download, Play, BookOpen, Users } from 'lucide-react';

const Developers: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const developerTools = [
    {
      title: 'Interactive API Explorer',
      description: 'Test API endpoints directly in your browser with real-time responses',
      icon: <Play className="w-8 h-8" />,
      features: ['Live API testing', 'Request/response examples', 'Authentication testing', 'Error handling'],
      status: 'Available',
      link: '/api-explorer'
    },
    {
      title: 'Sandbox Environment',
      description: 'Safe testing environment with sample data and unlimited API calls',
      icon: <Terminal className="w-8 h-8" />,
      features: ['Sample portfolios', 'Test data sets', 'No rate limits', 'Full API access'],
      status: 'Available',
      link: '/sandbox'
    },
    {
      title: 'Code Generator',
      description: 'Generate client code in multiple languages from API specifications',
      icon: <Code className="w-8 h-8" />,
      features: ['Python, R, C++ support', 'Custom configurations', 'Authentication setup', 'Error handling'],
      status: 'Beta',
      link: '/code-generator'
    },
    {
      title: 'GitHub Integration',
      description: 'Access sample projects, libraries, and community contributions',
      icon: <GitBranch className="w-8 h-8" />,
      features: ['Sample projects', 'Community libraries', 'Issue tracking', 'Contribution guidelines'],
      status: 'Available',
      link: 'https://github.com/xsigma-dev'
    }
  ];

  const quickStartProjects = [
    {
      title: 'CVA Calculator',
      description: 'Build a complete CVA calculation application using Enhanced AAD',
      language: 'Python',
      difficulty: 'Beginner',
      duration: '30 minutes',
      topics: ['API authentication', 'CVA calculations', 'Data visualization', 'Error handling']
    },
    {
      title: 'Risk Dashboard',
      description: 'Create a real-time risk monitoring dashboard with live market data',
      language: 'React + Python',
      difficulty: 'Intermediate',
      duration: '2 hours',
      topics: ['WebSocket connections', 'Real-time updates', 'Chart visualization', 'Portfolio management']
    },
    {
      title: 'Monte Carlo Engine',
      description: 'Implement high-performance Monte Carlo simulations with parallel processing',
      language: 'C++',
      difficulty: 'Advanced',
      duration: '4 hours',
      topics: ['Parallel computing', 'Memory optimization', 'Performance tuning', 'Result analysis']
    },
    {
      title: 'Options Pricing Model',
      description: 'Build sophisticated options pricing models with Greeks calculations',
      language: 'R',
      difficulty: 'Intermediate',
      duration: '1.5 hours',
      topics: ['Black-Scholes model', 'Greeks calculation', 'Sensitivity analysis', 'Data export']
    }
  ];

  const resources = [
    {
      title: 'Getting Started Guide',
      description: 'Complete guide to XSigma API integration and Enhanced AAD technology',
      type: 'Documentation',
      icon: <BookOpen className="w-6 h-6" />,
      link: '/docs/getting-started'
    },
    {
      title: 'SDK Downloads',
      description: 'Download official SDKs for Python, R, C++, and other languages',
      type: 'Downloads',
      icon: <Download className="w-6 h-6" />,
      link: '/downloads/sdks'
    },
    {
      title: 'Community Forum',
      description: 'Connect with other developers, ask questions, and share knowledge',
      type: 'Community',
      icon: <Users className="w-6 h-6" />,
      link: '/support/community'
    },
    {
      title: 'Video Tutorials',
      description: 'Step-by-step video tutorials for common integration scenarios',
      type: 'Learning',
      icon: <Play className="w-6 h-6" />,
      link: '/tutorials/videos'
    }
  ];

  const codeExamples = [
    {
      title: 'Quick CVA Calculation',
      language: 'Python',
      code: 'import xsigma\n\n# Initialize client\nclient = xsigma.Client(api_key="your_api_key")\n\n# Calculate CVA with Enhanced AAD\nresult = client.cva.calculate(\n    portfolio_id="portfolio_123",\n    counterparty_id="cp_456",\n    enhanced_aad=True,\n    precision="machine"\n)\n\nprint(f"CVA: {result.cva_value}")\nprint(f"Execution Time: {result.execution_time}ms")'
    },
    {
      title: 'Real-time Greeks',
      language: 'JavaScript',
      code: 'const xsigma = require(\'xsigma-sdk\');\n\nconst client = new xsigma.Client({\n  apiKey: \'your_api_key\',\n  environment: \'production\'\n});\n\n// Subscribe to real-time Greeks updates\nclient.greeks.subscribe({\n  instrumentId: \'option_789\',\n  greeks: [\'delta\', \'gamma\', \'vega\'],\n  onUpdate: (data) => {\n    console.log(\'Greeks Update:\', data);\n    updateDashboard(data);\n  }\n});'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Developer Portal - XSigma Enhanced AAD Development Resources | Quantitative Finance APIs</title>
        <meta name="description" content="XSigma Developer Portal: APIs, SDKs, documentation, and tools for building quantitative finance applications with Enhanced AAD technology. Python, R, C++ support." />
        <meta name="keywords" content="XSigma developer portal, Enhanced AAD SDK, quantitative finance API, CVA API, derivatives pricing SDK, financial development tools" />
        <link rel="canonical" href="https://xsigma.co.uk/support/developers" />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Breadcrumb Navigation */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <a href="/" className="text-xsigma-navy hover:text-xsigma-teal transition-colors">Home</a>
              <span className="text-gray-400">/</span>
              <a href="/support" className="text-xsigma-navy hover:text-xsigma-teal transition-colors">Support</a>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">Developer Portal</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-xsigma-navy via-xsigma-navy to-blue-900 text-white py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                Developer <span className="text-xsigma-teal">Portal</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
                Build powerful quantitative finance applications with XSigma's Enhanced AAD technology. 
                Access APIs, SDKs, documentation, and developer tools.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Developer Tools */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Developer Tools</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive development tools designed to accelerate your quantitative finance 
                application development with Enhanced AAD technology.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-8"
            >
              {developerTools.map((tool, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-xsigma-teal/10 w-12 h-12 rounded-full flex items-center justify-center">
                      <div className="text-xsigma-teal">{tool.icon}</div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      tool.status === 'Available' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {tool.status}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-xsigma-navy mb-3">{tool.title}</h3>
                  <p className="text-gray-600 mb-4">{tool.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-xsigma-navy mb-2">Features:</h4>
                    <ul className="space-y-1">
                      {tool.features.map((feature, idx) => (
                        <li key={idx} className="text-gray-600 text-sm flex items-center">
                          <span className="w-2 h-2 bg-xsigma-teal rounded-full mr-3"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <a
                    href={tool.link}
                    className="inline-flex items-center text-xsigma-teal hover:text-xsigma-navy font-semibold transition-colors"
                  >
                    Access Tool
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Quick Start Projects */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Quick Start Projects</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Learn XSigma's Enhanced AAD technology through hands-on projects designed 
                for different skill levels and use cases.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-8"
            >
              {quickStartProjects.map((project, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-xsigma-navy">{project.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      project.difficulty === 'Beginner' 
                        ? 'bg-green-100 text-green-800'
                        : project.difficulty === 'Intermediate'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {project.difficulty}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="font-semibold text-xsigma-navy">Language: </span>
                      <span className="text-gray-600">{project.language}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-xsigma-navy">Duration: </span>
                      <span className="text-gray-600">{project.duration}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-xsigma-navy mb-2">Topics Covered:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.topics.map((topic, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <a
                    href={`/tutorials/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center text-xsigma-teal hover:text-xsigma-navy font-semibold transition-colors"
                  >
                    Start Project
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Code Examples */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Code Examples</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get started quickly with these code examples demonstrating key XSigma API features 
                and Enhanced AAD technology integration.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-8"
            >
              {codeExamples.map((example, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-gray-50 rounded-xl p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-xsigma-navy">{example.title}</h3>
                    <span className="bg-xsigma-teal/10 text-xsigma-teal px-3 py-1 rounded-full text-sm font-semibold">
                      {example.language}
                    </span>
                  </div>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{example.code}</code>
                  </pre>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Developer Resources */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Developer Resources</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Access comprehensive resources to support your development journey with 
                XSigma's Enhanced AAD technology.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {resources.map((resource, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
                >
                  <div className="bg-xsigma-teal/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-xsigma-teal">{resource.icon}</div>
                  </div>
                  <h3 className="text-lg font-bold text-xsigma-navy mb-2">{resource.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded mb-4 inline-block">
                    {resource.type}
                  </span>
                  <div>
                    <a
                      href={resource.link}
                      className="inline-flex items-center text-xsigma-teal hover:text-xsigma-navy font-semibold transition-colors text-sm"
                    >
                      Access Resource
                      <ArrowRight className="ml-1 w-3 h-3" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-br from-xsigma-navy to-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">
                Start Building Today
              </h2>
              <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
                Join thousands of developers building the future of quantitative finance 
                with XSigma's Enhanced AAD technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/support/api-documentation"
                  className="inline-flex items-center px-8 py-4 bg-xsigma-teal hover:bg-xsigma-teal/90 text-white font-semibold rounded-lg transition-colors duration-300"
                >
                  View API Docs
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
                <a
                  href="/sandbox"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-xsigma-navy font-semibold rounded-lg transition-colors duration-300"
                >
                  Try Sandbox
                  <Zap className="ml-2 w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Developers;
