# TestHJM Integration Documentation

## Overview

The TestHJM integration provides Heath-Jarrow-Morton (HJM) interest rate model functionality through the Backend_Xsigma API. This integration follows the same pattern as the AnalyticalSigmaVolatility service, converting the `TestHJM.ipynb` notebook into a production-ready API service.

## Architecture

The integration follows the Backend_Xsigma three-layer architecture:

```
Controller → Service → Python Script
```

### Components

1. **`TestHJM.py`** - Core computational logic (Python)
2. **`TestHJMService.js`** - Business logic layer (JavaScript)
3. **`TestHJMController.js`** - HTTP request handling (JavaScript)
4. **Routes** - API endpoint configuration

## Features

### Test Cases

#### Test Case 1: Calibration Performance Comparison
- **Endpoint**: `/api/test-hjm?test=1` or `/api/test-hjm/calibration`
- **Description**: Compares AAD (Automatic Adjoint Differentiation) vs Standard calibration methods
- **Output**: Performance metrics, timing comparison, speedup factors

#### Test Case 2: Monte Carlo Simulation
- **Endpoint**: `/api/test-hjm?test=2` or `/api/test-hjm/simulation`
- **Description**: Runs Monte Carlo simulation with calibrated HJM parameters
- **Output**: Simulation results, volatility analysis, market data comparison

## API Endpoints

### Main Endpoints

```
GET  /api/test-hjm                    # General HJM calculation
POST /api/test-hjm                    # HJM with complex parameters
GET  /api/test-hjm/calibration        # Calibration comparison
GET  /api/test-hjm/simulation         # Monte Carlo simulation
GET  /api/test-hjm/test-cases         # Available test configurations
GET  /api/test-hjm/health             # Service health check
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `test` | integer | 1 | Test case (1=calibration, 2=simulation) |
| `num_paths` | integer | 524288 | Monte Carlo paths (1000-10000000) |
| `output_type` | string | calibration_comparison | Type of analysis |
| `refresh` | boolean | false | Force cache refresh |

### Example Requests

#### Basic Calibration Comparison
```bash
curl "http://localhost:3000/api/test-hjm?test=1"
```

#### Monte Carlo Simulation with Custom Paths
```bash
curl "http://localhost:3000/api/test-hjm?test=2&num_paths=1000000"
```

#### Using Specific Endpoints
```bash
curl "http://localhost:3000/api/test-hjm/calibration"
curl "http://localhost:3000/api/test-hjm/simulation?num_paths=500000"
```

### Response Format

```json
{
  "status": "success",
  "data": {
    "aad_calibration_time": 0.054,
    "standard_calibration_time": 1.446,
    "performance_ratio": 26.86,
    "speedup_factor": "26.86x faster with AAD",
    "calibration_successful": true,
    "valuation_date": "2024-01-15"
  },
  "message": "HJM calculation completed successfully",
  "meta": {
    "cached": false,
    "testCase": {
      "name": "calibration_comparison",
      "description": "HJM calibration performance comparison (AAD vs Standard)"
    },
    "parameters": {
      "test": 1,
      "output_type": "calibration_comparison"
    },
    "responseTime": 1500,
    "executionTime": 1450
  }
}
```

## Technical Details

### Market Data Requirements

The service requires the following market data files in `XSIGMA_DATA_ROOT/Data/`:
- `discountCurve.json` - Interest rate discount curves
- `correlationManager.json` - Correlation matrices
- `calibrationIrTargetsConfiguration.json` - Calibration targets
- `irVolatilityData.json` - Interest rate volatility surfaces

### Performance Characteristics

- **Calibration**: Typically 0.05-1.5 seconds depending on method
- **Simulation**: 5-30 seconds depending on number of paths
- **Caching**: Results cached for 10-15 minutes
- **Memory**: Scales with number of Monte Carlo paths

### Error Handling

The service provides comprehensive error handling:
- Configuration errors for missing market data
- Parameter validation errors
- Python execution errors with detailed stack traces
- Timeout handling for long-running calculations

## Development Notes

### Adding New Test Cases

To add a new test case:

1. **Update Python script** (`TestHJM.py`):
   ```python
   def new_test_case(params):
       # Implementation
       return result
   ```

2. **Update Service** (`TestHJMService.js`):
   ```javascript
   const TEST_CASES = {
     3: { name: 'new_test', description: 'New test case' }
   };
   ```

3. **Update routing** as needed

### Debugging

Enable debug mode by setting:
```bash
NODE_ENV=development
```

This provides detailed error information including Python stack traces.

### Performance Tuning

- Adjust cache timeouts in `TestHJMService.js`
- Modify Python executor timeout in `pythonExecutor.js`
- Optimize Monte Carlo path counts based on accuracy requirements

## Integration with Frontend

The TestHJM service is designed to integrate with the Frontend_Xsigma React components. Example usage:

```javascript
// Fetch calibration comparison
const response = await fetch('/api/test-hjm/calibration');
const data = await response.json();

// Display performance metrics
console.log(`AAD is ${data.data.speedup_factor}`);
```

## Monitoring and Health Checks

Use the health endpoint to monitor service status:

```bash
curl "http://localhost:3000/api/test-hjm/health"
```

Returns service status, Python module availability, and system information.
