// Migration utility to help transition from old auth system to Supabase
import { authService } from '../services/authService_supabase';

interface LegacyUser {
  id: string;
  username: string;
  email: string;
  role: string;
  permissions: string[];
  profile: {
    firstName: string;
    lastName: string;
    department?: string;
    phone?: string;
    company?: string;
    jobTitle?: string;
    country?: string;
  };
}

export class AuthMigration {
  // Check if user has legacy session data
  static hasLegacySession(): boolean {
    const legacyKeys = [
      'xsigma_user',
      'xsigma_token',
      'xsigma_refresh_token',
      'xsigma_session_expiry'
    ];
    
    return legacyKeys.some(key => localStorage.getItem(key) !== null);
  }

  // Get legacy user data
  static getLegacyUserData(): LegacyUser | null {
    try {
      const userData = localStorage.getItem('xsigma_user');
      if (userData) {
        return JSON.parse(userData);
      }
    } catch (error) {
      console.error('Error parsing legacy user data:', error);
    }
    return null;
  }

  // Clear legacy session data
  static clearLegacySession(): void {
    const legacyKeys = [
      'xsigma_user',
      'xsigma_token',
      'xsigma_refresh_token',
      'xsigma_session_expiry'
    ];
    
    legacyKeys.forEach(key => {
      localStorage.removeItem(key);
    });
    
    console.log('Legacy session data cleared');
  }

  // Show migration notice to user
  static showMigrationNotice(): void {
    const legacyUser = this.getLegacyUserData();
    
    if (legacyUser) {
      const message = `
        🔄 XSigma Authentication Upgrade
        
        We've upgraded to a more secure authentication system!
        
        Your account (${legacyUser.email}) needs to be migrated.
        Please contact your administrator or re-register with the same email.
        
        Benefits of the new system:
        ✅ Enhanced security with enterprise-grade encryption
        ✅ Better session management
        ✅ Email verification
        ✅ Password reset functionality
        ✅ Audit logging for compliance
        
        Your data and permissions will be preserved.
      `;
      
      console.log(message);
      
      // You can also show this in a modal or notification
      // For now, we'll just log it and clear the legacy data
      this.clearLegacySession();
    }
  }

  // Helper to suggest migration steps
  static getMigrationSteps(): string[] {
    return [
      '1. Contact your XSigma administrator to set up your new account',
      '2. Or register with your existing email address',
      '3. Your role and permissions will be restored by an administrator',
      '4. Update any saved bookmarks to use the new authentication flow',
      '5. Clear your browser cache if you experience any issues'
    ];
  }

  // Check if current environment supports Supabase
  static isSupabaseConfigured(): boolean {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    return !!(supabaseUrl && supabaseKey);
  }

  // Initialize migration process
  static async initializeMigration(): Promise<void> {
    console.log('🚀 Initializing XSigma authentication migration...');
    
    // Check if Supabase is configured
    if (!this.isSupabaseConfigured()) {
      console.error('❌ Supabase is not configured. Please check your environment variables.');
      return;
    }
    
    // Check for legacy session
    if (this.hasLegacySession()) {
      console.log('📦 Legacy session detected');
      this.showMigrationNotice();
    }
    
    // Check current authentication status
    const isAuthenticated = authService.isAuthenticated();
    console.log(`🔐 Current authentication status: ${isAuthenticated ? 'Authenticated' : 'Not authenticated'}`);
    
    if (isAuthenticated) {
      const user = authService.getCurrentUser();
      console.log(`👤 Current user: ${user?.email} (${user?.role})`);
    }
    
    console.log('✅ Migration initialization complete');
  }

  // Utility to help administrators create users with legacy data
  static generateUserCreationScript(legacyUsers: LegacyUser[]): string {
    const scripts = legacyUsers.map(user => {
      return `
-- Create user: ${user.email}
-- Role: ${user.role}
-- Permissions: ${user.permissions.join(', ')}

-- This would be done through Supabase Auth UI or API
-- Example for reference:
/*
INSERT INTO auth.users (email, email_confirmed_at, created_at, updated_at)
VALUES ('${user.email}', now(), now(), now());

-- Then update the profile
UPDATE user_profiles 
SET 
  username = '${user.username}',
  first_name = '${user.profile.firstName}',
  last_name = '${user.profile.lastName}',
  department = '${user.profile.department || ''}',
  phone = '${user.profile.phone || ''}',
  company = '${user.profile.company || ''}',
  job_title = '${user.profile.jobTitle || ''}',
  country = '${user.profile.country || ''}',
  role = '${user.role}'
WHERE id = (SELECT id FROM auth.users WHERE email = '${user.email}');

-- Add permissions
${user.permissions.map(permission => 
  `INSERT INTO user_permissions (user_id, permission) 
   SELECT id, '${permission}' FROM user_profiles WHERE id = (SELECT id FROM auth.users WHERE email = '${user.email}');`
).join('\n')}
*/
      `;
    });
    
    return scripts.join('\n\n');
  }
}

// Auto-initialize migration on import
AuthMigration.initializeMigration().catch(console.error);

export default AuthMigration;
