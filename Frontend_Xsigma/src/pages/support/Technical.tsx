import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, Mail, MessageCircle, Clock, Shield, Zap, Users, CheckCircle } from 'lucide-react';

const Technical: React.FC = () => {
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

  const supportTiers = [
    {
      name: 'Standard Support',
      description: 'Essential support for development and testing environments',
      price: 'Included',
      features: [
        'Email support (48-hour response)',
        'Community forum access',
        'Documentation and guides',
        'Basic troubleshooting assistance',
        'Software updates and patches'
      ],
      sla: '48 hours',
      availability: 'Business hours (9 AM - 6 PM GMT)',
      channels: ['Email', 'Community Forum']
    },
    {
      name: 'Professional Support',
      description: 'Enhanced support for production environments and critical applications',
      price: '$5,000/year',
      features: [
        'Priority email support (24-hour response)',
        'Phone support during business hours',
        'Advanced troubleshooting and diagnostics',
        'Performance optimization guidance',
        'Integration assistance',
        'Dedicated support portal access'
      ],
      sla: '24 hours',
      availability: 'Business hours (9 AM - 6 PM GMT)',
      channels: ['Email', 'Phone', 'Support Portal'],
      popular: true
    },
    {
      name: 'Enterprise Support',
      description: 'Premium support for mission-critical financial applications',
      price: '$15,000/year',
      features: [
        'Priority support (4-hour response)',
        '24/7 phone and email support',
        'Dedicated technical account manager',
        'On-site support (when required)',
        'Custom integration development',
        'Performance monitoring and alerts',
        'Quarterly business reviews'
      ],
      sla: '4 hours',
      availability: '24/7/365',
      channels: ['Email', 'Phone', 'Chat', 'On-site']
    }
  ];

  const supportChannels = [
    {
      name: 'Email Support',
      description: 'Comprehensive technical assistance via email with detailed responses',
      icon: <Mail className="w-8 h-8" />,
      contact: 'support@xsigma.co.uk',
      responseTime: '24-48 hours',
      availability: '24/7 submission'
    },
    {
      name: 'Phone Support',
      description: 'Direct phone support for urgent technical issues and consultations',
      icon: <Phone className="w-8 h-8" />,
      contact: '+44 20 7946 0958',
      responseTime: 'Immediate',
      availability: 'Business hours (GMT)'
    },
    {
      name: 'Live Chat',
      description: 'Real-time chat support for quick questions and immediate assistance',
      icon: <MessageCircle className="w-8 h-8" />,
      contact: 'Available in support portal',
      responseTime: '< 5 minutes',
      availability: 'Business hours (GMT)'
    },
    {
      name: 'Community Forum',
      description: 'Connect with other developers and XSigma experts in our community',
      icon: <Users className="w-8 h-8" />,
      contact: 'community.xsigma.co.uk',
      responseTime: 'Community driven',
      availability: '24/7 access'
    }
  ];

  const commonIssues = [
    {
      category: 'API Integration',
      issues: [
        'Authentication and API key setup',
        'Rate limiting and quota management',
        'Response format and error handling',
        'SDK installation and configuration'
      ]
    },
    {
      category: 'Performance',
      issues: [
        'Slow calculation performance',
        'Memory usage optimization',
        'Parallel processing setup',
        'Large portfolio handling'
      ]
    },
    {
      category: 'Data Integration',
      issues: [
        'Market data feed connectivity',
        'Data format compatibility',
        'Real-time streaming setup',
        'Historical data access'
      ]
    },
    {
      category: 'Enhanced AAD',
      issues: [
        'AAD algorithm configuration',
        'Precision and accuracy settings',
        'Custom derivative implementation',
        'Performance tuning'
      ]
    }
  ];

  const escalationProcess = [
    {
      level: 'Level 1',
      title: 'Initial Support',
      description: 'General technical questions and basic troubleshooting',
      team: 'Support Engineers',
      responseTime: '24-48 hours'
    },
    {
      level: 'Level 2',
      title: 'Advanced Technical',
      description: 'Complex integration issues and performance optimization',
      team: 'Senior Engineers',
      responseTime: '12-24 hours'
    },
    {
      level: 'Level 3',
      title: 'Expert Consultation',
      description: 'Algorithm-specific issues and custom development',
      team: 'Lead Developers',
      responseTime: '4-12 hours'
    },
    {
      level: 'Level 4',
      title: 'Engineering Team',
      description: 'Product bugs and feature requests',
      team: 'Core Engineering',
      responseTime: '2-4 hours'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Technical Support - XSigma Enhanced AAD Support Services | Enterprise Support</title>
        <meta name="description" content="XSigma technical support services for Enhanced AAD technology. Professional support tiers, SLAs, and expert assistance for quantitative finance applications." />
        <meta name="keywords" content="XSigma technical support, Enhanced AAD support, quantitative finance support, API support, enterprise support services" />
        <link rel="canonical" href="https://xsigma.co.uk/support/technical" />
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
              <span className="text-gray-600">Technical Support</span>
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
                Technical <span className="text-xsigma-teal">Support</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
                Expert technical support for XSigma's Enhanced AAD technology. 
                Get the help you need to maximize your quantitative finance applications.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Support Tiers */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Support Tiers</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose the support level that best fits your organization's needs and 
                critical application requirements.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid lg:grid-cols-3 gap-8"
            >
              {supportTiers.map((tier, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className={`relative bg-white rounded-xl shadow-lg p-8 border-2 ${
                    tier.popular ? 'border-xsigma-teal' : 'border-gray-200'
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-xsigma-teal text-white px-4 py-2 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-xsigma-navy mb-2">{tier.name}</h3>
                    <p className="text-gray-600 mb-4">{tier.description}</p>
                    <div className="text-3xl font-bold text-xsigma-teal">{tier.price}</div>
                  </div>

                  <div className="space-y-4 mb-8">
                    {tier.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-xsigma-teal mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-6 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Response SLA:</span>
                      <span className="font-semibold text-xsigma-navy">{tier.sla}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Availability:</span>
                      <span className="font-semibold text-xsigma-navy">{tier.availability}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Channels:</span>
                      <span className="font-semibold text-xsigma-navy">{tier.channels.join(', ')}</span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <a
                      href="/contact"
                      className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${
                        tier.popular
                          ? 'bg-xsigma-teal hover:bg-xsigma-teal/90 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                      }`}
                    >
                      Get Started
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Support Channels */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Support Channels</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Multiple ways to get the technical assistance you need, when you need it.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {supportChannels.map((channel, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
                >
                  <div className="bg-xsigma-teal/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-xsigma-teal">{channel.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-xsigma-navy mb-3">{channel.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{channel.description}</p>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-semibold text-xsigma-navy">Contact: </span>
                      <span className="text-gray-600">{channel.contact}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-xsigma-navy">Response: </span>
                      <span className="text-gray-600">{channel.responseTime}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-xsigma-navy">Available: </span>
                      <span className="text-gray-600">{channel.availability}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Common Issues */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Common Support Topics</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Quick reference for frequently encountered technical issues and their solutions.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-8"
            >
              {commonIssues.map((category, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-gray-50 p-6 rounded-xl"
                >
                  <h3 className="text-xl font-bold text-xsigma-navy mb-4">{category.category}</h3>
                  <ul className="space-y-2">
                    {category.issues.map((issue, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-xsigma-teal rounded-full mr-3"></span>
                        {issue}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Escalation Process */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Support Escalation Process</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our structured escalation process ensures your issues receive the appropriate 
                level of expertise and attention.
              </p>
            </motion.div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-xsigma-teal/20"></div>
              
              {escalationProcess.map((level, index) => (
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
                      <div className="text-sm text-xsigma-teal font-semibold mb-2">{level.responseTime}</div>
                      <h3 className="text-xl font-bold text-xsigma-navy mb-2">{level.title}</h3>
                      <p className="text-gray-600 mb-3">{level.description}</p>
                      <div className="text-sm text-gray-500">Team: {level.team}</div>
                    </div>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-xsigma-teal rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                    <span className="text-white font-bold text-sm">{level.level}</span>
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
                Need Technical Support?
              </h2>
              <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
                Our expert technical team is ready to help you maximize the value of 
                XSigma's Enhanced AAD technology in your applications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:support@xsigma.co.uk"
                  className="inline-flex items-center px-8 py-4 bg-xsigma-teal hover:bg-xsigma-teal/90 text-white font-semibold rounded-lg transition-colors duration-300"
                >
                  Contact Support
                  <Mail className="ml-2 w-5 h-5" />
                </a>
                <a
                  href="/support/community"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-xsigma-navy font-semibold rounded-lg transition-colors duration-300"
                >
                  Community Forum
                  <Users className="ml-2 w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Technical;
