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

  // Professional navigation items optimized for quantitative finance industry
  const primaryNavItems = [
    {
      name: "Solutions",
      href: "#",
      onClick: () => {},
      hasDropdown: true,
      dropdownSections: [
        {
          title: "Market Models",
          description: "Production-tested curve and volatility frameworks with enhanced AAD technology.",
          items: [
            { name: "XCF Model", icon: "📈", href: "/solutions/xcf-model" },
            { name: "XVF Model", icon: "📊", href: "/solutions/xvf-model" }
          ]
        },
        {
          title: "Pricing & Risk",
          description: "Comprehensive derivatives pricing and risk management solutions for institutional clients.",
          items: [
            { name: "CVA/DVA Calculation", icon: "⚡", href: "/solutions/cva-dva" },
            { name: "Greeks & Sensitivities", icon: "📐", href: "/solutions/greeks" },
            { name: "Counterparty Risk", icon: "🛡️", href: "/solutions/counterparty-risk" },
            { name: "Regulatory Capital", icon: "🏛️", href: "/solutions/regulatory-capital" }
          ]
        },
        {
          title: "Simulation Platforms",
          description: "Monte Carlo and risk analytics powered by enhanced AAD technology.",
          items: [
            { name: "Monte Carlo Platform", icon: "🎲", href: "/solutions/monte-carlo" },
            { name: "Portfolio Analytics", icon: "💼", href: "/solutions/portfolio" }
          ]
        }
      ]
    },
    {
      name: "Resources",
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
            { name: "Technical White Papers", icon: "📋", href: "/resources/white-papers" },
            { name: "Research Publications", icon: "🎓", href: "/resources/publications" },
            { name: "Case Studies", icon: "📊", href: "/resources/case-studies" },
            { name: "Market Simulations Paper", icon: "📄", href: "https://www.researchgate.net/publication/227624010_Coherent_global_market_simulations_and_securitization_measures_for_counterparty_credit_risk", external: true }
          ]
        },
        {
          title: "Learning Center",
          description: "Educational content, tutorials, and insights for quantitative finance professionals",
          items: [
            { name: "Blog & Insights", icon: "💡", href: "/blog" },
            { name: "Tutorial Videos", icon: "🎥", href: "/resources/tutorials" },
            { name: "Webinars", icon: "🎯", href: "/resources/webinars" },
            { name: "User Manual", icon: "📖", href: "/resources/user-manual" }
          ]
        }
      ]
    },
    {
      name: "Company",
      href: "#",
      onClick: () => {},
      hasDropdown: true,
      dropdownSections: [
        {
          title: "About XSigma",
          description: "Learn about our mission, team, and commitment to quantitative finance excellence",
          items: [
            { name: "Our Story", icon: "🏢", href: "/company/about" },
            { name: "Leadership Team", icon: "👥", href: "/company/leadership" },
            { name: "Careers", icon: "💼", href: "/careers" },
            { name: "News & Press", icon: "📰", href: "/company/news" }
          ]
        },
        {
          title: "Partners & Ecosystem",
          description: "Strategic partnerships and integrations in the quantitative finance ecosystem",
          items: [
            { name: "Technology Partners", icon: "🤝", href: "/company/partners" },
            { name: "Academic Collaborations", icon: "🎓", href: "/company/academic" },
            { name: "Integration Partners", icon: "🔗", href: "/company/integrations" },
            { name: "Become a Partner", icon: "✨", href: "/company/partner-program" }
          ]
        }
      ]
    },
    {
      name: "Support",
      href: "#",
      onClick: () => {},
      hasDropdown: true,
      dropdownSections: [
        {
          title: "Documentation",
          description: "Comprehensive technical documentation and API references",
          items: [
            { name: "Complete Documentation", icon: "📖", href: "/support/documentation" },
            { name: "API Reference", icon: "📚", href: "/support/api-reference" },
            { name: "Developer Portal", icon: "👨‍💻", href: "/support/developers" },
            { name: "Integration Guides", icon: "🔧", href: "/support/integration" },
            { name: "Release Notes", icon: "📝", href: "/support/releases" }
          ]
        },
        {
          title: "Enterprise Support",
          description: "Professional support services for institutional clients",
          items: [
            { name: "Technical Support", icon: "🛠️", href: "/support/technical" },
            { name: "Training & Certification", icon: "🎯", href: "/support/training" },
            { name: "Professional Services", icon: "⚡", href: "/support/professional" },
            { name: "Community Forum", icon: "💬", href: "/support/community" }
          ]
        }
      ]
    }
  ];

  // User menu items
  const userMenuItems = [
    { name: "Account", icon: "👤", href: "/account", onClick: () => navigate('/account') },
    { name: "Settings", icon: "⚙️", href: "/settings", onClick: () => navigate('/settings') },
    { name: "Sign Out", icon: "🚪", href: "/logout", onClick: () => navigate('/logout') }
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 section-transition">
        {/* XSigma Premium Navigation Bar */}
      <header className={`w-full xsigma-nav ${isDark ? 'bg-black/95' : 'bg-white/95'} transition-all duration-500`}>
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center justify-between h-18">
            {/* Left Section: Menu + Logo + Navigation */}
            <div className="flex items-center gap-8">
              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <Button variant="outline" size="icon"
                              className={`xsigma-nav-item border-2 ${isDark ? 'border-xsigma-teal/30 hover:border-xsigma-teal/50' : 'border-xsigma-navy/30 hover:border-xsigma-navy/50'}`}>
                        <Menu className="h-5 w-5" />
                      </Button>
                    </motion.div>
                  </SheetTrigger>
                  <SheetContent className={`xsigma-mobile-nav ${theme.background}`}>
                    <div className="flex flex-col gap-6 mt-8">
                      {/* XSigma Premium Mobile Navigation Header */}
                      <div className="mb-8">
                        <div className="flex items-center gap-3 mb-6">
                          <img src="/xsigma_logo.ico" alt="XSigma" className="w-8 h-8" />
                          <div>
                            <h2 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-xsigma-navy'}`}
                                style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}>
                              XSigma
                            </h2>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                               style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.05em' }}>
                              QUANTITATIVE FINANCE
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Primary Navigation */}
                      <div className="space-y-6">
                        <div className={`text-xs font-bold ${isDark ? 'text-xsigma-teal' : 'text-xsigma-navy'} uppercase tracking-wider`}
                             style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.1em' }}>
                          Solutions & Resources
                        </div>
                        {primaryNavItems.map((item) => (
                        <div key={item.name}>
                          {item.hasDropdown ? (
                            <div className="space-y-3">
                              <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-xsigma-navy'} mb-4`}
                                   style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}>
                                {item.name}
                              </div>
                              {item.dropdownSections?.map((section) => (
                                <div key={section.title} className="ml-4 space-y-3">
                                  <div className={`text-sm font-semibold ${isDark ? 'text-xsigma-teal' : 'text-xsigma-navy'} uppercase tracking-wider`}
                                       style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.05em' }}>
                                    {section.title}
                                  </div>
                                  <div className="space-y-2">
                                    {section.items.map((subItem) => (
                                      <motion.div
                                        key={subItem.name}
                                        className="xsigma-mobile-nav-item flex items-center gap-3 cursor-pointer ml-2"
                                        whileHover={{ x: 4 }}
                                        whileTap={{ scale: 0.98 }}
                                        transition={{ duration: 0.2, ease: "easeOut" }}
                                        onClick={() => {
                                          setIsMobileMenuOpen(false);
                                          if ((subItem as any).external) {
                                            window.open(subItem.href, '_blank');
                                          } else {
                                            navigate(subItem.href);
                                          }
                                        }}
                                      >
                                        <span className="text-base">{subItem.icon}</span>
                                        <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}
                                              style={{ fontFamily: "'Inter', sans-serif" }}>
                                          {subItem.name}
                                        </span>
                                      </motion.div>
                                    ))}
                                  </div>
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
                          Enterprise Services
                        </div>
                        <a
                          href="/support"
                          className={`text-lg ${theme.textMuted} hover:text-primary transition-colors block`}
                          onClick={(e) => {
                            e.preventDefault();
                            setIsMobileMenuOpen(false);
                            navigate('/support');
                          }}
                        >
                          Technical Support
                        </a>
                        <a
                          href="/company/partners"
                          className={`text-lg ${theme.textMuted} hover:text-primary transition-colors block`}
                          onClick={(e) => {
                            e.preventDefault();
                            setIsMobileMenuOpen(false);
                            navigate('/company/partners');
                          }}
                        >
                          Partners
                        </a>
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
                        className={`w-full font-medium mt-6 ${isDark ? 'bg-xsigma-teal hover:bg-xsigma-teal/90 text-white' : 'bg-xsigma-navy hover:bg-xsigma-navy/90 text-white'} transition-colors`}
                      >
                        Request Demo
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* XSigma Premium Logo */}
              <motion.div
                className="flex items-center gap-4 cursor-pointer flex-shrink-0 xsigma-logo-container"
                onClick={() => navigate('/')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <motion.img
                  src="/xsigma_logo.ico"
                  alt="XSigma Logo"
                  className="w-12 h-12"
                  whileHover={{ rotate: 3 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
                <motion.div
                  className="hidden sm:block"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <div className="flex flex-col">
                    <span className={`font-bold text-lg tracking-tight ${isDark ? 'text-white' : 'text-xsigma-navy'}`}
                          style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}>
                      XSigma
                    </span>
                    <span className={`text-xs font-medium tracking-wide ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                          style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.05em' }}>
                      QUANTITATIVE FINANCE
                    </span>
                  </div>
                </motion.div>
              </motion.div>

              {/* XSigma Premium Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-2">
                {/* Solutions (dropdown) */}
                <div className="relative">
                  <div
                    onMouseEnter={() => handleMouseEnter('Solutions')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <motion.button
                      className="xsigma-nav-item flex items-center gap-1.5"
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      Solutions
                      <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200"
                                  style={{ transform: activeDropdown === 'Solutions' ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                    </motion.button>

                    {/* XSigma Premium Solution Dropdown */}
                    {activeDropdown === 'Solutions' && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute top-full mt-3 w-[420px] xsigma-dropdown z-50 left-0"
                        style={{
                          maxHeight: 'calc(100vh - 120px)',
                          overflowY: 'auto',
                          overflowX: 'hidden'
                        }}
                        onMouseEnter={handleDropdownMouseEnter}
                        onMouseLeave={handleDropdownMouseLeave}
                      >
                        <div className="p-8">
                          {primaryNavItems[0]?.dropdownSections?.map((section, index) => (
                            <div key={section.title} className={`${index > 0 ? 'mt-8' : ''}`}>
                              <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-xsigma-navy'} mb-3 uppercase tracking-wide`}
                                  style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.05em' }}>
                                {section.title}
                              </h3>
                              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4 leading-relaxed`}
                                 style={{ fontFamily: "'Inter', sans-serif" }}>
                                {section.description}
                              </p>
                              <div className="space-y-2">
                                {section.items.map((item) => (
                                  <motion.div
                                    key={item.name}
                                    className="xsigma-dropdown-item flex items-center gap-3 cursor-pointer rounded-lg"
                                    whileHover={{ x: 4 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    onClick={() => {
                                      setActiveDropdown(null);
                                      if ((item as any).external) {
                                        window.open(item.href, '_blank');
                                      } else {
                                        navigate(item.href);
                                      }
                                    }}
                                  >
                                    <span className="text-lg flex-shrink-0">{item.icon}</span>
                                    <div className="flex-1">
                                      <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}
                                            style={{ fontFamily: "'Inter', sans-serif" }}>
                                        {item.name}
                                      </span>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Resources (dropdown) */}
                <div className="relative">
                  <div
                    onMouseEnter={() => handleMouseEnter('Resources')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <motion.button
                      className="xsigma-nav-item flex items-center gap-1.5"
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      Resources
                      <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200"
                                  style={{ transform: activeDropdown === 'Resources' ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                    </motion.button>

                    {/* XSigma Premium Resources Dropdown */}
                    {activeDropdown === 'Resources' && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute top-full mt-3 w-[420px] xsigma-dropdown z-50 left-0"
                        style={{
                          maxHeight: 'calc(100vh - 120px)',
                          overflowY: 'auto',
                          overflowX: 'hidden'
                        }}
                        onMouseEnter={handleDropdownMouseEnter}
                        onMouseLeave={handleDropdownMouseLeave}
                      >
                        <div className="p-8">
                          {primaryNavItems[1]?.dropdownSections?.map((section, index) => (
                            <div key={section.title} className={`${index > 0 ? 'mt-8' : ''}`}>
                              <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-xsigma-navy'} mb-3 uppercase tracking-wide`}
                                  style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.05em' }}>
                                {section.title}
                              </h3>
                              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4 leading-relaxed`}
                                 style={{ fontFamily: "'Inter', sans-serif" }}>
                                {section.description}
                              </p>
                              <div className="space-y-2">
                                {section.items.map((item) => (
                                  <motion.div
                                    key={item.name}
                                    className="xsigma-dropdown-item flex items-center gap-3 cursor-pointer rounded-lg"
                                    whileHover={{ x: 4 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    onClick={() => {
                                      setActiveDropdown(null);
                                      if ((item as any).external) {
                                        window.open(item.href, '_blank');
                                      } else {
                                        navigate(item.href);
                                      }
                                    }}
                                  >
                                    <span className="text-lg flex-shrink-0">{item.icon}</span>
                                    <div className="flex-1">
                                      <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}
                                            style={{ fontFamily: "'Inter', sans-serif" }}>
                                        {item.name}
                                      </span>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Company */}
                <div className="relative">
                  <div
                    onMouseEnter={() => handleMouseEnter('Company')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <motion.button
                      className="xsigma-nav-item flex items-center gap-1.5"
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      Company
                      <ChevronDown className="w-4 h-4 transition-transform duration-200"
                                  style={{ transform: activeDropdown === 'Company' ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                    </motion.button>

                    {/* Company Dropdown */}
                    {activeDropdown === 'Company' && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute top-full mt-3 w-[420px] xsigma-dropdown z-50 left-0"
                        style={{
                          maxHeight: 'calc(100vh - 120px)',
                          overflowY: 'auto',
                          overflowX: 'hidden'
                        }}
                        onMouseEnter={handleDropdownMouseEnter}
                        onMouseLeave={handleDropdownMouseLeave}
                      >
                        <div className="p-8">
                          {primaryNavItems[2]?.dropdownSections?.map((section, index) => (
                            <div key={section.title} className={`${index > 0 ? 'mt-8' : ''}`}>
                              <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-xsigma-navy'} mb-3 uppercase tracking-wide`}
                                  style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.05em' }}>
                                {section.title}
                              </h3>
                              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4 leading-relaxed`}
                                 style={{ fontFamily: "'Inter', sans-serif" }}>
                                {section.description}
                              </p>
                              <div className="space-y-2">
                                {section.items.map((item) => (
                                  <motion.div
                                    key={item.name}
                                    className="xsigma-dropdown-item flex items-center gap-3 cursor-pointer rounded-lg"
                                    whileHover={{ x: 4 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    onClick={() => {
                                      setActiveDropdown(null);
                                      if ((item as any).external) {
                                        window.open(item.href, '_blank');
                                      } else {
                                        navigate(item.href);
                                      }
                                    }}
                                  >
                                    <span className="text-lg flex-shrink-0">{item.icon}</span>
                                    <div className="flex-1">
                                      <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}
                                            style={{ fontFamily: "'Inter', sans-serif" }}>
                                        {item.name}
                                      </span>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Support */}
                <div className="relative">
                  <div
                    onMouseEnter={() => handleMouseEnter('Support')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <motion.button
                      className="xsigma-nav-item flex items-center gap-1.5"
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      Support
                      <ChevronDown className="w-4 h-4 transition-transform duration-200"
                                  style={{ transform: activeDropdown === 'Support' ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                    </motion.button>

                    {/* Support Dropdown */}
                    {activeDropdown === 'Support' && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute top-full mt-3 w-[420px] xsigma-dropdown z-50 left-0"
                        style={{
                          maxHeight: 'calc(100vh - 120px)',
                          overflowY: 'auto',
                          overflowX: 'hidden'
                        }}
                        onMouseEnter={handleDropdownMouseEnter}
                        onMouseLeave={handleDropdownMouseLeave}
                      >
                        <div className="p-8">
                          {primaryNavItems[3]?.dropdownSections?.map((section, index) => (
                            <div key={section.title} className={`${index > 0 ? 'mt-8' : ''}`}>
                              <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-xsigma-navy'} mb-3 uppercase tracking-wide`}
                                  style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.05em' }}>
                                {section.title}
                              </h3>
                              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4 leading-relaxed`}
                                 style={{ fontFamily: "'Inter', sans-serif" }}>
                                {section.description}
                              </p>
                              <div className="space-y-2">
                                {section.items.map((item) => (
                                  <motion.div
                                    key={item.name}
                                    className="xsigma-dropdown-item flex items-center gap-3 cursor-pointer rounded-lg"
                                    whileHover={{ x: 4 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    onClick={() => {
                                      setActiveDropdown(null);
                                      if ((item as any).external) {
                                        window.open(item.href, '_blank');
                                      } else {
                                        navigate(item.href);
                                      }
                                    }}
                                  >
                                    <span className="text-lg flex-shrink-0">{item.icon}</span>
                                    <div className="flex-1">
                                      <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}
                                            style={{ fontFamily: "'Inter', sans-serif" }}>
                                        {item.name}
                                      </span>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                </div>
              </div>


            {/* XSigma Professional Right Section */}
            <div className="hidden lg:flex items-center gap-6">

              {/* Utility Navigation */}
              <motion.a
                href="/login"
                onClick={(e) => { e.preventDefault(); navigate('/account'); }}
                className={`text-sm ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                Client Portal
              </motion.a>

              {/* Premium Request Demo CTA */}
              <motion.button
                onClick={() => navigate('/contact')}
                className="xsigma-cta-button"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                Request Demo
              </motion.button>

              {/* XSigma Premium Theme Switch */}
              <motion.button
                onClick={toggleTheme}
                className={`relative flex items-center justify-center w-14 h-7 rounded-full p-1 transition-all duration-300 ease-in-out ml-4 ${
                  isDark
                    ? 'bg-gradient-to-r from-xsigma-navy/80 to-slate-800/80 border border-xsigma-teal/30'
                    : 'bg-gradient-to-r from-blue-100/80 to-xsigma-teal/20 border border-xsigma-teal/40'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                aria-label="Toggle theme"
              >
                <motion.span
                  className={`relative w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                    isDark
                      ? 'bg-gradient-to-r from-xsigma-teal to-cyan-400 text-white'
                      : 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white'
                  }`}
                  animate={{ x: isDark ? 0 : 20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {isDark ? '🌙' : '☀️'}
                </motion.span>
              </motion.button>
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
