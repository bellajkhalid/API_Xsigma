import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { linkedinApi } from '@/services/linkedinApi';
import {
  Linkedin, CheckCircle, AlertCircle, User,
  Building, Mail, MapPin, Calendar, ExternalLink,
  Loader2, Settings, RotateCcw
} from 'lucide-react';

export default function LinkedInAuth() {
  const { isDark } = useTheme();
  const [isConnected, setIsConnected] = useState(linkedinApi.isAuthenticated());
  const [isConnecting, setIsConnecting] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isConnected) {
      loadProfile();
    }
  }, [isConnected]);

  const loadProfile = async () => {
    setIsLoading(true);
    try {
      const profileData = await linkedinApi.getProfile();
      setProfile(profileData);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnect = () => {
    setIsConnecting(true);
    const authUrl = linkedinApi.getAuthUrl();
    window.location.href = authUrl;
  };

  const handleDisconnect = () => {
    linkedinApi.logout();
    setIsConnected(false);
    setProfile(null);
  };

  const handleRefresh = () => {
    loadProfile();
  };

  if (isConnected && profile) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-xl border ${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Linkedin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">LinkedIn Connected</h3>
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle className="w-4 h-4" />
                Active Connection
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={handleRefresh} disabled={isLoading}>
              <RotateCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Profile Information */}
        <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'} mb-4`}>
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              KB
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-lg">Khalid Bellaj</h4>
              <p className="text-blue-600 mb-2">Founder & CEO at XSigma Technologies</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span>khalid.bellaj@xsigma.co.uk</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-gray-500" />
                  <span>XSigma Technologies</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>Global • Remote</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>Joined {new Date().getFullYear()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">500+</div>
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Connections</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">1.2K</div>
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Followers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">89%</div>
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Profile Views</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => window.open('https://www.linkedin.com/in/khalid-bellaj-xsigma', '_blank')}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View Profile
          </Button>
          <Button variant="outline" onClick={handleDisconnect}>
            Disconnect
          </Button>
        </div>
      </motion.div>
    );
  }

  if (isConnected && isLoading) {
    return (
      <div className={`p-6 rounded-xl border ${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mr-3" />
          <span>Loading LinkedIn profile...</span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-xl border ${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}
    >
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <Linkedin className="w-8 h-8 text-blue-600" />
        </div>
        
        <h3 className="text-xl font-semibold mb-2">Connect Your LinkedIn Account</h3>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6 max-w-md mx-auto`}>
          Connect your LinkedIn account to sync your professional profile, share content, and access real-time analytics.
        </p>

        {/* Benefits */}
        <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'} mb-6 text-left`}>
          <h4 className="font-medium mb-3">What you'll get:</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Automatic profile synchronization</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Content scheduling and publishing</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Real-time analytics and insights</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Professional networking tools</span>
            </li>
          </ul>
        </div>

        <Button 
          onClick={handleConnect} 
          disabled={isConnecting}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
          size="lg"
        >
          <Linkedin className="w-5 h-5 mr-2" />
          {isConnecting ? 'Connecting...' : 'Connect with LinkedIn'}
        </Button>

        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-4`}>
          We'll only access the information you authorize. You can disconnect at any time.
        </p>
      </div>
    </motion.div>
  );
}
