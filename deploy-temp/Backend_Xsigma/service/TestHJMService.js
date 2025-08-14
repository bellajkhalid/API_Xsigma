'use strict';

/**
 * TestHJM Service
 * Business logic for Heath-Jarrow-Morton interest rate model calculations
 * Following Backend_Xsigma structure pattern
 * 
 * @module TestHJMService
 * @version 1.0.0
 */

const { createSuccessResponse } = require('./utils/errorHandler');
const pythonExecutor = require('./utils/pythonExecutor');
const cacheService = require('./utils/cacheService');

// Test case configurations
const TEST_CASES = {
  1: { 
    name: 'calibration_comparison', 
    description: 'HJM calibration performance comparison (AAD vs Standard)',
    defaultParams: {
      test: 1,
      output_type: 'calibration_comparison'
    }
  },
  2: { 
    name: 'simulation_analysis', 
    description: 'Monte Carlo simulation with HJM model',
    defaultParams: {
      test: 2,
      output_type: 'simulation_analysis',
      num_paths: 524288
    }
  }
};

// Default parameters
const DEFAULT_PARAMS = {
  test: 1,
  output_type: 'calibration_comparison',
  num_paths: 524288
};

/**
 * Extract and validate parameters from request
 * @param {Object} query - Request query parameters
 * @returns {Object} Validated parameters
 */
function extractParameters(query) {
  const params = { ...DEFAULT_PARAMS };
  
  // Override with provided parameters
  if (query.test !== undefined) {
    params.test = parseInt(query.test);
    if (!TEST_CASES[params.test]) {
      throw new Error(`Invalid test case: ${params.test}. Valid options: ${Object.keys(TEST_CASES).join(', ')}`);
    }
    // Set default params for test case
    Object.assign(params, TEST_CASES[params.test].defaultParams);
  }

  if (query.output_type !== undefined) {
    params.output_type = query.output_type;
  }

  if (query.num_paths !== undefined) {
    params.num_paths = parseInt(query.num_paths);
    if (params.num_paths < 1000 || params.num_paths > 10000000) {
      throw new Error('num_paths must be between 1,000 and 10,000,000');
    }
  }

  return params;
}

/**
 * Calculate TestHJM model
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
module.exports.calculateTestHJM = async function calculateTestHJM(req, res) {
  const { refresh = false } = req.query;
  const parameters = extractParameters(req.query);
  
  // Generate cache key based on parameters
  const cacheKey = cacheService.generateKey('test_hjm', parameters);

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

  // Execute Python service with extended timeout for HJM calculations
  // Timeout based on number of paths: base 60s + 30s per 100k paths
  const baseTimeout = 60000; // 1 minute base
  const pathTimeout = Math.ceil(parameters.num_paths / 100000) * 30000; // 30s per 100k paths
  const totalTimeout = Math.min(baseTimeout + pathTimeout, 300000); // Max 5 minutes

  console.log(`🕐 TestHJM timeout set to ${totalTimeout}ms for ${parameters.num_paths} paths`);

  const result = await pythonExecutor.execute('test_hjm', 'calculate', parameters, { timeout: totalTimeout });

  // Cache the result (longer cache time for expensive HJM calculations)
  cacheService.set(cacheKey, result, 600); // 10 minutes

  res.json(createSuccessResponse(result.data, 'HJM calculation completed successfully', {
    cached: false,
    testCase: parameters.test ? TEST_CASES[parameters.test] : null,
    parameters,
    responseTime: Date.now() - req.startTime,
    executionTime: result.meta.executionTime
  }));
};

/**
 * Run HJM calibration comparison
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
module.exports.runCalibrationComparison = async function runCalibrationComparison(req, res) {
  const parameters = {
    test: 1,
    output_type: 'calibration_comparison',
    ...extractParameters(req.query)
  };
  
  // Generate cache key
  const cacheKey = cacheService.generateKey('test_hjm_calibration', parameters);
  
  // Check cache
  const cachedResult = cacheService.get(cacheKey);
  if (cachedResult) {
    return res.json(createSuccessResponse(cachedResult.data, 'Calibration results retrieved from cache', {
      cached: true,
      parameters,
      responseTime: Date.now() - req.startTime
    }));
  }

  // Execute Python service with standard timeout for calibration
  const result = await pythonExecutor.execute('test_hjm', 'calculate', parameters, { timeout: 60000 });

  // Cache the result
  cacheService.set(cacheKey, result, 600); // 10 minutes

  res.json(createSuccessResponse(result.data, 'HJM calibration comparison completed successfully', {
    cached: false,
    parameters,
    responseTime: Date.now() - req.startTime,
    executionTime: result.meta.executionTime
  }));
};

/**
 * Run HJM simulation analysis
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
module.exports.runSimulationAnalysis = async function runSimulationAnalysis(req, res) {
  const parameters = {
    test: 2,
    output_type: 'simulation_analysis',
    ...extractParameters(req.query)
  };
  
  // Generate cache key
  const cacheKey = cacheService.generateKey('test_hjm_simulation', parameters);
  
  // Check cache
  const cachedResult = cacheService.get(cacheKey);
  if (cachedResult) {
    return res.json(createSuccessResponse(cachedResult.data, 'Simulation results retrieved from cache', {
      cached: true,
      parameters,
      responseTime: Date.now() - req.startTime
    }));
  }

  // Execute Python service with extended timeout for simulation
  // Timeout based on number of paths: base 60s + 30s per 100k paths
  const baseTimeout = 60000; // 1 minute base
  const pathTimeout = Math.ceil(parameters.num_paths / 100000) * 30000; // 30s per 100k paths
  const totalTimeout = Math.min(baseTimeout + pathTimeout, 300000); // Max 5 minutes

  console.log(`🕐 TestHJM simulation timeout set to ${totalTimeout}ms for ${parameters.num_paths} paths`);

  const result = await pythonExecutor.execute('test_hjm', 'calculate', parameters, { timeout: totalTimeout });

  // Cache the result
  cacheService.set(cacheKey, result, 900); // 15 minutes for simulation

  res.json(createSuccessResponse(result.data, 'HJM simulation analysis completed successfully', {
    cached: false,
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
    description: TEST_CASES[key].description,
    defaultParams: TEST_CASES[key].defaultParams
  }));

  res.json(createSuccessResponse({
    testCases,
    defaultParameters: DEFAULT_PARAMS,
    examples: {
      calibration: '/api/test-hjm?test=1',
      simulation: '/api/test-hjm?test=2&num_paths=1000000',
      calibration_endpoint: '/api/test-hjm/calibration',
      simulation_endpoint: '/api/test-hjm/simulation?num_paths=500000'
    },
    documentation: {
      description: 'Heath-Jarrow-Morton Interest Rate Model API',
      testCases: {
        1: 'Compares AAD vs Standard calibration performance',
        2: 'Runs Monte Carlo simulation with calibrated HJM parameters'
      },
      parameters: {
        test: 'Test case number (1 or 2)',
        num_paths: 'Number of Monte Carlo paths (1000-10000000)',
        output_type: 'Type of analysis to perform'
      }
    }
  }, 'Test cases retrieved successfully'));
};

/**
 * Health check for TestHJM service
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
module.exports.getHJMHealth = async function getHJMHealth(req, res) {
  try {
    // Execute health check
    const result = await pythonExecutor.execute('test_hjm', 'health_check', {});
    
    res.json(createSuccessResponse({
      service: 'TestHJM',
      status: 'healthy',
      python_service: result.data || result,
      cache_stats: cacheService.getStats(),
      available_test_cases: Object.keys(TEST_CASES).length,
      timestamp: new Date().toISOString()
    }, 'TestHJM service is healthy'));
    
  } catch (error) {
    res.status(503).json({
      status: 'error',
      service: 'TestHJM',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
};
