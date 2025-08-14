import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import Navigation from "@/components/Navigation";
import ThemeToggle from "@/components/ThemeToggle";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  MapPin, 
  Clock, 
  DollarSign, 
  Mail, 
  Phone, 
  Globe, 
  Heart,
  Target,
  Zap,
  Award,
  Coffee,
  Laptop,
  Briefcase,
  GraduationCap,
  TrendingUp,
  ArrowRight
} from "lucide-react";

const Careers = () => {
  const { isDark } = useTheme();

  const jobOpenings = [
    {
      id: 1,
      title: "Senior Quantitative Analyst",
      department: "Research & Development",
      location: "London, UK / Remote",
      type: "Full-time",
      salary: "£80,000 - £120,000",
      description: "Lead the development of advanced mathematical models for derivatives pricing and risk management.",
      requirements: [
        "PhD in Mathematics, Physics, or Quantitative Finance",
        "5+ years experience in quantitative finance",
        "Expertise in C++, Python, and numerical methods",
        "Strong knowledge of derivatives pricing models"
      ],
      benefits: ["Competitive salary", "Equity participation", "Flexible working", "Research budget"]
    },
    {
      id: 2,
      title: "Full Stack Developer",
      department: "Engineering",
      location: "Remote / Hybrid",
      type: "Full-time",
      salary: "£60,000 - £90,000",
      description: "Build and maintain our cutting-edge financial analytics platform using modern web technologies.",
      requirements: [
        "Bachelor's degree in Computer Science or related field",
        "3+ years experience with React, TypeScript, Node.js",
        "Experience with cloud platforms (AWS, Azure)",
        "Understanding of financial markets is a plus"
      ],
      benefits: ["Remote-first culture", "Learning budget", "Health insurance", "Flexible hours"]
    },
    {
      id: 3,
      title: "DevOps Engineer",
      department: "Infrastructure",
      location: "London, UK",
      type: "Full-time",
      salary: "£70,000 - £100,000",
      description: "Design and maintain scalable infrastructure for high-performance financial computing.",
      requirements: [
        "Bachelor's degree in Engineering or Computer Science",
        "Experience with Kubernetes, Docker, CI/CD",
        "Cloud infrastructure expertise (AWS/Azure)",
        "Knowledge of monitoring and observability tools"
      ],
      benefits: ["Stock options", "Professional development", "Health & dental", "Gym membership"]
    },
    {
      id: 4,
      title: "Product Manager - Analytix Platform",
      department: "Product",
      location: "London, UK / Remote",
      type: "Full-time",
      salary: "£75,000 - £110,000",
      description: "Drive product strategy and roadmap for our flagship Analytix platform.",
      requirements: [
        "MBA or equivalent experience",
        "5+ years in product management",
        "Experience with B2B SaaS products",
        "Understanding of financial services industry"
      ],
      benefits: ["Equity package", "Flexible working", "Conference budget", "Team retreats"]
    }
  ];

  const companyValues = [
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for the highest standards in everything we do, from code quality to client service."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We push the boundaries of what's possible in quantitative finance and technology."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "We believe the best solutions come from diverse teams working together."
    },
    {
      icon: Heart,
      title: "Integrity",
      description: "We operate with transparency, honesty, and ethical principles in all our interactions."
    }
  ];

  const benefits = [
    { icon: DollarSign, title: "Competitive Compensation", description: "Market-leading salaries and equity participation" },
    { icon: Laptop, title: "Remote-First Culture", description: "Work from anywhere with flexible hours" },
    { icon: GraduationCap, title: "Learning & Development", description: "Annual learning budget and conference attendance" },
    { icon: Coffee, title: "Wellness Benefits", description: "Health insurance, gym membership, and mental health support" },
    { icon: Award, title: "Recognition Programs", description: "Performance bonuses and peer recognition awards" },
    { icon: TrendingUp, title: "Career Growth", description: "Clear progression paths and mentorship programs" }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'} transition-colors duration-300`}>
      <ThemeToggle />
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] pt-32 pb-20">
        <AnimatedBackground />
        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className={`text-5xl md:text-6xl font-light leading-tight ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>
                Join the Future of
                <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent"> Analytix</span>
              </h1>
              <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-8 leading-relaxed`}>
                Build cutting-edge quantitative solutions that power the world's financial markets. 
                Join our team of brilliant minds shaping the future of finance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className={`${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'} rounded-lg px-8 py-3`}
                  onClick={() => document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Briefcase className="w-5 h-5 mr-2" />
                  View Open Positions
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="rounded-lg px-8 py-3"
                  onClick={() => document.getElementById('company-culture')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Users className="w-5 h-5 mr-2" />
                  Learn About Our Culture
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section id="company-culture" className={`py-20 ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className={`text-4xl font-light ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>
                Our Values & Culture
              </h2>
              <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
                We're building more than just software – we're creating a culture where innovation thrives, 
                collaboration flourishes, and every team member can reach their full potential.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {companyValues.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className={`h-full ${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} border hover:shadow-lg transition-shadow`}>
                    <CardContent className="p-6 text-center">
                      <value.icon className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                      <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {value.title}
                      </h3>
                      <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className={`text-4xl font-light ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>
                Why Work With Us
              </h2>
              <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
                We offer comprehensive benefits and a supportive environment that helps you thrive both professionally and personally.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`p-6 rounded-lg ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'} hover:shadow-lg transition-shadow`}
                >
                  <benefit.icon className={`w-8 h-8 mb-4 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                  <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {benefit.title}
                  </h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className={`py-20 ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className={`text-4xl font-light ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>
                Open Positions
              </h2>
              <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
                Join our growing team and help shape the future of quantitative finance technology.
              </p>
            </motion.div>

            <div className="space-y-6">
              {jobOpenings.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className={`${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} border hover:shadow-lg transition-shadow`}>
                    <CardHeader>
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                          <CardTitle className={`text-xl ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                            {job.title}
                          </CardTitle>
                          <div className="flex flex-wrap gap-4 text-sm">
                            <span className={`flex items-center gap-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                              <Briefcase className="w-4 h-4" />
                              {job.department}
                            </span>
                            <span className={`flex items-center gap-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                              <MapPin className="w-4 h-4" />
                              {job.location}
                            </span>
                            <span className={`flex items-center gap-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                              <Clock className="w-4 h-4" />
                              {job.type}
                            </span>
                            <span className={`flex items-center gap-1 ${isDark ? 'text-green-400' : 'text-green-600'} font-semibold`}>
                              <DollarSign className="w-4 h-4" />
                              {job.salary}
                            </span>
                          </div>
                        </div>
                        <Button 
                          className={`${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'} rounded-lg`}
                          onClick={() => window.open('mailto:careers@xsigma.co.uk?subject=Application for ' + job.title, '_blank')}
                        >
                          Apply Now
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                        {job.description}
                      </p>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                            Requirements:
                          </h4>
                          <ul className={`space-y-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            {job.requirements.map((req, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">•</span>
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                            Benefits:
                          </h4>
                          <ul className={`space-y-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            {job.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-blue-500 mt-1">•</span>
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className={`text-4xl font-light ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>
                Ready to Join Us?
              </h2>
              <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
                Don't see a position that fits? We're always looking for exceptional talent. 
                Reach out and let's discuss how you can contribute to our mission.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <div className={`flex items-center gap-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <Mail className="w-5 h-5" />
                  <a href="mailto:careers@xsigma.co.uk" className="hover:underline">
                    careers@xsigma.co.uk
                  </a>
                </div>
                <div className={`flex items-center gap-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <Globe className="w-5 h-5" />
                  <span>London, UK & Remote</span>
                </div>
              </div>
              
              <div className="mt-8">
                <Button 
                  size="lg"
                  className={`${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'} rounded-lg px-8 py-3`}
                  onClick={() => window.open('mailto:careers@xsigma.co.uk?subject=General Inquiry', '_blank')}
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Get in Touch
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
