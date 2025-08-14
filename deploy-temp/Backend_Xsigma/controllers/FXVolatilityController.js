'use strict';

/**
 * FX Volatility Controller
 * Handles HTTP requests for FX volatility calculations
 * Following Backend_Xsigma structure pattern
 * 
 * @module FXVolatilityController
 * @version 2.1.0
 */

const utils = require('../utils/writer.js');
const FXVolatilityService = require('../service/FXVolatilityService.js');

/**
 * Generic error handler for all controller methods
 * @param {Error} error - The error object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with error details
 */
const handleError = (error, res) => {
  console.error('FXVolatility Controller error:', error);
  const status = error.status || 500;
  const errorResponse = {
    status: 'error',
    error: error.message || 'Internal Server Error',
    errorType: error.name || 'GeneralError',
    timestamp: new Date().toISOString()
  };
  
  // Include detailed error info in development mode
  if (process.env.NODE_ENV === 'development') {
    errorResponse.details = {
      stack: error.stack,
      code: error.code,
      stderr: error.stderr
    };
  }
  
  return utils.writeJson(res, errorResponse, status);
};

/**
 * Controller for ATM Curve endpoint
 * Handles /api/fx-volatility/atm-curve GET requests
 */
module.exports.getATMCurve = async function getATMCurve(req, res, next) {
  console.log('Computing FX ATM volatility curve with params:', JSON.stringify(req.query, null, 2));
  try {
    await FXVolatilityService.getATMVolatilityCurve(req, res);
  } catch (error) {
    return handleError(error, res);
  }
};

/**
 * Controller for Models Comparison endpoint
 * Handles /api/fx-volatility/models-comparison GET requests
 */
module.exports.getModelsComparison = async function getModelsComparison(req, res, next) {
  console.log('Computing FX models comparison with params:', JSON.stringify(req.query, null, 2));
  try {
    await FXVolatilityService.getModelsComparison(req, res);
  } catch (error) {
    return handleError(error, res);
  }
};

/**
 * Controller for Market Data endpoint
 * Handles /api/fx-volatility/market-data GET requests
 */
module.exports.getMarketData = async function getMarketData(req, res, next) {
  console.log('Retrieving FX market data');
  try {
    await FXVolatilityService.getMarketData(req, res);
  } catch (error) {
    return handleError(error, res);
  }
};

/**
 * Controller for FX Health Check endpoint
 * Handles /api/fx-volatility/health GET requests
 */
module.exports.getFXHealth = async function getFXHealth(req, res, next) {
  console.log('Checking FX volatility service health');
  try {
    await FXVolatilityService.getHealthCheck(req, res);
  } catch (error) {
    return handleError(error, res);
  }
};
