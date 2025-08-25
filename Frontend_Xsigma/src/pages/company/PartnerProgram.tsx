import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Award, Globe, Handshake, CheckCircle, Star, TrendingUp } from 'lucide-react';

const PartnerProgram: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState('technology');

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

  const partnerTiers = [
    {
      id: 'technology',
      name: 'Technology Partner',
      icon: <Globe className="w-8 h-8" />,
      description: 'Integrate Enhanced AAD technology into your platform or service offering',
      benefits: [
        'Technical integration support',
        'Co-marketing opportunities',
        'Revenue sharing program',
        'Priority technical support',
        'Joint solution development',
        'Access to beta features'
      ],
      requirements: [
        'Established technology platform',
        'Minimum 100 enterprise clients',
        'Technical integration capability',
        'Dedicated partner team'
      ],
      commitment: '12-month minimum partnership',
      revenue: 'Up to 25% revenue share'
    },
    {
      id: 'solution',
      name: 'Solution Partner',
      icon: <Handshake className="w-8 h-8" />,
      description: 'Deliver XSigma solutions to your financial services clients',
      benefits: [
        'Sales training and certification',
        'Marketing development funds',
        'Lead sharing program',
        'Implementation support',
        'Client success management',
        'Partner portal access'
      ],
      requirements: [
        'Financial services expertise',
        'Proven sales track record',
        'Implementation capabilities',
        'Client relationship management'
      ],
      commitment: '24-month partnership agreement',
      revenue: 'Up to 30% margin on sales'
    },
    {
      id: 'consulting',
      name: 'Consulting Partner',
      icon: <Users className="w-8 h-8" />,
      description: 'Provide specialized consulting and implementation services',
      benefits: [
        'Certified consultant program',
        'Advanced training resources',
        'Implementation methodology',
        'Client referral program',
        'Professional services support',
        'Industry recognition'
      ],
      requirements: [
        'Quantitative finance expertise',
        'Certified consultants (minimum 5)',
        'Implementation experience',
        'Client success metrics'
      ],
      commitment: '18-month certification period',
      revenue: 'Professional services fees'
    },
    {
      id: 'academic',
      name: 'Academic Partner',
      icon: <Award className="w-8 h-8" />,
      description: 'Collaborate on research and educational initiatives',
      benefits: [
        'Research collaboration funding',
        'Student internship programs',
        'Faculty exchange opportunities',
        'Conference speaking slots',
        'Publication opportunities',
        'Academic licensing discounts'
      ],
      requirements: [
        'Accredited academic institution',
        'Quantitative finance program',
        'Research capabilities',
        'Faculty expertise'
      ],
      commitment: '3-year research agreement',
      revenue: 'Research grants and funding'
    }
  ];

  const partnerBenefits = [
    {
      title: 'Market Leadership',
      description: 'Partner with the leader in Enhanced AAD technology for quantitative finance',
      icon: <Star className="w-6 h-6" />
    },
    {
      title: 'Revenue Growth',
      description: 'Expand your revenue streams with high-margin quantitative finance solutions',
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      title: 'Technical Excellence',
      description: 'Access cutting-edge Enhanced AAD technology and continuous innovation',
      icon: <Award className="w-6 h-6" />
    },
    {
      title: 'Global Reach',
      description: 'Leverage XSigma\'s global presence and tier-1 bank relationships',
      icon: <Globe className="w-6 h-6" />
    }
  ];

  const applicationProcess = [
    {
      step: '1',
      title: 'Initial Application',
      description: 'Submit your partnership application with company details and partnership objectives.',
      duration: '1 week'
    },
    {
      step: '2',
      title: 'Qualification Review',
      description: 'Our partner team reviews your application and assesses partnership fit.',
      duration: '2 weeks'
    },
    {
      step: '3',
      title: 'Technical Assessment',
      description: 'Technical evaluation of integration capabilities and solution alignment.',
      duration: '2-3 weeks'
    },
    {
      step: '4',
      title: 'Partnership Agreement',
      description: 'Finalize partnership terms, agreements, and program details.',
      duration: '1-2 weeks'
    },
    {
      step: '5',
      title: 'Onboarding & Training',
      description: 'Complete partner onboarding, training, and certification programs.',
      duration: '4-6 weeks'
    }
  ];

  const successStories = [
    {
      partner: 'FinTech Solutions Inc.',
      type: 'Technology Partner',
      result: '300% increase in client engagement after integrating Enhanced AAD technology',
      quote: 'XSigma\'s Enhanced AAD technology transformed our derivatives pricing capabilities.'
    },
    {
      partner: 'Quantum Risk Advisors',
      type: 'Solution Partner',
      result: '$5M additional revenue in first year through XSigma solution sales',
      quote: 'The partnership with XSigma opened new markets and revenue opportunities.'
    },
    {
      partner: 'Global Consulting Group',
      type: 'Consulting Partner',
      result: '50+ successful implementations across tier-1 and regional banks',
      quote: 'XSigma\'s support and training programs enabled our rapid market expansion.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Become a Partner - XSigma Partner Program | Enhanced AAD Technology Partners</title>
        <meta name="description" content="Join XSigma's partner program. Technology, solution, consulting, and academic partnerships available. Expand your quantitative finance capabilities with Enhanced AAD." />
        <meta name="keywords" content="XSigma partner program, technology partnerships, solution partners, consulting partners, Enhanced AAD integration, quantitative finance partnerships" />
        <link rel="canonical" href="https://xsigma.co.uk/company/partner-program" />
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
              <span className="text-gray-600">Become a Partner</span>
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
                Become a <span className="text-xsigma-teal">Partner</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
                Join XSigma's global partner ecosystem and expand your quantitative finance 
                capabilities with Enhanced AAD technology.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Partner Benefits */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Why Partner with XSigma?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join the leader in Enhanced AAD technology and unlock new opportunities 
                in the rapidly growing quantitative finance market.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {partnerBenefits.map((benefit, index) => (
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

        {/* Partner Tiers */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Partnership Programs</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose the partnership program that best aligns with your business objectives 
                and capabilities.
              </p>
            </motion.div>

            {/* Partner Tier Selector */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {partnerTiers.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${
                    selectedTier === tier.id
                      ? 'bg-xsigma-navy text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {tier.icon}
                  <span>{tier.name}</span>
                </button>
              ))}
            </div>

            {/* Selected Tier Details */}
            {partnerTiers.map((tier) => (
              selectedTier === tier.id && (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-xl shadow-lg p-8"
                >
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <div className="flex items-center mb-6">
                        <div className="bg-xsigma-teal/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                          <div className="text-xsigma-teal">{tier.icon}</div>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-xsigma-navy">{tier.name}</h3>
                          <p className="text-gray-600">{tier.description}</p>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-semibold text-xsigma-navy mb-3">Partner Benefits:</h4>
                        <ul className="space-y-2">
                          {tier.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-center text-gray-600">
                              <CheckCircle className="w-4 h-4 text-xsigma-teal mr-3 flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <div className="mb-6">
                        <h4 className="font-semibold text-xsigma-navy mb-3">Requirements:</h4>
                        <ul className="space-y-2">
                          {tier.requirements.map((requirement, idx) => (
                            <li key={idx} className="flex items-center text-gray-600">
                              <span className="w-2 h-2 bg-xsigma-teal rounded-full mr-3"></span>
                              {requirement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold text-xsigma-navy mb-1">Commitment:</h5>
                          <p className="text-gray-600 text-sm">{tier.commitment}</p>
                        </div>
                        <div>
                          <h5 className="font-semibold text-xsigma-navy mb-1">Revenue Model:</h5>
                          <p className="text-gray-600 text-sm">{tier.revenue}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </div>
        </section>

        {/* Application Process */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Application Process</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our streamlined application process ensures quick evaluation and onboarding 
                for qualified partners.
              </p>
            </motion.div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-xsigma-teal/20"></div>
              
              {applicationProcess.map((step, index) => (
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

        {/* Success Stories */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Partner Success Stories</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See how our partners have achieved success through XSigma's partnership programs.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              {successStories.map((story, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white p-6 rounded-xl shadow-lg"
                >
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-xsigma-navy">{story.partner}</h3>
                    <p className="text-xsigma-teal font-semibold text-sm">{story.type}</p>
                  </div>
                  <p className="text-gray-700 mb-4 font-semibold">{story.result}</p>
                  <blockquote className="text-gray-600 italic">"{story.quote}"</blockquote>
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
                Ready to Partner with XSigma?
              </h2>
              <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
                Join our global partner ecosystem and unlock new opportunities in quantitative finance. 
                Apply today to start your partnership journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-xsigma-teal hover:bg-xsigma-teal/90 text-white font-semibold rounded-lg transition-colors duration-300"
                >
                  Apply Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
                <a
                  href="/company/partners"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-xsigma-navy font-semibold rounded-lg transition-colors duration-300"
                >
                  View All Partners
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PartnerProgram;
