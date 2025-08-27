export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          username: string
          first_name: string
          last_name: string
          department: string | null
          phone: string | null
          company: string | null
          job_title: string | null
          country: string | null
          timezone: string
          role: 'admin' | 'user' | 'analyst' | 'viewer'
          is_active: boolean
          failed_login_attempts: number
          locked_until: string | null
          last_login: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          first_name: string
          last_name: string
          department?: string | null
          phone?: string | null
          company?: string | null
          job_title?: string | null
          country?: string | null
          timezone?: string
          role?: 'admin' | 'user' | 'analyst' | 'viewer'
          is_active?: boolean
          failed_login_attempts?: number
          locked_until?: string | null
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          first_name?: string
          last_name?: string
          department?: string | null
          phone?: string | null
          company?: string | null
          job_title?: string | null
          country?: string | null
          timezone?: string
          role?: 'admin' | 'user' | 'analyst' | 'viewer'
          is_active?: boolean
          failed_login_attempts?: number
          locked_until?: string | null
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_permissions: {
        Row: {
          id: string
          user_id: string
          permission: string
          granted_by: string | null
          granted_at: string
        }
        Insert: {
          id?: string
          user_id: string
          permission: string
          granted_by?: string | null
          granted_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          permission?: string
          granted_by?: string | null
          granted_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_permissions_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_permissions_granted_by_fkey"
            columns: ["granted_by"]
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      api_keys: {
        Row: {
          id: string
          user_id: string
          key_name: string
          api_key_hash: string
          api_key_prefix: string
          permissions: string[]
          rate_limit: number
          expires_at: string | null
          last_used: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          key_name: string
          api_key_hash: string
          api_key_prefix: string
          permissions?: string[]
          rate_limit?: number
          expires_at?: string | null
          last_used?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          key_name?: string
          api_key_hash?: string
          api_key_prefix?: string
          permissions?: string[]
          rate_limit?: number
          expires_at?: string | null
          last_used?: string | null
          is_active?: boolean
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "api_keys_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      audit_logs: {
        Row: {
          id: string
          user_id: string | null
          action: string
          resource: string | null
          ip_address: string | null
          user_agent: string | null
          success: boolean
          details: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          action: string
          resource?: string | null
          ip_address?: string | null
          user_agent?: string | null
          success: boolean
          details?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          action?: string
          resource?: string | null
          ip_address?: string | null
          user_agent?: string | null
          success?: boolean
          details?: Json | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      user_sessions: {
        Row: {
          id: string
          user_id: string
          session_id: string
          ip_address: string | null
          user_agent: string | null
          expires_at: string
          created_at: string
          last_accessed: string
          is_active: boolean
        }
        Insert: {
          id?: string
          user_id: string
          session_id: string
          ip_address?: string | null
          user_agent?: string | null
          expires_at: string
          created_at?: string
          last_accessed?: string
          is_active?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          session_id?: string
          ip_address?: string | null
          user_agent?: string | null
          expires_at?: string
          created_at?: string
          last_accessed?: string
          is_active?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "user_sessions_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_permission: {
        Args: {
          permission_name: string
        }
        Returns: boolean
      }
      log_audit_event: {
        Args: {
          action_name: string
          resource_name?: string
          success_flag?: boolean
          details_json?: Json
        }
        Returns: string
      }
      get_user_profile: {
        Args: {}
        Returns: {
          id: string
          username: string
          email: string
          first_name: string
          last_name: string
          department: string | null
          phone: string | null
          company: string | null
          job_title: string | null
          country: string | null
          role: string
          permissions: string[]
          last_login: string | null
          created_at: string
        }
      }
    }
    Enums: {
      user_role: 'admin' | 'user' | 'analyst' | 'viewer'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Additional types for the application
export interface UserProfile {
  id: string
  username: string
  email: string
  first_name: string
  last_name: string
  department?: string
  phone?: string
  company?: string
  job_title?: string
  country?: string
  role: 'admin' | 'user' | 'analyst' | 'viewer'
  permissions: string[]
  last_login?: string
  created_at: string
}

export interface ApiKey {
  id: string
  key_name: string
  api_key_prefix: string
  permissions: string[]
  expires_at?: string
  last_used?: string
  is_active: boolean
  created_at: string
}

export interface AuditLog {
  id: string
  action: string
  resource?: string
  success: boolean
  details?: Record<string, any>
  created_at: string
}

export interface UserSession {
  id: string
  session_id: string
  ip_address?: string
  user_agent?: string
  expires_at: string
  created_at: string
  last_accessed: string
  is_active: boolean
}
