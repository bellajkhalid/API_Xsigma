import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navigation from "@/components/Navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/authService";
import type { User } from "@/types/auth";
import {
  User as UserIcon, Settings, Key, CreditCard, FileText, LogOut,
  Eye, EyeOff, Copy, Check, TrendingUp, Activity,
  AlertTriangle, Shield, Zap, Globe, Clock, Download,
  BarChart3, PieChart, LineChart, RefreshCw, Bell,
  ChevronRight, ExternalLink, Plus, Trash2, Edit3,
  Webhook, Users, BookOpen, Code, Send, Pause, Play,
  UserPlus, Crown, Mail, Slack, Github
} from "lucide-react";
import {
  LineChart as RechartsLineChart,
  AreaChart,
  BarChart as RechartsBarChart,
  PieChart as RechartsPieChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  Bar,
  Line,
  Cell,
  Pie
} from 'recharts';

export default function Account() {
  const { isDark } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [showApiKeys, setShowApiKeys] = useState({});
  const [copiedKey, setCopiedKey] = useState('');
  const [realTimeData, setRealTimeData] = useState({
    apiCalls: 847234,
    dataTransfer: 15.3,
    uptime: 99.97,
    latency: 23,
    errors: 12,
    activeConnections: 156
  });

  // User management states
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUserForm, setNewUserForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user' as 'admin' | 'user',
    firstName: '',
    lastName: '',
    department: '',
    phone: ''
  });
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'warning', message: 'API rate limit approaching (85% used)', time: '2 min ago' },
    { id: 2, type: 'success', message: 'New API key generated successfully', time: '1 hour ago' },
    { id: 3, type: 'info', message: 'Monthly usage report available', time: '3 hours ago' }
  ]);

  // Chart data
  const [chartData] = useState({
    apiUsage: Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      calls: Math.floor(Math.random() * 50000) + 20000,
      errors: Math.floor(Math.random() * 100) + 10,
      latency: Math.floor(Math.random() * 50) + 20
    })),
    endpointUsage: [
      { name: '/api/analytical-sigma', value: 45, calls: 234000 },
      { name: '/api/fx-volatility', value: 30, calls: 156000 },
      { name: '/api/hartman-watson', value: 17, calls: 89000 },
      { name: '/api/zabr-variables', value: 8, calls: 42000 }
    ]
  });

  // Webhooks state
  const [webhooks, setWebhooks] = useState([
    {
      id: 1,
      url: 'https://api.mycompany.com/webhooks/xsigma',
      events: ['api.request', 'api.error'],
      status: 'active',
      lastDelivery: '2 min ago',
      successRate: 99.8
    },
    {
      id: 2,
      url: 'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX',
      events: ['billing.invoice', 'security.alert'],
      status: 'active',
      lastDelivery: '1 hour ago',
      successRate: 100
    }
  ]);

  // Team members state
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@company.com',
      role: 'Owner',
      status: 'active',
      lastActive: 'Now',
      permissions: ['admin', 'billing', 'api']
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@company.com',
      role: 'Developer',
      status: 'active',
      lastActive: '2 hours ago',
      permissions: ['api', 'analytics']
    },
    {
      id: 3,
      name: 'Bob Wilson',
      email: 'bob@company.com',
      role: 'Viewer',
      status: 'pending',
      lastActive: 'Never',
      permissions: ['analytics']
    }
  ]);

  // Check authentication on component mount
  useEffect(() => {
    if (authService.isAuthenticated()) {
      const user = authService.getCurrentUser();
      if (user) {
        setIsLoggedIn(true);
        setCurrentUser(user);
        loadUsers();
      }
    }
  }, []);

  // Real-time data simulation
  useEffect(() => {
    if (!isLoggedIn) return;

    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        apiCalls: prev.apiCalls + Math.floor(Math.random() * 50),
        dataTransfer: prev.dataTransfer + Math.random() * 0.1,
        latency: 20 + Math.random() * 10,
        activeConnections: 150 + Math.floor(Math.random() * 20)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [isLoggedIn]);

  // Load users (admin only)
  const loadUsers = async () => {
    try {
      const users = authService.getAllUsers();
      setAllUsers(users);
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const result = await authService.login(loginForm.email, loginForm.password);

    if (result.success && result.user) {
      setIsLoggedIn(true);
      setCurrentUser(result.user);
      setLoginForm({ email: '', password: '' });
      loadUsers();
    } else {
      setLoginError(result.error || 'Login failed');
    }
  };

  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
    setCurrentUser(null);
    setAllUsers([]);
    setLoginForm({ email: '', password: '' });
    setActiveTab('dashboard');
  };

  // Add new user
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await authService.addUser({
      username: newUserForm.username,
      email: newUserForm.email,
      role: newUserForm.role,
      permissions: newUserForm.role === 'admin'
        ? ['admin', 'billing', 'api', 'analytics', 'user_management', 'system_settings']
        : ['api', 'analytics'],
      isActive: true,
      profile: {
        firstName: newUserForm.firstName,
        lastName: newUserForm.lastName,
        department: newUserForm.department,
        phone: newUserForm.phone
      },
      password: newUserForm.password
    });

    if (result.success) {
      setShowAddUser(false);
      setNewUserForm({
        username: '',
        email: '',
        password: '',
        role: 'user',
        firstName: '',
        lastName: '',
        department: '',
        phone: ''
      });
      loadUsers();
    } else {
      alert(result.error);
    }
  };

  // Delete user
  const handleDeleteUser = async (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      const result = authService.deleteUser(userId);
      if (result.success) {
        loadUsers();
      } else {
        alert(result.error);
      }
    }
  };

  // Change password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    const result = await authService.changePassword(
      passwordForm.currentPassword,
      passwordForm.newPassword
    );

    if (result.success) {
      setShowChangePassword(false);
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      alert('Password changed successfully');
    } else {
      alert(result.error);
    }
  };

  const copyToClipboard = (text: string, keyId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyId);
    setTimeout(() => setCopiedKey(''), 2000);
  };

  const toggleApiKeyVisibility = (keyId: string) => {
    setShowApiKeys(prev => ({ ...prev, [keyId]: !prev[keyId] }));
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, badge: null },
    { id: 'profile', label: 'Profile', icon: UserIcon, badge: null },
    ...(currentUser?.role === 'admin' ? [
      { id: 'users', label: 'User Management', icon: UserPlus, badge: allUsers.length.toString() }
    ] : []),
    { id: 'api', label: 'API Keys', icon: Key, badge: '3' },
    { id: 'webhooks', label: 'Webhooks', icon: Webhook, badge: webhooks.length.toString() },
    { id: 'team', label: 'Team', icon: Users, badge: teamMembers.filter(m => m.status === 'pending').length.toString() || null },
    { id: 'docs', label: 'API Docs', icon: BookOpen, badge: null },
    { id: 'billing', label: 'Billing', icon: CreditCard, badge: null },
    { id: 'usage', label: 'Analytics', icon: TrendingUp, badge: null },
    { id: 'security', label: 'Security', icon: Shield, badge: '2' },
    { id: 'settings', label: 'Settings', icon: Settings, badge: null },
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <ThemeToggle />
      <Navigation />

      <section className="relative pt-28 pb-16 min-h-[40vh]">
        <AnimatedBackground />
        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-light mb-2">Account</h1>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
              {isLoggedIn ? 'Manage your XSigma account and API access.' : 'Sign in to access your XSigma developer account.'}
            </p>
          </div>
        </div>
      </section>

      <section className={`${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-16`}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {!isLoggedIn ? (
                // Enhanced Login Form
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`max-w-md mx-auto p-8 rounded-xl border ${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} shadow-2xl`}
                >
                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${isDark ? 'bg-blue-900' : 'bg-blue-100'} flex items-center justify-center`}>
                      <UserIcon className={`w-8 h-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                    <h2 className="text-2xl font-light mb-2">Welcome Back</h2>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Sign in to your XSigma developer account</p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-6">
                    {loginError && (
                      <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                        {loginError}
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address</label>
                      <input
                        type="email"
                        required
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-900 border-gray-700 focus:border-blue-500' : 'bg-white border-gray-300 focus:border-blue-500'} focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all`}
                        placeholder="your.email@xsigma.co.uk"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Password</label>
                      <input
                        type="password"
                        required
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-900 border-gray-700 focus:border-blue-500' : 'bg-white border-gray-300 focus:border-blue-500'} focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all`}
                        placeholder="••••••••"
                      />
                    </div>



                    <div className="flex items-center justify-between">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded" />
                        <span className={`ml-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Remember me</span>
                      </label>
                      <button type="button" className={`text-sm ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
                        Forgot password?
                      </button>
                    </div>

                    <Button className={`w-full py-3 ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'} rounded-lg font-medium transition-all`}>
                      Sign In
                    </Button>
                  </form>

                  <div className="mt-8 text-center">
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Don't have an account?{' '}
                      <button
                        onClick={() => window.location.href = '/register-interest'}
                        className={`${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} font-medium`}
                      >
                        Register Interest
                      </button>
                    </p>
                  </div>
                </motion.div>
              ) : (
                // Enhanced Account Dashboard
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid md:grid-cols-4 gap-8"
                >
                  {/* Enhanced Sidebar */}
                  <div className={`md:col-span-1 space-y-6`}>
                    {/* User Profile Card */}
                    <div className={`p-6 rounded-xl border ${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}>
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-full ${isDark ? 'bg-blue-900' : 'bg-blue-100'} flex items-center justify-center`}>
                          {currentUser?.role === 'admin' ? (
                            <Crown className={`w-6 h-6 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} />
                          ) : (
                            <UserIcon className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">
                            {currentUser?.profile.firstName} {currentUser?.profile.lastName}
                          </div>
                          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {currentUser?.role === 'admin' ? 'Administrator' : 'Developer Pro'} • {currentUser?.profile.department}
                          </div>
                        </div>
                      </div>
                      <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mb-2`}>Account Status</div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className={`text-sm ${isDark ? 'text-green-400' : 'text-green-600'}`}>Active</span>
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className={`p-4 rounded-xl border ${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}>
                      <div className="space-y-1">
                        {tabs.map((tab) => {
                          const Icon = tab.icon;
                          return (
                            <motion.button
                              key={tab.id}
                              onClick={() => setActiveTab(tab.id)}
                              whileHover={{ x: 4 }}
                              whileTap={{ scale: 0.98 }}
                              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all ${
                                activeTab === tab.id
                                  ? isDark ? 'bg-blue-900/50 text-blue-400 border border-blue-800' : 'bg-blue-50 text-blue-600 border border-blue-200'
                                  : isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-black hover:bg-gray-50'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <Icon className="w-4 h-4" />
                                {tab.label}
                              </div>
                              {tab.badge && (
                                <span className={`px-2 py-1 text-xs rounded-full ${isDark ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-600'}`}>
                                  {tab.badge}
                                </span>
                              )}
                            </motion.button>
                          );
                        })}
                        <motion.button
                          onClick={handleLogout}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all mt-4 border-t ${isDark ? 'border-gray-700 text-red-400 hover:text-red-300 hover:bg-red-900/20' : 'border-gray-200 text-red-600 hover:text-red-700 hover:bg-red-50'}`}
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className={`md:col-span-3 space-y-6`}>
                    <AnimatePresence mode="wait">
                      {activeTab === 'dashboard' && (
                        <motion.div
                          key="dashboard"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="space-y-6"
                        >
                          {/* Real-time Metrics */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                              { label: 'API Calls', value: realTimeData.apiCalls.toLocaleString(), change: '+12%', icon: Activity, color: 'blue' },
                              { label: 'Data Transfer', value: `${realTimeData.dataTransfer.toFixed(1)}GB`, change: '+8%', icon: Globe, color: 'green' },
                              { label: 'Avg Latency', value: `${realTimeData.latency.toFixed(0)}ms`, change: '-5%', icon: Zap, color: 'yellow' },
                              { label: 'Uptime', value: `${realTimeData.uptime}%`, change: '+0.1%', icon: Shield, color: 'emerald' }
                            ].map((metric, i) => {
                              const Icon = metric.icon;
                              return (
                                <motion.div
                                  key={metric.label}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                  className={`p-4 rounded-xl border ${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <Icon className={`w-5 h-5 text-${metric.color}-500`} />
                                    <span className={`text-xs px-2 py-1 rounded-full ${metric.change.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                      {metric.change}
                                    </span>
                                  </div>
                                  <div className="text-2xl font-semibold mb-1">{metric.value}</div>
                                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{metric.label}</div>
                                </motion.div>
                              );
                            })}
                          </div>

                          {/* Notifications */}
                          <div className={`p-6 rounded-xl border ${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}>
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-lg font-medium flex items-center gap-2">
                                <Bell className="w-5 h-5" />
                                Recent Activity
                              </h3>
                              <Button variant="ghost" size="sm">
                                <RefreshCw className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="space-y-3">
                              {notifications.map((notif) => (
                                <motion.div
                                  key={notif.id}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  className={`flex items-start gap-3 p-3 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}
                                >
                                  <div className={`w-2 h-2 rounded-full mt-2 ${
                                    notif.type === 'warning' ? 'bg-yellow-500' :
                                    notif.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                                  }`} />
                                  <div className="flex-1">
                                    <div className="text-sm">{notif.message}</div>
                                    <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-1`}>{notif.time}</div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Quick Actions */}
                          <div className={`p-6 rounded-xl border ${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}>
                            <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              {[
                                { label: 'Generate API Key', icon: Plus, action: () => setActiveTab('api') },
                                { label: 'View Analytics', icon: BarChart3, action: () => setActiveTab('usage') },
                                { label: 'Download Logs', icon: Download, action: () => {} },
                                { label: 'Contact Support', icon: ExternalLink, action: () => {} }
                              ].map((action) => {
                                const Icon = action.icon;
                                return (
                                  <motion.button
                                    key={action.label}
                                    onClick={action.action}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`p-4 rounded-lg border ${isDark ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'} transition-all text-left`}
                                  >
                                    <Icon className="w-5 h-5 mb-2" />
                                    <div className="text-sm font-medium">{action.label}</div>
                                  </motion.button>
                                );
                              })}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {activeTab === 'profile' && (
                        <motion.div
                          key="profile"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className={`p-6 rounded-xl border ${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}
                        >
                          <div>
                            <h3 className="text-xl font-medium mb-6">Profile Settings</h3>
                            <div className="space-y-6">
                              {/* Profile Picture */}
                              <div className="flex items-center gap-6">
                                <div className={`w-20 h-20 rounded-full ${isDark ? 'bg-blue-900' : 'bg-blue-100'} flex items-center justify-center`}>
                                  <UserIcon className={`w-10 h-10 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                                </div>
                                <div>
                                  <Button variant="outline" size="sm" className="mr-2">
                                    Upload Photo
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    Remove
                                  </Button>
                                </div>
                              </div>

                              {/* Form Fields */}
                              <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                  <label className="block text-sm font-medium mb-2">First Name</label>
                                  <input
                                    defaultValue="John"
                                    className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-900 border-gray-700 focus:border-blue-500' : 'bg-white border-gray-300 focus:border-blue-500'} focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all`}
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium mb-2">Last Name</label>
                                  <input
                                    defaultValue="Doe"
                                    className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-900 border-gray-700 focus:border-blue-500' : 'bg-white border-gray-300 focus:border-blue-500'} focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all`}
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-medium mb-2">Email Address</label>
                                <input
                                  defaultValue="john.doe@company.com"
                                  className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-900 border-gray-700 focus:border-blue-500' : 'bg-white border-gray-300 focus:border-blue-500'} focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all`}
                                />
                              </div>

                              <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                  <label className="block text-sm font-medium mb-2">Company</label>
                                  <input
                                    defaultValue="Acme Corp"
                                    className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-900 border-gray-700 focus:border-blue-500' : 'bg-white border-gray-300 focus:border-blue-500'} focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all`}
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium mb-2">Job Title</label>
                                  <input
                                    defaultValue="Senior Developer"
                                    className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-900 border-gray-700 focus:border-blue-500' : 'bg-white border-gray-300 focus:border-blue-500'} focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all`}
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-medium mb-2">Bio</label>
                                <textarea
                                  rows={4}
                                  defaultValue="Experienced developer working on quantitative finance applications."
                                  className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-900 border-gray-700 focus:border-blue-500' : 'bg-white border-gray-300 focus:border-blue-500'} focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all`}
                                />
                              </div>

                              <div className="flex gap-4">
                                <Button className={`${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'} rounded-lg px-6`}>
                                  Save Changes
                                </Button>
                                <Button variant="outline" className="rounded-lg px-6">
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* User Management Tab (Admin Only) */}
                      {activeTab === 'users' && currentUser?.role === 'admin' && (
                        <motion.div
                          key="users"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="space-y-6"
                        >
                          {/* Header with Add User Button */}
                          <div className={`p-6 rounded-xl border ${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}>
                            <div className="flex items-center justify-between mb-6">
                              <div>
                                <h3 className="text-xl font-medium flex items-center gap-2">
                                  <UserPlus className="w-5 h-5" />
                                  User Management
                                </h3>
                                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                                  Manage user accounts and permissions
                                </p>
                              </div>
                              <Button
                                onClick={() => setShowAddUser(true)}
                                className={`${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'} rounded-lg px-4`}
                              >
                                <Plus className="w-4 h-4 mr-2" />
                                Add User
                              </Button>
                            </div>

                            {/* Users Table */}
                            <div className="overflow-x-auto">
                              <table className="w-full">
                                <thead>
                                  <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                                    <th className="text-left py-3 px-4 font-medium">User</th>
                                    <th className="text-left py-3 px-4 font-medium">Role</th>
                                    <th className="text-left py-3 px-4 font-medium">Department</th>
                                    <th className="text-left py-3 px-4 font-medium">Status</th>
                                    <th className="text-left py-3 px-4 font-medium">Last Login</th>
                                    <th className="text-left py-3 px-4 font-medium">Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {allUsers.map((user) => (
                                    <tr key={user.id} className={`border-b ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
                                      <td className="py-4 px-4">
                                        <div className="flex items-center gap-3">
                                          <div className={`w-8 h-8 rounded-full ${isDark ? 'bg-blue-900' : 'bg-blue-100'} flex items-center justify-center`}>
                                            {user.role === 'admin' ? (
                                              <Crown className={`w-4 h-4 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} />
                                            ) : (
                                              <UserIcon className={`w-4 h-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                                            )}
                                          </div>
                                          <div>
                                            <div className="font-medium">
                                              {user.profile.firstName} {user.profile.lastName}
                                            </div>
                                            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                              {user.email}
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="py-4 px-4">
                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                          user.role === 'admin'
                                            ? isDark ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-600'
                                            : isDark ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-600'
                                        }`}>
                                          {user.role === 'admin' ? 'Administrator' : 'User'}
                                        </span>
                                      </td>
                                      <td className="py-4 px-4">
                                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                          {user.profile.department || 'N/A'}
                                        </span>
                                      </td>
                                      <td className="py-4 px-4">
                                        <div className="flex items-center gap-2">
                                          <div className={`w-2 h-2 rounded-full ${user.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                          <span className={`text-sm ${user.isActive ? 'text-green-600' : 'text-red-600'}`}>
                                            {user.isActive ? 'Active' : 'Inactive'}
                                          </span>
                                        </div>
                                      </td>
                                      <td className="py-4 px-4">
                                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                          {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                                        </span>
                                      </td>
                                      <td className="py-4 px-4">
                                        <div className="flex items-center gap-2">
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="p-2"
                                          >
                                            <Edit3 className="w-4 h-4" />
                                          </Button>
                                          {user.id !== currentUser?.id && (
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              className="p-2 text-red-600 hover:text-red-700"
                                              onClick={() => handleDeleteUser(user.id)}
                                            >
                                              <Trash2 className="w-4 h-4" />
                                            </Button>
                                          )}
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>

                          {/* Add User Modal */}
                          {showAddUser && (
                            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`max-w-md w-full mx-4 p-6 rounded-xl border ${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} shadow-2xl`}
                              >
                                <h3 className="text-lg font-medium mb-4">Add New User</h3>
                                <form onSubmit={handleAddUser} className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="block text-sm font-medium mb-1">First Name</label>
                                      <input
                                        required
                                        value={newUserForm.firstName}
                                        onChange={(e) => setNewUserForm({ ...newUserForm, firstName: e.target.value })}
                                        className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium mb-1">Last Name</label>
                                      <input
                                        required
                                        value={newUserForm.lastName}
                                        onChange={(e) => setNewUserForm({ ...newUserForm, lastName: e.target.value })}
                                        className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium mb-1">Username</label>
                                    <input
                                      required
                                      value={newUserForm.username}
                                      onChange={(e) => setNewUserForm({ ...newUserForm, username: e.target.value })}
                                      className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium mb-1">Email</label>
                                    <input
                                      type="email"
                                      required
                                      value={newUserForm.email}
                                      onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                                      className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium mb-1">Password</label>
                                    <input
                                      type="password"
                                      required
                                      value={newUserForm.password}
                                      onChange={(e) => setNewUserForm({ ...newUserForm, password: e.target.value })}
                                      className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                    />
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="block text-sm font-medium mb-1">Role</label>
                                      <select
                                        value={newUserForm.role}
                                        onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value as 'admin' | 'user' })}
                                        className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                      >
                                        <option value="user">User</option>
                                        <option value="admin">Administrator</option>
                                      </select>
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium mb-1">Department</label>
                                      <input
                                        value={newUserForm.department}
                                        onChange={(e) => setNewUserForm({ ...newUserForm, department: e.target.value })}
                                        className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                      />
                                    </div>
                                  </div>
                                  <div className="flex gap-3 pt-4">
                                    <Button
                                      type="submit"
                                      className={`flex-1 ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'} rounded-lg`}
                                    >
                                      Add User
                                    </Button>
                                    <Button
                                      type="button"
                                      variant="outline"
                                      onClick={() => setShowAddUser(false)}
                                      className="flex-1 rounded-lg"
                                    >
                                      Cancel
                                    </Button>
                                  </div>
                                </form>
                              </motion.div>
                            </div>
                          )}
                        </motion.div>
                      )}

                      {activeTab === 'api' && (
                        <motion.div
                          key="api"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className={`p-6 rounded-xl border ${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-6">
                              <h3 className="text-xl font-medium">API Keys Management</h3>
                              <Button className={`${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'} rounded-lg`}>
                                <Plus className="w-4 h-4 mr-2" />
                                Generate New Key
                              </Button>
                            </div>

                            <div className="space-y-4">
                              {[
                                {
                                  id: 'prod',
                                  name: 'Production Key',
                                  key: 'xsig_prod_sk_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p',
                                  status: 'active',
                                  created: '2024-01-15',
                                  lastUsed: '2 hours ago',
                                  permissions: ['read', 'write', 'admin']
                                },
                                {
                                  id: 'dev',
                                  name: 'Development Key',
                                  key: 'xsig_dev_sk_9z8y7x6w5v4u3t2s1r0q9p8o7n6m5l4k',
                                  status: 'active',
                                  created: '2024-01-10',
                                  lastUsed: '5 minutes ago',
                                  permissions: ['read', 'write']
                                },
                                {
                                  id: 'test',
                                  name: 'Testing Key',
                                  key: 'xsig_test_sk_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
                                  status: 'inactive',
                                  created: '2024-01-05',
                                  lastUsed: '3 days ago',
                                  permissions: ['read']
                                }
                              ].map((apiKey) => (
                                <motion.div
                                  key={apiKey.id}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className={`p-6 rounded-xl border ${isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}
                                >
                                  <div className="flex items-start justify-between mb-4">
                                    <div>
                                      <div className="flex items-center gap-3 mb-2">
                                        <span className="font-medium">{apiKey.name}</span>
                                        <span className={`text-xs px-2 py-1 rounded-full ${
                                          apiKey.status === 'active'
                                            ? isDark ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                                            : isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600'
                                        }`}>
                                          {apiKey.status}
                                        </span>
                                      </div>
                                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} space-y-1`}>
                                        <div>Created: {apiKey.created}</div>
                                        <div>Last used: {apiKey.lastUsed}</div>
                                      </div>
                                    </div>
                                    <div className="flex gap-2">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => toggleApiKeyVisibility(apiKey.id)}
                                      >
                                        {showApiKeys[apiKey.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => copyToClipboard(apiKey.key, apiKey.id)}
                                      >
                                        {copiedKey === apiKey.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                      </Button>
                                      <Button variant="ghost" size="sm">
                                        <Edit3 className="w-4 h-4" />
                                      </Button>
                                      <Button variant="ghost" size="sm" className="text-red-500">
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </div>

                                  <div className={`p-3 rounded-lg ${isDark ? 'bg-black' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'} mb-4`}>
                                    <code className={`text-sm font-mono ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                      {showApiKeys[apiKey.id] ? apiKey.key : apiKey.key.replace(/sk_[a-zA-Z0-9]+/, 'sk_••••••••••••••••••••••••••••••••')}
                                    </code>
                                  </div>

                                  <div className="flex items-center gap-4">
                                    <div>
                                      <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mb-1`}>Permissions</div>
                                      <div className="flex gap-1">
                                        {apiKey.permissions.map((perm) => (
                                          <span key={perm} className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-600'}`}>
                                            {perm}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>

                            {/* API Usage Guidelines */}
                            <div className={`mt-6 p-4 rounded-lg ${isDark ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
                              <h4 className="font-medium mb-2 flex items-center gap-2">
                                <Shield className="w-4 h-4" />
                                Security Best Practices
                              </h4>
                              <ul className={`text-sm ${isDark ? 'text-blue-300' : 'text-blue-700'} space-y-1`}>
                                <li>• Never share your API keys in public repositories</li>
                                <li>• Use environment variables to store keys securely</li>
                                <li>• Rotate keys regularly for enhanced security</li>
                                <li>• Use different keys for different environments</li>
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {activeTab === 'webhooks' && (
                        <motion.div
                          key="webhooks"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className={`p-6 rounded-xl border ${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}
                        >
                          <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-medium">Webhook Management</h3>
                            <Button className={`${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'} rounded-lg`}>
                              <Plus className="w-4 h-4 mr-2" />
                              Add Webhook
                            </Button>
                          </div>

                          <div className="space-y-4 mb-6">
                            {webhooks.map((webhook) => (
                              <motion.div
                                key={webhook.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`p-6 rounded-xl border ${isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}
                              >
                                <div className="flex items-start justify-between mb-4">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                      <Webhook className="w-5 h-5" />
                                      <span className="font-medium">Webhook #{webhook.id}</span>
                                      <span className={`text-xs px-2 py-1 rounded-full ${
                                        webhook.status === 'active'
                                          ? isDark ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                                          : isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600'
                                      }`}>
                                        {webhook.status}
                                      </span>
                                    </div>
                                    <code className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} block mb-3`}>
                                      {webhook.url}
                                    </code>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                      <div>
                                        <div className={`${isDark ? 'text-gray-500' : 'text-gray-500'} text-xs mb-1`}>Events</div>
                                        <div>{webhook.events.length} subscribed</div>
                                      </div>
                                      <div>
                                        <div className={`${isDark ? 'text-gray-500' : 'text-gray-500'} text-xs mb-1`}>Success Rate</div>
                                        <div className="text-green-500">{webhook.successRate}%</div>
                                      </div>
                                      <div>
                                        <div className={`${isDark ? 'text-gray-500' : 'text-gray-500'} text-xs mb-1`}>Last Delivery</div>
                                        <div>{webhook.lastDelivery}</div>
                                      </div>
                                      <div>
                                        <div className={`${isDark ? 'text-gray-500' : 'text-gray-500'} text-xs mb-1`}>Actions</div>
                                        <div className="flex gap-2">
                                          <Button variant="ghost" size="sm">
                                            <Edit3 className="w-4 h-4" />
                                          </Button>
                                          <Button variant="ghost" size="sm">
                                            <Send className="w-4 h-4" />
                                          </Button>
                                          <Button variant="ghost" size="sm">
                                            {webhook.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                          </Button>
                                          <Button variant="ghost" size="sm" className="text-red-500">
                                            <Trash2 className="w-4 h-4" />
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Event subscriptions */}
                                <div className="mt-4">
                                  <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mb-2`}>Subscribed Events</div>
                                  <div className="flex flex-wrap gap-2">
                                    {webhook.events.map((event) => (
                                      <span key={event} className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-600'}`}>
                                        {event}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>

                          {/* Webhook Events Reference */}
                          <div className={`p-4 rounded-lg ${isDark ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
                            <h4 className="font-medium mb-3 flex items-center gap-2">
                              <Code className="w-4 h-4" />
                              Available Events
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              {[
                                'api.request', 'api.error', 'api.rate_limit',
                                'billing.invoice', 'billing.payment_failed', 'billing.subscription_updated',
                                'security.login', 'security.key_created', 'security.key_revoked',
                                'account.updated', 'team.member_added', 'team.member_removed'
                              ].map((event) => (
                                <code key={event} className={`${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
                                  {event}
                                </code>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {activeTab === 'billing' && (
                        <motion.div
                          key="billing"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="space-y-6"
                        >
                          {/* Current Plan */}
                          <div className={`p-6 rounded-xl border ${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}>
                            <div className="flex items-center justify-between mb-6">
                              <h3 className="text-xl font-medium">Current Plan</h3>
                              <span className={`px-3 py-1 rounded-full text-sm ${isDark ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-600'}`}>
                                Developer Pro
                              </span>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6 mb-6">
                              <div>
                                <div className="text-3xl font-bold mb-1">$99</div>
                                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>per month</div>
                              </div>
                              <div>
                                <div className="text-2xl font-semibold mb-1">1M</div>
                                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>API calls included</div>
                              </div>
                              <div>
                                <div className="text-2xl font-semibold mb-1">24/7</div>
                                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Priority support</div>
                              </div>
                            </div>

                            <div className="flex gap-4">
                              <Button variant="outline" className="rounded-lg">
                                Change Plan
                              </Button>
                              <Button variant="ghost" className="text-red-500">
                                Cancel Subscription
                              </Button>
                            </div>
                          </div>

                          {/* Usage & Billing */}
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className={`p-6 rounded-xl border ${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}>
                              <h4 className="font-medium mb-4">This Month's Usage</h4>
                              <div className="space-y-4">
                                <div>
                                  <div className="flex justify-between mb-2">
                                    <span>API Calls</span>
                                    <span>847K / 1M</span>
                                  </div>
                                  <div className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
                                    <div className="w-[84.7%] h-2 bg-blue-500 rounded-full"></div>
                                  </div>
                                </div>
                                <div>
                                  <div className="flex justify-between mb-2">
                                    <span>Data Transfer</span>
                                    <span>15.3GB / 50GB</span>
                                  </div>
                                  <div className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
                                    <div className="w-[30.6%] h-2 bg-green-500 rounded-full"></div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className={`p-6 rounded-xl border ${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}>
                              <h4 className="font-medium mb-4">Payment Method</h4>
                              <div className="flex items-center gap-4 mb-4">
                                <div className={`w-12 h-8 rounded ${isDark ? 'bg-gray-800' : 'bg-gray-200'} flex items-center justify-center`}>
                                  <CreditCard className="w-4 h-4" />
                                </div>
                                <div>
                                  <div>•••• •••• •••• 4242</div>
                                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Expires 12/26</div>
                                </div>
                              </div>
                              <Button variant="outline" size="sm" className="rounded-lg">
                                Update Payment Method
                              </Button>
                            </div>
                          </div>

                          {/* Billing History */}
                          <div className={`p-6 rounded-xl border ${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}>
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-medium">Billing History</h4>
                              <Button variant="ghost" size="sm">
                                <Download className="w-4 h-4 mr-2" />
                                Download All
                              </Button>
                            </div>
                            <div className="space-y-3">
                              {[
                                { date: '2024-01-01', amount: '$99.00', status: 'Paid', invoice: 'INV-2024-001' },
                                { date: '2023-12-01', amount: '$99.00', status: 'Paid', invoice: 'INV-2023-012' },
                                { date: '2023-11-01', amount: '$99.00', status: 'Paid', invoice: 'INV-2023-011' }
                              ].map((bill, i) => (
                                <div key={i} className={`flex items-center justify-between p-3 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                                  <div className="flex items-center gap-4">
                                    <div>
                                      <div className="font-medium">{bill.invoice}</div>
                                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{bill.date}</div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-4">
                                    <span className="font-medium">{bill.amount}</span>
                                    <span className={`text-xs px-2 py-1 rounded-full ${isDark ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-600'}`}>
                                      {bill.status}
                                    </span>
                                    <Button variant="ghost" size="sm">
                                      <Download className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {activeTab === 'team' && (
                        <motion.div
                          key="team"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className={`p-6 rounded-xl border ${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}
                        >
                          <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-medium">Team Management</h3>
                            <Button className={`${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'} rounded-lg`}>
                              <UserPlus className="w-4 h-4 mr-2" />
                              Invite Member
                            </Button>
                          </div>

                          <div className="space-y-4">
                            {teamMembers.map((member) => (
                              <motion.div
                                key={member.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`p-6 rounded-xl border ${isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full ${isDark ? 'bg-blue-900' : 'bg-blue-100'} flex items-center justify-center`}>
                                      {member.role === 'Owner' ? (
                                        <Crown className={`w-6 h-6 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} />
                                      ) : (
                                        <UserIcon className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                                      )}
                                    </div>
                                    <div>
                                      <div className="flex items-center gap-3">
                                        <span className="font-medium">{member.name}</span>
                                        <span className={`text-xs px-2 py-1 rounded-full ${
                                          member.status === 'active'
                                            ? isDark ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                                            : isDark ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                          {member.status}
                                        </span>
                                        <span className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                                          {member.role}
                                        </span>
                                      </div>
                                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                                        {member.email} • Last active: {member.lastActive}
                                      </div>
                                      <div className="flex gap-1 mt-2">
                                        {member.permissions.map((perm) => (
                                          <span key={perm} className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-600'}`}>
                                            {perm}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    {member.status === 'pending' && (
                                      <Button variant="outline" size="sm">
                                        <Mail className="w-4 h-4 mr-2" />
                                        Resend Invite
                                      </Button>
                                    )}
                                    {member.role !== 'Owner' && (
                                      <>
                                        <Button variant="ghost" size="sm">
                                          <Edit3 className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="sm" className="text-red-500">
                                          <Trash2 className="w-4 h-4" />
                                        </Button>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>

                          {/* Role Permissions Reference */}
                          <div className={`mt-6 p-4 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                            <h4 className="font-medium mb-3">Role Permissions</h4>
                            <div className="grid md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <div className="font-medium mb-2 flex items-center gap-2">
                                  <Crown className="w-4 h-4 text-yellow-500" />
                                  Owner
                                </div>
                                <ul className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} space-y-1`}>
                                  <li>• Full account access</li>
                                  <li>• Billing management</li>
                                  <li>• Team management</li>
                                  <li>• API key management</li>
                                </ul>
                              </div>
                              <div>
                                <div className="font-medium mb-2">Developer</div>
                                <ul className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} space-y-1`}>
                                  <li>• API access</li>
                                  <li>• Analytics viewing</li>
                                  <li>• Webhook management</li>
                                  <li>• Documentation access</li>
                                </ul>
                              </div>
                              <div>
                                <div className="font-medium mb-2">Viewer</div>
                                <ul className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} space-y-1`}>
                                  <li>• Analytics viewing</li>
                                  <li>• Documentation access</li>
                                  <li>• Read-only access</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {activeTab === 'docs' && (
                        <motion.div
                          key="docs"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className={`p-6 rounded-xl border ${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}
                        >
                          <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-medium">API Documentation</h3>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Download className="w-4 h-4 mr-2" />
                                Download OpenAPI
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => window.open('/sphinx-doc/xsigma-1.1-3/index.html', '_blank')}>
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Full Docs
                              </Button>
                            </div>
                          </div>

                          {/* Quick API Reference */}
                          <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                              <h4 className="font-medium mb-3 flex items-center gap-2">
                                <Zap className="w-4 h-4" />
                                Quick Start
                              </h4>
                              <div className="space-y-3 text-sm">
                                <div>
                                  <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Base URL</div>
                                  <code className={`block p-2 rounded ${isDark ? 'bg-black' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                                    https://api.xsigma.com/v1
                                  </code>
                                </div>
                                <div>
                                  <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Authentication</div>
                                  <code className={`block p-2 rounded ${isDark ? 'bg-black' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                                    Authorization: Bearer YOUR_API_KEY
                                  </code>
                                </div>
                              </div>
                            </div>

                            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                              <h4 className="font-medium mb-3 flex items-center gap-2">
                                <Code className="w-4 h-4" />
                                Example Request
                              </h4>
                              <code className={`block p-3 rounded text-xs ${isDark ? 'bg-black' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'} overflow-x-auto`}>
{`curl -X POST \\
  https://api.xsigma.com/v1/analytical-sigma \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "spot": 100,
    "strike": 105,
    "time_to_expiry": 0.25,
    "volatility": 0.2
  }'`}
                              </code>
                            </div>
                          </div>

                          {/* API Endpoints */}
                          <div className="space-y-4">
                            <h4 className="font-medium">Available Endpoints</h4>
                            {[
                              {
                                method: 'POST',
                                endpoint: '/api/analytical-sigma',
                                description: 'Calculate analytical sigma for options pricing',
                                params: ['spot', 'strike', 'time_to_expiry', 'volatility']
                              },
                              {
                                method: 'GET',
                                endpoint: '/api/fx-volatility/atm-curve',
                                description: 'Get FX volatility ATM curve data',
                                params: ['currency_pair', 'date_range']
                              },
                              {
                                method: 'POST',
                                endpoint: '/api/hartman-watson',
                                description: 'Hartman-Watson distribution calculations',
                                params: ['alpha', 'beta', 'lambda', 'nu']
                              },
                              {
                                method: 'GET',
                                endpoint: '/api/zabr-variables-impact',
                                description: 'ZABR model variable impact analysis',
                                params: ['model_type', 'parameters']
                              }
                            ].map((api, i) => (
                              <div key={i} className={`p-4 rounded-lg border ${isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}>
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex items-center gap-3">
                                    <span className={`text-xs px-2 py-1 rounded font-mono ${
                                      api.method === 'GET'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-blue-100 text-blue-800'
                                    }`}>
                                      {api.method}
                                    </span>
                                    <code className="font-medium">{api.endpoint}</code>
                                  </div>
                                  <Button variant="ghost" size="sm">
                                    <ExternalLink className="w-4 h-4" />
                                  </Button>
                                </div>
                                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-3`}>
                                  {api.description}
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {api.params.map((param) => (
                                    <span key={param} className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                                      {param}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* SDKs and Libraries */}
                          <div className={`mt-6 p-4 rounded-lg ${isDark ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
                            <h4 className="font-medium mb-3 flex items-center gap-2">
                              <Github className="w-4 h-4" />
                              SDKs & Libraries
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              {[
                                { name: 'Python SDK', status: 'Available' },
                                { name: 'JavaScript SDK', status: 'Available' },
                                { name: 'R Package', status: 'Beta' },
                                { name: 'MATLAB Toolbox', status: 'Coming Soon' }
                              ].map((sdk) => (
                                <div key={sdk.name} className="text-center">
                                  <div className="font-medium text-sm">{sdk.name}</div>
                                  <div className={`text-xs ${
                                    sdk.status === 'Available' ? 'text-green-500' :
                                    sdk.status === 'Beta' ? 'text-yellow-500' : 'text-gray-500'
                                  }`}>
                                    {sdk.status}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {activeTab === 'usage' && (
                        <motion.div
                          key="usage"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="space-y-6"
                        >
                          {/* Analytics Overview */}
                          <div className={`p-6 rounded-xl border ${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}>
                            <div className="flex items-center justify-between mb-6">
                              <h3 className="text-xl font-medium">Usage Analytics</h3>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">Last 7 days</Button>
                                <Button variant="outline" size="sm">Last 30 days</Button>
                                <Button variant="outline" size="sm">Last 90 days</Button>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                              {[
                                { label: 'Total Requests', value: realTimeData.apiCalls.toLocaleString(), change: '+12.5%', icon: Activity },
                                { label: 'Data Transfer', value: `${realTimeData.dataTransfer.toFixed(1)}GB`, change: '+8.2%', icon: Globe },
                                { label: 'Avg Response Time', value: `${realTimeData.latency.toFixed(0)}ms`, change: '-5.1%', icon: Zap },
                                { label: 'Error Rate', value: '0.02%', change: '-15.3%', icon: AlertTriangle }
                              ].map((metric, i) => {
                                const Icon = metric.icon;
                                return (
                                  <motion.div
                                    key={metric.label}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`p-4 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}
                                  >
                                    <div className="flex items-center justify-between mb-2">
                                      <Icon className="w-5 h-5 text-blue-500" />
                                      <span className={`text-xs px-2 py-1 rounded-full ${
                                        metric.change.startsWith('+') && !metric.label.includes('Error')
                                          ? 'bg-green-100 text-green-600'
                                          : metric.change.startsWith('-') && metric.label.includes('Error')
                                          ? 'bg-green-100 text-green-600'
                                          : metric.change.startsWith('-')
                                          ? 'bg-green-100 text-green-600'
                                          : 'bg-red-100 text-red-600'
                                      }`}>
                                        {metric.change}
                                      </span>
                                    </div>
                                    <div className="text-2xl font-semibold mb-1">{metric.value}</div>
                                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{metric.label}</div>
                                  </motion.div>
                                );
                              })}
                            </div>

                            {/* Real Interactive Charts */}
                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                              {/* API Usage Trend */}
                              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                                <h5 className="font-medium mb-4">API Usage Trend (30 days)</h5>
                                <ResponsiveContainer width="100%" height={200}>
                                  <AreaChart data={chartData.apiUsage}>
                                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
                                    <XAxis
                                      dataKey="day"
                                      stroke={isDark ? '#9ca3af' : '#6b7280'}
                                      fontSize={12}
                                    />
                                    <YAxis
                                      stroke={isDark ? '#9ca3af' : '#6b7280'}
                                      fontSize={12}
                                    />
                                    <Tooltip
                                      contentStyle={{
                                        backgroundColor: isDark ? '#1f2937' : '#ffffff',
                                        border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                                        borderRadius: '8px'
                                      }}
                                    />
                                    <Area
                                      type="monotone"
                                      dataKey="calls"
                                      stroke="#3b82f6"
                                      fill="#3b82f6"
                                      fillOpacity={0.3}
                                    />
                                  </AreaChart>
                                </ResponsiveContainer>
                              </div>

                              {/* Latency Trend */}
                              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                                <h5 className="font-medium mb-4">Response Time (30 days)</h5>
                                <ResponsiveContainer width="100%" height={200}>
                                  <RechartsLineChart data={chartData.apiUsage}>
                                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
                                    <XAxis
                                      dataKey="day"
                                      stroke={isDark ? '#9ca3af' : '#6b7280'}
                                      fontSize={12}
                                    />
                                    <YAxis
                                      stroke={isDark ? '#9ca3af' : '#6b7280'}
                                      fontSize={12}
                                    />
                                    <Tooltip
                                      contentStyle={{
                                        backgroundColor: isDark ? '#1f2937' : '#ffffff',
                                        border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                                        borderRadius: '8px'
                                      }}
                                    />
                                    <Line
                                      type="monotone"
                                      dataKey="latency"
                                      stroke="#10b981"
                                      strokeWidth={2}
                                      dot={{ fill: '#10b981', strokeWidth: 2, r: 3 }}
                                    />
                                  </RechartsLineChart>
                                </ResponsiveContainer>
                              </div>
                            </div>

                            {/* Endpoint Usage Pie Chart */}
                            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                              <h5 className="font-medium mb-4">Endpoint Usage Distribution</h5>
                              <div className="grid md:grid-cols-2 gap-6">
                                <ResponsiveContainer width="100%" height={250}>
                                  <RechartsPieChart>
                                    <Pie
                                      data={chartData.endpointUsage}
                                      cx="50%"
                                      cy="50%"
                                      outerRadius={80}
                                      fill="#8884d8"
                                      dataKey="value"
                                      label={({ name, value }) => `${value}%`}
                                    >
                                      {chartData.endpointUsage.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={['#3b82f6', '#10b981', '#f59e0b', '#ef4444'][index % 4]} />
                                      ))}
                                    </Pie>
                                    <Tooltip
                                      contentStyle={{
                                        backgroundColor: isDark ? '#1f2937' : '#ffffff',
                                        border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                                        borderRadius: '8px'
                                      }}
                                    />
                                  </RechartsPieChart>
                                </ResponsiveContainer>
                                <div className="space-y-3">
                                  {chartData.endpointUsage.map((endpoint, i) => (
                                    <div key={i} className="flex items-center justify-between">
                                      <div className="flex items-center gap-3">
                                        <div
                                          className="w-3 h-3 rounded-full"
                                          style={{ backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'][i % 4] }}
                                        ></div>
                                        <code className="text-sm">{endpoint.name}</code>
                                      </div>
                                      <div className="text-right">
                                        <div className="font-medium">{endpoint.calls.toLocaleString()}</div>
                                        <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{endpoint.value}%</div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Endpoint Usage */}
                          <div className={`p-6 rounded-xl border ${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}>
                            <h4 className="font-medium mb-4">Top Endpoints</h4>
                            <div className="space-y-3">
                              {[
                                { endpoint: '/api/analytical-sigma', calls: '234K', percentage: 45 },
                                { endpoint: '/api/fx-volatility/atm-curve', calls: '156K', percentage: 30 },
                                { endpoint: '/api/hartman-watson', calls: '89K', percentage: 17 },
                                { endpoint: '/api/zabr-variables-impact', calls: '42K', percentage: 8 }
                              ].map((endpoint, i) => (
                                <div key={i} className={`p-3 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                                  <div className="flex items-center justify-between mb-2">
                                    <code className="text-sm font-mono">{endpoint.endpoint}</code>
                                    <span className="font-medium">{endpoint.calls}</span>
                                  </div>
                                  <div className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
                                    <div
                                      className="h-2 bg-blue-500 rounded-full transition-all duration-1000"
                                      style={{ width: `${endpoint.percentage}%` }}
                                    ></div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {activeTab === 'security' && (
                        <motion.div
                          key="security"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className={`p-6 rounded-xl border ${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}
                        >
                          <h3 className="text-xl font-medium mb-6">Security Settings</h3>

                          <div className="space-y-6">
                            {/* Change Password */}
                            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="font-medium mb-1">Password</div>
                                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Update your account password</div>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setShowChangePassword(true)}
                                >
                                  Change Password
                                </Button>
                              </div>
                            </div>

                            {/* Two-Factor Authentication */}
                            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="font-medium mb-1">Two-Factor Authentication</div>
                                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Add an extra layer of security to your account</div>
                                </div>
                                <Button variant="outline" size="sm">
                                  Enable 2FA
                                </Button>
                              </div>
                            </div>

                            {/* Login Sessions */}
                            <div>
                              <h4 className="font-medium mb-4">Active Sessions</h4>
                              <div className="space-y-3">
                                {[
                                  { device: 'MacBook Pro', location: 'New York, US', current: true, lastActive: 'Now' },
                                  { device: 'iPhone 15', location: 'New York, US', current: false, lastActive: '2 hours ago' },
                                  { device: 'Chrome Browser', location: 'London, UK', current: false, lastActive: '1 day ago' }
                                ].map((session, i) => (
                                  <div key={i} className={`flex items-center justify-between p-3 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                                    <div>
                                      <div className="font-medium">{session.device}</div>
                                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {session.location} • {session.lastActive}
                                        {session.current && <span className="text-green-500 ml-2">• Current session</span>}
                                      </div>
                                    </div>
                                    {!session.current && (
                                      <Button variant="ghost" size="sm" className="text-red-500">
                                        Revoke
                                      </Button>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Security Alerts */}
                            <div>
                              <h4 className="font-medium mb-4">Recent Security Activity</h4>
                              <div className="space-y-3">
                                {[
                                  { type: 'login', message: 'Successful login from New York, US', time: '2 hours ago' },
                                  { type: 'api', message: 'New API key generated', time: '1 day ago' },
                                  { type: 'password', message: 'Password changed successfully', time: '3 days ago' }
                                ].map((activity, i) => (
                                  <div key={i} className={`flex items-start gap-3 p-3 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                                    <div className={`w-2 h-2 rounded-full mt-2 ${
                                      activity.type === 'login' ? 'bg-green-500' :
                                      activity.type === 'api' ? 'bg-blue-500' : 'bg-yellow-500'
                                    }`} />
                                    <div className="flex-1">
                                      <div className="text-sm">{activity.message}</div>
                                      <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-1`}>{activity.time}</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {activeTab === 'settings' && (
                        <motion.div
                          key="settings"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className={`p-6 rounded-xl border ${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}
                        >
                          <h3 className="text-xl font-medium mb-6">Account Settings</h3>

                          <div className="space-y-8">
                            {/* Notifications */}
                            <div>
                              <h4 className="font-medium mb-4">Notifications</h4>
                              <div className="space-y-4">
                                {[
                                  {
                                    title: 'Email Notifications',
                                    description: 'Receive updates about your account and billing',
                                    enabled: true
                                  },
                                  {
                                    title: 'API Alerts',
                                    description: 'Get notified when approaching rate limits',
                                    enabled: true
                                  },
                                  {
                                    title: 'Security Alerts',
                                    description: 'Notifications about login attempts and security events',
                                    enabled: true
                                  },
                                  {
                                    title: 'Product Updates',
                                    description: 'News about new features and API changes',
                                    enabled: false
                                  }
                                ].map((setting, i) => (
                                  <div key={i} className={`flex items-center justify-between p-4 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                                    <div>
                                      <div className="font-medium">{setting.title}</div>
                                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{setting.description}</div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                      <input type="checkbox" defaultChecked={setting.enabled} className="sr-only peer" />
                                      <div className={`relative w-11 h-6 rounded-full peer ${isDark ? 'bg-gray-700' : 'bg-gray-200'} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600`}></div>
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* API Preferences */}
                            <div>
                              <h4 className="font-medium mb-4">API Preferences</h4>
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm font-medium mb-2">Default Response Format</label>
                                  <select className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'}`}>
                                    <option>JSON</option>
                                    <option>XML</option>
                                    <option>CSV</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium mb-2">Rate Limit Preference</label>
                                  <select className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'}`}>
                                    <option>Standard (1000/min)</option>
                                    <option>Conservative (500/min)</option>
                                    <option>Aggressive (2000/min)</option>
                                  </select>
                                </div>
                              </div>
                            </div>

                            {/* Data & Privacy */}
                            <div>
                              <h4 className="font-medium mb-4">Data & Privacy</h4>
                              <div className="space-y-4">
                                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <div className="font-medium">Data Retention</div>
                                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>How long we keep your API logs</div>
                                    </div>
                                    <select className={`px-3 py-2 rounded border ${isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}>
                                      <option>30 days</option>
                                      <option>90 days</option>
                                      <option>1 year</option>
                                    </select>
                                  </div>
                                </div>
                                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <div className="font-medium">Analytics Sharing</div>
                                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Help improve our services with anonymous usage data</div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                      <input type="checkbox" defaultChecked className="sr-only peer" />
                                      <div className={`relative w-11 h-6 rounded-full peer ${isDark ? 'bg-gray-700' : 'bg-gray-200'} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600`}></div>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Danger Zone */}
                            <div className={`p-6 rounded-lg border-2 ${isDark ? 'border-red-800 bg-red-900/20' : 'border-red-200 bg-red-50'}`}>
                              <h4 className="font-medium text-red-500 mb-4">Danger Zone</h4>
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="font-medium">Export Account Data</div>
                                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Download all your account data</div>
                                  </div>
                                  <Button variant="outline" size="sm">
                                    Export Data
                                  </Button>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="font-medium">Delete Account</div>
                                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Permanently delete your account and all data</div>
                                  </div>
                                  <Button variant="outline" size="sm" className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white">
                                    Delete Account
                                  </Button>
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                              <Button className={`${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'} rounded-lg px-6`}>
                                Save Settings
                              </Button>
                              <Button variant="outline" className="rounded-lg px-6">
                                Reset to Defaults
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Change Password Modal */}
      {showChangePassword && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`max-w-md w-full mx-4 p-6 rounded-xl border ${isDark ? 'bg-black border-gray-700' : 'bg-white border-gray-200'} shadow-2xl`}
          >
            <h3 className="text-lg font-medium mb-4">Change Password</h3>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Current Password</label>
                <input
                  type="password"
                  required
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">New Password</label>
                <input
                  type="password"
                  required
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className={`flex-1 ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'} rounded-lg`}
                >
                  Change Password
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowChangePassword(false)}
                  className="flex-1 rounded-lg"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
