# XSigma Supabase Authentication Setup Guide

This guide will help you set up Supabase authentication for the XSigma quantitative finance application.

## 🚀 Why Supabase for XSigma?

Supabase is perfect for XSigma because it provides:
- **Enterprise-grade PostgreSQL** - Perfect for quantitative finance data
- **Built-in Authentication** - JWT tokens, email verification, password reset
- **Row-Level Security (RLS)** - Fine-grained access control for sensitive financial data
- **Real-time subscriptions** - Live updates for financial models
- **Automatic API generation** - RESTful and GraphQL APIs
- **Scalability** - Handles enterprise-level quantitative finance workloads

## 📋 Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier available)
- Basic knowledge of PostgreSQL

## 🛠️ Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Fill in project details:
   - **Name**: `xsigma-auth`
   - **Database Password**: Use a strong password (save it!)
   - **Region**: Choose closest to your users
5. Click "Create new project"
6. Wait for the project to be ready (2-3 minutes)

## 🔧 Step 2: Get Your Supabase Credentials

1. In your Supabase dashboard, go to **Settings** > **API**
2. Copy the following values:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **Anon (public) key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **Service role key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (keep secret!)

## 📝 Step 3: Configure Environment Variables

1. In your XSigma frontend directory, copy the environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

## 🗄️ Step 4: Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the contents of `Backend_Xsigma/supabase/schema.sql`
3. Paste it into the SQL Editor and click **Run**
4. This will create all necessary tables, functions, and security policies

## 🔐 Step 5: Configure Authentication Settings

1. Go to **Authentication** > **Settings** in your Supabase dashboard
2. Configure the following:

### Email Settings
- **Enable email confirmations**: ✅ Enabled
- **Enable email change confirmations**: ✅ Enabled
- **Secure email change**: ✅ Enabled

### Password Settings
- **Minimum password length**: 8
- **Password requirements**: Enable uppercase, lowercase, numbers, special characters

### Session Settings
- **JWT expiry**: 3600 (1 hour)
- **Refresh token rotation**: ✅ Enabled
- **Reuse interval**: 10 seconds

### URL Configuration
- **Site URL**: `http://localhost:5173` (development) or your production URL
- **Redirect URLs**: Add your frontend URLs:
  ```
  http://localhost:5173/**
  https://xsigma.co.uk/**
  https://www.xsigma.co.uk/**
  ```

## 📧 Step 6: Configure Email Templates (Optional)

1. Go to **Authentication** > **Email Templates**
2. Customize the email templates for:
   - **Confirm signup**
   - **Magic Link**
   - **Change Email Address**
   - **Reset Password**

Use XSigma branding and professional language suitable for quantitative finance professionals.

## 🔧 Step 7: Install Dependencies

In your frontend directory, install the Supabase client:

```bash
npm install @supabase/supabase-js
```

## 🧪 Step 8: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Try to register a new user through your application
3. Check the **Authentication** > **Users** tab in Supabase dashboard
4. Verify that the user profile was created in the `user_profiles` table

## 👤 Step 9: Create Admin Users

You can create admin users in two ways:

### Method 1: Through Supabase Dashboard
1. Go to **Authentication** > **Users**
2. Click **Add user**
3. Fill in email and password
4. After creation, go to **Table Editor** > **user_profiles**
5. Find the user and change their `role` to `admin`

### Method 2: Through SQL
```sql
-- First, create the auth user (replace with actual email/password)
INSERT INTO auth.users (email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES ('admin@xsigma.co.uk', crypt('your-secure-password', gen_salt('bf')), now(), now(), now());

-- Then update the profile role
UPDATE user_profiles 
SET role = 'admin' 
WHERE id = (SELECT id FROM auth.users WHERE email = 'admin@xsigma.co.uk');
```

## 🔒 Step 10: Enable Row Level Security

The schema automatically sets up RLS policies, but verify they're working:

1. Go to **Table Editor**
2. Check that each table shows "RLS enabled" 
3. Test that users can only see their own data

## 📊 Step 11: Monitor and Analytics

1. Go to **Reports** to monitor:
   - Authentication events
   - Database performance
   - API usage
   - Error logs

## 🚀 Step 12: Production Deployment

For production:

1. **Update environment variables** with production Supabase URL
2. **Configure custom domain** (optional) in Supabase settings
3. **Set up database backups** in Supabase dashboard
4. **Enable database logs** for audit compliance
5. **Configure rate limiting** for API endpoints

## 🛡️ Security Best Practices

1. **Never expose service role key** in frontend code
2. **Use RLS policies** for all sensitive data
3. **Enable email verification** for all users
4. **Implement proper error handling** to avoid information leakage
5. **Regular security audits** of database permissions
6. **Monitor authentication logs** for suspicious activity

## 🔧 Troubleshooting

### Common Issues:

1. **"Invalid JWT"**: Check that your environment variables are correct
2. **"Row Level Security policy violation"**: Verify RLS policies are set up correctly
3. **Email not sending**: Check SMTP configuration in Authentication settings
4. **CORS errors**: Add your domain to the allowed origins in Supabase settings

### Debug Steps:

1. Check browser console for errors
2. Monitor Supabase logs in the dashboard
3. Test API calls directly in the Supabase API docs
4. Verify database schema matches the expected structure

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase CLI](https://supabase.com/docs/reference/cli)

## 🎯 Next Steps

After completing this setup:

1. **Test all authentication flows** (login, register, password reset)
2. **Implement user management** features in your admin panel
3. **Set up API key management** for programmatic access
4. **Configure audit logging** for compliance
5. **Add two-factor authentication** (optional)
6. **Implement role-based access control** for different user types

Your XSigma application now has enterprise-grade authentication powered by Supabase! 🎉
