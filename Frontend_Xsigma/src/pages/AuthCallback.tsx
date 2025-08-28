import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase-simple';
import { useTheme } from '@/contexts/ThemeContext';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Processing authentication...');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the session from the URL hash
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          setStatus('error');
          setMessage(`Authentication failed: ${error.message}`);
          
          // Redirect to login after 3 seconds
          setTimeout(() => {
            navigate('/auth-test');
          }, 3000);
          return;
        }

        if (data.session) {
          setStatus('success');
          setMessage('Authentication successful! Redirecting...');
          
          // Give time for user profile creation
          setTimeout(() => {
            navigate('/auth-test');
          }, 2000);
        } else {
          setStatus('error');
          setMessage('No session found. Redirecting to login...');
          
          setTimeout(() => {
            navigate('/auth-test');
          }, 3000);
        }
      } catch (error: any) {
        console.error('Callback handling error:', error);
        setStatus('error');
        setMessage(`Error: ${error.message}`);
        
        setTimeout(() => {
          navigate('/auth-test');
        }, 3000);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`max-w-md w-full mx-4 p-8 rounded-lg shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="text-center">
          {/* XSigma Logo */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold" style={{ color: '#0A1F44' }}>
              XSigma
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Quantitative Finance Platform
            </p>
          </div>

          {/* Status Icon */}
          <div className="mb-6">
            {status === 'loading' && (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#00BFC4' }}></div>
              </div>
            )}
            
            {status === 'success' && (
              <div className="flex justify-center">
                <div className="rounded-full h-12 w-12 bg-green-100 flex items-center justify-center">
                  <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}
            
            {status === 'error' && (
              <div className="flex justify-center">
                <div className="rounded-full h-12 w-12 bg-red-100 flex items-center justify-center">
                  <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* Status Message */}
          <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {status === 'loading' && 'Authenticating...'}
            {status === 'success' && 'Welcome to XSigma!'}
            {status === 'error' && 'Authentication Failed'}
          </h2>

          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {message}
          </p>

          {/* Progress Indicator */}
          {status === 'loading' && (
            <div className="mt-6">
              <div className={`w-full bg-gray-200 rounded-full h-2 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div 
                  className="h-2 rounded-full transition-all duration-1000"
                  style={{ 
                    backgroundColor: '#00BFC4',
                    width: '60%',
                    animation: 'pulse 2s infinite'
                  }}
                ></div>
              </div>
            </div>
          )}

          {/* Manual Navigation */}
          {status === 'error' && (
            <div className="mt-6">
              <button
                onClick={() => navigate('/auth-test')}
                className="px-6 py-2 text-white rounded-lg transition-colors"
                style={{ backgroundColor: '#0A1F44' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#00BFC4'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0A1F44'}
              >
                Return to Login
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default AuthCallback;
