'use strict';

/**
 * Analytical Sigma Service
 * Business logic for analytical sigma volatility calculations
 * Following Backend_Xsigma structure pattern
 * 
 * @module AnalyticalSigmaService
 * @version 2.1.0
 */

const { createSuccessResponse } = require('./utils/errorHandler');
const pythonExecutor = require('./utils/pythonExecutor');
const cacheService = require('./utils/cacheService');

// Test case configurations
const TEST_CASES = {
  1: { name: 'volatility_surface', description: 'Volatility surface calculation' },
  2: { name: 'vols_plus_minus', description: 'Volatility sensitivity analysis' },
  3: { name: 'density', description: 'Probability density function' },
  4: { name: 'probability', description: 'Cumulative probability distribution' }
};

// Default parameters
const DEFAULT_PARAMS = {
  n: 200,
  fwd: 1.0,
  time: 1.0,
  ctrl_p: 0.2,
  ctrl_c: 0.2,
  atm: 0.1,
  skew: 0.02,
  smile: 0.003,
  put: -0.002,
  call: -0.0001
};

/**
 * Extract and validate parameters from request
 * @param {Object} query - Request query parameters
 * @returns {Object} Validated parameters
 */
function extractParameters(query) {
  const params = { ...DEFAULT_PARAMS };
  
  // Override with provided parameters
  Object.keys(DEFAULT_PARAMS).forEach(key => {
    if (query[key] !== undefined) {
      params[key] = parseFloat(query[key]);
    }
  });

  // Add test case if specified
  if (query.test) {
    params.test = parseInt(query.test);
    
    if (!TEST_CASES[params.test]) {
      throw new Error(`Invalid test case: ${params.test}. Valid options: ${Object.keys(TEST_CASES).join(', ')}`);
    }
  }

  return params;
}

/**
 * Calculate analytical sigma volatility
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
module.exports.calculateAnalyticalSigma = async function calculateAnalyticalSigma(req, res) {
  const { refresh = false } = req.query;
  const parameters = extractParameters(req.query);
  
  // Generate cache key based on parameters
  const cacheKey = cacheService.generateKey('analytical_sigma', parameters);

  // Check cache unless refresh is requested
  if (!refresh) {
    const cachedResult = cacheService.get(cacheKey);
    if (cachedResult) {
      return res.json(createSuccessResponse(cachedResult.data, 'Results retrieved from cache', {
        cached: true,
        testCase: parameters.test ? TEST_CASES[parameters.test] : null,
        parameters,
        responseTime: Date.now() - req.startTime
      }));
    }
  }

  // Execute Python service
  const result = await pythonExecutor.execute('analytical_sigma', 'calculate', parameters);

  // Cache the result
  cacheService.set(cacheKey, result, 300); // 5 minutes

  res.json(createSuccessResponse(result.data, 'Calculation completed successfully', {
    cached: false,
    testCase: parameters.test ? TEST_CASES[parameters.test] : null,
    parameters,
    responseTime: Date.now() - req.startTime,
    executionTime: result.meta.executionTime
  }));
};

/**
 * Get available test cases
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
module.exports.getTestCases = async function getTestCases(req, res) {
  const testCases = Object.keys(TEST_CASES).map(key => ({
    test: parseInt(key),
    name: TEST_CASES[key].name,
    description: TEST_CASES[key].description
  }));

  res.json(createSuccessResponse({
    testCases,
    defaultParameters: DEFAULT_PARAMS,
    examples: {
      test1: '/api/analytical-sigma?test=1&n=200&fwd=2245.07&time=1.0&atm=1.1',
      test2: '/api/analytical-sigma?test=2&n=200&fwd=1.0&time=0.333&atm=0.1929'
    }
  }, 'Test cases retrieved successfully'));
};
