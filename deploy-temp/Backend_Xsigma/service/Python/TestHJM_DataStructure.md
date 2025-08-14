# TestHJM API Data Structure for Frontend

## Overview

The TestHJM API now returns **raw numerical data** (not plots) that your frontend can use for visualization and analysis. The data structure follows the same pattern as the reference `HJM.py` file.

## Test Case 1: Calibration Comparison

**Endpoint**: `GET /api/test-hjm/calibration` or `GET /api/test-hjm?test=1`

### Response Structure:
```json
{
  "status": "success",
  "message": "HJM calibration comparison completed successfully",
  "data": {
    "aad_calibration_time": 0.041,
    "standard_calibration_time": 1.396,
    "performance_ratio": 33.92,
    "speedup_factor": "33.92x faster with AAD",
    "calibration_successful": true,
    "valuation_date": "43851.0",
    "data_root": "C:/dev/PRETORIAN/Testing",
    "expiry_fraction": [0.25, 0.5, 1.0, 2.0, 3.0, 5.0, 7.0, 10.0],
    "cms_calls": [1.234, 2.456, 3.789, ...],
    "message": "Calibration comparison completed with numerical data."
  },
  "meta": {
    "cached": false,
    "testCase": {
      "name": "calibration_comparison",
      "description": "HJM calibration performance comparison (AAD vs Standard)"
    },
    "responseTime": 2000,
    "executionTime": 1950
  }
}
```

### Key Data Fields:
- **`expiry_fraction`**: Array of time fractions for x-axis plotting
- **`cms_calls`**: Array of CMS spread pricing values for y-axis
- **Performance metrics**: Timing comparison between AAD and standard methods

## Test Case 2: Monte Carlo Simulation

**Endpoint**: `GET /api/test-hjm/simulation` or `GET /api/test-hjm?test=2`

### Response Structure:
```json
{
  "status": "success",
  "message": "HJM simulation analysis completed successfully",
  "data": {
    "simulation_successful": true,
    "num_paths": 100000,
    "simulation_dates_count": 121,
    "maturity": "54809.0",
    "valuation_date": "43851.0",
    "NI_Volatility_Bps": {
      "data1": {
        "model": [120.5, 125.3, 130.1, ...],
        "market": [118.2, 123.8, 128.9, ...]
      },
      "data2": {
        "model": [110.2, 115.7, 120.4, ...],
        "market": [108.9, 114.2, 119.1, ...]
      },
      "data3": {
        "model": [95.8, 100.3, 105.2, ...],
        "market": [94.1, 98.7, 103.8, ...]
      },
      "data4": {
        "model": [85.4, 89.9, 94.7, ...],
        "market": [83.7, 88.2, 93.1, ...]
      }
    },
    "Error_Bps": {
      "data1": [2.3, 1.5, 1.2, ...],
      "data2": [1.3, 1.5, 1.3, ...],
      "data3": [1.7, 1.6, 1.4, ...],
      "data4": [1.7, 1.7, 1.6, ...]
    },
    "expiry_fraction": [0.25, 0.5, 1.0, 2.0, 3.0, 5.0, 7.0, 10.0],
    "message": "Simulation completed successfully with numerical data.",
    "parameters": {
      "num_paths": 100000,
      "frequency": "3M",
      "simulation_length": 121
    }
  }
}
```

### Key Data Fields:
- **`NI_Volatility_Bps`**: Volatility surfaces in basis points
  - **`model`**: Model-calculated volatility arrays
  - **`market`**: Market volatility arrays
  - **`data1-data4`**: Different tenor/maturity combinations
- **`Error_Bps`**: Error matrices (model - market) in basis points
- **`expiry_fraction`**: Time fractions for x-axis plotting

## Frontend Usage Examples

### For Volatility Surface Visualization:
```javascript
// Extract volatility data
const volatilityData = response.data.NI_Volatility_Bps;
const xAxis = response.data.expiry_fraction;

// Plot model vs market for data1
const modelVols = volatilityData.data1.model;
const marketVols = volatilityData.data1.market;

// Create chart with xAxis and modelVols/marketVols arrays
```

### For Error Analysis:
```javascript
// Extract error data
const errorData = response.data.Error_Bps;
const xAxis = response.data.expiry_fraction;

// Plot error surfaces
const errors1 = errorData.data1;
const errors2 = errorData.data2;
// etc.
```

### For Performance Comparison:
```javascript
// Extract calibration performance
const aadTime = response.data.aad_calibration_time;
const standardTime = response.data.standard_calibration_time;
const speedup = response.data.speedup_factor;

// Display performance metrics
```

## Data Characteristics

- **All arrays are synchronized**: Same length and corresponding indices
- **Units**: Volatilities in basis points (bps), times in seconds
- **Scale**: Volatilities multiplied by 10,000 for basis points
- **Format**: All numerical data as JavaScript arrays (`.tolist()` from NumPy)

## API Parameters

- **`test`**: 1 (calibration) or 2 (simulation)
- **`num_paths`**: Monte Carlo paths (1000-10000000, default: 524288)
- **`output_type`**: 'calibration_comparison' or 'simulation_analysis'
- **`refresh`**: Force cache refresh (default: false)

This data structure provides all the numerical information needed for frontend visualization without requiring any plotting libraries on the backend.
