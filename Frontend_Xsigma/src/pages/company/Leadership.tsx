import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ExternalLink, Mail, Award, GraduationCap, Building2 } from 'lucide-react';

const Leadership: React.FC = () => {
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

  const executiveTeam = [
    {
      name: "Dr. Michael Chen",
      title: "Chief Executive Officer & Co-Founder",
      image: "/api/placeholder/400/400",
      education: "PhD Computational Finance, Stanford University",
      experience: "Former Head of Quantitative Research, Goldman Sachs",
      bio: "Dr. Chen brings over 15 years of experience in quantitative finance, having led derivatives pricing teams at tier-1 investment banks. His pioneering work in automatic differentiation forms the foundation of XSigma's Enhanced AAD technology. He holds 12 patents in computational finance and has published extensively in leading academic journals.",
      linkedin: "#",
      email: "m.chen@xsigma.co.uk",
      specialties: ["Automatic Differentiation", "Derivatives Pricing", "Risk Management"]
    },
    {
      name: "Dr. Sarah Williams",
      title: "Chief Technology Officer & Co-Founder",
      image: "/api/placeholder/400/400",
      education: "PhD Applied Mathematics, MIT",
      experience: "Former VP Technology, J.P. Morgan",
      bio: "Dr. Williams is a recognized expert in numerical methods and high-performance computing for finance. She architected the core Enhanced AAD framework and leads XSigma's technology development. Her work has been instrumental in achieving the performance breakthroughs that enable real-time risk calculations for complex derivatives portfolios.",
      linkedin: "#",
      email: "s.williams@xsigma.co.uk",
      specialties: ["High-Performance Computing", "Numerical Methods", "Software Architecture"]
    },
    {
      name: "James Rodriguez",
      title: "Chief Financial Officer",
      image: "/api/placeholder/400/400",
      education: "MBA Finance, Wharton School",
      experience: "Former CFO, QuantLab Financial",
      bio: "James brings deep expertise in financial management and strategic planning for technology companies. He previously served as CFO at several successful fintech startups and has extensive experience in raising capital and managing investor relations. His background includes senior finance roles at hedge funds and investment banks.",
      linkedin: "#",
      email: "j.rodriguez@xsigma.co.uk",
      specialties: ["Corporate Finance", "Strategic Planning", "Investor Relations"]
    },
    {
      name: "Dr. Raj Patel",
      title: "Head of Quantitative Research",
      image: "/api/placeholder/400/400",
      education: "PhD Mathematical Finance, Oxford University",
      experience: "Former Director, Barclays Investment Bank",
      bio: "Dr. Patel leads XSigma's research initiatives and model development. With over 12 years at tier-1 banks, he has deep expertise in exotic derivatives, credit risk modeling, and regulatory capital calculations. He is a frequent speaker at industry conferences and serves on the editorial board of the Journal of Computational Finance.",
      linkedin: "#",
      email: "r.patel@xsigma.co.uk",
      specialties: ["Model Development", "Credit Risk", "Regulatory Capital"]
    },
    {
      name: "Lisa Thompson",
      title: "Head of Client Solutions",
      image: "/api/placeholder/400/400",
      education: "MSc Financial Engineering, Imperial College London",
      experience: "Former VP Sales, Bloomberg Terminal",
      bio: "Lisa leads XSigma's client engagement and solutions delivery. Her extensive background in financial technology sales and client relationship management ensures successful implementations at tier-1 institutions. She has a proven track record of building long-term partnerships with major banks and asset managers.",
      linkedin: "#",
      email: "l.thompson@xsigma.co.uk",
      specialties: ["Client Relations", "Solution Architecture", "Implementation Management"]
    },
    {
      name: "Dr. Andreas Mueller",
      title: "Head of European Operations",
      image: "/api/placeholder/400/400",
      education: "PhD Economics, London School of Economics",
      experience: "Former MD, Deutsche Bank",
      bio: "Dr. Mueller oversees XSigma's European expansion and regulatory compliance initiatives. His deep understanding of European financial markets and regulatory frameworks has been crucial in establishing XSigma's presence across major European financial centers. He maintains strong relationships with regulators and industry bodies.",
      linkedin: "#",
      email: "a.mueller@xsigma.co.uk",
      specialties: ["European Markets", "Regulatory Compliance", "Business Development"]
    }
  ];

  const advisoryBoard = [
    {
      name: "Prof. David Johnson",
      title: "Advisory Board Chairman",
      affiliation: "Former Chief Risk Officer, UBS",
      expertise: "Risk Management, Regulatory Affairs"
    },
    {
      name: "Dr. Maria Gonzalez",
      title: "Technology Advisor",
      affiliation: "Professor of Computational Finance, Cambridge",
      expertise: "Academic Research, Algorithm Development"
    },
    {
      name: "Robert Kim",
      title: "Industry Advisor",
      affiliation: "Former Global Head of Trading, HSBC",
      expertise: "Trading Operations, Market Structure"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Leadership Team - XSigma Quantitative Finance Experts | Enhanced AAD Technology</title>
        <meta name="description" content="Meet XSigma's leadership team of quantitative finance experts and practitioners. Our executives bring decades of experience from tier-1 banks and leading academic institutions." />
        <meta name="keywords" content="XSigma leadership, quantitative finance experts, Enhanced AAD, financial technology executives, tier-1 bank experience" />
        <link rel="canonical" href="https://xsigma.co.uk/company/leadership" />
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
              <span className="text-gray-600">Leadership Team</span>
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
                Leadership <span className="text-xsigma-teal">Team</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
                Quantitative finance experts and practitioners with decades of experience 
                from tier-1 banks and leading academic institutions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Executive Team */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Executive Team</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our leadership combines deep quantitative expertise with proven track records 
                at the world's leading financial institutions.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {executiveTeam.map((executive, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200"
                >
                  <div className="aspect-w-1 aspect-h-1">
                    <img
                      src={executive.image}
                      alt={executive.name}
                      className="w-full h-80 object-cover"
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-xsigma-navy mb-2">{executive.name}</h3>
                    <p className="text-xsigma-teal font-semibold mb-4">{executive.title}</p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-start space-x-2">
                        <GraduationCap className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                        <p className="text-sm text-gray-600">{executive.education}</p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Building2 className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                        <p className="text-sm text-gray-600">{executive.experience}</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-4 overflow-hidden" style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: 'vertical'
                    }}>{executive.bio}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {executive.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-xsigma-teal/10 text-xsigma-teal text-xs rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex space-x-3">
                      <a
                        href={executive.linkedin}
                        className="text-gray-400 hover:text-xsigma-teal transition-colors"
                        aria-label={`${executive.name} LinkedIn`}
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                      <a
                        href={`mailto:${executive.email}`}
                        className="text-gray-400 hover:text-xsigma-teal transition-colors"
                        aria-label={`Email ${executive.name}`}
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Advisory Board */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Advisory Board</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Distinguished industry leaders and academic experts who guide our strategic direction 
                and ensure we remain at the forefront of quantitative finance innovation.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              {advisoryBoard.map((advisor, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
                >
                  <div className="w-20 h-20 bg-xsigma-teal/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="w-10 h-10 text-xsigma-teal" />
                  </div>
                  <h3 className="text-xl font-bold text-xsigma-navy mb-2">{advisor.name}</h3>
                  <p className="text-xsigma-teal font-semibold mb-3">{advisor.title}</p>
                  <p className="text-gray-600 mb-4">{advisor.affiliation}</p>
                  <p className="text-sm text-gray-700">{advisor.expertise}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Company Culture */}
        <section className="py-20 bg-gradient-to-br from-xsigma-navy to-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">Our Culture</h2>
              <p className="text-xl text-gray-200 max-w-4xl mx-auto">
                We foster an environment of innovation, collaboration, and excellence where 
                the world's brightest quantitative minds can thrive and push the boundaries 
                of financial technology.
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
                  <GraduationCap className="w-8 h-8 text-xsigma-teal" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Continuous Learning</h3>
                <p className="text-gray-200">
                  We invest heavily in our team's professional development and encourage 
                  participation in academic research and industry conferences.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="text-center">
                <div className="bg-xsigma-teal/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-xsigma-teal" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Excellence First</h3>
                <p className="text-gray-200">
                  Every solution we deliver meets the highest standards of accuracy, 
                  performance, and reliability expected by tier-1 financial institutions.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="text-center">
                <div className="bg-xsigma-teal/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Building2 className="w-8 h-8 text-xsigma-teal" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Industry Impact</h3>
                <p className="text-gray-200">
                  Our work directly influences how major financial institutions manage 
                  risk and price complex derivatives in global markets.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-xsigma-navy mb-6">
                Join Our World-Class Team
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                We're always looking for exceptional quantitative finance professionals 
                who share our passion for innovation and excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/careers"
                  className="inline-flex items-center px-8 py-4 bg-xsigma-navy hover:bg-xsigma-navy/90 text-white font-semibold rounded-lg transition-colors duration-300"
                >
                  View Open Positions
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 border-2 border-xsigma-navy text-xsigma-navy hover:bg-xsigma-navy hover:text-white font-semibold rounded-lg transition-colors duration-300"
                >
                  Contact Our Team
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Leadership;
