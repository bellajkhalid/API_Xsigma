// Example component showing how to use XSigma Supabase Authentication
import React, { useState, useEffect } from 'react';
import { authService } from '../../services/authService';
import type { User, AuthResult, LoginCredentials, CreateUserData } from '@/types/auth';

const AuthExample: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Login form state
  const [loginForm, setLoginForm] = useState<LoginCredentials>({
    email: '',
    password: ''
  });

  // Registration form state
  const [registerForm, setRegisterForm] = useState<CreateUserData>({
    email: '',
    password: '',
    username: '',
    firstName: '',
    lastName: '',
    company: '',
    jobTitle: '',
    department: '',
    phone: '',
    country: '',
    role: 'user'
  });

  // Check authentication status on component mount
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const result: AuthResult = await authService.login(loginForm);
      
      if (result.success && result.user) {
        setUser(result.user);
        setMessage('✅ Login successful!');
        setLoginForm({ email: '', password: '' });
      } else {
        setMessage(`❌ ${result.message}`);
      }
    } catch (error) {
      setMessage('❌ Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle registration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const result: AuthResult = await authService.register(registerForm);
      
      if (result.success) {
        setMessage('✅ Registration successful! Please check your email to verify your account.');
        setRegisterForm({
          email: '', password: '', username: '', firstName: '', lastName: '',
          company: '', jobTitle: '', department: '', phone: '', country: '', role: 'user'
        });
      } else {
        setMessage(`❌ ${result.message}`);
      }
    } catch (error) {
      setMessage('❌ Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
      setMessage('✅ Logged out successfully!');
    } catch (error) {
      setMessage('❌ Logout failed.');
    } finally {
      setLoading(false);
    }
  };

  // Handle password reset
  const handlePasswordReset = async () => {
    if (!loginForm.email) {
      setMessage('❌ Please enter your email address first.');
      return;
    }

    setLoading(true);
    try {
      const success = await authService.requestPasswordReset(loginForm.email);
      if (success) {
        setMessage('✅ Password reset email sent! Check your inbox.');
      } else {
        setMessage('❌ Failed to send password reset email.');
      }
    } catch (error) {
      setMessage('❌ Password reset failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          XSigma Authentication Demo
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Powered by Supabase - Enterprise-grade authentication for quantitative finance
        </p>
      </div>

      {/* Status Message */}
      {message && (
        <div className={`p-4 rounded-lg ${
          message.includes('✅') 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }`}>
          {message}
        </div>
      )}

      {/* User Status */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Authentication Status</h2>
        {user ? (
          <div className="space-y-2">
            <p><strong>Status:</strong> <span className="text-green-600">✅ Authenticated</span></p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Role:</strong> <span className="capitalize">{user.role}</span></p>
            <p><strong>Permissions:</strong> {user.permissions.join(', ')}</p>
            <p><strong>Name:</strong> {user.profile?.firstName} {user.profile?.lastName}</p>
            {user.profile?.company && <p><strong>Company:</strong> {user.profile.company}</p>}
            {user.profile?.department && <p><strong>Department:</strong> {user.profile.department}</p>}
            <button
              onClick={handleLogout}
              disabled={loading}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        ) : (
          <p><strong>Status:</strong> <span className="text-red-600">❌ Not authenticated</span></p>
        )}
      </div>

      {!user && (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Login Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
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
              <button
                type="button"
                onClick={handlePasswordReset}
                disabled={loading}
                className="w-full text-blue-600 hover:text-blue-800 text-sm"
              >
                Forgot Password?
              </button>
            </form>
          </div>

          {/* Registration Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Register</h2>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">First Name</label>
                  <input
                    type="text"
                    value={registerForm.firstName}
                    onChange={(e) => setRegisterForm({...registerForm, firstName: e.target.value})}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name</label>
                  <input
                    type="text"
                    value={registerForm.lastName}
                    onChange={(e) => setRegisterForm({...registerForm, lastName: e.target.value})}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Username</label>
                <input
                  type="text"
                  value={registerForm.username}
                  onChange={(e) => setRegisterForm({...registerForm, username: e.target.value})}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Company</label>
                <input
                  type="text"
                  value={registerForm.company}
                  onChange={(e) => setRegisterForm({...registerForm, company: e.target.value})}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
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

      {/* Usage Examples */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">How to Use in Your Components</h2>
        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-medium">1. Import the auth service:</h3>
            <code className="block bg-gray-100 dark:bg-gray-700 p-2 rounded mt-1">
              import {`{ authService }`} from '../services/authService';
            </code>
          </div>
          <div>
            <h3 className="font-medium">2. Check if user is authenticated:</h3>
            <code className="block bg-gray-100 dark:bg-gray-700 p-2 rounded mt-1">
              const isAuthenticated = authService.isAuthenticated();
            </code>
          </div>
          <div>
            <h3 className="font-medium">3. Get current user:</h3>
            <code className="block bg-gray-100 dark:bg-gray-700 p-2 rounded mt-1">
              const user = authService.getCurrentUser();
            </code>
          </div>
          <div>
            <h3 className="font-medium">4. Check permissions:</h3>
            <code className="block bg-gray-100 dark:bg-gray-700 p-2 rounded mt-1">
              const canAccess = authService.hasPermission('admin');
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthExample;
