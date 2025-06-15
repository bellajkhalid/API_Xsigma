'use strict';

/**
 * Calibration Service
 * Business logic for volatility model calibration
 * Following Backend_Xsigma structure pattern
 * 
 * @module CalibrationService
 * @version 2.1.0
 */

const { createSuccessResponse } = require('./utils/errorHandler');
const pythonExecutor = require('./utils/pythonExecutor');
const cacheService = require('./utils/cacheService');

/**
 * Perform volatility model calibration
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
module.exports.performCalibration = async function performCalibration(req, res) {
  const { refresh = false } = req.body;
  const parameters = req.body;
  
  // Generate cache key based on parameters
  const cacheKey = cacheService.generateKey('analytical_sigma_calibration', parameters);

  // Check cache unless refresh is requested
  if (!refresh) {
    const cachedResult = cacheService.get(cacheKey);
    if (cachedResult) {
      return res.json(createSuccessResponse(cachedResult.data, 'Calibration results retrieved from cache (legacy endpoint)', {
        cached: true,
        computationType: parameters.computationType,
        legacy: true,
        responseTime: Date.now() - Date.now()
      }));
    }
  }

  // Execute Python service
  const result = await pythonExecutor.execute('analytical_sigma_calibration', 'calibrate', parameters);

  // Cache the result
  cacheService.set(cacheKey, result, 600); // 10 minutes

  res.json(createSuccessResponse(result.data, 'Calibration completed successfully (legacy endpoint)', {
    cached: false,
    computationType: parameters.computationType,
    legacy: true,
    responseTime: Date.now() - Date.now(),
    executionTime: result.meta.executionTime
  }));
};
