import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

// Create Supabase client with TypeScript support
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce', // Use PKCE flow for better security
  },
  global: {
    headers: {
      'X-Client-Info': 'xsigma-frontend@1.0.0',
    },
  },
});

// Auth event listeners for session management
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Auth state changed:', event, session?.user?.email);
  
  switch (event) {
    case 'SIGNED_IN':
      console.log('User signed in:', session?.user?.email);
      // Update last login timestamp
      if (session?.user?.id) {
        updateLastLogin(session.user.id);
      }
      break;
    case 'SIGNED_OUT':
      console.log('User signed out');
      // Clear any local storage or cache
      localStorage.removeItem('xsigma_user_cache');
      break;
    case 'TOKEN_REFRESHED':
      console.log('Token refreshed for user:', session?.user?.email);
      break;
    case 'USER_UPDATED':
      console.log('User updated:', session?.user?.email);
      break;
    case 'PASSWORD_RECOVERY':
      console.log('Password recovery initiated for:', session?.user?.email);
      break;
  }
});

// Helper function to update last login
async function updateLastLogin(userId: string) {
  try {
    const { error } = await supabase
      .from('user_profiles')
      .update({ last_login: new Date().toISOString() })
      .eq('id', userId);

    if (error) {
      console.error('Error updating last login:', error);
    }
  } catch (error) {
    console.error('Error updating last login:', error);
  }
}

// Auth helper functions
export const authHelpers = {
  // Sign up with email and password
  async signUp(email: string, password: string, userData: {
    username: string;
    firstName: string;
    lastName: string;
    company?: string;
    jobTitle?: string;
    department?: string;
    phone?: string;
    country?: string;
    role?: string;
  }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: userData.username,
          first_name: userData.firstName,
          last_name: userData.lastName,
          company: userData.company,
          job_title: userData.jobTitle,
          department: userData.department,
          phone: userData.phone,
          country: userData.country,
          role: userData.role || 'user',
        },
      },
    });

    if (error) {
      throw error;
    }

    // Log registration event
    if (data.user) {
      await logAuditEvent('USER_REGISTERED', 'users', true, {
        email: data.user.email,
        username: userData.username,
      });
    }

    return data;
  },

  // Sign in with email and password
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // Log failed login attempt
      await logAuditEvent('LOGIN_FAILED', 'users', false, {
        email,
        reason: error.message,
      });
      throw error;
    }

    // Log successful login
    if (data.user) {
      await logAuditEvent('LOGIN_SUCCESS', 'users', true, {
        email: data.user.email,
      });
    }

    return data;
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw error;
    }

    // Clear local cache
    localStorage.removeItem('xsigma_user_cache');
  },

  // Reset password
  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      throw error;
    }

    // Log password reset request
    await logAuditEvent('PASSWORD_RESET_REQUESTED', 'users', true, { email });
  },

  // Update password
  async updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      throw error;
    }

    // Log password change
    await logAuditEvent('PASSWORD_CHANGED', 'users', true);
  },

  // Get current session
  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      throw error;
    }

    return session;
  },

  // Get current user
  async getUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      throw error;
    }

    return user;
  },
};

// Database helper functions
export const dbHelpers = {
  // Get user profile with permissions
  async getUserProfile(userId?: string) {
    const { data, error } = await supabase
      .rpc('get_user_profile')
      .single();

    if (error) {
      throw error;
    }

    return data;
  },

  // Update user profile
  async updateUserProfile(updates: {
    username?: string;
    first_name?: string;
    last_name?: string;
    department?: string;
    phone?: string;
    company?: string;
    job_title?: string;
    country?: string;
  }) {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', (await supabase.auth.getUser()).data.user?.id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    // Log profile update
    await logAuditEvent('PROFILE_UPDATED', 'user_profiles', true, updates);

    return data;
  },

  // Check if user has permission
  async hasPermission(permission: string) {
    const { data, error } = await supabase
      .rpc('has_permission', { permission_name: permission });

    if (error) {
      throw error;
    }

    return data;
  },

  // Get user permissions
  async getUserPermissions() {
    const { data, error } = await supabase
      .from('user_permissions')
      .select('permission')
      .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

    if (error) {
      throw error;
    }

    return data.map(p => p.permission);
  },

  // Create API key
  async createApiKey(keyName: string, permissions: string[], expiresAt?: string) {
    const user = await supabase.auth.getUser();
    if (!user.data.user) throw new Error('User not authenticated');

    // Generate API key
    const apiKey = `xsigma_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    const keyPrefix = apiKey.substring(0, 8);
    const keyHash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(apiKey));
    const keyHashHex = Array.from(new Uint8Array(keyHash)).map(b => b.toString(16).padStart(2, '0')).join('');

    const { data, error } = await supabase
      .from('api_keys')
      .insert({
        user_id: user.data.user.id,
        key_name: keyName,
        api_key_hash: keyHashHex,
        api_key_prefix: keyPrefix,
        permissions,
        expires_at: expiresAt,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    // Log API key creation
    await logAuditEvent('API_KEY_CREATED', 'api_keys', true, {
      key_name: keyName,
      permissions,
    });

    return { ...data, api_key: apiKey };
  },

  // Get user's API keys
  async getApiKeys() {
    const { data, error } = await supabase
      .from('api_keys')
      .select('id, key_name, api_key_prefix, permissions, expires_at, last_used, is_active, created_at')
      .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data;
  },

  // Revoke API key
  async revokeApiKey(keyId: string) {
    const { error } = await supabase
      .from('api_keys')
      .update({ is_active: false })
      .eq('id', keyId)
      .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

    if (error) {
      throw error;
    }

    // Log API key revocation
    await logAuditEvent('API_KEY_REVOKED', 'api_keys', true, { key_id: keyId });
  },

  // Get audit logs for current user
  async getAuditLogs(limit = 50) {
    const { data, error } = await supabase
      .from('audit_logs')
      .select('*')
      .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      throw error;
    }

    return data;
  },
};

// Audit logging helper
export async function logAuditEvent(
  action: string,
  resource: string,
  success: boolean,
  details?: Record<string, any>
) {
  try {
    const { error } = await supabase.rpc('log_audit_event', {
      action_name: action,
      resource_name: resource,
      success_flag: success,
      details_json: details || null,
    });

    if (error) {
      console.error('Error logging audit event:', error);
    }
  } catch (error) {
    console.error('Error logging audit event:', error);
  }
}

export default supabase;
