import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase-simple';
import Navigation from '@/components/Navigation';
import { useTheme } from '@/contexts/ThemeContext';

const OAuthSetup: React.FC = () => {
  const { isDark } = useTheme();
  const [setupStatus, setSetupStatus] = useState({
    database: 'checking',
    google: 'checking',
    github: 'checking',
    overall: 'checking'
  });
  const [testResults, setTestResults] = useState<any[]>([]);

  useEffect(() => {
    checkSetupStatus();
  }, []);

  const checkSetupStatus = async () => {
    const results = [];
    
    // Check database connection
    try {
      const { data, error } = await supabase.from('user_profiles').select('count').limit(1);
      if (error) {
        results.push({ test: 'Database Schema', status: 'error', message: error.message });
        setSetupStatus(prev => ({ ...prev, database: 'error' }));
      } else {
        results.push({ test: 'Database Schema', status: 'success', message: 'Tables exist and accessible' });
        setSetupStatus(prev => ({ ...prev, database: 'success' }));
      }
    } catch (error: any) {
      results.push({ test: 'Database Schema', status: 'error', message: error.message });
      setSetupStatus(prev => ({ ...prev, database: 'error' }));
    }

    // Test OAuth providers by attempting to get auth URL
    try {
      const { data: googleData, error: googleError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: 'http://localhost:5173/oauth-setup' }
      });
      
      if (googleError) {
        results.push({ test: 'Google OAuth', status: 'error', message: 'Provider not configured in Supabase' });
        setSetupStatus(prev => ({ ...prev, google: 'error' }));
      } else {
        results.push({ test: 'Google OAuth', status: 'success', message: 'Provider configured and ready' });
        setSetupStatus(prev => ({ ...prev, google: 'success' }));
      }
    } catch (error: any) {
      results.push({ test: 'Google OAuth', status: 'error', message: 'Provider not configured' });
      setSetupStatus(prev => ({ ...prev, google: 'error' }));
    }

    try {
      const { data: githubData, error: githubError } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: { redirectTo: 'http://localhost:5173/oauth-setup' }
      });
      
      if (githubError) {
        results.push({ test: 'GitHub OAuth', status: 'error', message: 'Provider not configured in Supabase' });
        setSetupStatus(prev => ({ ...prev, github: 'error' }));
      } else {
        results.push({ test: 'GitHub OAuth', status: 'success', message: 'Provider configured and ready' });
        setSetupStatus(prev => ({ ...prev, github: 'success' }));
      }
    } catch (error: any) {
      results.push({ test: 'GitHub OAuth', status: 'error', message: 'Provider not configured' });
      setSetupStatus(prev => ({ ...prev, github: 'error' }));
    }

    setTestResults(results);
    
    // Determine overall status
    const allSuccess = results.every(r => r.status === 'success');
    setSetupStatus(prev => ({ ...prev, overall: allSuccess ? 'success' : 'error' }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <span className="text-green-500">✅</span>;
      case 'error':
        return <span className="text-red-500">❌</span>;
      case 'checking':
        return <span className="text-yellow-500">🔄</span>;
      default:
        return <span className="text-gray-500">⏳</span>;
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-3xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
            XSigma OAuth Configuration
          </h1>

          {/* Overall Status */}
          <div className={`p-6 rounded-lg shadow-md mb-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Setup Status
              </h2>
              <button
                onClick={checkSetupStatus}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Refresh Status
              </button>
            </div>
            
            <div className="space-y-3">
              {testResults.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded bg-gray-50 dark:bg-gray-700">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(result.status)}
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {result.test}
                    </span>
                  </div>
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {result.message}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Configuration Instructions */}
          <div className={`p-6 rounded-lg shadow-md mb-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              🔧 Quick Setup Instructions
            </h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Step 1: Create OAuth Apps First
                </h3>
                <p className={`text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  You need to create OAuth applications before configuring Supabase:
                </p>
                <div className="space-y-2">
                  <a
                    href="https://console.developers.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm mr-2"
                  >
                    Create Google OAuth App →
                  </a>
                  <a
                    href="https://github.com/settings/applications/new"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors text-sm"
                  >
                    Create GitHub OAuth App →
                  </a>
                </div>
                <p className={`text-xs mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Use these URLs: <strong>Development:</strong> http://localhost:5173 | <strong>Production:</strong> https://xsigma.co.uk
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Step 2: Configure Supabase OAuth
                </h3>
                <p className={`text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  After creating OAuth apps, configure them in Supabase:
                </p>
                <a
                  href="https://supabase.com/dashboard/project/hsatlffikgtosuvwgxrn/auth/providers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors mb-2"
                >
                  Open Supabase Auth Providers →
                </a>
                <ul className={`text-sm space-y-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• Enable Google: Toggle ON, enter Client ID & Secret</li>
                  <li>• Enable GitHub: Toggle ON, enter Client ID & Secret</li>
                  <li>• Click "Save" for each provider</li>
                </ul>
              </div>

              <div className="border-l-4 border-yellow-500 pl-4">
                <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Step 3: Test OAuth Configuration
                </h3>
                <p className={`text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  After configuring both providers, test the OAuth flow:
                </p>
                <div className="space-y-2">
                  <button
                    onClick={checkSetupStatus}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors mr-2"
                  >
                    Refresh Status
                  </button>
                  <a
                    href="/auth-test"
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    Test OAuth Authentication →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {setupStatus.overall === 'success' && (
            <div className="p-6 rounded-lg shadow-md bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🎉</span>
                <div>
                  <h3 className="font-semibold text-green-800 dark:text-green-200">
                    OAuth Configuration Complete!
                  </h3>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Your XSigma authentication system is ready. Users can now sign in with Google, GitHub, or email/password.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Technical Details */}
          <div className={`mt-8 p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <h3 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              🔧 Technical Configuration Details:
            </h3>
            <div className={`text-sm space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <p><strong>Redirect URL:</strong> https://hsatlffikgtosuvwgxrn.supabase.co/auth/v1/callback</p>
              <p><strong>Development URL:</strong> http://localhost:5173</p>
              <p><strong>Production URL:</strong> https://xsigma.co.uk</p>
              <p><strong>Database:</strong> User profiles, permissions, and audit logs configured</p>
              <p><strong>OAuth Flow:</strong> PKCE with automatic profile creation</p>
              <p><strong>Permissions:</strong> OAuth users get 'api' and 'analytics' permissions by default</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OAuthSetup;
