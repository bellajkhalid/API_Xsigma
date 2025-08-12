import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navigation from "@/components/Navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  User, Briefcase, GraduationCap, Award,
  MapPin, Calendar, ExternalLink, Plus,
  MessageCircle, Share2, ThumbsUp, Eye,
  Building, Users, TrendingUp, Globe,
  Mail, Phone, Linkedin, Github, Twitter,
  BarChart3, Edit3, Send, Settings
} from "lucide-react";
import LinkedInAnalytics from "@/components/LinkedInAnalytics";
import LinkedInScheduler from "@/components/LinkedInScheduler";
import LinkedInAuth from "@/components/LinkedInAuth";

export default function LinkedIn() {
  const { isDark } = useTheme();
  const [activeSection, setActiveSection] = useState("profile");

  // Professional profile data for Khalid Bellaj - XSigma
  const profileData = {
    name: "Khalid Bellaj",
    title: "Founder & CEO at XSigma Technologies",
    company: "XSigma Technologies",
    location: "Global • Remote",
    connections: "500+",
    followers: "1,247",
    avatar: "https://via.placeholder.com/150x150/3b82f6/ffffff?text=KB",
    coverImage: "https://via.placeholder.com/800x200/1e40af/ffffff?text=XSigma+Technologies",
    headline: "Founder & CEO driving innovation in quantitative finance through cutting-edge API solutions and advanced research",
    linkedinUrl: "https://www.linkedin.com/in/khalid-bellaj-xsigma",
    about: `Passionate entrepreneur and technologist transforming financial markets through innovative quantitative solutions.

🚀 As Founder & CEO of XSigma Technologies, I lead the development of cutting-edge financial APIs and quantitative research platforms.

🔬 Core Expertise:
• Quantitative Finance & Risk Management
• Financial API Architecture & Development
• Volatility Modeling & Options Pricing
• Real-time Market Data Processing
• Algorithmic Trading Systems

💼 Building the Future of FinTech:
• Democratizing access to institutional-grade quantitative tools
• Developing high-performance financial APIs
• Advancing volatility modeling research
• Creating next-generation trading platforms

🎯 Mission: Making sophisticated quantitative finance accessible to developers, researchers, and financial institutions worldwide.

Always excited to connect with fellow innovators in FinTech, quantitative finance, and financial technology! 🚀`,
    
    experience: [
      {
        title: "Founder & CEO",
        company: "XSigma Technologies",
        duration: "2024 - Present",
        location: "Global • Remote",
        description: "Founded and leading XSigma Technologies, developing cutting-edge quantitative finance APIs and research platforms. Building institutional-grade tools for volatility modeling, options pricing, and risk management. Leading a team of quantitative researchers and software engineers to democratize access to sophisticated financial analytics.",
        skills: ["Leadership", "Quantitative Finance", "API Development", "Business Strategy", "FinTech"]
      },
      {
        title: "Senior Quantitative Analyst",
        company: "Financial Technology Firm",
        duration: "2020 - 2024",
        location: "London, UK",
        description: "Developed sophisticated volatility models and derivatives pricing algorithms. Led implementation of real-time risk management systems and high-frequency trading strategies. Specialized in SABR and Heston model calibration.",
        skills: ["Python", "C++", "Risk Management", "Derivatives Pricing", "Volatility Modeling"]
      },
      {
        title: "Quantitative Researcher",
        company: "Investment Bank",
        duration: "2018 - 2020",
        location: "London, UK",
        description: "Conducted quantitative research on market microstructure and volatility forecasting. Developed machine learning models for options pricing and portfolio optimization. Published research on advanced volatility surface modeling.",
        skills: ["Research", "Machine Learning", "Options Pricing", "Portfolio Optimization", "MATLAB"]
      }
    ],

    education: [
      {
        institution: "MIT",
        degree: "PhD in Financial Engineering",
        duration: "2016 - 2020",
        description: "Dissertation: 'Advanced Volatility Models for High-Frequency Options Pricing'"
      },
      {
        institution: "Stanford University",
        degree: "MS in Mathematical Finance",
        duration: "2014 - 2016",
        description: "Focus on stochastic calculus and computational finance"
      }
    ],

    skills: [
      { name: "Quantitative Finance", endorsements: 47 },
      { name: "Options Pricing", endorsements: 38 },
      { name: "Risk Management", endorsements: 42 },
      { name: "Python", endorsements: 35 },
      { name: "API Development", endorsements: 29 },
      { name: "React/TypeScript", endorsements: 31 },
      { name: "Financial Modeling", endorsements: 44 },
      { name: "Volatility Modeling", endorsements: 33 }
    ],

    certifications: [
      {
        name: "CFA Charter",
        issuer: "CFA Institute",
        date: "2021",
        credentialId: "CFA-2021-XS"
      },
      {
        name: "FRM Certification",
        issuer: "GARP",
        date: "2020",
        credentialId: "FRM-2020-XS"
      }
    ],

    posts: [
      {
        id: 1,
        content: "Excited to announce the launch of our new volatility modeling API! 🚀 Real-time SABR and Heston model calibration with sub-millisecond latency. The future of derivatives pricing is here.",
        timestamp: "2 hours ago",
        likes: 47,
        comments: 12,
        shares: 8,
        image: "https://via.placeholder.com/400x200/3b82f6/ffffff?text=API+Launch"
      },
      {
        id: 2,
        content: "Just published our latest research on 'Machine Learning Applications in Volatility Forecasting'. Key finding: ensemble methods can improve VIX prediction accuracy by 23%. Link in comments! 📊",
        timestamp: "1 day ago",
        likes: 89,
        comments: 23,
        shares: 15
      },
      {
        id: 3,
        content: "Speaking at the FinTech Innovation Summit next week about 'The Future of Quantitative APIs'. Looking forward to connecting with fellow innovators in the space! 🎤",
        timestamp: "3 days ago",
        likes: 156,
        comments: 34,
        shares: 28
      }
    ],

    recommendations: [
      {
        name: "Dr. Sarah Chen",
        title: "Head of Quantitative Research at Goldman Sachs",
        text: "XSigma's work on volatility modeling is groundbreaking. Their API solutions have transformed how we approach derivatives pricing.",
        relationship: "Worked together"
      },
      {
        name: "Michael Rodriguez",
        title: "CTO at FinanceAI",
        text: "Exceptional technical expertise combined with deep financial knowledge. XSigma delivers institutional-quality solutions.",
        relationship: "Client"
      }
    ]
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <ThemeToggle />
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 min-h-[40vh]">
        <AnimatedBackground />
        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">
                in
              </div>
              <h1 className="text-4xl font-light">LinkedIn Professional</h1>
            </motion.div>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
              Connect with the XSigma professional network and showcase your expertise
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[
                { label: 'Connections', value: profileData.connections, icon: Users },
                { label: 'Followers', value: profileData.followers, icon: Eye },
                { label: 'Posts', value: profileData.posts.length, icon: MessageCircle },
                { label: 'Skills', value: profileData.skills.length, icon: Award }
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-4 rounded-lg ${isDark ? 'bg-black/50 border border-gray-700' : 'bg-white/50 border border-gray-200'} backdrop-blur-sm`}
                  >
                    <Icon className="w-5 h-5 text-blue-500 mx-auto mb-2" />
                    <div className="text-2xl font-semibold">{stat.value}</div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>

            {/* Section Navigation */}
            <div className="flex gap-4 justify-center mt-8 flex-wrap">
              <Button
                onClick={() => setActiveSection("profile")}
                variant={activeSection === "profile" ? "default" : "outline"}
                className="rounded-lg"
              >
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
              <Button
                onClick={() => setActiveSection("analytics")}
                variant={activeSection === "analytics" ? "default" : "outline"}
                className="rounded-lg"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
              <Button
                onClick={() => setActiveSection("scheduler")}
                variant={activeSection === "scheduler" ? "default" : "outline"}
                className="rounded-lg"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Content
              </Button>
              <Button
                onClick={() => setActiveSection("network")}
                variant={activeSection === "network" ? "default" : "outline"}
                className="rounded-lg"
              >
                <Users className="w-4 h-4 mr-2" />
                Network
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className={`${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-16`}>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">

            {activeSection === "analytics" ? (
              <LinkedInAnalytics />
            ) : activeSection === "scheduler" ? (
              <LinkedInScheduler />
            ) : activeSection === "network" ? (
              <div className="space-y-8">
                {/* LinkedIn Authentication */}
                <LinkedInAuth />

                <div className={`p-6 rounded-xl border ${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}>
                  <h2 className="text-2xl font-bold mb-6">Professional Network</h2>
                  <div className="text-center py-12">
                    <Users className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
                    <h3 className="text-xl font-medium mb-2">Network Management</h3>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                      Advanced networking features coming soon
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                      <Plus className="w-4 h-4 mr-2" />
                      Connect with Industry Leaders
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Profile Header */}
            <div className={`p-8 rounded-xl border ${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} shadow-lg mb-8`}>
              {/* Cover Image */}
              <div className="relative h-32 -m-8 mb-4 rounded-t-xl overflow-hidden">
                <img 
                  src={profileData.coverImage} 
                  alt="Cover" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-600/80"></div>
              </div>

              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mt-8">
                {/* Profile Picture */}
                <div className="relative">
                  <img
                    src={profileData.avatar}
                    alt={profileData.name}
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
                </div>

                {/* Profile Info */}
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-bold mb-2">{profileData.name}</h1>
                  <p className="text-xl text-blue-600 mb-2">{profileData.title}</p>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                    {profileData.company} • {profileData.location}
                  </p>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                    {profileData.connections} connections • {profileData.followers} followers
                  </p>
                  
                  <div className="flex gap-3 justify-center md:justify-start">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">
                      <Plus className="w-4 h-4 mr-2" />
                      Connect
                    </Button>
                    <Button variant="outline" className="rounded-full px-6">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                    <Button variant="outline" className="rounded-full">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className={`p-6 rounded-xl border ${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} shadow-lg mb-8`}>
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <div className={`${isDark ? 'text-gray-300' : 'text-gray-700'} whitespace-pre-line leading-relaxed`}>
                {profileData.about}
              </div>
            </div>

            {/* Experience Section */}
            <div className={`p-6 rounded-xl border ${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} shadow-lg mb-8`}>
              <h2 className="text-xl font-semibold mb-6">Experience</h2>
              <div className="space-y-6">
                {profileData.experience.map((exp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className={`w-12 h-12 rounded-lg ${isDark ? 'bg-blue-900' : 'bg-blue-100'} flex items-center justify-center flex-shrink-0`}>
                      <Briefcase className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{exp.title}</h3>
                      <p className="text-blue-600 font-medium">{exp.company}</p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                        {exp.duration} • {exp.location}
                      </p>
                      <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill) => (
                          <span key={skill} className={`px-3 py-1 rounded-full text-sm ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Skills Section */}
            <div className={`p-6 rounded-xl border ${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} shadow-lg mb-8`}>
              <h2 className="text-xl font-semibold mb-6">Skills & Endorsements</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {profileData.skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-4 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-between`}
                  >
                    <div>
                      <div className="font-medium">{skill.name}</div>
                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {skill.endorsements} endorsements
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-full">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recent Posts */}
            <div className={`p-6 rounded-xl border ${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}>
              <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
              <div className="space-y-6">
                {profileData.posts.map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <img src={profileData.avatar} alt="" className="w-10 h-10 rounded-full" />
                      <div>
                        <div className="font-medium">{profileData.name}</div>
                        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {post.timestamp}
                        </div>
                      </div>
                    </div>
                    
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                      {post.content}
                    </p>
                    
                    {post.image && (
                      <img src={post.image} alt="" className="w-full h-48 object-cover rounded-lg mb-3" />
                    )}
                    
                    <div className="flex items-center gap-6 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        {post.likes}
                      </button>
                      <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        {post.comments}
                      </button>
                      <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                        <Share2 className="w-4 h-4" />
                        {post.shares}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
