import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { linkedinApi } from '@/services/linkedinApi';
import {
  Loader2, CheckCircle, AlertCircle, Linkedin,
  ArrowRight, RotateCcw, Home
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LinkedInCallback() {
  const { isDark } = useTheme();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        setProgress(25);
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const error = searchParams.get('error');
        
        if (error) {
          throw new Error(`LinkedIn authorization error: ${error}`);
        }
        
        if (!code || !state) {
          throw new Error('Missing authorization code or state parameter');
        }

        setProgress(50);
        
        // Exchange code for access token
        await linkedinApi.exchangeCodeForToken(code, state);
        
        setProgress(75);
        
        // Verify the connection by fetching profile
        await linkedinApi.getProfile();
        
        setProgress(100);
        setStatus('success');
        
        // Redirect to LinkedIn page after 3 seconds
        setTimeout(() => {
          navigate('/linkedin');
        }, 3000);
        
      } catch (error: any) {
        console.error('LinkedIn auth error:', error);
        setError(error.message || 'An unexpected error occurred');
        setStatus('error');
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  const handleRetry = () => {
    setStatus('loading');
    setError('');
    setProgress(0);
    
    // Redirect to LinkedIn auth
    const authUrl = linkedinApi.getAuthUrl();
    window.location.href = authUrl;
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoToLinkedIn = () => {
    navigate('/linkedin');
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'} p-4`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`max-w-md w-full p-8 rounded-xl border ${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} shadow-2xl text-center`}
      >
        {/* LinkedIn Logo */}
        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Linkedin className="w-8 h-8 text-white" />
        </div>

        {status === 'loading' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-blue-600" />
            <h2 className="text-2xl font-semibold mb-2">Connecting to LinkedIn</h2>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
              Please wait while we authenticate your account...
            </p>
            
            {/* Progress Bar */}
            <div className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-200'} mb-4`}>
              <motion.div
                className="h-2 bg-blue-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            
            <div className="text-sm text-gray-500">
              {progress < 25 && 'Initializing connection...'}
              {progress >= 25 && progress < 50 && 'Verifying authorization...'}
              {progress >= 50 && progress < 75 && 'Exchanging tokens...'}
              {progress >= 75 && progress < 100 && 'Loading profile...'}
              {progress >= 100 && 'Almost done...'}
            </div>
          </motion.div>
        )}
        
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600" />
            <h2 className="text-2xl font-semibold mb-2 text-green-600">Successfully Connected!</h2>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
              Your LinkedIn account has been connected to XSigma. You can now access all professional features.
            </p>
            
            {/* Success Features */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-green-900/20' : 'bg-green-50'} border ${isDark ? 'border-green-800' : 'border-green-200'} mb-6 text-left`}>
              <h3 className="font-medium mb-2 text-green-600">What's now available:</h3>
              <ul className="text-sm space-y-1">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  <span>Profile synchronization</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  <span>Content scheduling</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  <span>Real-time analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  <span>Professional networking</span>
                </li>
              </ul>
            </div>
            
            <div className="flex gap-3">
              <Button 
                onClick={handleGoToLinkedIn}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Go to LinkedIn
              </Button>
            </div>
            
            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-4`}>
              Redirecting automatically in 3 seconds...
            </p>
          </motion.div>
        )}
        
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-600" />
            <h2 className="text-2xl font-semibold mb-2 text-red-600">Connection Failed</h2>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              We couldn't connect your LinkedIn account. Please try again.
            </p>
            
            {error && (
              <div className={`p-4 rounded-lg ${isDark ? 'bg-red-900/20' : 'bg-red-50'} border ${isDark ? 'border-red-800' : 'border-red-200'} mb-6 text-left`}>
                <h3 className="font-medium mb-2 text-red-600">Error Details:</h3>
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
            
            <div className="flex gap-3">
              <Button
                onClick={handleRetry}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button 
                variant="outline"
                onClick={handleGoHome}
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </div>
            
            <div className={`mt-6 p-4 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'} text-left`}>
              <h3 className="font-medium mb-2">Common Solutions:</h3>
              <ul className="text-sm space-y-1">
                <li>• Make sure you're logged into LinkedIn</li>
                <li>• Check your internet connection</li>
                <li>• Try using a different browser</li>
                <li>• Clear your browser cache and cookies</li>
              </ul>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
