// 🚀 PM2 Ecosystem Configuration for XSIGMA Backend
// Optimized for production deployment

module.exports = {
  apps: [{
    // Application Configuration
    name: 'api-xsigma-backend',
    script: 'index.js',
    cwd: '/home/debian/api-xsigma/Backend_Xsigma',
    
    // Instance Configuration
    instances: 1,                    // Start with 1 instance, can scale later
    exec_mode: 'fork',               // Use 'cluster' for multiple instances
    
    // Auto-restart Configuration
    autorestart: true,               // Auto restart on crash
    watch: false,                    // Don't watch files in production
    max_restarts: 10,                // Max restart attempts
    min_uptime: '10s',               // Min uptime before considering stable
    max_memory_restart: '1G',        // Restart if memory exceeds 1GB
    
    // Environment Variables
    env: {
      NODE_ENV: 'production',
      PORT: 5005,
      API_VERSION: '1.0.0',
      LOG_LEVEL: 'info'
    },
    
    // Development Environment (use with --env development)
    env_development: {
      NODE_ENV: 'development',
      PORT: 5005,
      LOG_LEVEL: 'debug',
      WATCH: true
    },
    
    // Staging Environment (use with --env staging)
    env_staging: {
      NODE_ENV: 'staging',
      PORT: 5005,
      LOG_LEVEL: 'info'
    },
    
    // Logging Configuration
    log_file: './logs/combined.log',
    out_file: './logs/out.log',
    error_file: './logs/err.log',
    time: true,                      // Prefix logs with timestamp
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    
    // Advanced Options
    merge_logs: true,                // Merge logs from all instances
    kill_timeout: 5000,              // Time to wait before force killing
    listen_timeout: 8000,            // Time to wait for app to listen
    shutdown_with_message: true,     // Shutdown gracefully
    
    // Monitoring
    pmx: true,                       // Enable PMX monitoring
    
    // Process Management
    restart_delay: 4000,             // Delay between restarts
    
    // Ignore these patterns when watching
    ignore_watch: [
      'node_modules',
      'logs',
      '*.log',
      '.git',
      'docs',
      'test'
    ],
    
    // Additional PM2 Options
    source_map_support: true,        // Enable source map support
    instance_var: 'INSTANCE_ID',     // Environment variable for instance ID
    
    // Health Check (if using PM2 Plus)
    health_check_grace_period: 3000,
    
    // Cron Restart (optional - restart daily at 2 AM)
    // cron_restart: '0 2 * * *',
    
    // Node.js Options
    node_args: [
      '--max-old-space-size=1024',   // Limit memory to 1GB
      '--optimize-for-size'          // Optimize for memory usage
    ]
  }],
  
  // Deployment Configuration (optional)
  deploy: {
    production: {
      user: 'debian',
      host: '51.83.47.117',
      ref: 'origin/main',
      repo: 'your-git-repo-url',
      path: '/home/debian/api-xsigma',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};

// 📋 Usage Examples:
//
// Start application:
//   pm2 start ecosystem.config.js
//
// Start with specific environment:
//   pm2 start ecosystem.config.js --env development
//   pm2 start ecosystem.config.js --env staging
//   pm2 start ecosystem.config.js --env production
//
// Scale to multiple instances:
//   pm2 scale api-xsigma-backend 4
//
// Reload with zero downtime:
//   pm2 reload api-xsigma-backend
//
// Monitor application:
//   pm2 monit
//   pm2 logs api-xsigma-backend
//
// Save configuration:
//   pm2 save
//
// Setup auto-start on boot:
//   pm2 startup
//   pm2 save
