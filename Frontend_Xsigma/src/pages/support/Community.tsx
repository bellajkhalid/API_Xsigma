import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, Users, MessageCircle, Award, TrendingUp, BookOpen, Code, HelpCircle, Star } from 'lucide-react';

const Community: React.FC = () => {
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

  const communityStats = [
    {
      number: '2,500+',
      label: 'Active Members',
      description: 'Quantitative finance professionals worldwide'
    },
    {
      number: '15,000+',
      label: 'Forum Posts',
      description: 'Technical discussions and solutions'
    },
    {
      number: '850+',
      label: 'Code Examples',
      description: 'Shared implementations and snippets'
    },
    {
      number: '95%',
      label: 'Response Rate',
      description: 'Questions answered within 24 hours'
    }
  ];

  const forumCategories = [
    {
      name: 'General Discussion',
      description: 'General topics about XSigma Enhanced AAD technology and quantitative finance',
      icon: <MessageCircle className="w-6 h-6" />,
      posts: 3420,
      members: 1850,
      lastActivity: '2 minutes ago'
    },
    {
      name: 'API & Integration',
      description: 'Technical discussions about API usage, SDKs, and system integration',
      icon: <Code className="w-6 h-6" />,
      posts: 2890,
      members: 1200,
      lastActivity: '15 minutes ago'
    },
    {
      name: 'CVA/DVA Implementation',
      description: 'Specific discussions about CVA and DVA calculations and implementations',
      icon: <TrendingUp className="w-6 h-6" />,
      posts: 1650,
      members: 780,
      lastActivity: '1 hour ago'
    },
    {
      name: 'Performance & Optimization',
      description: 'Tips and techniques for optimizing Enhanced AAD performance',
      icon: <Award className="w-6 h-6" />,
      posts: 920,
      members: 450,
      lastActivity: '3 hours ago'
    },
    {
      name: 'Code Examples',
      description: 'Share and discover code examples, snippets, and implementations',
      icon: <BookOpen className="w-6 h-6" />,
      posts: 1340,
      members: 890,
      lastActivity: '30 minutes ago'
    },
    {
      name: 'Q&A Support',
      description: 'Get help with technical questions and troubleshooting',
      icon: <HelpCircle className="w-6 h-6" />,
      posts: 4200,
      members: 1950,
      lastActivity: '5 minutes ago'
    }
  ];

  const topContributors = [
    {
      name: 'Dr. Sarah Chen',
      title: 'Senior Quantitative Analyst',
      company: 'Global Investment Bank',
      contributions: 245,
      reputation: 4850,
      specialties: ['CVA Modeling', 'Risk Management', 'Python Integration']
    },
    {
      name: 'Michael Rodriguez',
      title: 'Lead Developer',
      company: 'FinTech Solutions',
      contributions: 189,
      reputation: 3920,
      specialties: ['API Integration', 'Performance Optimization', 'C++ Development']
    },
    {
      name: 'Prof. James Wilson',
      title: 'Academic Researcher',
      company: 'Oxford University',
      contributions: 156,
      reputation: 3650,
      specialties: ['Mathematical Finance', 'AAD Theory', 'Model Validation']
    },
    {
      name: 'Lisa Thompson',
      title: 'Risk Technology Manager',
      company: 'European Bank',
      contributions: 134,
      reputation: 2980,
      specialties: ['Enterprise Integration', 'Regulatory Compliance', 'System Architecture']
    }
  ];

  const recentDiscussions = [
    {
      title: 'Optimizing Monte Carlo simulations with Enhanced AAD',
      author: 'QuantDev_2024',
      category: 'Performance & Optimization',
      replies: 23,
      views: 1240,
      lastReply: '2 hours ago',
      tags: ['Monte Carlo', 'Performance', 'AAD']
    },
    {
      title: 'Integration with Bloomberg Terminal - Best Practices',
      author: 'BloombergUser',
      category: 'API & Integration',
      replies: 18,
      views: 890,
      lastReply: '4 hours ago',
      tags: ['Bloomberg', 'Integration', 'Market Data']
    },
    {
      title: 'CVA calculation for exotic derivatives',
      author: 'ExoticTrader',
      category: 'CVA/DVA Implementation',
      replies: 31,
      views: 1560,
      lastReply: '6 hours ago',
      tags: ['CVA', 'Exotic Derivatives', 'Pricing']
    },
    {
      title: 'Python SDK memory management tips',
      author: 'PythonQuant',
      category: 'Code Examples',
      replies: 15,
      views: 720,
      lastReply: '8 hours ago',
      tags: ['Python', 'Memory', 'SDK']
    }
  ];

  const communityBenefits = [
    {
      title: 'Expert Knowledge Sharing',
      description: 'Learn from experienced quantitative finance professionals and XSigma experts',
      icon: <Users className="w-6 h-6" />
    },
    {
      title: 'Real-World Solutions',
      description: 'Access practical solutions and implementations from production environments',
      icon: <Code className="w-6 h-6" />
    },
    {
      title: 'Networking Opportunities',
      description: 'Connect with peers in quantitative finance and build professional relationships',
      icon: <MessageCircle className="w-6 h-6" />
    },
    {
      title: 'Early Access',
      description: 'Get early insights into new features and participate in beta programs',
      icon: <Star className="w-6 h-6" />
    }
  ];

  return (
    <>
      <Helmet>
        <title>Community Forum - XSigma Enhanced AAD Developer Community | Quantitative Finance Forum</title>
        <meta name="description" content="Join the XSigma Enhanced AAD community forum. Connect with quantitative finance professionals, share knowledge, and get expert support for Enhanced AAD technology." />
        <meta name="keywords" content="XSigma community forum, Enhanced AAD community, quantitative finance forum, developer community, CVA forum, AAD support" />
        <link rel="canonical" href="https://xsigma.co.uk/support/community" />
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
              <span className="text-gray-600">Community Forum</span>
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
                Community <span className="text-xsigma-teal">Forum</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
                Connect with quantitative finance professionals worldwide. Share knowledge, 
                get expert support, and collaborate on Enhanced AAD technology implementations.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Community Stats */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Thriving Community</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join thousands of quantitative finance professionals sharing knowledge 
                and advancing Enhanced AAD technology together.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {communityStats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center p-6 rounded-xl bg-gray-50"
                >
                  <div className="text-4xl font-bold text-xsigma-teal mb-2">{stat.number}</div>
                  <div className="text-lg font-semibold text-xsigma-navy mb-1">{stat.label}</div>
                  <div className="text-gray-600 text-sm">{stat.description}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Forum Categories */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Forum Categories</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore specialized discussion areas covering all aspects of XSigma Enhanced AAD 
                technology and quantitative finance applications.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {forumCategories.map((category, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-start mb-4">
                    <div className="bg-xsigma-teal/10 w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <div className="text-xsigma-teal">{category.icon}</div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-xsigma-navy mb-1">{category.name}</h3>
                      <p className="text-gray-600 text-sm">{category.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center text-sm mb-4">
                    <div>
                      <div className="font-semibold text-xsigma-navy">{category.posts.toLocaleString()}</div>
                      <div className="text-gray-600">Posts</div>
                    </div>
                    <div>
                      <div className="font-semibold text-xsigma-navy">{category.members.toLocaleString()}</div>
                      <div className="text-gray-600">Members</div>
                    </div>
                    <div>
                      <div className="font-semibold text-xsigma-teal text-xs">{category.lastActivity}</div>
                      <div className="text-gray-600">Last Activity</div>
                    </div>
                  </div>

                  <a
                    href={`/community/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center text-xsigma-teal hover:text-xsigma-navy font-semibold transition-colors text-sm"
                  >
                    View Category
                    <ArrowRight className="ml-1 w-3 h-3" />
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Top Contributors */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Top Contributors</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Meet our most active community members who share their expertise and 
                help others succeed with Enhanced AAD technology.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-8"
            >
              {topContributors.map((contributor, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-gray-50 p-6 rounded-xl"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-xsigma-navy">{contributor.name}</h3>
                      <p className="text-gray-600">{contributor.title}</p>
                      <p className="text-gray-500 text-sm">{contributor.company}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-xsigma-teal">{contributor.contributions}</div>
                      <div className="text-xs text-gray-600">Contributions</div>
                      <div className="text-sm font-semibold text-xsigma-navy mt-1">{contributor.reputation} rep</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-xsigma-navy mb-2 text-sm">Specialties:</h4>
                    <div className="flex flex-wrap gap-2">
                      {contributor.specialties.map((specialty, idx) => (
                        <span key={idx} className="bg-xsigma-teal/10 text-xsigma-teal px-2 py-1 rounded text-xs">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Recent Discussions */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Recent Discussions</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Stay up-to-date with the latest discussions and trending topics 
                in the XSigma community.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {recentDiscussions.map((discussion, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-xsigma-navy mb-2 hover:text-xsigma-teal cursor-pointer">
                        {discussion.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <span>by <strong>{discussion.author}</strong></span>
                        <span>in <strong>{discussion.category}</strong></span>
                        <span>Last reply: {discussion.lastReply}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {discussion.tags.map((tag, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right ml-6">
                      <div className="text-sm text-gray-600">
                        <div><strong>{discussion.replies}</strong> replies</div>
                        <div><strong>{discussion.views}</strong> views</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Community Benefits */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-xsigma-navy mb-6">Why Join Our Community?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Become part of a vibrant community of quantitative finance professionals 
                and unlock exclusive benefits.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {communityBenefits.map((benefit, index) => (
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
                Join the XSigma Community
              </h2>
              <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
                Connect with quantitative finance professionals, share your expertise, 
                and accelerate your Enhanced AAD technology journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/community/register"
                  className="inline-flex items-center px-8 py-4 bg-xsigma-teal hover:bg-xsigma-teal/90 text-white font-semibold rounded-lg transition-colors duration-300"
                >
                  Join Community
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
                <a
                  href="/community/browse"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-xsigma-navy font-semibold rounded-lg transition-colors duration-300"
                >
                  Browse Discussions
                  <MessageCircle className="ml-2 w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Community;
