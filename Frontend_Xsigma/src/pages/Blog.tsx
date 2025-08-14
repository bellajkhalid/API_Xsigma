import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import ThemeToggle from "@/components/ThemeToggle";
import AnimatedBackground from "@/components/AnimatedBackground";
import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlogPost from "@/components/BlogPost";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
}

const Blog = () => {
  const { isDark } = useTheme();
  const { postId } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // XSigma Research Articles
  const blogPosts: BlogPost[] = [
    {
      id: "coherent-market-simulations",
      title: "Coherent Global Market Simulations and Securitization Measures for Counterparty Credit Risk",
      excerpt: "Exploring advanced methodologies for coherent market simulations and securitization measures in counterparty credit risk management. This comprehensive analysis demonstrates how XSigma's quantitative solutions address the complex challenges of global market modeling and credit risk assessment in modern financial markets.",
      content: `
        <article>
          <h2>Introduction</h2>
          <p>In the evolving landscape of quantitative finance, the accurate modeling of counterparty credit risk remains one of the most critical challenges facing financial institutions. The research paper "Coherent global market simulations and securitization measures for counterparty credit risk" provides groundbreaking insights into advanced methodologies that directly align with XSigma's mission to deliver cutting-edge quantitative solutions.</p>

          <h2>The Challenge of Counterparty Credit Risk</h2>
          <p>Counterparty credit risk represents the potential loss arising from a counterparty's failure to meet its contractual obligations. In today's interconnected financial markets, this risk is amplified by:</p>
          <ul>
            <li><strong>Complex derivative portfolios</strong> with multiple counterparties</li>
            <li><strong>Market volatility</strong> affecting collateral values</li>
            <li><strong>Regulatory requirements</strong> demanding sophisticated risk measurement</li>
            <li><strong>Systemic risk considerations</strong> in global financial networks</li>
          </ul>

          <h2>Coherent Market Simulations: A Game-Changer</h2>
          <p>The research emphasizes the importance of coherent market simulations that maintain mathematical consistency across different market scenarios. This approach ensures that:</p>
          <ul>
            <li><strong>Risk measures are additive</strong> across portfolios and business units</li>
            <li><strong>Scenario generation</strong> reflects realistic market dynamics</li>
            <li><strong>Correlation structures</strong> are preserved under stress conditions</li>
            <li><strong>Regulatory capital calculations</strong> remain robust and defensible</li>
          </ul>

          <h2>XSigma's Implementation of Advanced Risk Models</h2>
          <p>XSigma's quantitative platform incorporates these advanced concepts through our comprehensive API offerings:</p>

          <h3>1. Analytical Sigma API</h3>
          <p>Our flagship API provides coherent risk factor modeling that ensures consistency across different market scenarios, directly implementing the principles outlined in the research.</p>

          <h3>2. FX Volatility Models</h3>
          <p>Advanced foreign exchange volatility modeling that captures the complex dynamics essential for accurate counterparty credit risk assessment in multi-currency portfolios.</p>

          <h3>3. Hartman-Watson Distribution</h3>
          <p>Sophisticated probability distributions that enable accurate modeling of extreme market events, crucial for stress testing and scenario analysis in counterparty risk frameworks.</p>

          <h3>4. ZABR Variables</h3>
          <p>Extended SABR model implementations that provide the flexibility needed for coherent market simulations across different asset classes and market conditions.</p>

          <h2>Securitization Measures and Modern Risk Management</h2>
          <p>The research's focus on securitization measures is particularly relevant in today's market environment. XSigma's platform addresses these challenges by providing:</p>
          <ul>
            <li><strong>Real-time risk calculation</strong> for complex securitized products</li>
            <li><strong>Stress testing capabilities</strong> that maintain model coherence</li>
            <li><strong>Regulatory compliance tools</strong> for Basel III and IFRS 9 requirements</li>
            <li><strong>Portfolio optimization</strong> considering counterparty credit risk</li>
          </ul>

          <h2>Practical Applications in Financial Institutions</h2>
          <p>Financial institutions can leverage these advanced methodologies through XSigma's platform to:</p>
          <ul>
            <li><strong>Enhance risk measurement accuracy</strong> across trading portfolios</li>
            <li><strong>Optimize capital allocation</strong> based on coherent risk metrics</li>
            <li><strong>Improve regulatory reporting</strong> with robust, defensible models</li>
            <li><strong>Strengthen counterparty risk management</strong> through advanced analytics</li>
          </ul>

          <h2>Future Developments and Research</h2>
          <p>XSigma continues to advance the state-of-the-art in quantitative finance by:</p>
          <ul>
            <li>Developing next-generation coherent simulation frameworks</li>
            <li>Enhancing machine learning applications in risk modeling</li>
            <li>Expanding API capabilities for emerging market structures</li>
            <li>Collaborating with academic institutions on cutting-edge research</li>
          </ul>

          <h2>Conclusion</h2>
          <p>The research on coherent global market simulations and securitization measures represents a significant advancement in counterparty credit risk management. XSigma's platform embodies these principles, providing financial institutions with the tools needed to navigate today's complex risk landscape effectively.</p>

          <p>By combining rigorous academic research with practical implementation, XSigma continues to bridge the gap between theoretical advances and real-world applications in quantitative finance.</p>

          <h2>References</h2>
          <p><a href="https://www.researchgate.net/publication/227624010_Coherent_global_market_simulations_and_securitization_measures_for_counterparty_credit_risk" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-700 underline">Coherent global market simulations and securitization measures for counterparty credit risk - ResearchGate</a></p>
        </article>
      `,
      author: "XSigma Research Team",
      date: "2024-08-14",
      readTime: "12 min read",
      category: "Credit Risk Management",
      tags: ["Counterparty Risk", "Market Simulations", "Securitization", "Credit Risk", "Quantitative Finance", "Risk Management"],
      featured: true
    },
    {
      id: "1",
      title: "Closed-Form Asymptotic Method for Swaptions and CMS Spread Options Pricing",
      excerpt: "Swaptions and CMS spread options are essential to calibrating interest rate models, yet remain computationally demanding. This research proposes a closed-form asymptotic method that significantly improves pricing accuracy and speed, enabling robust, real-time calibration of multi-factor Gaussian models.",
      content: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4265885",
      author: "Toufik Bellaj, Khalid Bellaj, Hicham Nait Yahia",
      date: "2024-01-15",
      readTime: "15 min read",
      category: "Interest Rate Models",
      tags: ["Swaptions", "CMS", "Gaussian Models", "Derivatives Pricing"],
      featured: true
    },
    {
      id: "2",
      title: "Advanced Calibration Techniques for Multi-Factor Interest Rate Models",
      excerpt: "Approved for publication in Risk.net - Our approach enables robust, real-time calibration of multi-factor Gaussian models, with practical implications for model risk management and derivative valuation in modern financial markets.",
      content: "Published in Risk.net",
      author: "Toufik Bellaj, Khalid Bellaj, Hicham Nait Yahia",
      date: "2024-02-01",
      readTime: "12 min read",
      category: "Model Risk Management",
      tags: ["Calibration", "Risk Management", "Gaussian Models", "Real-time"],
      featured: true
    },
    {
      id: "3",
      title: "Computational Advances in Derivative Pricing",
      excerpt: "Exploring the latest computational methods and asymptotic techniques for efficient pricing of complex derivatives in multi-factor interest rate environments.",
      content: "Research in progress...",
      author: "XSigma Research Team",
      date: "2024-01-05",
      readTime: "10 min read",
      category: "Computational Finance",
      tags: ["Derivatives", "Computational Methods", "Pricing"],
      featured: false
    },
    {
      id: "4",
      title: "XSigma Platform: Bridging Academic Research and Practical Implementation",
      excerpt: "How XSigma's platform translates cutting-edge quantitative research into practical tools for financial institutions and risk managers.",
      content: "Platform overview and research applications...",
      author: "XSigma Team",
      date: "2024-01-01",
      readTime: "8 min read",
      category: "Platform Research",
      tags: ["Platform", "Research", "Implementation"],
      featured: false
    }
  ];

  const categories = ["All", "Credit Risk Management", "Interest Rate Models", "Model Risk Management", "Computational Finance", "Platform Research"];

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);

  // Handle individual blog post view
  if (postId) {
    const post = blogPosts.find(p => p.id === postId);
    if (post) {
      return <BlogPost post={post} />;
    }
    // If post not found, redirect to blog home
    navigate('/blog');
    return null;
  }

  const handlePostClick = (post: BlogPost) => {
    if (post.content.startsWith('http')) {
      window.open(post.content, '_blank');
    } else {
      navigate(`/blog/${post.id}`);
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'} transition-colors duration-300`}>
      <ThemeToggle />
      <Navigation />

      {/* Hero Section - with same animated background as Home */}
      <section className="relative min-h-[60vh] pt-32 pb-20">
        {/* Animated Background */}
        <AnimatedBackground />
        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`text-5xl md:text-6xl font-light ${isDark ? 'text-white' : 'text-black'} mb-6`}
            >
              XSigma Blog
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}
            >
              Research articles, quantitative analysis, and cutting-edge insights from XSigma's research team
            </motion.p>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <section className={`py-16 ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`text-3xl font-light ${isDark ? 'text-white' : 'text-black'} mb-12`}
              >
                Featured Articles
              </motion.h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {featuredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`${isDark ? 'bg-black border-gray-800' : 'bg-white border-gray-200'} border rounded-none p-8 hover:shadow-lg transition-all duration-300 group cursor-pointer`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <span className={`px-3 py-1 text-xs font-medium ${isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'} rounded-full`}>
                        {post.category}
                      </span>
                      <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <h3 className={`text-xl font-medium ${isDark ? 'text-white' : 'text-black'} mb-3 group-hover:text-blue-500 transition-colors`}>
                      {post.title}
                    </h3>
                    
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4 leading-relaxed`}>
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <User className="w-4 h-4" />
                        {post.author}
                        <span className="mx-2">•</span>
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePostClick(post)}
                        className={`${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} p-0 h-auto group-hover:translate-x-1 transition-transform cursor-pointer`}
                      >
                        {post.content.startsWith('http') ? 'Read Paper' : 'Read More'} <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className={`py-8 ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full ${
                    selectedCategory === category
                      ? isDark ? 'bg-white text-black' : 'bg-black text-white'
                      : isDark ? 'border-gray-700 text-gray-300 hover:bg-gray-800' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Posts Section */}
      <section className={`py-16 ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`text-3xl font-light ${isDark ? 'text-white' : 'text-black'} mb-12`}
            >
              {selectedCategory === "All" ? "All Articles" : `${selectedCategory} Articles`}
            </motion.h2>

            <div className="grid gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`${isDark ? 'bg-gray-900/30 border-gray-800' : 'bg-gray-50 border-gray-200'} border rounded-none p-8 hover:shadow-lg transition-all duration-300 group cursor-pointer`}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <span className={`px-3 py-1 text-xs font-medium ${isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'} rounded-full`}>
                          {post.category}
                        </span>
                        <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          <Calendar className="w-4 h-4" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                      </div>

                      <h3 className={`text-2xl font-medium ${isDark ? 'text-white' : 'text-black'} mb-3 group-hover:text-blue-500 transition-colors`}>
                        {post.title}
                      </h3>

                      <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4 leading-relaxed`}>
                        {post.excerpt}
                      </p>

                      <div className="flex items-center gap-4 mb-4">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`flex items-center gap-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                          >
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          <User className="w-4 h-4" />
                          {post.author}
                          <span className="mx-2">•</span>
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePostClick(post)}
                          className={`${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} p-0 h-auto group-hover:translate-x-1 transition-transform cursor-pointer`}
                        >
                          {post.content.startsWith('http') ? 'Read Paper' : 'Read More'} <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-16">
                <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  No articles found in this category.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className={`py-20 ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`text-3xl font-light ${isDark ? 'text-white' : 'text-black'} mb-4`}
            >
              Stay Updated with Our Research
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-8`}
            >
              Subscribe to receive notifications about our latest research publications and quantitative finance insights.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className={`flex-1 px-4 py-3 ${isDark ? 'bg-black border-gray-700 text-white' : 'bg-white border-gray-300 text-black'} border rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <Button
                className={`px-8 py-3 ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'} rounded-none transition-colors`}
              >
                Subscribe
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Research Team Contact */}
      <section className={`py-16 ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`text-3xl font-light ${isDark ? 'text-white' : 'text-black'} mb-8 text-center`}
            >
              Research Team
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`${isDark ? 'bg-gray-900/30 border-gray-800' : 'bg-gray-50 border-gray-200'} border rounded-none p-6 text-center`}
              >
                <h3 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-black'} mb-2`}>
                  Toufik Bellaj
                </h3>
                <p className={`text-sm ${isDark ? 'text-blue-400' : 'text-blue-600'} mb-3`}>
                  Chief Technology Officer
                </p>
                <a
                  href="mailto:Toufik.Bellaj@xsigma.co.uk"
                  className={`text-sm ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'} transition-colors`}
                >
                  Toufik.Bellaj@xsigma.co.uk
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`${isDark ? 'bg-gray-900/30 border-gray-800' : 'bg-gray-50 border-gray-200'} border rounded-none p-6 text-center`}
              >
                <h3 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-black'} mb-2`}>
                  Hicham Nait Yahia
                </h3>
                <p className={`text-sm ${isDark ? 'text-blue-400' : 'text-blue-600'} mb-3`}>
                  AI Engineer
                </p>
                <a
                  href="mailto:Hicham.Nait-Yahia@xsigma.co.uk"
                  className={`text-sm ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'} transition-colors`}
                >
                  Hicham.Nait-Yahia@xsigma.co.uk
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className={`${isDark ? 'bg-gray-900/30 border-gray-800' : 'bg-gray-50 border-gray-200'} border rounded-none p-6 text-center`}
              >
                <h3 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-black'} mb-2`}>
                  Khalid Bellaj
                </h3>
                <p className={`text-sm ${isDark ? 'text-blue-400' : 'text-blue-600'} mb-3`}>
                  Quantitative Analyst
                </p>
                <a
                  href="mailto:Khalid.Bellaj@xsigma.co.uk"
                  className={`text-sm ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'} transition-colors`}
                >
                  Khalid.Bellaj@xsigma.co.uk
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
