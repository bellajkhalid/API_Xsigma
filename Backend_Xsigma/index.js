'use strict';

/**
 * Analytical Sigma Volatility API Server
 * Following Backend_Xsigma structure pattern
 * 
 * @version 2.1.0
 * @author XSigma Team
 */

console.log('🚀 Starting Analytical Sigma Volatility API Server...');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

// Import route configuration
const configureRoutes = require('./routes');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5005;

// Performance metrics
const metrics = {
  requests: 0,
  errors: 0,
  cacheHits: 0,
  cacheMisses: 0,
  averageResponseTime: 0,
  startTime: Date.now()
};

// ===== MIDDLEWARE SETUP =====

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      baseUri: ["'self'"],
      fontSrc: ["'self'", "https:", "data:"],
      formAction: ["'self'"],
      frameAncestors: ["'self'"],
      objectSrc: ["'none'"],
      scriptSrcAttr: ["'none'"],
      upgradeInsecureRequests: []
    }
  },
  crossOriginOpenerPolicy: { policy: "same-origin" },
  crossOriginResourcePolicy: { policy: "same-origin" },
  originAgentCluster: true
}));

// Compression
app.use(compression());

// CORS
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || [
    'http://localhost:3000', 
    'http://localhost:5004', 
    'http://localhost:8080', 
    'http://localhost:8081'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    status: 'error',
    error: 'Too many requests, please try again later.',
    retryAfter: '15 minutes'
  }
});
app.use('/api/', limiter);

// Request logging
app.use(morgan('combined', {
  skip: (req, res) => req.path === '/health'
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Performance tracking middleware
app.use((req, res, next) => {
  req.startTime = Date.now();
  metrics.requests++;
  
  res.on('finish', () => {
    const responseTime = Date.now() - req.startTime;
    metrics.averageResponseTime = (metrics.averageResponseTime + responseTime) / 2;
    
    if (res.statusCode >= 400) {
      metrics.errors++;
    }
  });
  
  next();
});

// ===== SWAGGER DOCUMENTATION =====

let swaggerDocument;
try {
  swaggerDocument = YAML.load(path.join(__dirname, 'api', 'openapi.yaml'));
  console.log('📚 Swagger documentation loaded successfully');
} catch (error) {
  console.warn('⚠️  Could not load Swagger documentation:', error.message);
}

// Swagger UI
if (swaggerDocument) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Analytical Sigma Volatility API',
    swaggerOptions: {
      requestInterceptor: (request) => {
        request.headers['Content-Type'] = 'application/json';
        return request;
      }
    }
  }));
}

// ===== CONFIGURE ROUTES =====

configureRoutes(app);

// ===== SYSTEM ENDPOINTS =====

// Health check endpoint
app.get('/health', (req, res) => {
  const uptime = Date.now() - metrics.startTime;
  const healthStatus = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(uptime / 1000)}s`,
    version: '2.1.0',
    metrics: {
      totalRequests: metrics.requests,
      totalErrors: metrics.errors,
      errorRate: metrics.requests > 0 ? (metrics.errors / metrics.requests * 100).toFixed(2) + '%' : '0%',
      averageResponseTime: Math.round(metrics.averageResponseTime) + 'ms'
    }
  };
  
  res.json(healthStatus);
});

// Metrics endpoint
app.get('/metrics', (req, res) => {
  res.json({
    ...metrics,
    uptime: Date.now() - metrics.startTime,
    timestamp: new Date().toISOString()
  });
});

// ===== ERROR HANDLING =====

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    error: 'Endpoint not found',
    path: req.originalUrl,
    method: req.method,
    availableEndpoints: [
      'GET /',
      'GET /health',
      'GET /metrics',
      'GET /api-docs',
      'GET /api/analytical-sigma',
      'POST /api/analytical-sigma',
      'GET /api/analytical-sigma/test-cases',
      'GET /api/fx-volatility/atm-curve',
      'GET /api/fx-volatility/models-comparison',
      'GET /api/fx-volatility/market-data',
      'GET /api/fx-volatility/health',
      'POST /api/AnalyticalSigmaVolatilityCalibration'
    ],
    timestamp: new Date().toISOString()
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  metrics.errors++;
  
  res.status(error.status || 500).json({
    status: 'error',
    error: error.message || 'Internal server error',
    timestamp: new Date().toISOString(),
    requestId: req.headers['x-request-id'] || 'unknown'
  });
});

// ===== GRACEFUL SHUTDOWN =====

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

// ===== START SERVER =====

app.listen(PORT, () => {
  console.log('✅ Configuration validated successfully');
  console.log('🚀 Analytical Sigma Volatility API v2.1.0 started');
  console.log(`📊 Server running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
  console.log(`❤️  Health Check: http://localhost:${PORT}/health`);
  console.log(`📈 Metrics: http://localhost:${PORT}/metrics`);
  console.log('🎯 Environment: development');
});

// Export for testing
module.exports = { app, metrics };
