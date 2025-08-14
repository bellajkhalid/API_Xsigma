'use strict';

/**
 * Calibration Controller
 * Handles HTTP requests for volatility model calibration
 * Following Backend_Xsigma structure pattern
 * 
 * @module CalibrationController
 * @version 2.1.0
 */

const utils = require('../utils/writer.js');
const CalibrationService = require('../service/CalibrationService.js');

/**
 * Generic error handler for all controller methods
 * @param {Error} error - The error object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with error details
 */
const handleError = (error, res) => {
  console.error('Calibration Controller error:', error);
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
 * Controller for Volatility Model Calibration POST endpoint
 * Handles /api/AnalyticalSigmaVolatilityCalibration POST requests
 * This controller performs volatility model calibration and computes volatility surfaces or density functions
 */
module.exports.volatilityCalibrationPOST = async function volatilityCalibrationPOST(req, res, next) {
  console.log('Processing AnalyticalSigmaVolatilityCalibration request with params:', 
    JSON.stringify(req.body, null, 2));
  
  try {
    // The actual validation is performed in the service layer
    await CalibrationService.performCalibration(req, res);
  } catch (error) {
    return handleError(error, res);
  }
};
