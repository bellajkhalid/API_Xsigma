'use strict';

/**
 * TestHJM Controller
 * Handles HTTP requests for Heath-Jarrow-Morton interest rate model calculations
 * Following Backend_Xsigma structure pattern
 * 
 * @module TestHJMController
 * @version 1.0.0
 */

const utils = require('../utils/writer.js');
const TestHJMService = require('../service/TestHJMService.js');

/**
 * Generic error handler for all controller methods
 * @param {Error} error - The error object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with error details
 */
const handleError = (error, res) => {
  console.error('TestHJM Controller error:', error);
  const status = error.status || 500;
  const errorResponse = {
    status: 'error',
    error: error.message || 'Internal Server Error',
    errorType: error.name || 'GeneralError',
    service: 'TestHJM',
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
 * Controller for TestHJM GET endpoint
 * Handles /api/test-hjm GET requests
 */
module.exports.getTestHJM = async function getTestHJM(req, res, next) {
  console.log('Computing TestHJM with params:', JSON.stringify(req.query, null, 2));
  try {
    await TestHJMService.calculateTestHJM(req, res);
  } catch (error) {
    return handleError(error, res);
  }
};

/**
 * Controller for TestHJM POST endpoint
 * Handles /api/test-hjm POST requests
 */
module.exports.postTestHJM = async function postTestHJM(req, res, next) {
  console.log('Computing TestHJM with body params:', JSON.stringify(req.body, null, 2));
  try {
    // Convert body to query format for service compatibility
    await TestHJMService.calculateTestHJM({ query: req.body }, res);
  } catch (error) {
    return handleError(error, res);
  }
};

/**
 * Controller for TestHJM Calibration endpoint
 * Handles /api/test-hjm/calibration GET requests
 */
module.exports.getCalibration = async function getCalibration(req, res, next) {
  console.log('Running HJM calibration comparison with params:', JSON.stringify(req.query, null, 2));
  try {
    await TestHJMService.runCalibrationComparison(req, res);
  } catch (error) {
    return handleError(error, res);
  }
};

/**
 * Controller for TestHJM Simulation endpoint
 * Handles /api/test-hjm/simulation GET requests
 */
module.exports.getSimulation = async function getSimulation(req, res, next) {
  console.log('Running HJM simulation analysis with params:', JSON.stringify(req.query, null, 2));
  try {
    await TestHJMService.runSimulationAnalysis(req, res);
  } catch (error) {
    return handleError(error, res);
  }
};

/**
 * Controller for Test Cases endpoint
 * Handles /api/test-hjm/test-cases GET requests
 */
module.exports.getTestCases = async function getTestCases(req, res, next) {
  console.log('Retrieving TestHJM test cases');
  try {
    await TestHJMService.getTestCases(req, res);
  } catch (error) {
    return handleError(error, res);
  }
};

/**
 * Controller for Health Check endpoint
 * Handles /api/test-hjm/health GET requests
 */
module.exports.getHJMHealth = async function getHJMHealth(req, res, next) {
  console.log('Checking TestHJM service health');
  try {
    await TestHJMService.getHJMHealth(req, res);
  } catch (error) {
    return handleError(error, res);
  }
};
