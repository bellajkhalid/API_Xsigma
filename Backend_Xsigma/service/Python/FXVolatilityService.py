#!/usr/bin/env python3
"""
FX Volatility Service
Provides FX volatility calculations for the Backend_AnalyticalSigma API

This service handles:
1. ATM Volatility Curve Interpolation
2. Volatility Models Comparison (Call/Put, Instrument, Delta, SVI)
3. Market Data Management

Usage:
    python FXVolatilityService.py <operation> [parameters...]
    
Operations:
    atm_curve - Generate ATM volatility curve
    models_comparison - Compare different volatility models
    market_data - Get current market data
"""

import sys
import json
import traceback
import os

# Add the parent directory to the path to import fx_volatility_models
sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..'))

try:
    from fx_volatility_models import fx_volatility_models
except ImportError as e:
    print(f"Error importing fx_volatility_models: {e}", file=sys.stderr)
    # Create a mock instance for testing
    class MockFXVolatilityModels:
        def get_atm_volatility_curve(self, parameters=None):
            return {
                'expiries': [0.02, 0.25, 0.5, 1.0, 2.0, 5.0, 10.0],
                'interpolated_vols': [0.0722, 0.0645, 0.0622, 0.0621, 0.0661, 0.0742, 0.0819],
                'market_expiries': [0.02, 0.25, 0.5, 1.0, 2.0, 5.0, 10.0],
                'market_vols': [0.0722, 0.0645, 0.0622, 0.0621, 0.0661, 0.0742, 0.0819],
                'success': True,
                'mock': True
            }
        
        def get_volatility_models_comparison(self, parameters=None):
            import numpy as np
            n = 128
            strike_ratio = np.linspace(0.75, 1.25, n)
            atm_vol = 0.065
            
            return {
                'strike_ratio': strike_ratio.tolist(),
                'vol_call_put': (atm_vol + 0.01 * (strike_ratio - 1.0) ** 2).tolist(),
                'vol_instrument': (atm_vol + 0.012 * (strike_ratio - 1.0) ** 2 + 0.002 * (strike_ratio - 1.0)).tolist(),
                'vol_delta': (atm_vol + 0.008 * (strike_ratio - 1.0) ** 2 + 0.004 * (strike_ratio - 1.0)).tolist(),
                'vol_svi': (atm_vol + 0.015 * (strike_ratio - 1.0) ** 2 - 0.001 * (strike_ratio - 1.0) ** 3).tolist(),
                'expiry_time': 0.583,
                'forward_rate': 1.65,
                'success': True,
                'mock': True
            }
        
        def get_market_data(self):
            return {
                'calibration_tenors': ["1B", "1W", "2W", "3W", "1M", "2M", "3M", "4M", "5M", "6M", "9M", "1Y", "18M", "2Y", "3Y", "5Y", "7Y", "10Y"],
                'vols_atm_mkt': [0.0722, 0.0649, 0.0624, 0.0639, 0.0645, 0.0632, 0.0629, 0.0625, 0.0623, 0.0622, 0.0622, 0.0621, 0.0640, 0.0661, 0.0690, 0.0742, 0.0808, 0.0819],
                'mock': True
            }
    
    fx_volatility_models = MockFXVolatilityModels()

def handle_atm_curve(args):
    """Handle ATM volatility curve generation"""
    try:
        # Parse parameters if provided
        parameters = {}
        if len(args) > 1:
            try:
                parameters = json.loads(args[1])
            except json.JSONDecodeError:
                # If not JSON, treat as individual parameters
                pass
        
        result = fx_volatility_models.get_atm_volatility_curve(parameters)
        
        return {
            'status': 'success',
            'operation': 'atm_curve',
            'data': result,
            'parameters': parameters
        }
        
    except Exception as e:
        return {
            'status': 'error',
            'operation': 'atm_curve',
            'error': str(e),
            'traceback': traceback.format_exc()
        }

def handle_models_comparison(args):
    """Handle volatility models comparison"""
    try:
        # Parse parameters if provided
        parameters = {}
        if len(args) > 1:
            try:
                parameters = json.loads(args[1])
            except json.JSONDecodeError:
                pass
        
        result = fx_volatility_models.get_volatility_models_comparison(parameters)
        
        return {
            'status': 'success',
            'operation': 'models_comparison',
            'data': result,
            'parameters': parameters
        }
        
    except Exception as e:
        return {
            'status': 'error',
            'operation': 'models_comparison',
            'error': str(e),
            'traceback': traceback.format_exc()
        }

def handle_market_data(args):
    """Handle market data retrieval"""
    try:
        result = fx_volatility_models.get_market_data()

        return {
            'status': 'success',
            'operation': 'market_data',
            'data': result
        }

    except Exception as e:
        return {
            'status': 'error',
            'operation': 'market_data',
            'error': str(e),
            'traceback': traceback.format_exc()
        }

def handle_health_check(args):
    """Handle health check"""
    try:
        return {
            'status': 'success',
            'operation': 'health_check',
            'data': {
                'service': 'FXVolatilityService',
                'version': '1.0.0',
                'healthy': True,
                'mock_mode': hasattr(fx_volatility_models, '__class__') and 'Mock' in fx_volatility_models.__class__.__name__
            }
        }

    except Exception as e:
        return {
            'status': 'error',
            'operation': 'health_check',
            'error': str(e),
            'traceback': traceback.format_exc()
        }

def main():
    """Main entry point"""
    try:
        if len(sys.argv) < 2:
            return {
                'status': 'error',
                'error': 'Missing operation parameter',
                'usage': 'python FXVolatilityService.py <operation> [parameters...]',
                'available_operations': ['atm_curve', 'models_comparison', 'market_data', 'health_check']
            }
        
        operation = sys.argv[1].lower()
        
        if operation == 'atm_curve':
            result = handle_atm_curve(sys.argv[1:])
        elif operation == 'models_comparison':
            result = handle_models_comparison(sys.argv[1:])
        elif operation == 'market_data':
            result = handle_market_data(sys.argv[1:])
        elif operation == 'health_check':
            result = handle_health_check(sys.argv[1:])
        else:
            result = {
                'status': 'error',
                'error': f'Unknown operation: {operation}',
                'available_operations': ['atm_curve', 'models_comparison', 'market_data', 'health_check']
            }
        
        return result
        
    except Exception as e:
        return {
            'status': 'error',
            'error': f'Unexpected error: {str(e)}',
            'traceback': traceback.format_exc()
        }

if __name__ == '__main__':
    result = main()
    print(json.dumps(result, indent=2))
