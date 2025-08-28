// Simplified XSigma Authentication Service - Supabase Integration
import { authHelpers, dbHelpers, supabase } from '../lib/supabase-simple';

// Simple types
interface User {
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
}

interface AuthResult {
  success: boolean;
  user?: User;
  message: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface CreateUserData {
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  company?: string;
  jobTitle?: string;
  department?: string;
  phone?: string;
  country?: string;
  role?: string;
}

class AuthService {
  private currentUser: User | null = null;

  constructor() {
    this.loadSession();
    
    // Listen for auth state changes
    supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);
      
      if (event === 'SIGNED_IN' && session?.user) {
        await this.loadUserProfile();
      } else if (event === 'SIGNED_OUT') {
        this.clearSession();
      }
    });
  }

  private async loadSession(): Promise<void> {
    try {
      const session = await authHelpers.getSession();
      if (session?.user) {
        await this.loadUserProfile();
      }
    } catch (error) {
      console.error('Failed to load session:', error);
      this.clearSession();
    }
  }

  private async loadUserProfile(): Promise<void> {
    try {
      const profile = await dbHelpers.getUserProfile();
      if (profile) {
        this.currentUser = {
          id: profile.id,
          username: profile.username,
          email: profile.email || '',
          role: profile.role,
          permissions: [], // Will be loaded separately if needed
          createdAt: profile.created_at,
          isActive: true,
          profile: {
            firstName: profile.first_name,
            lastName: profile.last_name,
            department: profile.department || undefined,
            phone: profile.phone || undefined,
            company: profile.company || undefined,
            jobTitle: profile.job_title || undefined,
            country: profile.country || undefined,
          },
          lastLogin: profile.last_login ? new Date(profile.last_login) : undefined,
          emailVerified: true,
          twoFactorEnabled: false,
        };
        
        localStorage.setItem('xsigma_user_cache', JSON.stringify(this.currentUser));
      }
    } catch (error) {
      console.error('Failed to load user profile:', error);
      // Don't clear session on profile load failure - user might still be authenticated
    }
  }

  private clearSession(): void {
    this.currentUser = null;
    localStorage.removeItem('xsigma_user_cache');
  }

  // Login with email and password
  async login(credentials: LoginCredentials): Promise<AuthResult> {
    try {
      const { email, password } = credentials;
      
      const result = await authHelpers.signIn(email, password);
      
      if (result.user) {
        await this.loadUserProfile();
        
        return {
          success: true,
          user: this.currentUser!,
          message: 'Login successful'
        };
      } else {
        return {
          success: false,
          message: 'Login failed'
        };
      }
    } catch (error: any) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.message || 'Login failed. Please check your credentials.'
      };
    }
  }

  // Register new user
  async register(userData: CreateUserData): Promise<AuthResult> {
    try {
      const result = await authHelpers.signUp(
        userData.email,
        userData.password,
        {
          username: userData.username,
          first_name: userData.firstName,
          last_name: userData.lastName,
          company: userData.company,
          job_title: userData.jobTitle,
          department: userData.department,
          phone: userData.phone,
          country: userData.country,
          role: userData.role || 'user',
        }
      );

      if (result.user) {
        return {
          success: true,
          message: 'Registration successful! Please check your email to verify your account.'
        };
      } else {
        return {
          success: false,
          message: 'Registration failed'
        };
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: error.message || 'Registration failed. Please try again.'
      };
    }
  }

  // Logout
  async logout(): Promise<void> {
    try {
      await authHelpers.signOut();
      this.clearSession();
    } catch (error) {
      console.error('Logout error:', error);
      this.clearSession();
    }
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  // Check if user has specific permission
  hasPermission(permission: string): boolean {
    if (!this.currentUser) return false;
    return this.currentUser.permissions.includes(permission) || 
           this.currentUser.permissions.includes('admin') ||
           this.currentUser.role === 'admin';
  }

  // Check if user has specific role
  hasRole(role: string): boolean {
    if (!this.currentUser) return false;
    return this.currentUser.role === role || this.currentUser.role === 'admin';
  }

  // Update user profile
  async updateProfile(profileData: any): Promise<boolean> {
    if (!this.currentUser) return false;

    try {
      const updates = {
        first_name: profileData.firstName,
        last_name: profileData.lastName,
        department: profileData.department,
        phone: profileData.phone,
        company: profileData.company,
        job_title: profileData.jobTitle,
        country: profileData.country,
      };

      await dbHelpers.updateUserProfile(updates);

      // Update local user data
      if (this.currentUser.profile) {
        this.currentUser.profile = { ...this.currentUser.profile, ...profileData };
        localStorage.setItem('xsigma_user_cache', JSON.stringify(this.currentUser));
      }

      return true;
    } catch (error) {
      console.error('Profile update error:', error);
      return false;
    }
  }

  // Refresh token (handled automatically by Supabase)
  async refreshToken(): Promise<boolean> {
    try {
      const session = await authHelpers.getSession();
      return session !== null;
    } catch (error) {
      console.error('Token refresh error:', error);
      return false;
    }
  }
}

// Create and export singleton instance
export const authService = new AuthService();
export default authService;
