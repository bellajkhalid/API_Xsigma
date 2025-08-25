import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Clock, Users, BookOpen, Video, CheckCircle, Star } from 'lucide-react';

const Training: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState('developer');

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

  const trainingTracks = [
    {
      id: 'developer',
      name: 'Developer Track',
      description: 'Comprehensive training for developers integrating XSigma Enhanced AAD technology',
      icon: <BookOpen className="w-8 h-8" />,
      duration: '40 hours',
      level: 'Intermediate',
      modules: [
        {
          title: 'Enhanced AAD Fundamentals',
          duration: '8 hours',
          topics: ['AAD theory and principles', 'Mathematical foundations', 'Performance characteristics', 'Use cases in finance']
        },
        {
          title: 'API Integration',
          duration: '12 hours',
          topics: ['Authentication and security', 'REST API endpoints', 'SDK usage', 'Error handling']
        },
        {
          title: 'CVA/DVA Implementation',
          duration: '10 hours',
          topics: ['CVA calculation methods', 'DVA implementation', 'Risk factor modeling', 'Performance optimization']
        },
        {
          title: 'Advanced Features',
          duration: '6 hours',
          topics: ['Monte Carlo integration', 'Greeks calculation', 'Custom derivatives', 'Parallel processing']
        },
        {
          title: 'Production Deployment',
          duration: '4 hours',
          topics: ['Deployment strategies', 'Monitoring and logging', 'Performance tuning', 'Troubleshooting']
        }
      ],
      certification: 'XSigma Certified Developer',
      prerequisites: 'Programming experience in Python, R, or C++',
      price: '$2,500'
    },
    {
      id: 'analyst',
      name: 'Quantitative Analyst Track',
      description: 'Specialized training for quantitative analysts and risk managers',
      icon: <Users className="w-8 h-8" />,
      duration: '32 hours',
      level: 'Advanced',
      modules: [
        {
          title: 'Quantitative Finance with AAD',
          duration: '10 hours',
          topics: ['AAD in derivatives pricing', 'Risk sensitivities', 'Model validation', 'Numerical accuracy']
        },
        {
          title: 'CVA/DVA Modeling',
          duration: '8 hours',
          topics: ['Credit risk modeling', 'Counterparty exposure', 'Regulatory requirements', 'Basel III compliance']
        },
        {
          title: 'Portfolio Risk Management',
          duration: '8 hours',
          topics: ['Portfolio-level CVA', 'Risk aggregation', 'Stress testing', 'Scenario analysis']
        },
        {
          title: 'Model Implementation',
          duration: '6 hours',
          topics: ['Model setup and calibration', 'Parameter estimation', 'Backtesting', 'Model governance']
        }
      ],
      certification: 'XSigma Certified Quantitative Analyst',
      prerequisites: 'Advanced degree in quantitative finance, mathematics, or related field',
      price: '$3,500'
    },
    {
      id: 'administrator',
      name: 'System Administrator Track',
      description: 'Training for IT professionals managing XSigma deployments',
      icon: <Award className="w-8 h-8" />,
      duration: '24 hours',
      level: 'Intermediate',
      modules: [
        {
          title: 'System Architecture',
          duration: '6 hours',
          topics: ['XSigma architecture overview', 'Component interactions', 'Scalability considerations', 'Security framework']
        },
        {
          title: 'Installation and Configuration',
          duration: '8 hours',
          topics: ['System requirements', 'Installation procedures', 'Configuration management', 'Environment setup']
        },
        {
          title: 'Monitoring and Maintenance',
          duration: '6 hours',
          topics: ['Performance monitoring', 'Log analysis', 'Backup and recovery', 'Update procedures']
        },
        {
          title: 'Troubleshooting',
          duration: '4 hours',
          topics: ['Common issues', 'Diagnostic tools', 'Performance optimization', 'Support escalation']
        }
      ],
      certification: 'XSigma Certified Administrator',
      prerequisites: 'System administration experience with enterprise software',
      price: '$1,800'
    }
  ];

  const certificationLevels = [
    {
      name: 'Associate',
      description: 'Entry-level certification for basic XSigma knowledge',
      requirements: ['Complete foundation course', 'Pass written exam (70% minimum)', '6 months experience recommended'],
      validity: '2 years',
      benefits: ['Digital badge', 'Certificate of completion', 'Access to certified community']
    },
    {
      name: 'Professional',
      description: 'Advanced certification for experienced practitioners',
      requirements: ['Hold Associate certification', 'Complete advanced track', 'Pass practical exam', '2+ years experience'],
      validity: '3 years',
      benefits: ['Professional recognition', 'Priority support access', 'Speaking opportunities', 'Beta program access']
    },
    {
      name: 'Expert',
      description: 'Master-level certification for subject matter experts',
      requirements: ['Hold Professional certification', 'Complete expert track', 'Practical project submission', '5+ years experience'],
      validity: '3 years',
      benefits: ['Expert recognition', 'Advisory board eligibility', 'Training delivery opportunities', 'Product feedback input']
    }
  ];

  const trainingFormats = [
    {
      name: 'Virtual Instructor-Led',
      description: 'Live online training with expert instructors',
      icon: <Video className="w-6 h-6" />,
      features: ['Interactive sessions', 'Real-time Q&A', 'Hands-on labs', 'Recording access'],
      schedule: 'Multiple sessions per month'
    },
    {
      name: 'On-Site Training',
      description: 'Customized training delivered at your location',
      icon: <Users className="w-6 h-6" />,
      features: ['Customized content', 'Team building', 'Hands-on practice', 'Follow-up support'],
      schedule: 'Scheduled on demand'
    },
    {
      name: 'Self-Paced Online',
      description: 'Flexible online learning at your own pace',
      icon: <BookOpen className="w-6 h-6" />,
      features: ['24/7 access', 'Progress tracking', 'Interactive content', 'Mobile friendly'],
      schedule: 'Start anytime'
    },
    {
      name: 'Blended Learning',
      description: 'Combination of online and instructor-led training',
      icon: <Star className="w-6 h-6" />,
      features: ['Flexible schedule', 'Best of both formats', 'Personalized path', 'Mentor support'],
      schedule: 'Customizable timeline'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Training & Certification - XSigma Enhanced AAD Professional Development | Quantitative Finance Training</title>
        <meta name="description" content="XSigma Enhanced AAD training and certification programs. Professional development for developers, quantitative analysts, and system administrators in quantitative finance." />
        <meta name="keywords" content="XSigma training, Enhanced AAD certification, quantitative finance training, CVA training, developer certification, analyst training" />
        <link rel="canonical" href="https://xsigma.co.uk/support/training" />
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
              <span className="text-gray-600">Training & Certification</span>
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
                Training & <span className="text-xsigma-teal">Certification</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
                Master XSigma's Enhanced AAD technology through comprehensive training programs 
                and professional certification tracks designed for quantitative finance professionals.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Training Tracks */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Training Tracks</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Specialized training programs designed for different roles and expertise levels 
                in quantitative finance and technology.
              </p>
            </motion.div>

            {/* Track Selector */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {trainingTracks.map((track) => (
                <button
                  key={track.id}
                  onClick={() => setSelectedTrack(track.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${
                    selectedTrack === track.id
                      ? 'bg-xsigma-navy text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {track.icon}
                  <span>{track.name}</span>
                </button>
              ))}
            </div>

            {/* Selected Track Details */}
            {trainingTracks.map((track) => (
              selectedTrack === track.id && (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-50 rounded-xl p-8"
                >
                  <div className="grid lg:grid-cols-3 gap-8 mb-8">
                    <div className="lg:col-span-2">
                      <div className="flex items-center mb-4">
                        <div className="bg-xsigma-teal/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                          <div className="text-xsigma-teal">{track.icon}</div>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-xsigma-navy">{track.name}</h3>
                          <p className="text-gray-600">{track.description}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">{track.prerequisites}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-semibold text-xsigma-navy">{track.duration}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Level:</span>
                          <span className="font-semibold text-xsigma-navy">{track.level}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Price:</span>
                          <span className="font-semibold text-xsigma-navy">{track.price}</span>
                        </div>
                        <div className="pt-3 border-t border-gray-200">
                          <span className="text-sm text-gray-600">Certification:</span>
                          <p className="font-semibold text-xsigma-navy text-sm">{track.certification}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-xsigma-navy mb-6">Training Modules</h4>
                    <div className="space-y-4">
                      {track.modules.map((module, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-lg border border-gray-200">
                          <div className="flex items-center justify-between mb-3">
                            <h5 className="text-lg font-semibold text-xsigma-navy">{module.title}</h5>
                            <span className="flex items-center text-gray-600 text-sm">
                              <Clock className="w-4 h-4 mr-1" />
                              {module.duration}
                            </span>
                          </div>
                          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
                            {module.topics.map((topic, topicIdx) => (
                              <div key={topicIdx} className="flex items-center text-gray-700 text-sm">
                                <CheckCircle className="w-3 h-3 text-xsigma-teal mr-2 flex-shrink-0" />
                                {topic}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </div>
        </section>

        {/* Certification Levels */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Certification Levels</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Progressive certification levels that recognize your expertise and commitment 
                to XSigma Enhanced AAD technology mastery.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid lg:grid-cols-3 gap-8"
            >
              {certificationLevels.map((level, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="text-center mb-6">
                    <div className="bg-xsigma-teal/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="w-8 h-8 text-xsigma-teal" />
                    </div>
                    <h3 className="text-2xl font-bold text-xsigma-navy mb-2">{level.name}</h3>
                    <p className="text-gray-600">{level.description}</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-xsigma-navy mb-3">Requirements:</h4>
                    <ul className="space-y-2">
                      {level.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start text-gray-700 text-sm">
                          <CheckCircle className="w-4 h-4 text-xsigma-teal mr-2 mt-0.5 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-xsigma-navy mb-3">Benefits:</h4>
                    <ul className="space-y-2">
                      {level.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center text-gray-700 text-sm">
                          <Star className="w-4 h-4 text-xsigma-teal mr-2 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-center pt-4 border-t border-gray-200">
                    <span className="text-sm text-gray-600">Valid for: </span>
                    <span className="font-semibold text-xsigma-navy">{level.validity}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Training Formats */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Training Formats</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Flexible training delivery options to accommodate different learning preferences 
                and organizational requirements.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {trainingFormats.map((format, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow duration-300 text-center"
                >
                  <div className="bg-xsigma-teal/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-xsigma-teal">{format.icon}</div>
                  </div>
                  <h3 className="text-lg font-bold text-xsigma-navy mb-3">{format.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{format.description}</p>
                  
                  <div className="mb-4">
                    <ul className="space-y-1">
                      {format.features.map((feature, idx) => (
                        <li key={idx} className="text-gray-700 text-xs flex items-center justify-center">
                          <CheckCircle className="w-3 h-3 text-xsigma-teal mr-1" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    <strong>Schedule:</strong> {format.schedule}
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
                Start Your Learning Journey
              </h2>
              <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
                Advance your career with XSigma Enhanced AAD expertise. Join thousands of 
                professionals who have mastered quantitative finance technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-xsigma-teal hover:bg-xsigma-teal/90 text-white font-semibold rounded-lg transition-colors duration-300"
                >
                  Enroll Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
                <a
                  href="/downloads/training-catalog"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-xsigma-navy font-semibold rounded-lg transition-colors duration-300"
                >
                  Download Catalog
                  <BookOpen className="ml-2 w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Training;
