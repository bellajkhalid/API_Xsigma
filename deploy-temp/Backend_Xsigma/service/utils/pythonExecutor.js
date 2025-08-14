'use strict';

/**
 * Python Service Executor
 * Centralized service for executing Python computational modules
 * Following Backend_Xsigma structure pattern
 * 
 * @module PythonExecutor
 * @version 2.1.0
 */

const { spawn } = require('child_process');
const path = require('path');

/**
 * Python service executor class
 */
class PythonExecutor {
  constructor() {
    this.timeout = 30000;
    this.maxBuffer = 1024 * 1024;
    this.encoding = 'utf8';
    this.servicePath = path.join(__dirname, '..', 'Python');

    // Configure Python command based on platform and availability
    if (process.platform === 'win32') {
      // Try to find Python installation on Windows
      const pythonPaths = [
        'C:\\Users\\bella\\AppData\\Local\\Programs\\Python\\Python311\\python.exe',
        'C:\\Python311\\python.exe',
        'C:\\Python39\\python.exe',
        'python',
        'py'
      ];

      this.pythonCommand = pythonPaths[0]; // Use the known working path
    } else {
      this.pythonCommand = 'python3';
    }

    this.activeProcesses = new Map();
  }

  /**
   * Execute a Python service with parameters
   * @param {string} serviceName - Name of the Python service
   * @param {string} operation - Operation to perform
   * @param {Object} parameters - Parameters to pass to the service
   * @param {Object} options - Execution options
   * @returns {Promise<Object>} Service execution result
   */
  async execute(serviceName, operation, parameters = {}, options = {}) {
    const startTime = Date.now();
    const processId = `${serviceName}_${operation}_${Date.now()}`;
    
    try {
      console.log(`🐍 Executing Python service: ${serviceName}.${operation}`);
      
      // Validate service exists
      const servicePath = this.getServicePath(serviceName);
      
      // Prepare arguments
      const args = this.prepareArguments(operation, parameters);
      
      // Execute Python process
      const result = await this.spawnPythonProcess(servicePath, args, processId, options);
      
      // Parse and validate result
      const parsedResult = this.parseResult(result, serviceName, operation);
      
      const executionTime = Date.now() - startTime;
      console.log(`✅ Python service completed: ${serviceName}.${operation} (${executionTime}ms)`);
      
      return {
        ...parsedResult,
        meta: {
          service: serviceName,
          operation,
          executionTime,
          timestamp: new Date().toISOString()
        }
      };
      
    } catch (error) {
      const executionTime = Date.now() - startTime;
      console.error(`❌ Python service failed: ${serviceName}.${operation} (${executionTime}ms)`, error.message);
      
      const pythonError = new Error(`Python service execution failed: ${error.message}`);
      pythonError.name = 'PythonServiceError';
      pythonError.code = 'PYTHON_SERVICE_ERROR';
      pythonError.statusCode = 500;
      pythonError.service = `${serviceName}.${operation}`;
      pythonError.stderr = error.stderr || '';
      
      throw pythonError;
    } finally {
      // Clean up process tracking
      this.activeProcesses.delete(processId);
    }
  }

  /**
   * Get the full path to a Python service
   * @param {string} serviceName - Name of the service
   * @returns {string} Full path to the service
   */
  getServicePath(serviceName) {
    const serviceMap = {
      'fx_volatility': 'FXVolatilityService.py',
      'analytical_sigma': 'AnalyticalSigmaVolatility.py',
      'analytical_sigma_calibration': 'AnalyticalSigmaVolatilityCalibration.py',
      'test_hjm': 'TestHJM.py',
      'zabr_variables_impact': 'ZabrVariablesImpact.py'
    };

    const fileName = serviceMap[serviceName];
    if (!fileName) {
      throw new Error(`Unknown Python service: ${serviceName}`);
    }

    return path.join(this.servicePath, fileName);
  }

  /**
   * Prepare arguments for Python execution
   * @param {string} operation - Operation name
   * @param {Object} parameters - Parameters object
   * @returns {Array} Array of command line arguments
   */
  prepareArguments(operation, parameters) {
    const args = [operation];
    
    if (Object.keys(parameters).length > 0) {
      args.push(JSON.stringify(parameters));
    }
    
    return args;
  }

  /**
   * Spawn Python process and handle execution
   * @param {string} servicePath - Path to Python service
   * @param {Array} args - Command line arguments
   * @param {string} processId - Unique process identifier
   * @param {Object} options - Execution options
   * @returns {Promise<string>} Process output
   */
  spawnPythonProcess(servicePath, args, processId, options = {}) {
    return new Promise((resolve, reject) => {
      const timeout = options.timeout || this.timeout;
      
      console.log(`🚀 Spawning Python process: ${this.pythonCommand} ${servicePath} ${args.join(' ')}`);

      const pythonProcess = spawn(this.pythonCommand, [servicePath, ...args], {
        cwd: path.dirname(servicePath),
        stdio: ['pipe', 'pipe', 'pipe'],
        encoding: this.encoding
      });

      // Track active process
      this.activeProcesses.set(processId, pythonProcess);

      let stdout = '';
      let stderr = '';

      // Collect stdout
      pythonProcess.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      // Collect stderr
      pythonProcess.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      // Handle process completion
      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          const error = new Error(`Python process exited with code ${code}`);
          error.stderr = stderr;
          error.stdout = stdout;
          reject(error);
          return;
        }

        if (!stdout.trim()) {
          const error = new Error('Python process produced no output');
          error.stderr = stderr;
          reject(error);
          return;
        }

        resolve(stdout);
      });

      // Handle process errors
      pythonProcess.on('error', (error) => {
        error.stderr = stderr;
        error.stdout = stdout;
        reject(error);
      });

      // Set timeout
      const timeoutId = setTimeout(() => {
        pythonProcess.kill('SIGTERM');
        const error = new Error(`Python process timeout after ${timeout}ms`);
        error.stderr = stderr;
        error.stdout = stdout;
        reject(error);
      }, timeout);

      // Clear timeout on completion
      pythonProcess.on('close', () => {
        clearTimeout(timeoutId);
      });
    });
  }

  /**
   * Parse and validate Python service result
   * @param {string} output - Raw output from Python service
   * @param {string} serviceName - Name of the service
   * @param {string} operation - Operation performed
   * @returns {Object} Parsed result
   */
  parseResult(output, serviceName, operation) {
    try {
      const result = JSON.parse(output.trim());
      
      // Validate result structure
      if (typeof result !== 'object' || result === null) {
        throw new Error('Invalid result format: expected object');
      }

      if (result.status === 'error') {
        throw new Error(result.error || 'Python service returned error status');
      }

      return result;
      
    } catch (parseError) {
      if (parseError instanceof SyntaxError) {
        console.error('Failed to parse Python output:', output);
        throw new Error(`Invalid JSON output from Python service: ${parseError.message}`);
      }
      throw parseError;
    }
  }

  /**
   * Kill all active Python processes
   */
  killAllProcesses() {
    console.log(`🛑 Killing ${this.activeProcesses.size} active Python processes`);
    
    for (const [processId, process] of this.activeProcesses) {
      try {
        process.kill('SIGTERM');
        console.log(`Killed process: ${processId}`);
      } catch (error) {
        console.error(`Failed to kill process ${processId}:`, error.message);
      }
    }
    
    this.activeProcesses.clear();
  }

  /**
   * Get statistics about Python service usage
   * @returns {Object} Usage statistics
   */
  getStats() {
    return {
      activeProcesses: this.activeProcesses.size,
      configuration: {
        timeout: this.timeout,
        maxBuffer: this.maxBuffer,
        encoding: this.encoding,
        servicePath: this.servicePath,
        pythonCommand: this.pythonCommand
      }
    };
  }
}

// Create singleton instance
const pythonExecutor = new PythonExecutor();

// Graceful shutdown handling
process.on('SIGTERM', () => {
  pythonExecutor.killAllProcesses();
});

process.on('SIGINT', () => {
  pythonExecutor.killAllProcesses();
});

module.exports = pythonExecutor;
