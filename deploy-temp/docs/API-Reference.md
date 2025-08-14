# 🔌 API Reference

## 🌐 Base URL

```
http://localhost:5005/api
```

## 🔐 Authentication

Currently, the API is open for development. Production deployments should implement proper authentication.

## 📊 ZABR Variables Impact API

### Calculate ZABR Models

**Endpoint**: `POST /zabr-variables-impact/calculate`

**Description**: Calculate volatility surfaces for ZABR models with dynamic parameters.

#### Request Body

```json
{
  "model_type": "zabr_classic|sabr_pde|zabr_mixture",
  "parameters": {
    // Model-specific parameters
  },
  "use_cache": true
}
```

#### Model-Specific Parameters

##### ZABR Classic
```json
{
  "expiry": 10,
  "forward": 0.0325,
  "alpha": 0.0873,
  "beta": 0.7,
  "nu": 0.47,
  "rho": -0.48,
  "shift": 0.0,
  "gamma": 1.0,
  "use_vol_adjustement": true
}
```

##### SABR PDE
```json
{
  "expiry": 30,
  "forward": 0.02,
  "alpha": 0.035,
  "beta": 0.25,
  "nu": 1.0,
  "rho": -0.1,
  "shift": 0.0,
  "N": 100,
  "timesteps": 5,
  "nd": 5
}
```

##### ZABR Mixture
```json
{
  "expiry": 30,
  "forward": -0.0007,
  "alpha": 0.0132,
  "beta1": 0.2,
  "beta2": 1.25,
  "d": 0.2,
  "nu": 0.1978,
  "rho": -0.444,
  "gamma": 1.0,
  "use_vol_adjustement": true,
  "high_strike": 0.1,
  "vol_low": 0.0001,
  "low_strike": 0.02,
  "forward_cut_off": 0.02,
  "smothing_factor": 0.001
}
```

#### Response

```json
{
  "status": "success",
  "message": "ZABR calculation completed successfully",
  "data": {
    "model_type": "zabr_classic",
    "strikes": [0.0, 0.002, 0.004, ...],
    "dynamic_volatility": [0.0873, 0.0875, 0.0877, ...],
    "initial_volatility": [0.0870, 0.0872, 0.0874, ...],
    "volatility_difference": [0.0003, 0.0003, 0.0003, ...],
    "dynamic_params": { /* echoed parameters */ },
    "calculation_successful": true,
    "execution_time": 0.045
  },
  "meta": {
    "cached": false,
    "model_type": "zabr_classic",
    "modelConfig": {
      "name": "ZABR Classic",
      "description": "ZABR Classic model with volatility function σ(F_t) = α F_t^β",
      "timeout": 30000
    },
    "responseTime": 52,
    "executionTime": 45
  }
}
```

### Get Available Models

**Endpoint**: `GET /zabr-variables-impact/models`

**Response**:
```json
{
  "status": "success",
  "data": {
    "available_models": [
      {
        "type": "zabr_classic",
        "name": "ZABR Classic",
        "description": "ZABR Classic model with volatility function σ(F_t) = α F_t^β"
      },
      {
        "type": "sabr_pde",
        "name": "SABR PDE",
        "description": "SABR PDE model for yield curve dynamics and derivatives pricing"
      },
      {
        "type": "zabr_mixture",
        "name": "ZABR Mixture",
        "description": "ZABR Mixture model with complex volatility function for negative rates"
      }
    ]
  }
}
```

### Get Model Information

**Endpoint**: `GET /zabr-variables-impact/model-info/{modelType}`

**Parameters**:
- `modelType`: `zabr_classic`, `sabr_pde`, or `zabr_mixture`

**Response**:
```json
{
  "status": "success",
  "data": {
    "model_type": "zabr_classic",
    "name": "ZABR Classic",
    "description": "ZABR Classic model with volatility function σ(F_t) = α F_t^β",
    "default_parameters": {
      "expiry": 10.0,
      "forward": 0.0325,
      "alpha": 0.0873,
      "beta": 0.7,
      "nu": 0.47,
      "rho": -0.48,
      "shift": 0.0,
      "gamma": 1.0,
      "use_vol_adjustement": true
    },
    "parameter_ranges": {
      "alpha": {"min": 0.001, "max": 0.5},
      "beta": {"min": 0.1, "max": 1.0},
      "nu": {"min": 0.1, "max": 2.0},
      "rho": {"min": -0.99, "max": 0.99}
    }
  }
}
```

## 🏗️ HJM Models API

### Test HJM Calibration

**Endpoint**: `GET /test-hjm/calibration`

**Query Parameters**:
- `test_case`: Test case identifier (optional)
- `use_cache`: Enable caching (default: true)

**Response**:
```json
{
  "status": "success",
  "data": {
    "calibration_results": {
      "parameters": { /* calibrated parameters */ },
      "fit_quality": 0.0023,
      "convergence": true
    },
    "yield_curves": {
      "initial": [/* rates */],
      "calibrated": [/* rates */]
    }
  }
}
```

### HJM Simulation

**Endpoint**: `GET /test-hjm/simulation`

**Query Parameters**:
- `num_paths`: Number of simulation paths
- `time_horizon`: Simulation time horizon
- `use_cache`: Enable caching

## 📈 Analytical Sigma Volatility API

### ASV Calibration

**Endpoint**: `POST /analytical-sigma`

**Request Body**:
```json
{
  "market_data": {
    "strikes": [0.95, 1.0, 1.05],
    "volatilities": [0.25, 0.20, 0.22],
    "forward": 1.0,
    "expiry": 1.0
  },
  "calibration_method": "least_squares",
  "use_cache": true
}
```

## 🔄 Error Handling

### Error Response Format

```json
{
  "status": "error",
  "error": "Detailed error message",
  "error_code": "VALIDATION_ERROR",
  "timestamp": "2024-01-15T10:30:00Z",
  "request_id": "req_123456789"
}
```

### Common Error Codes

| Code | Description | HTTP Status |
|------|-------------|-------------|
| `VALIDATION_ERROR` | Invalid parameters | 400 |
| `MODEL_NOT_FOUND` | Unknown model type | 404 |
| `CALCULATION_FAILED` | Numerical error | 500 |
| `TIMEOUT_ERROR` | Calculation timeout | 504 |
| `CACHE_ERROR` | Caching issue | 500 |

## 📊 Rate Limiting

- **Development**: No limits
- **Production**: 1000 requests/hour per IP

## 🔧 Caching

### Cache Headers

- `X-Cache-Status`: `HIT` or `MISS`
- `X-Cache-TTL`: Time to live in seconds
- `X-Cache-Key`: Cache key used

### Cache Control

- **Default TTL**: 600 seconds (10 minutes)
- **Max TTL**: 3600 seconds (1 hour)
- **Cache Keys**: Based on model type and parameters

## 📚 SDKs and Examples

### JavaScript/Node.js

```javascript
const XSigmaAPI = require('@xsigma/api-client');

const client = new XSigmaAPI({
  baseURL: 'http://localhost:5005/api'
});

// Calculate ZABR
const result = await client.zabr.calculate({
  model_type: 'zabr_classic',
  parameters: { /* ... */ }
});
```

### Python

```python
import requests

def calculate_zabr(model_type, parameters):
    response = requests.post(
        'http://localhost:5005/api/zabr-variables-impact/calculate',
        json={
            'model_type': model_type,
            'parameters': parameters
        }
    )
    return response.json()
```

### cURL

```bash
curl -X POST http://localhost:5005/api/zabr-variables-impact/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "model_type": "zabr_classic",
    "parameters": {
      "expiry": 10,
      "forward": 0.0325,
      "alpha": 0.0873,
      "beta": 0.7,
      "nu": 0.47,
      "rho": -0.48
    }
  }'
```

---

**Next**: [Installation Guide](Installation-Guide) | **Previous**: [ZABR Models](ZABR-Models)
