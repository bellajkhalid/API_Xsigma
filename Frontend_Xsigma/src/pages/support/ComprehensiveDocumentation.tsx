import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Code, 
  BookOpen, 
  Zap, 
  CheckCircle, 
  ExternalLink, 
  FileText, 
  Globe,
  Calculator,
  TrendingUp,
  BarChart3,
  Activity,
  Target,
  Settings,
  Play,
  Download,
  Users,
  Shield,
  Award,
  Layers,
  Database,
  GitBranch,
  Cpu,
  LineChart,
  PieChart,
  Building,
  Briefcase,
  GraduationCap,
  Search,
  Filter,
  ChevronRight,
  Clock,
  Star,
  Bookmark
} from 'lucide-react';

// TypeScript interfaces for documentation structure
interface DocumentationSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'foundation' | 'implementation' | 'advanced' | 'enterprise';
  subsections: DocumentationSubsection[];
  estimatedReadTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  audience: string[];
}

interface DocumentationSubsection {
  id: string;
  title: string;
  description: string;
  sphinxPath?: string;
  isNew?: boolean;
  isPopular?: boolean;
}

interface QuickStartGuide {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  steps: string[];
  codeExample: string;
  language: string;
}

const ComprehensiveDocumentation: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Professional documentation sections aligned with original Sphinx structure
  const documentationSections: DocumentationSection[] = [
    {
      id: 'about-xsigma',
      title: 'About XSigma Enhanced AAD',
      description: 'Introduction to XSigma technology, Enhanced AAD framework, and quantitative finance applications',
      icon: <BookOpen className="w-6 h-6" />,
      category: 'foundation',
      estimatedReadTime: '10 min',
      difficulty: 'Beginner',
      audience: ['All Users', 'Decision Makers', 'New Users'],
      subsections: [
        {
          id: 'technology-overview',
          title: 'Technology Overview',
          description: 'Understanding Enhanced AAD and its advantages',
          sphinxPath: '/sphinx-doc/xsigma-1.1-3/about.html'
        },
        {
          id: 'business-value',
          title: 'Business Value Proposition',
          description: '10x faster calculations and machine precision benefits'
        },
        {
          id: 'use-cases',
          title: 'Institutional Use Cases',
          description: 'Real-world applications in tier-1 banks',
          isPopular: true
        },
        {
          id: 'competitive-advantage',
          title: 'Competitive Advantage',
          description: 'How Enhanced AAD outperforms traditional methods'
        }
      ]
    },
    {
      id: 'getting-started',
      title: 'Getting Started',
      description: 'Essential guide for implementing XSigma Enhanced AAD technology in institutional environments',
      icon: <Zap className="w-6 h-6" />,
      category: 'foundation',
      estimatedReadTime: '20 min',
      difficulty: 'Beginner',
      audience: ['Quantitative Analysts', 'Developers', 'IT Teams'],
      subsections: [
        {
          id: 'installation',
          title: 'Installation & Setup',
          description: 'Enterprise installation guide for production environments',
          sphinxPath: '/sphinx-doc/xsigma-1.1-3/getting_started/index.html',
          isPopular: true
        },
        {
          id: 'python-quickstart',
          title: 'Python Quick Start',
          description: 'Get started with Python SDK',
          sphinxPath: '/sphinx-doc/xsigma-1.1-3/getting_started/using_python.html'
        },
        {
          id: 'cpp-quickstart',
          title: 'C++ Quick Start',
          description: 'High-performance C++ implementation',
          sphinxPath: '/sphinx-doc/xsigma-1.1-3/getting_started/using_cpp.html'
        },
        {
          id: 'first-calculation',
          title: 'Your First Calculation',
          description: 'Step-by-step guide to your first Enhanced AAD calculation'
        }
      ]
    },
    {
      id: 'market-models',
      title: 'Market Models & Frameworks',
      description: 'Comprehensive guide to XSigma market models for quantitative finance',
      icon: <LineChart className="w-6 h-6" />,
      category: 'implementation',
      estimatedReadTime: '45 min',
      difficulty: 'Advanced',
      audience: ['Quantitative Analysts', 'Model Validators', 'Risk Managers'],
      subsections: [
        {
          id: 'market-overview',
          title: 'Market Models Overview',
          description: 'Introduction to XSigma market modeling framework',
          sphinxPath: '/sphinx-doc/xsigma-1.1-3/market/index.html',
          isPopular: true
        },
        {
          id: 'sabr-gsabr',
          title: 'SABR/GSABR Models',
          description: 'Interest rate volatility modeling with Enhanced AAD',
          sphinxPath: '/sphinx-doc/xsigma-1.1-3/market/SABR/index.html'
        },
        {
          id: 'asv-model',
          title: 'Analytical Sigma Volatility (ASV)',
          description: 'Advanced volatility modeling with analytical solutions',
          sphinxPath: '/sphinx-doc/xsigma-1.1-3/market/ASV/index.html'
        },
        {
          id: 'curve-construction',
          title: 'Curve Construction Framework',
          description: 'Multi-curve bootstrapping and risk framework',
          sphinxPath: '/sphinx-doc/xsigma-1.1-3/market/Curve%20Construction/index.html'
        },
        {
          id: 'lsv-models',
          title: 'Local Stochastic Volatility',
          description: 'LSV models with PDE and Monte Carlo implementations',
          sphinxPath: '/sphinx-doc/xsigma-1.1-3/market/LSV/index.html'
        },
        {
          id: 'fx-volatility',
          title: 'FX Volatility Surfaces',
          description: 'FX analytic volatility surface construction',
          sphinxPath: '/sphinx-doc/xsigma-1.1-3/market/FX%20Analytic%20Volatility%20Surfaces/index.html'
        }
      ]
    },
    {
      id: 'learning-resources',
      title: 'Learning & Training',
      description: 'Educational resources, tutorials, and training materials for XSigma Enhanced AAD',
      icon: <GraduationCap className="w-6 h-6" />,
      category: 'foundation',
      estimatedReadTime: '25 min',
      difficulty: 'Beginner',
      audience: ['New Users', 'Students', 'Training Teams'],
      subsections: [
        {
          id: 'tutorials',
          title: 'Interactive Tutorials',
          description: 'Step-by-step learning modules',
          isNew: true
        },
        {
          id: 'video-library',
          title: 'Video Library',
          description: 'Comprehensive video training series'
        },
        {
          id: 'certification',
          title: 'Professional Certification',
          description: 'XSigma Enhanced AAD certification program',
          isPopular: true
        },
        {
          id: 'best-practices',
          title: 'Best Practices Guide',
          description: 'Industry best practices and recommendations'
        }
      ]
    },
    {
      id: 'advanced-topics',
      title: 'Advanced Topics',
      description: 'Advanced features, customization, and optimization techniques for expert users',
      icon: <Cpu className="w-6 h-6" />,
      category: 'advanced',
      estimatedReadTime: '90 min',
      difficulty: 'Expert',
      audience: ['Senior Developers', 'Quantitative Researchers', 'Performance Engineers'],
      subsections: [
        {
          id: 'custom-models',
          title: 'Custom Model Development',
          description: 'Building custom models with Enhanced AAD framework'
        },
        {
          id: 'performance-optimization',
          title: 'Performance Optimization',
          description: 'Advanced optimization techniques and GPU acceleration'
        },
        {
          id: 'parallel-processing',
          title: 'Parallel Processing & SMP Tools',
          description: 'Multi-threading and distributed computing patterns',
          sphinxPath: '/sphinx-doc/xsigma-1.1-3/design_documents/smptools.html',
          isPopular: true
        },
        {
          id: 'memory-management',
          title: 'Memory Management',
          description: 'Efficient memory usage for large-scale calculations'
        }
      ]
    },
    {
      id: 'design-documents',
      title: 'Design Documents & Architecture',
      description: 'Technical design documents, architecture patterns, and system specifications',
      icon: <Settings className="w-6 h-6" />,
      category: 'advanced',
      estimatedReadTime: '60 min',
      difficulty: 'Expert',
      audience: ['System Architects', 'Senior Developers', 'Technical Leads'],
      subsections: [
        {
          id: 'system-architecture',
          title: 'System Architecture Overview',
          description: 'High-level system design and architecture patterns'
        },
        {
          id: 'aad-framework',
          title: 'Enhanced AAD Framework Design',
          description: 'Technical design of the Enhanced AAD framework'
        },
        {
          id: 'api-design',
          title: 'API Design Principles',
          description: 'RESTful API design patterns and conventions'
        },
        {
          id: 'security-architecture',
          title: 'Security Architecture',
          description: 'Security design patterns and implementation'
        }
      ]
    },
    {
      id: 'developers-guide',
      title: 'Developer\'s Guide',
      description: 'Comprehensive guide for developers integrating XSigma Enhanced AAD',
      icon: <Code className="w-6 h-6" />,
      category: 'implementation',
      estimatedReadTime: '45 min',
      difficulty: 'Intermediate',
      audience: ['Developers', 'System Integrators', 'DevOps Teams'],
      subsections: [
        {
          id: 'api-reference-link',
          title: 'Interactive API Reference',
          description: 'Complete API documentation with live examples and code snippets'
        },
        {
          id: 'sdk-documentation',
          title: 'SDK Documentation',
          description: 'Language-specific SDK guides and examples',
          sphinxPath: '/sphinx-doc/xsigma-1.1-3/api/index.html',
          isPopular: true
        },
        {
          id: 'integration-patterns',
          title: 'Integration Patterns',
          description: 'Common integration patterns and best practices'
        },
        {
          id: 'testing-debugging',
          title: 'Testing & Debugging',
          description: 'Testing strategies and debugging techniques'
        }
      ]
    },
    {
      id: 'resources-support',
      title: 'Resources & Support',
      description: 'Additional resources, support channels, and community information',
      icon: <Briefcase className="w-6 h-6" />,
      category: 'enterprise',
      estimatedReadTime: '15 min',
      difficulty: 'Beginner',
      audience: ['All Users', 'Support Teams', 'Management'],
      subsections: [
        {
          id: 'support-channels',
          title: 'Support Channels',
          description: 'How to get help and technical support'
        },
        {
          id: 'community-forum',
          title: 'Community Forum',
          description: 'Connect with other XSigma users and experts'
        },
        {
          id: 'white-papers',
          title: 'White Papers & Research',
          description: 'Technical research and methodology papers'
        },
        {
          id: 'case-studies',
          title: 'Case Studies',
          description: 'Real-world implementation examples and success stories'
        }
      ]
    },
    {
      id: 'release-details',
      title: 'Release Details & Updates',
      description: 'Version history, release notes, and update information',
      icon: <GitBranch className="w-6 h-6" />,
      category: 'enterprise',
      estimatedReadTime: '10 min',
      difficulty: 'Beginner',
      audience: ['All Users', 'IT Teams', 'Project Managers'],
      subsections: [
        {
          id: 'current-release',
          title: 'Current Release (v2.1.0)',
          description: 'Latest version features and improvements',
          isNew: true
        },
        {
          id: 'release-history',
          title: 'Release History',
          description: 'Complete version history and changelog'
        },
        {
          id: 'upgrade-guide',
          title: 'Upgrade Guide',
          description: 'How to upgrade from previous versions'
        },
        {
          id: 'roadmap',
          title: 'Product Roadmap',
          description: 'Upcoming features and development plans'
        }
      ]
    }
  ];

  // Quick start guides for different user types
  const quickStartGuides: QuickStartGuide[] = [
    {
      id: 'quant-analyst',
      title: 'For Quantitative Analysts',
      description: 'Get started with market model calibration and risk calculations',
      icon: <Calculator className="w-8 h-8" />,
      steps: [
        'Install XSigma Python SDK',
        'Configure API credentials',
        'Load market data',
        'Calibrate SABR model',
        'Calculate CVA with Enhanced AAD'
      ],
      codeExample: `import xsigma

# Initialize Enhanced AAD client
client = xsigma.Client(api_key="your_key", enhanced_aad=True)

# Load market data
market_data = client.market.get_data("EUR/USD", 
    date_range={"start": "2024-01-01", "end": "2024-01-31"})

# Calibrate SABR model
sabr_model = client.models.sabr.calibrate(
    market_data=market_data,
    enhanced_aad=True
)

# Calculate CVA
cva_result = client.risk.calculate_cva(
    portfolio_id="portfolio_123",
    model=sabr_model,
    enhanced_aad=True
)

print(f"CVA: {cva_result.cva_value}")`,
      language: 'python'
    },
    {
      id: 'developer',
      title: 'For Developers',
      description: 'Integrate XSigma APIs into your applications',
      icon: <Code className="w-8 h-8" />,
      steps: [
        'Set up development environment',
        'Install SDK for your language',
        'Configure authentication',
        'Make your first API call',
        'Handle responses and errors'
      ],
      codeExample: `// JavaScript/Node.js example
const XSigma = require('xsigma-sdk');

const client = new XSigma.Client({
  apiKey: process.env.XSIGMA_API_KEY,
  enhancedAAD: true
});

async function calculateGreeks() {
  try {
    const greeks = await client.derivatives.calculateGreeks({
      instrumentId: 'option_789',
      greeks: ['delta', 'gamma', 'vega'],
      enhancedAAD: true
    });
    
    console.log('Greeks calculated:', greeks);
    return greeks;
  } catch (error) {
    console.error('Error calculating Greeks:', error);
    throw error;
  }
}`,
      language: 'javascript'
    },
    {
      id: 'risk-manager',
      title: 'For Risk Managers',
      description: 'Implement risk monitoring and validation frameworks',
      icon: <Shield className="w-8 h-8" />,
      steps: [
        'Set up risk monitoring dashboard',
        'Configure model validation tests',
        'Implement backtesting framework',
        'Set up alerting and reporting',
        'Validate regulatory compliance'
      ],
      codeExample: `# R example for risk management
library(xsigma)

# Initialize client
client <- xsigma_client(api_key = Sys.getenv("XSIGMA_API_KEY"))

# Portfolio risk calculation
portfolio_risk <- calculate_portfolio_risk(client,
  portfolio_id = "institutional_portfolio",
  risk_measures = c("VaR", "CVA", "DVA", "FVA"),
  confidence_levels = c(0.95, 0.99),
  enhanced_aad = TRUE
)

# Generate risk report
risk_report <- generate_risk_report(portfolio_risk,
  format = "regulatory",
  include_backtesting = TRUE
)

print(paste("Portfolio VaR (99%):", 
  scales::dollar(portfolio_risk$var_99)))`,
      language: 'r'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Sections', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'foundation', name: 'Foundation', icon: <Zap className="w-4 h-4" /> },
    { id: 'implementation', name: 'Implementation', icon: <Code className="w-4 h-4" /> },
    { id: 'advanced', name: 'Advanced', icon: <Cpu className="w-4 h-4" /> },
    { id: 'enterprise', name: 'Enterprise', icon: <Building className="w-4 h-4" /> }
  ];

  const filteredSections = documentationSections.filter(section => {
    const matchesCategory = selectedCategory === 'all' || section.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.subsections.some(sub => 
        sub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Helmet>
        <title>XSigma Enhanced AAD Documentation - Comprehensive Guide for Quantitative Finance</title>
        <meta name="description" content="Complete XSigma Enhanced AAD documentation for institutional clients. Market models, API reference, risk management, and enterprise deployment guides." />
        <meta name="keywords" content="XSigma documentation, Enhanced AAD, quantitative finance, market models, API reference, risk management, enterprise deployment" />
        <link rel="canonical" href="https://xsigma.co.uk/support/documentation" />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Breadcrumb Navigation */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <a href="/" className="text-gray-500 hover:text-xsigma-navy transition-colors">Home</a>
              <span className="text-gray-400">/</span>
              <a href="/support" className="text-gray-500 hover:text-xsigma-navy transition-colors">Support</a>
              <span className="text-gray-400">/</span>
              <span className="text-xsigma-navy font-semibold">Documentation</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-xsigma-navy via-xsigma-navy to-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Enhanced AAD Documentation
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto mb-8">
                Comprehensive documentation for XSigma Enhanced AAD technology. 
                From getting started to advanced implementation for tier-1 financial institutions.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="#quick-start"
                  className="inline-flex items-center px-8 py-4 bg-xsigma-teal hover:bg-xsigma-teal/90 text-white font-semibold rounded-lg transition-colors duration-300"
                >
                  <Play className="mr-2 w-5 h-5" />
                  Quick Start Guide
                </a>
                <a
                  href="/support/api-reference"
                  className="inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors duration-300"
                >
                  <Code className="mr-2 w-5 h-5" />
                  API Reference
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Start Guides */}
        <section id="quick-start" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-xsigma-navy mb-4">Quick Start Guides</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get started quickly with role-specific guides tailored for your needs
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {quickStartGuides.map((guide, index) => (
                <motion.div
                  key={guide.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center mb-6">
                    <div className="bg-xsigma-teal/10 p-3 rounded-lg mr-4">
                      <div className="text-xsigma-teal">{guide.icon}</div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-xsigma-navy">{guide.title}</h3>
                      <p className="text-gray-600 text-sm">{guide.description}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-xsigma-navy mb-3">Steps:</h4>
                    <ol className="space-y-2">
                      {guide.steps.map((step, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-600">
                          <span className="bg-xsigma-teal text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            {idx + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="bg-gray-900 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400 uppercase tracking-wider">
                        {guide.language}
                      </span>
                    </div>
                    <pre className="text-xs text-gray-300 overflow-x-auto">
                      <code>{guide.codeExample}</code>
                    </pre>
                  </div>

                  <button className="w-full bg-xsigma-navy hover:bg-xsigma-navy/90 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300">
                    Start Guide
                    <ArrowRight className="ml-2 w-4 h-4 inline" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-xsigma-teal focus:border-transparent"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-xsigma-navy text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <div className={selectedCategory === category.id ? 'text-xsigma-teal' : 'text-gray-500'}>
                      {category.icon}
                    </div>
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Documentation Sections */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="space-y-8"
            >
              {filteredSections.map((section, index) => (
                <motion.div
                  key={section.id}
                  variants={fadeInUp}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-xsigma-teal/10 p-3 rounded-lg">
                          <div className="text-xsigma-teal">{section.icon}</div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-2xl font-bold text-xsigma-navy">{section.title}</h3>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              section.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                              section.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                              section.difficulty === 'Advanced' ? 'bg-orange-100 text-orange-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {section.difficulty}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-4">{section.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {section.estimatedReadTime}
                            </div>
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {section.audience.join(', ')}
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedSection(selectedSection === section.id ? null : section.id)}
                        className="text-gray-400 hover:text-xsigma-navy transition-colors"
                      >
                        <ChevronRight className={`w-5 h-5 transform transition-transform ${
                          selectedSection === section.id ? 'rotate-90' : ''
                        }`} />
                      </button>
                    </div>

                    {selectedSection === section.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-gray-200 pt-6"
                      >
                        <div className="grid md:grid-cols-2 gap-4">
                          {section.subsections.map((subsection, idx) => (
                            <div
                              key={subsection.id}
                              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                              onClick={() => {
                                if (subsection.id === 'api-reference-link') {
                                  // Navigate to the dedicated API Reference page
                                  window.location.href = '/support/api-reference';
                                } else if (subsection.sphinxPath) {
                                  window.open(subsection.sphinxPath, '_blank');
                                }
                              }}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-xsigma-navy">{subsection.title}</h4>
                                <div className="flex items-center space-x-2">
                                  {subsection.isNew && (
                                    <span className="bg-xsigma-teal text-white text-xs px-2 py-1 rounded-full">
                                      New
                                    </span>
                                  )}
                                  {subsection.isPopular && (
                                    <Star className="w-4 h-4 text-yellow-500" />
                                  )}
                                  {subsection.sphinxPath && (
                                    <ExternalLink className="w-4 h-4 text-gray-400" />
                                  )}
                                </div>
                              </div>
                              <p className="text-sm text-gray-600">{subsection.description}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Additional Resources */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-xsigma-navy mb-4">Additional Resources</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore additional resources to maximize your XSigma Enhanced AAD implementation
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Interactive API Reference',
                  description: 'Complete API documentation with live examples',
                  icon: <Code className="w-6 h-6" />,
                  href: '/support/api-reference',
                  badge: 'Popular'
                },
                {
                  title: 'Original Sphinx Documentation',
                  description: 'Complete technical documentation (legacy format)',
                  icon: <BookOpen className="w-6 h-6" />,
                  href: '/sphinx-doc/xsigma-1.1-3/index.html',
                  badge: 'Technical'
                },
                {
                  title: 'Training Program',
                  description: 'Professional certification and training',
                  icon: <GraduationCap className="w-6 h-6" />,
                  href: '/support/training',
                  badge: 'Popular'
                },
                {
                  title: 'Developer Portal',
                  description: 'Tools and resources for developers',
                  icon: <Users className="w-6 h-6" />,
                  href: '/support/developers',
                  badge: null
                },
                {
                  title: 'Community Forum',
                  description: 'Connect with other XSigma users',
                  icon: <Users className="w-6 h-6" />,
                  href: '/support/community',
                  badge: null
                },
                {
                  title: 'Release Notes',
                  description: 'Latest updates and version history',
                  icon: <GitBranch className="w-6 h-6" />,
                  href: '/support/releases',
                  badge: null
                },
                {
                  title: 'Professional Services',
                  description: 'Expert consulting and implementation support',
                  icon: <Briefcase className="w-6 h-6" />,
                  href: '/support/professional',
                  badge: 'Enterprise'
                },
                {
                  title: 'Technical Support',
                  description: 'Get help from our technical support team',
                  icon: <Shield className="w-6 h-6" />,
                  href: '/support/technical',
                  badge: null
                }
              ].map((resource, index) => (
                <motion.a
                  key={index}
                  href={resource.href}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="block p-6 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors duration-300 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-xsigma-teal/10 p-3 rounded-lg group-hover:bg-xsigma-teal/20 transition-colors">
                      <div className="text-xsigma-teal">{resource.icon}</div>
                    </div>
                    {resource.badge && (
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        resource.badge === 'New' ? 'bg-xsigma-teal text-white' :
                        resource.badge === 'Popular' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-200 text-gray-600'
                      }`}>
                        {resource.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-xsigma-navy mb-2 group-hover:text-xsigma-teal transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{resource.description}</p>
                </motion.a>
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
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Join leading financial institutions using XSigma Enhanced AAD for faster,
                more accurate quantitative finance calculations.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="/support/api-reference"
                  className="inline-flex items-center px-8 py-4 bg-xsigma-teal hover:bg-xsigma-teal/90 text-white font-semibold rounded-lg transition-colors duration-300"
                >
                  <Code className="mr-2 w-5 h-5" />
                  Explore API Reference
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors duration-300"
                >
                  <Users className="mr-2 w-5 h-5" />
                  Contact Sales Team
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ComprehensiveDocumentation;
