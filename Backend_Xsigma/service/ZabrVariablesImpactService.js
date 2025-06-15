'use strict';

/**
 * ZABR Variables Impact Service
 * Business logic for ZABR model volatility impact calculations
 * Following Backend_Xsigma structure pattern
 * 
 * @module ZabrVariablesImpactService
 * @version 1.0.0
 */

const { createSuccessResponse } = require('./utils/errorHandler');
const pythonExecutor = require('./utils/pythonExecutor');
const cacheService = require('./utils/cacheService');

// Model configurations
const MODEL_TYPES = {
  zabr_classic: {
    name: 'ZABR Classic',
    description: 'ZABR Classic model with volatility function σ(F_t) = α F_t^β',
    timeout: 30000 // 30 seconds
  },
  sabr_pde: {
    name: 'SABR PDE',
    description: 'SABR PDE model for yield curve dynamics and derivatives pricing',
    timeout: 60000 // 60 seconds (more complex calculations)
  },
  zabr_mixture: {
    name: 'ZABR Mixture',
    description: 'ZABR Mixture model with complex volatility function for negative rates',
    timeout: 45000 // 45 seconds
  }
};

/**
 * Validate model type
 * @param {string} modelType - Model type to validate
 * @throws {Error} If model type is invalid
 */
function validateModelType(modelType) {
  if (!MODEL_TYPES[modelType]) {
    throw new Error(`Invalid model type: ${modelType}. Valid options: ${Object.keys(MODEL_TYPES).join(', ')}`);
  }
}

/**
 * Extract and validate parameters from request
 * @param {Object} body - Request body
 * @returns {Object} Validated parameters
 */
function extractParameters(body) {
  const { model_type = 'zabr_classic', parameters = {}, use_cache = true } = body;
  
  validateModelType(model_type);
  
  return {
    model_type,
    parameters,
    use_cache
  };
}

/**
 * Get model information and default parameters
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
module.exports.getModelInfo = async function getModelInfo(req, res) {
  const { modelType } = req.params;
  
  try {
    validateModelType(modelType);
    
    // Generate cache key
    const cacheKey = cacheService.generateKey('zabr_model_info', { modelType });
    
    // Check cache
    const cachedResult = cacheService.get(cacheKey);
    if (cachedResult) {
      return res.json(createSuccessResponse(cachedResult, 'Model info retrieved from cache', {
        cached: true,
        modelType,
        responseTime: Date.now() - req.startTime
      }));
    }
    
    // Execute Python service to get model info
    const result = await pythonExecutor.execute('zabr_variables_impact', 'get_model_info', { model_type: modelType });

    // Cache the result (model info doesn't change often)
    cacheService.set(cacheKey, result, 3600); // 1 hour

    res.json(createSuccessResponse(result, 'Model information retrieved successfully', {
      cached: false,
      modelType,
      modelConfig: MODEL_TYPES[modelType],
      responseTime: Date.now() - req.startTime
    }));
    
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error: error.message,
      available_models: Object.keys(MODEL_TYPES),
      timestamp: new Date().toISOString()
    });
  }
};

/**
 * Calculate volatility impact with dynamic parameters
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
module.exports.calculateVolatilityImpact = async function calculateVolatilityImpact(req, res) {
  try {
    const { model_type, parameters, use_cache } = extractParameters(req.body);

    // Generate cache key based on model and parameters
    const cacheKey = cacheService.generateKey('zabr_calculation', { model_type, parameters });
    
    // Check cache if enabled
    if (use_cache) {
      const cachedResult = cacheService.get(cacheKey);
      if (cachedResult) {
        return res.json(createSuccessResponse(cachedResult, 'Results retrieved from cache', {
          cached: true,
          model_type,
          responseTime: Date.now() - req.startTime
        }));
      }
    }
    
    // Execute Python service with model-specific timeout
    const timeout = MODEL_TYPES[model_type].timeout;
    const result = await pythonExecutor.execute('zabr_variables_impact', 'calculate', {
      model_type,
      parameters
    }, { timeout });

    // Cache successful results
    if (use_cache && result && result.calculation_successful) {
      cacheService.set(cacheKey, result, 600); // 10 minutes
    }

    res.json(createSuccessResponse(result, 'ZABR calculation completed successfully', {
      cached: false,
      model_type,
      modelConfig: MODEL_TYPES[model_type],
      responseTime: Date.now() - req.startTime,
      executionTime: result.meta ? result.meta.executionTime : undefined
    }));
    
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error: error.message,
      available_models: Object.keys(MODEL_TYPES),
      timestamp: new Date().toISOString()
    });
  }
};

/**
 * Get all available models and their information
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
module.exports.getAvailableModels = async function getAvailableModels(req, res) {
  try {
    const models = Object.keys(MODEL_TYPES);
    const modelInfo = {};
    
    // Get info for each model (with caching)
    for (const model of models) {
      const cacheKey = cacheService.generateKey('zabr_model_info', { modelType: model });
      let info = cacheService.get(cacheKey);
      
      if (!info) {
        try {
          const result = await pythonExecutor.execute('zabr_variables_impact', 'get_model_info', { model_type: model });
          info = result;
          cacheService.set(cacheKey, info, 3600); // 1 hour
        } catch (error) {
          info = {
            status: 'error',
            error: error.message,
            model_type: model
          };
        }
      }

      modelInfo[model] = {
        ...info,
        config: MODEL_TYPES[model]
      };
    }
    
    res.json(createSuccessResponse({
      available_models: models,
      model_info: modelInfo,
      examples: {
        get_model_info: '/api/zabr-variables-impact/model-info/zabr_classic',
        calculate: {
          url: '/api/zabr-variables-impact/calculate',
          method: 'POST',
          body: {
            model_type: 'zabr_classic',
            parameters: { alpha: 0.1, beta: 0.8 }
          }
        }
      }
    }, 'Available models retrieved successfully', {
      responseTime: Date.now() - req.startTime
    }));
    
  } catch (error) {
    res.status(500).json({
      status: 'error',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
};

/**
 * Health check for ZABR Variables Impact service
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
module.exports.getZabrHealth = async function getZabrHealth(req, res) {
  try {
    // Execute health check on Python service
    const result = await pythonExecutor.execute('zabr_variables_impact', 'health_check', {});
    
    res.json(createSuccessResponse({
      service: 'ZABR Variables Impact',
      status: 'healthy',
      python_service: result,
      cache_stats: cacheService.getStats(),
      available_models: Object.keys(MODEL_TYPES),
      model_configs: MODEL_TYPES,
      timestamp: new Date().toISOString()
    }, 'ZABR Variables Impact service is healthy'));
    
  } catch (error) {
    res.status(503).json({
      status: 'error',
      service: 'ZABR Variables Impact',
      error: error.message,
      available_models: Object.keys(MODEL_TYPES),
      timestamp: new Date().toISOString()
    });
  }
};

/**
 * Legacy endpoint support - GET with query parameters
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
module.exports.getZabrVariablesImpact = async function getZabrVariablesImpact(req, res) {
  const { model_type = 'zabr_classic', use_cache = 'true', ...dynamicParams } = req.query;
  
  // Convert to POST-style body format
  const body = {
    model_type,
    parameters: dynamicParams,
    use_cache: use_cache === 'true'
  };
  
  // Reuse the POST calculation logic
  req.body = body;
  return module.exports.calculateVolatilityImpact(req, res);
};

/**
 * Legacy endpoint support - POST with different structure
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
module.exports.postZabrVariablesImpact = async function postZabrVariablesImpact(req, res) {
  const { 
    model_type = 'zabr_classic',
    initial_parameters = {},
    dynamic_parameters = {},
    use_cache = true 
  } = req.body;
  
  // Convert to new structure (use dynamic_parameters as the main parameters)
  const body = {
    model_type,
    parameters: dynamic_parameters,
    use_cache
  };
  
  // Reuse the calculation logic
  req.body = body;
  return module.exports.calculateVolatilityImpact(req, res);
};
