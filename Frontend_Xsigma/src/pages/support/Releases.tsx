import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Star, Bug, Zap, Shield, Calendar, CheckCircle } from 'lucide-react';

const Releases: React.FC = () => {
  const [selectedVersion, setSelectedVersion] = useState('2.1.0');

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

  const releases = [
    {
      version: '2.1.0',
      date: '2024-01-15',
      type: 'Major Release',
      status: 'Latest',
      highlights: [
        'Enhanced AAD 3.0 algorithm with 40% performance improvement',
        'New FVA (Funding Valuation Adjustment) calculation module',
        'Real-time Greeks calculation with machine precision',
        'Improved Python SDK with NumPy 2.0 support'
      ],
      features: [
        {
          category: 'Performance',
          items: [
            'Enhanced AAD 3.0 algorithm implementation',
            '40% faster CVA calculations',
            'Optimized memory usage for large portfolios',
            'Parallel processing improvements'
          ]
        },
        {
          category: 'New Features',
          items: [
            'FVA calculation module',
            'Real-time market data streaming',
            'Advanced Greeks calculation',
            'Portfolio optimization tools'
          ]
        },
        {
          category: 'API Enhancements',
          items: [
            'New REST endpoints for FVA',
            'WebSocket support for real-time data',
            'Improved error handling',
            'Enhanced authentication flow'
          ]
        }
      ],
      bugFixes: [
        'Fixed memory leak in Monte Carlo simulations',
        'Resolved precision issues in exotic derivatives pricing',
        'Corrected timezone handling in market data feeds',
        'Fixed authentication token refresh mechanism'
      ],
      breaking: [
        'Updated API authentication to OAuth 2.0 (deprecated API keys)',
        'Changed response format for CVA calculations',
        'Removed deprecated v1.x compatibility layer'
      ],
      migration: 'Migration guide available for upgrading from v2.0.x'
    },
    {
      version: '2.0.5',
      date: '2023-12-10',
      type: 'Patch Release',
      status: 'Stable',
      highlights: [
        'Critical security updates',
        'Bug fixes for Monte Carlo engine',
        'Improved error handling',
        'Performance optimizations'
      ],
      features: [
        {
          category: 'Security',
          items: [
            'Updated SSL/TLS certificates',
            'Enhanced API rate limiting',
            'Improved input validation',
            'Security audit compliance'
          ]
        },
        {
          category: 'Bug Fixes',
          items: [
            'Fixed Monte Carlo convergence issues',
            'Resolved memory allocation problems',
            'Corrected date calculation edge cases',
            'Fixed concurrent access issues'
          ]
        }
      ],
      bugFixes: [
        'Fixed critical security vulnerability in authentication',
        'Resolved Monte Carlo engine stability issues',
        'Corrected edge case in options pricing',
        'Fixed memory management in C++ SDK'
      ],
      breaking: [],
      migration: 'No migration required - backward compatible'
    },
    {
      version: '2.0.0',
      date: '2023-10-01',
      type: 'Major Release',
      status: 'Stable',
      highlights: [
        'Enhanced AAD 2.0 with machine precision',
        'Complete API redesign',
        'New Python and R SDKs',
        'Enterprise security features'
      ],
      features: [
        {
          category: 'Core Engine',
          items: [
            'Enhanced AAD 2.0 implementation',
            'Machine precision calculations',
            'Improved numerical stability',
            'Advanced error propagation'
          ]
        },
        {
          category: 'API Redesign',
          items: [
            'RESTful API architecture',
            'Comprehensive endpoint coverage',
            'Standardized response formats',
            'Enhanced documentation'
          ]
        },
        {
          category: 'SDKs',
          items: [
            'New Python SDK with pandas integration',
            'R package for quantitative analysts',
            'C++ library for high-performance applications',
            'JavaScript SDK for web applications'
          ]
        }
      ],
      bugFixes: [
        'Resolved numerical instability in complex derivatives',
        'Fixed threading issues in parallel calculations',
        'Corrected calendar handling for multiple currencies',
        'Improved error reporting and logging'
      ],
      breaking: [
        'Complete API redesign - not backward compatible with v1.x',
        'New authentication mechanism required',
        'Updated data formats and structures'
      ],
      migration: 'Comprehensive migration guide and tools provided'
    },
    {
      version: '1.9.2',
      date: '2023-08-15',
      type: 'Legacy Support',
      status: 'End of Life',
      highlights: [
        'Final release for v1.x series',
        'Critical security patches',
        'Extended support until 2024-12-31',
        'Migration tools to v2.x'
      ],
      features: [
        {
          category: 'Legacy Support',
          items: [
            'Extended security support',
            'Critical bug fixes only',
            'Migration assistance tools',
            'Documentation updates'
          ]
        }
      ],
      bugFixes: [
        'Security patches for known vulnerabilities',
        'Critical stability fixes',
        'Data integrity improvements'
      ],
      breaking: [],
      migration: 'Upgrade to v2.x recommended'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Latest': return 'bg-green-100 text-green-800';
      case 'Stable': return 'bg-blue-100 text-blue-800';
      case 'End of Life': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Major Release': return <Star className="w-5 h-5" />;
      case 'Patch Release': return <Bug className="w-5 h-5" />;
      case 'Legacy Support': return <Shield className="w-5 h-5" />;
      default: return <Zap className="w-5 h-5" />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Release Notes - XSigma Enhanced AAD Version History | Software Updates</title>
        <meta name="description" content="XSigma Enhanced AAD release notes and version history. Latest features, bug fixes, performance improvements, and migration guides for quantitative finance software." />
        <meta name="keywords" content="XSigma release notes, Enhanced AAD updates, software versions, bug fixes, new features, migration guides, quantitative finance software" />
        <link rel="canonical" href="https://xsigma.co.uk/support/releases" />
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
              <span className="text-gray-600">Release Notes</span>
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
                Release <span className="text-xsigma-teal">Notes</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
                Stay updated with the latest XSigma Enhanced AAD features, improvements, 
                and bug fixes. Track our continuous innovation in quantitative finance technology.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Version Overview */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Version History</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive release history of XSigma Enhanced AAD technology with detailed 
                feature updates, performance improvements, and migration information.
              </p>
            </motion.div>

            {/* Version Selector */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {releases.map((release) => (
                <button
                  key={release.version}
                  onClick={() => setSelectedVersion(release.version)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${
                    selectedVersion === release.version
                      ? 'bg-xsigma-navy text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {getTypeIcon(release.type)}
                  <span>v{release.version}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(release.status)}`}>
                    {release.status}
                  </span>
                </button>
              ))}
            </div>

            {/* Selected Release Details */}
            {releases.map((release) => (
              selectedVersion === release.version && (
                <motion.div
                  key={release.version}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-50 rounded-xl p-8"
                >
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                      <div className="bg-xsigma-teal/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                        <div className="text-xsigma-teal">{getTypeIcon(release.type)}</div>
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-xsigma-navy">Version {release.version}</h3>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="flex items-center text-gray-600">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(release.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(release.status)}`}>
                            {release.status}
                          </span>
                          <span className="text-gray-600">{release.type}</span>
                        </div>
                      </div>
                    </div>
                    <a
                      href={`/downloads/xsigma-v${release.version}`}
                      className="inline-flex items-center px-6 py-3 bg-xsigma-teal hover:bg-xsigma-teal/90 text-white font-semibold rounded-lg transition-colors duration-300"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </a>
                  </div>

                  {/* Release Highlights */}
                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-xsigma-navy mb-4">Release Highlights</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {release.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center bg-white p-4 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-xsigma-teal mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  {release.features && (
                    <div className="mb-8">
                      <h4 className="text-xl font-bold text-xsigma-navy mb-4">New Features & Improvements</h4>
                      <div className="space-y-6">
                        {release.features.map((category, idx) => (
                          <div key={idx} className="bg-white p-6 rounded-lg">
                            <h5 className="text-lg font-semibold text-xsigma-navy mb-3">{category.category}</h5>
                            <ul className="space-y-2">
                              {category.items.map((item, itemIdx) => (
                                <li key={itemIdx} className="flex items-center text-gray-700">
                                  <span className="w-2 h-2 bg-xsigma-teal rounded-full mr-3"></span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Bug Fixes */}
                  {release.bugFixes.length > 0 && (
                    <div className="mb-8">
                      <h4 className="text-xl font-bold text-xsigma-navy mb-4">Bug Fixes</h4>
                      <div className="bg-white p-6 rounded-lg">
                        <ul className="space-y-2">
                          {release.bugFixes.map((fix, idx) => (
                            <li key={idx} className="flex items-center text-gray-700">
                              <Bug className="w-4 h-4 text-red-500 mr-3 flex-shrink-0" />
                              {fix}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Breaking Changes */}
                  {release.breaking.length > 0 && (
                    <div className="mb-8">
                      <h4 className="text-xl font-bold text-red-600 mb-4">Breaking Changes</h4>
                      <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
                        <ul className="space-y-2">
                          {release.breaking.map((change, idx) => (
                            <li key={idx} className="flex items-start text-red-800">
                              <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                              {change}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Migration Information */}
                  {release.migration && (
                    <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                      <h4 className="text-lg font-semibold text-blue-900 mb-2">Migration Information</h4>
                      <p className="text-blue-800">{release.migration}</p>
                      <a
                        href={`/docs/migration/v${release.version}`}
                        className="inline-flex items-center mt-3 text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                      >
                        View Migration Guide
                        <ArrowRight className="ml-1 w-4 h-4" />
                      </a>
                    </div>
                  )}
                </motion.div>
              )
            ))}
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
                Stay Updated
              </h2>
              <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
                Subscribe to our release notifications to stay informed about the latest 
                XSigma Enhanced AAD updates and improvements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/downloads"
                  className="inline-flex items-center px-8 py-4 bg-xsigma-teal hover:bg-xsigma-teal/90 text-white font-semibold rounded-lg transition-colors duration-300"
                >
                  Download Latest Version
                  <Download className="ml-2 w-5 h-5" />
                </a>
                <a
                  href="/support/technical"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-xsigma-navy font-semibold rounded-lg transition-colors duration-300"
                >
                  Technical Support
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Releases;
