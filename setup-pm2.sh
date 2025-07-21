#!/bin/bash
# 🚀 PM2 Setup Script for XSIGMA Backend
# This script sets up PM2 with optimal configuration

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions for colored output
print_success() { echo -e "${GREEN}✅ $1${NC}"; }
print_error() { echo -e "${RED}❌ $1${NC}"; }
print_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
print_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }

# Configuration
APP_NAME="api-xsigma-backend"
APP_DIR="/home/debian/api-xsigma/Backend_Xsigma"
LOG_DIR="$APP_DIR/logs"

print_info "🚀 Setting up PM2 for XSIGMA Backend"
echo "App Directory: $APP_DIR"
echo "Log Directory: $LOG_DIR"
echo ""

# Check if we're in the right directory
if [ ! -f "$APP_DIR/index.js" ]; then
    print_error "index.js not found in $APP_DIR"
    print_info "Please run this script from the correct directory or update APP_DIR"
    exit 1
fi

# Create logs directory
print_info "Creating logs directory..."
mkdir -p "$LOG_DIR"
chmod 755 "$LOG_DIR"
print_success "Logs directory created: $LOG_DIR"

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    print_warning "PM2 not found. Installing PM2..."
    npm install -g pm2
    print_success "PM2 installed successfully"
else
    print_success "PM2 is already installed"
fi

# Stop existing application if running
print_info "Stopping existing application (if running)..."
pm2 stop $APP_NAME 2>/dev/null || true
pm2 delete $APP_NAME 2>/dev/null || true
print_success "Cleaned up existing PM2 processes"

# Navigate to app directory
cd "$APP_DIR"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    print_info "Installing Node.js dependencies..."
    npm install
    print_success "Dependencies installed"
fi

# Start application with ecosystem file
print_info "Starting application with PM2..."
pm2 start ecosystem.config.js --env production

# Check if application started successfully
sleep 3
if pm2 list | grep -q "$APP_NAME.*online"; then
    print_success "Application started successfully!"
else
    print_error "Failed to start application"
    print_info "Checking logs..."
    pm2 logs $APP_NAME --lines 10
    exit 1
fi

# Save PM2 configuration
print_info "Saving PM2 configuration..."
pm2 save
print_success "PM2 configuration saved"

# Setup auto-start on boot (if not already done)
if ! pm2 startup | grep -q "already"; then
    print_info "Setting up PM2 auto-start on boot..."
    pm2 startup
    print_warning "Please run the command shown above as root to complete auto-start setup"
else
    print_success "PM2 auto-start is already configured"
fi

# Install useful PM2 modules
print_info "Installing useful PM2 modules..."

# Log rotation module
if ! pm2 module:list | grep -q "pm2-logrotate"; then
    pm2 install pm2-logrotate
    pm2 set pm2-logrotate:max_size 10M
    pm2 set pm2-logrotate:retain 30
    pm2 set pm2-logrotate:compress true
    print_success "PM2 log rotation configured"
else
    print_success "PM2 log rotation already installed"
fi

# Display status
print_info "Current PM2 status:"
pm2 status

# Test application health
print_info "Testing application health..."
sleep 2

if curl -s http://localhost:5005/health > /dev/null; then
    print_success "Application health check passed!"
else
    print_warning "Health check failed - application might still be starting"
fi

# Display useful commands
echo ""
print_info "🎯 Useful PM2 Commands:"
echo "  pm2 status                    # Check application status"
echo "  pm2 logs $APP_NAME           # View application logs"
echo "  pm2 restart $APP_NAME        # Restart application"
echo "  pm2 reload $APP_NAME         # Zero-downtime reload"
echo "  pm2 stop $APP_NAME           # Stop application"
echo "  pm2 monit                    # Real-time monitoring"
echo "  pm2 describe $APP_NAME       # Detailed application info"
echo ""

print_info "🌐 Application URLs:"
echo "  Health Check: http://localhost:5005/health"
echo "  API Docs:     http://localhost:5005/api-docs"
echo "  Frontend:     http://51.83.47.117/"
echo "  Backend:      http://51.83.47.117/api/"
echo ""

print_info "📊 Monitoring:"
echo "  Real-time:    pm2 monit"
echo "  Logs:         pm2 logs $APP_NAME --follow"
echo "  Performance:  pm2 describe $APP_NAME"
echo ""

print_success "🎉 PM2 setup completed successfully!"
print_info "Your XSIGMA backend is now running with PM2 process management"

# Final status check
echo ""
print_info "Final Status Check:"
pm2 status
echo ""

# Check if nginx is running and configured
if systemctl is-active --quiet nginx; then
    print_success "Nginx is running"
    if curl -s http://localhost/api/health > /dev/null; then
        print_success "Full stack is working! Frontend and backend are accessible"
    else
        print_warning "Nginx is running but API proxy might need configuration"
    fi
else
    print_warning "Nginx is not running. Start it with: sudo systemctl start nginx"
fi

print_info "Setup complete! 🚀"
