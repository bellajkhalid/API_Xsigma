import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, Settings, Code, Users, Zap, CheckCircle, Clock, Award, Target } from 'lucide-react';

const Professional: React.FC = () => {
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

  const services = [
    {
      name: 'Implementation Services',
      description: 'End-to-end implementation of XSigma Enhanced AAD technology in your environment',
      icon: <Settings className="w-8 h-8" />,
      features: [
        'Requirements analysis and planning',
        'System architecture design',
        'Installation and configuration',
        'Data migration and integration',
        'Testing and validation',
        'Go-live support and monitoring'
      ],
      duration: '8-16 weeks',
      team: 'Senior Implementation Consultants',
      price: 'Starting at $50,000'
    },
    {
      name: 'Custom Development',
      description: 'Tailored development services for specialized quantitative finance requirements',
      icon: <Code className="w-8 h-8" />,
      features: [
        'Custom derivative implementations',
        'Specialized pricing models',
        'Integration with proprietary systems',
        'Performance optimization',
        'Algorithm customization',
        'Regulatory compliance features'
      ],
      duration: '12-24 weeks',
      team: 'Expert Development Team',
      price: 'Starting at $75,000'
    },
    {
      name: 'Consulting & Advisory',
      description: 'Strategic consulting for quantitative finance technology and risk management',
      icon: <Users className="w-8 h-8" />,
      features: [
        'Technology strategy development',
        'Risk management framework design',
        'Model validation and governance',
        'Regulatory compliance guidance',
        'Performance benchmarking',
        'Best practices implementation'
      ],
      duration: '4-12 weeks',
      team: 'Senior Quantitative Consultants',
      price: 'Starting at $25,000'
    },
    {
      name: 'Performance Optimization',
      description: 'Specialized services to maximize performance and efficiency of your XSigma deployment',
      icon: <Zap className="w-8 h-8" />,
      features: [
        'Performance analysis and profiling',
        'System optimization recommendations',
        'Hardware and infrastructure tuning',
        'Algorithm parameter optimization',
        'Parallel processing enhancement',
        'Scalability improvements'
      ],
      duration: '6-10 weeks',
      team: 'Performance Engineering Specialists',
      price: 'Starting at $35,000'
    }
  ];

  const deliveryApproach = [
    {
      phase: 'Discovery',
      title: 'Requirements & Planning',
      description: 'Comprehensive analysis of your requirements, existing systems, and objectives',
      duration: '1-2 weeks',
      deliverables: ['Requirements document', 'Technical architecture', 'Project plan', 'Risk assessment']
    },
    {
      phase: 'Design',
      title: 'Solution Architecture',
      description: 'Detailed design of the solution architecture and implementation approach',
      duration: '2-3 weeks',
      deliverables: ['Solution design', 'Integration specifications', 'Testing strategy', 'Deployment plan']
    },
    {
      phase: 'Implementation',
      title: 'Development & Integration',
      description: 'Implementation of the solution with continuous testing and validation',
      duration: '4-12 weeks',
      deliverables: ['Implemented solution', 'Integration testing', 'Documentation', 'Training materials']
    },
    {
      phase: 'Deployment',
      title: 'Go-Live & Support',
      description: 'Production deployment with comprehensive support and monitoring',
      duration: '1-2 weeks',
      deliverables: ['Production deployment', 'Go-live support', 'Performance monitoring', 'Knowledge transfer']
    }
  ];

  const expertiseAreas = [
    {
      title: 'Quantitative Finance',
      description: 'Deep expertise in derivatives pricing, risk management, and financial modeling',
      icon: <Target className="w-6 h-6" />,
      specialists: 15,
      experience: '10+ years average'
    },
    {
      title: 'Enhanced AAD Technology',
      description: 'Core team members who developed and maintain XSigma\'s Enhanced AAD algorithms',
      icon: <Award className="w-6 h-6" />,
      specialists: 8,
      experience: '15+ years average'
    },
    {
      title: 'Enterprise Integration',
      description: 'Extensive experience integrating with major financial platforms and systems',
      icon: <Settings className="w-6 h-6" />,
      specialists: 12,
      experience: '8+ years average'
    },
    {
      title: 'Performance Engineering',
      description: 'Specialized in high-performance computing and optimization for financial applications',
      icon: <Zap className="w-6 h-6" />,
      specialists: 6,
      experience: '12+ years average'
    }
  ];

  const successMetrics = [
    {
      metric: '95%',
      description: 'Project success rate',
      detail: 'On-time, on-budget delivery'
    },
    {
      metric: '40%',
      description: 'Average performance improvement',
      detail: 'Calculation speed enhancement'
    },
    {
      metric: '6 months',
      description: 'Average time to value',
      detail: 'From project start to production'
    },
    {
      metric: '99.9%',
      description: 'Client satisfaction rate',
      detail: 'Based on post-project surveys'
    }
  ];

  const clientTestimonials = [
    {
      quote: "XSigma's professional services team delivered exceptional results. Their deep understanding of both the technology and our business requirements was evident throughout the project.",
      client: "Head of Quantitative Risk",
      company: "Major European Investment Bank",
      project: "CVA/DVA Implementation"
    },
    {
      quote: "The custom development work exceeded our expectations. The team's expertise in Enhanced AAD technology enabled us to implement complex derivatives pricing models efficiently.",
      client: "Chief Technology Officer",
      company: "Global Asset Management Firm",
      project: "Custom Development"
    },
    {
      quote: "Outstanding consulting engagement. The strategic guidance and best practices recommendations have significantly improved our risk management capabilities.",
      client: "Managing Director, Risk Technology",
      company: "Tier-1 Investment Bank",
      project: "Strategic Consulting"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Professional Services - XSigma Enhanced AAD Implementation & Consulting | Quantitative Finance Services</title>
        <meta name="description" content="XSigma professional services for Enhanced AAD technology. Implementation, custom development, consulting, and optimization services for quantitative finance applications." />
        <meta name="keywords" content="XSigma professional services, Enhanced AAD implementation, quantitative finance consulting, custom development, performance optimization" />
        <link rel="canonical" href="https://xsigma.co.uk/support/professional" />
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
              <span className="text-gray-600">Professional Services</span>
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
                Professional <span className="text-xsigma-teal">Services</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
                Expert implementation, consulting, and custom development services to maximize 
                the value of XSigma's Enhanced AAD technology in your organization.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Success Metrics */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Proven Results</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our professional services team has a track record of delivering successful 
                implementations and measurable business value.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {successMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center p-6 rounded-xl bg-gray-50"
                >
                  <div className="text-4xl font-bold text-xsigma-teal mb-2">{metric.metric}</div>
                  <div className="text-lg font-semibold text-xsigma-navy mb-1">{metric.description}</div>
                  <div className="text-gray-600 text-sm">{metric.detail}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Our Services</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive professional services designed to ensure successful implementation 
                and optimization of XSigma Enhanced AAD technology.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-8"
            >
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-start mb-6">
                    <div className="bg-xsigma-teal/10 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <div className="text-xsigma-teal">{service.icon}</div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-xsigma-navy mb-2">{service.name}</h3>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-xsigma-navy mb-3">Service Includes:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-700">
                          <CheckCircle className="w-4 h-4 text-xsigma-teal mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h5 className="font-semibold text-xsigma-navy mb-1 text-sm">Duration:</h5>
                      <p className="text-gray-600 text-sm">{service.duration}</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-xsigma-navy mb-1 text-sm">Team:</h5>
                      <p className="text-gray-600 text-sm">{service.team}</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-xsigma-navy mb-1 text-sm">Investment:</h5>
                      <p className="text-gray-600 text-sm">{service.price}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Delivery Approach */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Delivery Approach</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our proven methodology ensures successful project delivery with clear milestones, 
                deliverables, and continuous stakeholder engagement.
              </p>
            </motion.div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-xsigma-teal/20"></div>
              
              {deliveryApproach.map((phase, index) => (
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
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                      <div className="text-sm text-xsigma-teal font-semibold mb-2">{phase.duration}</div>
                      <h3 className="text-xl font-bold text-xsigma-navy mb-2">{phase.title}</h3>
                      <p className="text-gray-600 mb-4">{phase.description}</p>
                      <div>
                        <h4 className="font-semibold text-xsigma-navy mb-2 text-sm">Key Deliverables:</h4>
                        <ul className="space-y-1">
                          {phase.deliverables.map((deliverable, idx) => (
                            <li key={idx} className="text-gray-600 text-sm flex items-center">
                              <CheckCircle className="w-3 h-3 text-xsigma-teal mr-2 flex-shrink-0" />
                              {deliverable}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-xsigma-teal rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                    <span className="text-white font-bold text-sm">{phase.phase}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Expertise Areas */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Our Expertise</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our team combines deep quantitative finance knowledge with extensive 
                technical expertise in Enhanced AAD technology.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {expertiseAreas.map((area, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white p-6 rounded-xl shadow-lg text-center"
                >
                  <div className="bg-xsigma-teal/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-xsigma-teal">{area.icon}</div>
                  </div>
                  <h3 className="text-lg font-bold text-xsigma-navy mb-3">{area.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{area.description}</p>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-semibold text-xsigma-navy">{area.specialists}</span>
                      <span className="text-gray-600"> specialists</span>
                    </div>
                    <div className="text-gray-600">{area.experience}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Client Testimonials */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Client Success Stories</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Hear from our clients about their experience working with XSigma's 
                professional services team.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-8"
            >
              {clientTestimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-gray-50 p-8 rounded-xl"
                >
                  <blockquote className="text-lg text-gray-700 mb-6 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-xsigma-navy">{testimonial.client}</div>
                      <div className="text-gray-600">{testimonial.company}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Project:</div>
                      <div className="font-semibold text-xsigma-navy">{testimonial.project}</div>
                    </div>
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
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
                Let our professional services team help you maximize the value of XSigma's 
                Enhanced AAD technology in your organization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-xsigma-teal hover:bg-xsigma-teal/90 text-white font-semibold rounded-lg transition-colors duration-300"
                >
                  Schedule Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
                <a
                  href="/downloads/services-overview"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-xsigma-navy font-semibold rounded-lg transition-colors duration-300"
                >
                  Download Services Overview
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Professional;
