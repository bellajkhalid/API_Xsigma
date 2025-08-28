import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authService } from '../services/authService-simple';
import { supabase } from '../lib/supabase-simple';
import type { User as SupabaseUser } from '@supabase/supabase-js';

// XSigma User Interface
interface XSigmaUser {
  id: string;
  username: string;
  email: string;
  role: string;
  permissions: string[];
  profile?: {
    firstName: string;
    lastName: string;
    department?: string;
    phone?: string;
    company?: string;
    jobTitle?: string;
    country?: string;
  };
  createdAt: string;
  isActive: boolean;
  lastLogin?: Date;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  provider?: 'email' | 'google' | 'github';
  avatar?: string;
}

// Authentication Context Interface
interface AuthContextType {
  // State
  user: XSigmaUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  
  // Actions
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; message: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; message: string }>;
  loginWithGitHub: () => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  
  // Permissions
  hasPermission: (permission: string) => boolean;
  isAdmin: () => boolean;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username?: string;
  company?: string;
  jobTitle?: string;
  department?: string;
  phone?: string;
  country?: string;
}

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<XSigmaUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize authentication state
  useEffect(() => {
    initializeAuth();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.email);
      
      if (event === 'SIGNED_IN' && session?.user) {
        await loadUserProfile(session.user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
      
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Initialize authentication
  const initializeAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        await loadUserProfile(session.user);
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load user profile from database
  const loadUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      const profile = await authService.getUserProfile();
      
      const xsigmaUser: XSigmaUser = {
        id: supabaseUser.id,
        username: profile.username,
        email: supabaseUser.email || '',
        role: profile.role,
        permissions: [], // Will be loaded separately
        profile: {
          firstName: profile.first_name,
          lastName: profile.last_name,
          department: profile.department,
          phone: profile.phone,
          company: profile.company,
          jobTitle: profile.job_title,
          country: profile.country,
        },
        createdAt: profile.created_at,
        isActive: true,
        lastLogin: profile.last_login ? new Date(profile.last_login) : undefined,
        emailVerified: supabaseUser.email_confirmed_at ? true : false,
        twoFactorEnabled: false,
        provider: supabaseUser.app_metadata?.provider || 'email',
        avatar: supabaseUser.user_metadata?.avatar_url || supabaseUser.user_metadata?.picture,
      };

      // Load permissions
      try {
        const permissions = await authService.getUserPermissions();
        xsigmaUser.permissions = permissions;
      } catch (error) {
        console.error('Error loading permissions:', error);
        xsigmaUser.permissions = [];
      }

      setUser(xsigmaUser);
    } catch (error) {
      console.error('Error loading user profile:', error);
      // If profile doesn't exist, user might be newly registered via OAuth
      // The trigger should have created it, but let's handle the edge case
      setUser(null);
    }
  };

  // Login with email/password
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await authService.login({ email, password });
      
      if (result.success && result.user) {
        // User will be set via auth state change listener
        return { success: true, message: 'Login successful' };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error: any) {
      return { success: false, message: error.message || 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  // Register new user
  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    try {
      const result = await authService.register({
        email: userData.email,
        password: userData.password,
        userData: {
          username: userData.username || userData.email.split('@')[0],
          first_name: userData.firstName,
          last_name: userData.lastName,
          company: userData.company,
          job_title: userData.jobTitle,
          department: userData.department,
          phone: userData.phone,
          country: userData.country,
          role: 'user'
        }
      });

      return { success: result.success, message: result.message };
    } catch (error: any) {
      return { success: false, message: error.message || 'Registration failed' };
    } finally {
      setIsLoading(false);
    }
  };

  // OAuth login methods
  const loginWithGoogle = async () => {
    try {
      const result = await authService.signInWithGoogle();
      return { success: true, message: 'Redirecting to Google...' };
    } catch (error: any) {
      return { success: false, message: error.message || 'Google login failed' };
    }
  };

  const loginWithGitHub = async () => {
    try {
      const result = await authService.signInWithGitHub();
      return { success: true, message: 'Redirecting to GitHub...' };
    } catch (error: any) {
      return { success: false, message: error.message || 'GitHub login failed' };
    }
  };

  // Logout
  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh user data
  const refreshUser = async () => {
    if (!user) return;
    
    try {
      const { data: { user: supabaseUser } } = await supabase.auth.getUser();
      if (supabaseUser) {
        await loadUserProfile(supabaseUser);
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
    }
  };

  // Permission helpers
  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    return user.permissions.includes(permission) || user.permissions.includes('admin');
  };

  const isAdmin = (): boolean => {
    if (!user) return false;
    return user.role === 'admin' || user.permissions.includes('admin');
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    loginWithGoogle,
    loginWithGitHub,
    logout,
    refreshUser,
    hasPermission,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
