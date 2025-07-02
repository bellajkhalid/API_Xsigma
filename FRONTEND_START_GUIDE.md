# 🚀 Simple Frontend Start Guide - Remote Server

## Quick Start Method (Easiest)

### Step 1: Connect to Server
```bash
ssh debian@51.83.47.117
# Password: gTevgjCjJEhp
```

### Step 2: Go to Frontend Directory
```bash
cd /home/debian/api-xsigma/Frontend_Xsigma
```

### Step 3: Start Development Server
```bash
npm run dev -- --host 0.0.0.0 --port 3000
```

### Step 4: Access Your Frontend
Open in browser: **http://51.83.47.117:3000**

---

## Alternative: Production Method

### Step 1: Connect to Server
```bash
ssh debian@51.83.47.117
```

### Step 2: Build Frontend
```bash
cd /home/debian/api-xsigma/Frontend_Xsigma
npm run build
```

### Step 3: Deploy to Nginx
```bash
cp -r dist/* /home/debian/api-xsigma/frontend-dist/
sudo systemctl reload nginx
```

### Step 4: Access Your Frontend
Open in browser: **http://51.83.47.117/**

---

## Quick Commands Reference

```bash
# Check if running
ps aux | grep npm

# Stop development server
# Press Ctrl+C in terminal

# Check nginx status
sudo systemctl status nginx

# Restart nginx
sudo systemctl restart nginx
```

---

## URLs Summary
- **Development:** http://51.83.47.117:3000
- **Production:** http://51.83.47.117/
- **Backend API:** http://51.83.47.117/api/
