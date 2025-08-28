import React, { useState, useEffect } from 'react';
import { authService } from '../services/authService-simple';
import Navigation from '@/components/Navigation';
import { useTheme } from '@/contexts/ThemeContext';

const AuthTest: React.FC = () => {
  const { isDark } = useTheme();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [supabaseStatus, setSupabaseStatus] = useState('Checking...');

  // Login form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Registration form
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regFirstName, setRegFirstName] = useState('');
  const [regLastName, setRegLastName] = useState('');

  useEffect(() => {
    // Check Supabase connection
    const checkSupabase = async () => {
      try {
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);
        
        if (currentUser) {
          setSupabaseStatus('✅ Connected - User authenticated');
        } else {
          setSupabaseStatus('✅ Connected - No user authenticated');
        }
      } catch (error) {
        console.error('Supabase connection error:', error);
        setSupabaseStatus('❌ Connection failed - Check environment variables');
      }
    };

    checkSupabase();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const result = await authService.login({ email, password });
      
      if (result.success && result.user) {
        setUser(result.user);
        setMessage('✅ Login successful!');
        setEmail('');
        setPassword('');
      } else {
        setMessage(`❌ ${result.message}`);
      }
    } catch (error: any) {
      setMessage(`❌ Login error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const result = await authService.register({
        email: regEmail,
        password: regPassword,
        username: regUsername,
        firstName: regFirstName,
        lastName: regLastName,
        role: 'user'
      });
      
      if (result.success) {
        setMessage('✅ Registration successful! Check your email to verify your account.');
        setRegEmail('');
        setRegPassword('');
        setRegUsername('');
        setRegFirstName('');
        setRegLastName('');
      } else {
        setMessage(`❌ ${result.message}`);
      }
    } catch (error: any) {
      setMessage(`❌ Registration error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
      setMessage('✅ Logged out successfully!');
    } catch (error: any) {
      setMessage(`❌ Logout error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              XSigma Authentication Test
            </h1>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Testing Supabase authentication integration
            </p>
          </div>

          {/* Supabase Status */}
          <div className={`p-4 rounded-lg mb-6 ${
            supabaseStatus.includes('✅') 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            <h3 className="font-semibold">Supabase Status:</h3>
            <p>{supabaseStatus}</p>
          </div>

          {/* Message Display */}
          {message && (
            <div className={`p-4 rounded-lg mb-6 ${
              message.includes('✅') 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
              {message}
            </div>
          )}

          {/* User Status */}
          <div className={`p-6 rounded-lg shadow-md mb-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Authentication Status
            </h2>
            {user ? (
              <div className="space-y-2">
                <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  <strong>Status:</strong> <span className="text-green-600">✅ Authenticated</span>
                </p>
                <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  <strong>Email:</strong> {user.email}
                </p>
                <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  <strong>Username:</strong> {user.username}
                </p>
                <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  <strong>Role:</strong> <span className="capitalize">{user.role}</span>
                </p>
                <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  <strong>Permissions:</strong> {user.permissions?.join(', ') || 'None'}
                </p>
                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
                >
                  {loading ? 'Logging out...' : 'Logout'}
                </button>
              </div>
            ) : (
              <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                <strong>Status:</strong> <span className="text-red-600">❌ Not authenticated</span>
              </p>
            )}
          </div>

          {!user && (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Login Form */}
              <div className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Login
                </h2>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full p-2 border rounded ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      required
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full p-2 border rounded ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </button>
                </form>
              </div>

              {/* Registration Form */}
              <div className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Register
                </h2>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        First Name
                      </label>
                      <input
                        type="text"
                        value={regFirstName}
                        onChange={(e) => setRegFirstName(e.target.value)}
                        className={`w-full p-2 border rounded ${
                          isDark 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        required
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={regLastName}
                        onChange={(e) => setRegLastName(e.target.value)}
                        className={`w-full p-2 border rounded ${
                          isDark 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Username
                    </label>
                    <input
                      type="text"
                      value={regUsername}
                      onChange={(e) => setRegUsername(e.target.value)}
                      className={`w-full p-2 border rounded ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      required
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Email
                    </label>
                    <input
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className={`w-full p-2 border rounded ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      required
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Password
                    </label>
                    <input
                      type="password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className={`w-full p-2 border rounded ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
                  >
                    {loading ? 'Registering...' : 'Register'}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className={`mt-8 p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <h3 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Next Steps:
            </h3>
            <ol className={`list-decimal list-inside space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>Make sure you've run the database schema in Supabase SQL Editor</li>
              <li>Try registering a new user</li>
              <li>Check your email for verification (if configured)</li>
              <li>Try logging in with the registered user</li>
              <li>Check the Supabase dashboard to see the user data</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthTest;
