import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import Navigation from "@/components/Navigation";
import ThemeToggle from "@/components/ThemeToggle";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Download, 
  FileText, 
  ExternalLink, 
  Mail, 
  Calendar,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Info
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DownloadPageProps {
  title: string;
  description: string;
  icon: string;
  category: string;
  comingSoon?: boolean;
  downloads?: Array<{
    name: string;
    description: string;
    size?: string;
    format: string;
    url?: string;
    version?: string;
  }>;
  relatedLinks?: Array<{
    name: string;
    url: string;
    external?: boolean;
  }>;
}

const DownloadPage = ({ 
  title, 
  description, 
  icon, 
  category, 
  comingSoon = true,
  downloads = [],
  relatedLinks = []
}: DownloadPageProps) => {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'} transition-colors duration-300`}>
      <ThemeToggle />
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] pt-32 pb-20">
        <AnimatedBackground />
        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Button
                variant="ghost"
                onClick={() => navigate(-1)}
                className={`mb-6 ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'}`}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              <div className="flex items-center gap-4 mb-6">
                <div className={`text-6xl`}>{icon}</div>
                <div>
                  <div className={`text-sm ${isDark ? 'text-blue-400' : 'text-blue-600'} font-medium mb-2`}>
                    {category}
                  </div>
                  <h1 className={`text-4xl md:text-5xl font-light leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {title}
                  </h1>
                </div>
              </div>
              
              <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed max-w-3xl`}>
                {description}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            
            {comingSoon ? (
              /* Coming Soon Content */
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <Card className={`${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} border`}>
                  <CardContent className="p-12">
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-full ${isDark ? 'bg-blue-900' : 'bg-blue-100'} flex items-center justify-center`}>
                      <Calendar className={`w-8 h-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                    
                    <h2 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                      Coming Soon
                    </h2>
                    
                    <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-8 max-w-2xl mx-auto`}>
                      We're working hard to bring you this resource. This download will be available soon as part of our comprehensive XSigma Analytix platform.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button 
                        className={`${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'} rounded-lg px-6`}
                        onClick={() => window.open('mailto:info@xsigma.co.uk?subject=Request for ' + title, '_blank')}
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Request Early Access
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="rounded-lg px-6"
                        onClick={() => navigate('/blog')}
                      >
                        <Info className="w-4 h-4 mr-2" />
                        Read Our Blog
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              /* Available Downloads Content */
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>
                    Available Downloads
                  </h2>
                  
                  <div className="grid gap-6">
                    {downloads.map((download, index) => (
                      <Card key={index} className={`${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} border hover:shadow-lg transition-shadow`}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                                {download.name}
                              </h3>
                              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                                {download.description}
                              </p>
                              <div className="flex gap-4 text-sm">
                                {download.size && (
                                  <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                    Size: {download.size}
                                  </span>
                                )}
                                <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                  Format: {download.format}
                                </span>
                                {download.version && (
                                  <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                    Version: {download.version}
                                  </span>
                                )}
                              </div>
                            </div>
                            <Button 
                              className={`${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'} rounded-lg ml-4`}
                              onClick={() => download.url && window.open(download.url, '_blank')}
                              disabled={!download.url}
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}

            {/* Related Links */}
            {relatedLinks.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-12"
              >
                <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>
                  Related Resources
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedLinks.map((link, index) => (
                    <Card key={index} className={`${isDark ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'} border hover:shadow-md transition-shadow cursor-pointer`}>
                      <CardContent 
                        className="p-4"
                        onClick={() => {
                          if (link.external) {
                            window.open(link.url, '_blank');
                          } else {
                            navigate(link.url);
                          }
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {link.name}
                          </span>
                          <ExternalLink className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-16 text-center"
            >
              <Card className={`${isDark ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'} border`}>
                <CardContent className="p-8">
                  <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                    Need Help?
                  </h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
                    Can't find what you're looking for? Our team is here to help you get the resources you need.
                  </p>
                  <Button 
                    variant="outline"
                    className="rounded-lg"
                    onClick={() => window.open('mailto:support@xsigma.co.uk?subject=Download Support Request', '_blank')}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DownloadPage;
