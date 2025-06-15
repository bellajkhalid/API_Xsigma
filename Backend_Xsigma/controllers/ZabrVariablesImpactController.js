'use strict';

/**
 * ZABR Variables Impact Controller
 * Handles interactive volatility modeling for ZABR Classic, SABR PDE, and ZABR Mixture models
 *
 * @module ZabrVariablesImpactController
 * @version 1.0.0
 */

const ZabrVariablesImpactService = require('../service/ZabrVariablesImpactService');

// Performance metrics
const metrics = {
  totalRequests: 0,
  cacheHits: 0,
  cacheMisses: 0,
  errors: 0,
  averageResponseTime: 0
};

/**
 * Middleware to add request start time for performance tracking
 */
function addRequestStartTime(req, res, next) {
  req.startTime = Date.now();
  next();
}

/**
 * GET /api/zabr-variables-impact
 * Get ZABR Variables Impact calculation with dynamic parameters
 */
async function getZabrVariablesImpact(req, res) {
  req.startTime = Date.now();
  metrics.totalRequests++;

  try {
    const result = await ZabrVariablesImpactService.getZabrVariablesImpact(req, res);
    if (result && result.cached) {
      metrics.cacheHits++;
    } else {
      metrics.cacheMisses++;
    }
  } catch (error) {
    metrics.errors++;
    console.error('ZABR Variables Impact GET error:', error);
  }
}

/**
 * POST /api/zabr-variables-impact
 * Calculate ZABR Variables Impact with complex parameter sets
 */
async function postZabrVariablesImpact(req, res) {
  req.startTime = Date.now();
  metrics.totalRequests++;

  try {
    const result = await ZabrVariablesImpactService.postZabrVariablesImpact(req, res);
    if (result && result.cached) {
      metrics.cacheHits++;
    } else {
      metrics.cacheMisses++;
    }
  } catch (error) {
    metrics.errors++;
    console.error('ZABR Variables Impact POST error:', error);
  }
}

/**
 * GET /api/zabr-variables-impact/models
 * Get available models and their default parameters
 */
async function getAvailableModels(req, res) {
  req.startTime = Date.now();
  return ZabrVariablesImpactService.getAvailableModels(req, res);
}

/**
 * GET /api/zabr-variables-impact/model-info/{modelType}
 * Get specific model information and default parameters
 */
async function getModelInfo(req, res) {
  req.startTime = Date.now();
  return ZabrVariablesImpactService.getModelInfo(req, res);
}

/**
 * POST /api/zabr-variables-impact/calculate
 * Calculate ZABR Variables Impact with dynamic parameters (for frontend)
 */
async function calculateVolatilityImpact(req, res) {
  req.startTime = Date.now();
  metrics.totalRequests++;

  try {
    const result = await ZabrVariablesImpactService.calculateVolatilityImpact(req, res);
    if (result && result.cached) {
      metrics.cacheHits++;
    } else {
      metrics.cacheMisses++;
    }
  } catch (error) {
    metrics.errors++;
    console.error('ZABR Variables Impact calculate error:', error);
  }
}

/**
 * GET /api/zabr-variables-impact/health
 * Health check endpoint
 */
function getZabrHealth(req, res) {
  req.startTime = Date.now();
  return ZabrVariablesImpactService.getZabrHealth(req, res);
}

module.exports = {
  getZabrVariablesImpact,
  postZabrVariablesImpact,
  getAvailableModels,
  getModelInfo,
  calculateVolatilityImpact,
  getZabrHealth,
  metrics
};
