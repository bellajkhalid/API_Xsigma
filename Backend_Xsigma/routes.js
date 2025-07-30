'use strict';

/**
 * Auto-generated Routes Configuration
 * Following Backend_Xsigma pattern for route management
 * 
 * @module Routes
 * @version 2.1.0
 */

const express = require('express');
const AnalyticalSigmaController = require('./controllers/AnalyticalSigmaController');
const FXVolatilityController = require('./controllers/FXVolatilityController');
const CalibrationController = require('./controllers/CalibrationController');
const HartmanWatsonController = require('./controllers/HartmanWatsonController');
const TestHJMController = require('./controllers/TestHJMController');
const ZabrVariablesImpactController = require('./controllers/ZabrVariablesImpactController');

/**
 * Configure all API routes
 * @param {Object} app - Express application instance
 */
module.exports = function configureRoutes(app) {
  const router = express.Router();

  // ===== ANALYTICAL SIGMA ROUTES =====
  
  // GET /api/analytical-sigma
  router.get('/api/analytical-sigma', AnalyticalSigmaController.getAnalyticalSigma);
  
  // POST /api/analytical-sigma
  router.post('/api/analytical-sigma', AnalyticalSigmaController.postAnalyticalSigma);
  
  // GET /api/analytical-sigma/test-cases
  router.get('/api/analytical-sigma/test-cases', AnalyticalSigmaController.getTestCases);

  // ===== FX VOLATILITY ROUTES =====
  
  // GET /api/fx-volatility/atm-curve
  router.get('/api/fx-volatility/atm-curve', FXVolatilityController.getATMCurve);
  
  // GET /api/fx-volatility/models-comparison
  router.get('/api/fx-volatility/models-comparison', FXVolatilityController.getModelsComparison);
  
  // GET /api/fx-volatility/market-data
  router.get('/api/fx-volatility/market-data', FXVolatilityController.getMarketData);
  
  // GET /api/fx-volatility/health
  router.get('/api/fx-volatility/health', FXVolatilityController.getFXHealth);

  // ===== HARTMAN WATSON DISTRIBUTION ROUTES =====

  // GET /api/hartman-watson
  router.get('/api/hartman-watson', HartmanWatsonController.getHartmanWatson);

  // POST /api/hartman-watson
  router.post('/api/hartman-watson', HartmanWatsonController.postHartmanWatson);

  // GET /api/hartman-watson/test-cases
  router.get('/api/hartman-watson/test-cases', HartmanWatsonController.getTestCases);

  // ===== TEST HJM ROUTES =====

  // GET /api/test-hjm
  router.get('/api/test-hjm', TestHJMController.getTestHJM);

  // POST /api/test-hjm
  router.post('/api/test-hjm', TestHJMController.postTestHJM);

  // GET /api/test-hjm/calibration
  router.get('/api/test-hjm/calibration', TestHJMController.getCalibration);

  // GET /api/test-hjm/simulation
  router.get('/api/test-hjm/simulation', TestHJMController.getSimulation);

  // GET /api/test-hjm/test-cases
  router.get('/api/test-hjm/test-cases', TestHJMController.getTestCases);

  // GET /api/test-hjm/health
  router.get('/api/test-hjm/health', TestHJMController.getHJMHealth);

  // ===== ZABR VARIABLES IMPACT ROUTES =====

  // GET /api/zabr-variables-impact
  router.get('/api/zabr-variables-impact', ZabrVariablesImpactController.getZabrVariablesImpact);

  // POST /api/zabr-variables-impact
  router.post('/api/zabr-variables-impact', ZabrVariablesImpactController.postZabrVariablesImpact);

  // GET /api/zabr-variables-impact/models
  router.get('/api/zabr-variables-impact/models', ZabrVariablesImpactController.getAvailableModels);

  // GET /api/zabr-variables-impact/model-info/:modelType
  router.get('/api/zabr-variables-impact/model-info/:modelType', ZabrVariablesImpactController.getModelInfo);

  // POST /api/zabr-variables-impact/calculate
  router.post('/api/zabr-variables-impact/calculate', ZabrVariablesImpactController.calculateVolatilityImpact);

  // GET /api/zabr-variables-impact/health
  router.get('/api/zabr-variables-impact/health', ZabrVariablesImpactController.getZabrHealth);

  // ===== CALIBRATION ROUTES =====

  // POST /api/AnalyticalSigmaVolatilityCalibration (Legacy endpoint)
  router.post('/api/AnalyticalSigmaVolatilityCalibration', CalibrationController.volatilityCalibrationPOST);

  // ===== SYSTEM ROUTES =====
  
  // GET /doc - Redirect to Sphinx documentation
  router.get('/doc', (req, res) => {
    res.redirect('/sphinx-doc/xsigma-1.1-3/index.html');
  });

  // GET / - API Information
  router.get('/', (req, res) => {
    res.json({
      name: 'Analytical Sigma Volatility API',
      version: '2.1.0',
      description: 'Advanced quantitative finance API for volatility modeling',
      endpoints: {
        analytical_sigma: '/api/analytical-sigma',
        fx_volatility: '/api/fx-volatility',
        hartman_watson: '/api/hartman-watson',
        test_hjm: '/api/test-hjm',
        zabr_variables_impact: '/api/zabr-variables-impact',
        calibration: '/api/AnalyticalSigmaVolatilityCalibration',
        documentation: '/api-docs',
        sphinx_documentation: '/sphinx-doc/xsigma-1.1-3/index.html',
        doc_redirect: '/doc',
        health: '/health',
        metrics: '/metrics'
      },
      timestamp: new Date().toISOString()
    });
  });

  // Apply all routes to the app
  app.use('/', router);

  console.log('✅ Routes configured successfully');
  console.log('📊 Available endpoints:');
  console.log('   GET  /api/analytical-sigma');
  console.log('   POST /api/analytical-sigma');
  console.log('   GET  /api/analytical-sigma/test-cases');
  console.log('   GET  /api/fx-volatility/atm-curve');
  console.log('   GET  /api/fx-volatility/models-comparison');
  console.log('   GET  /api/fx-volatility/market-data');
  console.log('   GET  /api/fx-volatility/health');
  console.log('   GET  /api/hartman-watson');
  console.log('   POST /api/hartman-watson');
  console.log('   GET  /api/hartman-watson/test-cases');
  console.log('   GET  /api/test-hjm');
  console.log('   POST /api/test-hjm');
  console.log('   GET  /api/test-hjm/calibration');
  console.log('   GET  /api/test-hjm/simulation');
  console.log('   GET  /api/test-hjm/test-cases');
  console.log('   GET  /api/test-hjm/health');
  console.log('   GET  /api/zabr-variables-impact');
  console.log('   POST /api/zabr-variables-impact');
  console.log('   GET  /api/zabr-variables-impact/models');
  console.log('   GET  /api/zabr-variables-impact/model-info/:modelType');
  console.log('   POST /api/zabr-variables-impact/calculate');
  console.log('   GET  /api/zabr-variables-impact/health');
  console.log('   POST /api/AnalyticalSigmaVolatilityCalibration');
};
