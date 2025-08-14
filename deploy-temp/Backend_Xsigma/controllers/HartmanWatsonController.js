'use strict';

/**
 * Hartman Watson Distribution Controller
 * Handles HTTP requests for Hartman Watson Distribution calculations
 * Following Backend_Xsigma structure pattern
 * 
 * @module HartmanWatsonController
 * @version 1.0.0
 */

const path = require('path');
const { spawn } = require('child_process');
const utils = require('../utils/writer.js');
const { createSuccessResponse, createErrorResponse } = require('../utils/errorHandler');

// Python configuration
const PYTHON_EXECUTABLE = process.env.XSIGMA_PYTHON || 'python';
const PYTHON_SCRIPT_PATH = path.join(__dirname, '../service/Python/HartmanWatsonDistribution.py');

/**
 * Execute Python script for Hartman Watson Distribution
 * @param {Object} params - Calculation parameters
 * @returns {Promise<Object>} Calculation results
 */
async function executePythonScript(params) {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn(PYTHON_EXECUTABLE, [
      PYTHON_SCRIPT_PATH,
      JSON.stringify(params)
    ], {
      env: {
        ...process.env,
        PYTHONPATH: process.env.PYTHONPATH || '',
        XSIGMA_DATA_ROOT: process.env.XSIGMA_DATA_ROOT || '',
        PYTHONUNBUFFERED: '1'
      }
    });

    let dataString = '';
    let errorString = '';

    pythonProcess.stdout.on('data', (data) => {
      dataString += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      errorString += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        console.error('Python script error:', errorString);
        reject(new Error(`Python script failed with code ${code}: ${errorString}`));
        return;
      }

      try {
        const result = JSON.parse(dataString.trim());
        if (result.status === 'error') {
          reject(new Error(result.error));
        } else {
          resolve(result.data);
        }
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        console.error('Raw output:', dataString);
        reject(new Error(`Failed to parse Python output: ${parseError.message}`));
      }
    });

    pythonProcess.on('error', (error) => {
      reject(new Error(`Failed to start Python process: ${error.message}`));
    });
  });
}

/**
 * GET /api/hartman-watson
 * Calculate Hartman Watson Distribution
 */
async function getHartmanWatson(req, res) {
  try {
    console.log('GET /api/hartman-watson - Query params:', req.query);

    // Extract and validate parameters
    const params = {
      n: parseInt(req.query.n) || 64,
      t: parseFloat(req.query.t) || 0.5,
      size_roots: parseInt(req.query.size_roots) || 32,
      x_0: parseFloat(req.query.x_0) || -5.0,
      x_n: parseFloat(req.query.x_n) || 3.1,
      distribution_type: req.query.distribution_type || 'MIXTURE'
    };

    // Validate parameters
    if (params.n <= 0 || params.size_roots <= 0) {
      return utils.writeJson(res, createErrorResponse('Invalid parameters: n and size_roots must be positive'), 400);
    }

    if (params.t <= 0) {
      return utils.writeJson(res, createErrorResponse('Invalid parameter: t must be positive'), 400);
    }

    if (params.x_0 >= params.x_n) {
      return utils.writeJson(res, createErrorResponse('Invalid parameters: x_0 must be less than x_n'), 400);
    }

    const result = await executePythonScript(params);
    utils.writeJson(res, createSuccessResponse(result));

  } catch (error) {
    console.error('Error in getHartmanWatson:', error);
    utils.writeJson(res, createErrorResponse(error.message), 500);
  }
}

/**
 * POST /api/hartman-watson
 * Calculate Hartman Watson Distribution with body parameters
 */
async function postHartmanWatson(req, res) {
  try {
    console.log('POST /api/hartman-watson - Body:', req.body);

    // Extract parameters from request body
    const params = {
      n: parseInt(req.body.n) || 64,
      t: parseFloat(req.body.t) || 0.5,
      size_roots: parseInt(req.body.size_roots) || 32,
      x_0: parseFloat(req.body.x_0) || -5.0,
      x_n: parseFloat(req.body.x_n) || 3.1,
      distribution_type: req.body.distribution_type || 'MIXTURE'
    };

    // Validate parameters
    if (params.n <= 0 || params.size_roots <= 0) {
      return utils.writeJson(res, createErrorResponse('Invalid parameters: n and size_roots must be positive'), 400);
    }

    if (params.t <= 0) {
      return utils.writeJson(res, createErrorResponse('Invalid parameter: t must be positive'), 400);
    }

    if (params.x_0 >= params.x_n) {
      return utils.writeJson(res, createErrorResponse('Invalid parameters: x_0 must be less than x_n'), 400);
    }

    const result = await executePythonScript(params);
    utils.writeJson(res, createSuccessResponse(result));

  } catch (error) {
    console.error('Error in postHartmanWatson:', error);
    utils.writeJson(res, createErrorResponse(error.message), 500);
  }
}

/**
 * GET /api/hartman-watson/test-cases
 * Get predefined test cases
 */
async function getTestCases(req, res) {
  try {
    console.log('GET /api/hartman-watson/test-cases');

    const pythonProcess = spawn(PYTHON_EXECUTABLE, [PYTHON_SCRIPT_PATH, 'test_cases'], {
      env: {
        ...process.env,
        PYTHONPATH: process.env.PYTHONPATH || '',
        XSIGMA_DATA_ROOT: process.env.XSIGMA_DATA_ROOT || '',
        PYTHONUNBUFFERED: '1'
      }
    });

    let dataString = '';
    let errorString = '';

    pythonProcess.stdout.on('data', (data) => {
      dataString += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      errorString += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        console.error('Python script error:', errorString);
        return utils.writeJson(res, createErrorResponse(`Python script failed: ${errorString}`), 500);
      }

      try {
        const result = JSON.parse(dataString.trim());
        if (result.status === 'error') {
          return utils.writeJson(res, createErrorResponse(result.error), 500);
        }
        utils.writeJson(res, createSuccessResponse(result.data));
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        utils.writeJson(res, createErrorResponse(`Failed to parse Python output: ${parseError.message}`), 500);
      }
    });

  } catch (error) {
    console.error('Error in getTestCases:', error);
    utils.writeJson(res, createErrorResponse(error.message), 500);
  }
}

module.exports = {
  getHartmanWatson,
  postHartmanWatson,
  getTestCases
};
