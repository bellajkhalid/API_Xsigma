# 🚀 XSigma OAuth Setup Guide - Complete Configuration

## 🔧 Part 1: Create Google OAuth App

### Step 1: Create Google OAuth Application
1. **Go to Google Cloud Console**: https://console.developers.google.com/
2. **Create New Project** (or select existing):
   - Project Name: `XSigma Authentication`
   - Click **"Create"**

3. **Enable Google+ API**:
   - Go to **"APIs & Services"** → **"Library"**
   - Search for **"Google+ API"**
   - Click **"Enable"**

4. **Create OAuth 2.0 Credentials**:
   - Go to **"APIs & Services"** → **"Credentials"**
   - Click **"Create Credentials"** → **"OAuth 2.0 Client ID"**
   - Application type: **"Web application"**
   - Name: **"XSigma Web App"**

5. **Configure Authorized URLs**:
   - **Authorized JavaScript origins**:
     ```
     http://localhost:5173
     https://xsigma.co.uk
     https://ukbgxxgahfihrtaiuygq.supabase.co
     ```
   - **Authorized redirect URIs**:
     ```
     https://hsatlffikgtosuvwgxrn.supabase.co/auth/v1/callback
     ```
   - Click **"Create"**

6. **Copy Credentials**:
   - Copy the **Client ID** (starts with numbers, ends with `.apps.googleusercontent.com`)
   - Copy the **Client Secret** (random string)

---

## 🔧 Part 2: Create GitHub OAuth App

### Step 1: Create GitHub OAuth Application
1. **Go to GitHub OAuth Apps**: https://github.com/settings/applications/new
2. **Fill out the form**:
   - **Application name**: `XSigma Authentication`
   - **Homepage URL**: `https://xsigma.co.uk` (use production URL)
   - **Application description**: `OAuth authentication for XSigma quantitative finance platform`
   - **Authorization callback URL**:
     ```
     https://hsatlffikgtosuvwgxrn.supabase.co/auth/v1/callback
     ```
3. **Click "Register application"**
4. **Generate Client Secret**:
   - Click **"Generate a new client secret"**
   - Copy the **Client Secret** immediately (you won't see it again)
5. **Copy Client ID** from the top of the page

---

## 🔧 Part 3: Configure Supabase

### Step 1: Add Google OAuth to Supabase
1. **Open Supabase**: https://supabase.com/dashboard/project/hsatlffikgtosuvwgxrn/auth/providers
2. **Find Google Provider**:
   - Toggle **ON**
   - **Client ID**: Paste your Google Client ID
   - **Client Secret**: Paste your Google Client Secret
   - Click **"Save"**

### Step 2: Add GitHub OAuth to Supabase
1. **Find GitHub Provider**:
   - Toggle **ON**
   - **Client ID**: Paste your GitHub Client ID
   - **Client Secret**: Paste your GitHub Client Secret
   - Click **"Save"**

### Step 4: Test Your Setup
**Visit:** http://localhost:5173/oauth-setup

---

## 🎯 What This Enables

✅ **Google Sign-In**: Users can sign in with their Google accounts  
✅ **GitHub Sign-In**: Users can sign in with their GitHub accounts  
✅ **Automatic Profiles**: User profiles created automatically in your database  
✅ **Default Permissions**: OAuth users get 'api' and 'analytics' permissions  
✅ **XSigma Branding**: Professional OAuth buttons with your design system  

---

## 🔧 Technical Details (Already Configured)

- **Redirect URL**: `https://ukbgxxgahfihrtaiuygq.supabase.co/auth/v1/callback`
- **Site URL**: `http://localhost:5173`
- **Database Schema**: ✅ Applied (user_profiles, permissions, etc.)
- **OAuth Flow**: PKCE with automatic profile creation
- **Error Handling**: Comprehensive error handling and user feedback
- **Session Management**: Persistent sessions across browser refreshes

---

## 🧪 Testing Your OAuth

After enabling the providers:

1. **Visit**: http://localhost:5173/oauth-setup (Check configuration status)
2. **Visit**: http://localhost:5173/auth-test (Test OAuth buttons)
3. **Click "Continue with Google"** → Should redirect to Google
4. **Click "Continue with GitHub"** → Should redirect to GitHub
5. **After authentication** → User profile created automatically

---

## 🚨 Troubleshooting

**"Provider not configured" error:**
- Make sure you toggled the provider ON in Supabase
- Click "Save" after enabling each provider

**"Redirect URI mismatch":**
- This shouldn't happen with Supabase defaults
- If it does, the redirect URL is: `https://ukbgxxgahfihrtaiuygq.supabase.co/auth/v1/callback`

**OAuth buttons don't work:**
- Check the browser console for errors
- Visit `/oauth-setup` to see detailed status

---

## ✅ Success Criteria

When setup is complete, you should see:
- ✅ Green checkmarks on `/oauth-setup` page
- ✅ OAuth buttons work on `/auth-test` page  
- ✅ User profiles created in Supabase database
- ✅ Seamless authentication flow

---

## 🎉 Next Steps

Once OAuth is working:
1. **Phase 5**: Authentication Context & State Management
2. **Phase 6**: Navigation Integration  
3. **Phase 7**: Protected Routes System
4. **Phase 8**: Integration with Existing Pages

Your XSigma authentication system will be production-ready! 🚀
