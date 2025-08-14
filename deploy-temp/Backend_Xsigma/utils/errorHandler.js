'use strict';

/**
 * Error Handler Utilities
 * Provides standardized error handling and response formatting
 * 
 * @module ErrorHandler
 * @version 2.1.0
 */

/**
 * Create a standardized success response
 * @param {*} data - The response data
 * @param {string} message - Optional success message
 * @returns {Object} Standardized success response
 */
function createSuccessResponse(data, message = 'Success') {
  return {
    success: true,
    status: 'success',
    message: message,
    data: data,
    timestamp: new Date().toISOString()
  };
}

/**
 * Create a standardized error response
 * @param {string} error - Error message
 * @param {string} errorType - Type of error
 * @param {number} statusCode - HTTP status code
 * @returns {Object} Standardized error response
 */
function createErrorResponse(error, errorType = 'GeneralError', statusCode = 500) {
  const errorResponse = {
    success: false,
    status: 'error',
    error: error,
    errorType: errorType,
    statusCode: statusCode,
    timestamp: new Date().toISOString()
  };

  // Include detailed error info in development mode
  if (process.env.NODE_ENV === 'development') {
    errorResponse.details = {
      environment: 'development',
      nodeVersion: process.version
    };
  }

  return errorResponse;
}

/**
 * Generic error handler for controller methods
 * @param {Error} error - The error object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with error details
 */
function handleControllerError(error, res) {
  console.error('Controller error:', error);
  const status = error.status || error.statusCode || 500;
  const errorResponse = createErrorResponse(
    error.message || 'Internal Server Error',
    error.name || 'GeneralError',
    status
  );
  
  // Include additional error details in development
  if (process.env.NODE_ENV === 'development') {
    errorResponse.details = {
      ...errorResponse.details,
      stack: error.stack,
      code: error.code,
      stderr: error.stderr
    };
  }
  
  return res.status(status).json(errorResponse);
}

/**
 * Middleware for handling async errors
 * @param {Function} fn - Async function to wrap
 * @returns {Function} Express middleware function
 */
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

/**
 * Global error handling middleware
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function globalErrorHandler(err, req, res, next) {
  console.error('Global error handler:', err);
  
  // Default error values
  let status = err.status || err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errorType = err.name || 'GeneralError';

  // Handle specific error types
  if (err.name === 'ValidationError') {
    status = 400;
    message = 'Validation Error';
  } else if (err.name === 'CastError') {
    status = 400;
    message = 'Invalid data format';
  } else if (err.code === 'ENOENT') {
    status = 404;
    message = 'Resource not found';
  }

  const errorResponse = createErrorResponse(message, errorType, status);
  
  // Include stack trace in development
  if (process.env.NODE_ENV === 'development') {
    errorResponse.details = {
      ...errorResponse.details,
      stack: err.stack,
      originalError: err
    };
  }

  res.status(status).json(errorResponse);
}

module.exports = {
  createSuccessResponse,
  createErrorResponse,
  handleControllerError,
  asyncHandler,
  globalErrorHandler
};
