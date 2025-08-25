import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap, BookOpen, Users, Award, Globe, Lightbulb, FileText } from 'lucide-react';

const Academic: React.FC = () => {
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

  const academicPartners = [
    {
      name: "Stanford University",
      department: "Department of Management Science & Engineering",
      location: "Stanford, California, USA",
      collaboration: "Joint research on advanced automatic differentiation techniques and applications in quantitative finance.",
      logo: "/api/placeholder/200/100",
      keyProjects: [
        "Enhanced AAD Algorithm Development",
        "Machine Learning in Derivatives Pricing",
        "High-Performance Computing for Finance"
      ],
      publications: 12,
      students: 8,
      established: "2019"
    },
    {
      name: "MIT Sloan School",
      department: "Laboratory for Financial Engineering",
      location: "Cambridge, Massachusetts, USA",
      collaboration: "Research collaboration on machine learning applications in derivatives pricing and risk management.",
      logo: "/api/placeholder/200/100",
      keyProjects: [
        "AI-Driven Risk Modeling",
        "Quantum Computing for Finance",
        "Behavioral Finance in Algorithmic Trading"
      ],
      publications: 15,
      students: 12,
      established: "2020"
    },
    {
      name: "Oxford University",
      department: "Mathematical Institute",
      location: "Oxford, England, UK",
      collaboration: "Partnership on numerical methods and computational mathematics for financial applications.",
      logo: "/api/placeholder/200/100",
      keyProjects: [
        "Stochastic Calculus Applications",
        "Numerical PDE Methods",
        "Monte Carlo Variance Reduction"
      ],
      publications: 18,
      students: 15,
      established: "2018"
    },
    {
      name: "Imperial College London",
      department: "Department of Mathematics",
      location: "London, England, UK",
      collaboration: "Joint development of next-generation Enhanced AAD algorithms and optimization techniques.",
      logo: "/api/placeholder/200/100",
      keyProjects: [
        "Algorithmic Differentiation Innovation",
        "Parallel Computing Architectures",
        "Financial Mathematics Research"
      ],
      publications: 10,
      students: 6,
      established: "2021"
    },
    {
      name: "ETH Zurich",
      department: "Department of Computer Science",
      location: "Zurich, Switzerland",
      collaboration: "Research on high-performance computing and parallel algorithms for quantitative finance.",
      logo: "/api/placeholder/200/100",
      keyProjects: [
        "GPU Acceleration for AAD",
        "Distributed Computing Systems",
        "Computational Finance Optimization"
      ],
      publications: 8,
      students: 10,
      established: "2022"
    },
    {
      name: "University of Cambridge",
      department: "Department of Applied Mathematics",
      location: "Cambridge, England, UK",
      collaboration: "Collaborative research on mathematical modeling and computational methods in finance.",
      logo: "/api/placeholder/200/100",
      keyProjects: [
        "Mathematical Finance Theory",
        "Computational Methods Development",
        "Risk Management Mathematics"
      ],
      publications: 14,
      students: 9,
      established: "2020"
    }
  ];

  const researchAreas = [
    {
      title: "Automatic Differentiation",
      description: "Advanced AAD techniques for financial computing",
      icon: <Lightbulb className="w-8 h-8" />,
      projects: 8,
      publications: 25
    },
    {
      title: "Machine Learning in Finance",
      description: "AI applications in derivatives pricing and risk management",
      icon: <Globe className="w-8 h-8" />,
      projects: 12,
      publications: 18
    },
    {
      title: "High-Performance Computing",
      description: "Parallel and distributed computing for quantitative finance",
      icon: <Award className="w-8 h-8" />,
      projects: 6,
      publications: 15
    },
    {
      title: "Mathematical Finance",
      description: "Theoretical foundations and practical applications",
      icon: <BookOpen className="w-8 h-8" />,
      projects: 10,
      publications: 22
    }
  ];

  const programs = [
    {
      title: "PhD Internship Program",
      description: "6-month research internships for PhD students in quantitative finance, mathematics, and computer science.",
      duration: "6 months",
      positions: "8-12 annually",
      benefits: ["Research stipend", "Mentorship", "Publication opportunities", "Industry exposure"]
    },
    {
      title: "Faculty Exchange Program",
      description: "Sabbatical opportunities for faculty members to collaborate on cutting-edge research projects.",
      duration: "3-12 months",
      positions: "2-4 annually",
      benefits: ["Research funding", "Access to production systems", "Joint publications", "Industry insights"]
    },
    {
      title: "Joint Research Grants",
      description: "Collaborative funding for multi-year research projects addressing industry challenges.",
      duration: "2-3 years",
      positions: "3-5 projects",
      benefits: ["Substantial funding", "Industry partnerships", "Real-world applications", "Career development"]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Academic Collaborations - XSigma University Partnerships | Enhanced AAD Research</title>
        <meta name="description" content="Explore XSigma's academic partnerships with leading universities. Joint research in Enhanced AAD technology, quantitative finance, and computational mathematics." />
        <meta name="keywords" content="XSigma academic partnerships, university collaborations, Enhanced AAD research, quantitative finance education, PhD internships" />
        <link rel="canonical" href="https://xsigma.co.uk/company/academic" />
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
              <span className="text-gray-600">Academic Collaborations</span>
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
                Academic <span className="text-xsigma-teal">Collaborations</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
                Partnering with world-renowned universities to advance Enhanced AAD technology 
                and quantitative finance research.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Research Impact Overview */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Research Impact</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our academic partnerships drive innovation in quantitative finance through 
                collaborative research, student programs, and knowledge exchange.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
            >
              <motion.div variants={fadeInUp} className="text-center">
                <div className="bg-xsigma-teal/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-xsigma-teal" />
                </div>
                <div className="text-3xl font-bold text-xsigma-navy mb-2">6</div>
                <p className="text-gray-600">University Partners</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="text-center">
                <div className="bg-xsigma-teal/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-xsigma-teal" />
                </div>
                <div className="text-3xl font-bold text-xsigma-navy mb-2">80+</div>
                <p className="text-gray-600">Joint Publications</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="text-center">
                <div className="bg-xsigma-teal/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-xsigma-teal" />
                </div>
                <div className="text-3xl font-bold text-xsigma-navy mb-2">50+</div>
                <p className="text-gray-600">Student Researchers</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="text-center">
                <div className="bg-xsigma-teal/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-xsigma-teal" />
                </div>
                <div className="text-3xl font-bold text-xsigma-navy mb-2">25+</div>
                <p className="text-gray-600">Research Projects</p>
              </motion.div>
            </motion.div>

            {/* Research Areas */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {researchAreas.map((area, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="text-xsigma-teal mb-4">{area.icon}</div>
                  <h3 className="text-xl font-bold text-xsigma-navy mb-3">{area.title}</h3>
                  <p className="text-gray-600 mb-4">{area.description}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{area.projects} Projects</span>
                    <span>{area.publications} Papers</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* University Partners */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-xsigma-navy mb-6">University Partners</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Collaborating with leading academic institutions to advance the frontiers 
                of quantitative finance and computational mathematics.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-8"
            >
              {academicPartners.map((partner, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-xsigma-navy mb-2">{partner.name}</h3>
                      <p className="text-xsigma-teal font-semibold mb-1">{partner.department}</p>
                      <p className="text-gray-600 text-sm mb-4">{partner.location}</p>
                    </div>
                    <img src={partner.logo} alt={partner.name} className="w-16 h-16 object-contain" />
                  </div>
                  
                  <p className="text-gray-700 mb-6">{partner.collaboration}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-xsigma-navy mb-3">Key Research Projects:</h4>
                    <ul className="space-y-1">
                      {partner.keyProjects.map((project, idx) => (
                        <li key={idx} className="text-gray-600 text-sm flex items-center">
                          <span className="w-2 h-2 bg-xsigma-teal rounded-full mr-3"></span>
                          {project}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-xsigma-teal">{partner.publications}</div>
                      <div className="text-xs text-gray-600">Publications</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-xsigma-teal">{partner.students}</div>
                      <div className="text-xs text-gray-600">Students</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-xsigma-teal">{partner.established}</div>
                      <div className="text-xs text-gray-600">Since</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Academic Programs */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Academic Programs</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive programs designed to foster collaboration between academia and industry, 
                bridging theoretical research with practical applications.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-8"
            >
              {programs.map((program, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-gradient-to-r from-gray-50 to-white p-8 rounded-xl border border-gray-200"
                >
                  <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <h3 className="text-2xl font-bold text-xsigma-navy mb-4">{program.title}</h3>
                      <p className="text-gray-700 mb-6">{program.description}</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <span className="font-semibold text-xsigma-navy">Duration: </span>
                          <span className="text-gray-600">{program.duration}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-xsigma-navy">Positions: </span>
                          <span className="text-gray-600">{program.positions}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-xsigma-navy mb-3">Program Benefits:</h4>
                      <ul className="space-y-2">
                        {program.benefits.map((benefit, idx) => (
                          <li key={idx} className="text-gray-600 text-sm flex items-center">
                            <span className="w-2 h-2 bg-xsigma-teal rounded-full mr-3"></span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
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
                Join Our Academic Network
              </h2>
              <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
                Interested in collaborating with XSigma on cutting-edge quantitative finance research? 
                We welcome partnerships with leading academic institutions worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-xsigma-teal hover:bg-xsigma-teal/90 text-white font-semibold rounded-lg transition-colors duration-300"
                >
                  Start a Collaboration
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
                <a
                  href="/company/partners"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-xsigma-navy font-semibold rounded-lg transition-colors duration-300"
                >
                  View All Partnerships
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Academic;
