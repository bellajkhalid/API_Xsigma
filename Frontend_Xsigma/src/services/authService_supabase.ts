// Supabase-based authentication service for XSigma
import type { User, AuthResult, LoginCredentials, CreateUserData } from '@/types/auth';
import { authHelpers, dbHelpers, supabase } from '../lib/supabase';
import { UserProfile } from '../types/supabase';

class AuthService {
  private currentUser: User | null = null;
  private userProfile: UserProfile | null = null;

  constructor() {
    // Check for existing session on initialization
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
        this.userProfile = profile;
        this.currentUser = {
          id: profile.id,
          username: profile.username,
          email: profile.email,
          role: profile.role,
          permissions: profile.permissions || [],
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
          emailVerified: true, // Supabase handles email verification
          twoFactorEnabled: false, // Can be extended later
        };
        
        // Cache user data
        localStorage.setItem('xsigma_user_cache', JSON.stringify(this.currentUser));
      }
    } catch (error) {
      console.error('Failed to load user profile:', error);
      this.clearSession();
    }
  }

  private clearSession(): void {
    this.currentUser = null;
    this.userProfile = null;
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
          firstName: userData.firstName,
          lastName: userData.lastName,
          company: userData.company,
          jobTitle: userData.jobTitle,
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
      // Clear session even if logout fails
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
           this.currentUser.permissions.includes('admin');
  }

  // Check if user has specific role
  hasRole(role: string): boolean {
    if (!this.currentUser) return false;
    return this.currentUser.role === role || this.currentUser.role === 'admin';
  }

  // Update user profile
  async updateProfile(profileData: Partial<User['profile']>): Promise<boolean> {
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

  // Change password
  async changePassword(newPassword: string): Promise<boolean> {
    if (!this.currentUser) return false;

    try {
      await authHelpers.updatePassword(newPassword);
      return true;
    } catch (error) {
      console.error('Password change error:', error);
      return false;
    }
  }

  // Request password reset
  async requestPasswordReset(email: string): Promise<boolean> {
    try {
      await authHelpers.resetPassword(email);
      return true;
    } catch (error) {
      console.error('Password reset request error:', error);
      return false;
    }
  }

  // Get user permissions
  async getUserPermissions(): Promise<string[]> {
    try {
      return await dbHelpers.getUserPermissions();
    } catch (error) {
      console.error('Error getting user permissions:', error);
      return [];
    }
  }

  // Create API key
  async createApiKey(keyName: string, permissions: string[], expiresAt?: string) {
    try {
      return await dbHelpers.createApiKey(keyName, permissions, expiresAt);
    } catch (error) {
      console.error('Error creating API key:', error);
      throw error;
    }
  }

  // Get user's API keys
  async getApiKeys() {
    try {
      return await dbHelpers.getApiKeys();
    } catch (error) {
      console.error('Error getting API keys:', error);
      return [];
    }
  }

  // Revoke API key
  async revokeApiKey(keyId: string): Promise<boolean> {
    try {
      await dbHelpers.revokeApiKey(keyId);
      return true;
    } catch (error) {
      console.error('Error revoking API key:', error);
      return false;
    }
  }

  // Get audit logs
  async getAuditLogs(limit = 50) {
    try {
      return await dbHelpers.getAuditLogs(limit);
    } catch (error) {
      console.error('Error getting audit logs:', error);
      return [];
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
