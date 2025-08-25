import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, GraduationCap, Globe, Handshake, Zap, Shield, Users } from 'lucide-react';

const Partners: React.FC = () => {
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

  const technologyPartners = [
    {
      name: "NVIDIA",
      category: "GPU Computing",
      description: "Strategic partnership for high-performance computing acceleration of Enhanced AAD calculations.",
      logo: "/api/placeholder/200/100",
      benefits: ["GPU-accelerated AAD", "CUDA optimization", "Real-time processing"]
    },
    {
      name: "Intel",
      category: "Hardware Optimization",
      description: "Collaboration on CPU optimization and vectorization for Enhanced AAD algorithms.",
      logo: "/api/placeholder/200/100",
      benefits: ["CPU optimization", "Vector processing", "Performance tuning"]
    },
    {
      name: "Microsoft Azure",
      category: "Cloud Infrastructure",
      description: "Cloud deployment and scalability solutions for enterprise XSigma implementations.",
      logo: "/api/placeholder/200/100",
      benefits: ["Cloud deployment", "Auto-scaling", "Enterprise security"]
    },
    {
      name: "Docker",
      category: "Containerization",
      description: "Containerized deployment solutions for seamless integration with existing bank infrastructure.",
      logo: "/api/placeholder/200/100",
      benefits: ["Easy deployment", "Scalability", "DevOps integration"]
    }
  ];

  const academicPartners = [
    {
      name: "Stanford University",
      department: "Department of Management Science & Engineering",
      collaboration: "Joint research on advanced automatic differentiation techniques and applications in quantitative finance.",
      logo: "/api/placeholder/200/100",
      focus: ["AAD Research", "Algorithm Development", "PhD Internships"]
    },
    {
      name: "MIT",
      department: "Sloan School of Management",
      collaboration: "Research collaboration on machine learning applications in derivatives pricing and risk management.",
      logo: "/api/placeholder/200/100",
      focus: ["ML in Finance", "Risk Modeling", "Faculty Exchange"]
    },
    {
      name: "Oxford University",
      department: "Mathematical Institute",
      collaboration: "Partnership on numerical methods and computational mathematics for financial applications.",
      logo: "/api/placeholder/200/100",
      focus: ["Numerical Methods", "Computational Math", "Research Publications"]
    },
    {
      name: "Imperial College London",
      department: "Department of Mathematics",
      collaboration: "Joint development of next-generation Enhanced AAD algorithms and optimization techniques.",
      logo: "/api/placeholder/200/100",
      focus: ["Algorithm Innovation", "Performance Optimization", "Student Projects"]
    }
  ];

  const financialPartners = [
    {
      name: "Tier-1 Investment Banks",
      type: "Production Clients",
      description: "Leading global investment banks using XSigma's Enhanced AAD technology in production trading systems.",
      scope: "Global deployment across trading desks handling billions in daily notional.",
      regions: ["North America", "Europe", "Asia-Pacific"]
    },
    {
      name: "Central Banks",
      type: "Regulatory Partners",
      description: "Collaboration with central banks on regulatory compliance and stress testing frameworks.",
      scope: "Basel III compliance and FRTB implementation support.",
      regions: ["European Central Bank", "Bank of England", "Federal Reserve"]
    },
    {
      name: "Asset Management Firms",
      type: "Buy-Side Clients",
      description: "Large asset managers leveraging XSigma technology for portfolio risk management and optimization.",
      scope: "Multi-trillion dollar assets under management.",
      regions: ["Global Presence"]
    }
  ];

  const integrationPartners = [
    {
      name: "Bloomberg Terminal",
      category: "Market Data",
      integration: "Native integration with Bloomberg Terminal for real-time market data feeds and Enhanced AAD calculations.",
      icon: <Globe className="w-8 h-8" />
    },
    {
      name: "Refinitiv Eikon",
      category: "Data & Analytics",
      integration: "Seamless integration with Refinitiv platforms for comprehensive market data and analytics.",
      icon: <Zap className="w-8 h-8" />
    },
    {
      name: "MSCI RiskMetrics",
      category: "Risk Management",
      integration: "Integration with MSCI risk management platforms for enhanced portfolio analytics.",
      icon: <Shield className="w-8 h-8" />
    },
    {
      name: "FRTB Solutions",
      category: "Regulatory Compliance",
      integration: "Specialized integrations for Fundamental Review of Trading Book compliance and reporting.",
      icon: <Building2 className="w-8 h-8" />
    }
  ];

  return (
    <>
      <Helmet>
        <title>Partners & Ecosystem - XSigma Technology Integrations | Enhanced AAD Partnerships</title>
        <meta name="description" content="Explore XSigma's strategic partnerships with leading technology companies, academic institutions, and financial organizations. Our ecosystem enables seamless Enhanced AAD integration." />
        <meta name="keywords" content="XSigma partners, technology integrations, academic partnerships, financial institutions, Enhanced AAD ecosystem" />
        <link rel="canonical" href="https://xsigma.co.uk/company/partners" />
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
              <span className="text-gray-600">Partners & Ecosystem</span>
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
                Partners & <span className="text-xsigma-teal">Ecosystem</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
                Strategic partnerships that enable seamless integration of Enhanced AAD technology 
                across the global quantitative finance ecosystem.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Partnership Overview */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Our Partnership Approach</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                We collaborate with industry leaders, academic institutions, and technology partners 
                to deliver comprehensive Enhanced AAD solutions that integrate seamlessly into 
                existing quantitative finance workflows.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              <motion.div variants={fadeInUp} className="text-center">
                <div className="bg-xsigma-teal/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Building2 className="w-8 h-8 text-xsigma-teal" />
                </div>
                <h3 className="text-xl font-bold text-xsigma-navy mb-4">Technology Partners</h3>
                <p className="text-gray-600">Leading technology companies enabling high-performance Enhanced AAD deployment.</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="text-center">
                <div className="bg-xsigma-teal/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <GraduationCap className="w-8 h-8 text-xsigma-teal" />
                </div>
                <h3 className="text-xl font-bold text-xsigma-navy mb-4">Academic Partners</h3>
                <p className="text-gray-600">World-class universities driving innovation in quantitative finance research.</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="text-center">
                <div className="bg-xsigma-teal/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Handshake className="w-8 h-8 text-xsigma-teal" />
                </div>
                <h3 className="text-xl font-bold text-xsigma-navy mb-4">Financial Partners</h3>
                <p className="text-gray-600">Tier-1 banks and institutions deploying XSigma in production environments.</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="text-center">
                <div className="bg-xsigma-teal/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8 text-xsigma-teal" />
                </div>
                <h3 className="text-xl font-bold text-xsigma-navy mb-4">Integration Partners</h3>
                <p className="text-gray-600">Platform integrations enabling seamless Enhanced AAD adoption.</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Technology Partners */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Technology Partners</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Strategic alliances with leading technology companies to optimize Enhanced AAD performance 
                and enable enterprise-scale deployments.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-8"
            >
              {technologyPartners.map((partner, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center mb-6">
                    <img src={partner.logo} alt={partner.name} className="h-12 w-auto mr-4" />
                    <div>
                      <h3 className="text-xl font-bold text-xsigma-navy">{partner.name}</h3>
                      <p className="text-xsigma-teal font-semibold">{partner.category}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{partner.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {partner.benefits.map((benefit, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-xsigma-teal/10 text-xsigma-teal text-sm rounded-full"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Academic Partners */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Academic Partnerships</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Collaborations with world-renowned universities driving cutting-edge research 
                in automatic differentiation and quantitative finance.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-8"
            >
              {academicPartners.map((partner, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-gray-50 p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center mb-6">
                    <img src={partner.logo} alt={partner.name} className="h-12 w-auto mr-4" />
                    <div>
                      <h3 className="text-xl font-bold text-xsigma-navy">{partner.name}</h3>
                      <p className="text-gray-600 text-sm">{partner.department}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{partner.collaboration}</p>
                  <div className="flex flex-wrap gap-2">
                    {partner.focus.map((area, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-xsigma-navy/10 text-xsigma-navy text-sm rounded-full"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Financial Institution Partners */}
        <section className="py-20 bg-gradient-to-br from-xsigma-navy to-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">Financial Institution Partners</h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Trusted by tier-1 banks, central banks, and asset managers for production-critical 
                quantitative finance applications.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-8"
            >
              {financialPartners.map((partner, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20"
                >
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{partner.name}</h3>
                      <p className="text-xsigma-teal font-semibold mb-4">{partner.type}</p>
                      <p className="text-gray-200">{partner.description}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Scope</h4>
                      <p className="text-gray-200">{partner.scope}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Regions</h4>
                      <div className="space-y-1">
                        {partner.regions.map((region, idx) => (
                          <span key={idx} className="block text-gray-200">{region}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Integration Partners */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Platform Integrations</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Seamless integrations with leading financial platforms and data providers 
                to accelerate Enhanced AAD adoption.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {integrationPartners.map((partner, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
                >
                  <div className="text-xsigma-teal mb-4">{partner.icon}</div>
                  <h3 className="text-lg font-bold text-xsigma-navy mb-2">{partner.name}</h3>
                  <p className="text-xsigma-teal font-semibold text-sm mb-3">{partner.category}</p>
                  <p className="text-gray-600 text-sm">{partner.integration}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Partnership Program */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Partner Program</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Join our ecosystem of partners and help bring Enhanced AAD technology 
                to financial institutions worldwide.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="bg-xsigma-teal/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-xsigma-teal" />
                  </div>
                  <h3 className="text-xl font-bold text-xsigma-navy mb-2">Technology Partners</h3>
                  <p className="text-gray-600">Integrate Enhanced AAD into your platform or service offering.</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-xsigma-teal/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-8 h-8 text-xsigma-teal" />
                  </div>
                  <h3 className="text-xl font-bold text-xsigma-navy mb-2">Solution Partners</h3>
                  <p className="text-gray-600">Deliver XSigma solutions to your financial services clients.</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-xsigma-teal/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="w-8 h-8 text-xsigma-teal" />
                  </div>
                  <h3 className="text-xl font-bold text-xsigma-navy mb-2">Research Partners</h3>
                  <p className="text-gray-600">Collaborate on cutting-edge quantitative finance research.</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-xsigma-navy hover:bg-xsigma-navy/90 text-white font-semibold rounded-lg transition-colors duration-300"
                >
                  Become a Partner
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
                <a
                  href="/company/about"
                  className="inline-flex items-center px-8 py-4 border-2 border-xsigma-navy text-xsigma-navy hover:bg-xsigma-navy hover:text-white font-semibold rounded-lg transition-colors duration-300"
                >
                  Learn More About XSigma
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Partners;
