import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Globe, Shield, Database, Cloud, Code, CheckCircle } from 'lucide-react';

const Integrations: React.FC = () => {
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

  const integrationCategories = [
    {
      title: "Market Data Providers",
      description: "Real-time and historical market data integration for Enhanced AAD calculations",
      icon: <Database className="w-8 h-8" />,
      partners: [
        {
          name: "Bloomberg Terminal",
          description: "Native integration with Bloomberg Terminal for real-time market data feeds and Enhanced AAD calculations.",
          features: ["Real-time data feeds", "Historical data access", "API integration", "Custom analytics"],
          status: "Production Ready",
          logo: "/api/placeholder/120/60"
        },
        {
          name: "Refinitiv Eikon",
          description: "Seamless integration with Refinitiv platforms for comprehensive market data and analytics.",
          features: ["Multi-asset data", "News and analytics", "Risk data", "Regulatory content"],
          status: "Production Ready",
          logo: "/api/placeholder/120/60"
        },
        {
          name: "ICE Data Services",
          description: "Integration with ICE market data for derivatives and fixed income analytics.",
          features: ["Derivatives data", "Fixed income", "Credit data", "Reference data"],
          status: "Beta",
          logo: "/api/placeholder/120/60"
        }
      ]
    },
    {
      title: "Risk Management Platforms",
      description: "Integration with enterprise risk management and portfolio analytics systems",
      icon: <Shield className="w-8 h-8" />,
      partners: [
        {
          name: "MSCI RiskMetrics",
          description: "Integration with MSCI risk management platforms for enhanced portfolio analytics.",
          features: ["Portfolio risk", "Stress testing", "VaR calculations", "Regulatory reporting"],
          status: "Production Ready",
          logo: "/api/placeholder/120/60"
        },
        {
          name: "Axioma Risk",
          description: "Advanced risk modeling integration with Axioma's portfolio construction tools.",
          features: ["Multi-factor models", "Risk attribution", "Optimization", "Performance analytics"],
          status: "Production Ready",
          logo: "/api/placeholder/120/60"
        },
        {
          name: "Murex",
          description: "Integration with Murex trading and risk management platform for derivatives processing.",
          features: ["Trade processing", "Risk calculations", "P&L attribution", "Regulatory compliance"],
          status: "Development",
          logo: "/api/placeholder/120/60"
        }
      ]
    },
    {
      title: "Cloud Infrastructure",
      description: "Scalable cloud deployment and infrastructure integration solutions",
      icon: <Cloud className="w-8 h-8" />,
      partners: [
        {
          name: "Microsoft Azure",
          description: "Cloud deployment and scalability solutions for enterprise XSigma implementations.",
          features: ["Auto-scaling", "Enterprise security", "Global deployment", "Managed services"],
          status: "Production Ready",
          logo: "/api/placeholder/120/60"
        },
        {
          name: "Amazon Web Services",
          description: "AWS integration for high-performance computing and data analytics workloads.",
          features: ["HPC clusters", "Data lakes", "Machine learning", "Serverless computing"],
          status: "Production Ready",
          logo: "/api/placeholder/120/60"
        },
        {
          name: "Google Cloud Platform",
          description: "GCP integration for advanced analytics and machine learning capabilities.",
          features: ["BigQuery integration", "AI/ML services", "Kubernetes", "Data analytics"],
          status: "Beta",
          logo: "/api/placeholder/120/60"
        }
      ]
    },
    {
      title: "Development Tools",
      description: "APIs, SDKs, and development frameworks for custom integrations",
      icon: <Code className="w-8 h-8" />,
      partners: [
        {
          name: "Python SDK",
          description: "Comprehensive Python SDK for Enhanced AAD integration and custom development.",
          features: ["Full API access", "NumPy integration", "Pandas support", "Jupyter notebooks"],
          status: "Production Ready",
          logo: "/api/placeholder/120/60"
        },
        {
          name: "R Package",
          description: "Native R package for quantitative analysts and risk managers.",
          features: ["R integration", "Data frames", "Statistical analysis", "Visualization"],
          status: "Production Ready",
          logo: "/api/placeholder/120/60"
        },
        {
          name: "MATLAB Toolbox",
          description: "MATLAB toolbox for financial engineering and quantitative analysis.",
          features: ["MATLAB functions", "Financial toolbox", "Optimization", "Visualization"],
          status: "Development",
          logo: "/api/placeholder/120/60"
        }
      ]
    }
  ];

  const integrationProcess = [
    {
      step: "1",
      title: "Assessment & Planning",
      description: "Technical assessment of your existing infrastructure and integration requirements.",
      duration: "1-2 weeks"
    },
    {
      step: "2",
      title: "API Configuration",
      description: "Configure XSigma APIs and establish secure connections with your systems.",
      duration: "2-3 weeks"
    },
    {
      step: "3",
      title: "Data Mapping",
      description: "Map data flows and establish transformation rules for seamless integration.",
      duration: "1-2 weeks"
    },
    {
      step: "4",
      title: "Testing & Validation",
      description: "Comprehensive testing of integration points and data accuracy validation.",
      duration: "2-4 weeks"
    },
    {
      step: "5",
      title: "Production Deployment",
      description: "Go-live support and monitoring for production environment deployment.",
      duration: "1 week"
    }
  ];

  const benefits = [
    {
      title: "Seamless Data Flow",
      description: "Automated data synchronization between XSigma and your existing systems",
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: "Reduced Implementation Time",
      description: "Pre-built connectors reduce integration time from months to weeks",
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      title: "Enterprise Security",
      description: "Bank-grade security protocols and compliance with industry standards",
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: "Scalable Architecture",
      description: "Cloud-native design that scales with your business requirements",
      icon: <Globe className="w-6 h-6" />
    }
  ];

  return (
    <>
      <Helmet>
        <title>Integration Partners - XSigma Platform Integrations | Enhanced AAD API</title>
        <meta name="description" content="Explore XSigma's integration partners and platform connections. Seamless integration with Bloomberg, Refinitiv, MSCI, and leading financial technology platforms." />
        <meta name="keywords" content="XSigma integrations, Bloomberg integration, Refinitiv API, MSCI RiskMetrics, financial platform integration, Enhanced AAD API" />
        <link rel="canonical" href="https://xsigma.co.uk/company/integrations" />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Breadcrumb Navigation */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <a href="/" className="text-xsigma-navy hover:text-xsigma-teal transition-colors">Home</a>
              <span className="text-gray-400">/</span>
              <a href="/company" className="text-xsigma-navy hover:text-xsigma-teal transition-colors">Company</a>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">Integration Partners</span>
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
                Integration <span className="text-xsigma-teal">Partners</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
                Seamless integration with leading financial platforms, market data providers, 
                and enterprise systems through Enhanced AAD technology.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Integration Benefits */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Integration Benefits</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                XSigma's integration platform enables seamless connectivity with your existing 
                financial technology infrastructure.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center p-6 rounded-xl bg-gray-50 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="bg-xsigma-teal/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-xsigma-teal">{benefit.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-xsigma-navy mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Integration Categories */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Integration Ecosystem</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive integration capabilities across market data, risk management, 
                cloud infrastructure, and development platforms.
              </p>
            </motion.div>

            <div className="space-y-16">
              {integrationCategories.map((category, categoryIndex) => (
                <motion.div
                  key={categoryIndex}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                >
                  <div className="flex items-center mb-8">
                    <div className="bg-xsigma-teal/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <div className="text-xsigma-teal">{category.icon}</div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-xsigma-navy">{category.title}</h3>
                      <p className="text-gray-600">{category.description}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.partners.map((partner, partnerIndex) => (
                      <motion.div
                        key={partnerIndex}
                        variants={fadeInUp}
                        className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <img src={partner.logo} alt={partner.name} className="h-8 w-auto" />
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            partner.status === 'Production Ready' 
                              ? 'bg-green-100 text-green-800'
                              : partner.status === 'Beta'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {partner.status}
                          </span>
                        </div>
                        
                        <h4 className="text-lg font-bold text-xsigma-navy mb-2">{partner.name}</h4>
                        <p className="text-gray-600 mb-4 text-sm">{partner.description}</p>
                        
                        <div>
                          <h5 className="font-semibold text-xsigma-navy mb-2 text-sm">Key Features:</h5>
                          <ul className="space-y-1">
                            {partner.features.map((feature, idx) => (
                              <li key={idx} className="text-gray-600 text-xs flex items-center">
                                <CheckCircle className="w-3 h-3 text-xsigma-teal mr-2 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration Process */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Integration Process</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our structured approach ensures smooth integration with minimal disruption 
                to your existing operations.
              </p>
            </motion.div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-xsigma-teal/20"></div>
              
              {integrationProcess.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                      <div className="text-sm text-xsigma-teal font-semibold mb-2">{step.duration}</div>
                      <h3 className="text-xl font-bold text-xsigma-navy mb-3">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-xsigma-teal rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                    <span className="text-white font-bold">{step.step}</span>
                  </div>
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
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">
                Ready to Integrate XSigma?
              </h2>
              <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
                Our integration specialists will work with your team to ensure seamless 
                connectivity with your existing financial technology infrastructure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-xsigma-teal hover:bg-xsigma-teal/90 text-white font-semibold rounded-lg transition-colors duration-300"
                >
                  Start Integration
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
                <a
                  href="/support/technical"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-xsigma-navy font-semibold rounded-lg transition-colors duration-300"
                >
                  Technical Documentation
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Integrations;
