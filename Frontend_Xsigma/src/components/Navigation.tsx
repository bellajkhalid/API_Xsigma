import { useState, useEffect } from "react";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { getThemeClasses, isDark } = useTheme();
  const theme = getThemeClasses();

  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'cta') {
      const ctaSection = document.querySelector('.button-gradient');
      if (ctaSection) {
        const yOffset = -100;
        const y = ctaSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Search functionality
  const searchSections = {
    'browse solutions': 'solutions',
    'solutions': 'solutions',
    'features': 'features',
    'pricing': 'pricing',
    'about': 'about',
    'contact': 'contact',
    'hero': 'hero',
    'cta': 'cta',
    'testimonials': 'testimonials',
    'blog': 'blog',
    'careers': 'careers',
    'jobs': 'careers',
    'download': 'download',
    'docs': 'docs',
    'documentation': 'docs'
  };

  const handleSearch = (query: string) => {
    const lowerQuery = query.toLowerCase().trim();
    const sectionId = searchSections[lowerQuery as keyof typeof searchSections];

    if (sectionId) {
      // Handle navigation to different pages
      if (sectionId === 'blog') {
        navigate('/blog');
      } else if (sectionId === 'careers') {
        navigate('/careers');
      } else {
        scrollToSection(sectionId);
      }
      setIsSearchOpen(false);
      setSearchQuery("");
    } else {
      // If no exact match, try partial matches
      const partialMatch = Object.keys(searchSections).find(key =>
        key.includes(lowerQuery) || lowerQuery.includes(key)
      );

      if (partialMatch) {
        const sectionId = searchSections[partialMatch as keyof typeof searchSections];
        if (sectionId === 'blog') {
          navigate('/blog');
        } else if (sectionId === 'careers') {
          navigate('/careers');
        } else {
          scrollToSection(sectionId);
        }
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    }
  };

  const navItems = [
    {
      name: "Solutions",
      href: "#",
      onClick: () => {},
      hasDropdown: true,
      dropdownSections: [
        {
          title: "Data",
          description: "Discover, organize, manage, and analyze data on the cloud.",
          items: [
            { name: "Curated Data", icon: "📊", href: "/solutions/data" },
            { name: "Data Analytics", icon: "📈", href: "/solutions/analytics" }
          ]
        },
        {
          title: "Analytics",
          description: "Rapidly create custom data and risk analytics solutions spanning global markets.",
          items: [
            { name: "PlotTool Pro", icon: "📊", href: "/solutions/plottool" },
            { name: "Portfolio Analytics", icon: "💼", href: "/solutions/portfolio" },
            { name: "GS Quant", icon: "🔬", href: "/solutions/quant" }
          ]
        },
        {
          title: "Banking",
          description: "Embed business and digital analytix products within your own experience.",
          items: [
            { name: "Transaction Banking", icon: "🏦", href: "/solutions/banking" },
            { name: "GS DAP®", icon: "💳", href: "/solutions/dap" }
          ]
        }
      ]
    },
    {
      name: "Download",
      href: "#",
      onClick: () => {},
      hasDropdown: true,
      dropdownSections: [
        {
          title: "Software & Tools",
          description: "Download XSigma packages, libraries, and development tools",
          items: [
            { name: "Python Package (PyPI)", icon: "🐍", href: "https://pypi.org/project/xsigma/", external: true },
            { name: "C++ Libraries", icon: "⚡", href: "/downloads/cpp-libraries" },
            { name: "API Documentation", icon: "📚", href: "/sphinx-doc/xsigma-1.1-3/index.html", external: true },
            { name: "Installation Guide", icon: "🔧", href: "/downloads/installation-guide" }
          ]
        },
        {
          title: "Research & Publications",
          description: "Access academic papers, research publications, and technical documentation",
          items: [
            { name: "Coherent Market Simulations Paper", icon: "📄", href: "https://www.researchgate.net/publication/227624010_Coherent_global_market_simulations_and_securitization_measures_for_counterparty_credit_risk", external: true },
            { name: "Technical White Papers", icon: "📋", href: "/downloads/white-papers" },
            { name: "Research Publications", icon: "🎓", href: "/downloads/publications" },
            { name: "Case Studies", icon: "📊", href: "/downloads/case-studies" }
          ]
        },
        {
          title: "Documentation & Guides",
          description: "Comprehensive guides, tutorials, and reference materials",
          items: [
            { name: "User Manual", icon: "📖", href: "/downloads/user-manual" },
            { name: "Developer Guide", icon: "👨‍💻", href: "/downloads/developer-guide" },
            { name: "API Reference", icon: "🔗", href: "/sphinx-doc/xsigma-1.1-3/index.html", external: true },
            { name: "Tutorial Videos", icon: "🎥", href: "/downloads/tutorials" }
          ]
        }
      ]
    },
    { name: "Docs", href: "/sphinx-doc/xsigma-1.1-3/index.html", onClick: () => window.open('/sphinx-doc/xsigma-1.1-3/index.html', '_blank') },
    { name: "Blog", href: "/blog", onClick: () => window.location.href = '/blog' },
    { name: "Careers", href: "/careers", onClick: () => navigate('/careers') },
    { name: "LinkedIn", href: "/linkedin", onClick: () => navigate('/linkedin') },
    { name: "Account", href: "/account", onClick: () => navigate('/account') },
  ];

  return (
    <header
      className={`fixed top-3.5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 rounded-full ${
        isScrolled
          ? `h-14 ${isDark ? 'bg-black border-gray-700' : theme.navBg} backdrop-blur-xl border ${theme.borderColor} scale-95 w-[90%] max-w-2xl`
          : `h-14 ${isDark ? 'bg-black' : theme.navBg} w-[95%] max-w-3xl`
      }`}
    >
      <div className="mx-auto h-full px-6">
        <nav className="flex items-center justify-between h-full">
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <motion.img
              src="/X_logo.ico"
              alt="XSigma Logo"
              className="w-6 h-6 drop-shadow-lg"
              whileHover={{ rotate: 5 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            <span className={`font-bold text-base ${isDark ? 'text-white' : 'text-black'} transition-all duration-300 hover:text-blue-600 hover:scale-105`}>
              XsigmaSolution
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <motion.button
                      className={`text-sm ${isDark ? 'text-white hover:text-blue-400' : 'text-black hover:text-blue-600'} transition-all duration-300 relative group cursor-pointer flex items-center gap-1`}
                      whileHover={{ scale: 1.05, y: -1 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <span className="relative z-10 transition-colors duration-300">
                        {item.name}
                      </span>
                      <ChevronDown className="w-3 h-3 transition-transform duration-200" />

                    </motion.button>

                    {/* Goldman Sachs Style Dropdown */}
                    {activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute top-full mt-2 w-screen max-w-4xl ${isDark ? 'bg-gray-900' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-2xl rounded-lg overflow-hidden z-50`}
                        style={{
                          left: '50%',
                          transform: 'translateX(-50%)',
                          marginLeft: '-50vw',
                          width: '100vw',
                          maxWidth: '1024px'
                        }}
                      >
                        <div className="p-6">
                          <div className="flex justify-between items-center mb-6">
                            <span className={`text-sm ${theme.textMuted}`}>View Solutions</span>
                          </div>
                          <div className="grid grid-cols-3 gap-8">
                            {item.dropdownSections?.map((section) => (
                              <div key={section.title} className="space-y-4">
                                <div>
                                  <h3 className={`text-lg font-semibold ${theme.text} mb-2`}>{section.title}</h3>
                                  <p className={`text-sm ${theme.textMuted} mb-4`}>{section.description}</p>
                                </div>
                                <div className="space-y-3">
                                  <div className={`text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>FEATURED</div>
                                  {section.items.map((subItem) => (
                                    <div
                                      key={subItem.name}
                                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                                      onClick={() => {
                                        if ((subItem as any).external) {
                                          window.open(subItem.href, '_blank');
                                        } else {
                                          navigate(subItem.href);
                                        }
                                      }}
                                    >
                                      <span className="text-lg">{subItem.icon}</span>
                                      <span className={`text-sm font-medium ${theme.text}`}>{subItem.name}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <motion.a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      if (item.onClick) {
                        item.onClick();
                      }
                    }}
                    className={`text-sm ${isDark ? 'text-white hover:text-blue-400' : 'text-black hover:text-blue-600'} transition-all duration-300 relative group cursor-pointer`}
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <span className="relative z-10 transition-colors duration-300">
                      {item.name}
                    </span>

                  </motion.a>
                )}
              </div>
            ))}
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Button
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                }}
                size="sm"
                variant="outline"
                className={`${isDark ? 'border-white text-white hover:bg-white hover:text-black' : 'border-black text-black hover:bg-black hover:text-white'} transition-all duration-300 relative overflow-hidden group`}
              >
                <span className="relative z-10">🔍</span>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className={`${theme.buttonOutline}`}>
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className={theme.background}>
                <div className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <div key={item.name}>
                      {item.hasDropdown ? (
                        <div className="space-y-2">
                          <div className={`text-lg font-semibold ${theme.text} mb-3`}>
                            {item.name}
                          </div>
                          {item.dropdownSections?.map((section) => (
                            <div key={section.title} className="ml-4 space-y-2">
                              <div className={`text-sm font-medium ${theme.textMuted} uppercase tracking-wider`}>
                                {section.title}
                              </div>
                              {section.items.map((subItem) => (
                                <div
                                  key={subItem.name}
                                  className={`text-sm ${theme.textMuted} hover:text-primary transition-colors cursor-pointer ml-2 flex items-center gap-2`}
                                  onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    if ((subItem as any).external) {
                                      window.open(subItem.href, '_blank');
                                    } else {
                                      navigate(subItem.href);
                                    }
                                  }}
                                >
                                  <span>{subItem.icon}</span>
                                  <span>{subItem.name}</span>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <a
                          href={item.href}
                          className={`text-lg ${theme.textMuted} hover:text-primary transition-colors`}
                          onClick={(e) => {
                            e.preventDefault();
                            setIsMobileMenuOpen(false);
                            if (item.onClick) {
                              item.onClick();
                            }
                          }}
                        >
                          {item.name}
                        </a>
                      )}
                    </div>
                  ))}
                  <Button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      window.open('/sphinx-doc/xsigma-1.1-3/index.html', '_blank');
                    }}
                    className="button-gradient mt-4"
                  >
                    Get Started
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>

      {/* Search Bar */}
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className={`absolute top-full left-0 right-0 mt-2 ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg shadow-lg p-4`}
        >
          <div className="flex items-center gap-3">
            <span className="text-lg">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch(searchQuery);
                }
              }}
              placeholder="Search sections (e.g., 'Browse Solutions', 'Features', 'Pricing'...)"
              className={`flex-1 px-3 py-2 rounded-md border ${isDark ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-black placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              autoFocus
            />
            <Button
              onClick={() => handleSearch(searchQuery)}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Search
            </Button>
            <Button
              onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery("");
              }}
              size="sm"
              variant="outline"
              className={`${isDark ? 'border-gray-600 text-gray-400 hover:bg-gray-800' : 'border-gray-300 text-gray-600 hover:bg-gray-100'}`}
            >
              ✕
            </Button>
          </div>
          <div className={`mt-3 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Try searching: "Browse Solutions", "Features", "Pricing", "About", "Contact", "Blog", "Docs"
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navigation;