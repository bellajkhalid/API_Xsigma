# 🚀 XSigma Supabase Authentication - Quick Start Guide

## ✅ What's Already Done

I've already set up the complete Supabase authentication system for you:

- ✅ **Supabase client configured** (`src/lib/supabase.ts`)
- ✅ **Database schema ready** (`Backend_Xsigma/supabase/schema.sql`)
- ✅ **Auth service implemented** (`src/services/authService.ts`)
- ✅ **TypeScript types defined** (`src/types/supabase.ts`)
- ✅ **Dependencies installed** (`@supabase/supabase-js`)
- ✅ **Example component created** (`src/components/auth/AuthExample.tsx`)

## 🎯 What You Need to Do (5 minutes)

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create account
2. Click "New Project"
3. Name: `xsigma-auth`
4. Create strong database password
5. Wait 2-3 minutes for setup

### Step 2: Get Your Credentials
1. In Supabase dashboard → Settings → API
2. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **Anon key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### Step 3: Update Environment Variables
Edit `Frontend_Xsigma/.env` and replace these lines:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

With your actual Supabase credentials.

### Step 4: Set Up Database
1. In Supabase dashboard → SQL Editor
2. Copy contents of `Backend_Xsigma/supabase/schema.sql`
3. Paste and click "Run"
4. This creates all tables, security policies, and functions

### Step 5: Test It!
1. Start your dev server: `npm run dev`
2. Go to `/auth-demo` (or add the AuthExample component to a page)
3. Try registering a new user
4. Check Supabase dashboard → Authentication → Users

## 🧪 Testing the Authentication

### Option 1: Use the Demo Component
Add this to any page to test:
```tsx
import AuthExample from '../components/auth/AuthExample';

// In your component:
<AuthExample />
```

### Option 2: Use in Your Existing Components
```tsx
import { authService } from '../services/authService';
import { useEffect, useState } from 'react';

function MyComponent() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogin = async () => {
    const result = await authService.login({
      email: 'user@example.com',
      password: 'password123'
    });
    
    if (result.success) {
      setUser(result.user);
    }
  };

  return (
    <div>
      {user ? (
        <p>Welcome, {user.email}!</p>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

## 🔐 Available Auth Methods

```tsx
// Login
const result = await authService.login({ email, password });

// Register
const result = await authService.register({
  email, password, username, firstName, lastName,
  company, jobTitle, department, phone, country, role
});

// Logout
await authService.logout();

// Get current user
const user = authService.getCurrentUser();

// Check authentication
const isAuth = authService.isAuthenticated();

// Check permissions
const canAccess = authService.hasPermission('admin');

// Check role
const isAdmin = authService.hasRole('admin');

// Update profile
await authService.updateProfile({ firstName: 'New Name' });

// Change password
await authService.changePassword('newPassword123');

// Request password reset
await authService.requestPasswordReset('user@example.com');
```

## 🏦 User Roles & Permissions

The system supports these roles:
- **admin**: Full access to everything
- **analyst**: Access to analytics and models
- **user**: Basic access to API and analytics
- **viewer**: Read-only access

Permissions include:
- `admin` - Full administrative access
- `billing` - Billing and subscription management
- `api` - API access
- `analytics` - Analytics and reporting
- `user_management` - Manage other users
- `system_settings` - System configuration

## 🛡️ Security Features

- ✅ **JWT tokens** with automatic refresh
- ✅ **Email verification** required
- ✅ **Password reset** functionality
- ✅ **Row-level security** (RLS) in database
- ✅ **Audit logging** for all actions
- ✅ **Session management** with expiration
- ✅ **Rate limiting** on auth endpoints
- ✅ **CORS protection** configured

## 🚨 Troubleshooting

### "Invalid JWT" Error
- Check your environment variables are correct
- Make sure Supabase URL and key match your project

### "Row Level Security policy violation"
- Run the database schema SQL in Supabase
- Check that RLS policies are enabled

### Email not sending
- Configure SMTP in Supabase Authentication settings
- Or use Supabase's built-in email service

### CORS errors
- Add your domain to allowed origins in Supabase settings
- Check that VITE_SUPABASE_URL is correct

## 🎉 You're Ready!

Your XSigma application now has enterprise-grade authentication! The system is:

- **Secure**: Enterprise-level security with JWT tokens and RLS
- **Scalable**: Handles thousands of users automatically  
- **Professional**: Perfect for quantitative finance applications
- **Feature-rich**: Email verification, password reset, audit logs
- **Easy to use**: Simple API for all authentication needs

## 📞 Need Help?

If you run into any issues:
1. Check the browser console for errors
2. Look at Supabase dashboard logs
3. Verify your environment variables
4. Make sure the database schema was applied correctly

The authentication system is now ready for your quantitative finance professionals! 🚀
