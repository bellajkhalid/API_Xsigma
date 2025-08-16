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
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const { getThemeClasses, isDark, toggleTheme } = useTheme();
  const theme = getThemeClasses();
  const navigate = useNavigate();

  // Hover timeout functions for smooth dropdown interaction
  const handleMouseEnter = (itemName: string) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setActiveDropdown(itemName);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 250); // 250ms delay before closing
    setHoverTimeout(timeout);
  };

  const handleDropdownMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  const handleDropdownMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 250); // 250ms delay before closing
    setHoverTimeout(timeout);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'cta') {
      const ctaSection = document.getElementById('cta');
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

  const handleSearch = (query: string) => {
    if (!query.trim()) return;

    const searchMappings: { [key: string]: string } = {
      'browse solutions': 'solutions',
      'solutions': 'solutions',
      'features': 'features',
      'pricing': 'pricing',
      'about': 'about',
      'contact': 'cta',
      'blog': 'blog',
      'docs': 'docs'
    };

    const normalizedQuery = query.toLowerCase().trim();
    const targetSection = searchMappings[normalizedQuery];

    if (targetSection) {
      setIsSearchOpen(false);
      setSearchQuery("");
      scrollToSection(targetSection);
    } else {
      // If no direct match, try partial matching
      const partialMatch = Object.keys(searchMappings).find(key =>
        key.includes(normalizedQuery) || normalizedQuery.includes(key)
      );

      if (partialMatch) {
        setIsSearchOpen(false);
        setSearchQuery("");
        scrollToSection(searchMappings[partialMatch]);
      }
    }
  };

  // Primary navigation items (main content-focused)
  const primaryNavItems = [
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
    { name: "Blog", href: "/blog", onClick: () => window.location.href = '/blog' }
  ];

  // User menu items
  const userMenuItems = [
    { name: "Account", icon: "👤", href: "/account", onClick: () => navigate('/account') },
    { name: "Settings", icon: "⚙️", href: "/settings", onClick: () => navigate('/settings') },
    { name: "Sign Out", icon: "🚪", href: "/logout", onClick: () => navigate('/logout') }
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        {/* Single Navigation Bar */}
      <header className={`w-full ${isDark ? 'bg-black/70' : 'bg-white/70'} border-b ${isDark ? 'border-gray-800' : 'border-gray-200'} backdrop-blur-xl`}>
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center justify-between h-16">
            {/* Left Section: Menu + Logo + Navigation */}
            <div className="flex items-center gap-8">
              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className={`${theme.buttonOutline}`}>
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent className={theme.background}>
                    <div className="flex flex-col gap-6 mt-8">
                      {/* Primary Navigation */}
                      <div className="space-y-4">
                        <div className={`text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>
                          Main Navigation
                        </div>
                        {primaryNavItems.map((item) => (
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
                      </div>

                      {/* Secondary Navigation */}
                      <div className="space-y-4">
                        <div className={`text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>
                          Company & Social
                        </div>
                        <a
                          href="/careers"
                          className={`text-lg ${theme.textMuted} hover:text-primary transition-colors block`}
                          onClick={(e) => {
                            e.preventDefault();
                            setIsMobileMenuOpen(false);
                            navigate('/careers');
                          }}
                        >
                          Careers
                        </a>
                        <a
                          href="/linkedin"
                          className={`text-lg ${theme.textMuted} hover:text-primary transition-colors block`}
                          onClick={(e) => {
                            e.preventDefault();
                            setIsMobileMenuOpen(false);
                            navigate('/linkedin');
                          }}
                        >
                          LinkedIn
                        </a>
                      </div>

                      {/* User Menu */}
                      <div className="space-y-4">
                        <div className={`text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>
                          Account
                        </div>
                        {userMenuItems.map((item) => (
                          <div
                            key={item.name}
                            className={`flex items-center gap-3 text-lg ${theme.textMuted} hover:text-primary transition-colors cursor-pointer`}
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              if (item.onClick) {
                                item.onClick();
                              }
                            }}
                          >
                            <span className="text-sm">{item.icon}</span>
                            <span>{item.name}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <Button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          navigate('/contact');
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 text-black w-full font-medium mt-6"
                      >
                        Contact sales
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Logo */}
              <motion.div
                className="flex items-center gap-2 cursor-pointer flex-shrink-0"
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
                <span className={`font-bold text-lg ${isDark ? 'text-white' : 'text-black'} transition-all duration-300 hover:text-blue-600 hover:scale-105 whitespace-nowrap`}>
                  XSIGMA
                </span>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-8">
                {/* Solutions (dropdown) */}
                <div className="relative">
                  <div
                    onMouseEnter={() => handleMouseEnter('Solutions')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <motion.button
                      className={`text-sm font-medium ${isDark ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'} transition-all duration-300 flex items-center gap-1`}
                      whileHover={{ scale: 1.05, y: -1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Solutions
                      <ChevronDown className="w-3 h-3" />
                    </motion.button>

                    {/* Solution Dropdown */}
                    {activeDropdown === 'Solutions' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute top-full mt-2 w-96 ${isDark ? 'bg-gray-900/80' : 'bg-white/80'} border ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-xl rounded-lg overflow-hidden z-50 backdrop-blur-md`}
                        onMouseEnter={handleDropdownMouseEnter}
                        onMouseLeave={handleDropdownMouseLeave}
                      >
                        <div className="p-6">
                          {primaryNavItems[0]?.dropdownSections?.map((section) => (
                            <div key={section.title} className="mb-4">
                              <h3 className={`text-sm font-semibold ${theme.text} mb-2`}>{section.title}</h3>
                              {section.items.map((item) => (
                                <div
                                  key={item.name}
                                  className={`flex items-center gap-3 p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer`}
                                  onClick={() => {
                                    setActiveDropdown(null);
                                    if ((item as any).external) {
                                      window.open(item.href, '_blank');
                                    } else {
                                      navigate(item.href);
                                    }
                                  }}
                                >
                                  <span>{item.icon}</span>
                                  <span className={`text-sm ${theme.text}`}>{item.name}</span>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Download (dropdown) */}
                <div className="relative">
                  <div
                    onMouseEnter={() => handleMouseEnter('Download')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <motion.button
                      className={`text-sm font-medium ${isDark ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'} transition-all duration-300 flex items-center gap-1`}
                      whileHover={{ scale: 1.05, y: -1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Download
                      <ChevronDown className="w-3 h-3" />
                    </motion.button>

                    {/* Download Dropdown */}
                    {activeDropdown === 'Download' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute top-full mt-2 w-96 ${isDark ? 'bg-gray-900/80' : 'bg-white/80'} border ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-xl rounded-lg overflow-hidden z-50 backdrop-blur-md`}
                        onMouseEnter={handleDropdownMouseEnter}
                        onMouseLeave={handleDropdownMouseLeave}
                      >
                        <div className="p-6">
                          {primaryNavItems[1]?.dropdownSections?.map((section) => (
                            <div key={section.title} className="mb-4">
                              <h3 className={`text-sm font-semibold ${theme.text} mb-2`}>{section.title}</h3>
                              {section.items.map((item) => (
                                <div
                                  key={item.name}
                                  className={`flex items-center gap-3 p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer`}
                                  onClick={() => {
                                    setActiveDropdown(null);
                                    if ((item as any).external) {
                                      window.open(item.href, '_blank');
                                    } else {
                                      navigate(item.href);
                                    }
                                  }}
                                >
                                  <span>{item.icon}</span>
                                  <span className={`text-sm ${theme.text}`}>{item.name}</span>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Docs */}
                <motion.a
                  href="/sphinx-doc/xsigma-1.1-3/index.html"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open('/sphinx-doc/xsigma-1.1-3/index.html', '_blank');
                  }}
                  className={`text-sm font-medium ${isDark ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'} transition-all duration-300`}
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Docs
                </motion.a>

                {/* Blog */}
                <motion.a
                  href="/blog"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = '/blog';
                  }}
                  className={`text-sm font-medium ${isDark ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'} transition-all duration-300`}
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
>
                  Blog
                </motion.a>

                </div>
              </div>


            {/* Right Section: Careers, LinkedIn, Login, Theme Switch */}
            <div className="hidden lg:flex items-center gap-6">
              <motion.a
                href="/careers"
                onClick={(e) => { e.preventDefault(); navigate('/careers'); }}
                className={`text-sm font-medium ${isDark ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'} transition-all duration-300`}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                Careers
              </motion.a>
              <motion.a
                href="/linkedin"
                onClick={(e) => { e.preventDefault(); navigate('/linkedin'); }}
                className={`text-sm font-medium ${isDark ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'} transition-all duration-300`}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                LinkedIn
              </motion.a>
              <motion.a
                href="/login"
                onClick={(e) => { e.preventDefault(); navigate('/account'); }}
                className={`text-sm font-medium ${isDark ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'} transition-all duration-300`}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.a>

              {/* Theme Switch - positioned to the right of Login */}
              <button
                onClick={toggleTheme}
                className={`relative flex items-center justify-center w-12 h-6 rounded-full p-1 transition-all duration-300 ease-in-out ${
                  isDark
                    ? 'bg-gradient-to-r from-slate-700/80 to-slate-800/80 border border-slate-600/80'
                    : 'bg-gradient-to-r from-blue-200/80 to-blue-300/80 border border-blue-400/70'
                }`}
                aria-label="Toggle theme"
              >
                <span
                  className={`relative w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
                    isDark
                      ? 'bg-gradient-to-r from-slate-500 to-slate-600 text-yellow-300'
                      : 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white'
                  }`}
                  style={{ transform: `translateX(${isDark ? 0 : 16}px)` }}
                >
                  {isDark ? '🌙' : '☀️'}
                </span>
              </button>
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
            className={`absolute top-full left-0 right-0 mt-2 ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg shadow-lg p-4 mx-6`}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch(searchQuery);
                  }
                }}
                placeholder="Search..."
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
            </div>
          </motion.div>
        )}
      </header>
    </div>


    </>
  );
}

export default Navigation;
