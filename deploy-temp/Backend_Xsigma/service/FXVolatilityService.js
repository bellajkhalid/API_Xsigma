'use strict';

/**
 * FX Volatility Service
 * Business logic for FX volatility calculations
 * Following Backend_Xsigma structure pattern
 * 
 * @module FXVolatilityService
 * @version 2.1.0
 */

const { createSuccessResponse } = require('./utils/errorHandler');
const pythonExecutor = require('./utils/pythonExecutor');
const cacheService = require('./utils/cacheService');

/**
 * Get ATM volatility curve
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
module.exports.getATMVolatilityCurve = async function getATMVolatilityCurve(req, res) {
  const { refresh = false } = req.query;
  
  // Generate cache key
  const cacheKey = cacheService.generateKey('fx_volatility_atm_curve', {});

  // Check cache unless refresh is requested
  if (!refresh) {
    const cachedResult = cacheService.get(cacheKey);
    if (cachedResult) {
      return res.json(createSuccessResponse(cachedResult.data, 'ATM curve retrieved from cache', {
        cached: true,
        responseTime: Date.now() - req.startTime
      }));
    }
  }

  // Execute Python service
  const result = await pythonExecutor.execute('fx_volatility', 'atm_curve', {});

  // Cache the result
  cacheService.set(cacheKey, result, 300); // 5 minutes

  res.json(createSuccessResponse(result.data, 'ATM curve calculated successfully', {
    cached: false,
    responseTime: Date.now() - req.startTime,
    executionTime: result.meta.executionTime
  }));
};

/**
 * Get models comparison
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
module.exports.getModelsComparison = async function getModelsComparison(req, res) {
  const { refresh = false, expiry = 1.0 } = req.query;
  const parameters = { expiry: parseFloat(expiry) };
  
  // Generate cache key
  const cacheKey = cacheService.generateKey('fx_volatility_models_comparison', parameters);

  // Check cache unless refresh is requested
  if (!refresh) {
    const cachedResult = cacheService.get(cacheKey);
    if (cachedResult) {
      return res.json(createSuccessResponse(cachedResult.data, 'Models comparison retrieved from cache', {
        cached: true,
        parameters,
        responseTime: Date.now() - req.startTime
      }));
    }
  }

  // Execute Python service
  const result = await pythonExecutor.execute('fx_volatility', 'models_comparison', parameters);

  // Cache the result
  cacheService.set(cacheKey, result, 300); // 5 minutes

  res.json(createSuccessResponse(result.data, 'Models comparison calculated successfully', {
    cached: false,
    parameters,
    responseTime: Date.now() - req.startTime,
    executionTime: result.meta.executionTime
  }));
};

/**
 * Get market data
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
module.exports.getMarketData = async function getMarketData(req, res) {
  // Execute Python service
  const result = await pythonExecutor.execute('fx_volatility', 'market_data', {});

  res.json(createSuccessResponse(result.data, 'Market data retrieved successfully', {
    cached: false,
    responseTime: Date.now() - req.startTime,
    executionTime: result.meta.executionTime
  }));
};

/**
 * Get health check
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
module.exports.getHealthCheck = async function getHealthCheck(req, res) {
  try {
    // Execute Python service health check
    const result = await pythonExecutor.execute('fx_volatility', 'health_check', {});

    res.json(createSuccessResponse(result.data, 'FX Volatility service is healthy', {
      service: 'fx_volatility',
      responseTime: Date.now() - req.startTime,
      executionTime: result.meta.executionTime
    }));
  } catch (error) {
    res.status(503).json({
      status: 'error',
      error: 'FX Volatility service is unhealthy',
      details: error.message,
      service: 'fx_volatility',
      timestamp: new Date().toISOString()
    });
  }
};
