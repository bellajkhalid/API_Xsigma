import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Calendar, ExternalLink, Award, Mic, FileText, Users, ArrowRight } from 'lucide-react';

const News: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

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

  const newsItems = [
    {
      id: 1,
      category: 'press-release',
      title: 'XSigma Announces Major Tier-1 Bank Deployment of Enhanced AAD Technology',
      excerpt: 'Leading global investment bank successfully implements XSigma\'s Enhanced AAD framework across trading desks, achieving 10x performance improvement in derivatives pricing.',
      date: '2024-08-15',
      image: '/api/placeholder/600/300',
      link: '#',
      featured: true
    },
    {
      id: 2,
      category: 'award',
      title: 'XSigma Wins "Innovation in Quantitative Finance" Award at QuantMinds 2024',
      excerpt: 'Recognition for breakthrough Enhanced AAD technology and its impact on production trading systems at major financial institutions.',
      date: '2024-07-22',
      image: '/api/placeholder/600/300',
      link: '#',
      featured: false
    },
    {
      id: 3,
      category: 'conference',
      title: 'CEO Dr. Michael Chen Keynotes at Global Derivatives Trading Conference',
      excerpt: 'Presentation on "The Future of Automatic Differentiation in Quantitative Finance" draws standing ovation from 500+ industry professionals.',
      date: '2024-06-18',
      image: '/api/placeholder/600/300',
      link: '#',
      featured: false
    },
    {
      id: 4,
      category: 'media',
      title: 'Risk Magazine Features XSigma\'s Enhanced AAD Breakthrough',
      excerpt: 'In-depth analysis of how XSigma\'s proprietary Enhanced AAD technology is revolutionizing derivatives pricing and risk management.',
      date: '2024-05-30',
      image: '/api/placeholder/600/300',
      link: '#',
      featured: false
    },
    {
      id: 5,
      category: 'press-release',
      title: 'XSigma Secures $50M Series B Funding Round',
      excerpt: 'Investment led by leading fintech VCs to accelerate global expansion and Enhanced AAD technology development.',
      date: '2024-04-12',
      image: '/api/placeholder/600/300',
      link: '#',
      featured: false
    },
    {
      id: 6,
      category: 'conference',
      title: 'XSigma Presents at Basel III Implementation Summit',
      excerpt: 'Technical presentation on Enhanced AAD applications for regulatory capital calculations and FRTB compliance.',
      date: '2024-03-25',
      image: '/api/placeholder/600/300',
      link: '#',
      featured: false
    },
    {
      id: 7,
      category: 'media',
      title: 'Financial Times: "The AAD Revolution in Quantitative Finance"',
      excerpt: 'Feature article highlighting XSigma\'s role in transforming how tier-1 banks approach derivatives pricing and risk management.',
      date: '2024-02-14',
      image: '/api/placeholder/600/300',
      link: '#',
      featured: false
    },
    {
      id: 8,
      category: 'press-release',
      title: 'XSigma Launches Enhanced AAD Framework 2.0',
      excerpt: 'Next-generation Enhanced AAD technology delivers unprecedented performance improvements for complex derivatives portfolios.',
      date: '2024-01-18',
      image: '/api/placeholder/600/300',
      link: '#',
      featured: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All News', icon: <FileText className="w-4 h-4" /> },
    { id: 'press-release', name: 'Press Releases', icon: <FileText className="w-4 h-4" /> },
    { id: 'media', name: 'Media Coverage', icon: <ExternalLink className="w-4 h-4" /> },
    { id: 'award', name: 'Awards', icon: <Award className="w-4 h-4" /> },
    { id: 'conference', name: 'Conferences', icon: <Mic className="w-4 h-4" /> }
  ];

  const filteredNews = activeCategory === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category === activeCategory);

  const featuredNews = newsItems.filter(item => item.featured);
  const regularNews = newsItems.filter(item => !item.featured);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'press-release': return <FileText className="w-4 h-4" />;
      case 'media': return <ExternalLink className="w-4 h-4" />;
      case 'award': return <Award className="w-4 h-4" />;
      case 'conference': return <Mic className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'press-release': return 'Press Release';
      case 'media': return 'Media Coverage';
      case 'award': return 'Award';
      case 'conference': return 'Conference';
      default: return 'News';
    }
  };

  return (
    <>
      <Helmet>
        <title>News & Press - XSigma Company Updates | Enhanced AAD Technology Announcements</title>
        <meta name="description" content="Latest news, press releases, and media coverage about XSigma's Enhanced AAD technology, partnerships, and achievements in quantitative finance." />
        <meta name="keywords" content="XSigma news, press releases, Enhanced AAD, quantitative finance news, awards, conferences, media coverage" />
        <link rel="canonical" href="https://xsigma.co.uk/company/news" />
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
              <span className="text-gray-600">News & Press</span>
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
                News & <span className="text-xsigma-teal">Press</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
                Stay updated with the latest developments in XSigma's Enhanced AAD technology, 
                partnerships, and achievements in quantitative finance.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${
                    activeCategory === category.id
                      ? 'bg-xsigma-navy text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category.icon}
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured News */}
        {featuredNews.length > 0 && activeCategory === 'all' && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <h2 className="text-3xl font-bold text-xsigma-navy mb-8">Featured News</h2>
                
                {featuredNews.map((item) => (
                  <motion.article
                    key={item.id}
                    variants={fadeInUp}
                    className="bg-gradient-to-r from-xsigma-navy to-blue-900 text-white rounded-xl overflow-hidden shadow-xl"
                  >
                    <div className="grid lg:grid-cols-2 gap-0">
                      <div className="aspect-w-16 aspect-h-9 lg:aspect-none">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <div className="flex items-center space-x-2 mb-4">
                          <div className="text-xsigma-teal">{getCategoryIcon(item.category)}</div>
                          <span className="text-xsigma-teal font-semibold text-sm uppercase tracking-wide">
                            {getCategoryName(item.category)}
                          </span>
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-bold mb-4">{item.title}</h3>
                        <p className="text-gray-200 mb-6 text-lg leading-relaxed">{item.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-gray-300">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(item.date)}</span>
                          </div>
                          <a
                            href={item.link}
                            className="inline-flex items-center px-6 py-3 bg-xsigma-teal hover:bg-xsigma-teal/90 text-white font-semibold rounded-lg transition-colors duration-300"
                          >
                            Read More
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          </section>
        )}

        {/* News Grid */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-xsigma-navy mb-8">
                {activeCategory === 'all' ? 'Latest News' : `${categories.find(c => c.id === activeCategory)?.name}`}
              </h2>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {(activeCategory === 'all' ? regularNews : filteredNews).map((item) => (
                <motion.article
                  key={item.id}
                  variants={fadeInUp}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="text-xsigma-teal">{getCategoryIcon(item.category)}</div>
                      <span className="text-xsigma-teal font-semibold text-sm uppercase tracking-wide">
                        {getCategoryName(item.category)}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-xsigma-navy mb-3 overflow-hidden" style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {item.title}
                    </h3>

                    <p className="text-gray-600 mb-4 overflow-hidden" style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical'
                    }}>{item.excerpt}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-gray-500 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(item.date)}</span>
                      </div>
                      <a
                        href={item.link}
                        className="text-xsigma-teal hover:text-xsigma-navy font-semibold text-sm flex items-center space-x-1 transition-colors duration-300"
                      >
                        <span>Read More</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Media Kit & Contact */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-xsigma-navy mb-6">Media Resources</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Access our comprehensive media kit including high-resolution logos, 
                  executive photos, company fact sheets, and technical backgrounders.
                </p>
                <div className="space-y-4">
                  <a
                    href="#"
                    className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                  >
                    <FileText className="w-6 h-6 text-xsigma-teal" />
                    <div>
                      <h3 className="font-semibold text-xsigma-navy">Company Fact Sheet</h3>
                      <p className="text-sm text-gray-600">Key facts and figures about XSigma</p>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                  >
                    <Users className="w-6 h-6 text-xsigma-teal" />
                    <div>
                      <h3 className="font-semibold text-xsigma-navy">Executive Bios & Photos</h3>
                      <p className="text-sm text-gray-600">Leadership team information</p>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                  >
                    <Award className="w-6 h-6 text-xsigma-teal" />
                    <div>
                      <h3 className="font-semibold text-xsigma-navy">Brand Assets</h3>
                      <p className="text-sm text-gray-600">Logos, brand guidelines, and imagery</p>
                    </div>
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-xsigma-navy to-blue-900 text-white p-8 rounded-xl"
              >
                <h2 className="text-2xl font-bold mb-6">Media Inquiries</h2>
                <p className="text-gray-200 mb-6">
                  For press inquiries, interview requests, or additional information 
                  about XSigma's Enhanced AAD technology and company developments.
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Press Contact</h3>
                    <p className="text-gray-200">Sarah Johnson, VP Communications</p>
                    <p className="text-gray-200">press@xsigma.co.uk</p>
                    <p className="text-gray-200">+44 20 7123 4567</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Analyst Relations</h3>
                    <p className="text-gray-200">Michael Thompson, Head of Analyst Relations</p>
                    <p className="text-gray-200">analysts@xsigma.co.uk</p>
                  </div>
                </div>
                <a
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-xsigma-teal hover:bg-xsigma-teal/90 text-white font-semibold rounded-lg transition-colors duration-300 mt-6"
                >
                  Contact Media Team
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-xsigma-navy mb-6">Stay Informed</h2>
              <p className="text-xl text-gray-600 mb-8">
                Subscribe to our newsletter for the latest updates on Enhanced AAD technology, 
                company news, and industry insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-xsigma-teal focus:border-transparent"
                />
                <button className="px-8 py-3 bg-xsigma-navy hover:bg-xsigma-navy/90 text-white font-semibold rounded-lg transition-colors duration-300">
                  Subscribe
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default News;
