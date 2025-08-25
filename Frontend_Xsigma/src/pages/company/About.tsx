import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Users, Globe, TrendingUp, Shield, Zap } from 'lucide-react';

const About: React.FC = () => {
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

  const coreValues = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Excellence in Quantitative Finance",
      description: "We deliver production-tested models that meet the rigorous standards of tier-1 financial institutions worldwide."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Built by Practitioners",
      description: "Our team combines deep academic knowledge with real-world trading floor experience from leading investment banks."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Regulatory Compliance",
      description: "All our solutions are designed to meet Basel III, FRTB, and other international regulatory requirements."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Enhanced AAD Innovation",
      description: "Our proprietary Enhanced AAD technology delivers unprecedented speed and accuracy in derivatives pricing and risk management."
    }
  ];

  const milestones = [
    {
      year: "2018",
      title: "Company Founded",
      description: "XSigma established by quantitative finance practitioners with vision to revolutionize market modeling."
    },
    {
      year: "2019",
      title: "Enhanced AAD Framework",
      description: "Breakthrough development of proprietary Enhanced AAD technology for automatic differentiation."
    },
    {
      year: "2021",
      title: "First Tier-1 Deployment",
      description: "Successful implementation of XCF and XVF models in production trading systems at major investment bank."
    },
    {
      year: "2023",
      title: "Global Expansion",
      description: "International partnerships established with leading financial institutions across Europe, Asia, and Americas."
    },
    {
      year: "2024",
      title: "Regulatory Recognition",
      description: "XSigma models approved for regulatory capital calculations under Basel III framework."
    }
  ];

  return (
    <>
      <Helmet>
        <title>About XSigma - Production-Tested Quantitative Finance Models | Enhanced AAD Technology</title>
        <meta name="description" content="Learn about XSigma's mission to deliver production-tested quantitative finance models built by practitioners for tier-1 banks. Discover our Enhanced AAD technology and commitment to excellence." />
        <meta name="keywords" content="XSigma, quantitative finance, Enhanced AAD, automatic differentiation, tier-1 banks, derivatives pricing, risk management" />
        <link rel="canonical" href="https://xsigma.co.uk/company/about" />
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
              <span className="text-gray-600">About XSigma</span>
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
                About <span className="text-xsigma-teal">XSigma</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
                Pioneering quantitative finance solutions with Enhanced AAD technology, 
                trusted by tier-1 banks worldwide for production-tested market models.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-16 items-center"
            >
              <motion.div variants={fadeInUp}>
                <h2 className="text-4xl font-bold text-xsigma-navy mb-8">Our Mission</h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  To revolutionize quantitative finance through Enhanced AAD technology, delivering 
                  production-tested market models that enable financial institutions to achieve 
                  unprecedented accuracy, speed, and regulatory compliance in derivatives pricing 
                  and risk management.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We bridge the gap between academic research and practical implementation, 
                  ensuring our solutions meet the demanding requirements of tier-1 banks 
                  and institutional clients worldwide.
                </p>
              </motion.div>
              
              <motion.div variants={fadeInUp}>
                <h2 className="text-4xl font-bold text-xsigma-navy mb-8">Our Vision</h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  To become the global standard for Enhanced AAD-powered quantitative finance 
                  solutions, empowering financial institutions with the most advanced, 
                  reliable, and compliant market modeling technology available.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We envision a future where every major financial institution leverages 
                  XSigma's Enhanced AAD framework to optimize their trading, risk management, 
                  and regulatory capital calculations.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Our Core Values</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The principles that guide our commitment to quantitative finance excellence
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {coreValues.map((value, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="text-xsigma-teal mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-xsigma-navy mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Company Timeline */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Our Journey</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Key milestones in XSigma's evolution as a leader in quantitative finance technology
              </p>
            </motion.div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-xsigma-teal"></div>
              
              {milestones.map((milestone, index) => (
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
                      <div className="text-2xl font-bold text-xsigma-teal mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-xsigma-navy mb-3">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-xsigma-teal rounded-full border-4 border-white shadow-lg"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced AAD Technology Overview */}
        <section className="py-20 bg-gradient-to-br from-xsigma-navy to-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">Enhanced AAD Technology</h2>
              <p className="text-xl text-gray-200 max-w-4xl mx-auto">
                Our proprietary Enhanced AAD framework represents a breakthrough in automatic differentiation, 
                delivering unprecedented performance for quantitative finance applications.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              <motion.div variants={fadeInUp} className="text-center">
                <div className="bg-xsigma-teal/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-xsigma-teal" />
                </div>
                <h3 className="text-2xl font-bold mb-4">10x Faster Calibration</h3>
                <p className="text-gray-200">
                  Enhanced AAD accelerates model calibration by orders of magnitude compared to finite differences.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="text-center">
                <div className="bg-xsigma-teal/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-xsigma-teal" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Machine Precision</h3>
                <p className="text-gray-200">
                  Delivers machine-precision Greeks and risk sensitivities for accurate risk management.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="text-center">
                <div className="bg-xsigma-teal/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8 text-xsigma-teal" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Production Proven</h3>
                <p className="text-gray-200">
                  Already deployed in tier-1 bank trading systems, handling billions in notional daily.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mt-12"
            >
              <a
                href="/solutions"
                className="inline-flex items-center px-8 py-4 bg-xsigma-teal hover:bg-xsigma-teal/90 text-white font-semibold rounded-lg transition-colors duration-300"
              >
                Explore Our Solutions
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-xsigma-navy mb-6">
                Ready to Transform Your Quantitative Finance Operations?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Join tier-1 banks worldwide who trust XSigma's Enhanced AAD technology 
                for their most critical trading and risk management applications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-xsigma-navy hover:bg-xsigma-navy/90 text-white font-semibold rounded-lg transition-colors duration-300"
                >
                  Request Demo
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
                <a
                  href="/company/leadership"
                  className="inline-flex items-center px-8 py-4 border-2 border-xsigma-navy text-xsigma-navy hover:bg-xsigma-navy hover:text-white font-semibold rounded-lg transition-colors duration-300"
                >
                  Meet Our Team
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
