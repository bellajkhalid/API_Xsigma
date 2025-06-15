'use strict';

/**
 * Response Writer Utility
 * Standardized response formatting following Backend_Xsigma pattern
 * 
 * @module Writer
 * @version 2.1.0
 */

/**
 * Write JSON response with proper headers and status code
 * @param {Object} response - Express response object
 * @param {Object} payload - Response payload
 * @param {number} code - HTTP status code (default: 200)
 * @returns {Object} Express response
 */
module.exports.writeJson = function writeJson(response, payload, code) {
  const statusCode = code || 200;
  
  // Set proper headers
  response.setHeader('Content-Type', 'application/json');
  
  // Add CORS headers if needed
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Add timestamp if not present
  if (payload && typeof payload === 'object' && !payload.timestamp) {
    payload.timestamp = new Date().toISOString();
  }
  
  // Send response
  response.status(statusCode).json(payload);
  
  return response;
};

/**
 * Write success response with standardized format
 * @param {Object} response - Express response object
 * @param {Object} data - Response data
 * @param {string} message - Success message
 * @param {Object} meta - Additional metadata
 * @returns {Object} Express response
 */
module.exports.writeSuccess = function writeSuccess(response, data, message, meta) {
  const payload = {
    status: 'success',
    message: message || 'Operation completed successfully',
    data: data,
    timestamp: new Date().toISOString()
  };
  
  // Add metadata if provided
  if (meta) {
    payload.meta = meta;
  }
  
  return module.exports.writeJson(response, payload, 200);
};

/**
 * Write error response with standardized format
 * @param {Object} response - Express response object
 * @param {string} error - Error message
 * @param {number} code - HTTP status code
 * @param {Object} details - Additional error details
 * @returns {Object} Express response
 */
module.exports.writeError = function writeError(response, error, code, details) {
  const statusCode = code || 500;
  
  const payload = {
    status: 'error',
    error: error || 'Internal Server Error',
    timestamp: new Date().toISOString()
  };
  
  // Add details if provided
  if (details) {
    payload.details = details;
  }
  
  return module.exports.writeJson(response, payload, statusCode);
};
