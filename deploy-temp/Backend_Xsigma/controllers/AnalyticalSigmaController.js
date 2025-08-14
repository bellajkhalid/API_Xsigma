'use strict';

/**
 * Analytical Sigma Controller
 * Handles HTTP requests for analytical sigma volatility calculations
 * Following Backend_Xsigma structure pattern
 * 
 * @module AnalyticalSigmaController
 * @version 2.1.0
 */

const utils = require('../utils/writer.js');
const AnalyticalSigmaService = require('../service/AnalyticalSigmaService.js');

/**
 * Generic error handler for all controller methods
 * @param {Error} error - The error object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with error details
 */
const handleError = (error, res) => {
  console.error('AnalyticalSigma Controller error:', error);
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
 * Controller for Analytical Sigma GET endpoint
 * Handles /api/analytical-sigma GET requests
 */
module.exports.getAnalyticalSigma = async function getAnalyticalSigma(req, res, next) {
  console.log('Computing analytical sigma with params:', JSON.stringify(req.query, null, 2));
  try {
    await AnalyticalSigmaService.calculateAnalyticalSigma(req, res);
  } catch (error) {
    return handleError(error, res);
  }
};

/**
 * Controller for Analytical Sigma POST endpoint
 * Handles /api/analytical-sigma POST requests
 */
module.exports.postAnalyticalSigma = async function postAnalyticalSigma(req, res, next) {
  console.log('Computing analytical sigma with body params:', JSON.stringify(req.body, null, 2));
  try {
    // Convert body to query format for service compatibility
    await AnalyticalSigmaService.calculateAnalyticalSigma({ query: req.body }, res);
  } catch (error) {
    return handleError(error, res);
  }
};

/**
 * Controller for Test Cases endpoint
 * Handles /api/analytical-sigma/test-cases GET requests
 */
module.exports.getTestCases = async function getTestCases(req, res, next) {
  console.log('Retrieving analytical sigma test cases');
  try {
    await AnalyticalSigmaService.getTestCases(req, res);
  } catch (error) {
    return handleError(error, res);
  }
};
