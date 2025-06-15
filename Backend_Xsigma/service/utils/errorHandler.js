'use strict';

/**
 * Error Handler Utilities
 * Following Backend_Xsigma structure pattern
 * 
 * @module ErrorHandler
 * @version 2.1.0
 */

/**
 * Create a standardized success response
 * @param {Object} data - Response data
 * @param {string} message - Success message
 * @param {Object} meta - Additional metadata
 * @returns {Object} Standardized success response
 */
function createSuccessResponse(data, message = 'Operation completed successfully', meta = {}) {
  return {
    status: 'success',
    message,
    data,
    meta: {
      timestamp: new Date().toISOString(),
      ...meta
    }
  };
}

/**
 * Create a standardized error response
 * @param {string} error - Error message
 * @param {string} code - Error code
 * @param {Object} details - Additional error details
 * @returns {Object} Standardized error response
 */
function createErrorResponse(error, code = 'GENERAL_ERROR', details = {}) {
  return {
    status: 'error',
    error,
    code,
    timestamp: new Date().toISOString(),
    ...details
  };
}

/**
 * Custom error class for Python service errors
 */
class PythonServiceError extends Error {
  constructor(message, service, stderr = '') {
    super(message);
    this.name = 'PythonServiceError';
    this.code = 'PYTHON_SERVICE_ERROR';
    this.statusCode = 500;
    this.service = service;
    this.stderr = stderr;
    this.timestamp = new Date().toISOString();
    this.isOperational = true;
  }
}

/**
 * Custom error class for validation errors
 */
class ValidationError extends Error {
  constructor(message, field = null) {
    super(message);
    this.name = 'ValidationError';
    this.code = 'VALIDATION_ERROR';
    this.statusCode = 400;
    this.field = field;
    this.timestamp = new Date().toISOString();
    this.isOperational = true;
  }
}

/**
 * Custom error class for service unavailable errors
 */
class ServiceUnavailableError extends Error {
  constructor(message, service) {
    super(message);
    this.name = 'ServiceUnavailableError';
    this.code = 'SERVICE_UNAVAILABLE';
    this.statusCode = 503;
    this.service = service;
    this.timestamp = new Date().toISOString();
    this.isOperational = true;
  }
}

/**
 * Handle and format errors for API responses
 * @param {Error} error - The error to handle
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function handleError(error, req, res, next) {
  // Log error for debugging
  console.error('Error Handler:', {
    name: error.name,
    message: error.message,
    code: error.code,
    statusCode: error.statusCode,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString(),
    stack: error.stack
  });

  // Determine status code
  const statusCode = error.statusCode || error.status || 500;

  // Create error response
  const errorResponse = createErrorResponse(
    error.message || 'Internal Server Error',
    error.code || 'INTERNAL_ERROR',
    {
      path: req.path,
      method: req.method,
      service: error.service,
      field: error.field
    }
  );

  // Add development details if in development mode
  if (process.env.NODE_ENV === 'development') {
    errorResponse.details = {
      stack: error.stack,
      stderr: error.stderr
    };
  }

  res.status(statusCode).json(errorResponse);
}

/**
 * Async error wrapper for route handlers
 * @param {Function} fn - Async function to wrap
 * @returns {Function} Wrapped function with error handling
 */
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

/**
 * Validate required parameters
 * @param {Object} params - Parameters to validate
 * @param {Array} required - Array of required parameter names
 * @throws {ValidationError} If required parameters are missing
 */
function validateRequiredParams(params, required) {
  const missing = required.filter(param => 
    params[param] === undefined || params[param] === null || params[param] === ''
  );

  if (missing.length > 0) {
    throw new ValidationError(
      `Missing required parameters: ${missing.join(', ')}`,
      missing[0]
    );
  }
}

/**
 * Validate numeric parameters
 * @param {Object} params - Parameters to validate
 * @param {Array} numeric - Array of numeric parameter names
 * @throws {ValidationError} If parameters are not numeric
 */
function validateNumericParams(params, numeric) {
  for (const param of numeric) {
    if (params[param] !== undefined && isNaN(Number(params[param]))) {
      throw new ValidationError(
        `Parameter '${param}' must be a valid number`,
        param
      );
    }
  }
}

module.exports = {
  createSuccessResponse,
  createErrorResponse,
  PythonServiceError,
  ValidationError,
  ServiceUnavailableError,
  handleError,
  asyncHandler,
  validateRequiredParams,
  validateNumericParams
};
