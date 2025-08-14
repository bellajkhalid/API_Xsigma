# Python Services - Consolidated

This directory contains all Python computational modules for the Backend_AnalyticalSigma API.

## 📁 Service Files

### Core Services
- `FXVolatilityService.py` - FX volatility calculations and market data
- `AnalyticalSigmaVolatility.py` - Analytical sigma volatility models (Extended SVI)

### Advanced Services
- `AnalyticalSigmaVolatilityCalibration.py` - Model calibration and parameter fitting
- `HartmanWatsonDistribution.py` - Hartman Watson distribution calculations

### Support Files
- `__init__.py` - Python package initialization
- `README.md` - This documentation file

## 🚀 Usage

Each service can be executed independently:

```bash
# FX Volatility
python FXVolatilityService.py atm_curve
python FXVolatilityService.py models_comparison
python FXVolatilityService.py market_data

# Analytical Sigma
python AnalyticalSigmaVolatility.py calculate '{"test": 1, "n": 200}'
python AnalyticalSigmaVolatility.py health_check

# Calibration
python AnalyticalSigmaVolatilityCalibration.py calibrate '{"computationType": "volatility_asv"}'
```

## 🔧 Integration

Services are automatically discovered and executed by the `pythonExecutor.js` service:

```javascript
// Execute FX volatility service
const result = await pythonExecutor.execute('fx_volatility', 'atm_curve');

// Execute analytical sigma service  
const result = await pythonExecutor.execute('analytical_sigma', 'calculate', {test: 1});
```

## 📊 Service Status

All services support health checks and provide structured JSON responses with:
- Status indicators
- Execution timing
- Error handling
- Metadata

## 🏗️ Architecture

- **Modular design** - Each service is self-contained
- **Standardized interface** - Consistent JSON input/output
- **Error handling** - Robust error reporting and logging
- **Performance monitoring** - Execution time tracking
- **Caching support** - Results can be cached by the Node.js layer

## 🔄 Version History

- **v2.1.0** - Consolidated architecture with optimized services
- **v2.0.0** - Modular service separation
- **v1.x** - Legacy monolithic structure
