#!/usr/bin/env python3
"""
ZABR Variables Impact Service
Provides interactive volatility modeling for ZABR Classic, SABR PDE, and ZABR Mixture models
Based on zabr_variables_impact.ipynb notebook
"""

import sys
import os
import json
import numpy as np
from datetime import datetime
from typing import Dict, List, Any, Tuple

# Add the notebook directory to Python path for xsigmamodules
current_dir = os.path.dirname(os.path.abspath(__file__))
notebook_dir = os.path.join(os.path.dirname(current_dir), 'NoteBook')
sys.path.append(notebook_dir)

try:
    from xsigmamodules.Market import (
        volatilityModelSabr,
        volatilityModelPdeClassic,
        volatilityModelZabrClassic,
        volatilityModelZabrMixture,
        volatility_model_zabr_output_enum,
    )
    from xsigmamodules.Util import implied_volatility_enum
    from xsigmamodules.util.numpy_support import xsigmaToNumpy, numpyToXsigma
    from xsigmamodules.Math import interpolation_enum
except ImportError as e:
    print(f"Warning: Could not import xsigmamodules: {e}")
    # Mock classes for development
    class MockModel:
        def __init__(self, *args, **kwargs):
            pass
        def forward(self):
            return 0.0325
        def expiry(self):
            return 10.0
        def implied_volatility(self, forward, strike, expiry, vol_type):
            return 0.2 + 0.1 * np.random.random()
        def strikes(self):
            return np.linspace(0.0, 0.2, 100)
    
    volatilityModelZabrClassic = MockModel
    volatilityModelZabrMixture = MockModel
    volatilityModelPdeClassic = MockModel
    volatility_model_zabr_output_enum = type('Enum', (), {'PRICES': 0})()
    implied_volatility_enum = type('Enum', (), {'NORMAL': 0})()
    interpolation_enum = type('Enum', (), {'LINEAR': 0})()
    xsigmaToNumpy = lambda x: np.array(x) if hasattr(x, '__iter__') else np.array([x])


class ZabrVariablesImpactService:
    """Service for ZABR Variables Impact calculations"""
    
    def __init__(self):
        self.default_params = self._get_default_parameters()
        self.parameter_ranges = self._get_parameter_ranges()
    
    def _get_default_parameters(self) -> Dict[str, Dict[str, Any]]:
        """Get default parameters for each model"""
        return {
            "zabr_classic": {
                "expiry": 10.0,
                "forward": 0.0325,
                "alpha": 0.0873,
                "beta": 0.7,
                "nu": 0.47,
                "rho": -0.48,
                "shift": 0.0,
                "gamma": 1.0,
                "use_vol_adjustement": True,
            },
            "sabr_pde": {
                "expiry": 30.0,
                "forward": 0.02,
                "alpha": 0.035,
                "beta": 0.25,
                "nu": 1.0,
                "rho": -0.1,
                "shift": 0.0,
                "N": 100,
                "timesteps": 5,
                "nd": 5,
            },
            "zabr_mixture": {
                "expiry": 30,
                "forward": -0.0007,
                "alpha": 0.0132,
                "beta1": 0.2,
                "beta2": 1.25,
                "d": 0.2,
                "nu": 0.1978,
                "rho": -0.444,
                "gamma": 1.0,
                "use_vol_adjustement": True,
                "high_strike": 0.1,
                "vol_low": 0.0001,
                "low_strike": 0.02,
                "forward_cut_off": 0.02,
                "smothing_factor": 0.001,
            }
        }
    
    def _get_parameter_ranges(self) -> Dict[str, Tuple[float, float, float]]:
        """Get parameter ranges (min, max, step) for sliders"""
        return {
            "expiry": (0.003, 30, 1),
            "forward": (0.0, 0.2, 0.0001),
            "alpha": (0.00001, 0.1, 0.0001),
            "beta": (0.00001, 1, 0.01),
            "beta1": (0.00001, 1, 0.01),
            "beta2": (0.00001, 5, 0.1),
            "nu": (0.00001, 2, 0.01),
            "rho": (-0.9999, 0.9999, 0.01),
            "gamma": (0.0001, 2, 0.01),
            "shift": (-0.01, 0.0, 0.0001),
            "vol_low": (0.00001, 0.01, 0.0001),
            "high_strike": (0.00001, 1, 0.01),
            "low_strike": (0.00001, 0.1, 0.001),
            "forward_cut_off": (0.000001, 0.1, 0.001),
            "smothing_factor": (0.000001, 0.1, 0.0001),
            "N": (50, 500, 1),
            "timesteps": (1, 100, 1),
            "nd": (1, 10, 1),
            "d": (0.00001, 1, 0.01),
        }
    
    def create_model(self, model_type: str, params: Dict[str, Any]):
        """Create a volatility model based on type and parameters"""
        n = 100  # Default number of points
        
        if model_type == "zabr_classic":
            return volatilityModelZabrClassic(
                params["forward"],
                params["expiry"],
                volatility_model_zabr_output_enum.PRICES,
                interpolation_enum.LINEAR,
                n,
                15.0,
                params["alpha"],
                params["beta"],
                params["rho"],
                params["nu"],
                params["shift"],
                params["gamma"],
            )
        elif model_type == "zabr_mixture":
            high_strike = max(
                params["high_strike"], 
                params["smothing_factor"] + params["low_strike"]
            )
            return volatilityModelZabrMixture(
                params["forward"],
                params["expiry"],
                volatility_model_zabr_output_enum.PRICES,
                interpolation_enum.LINEAR,
                n,
                params["alpha"],
                params["beta1"],
                params["beta2"],
                params["d"],
                params["vol_low"],
                params["nu"],
                params["rho"],
                params["gamma"],
                high_strike,
                params["low_strike"],
                params["forward_cut_off"],
                params["smothing_factor"],
            )
        elif model_type == "sabr_pde":
            x_min = 0.001
            x_max = 0.2
            return volatilityModelPdeClassic(
                params["forward"],
                params["expiry"],
                params["alpha"],
                params["beta"],
                params["rho"],
                params["nu"],
                params["shift"],
                params["N"],
                params["timesteps"],
                x_min,
                x_max,
            )
        else:
            raise ValueError(f"Unknown model type: {model_type}")
    
    def compute_volatility_surface(self, model, x_values: np.ndarray) -> np.ndarray:
        """Compute implied volatility surface for given strikes"""
        implied_vol = np.zeros_like(x_values)
        forward = model.forward()
        T = model.expiry()
        
        for i, K in enumerate(x_values):
            try:
                vol = model.implied_volatility(forward, K, T, implied_volatility_enum.NORMAL)
                implied_vol[i] = vol
            except Exception as e:
                # Handle edge cases with reasonable fallback
                implied_vol[i] = 0.2 if i == 0 else implied_vol[i-1]
        
        return implied_vol
    
    def calculate_volatility_impact(self, model_type: str, initial_params: Dict[str, Any], 
                                  dynamic_params: Dict[str, Any]) -> Dict[str, Any]:
        """Calculate volatility impact for parameter changes"""
        try:
            # Define strike ranges for each model
            if model_type == "zabr_classic":
                x_values = np.linspace(0.0, 0.2, 100)
            elif model_type == "sabr_pde":
                x_values = np.linspace(0.0, 0.2, 100)
            elif model_type == "zabr_mixture":
                x_values = np.linspace(-0.15, 0.3, 401)
            else:
                raise ValueError(f"Unknown model type: {model_type}")
            
            # Create models
            initial_model = self.create_model(model_type, initial_params)
            dynamic_model = self.create_model(model_type, dynamic_params)
            
            # Compute volatility surfaces
            initial_volatility = self.compute_volatility_surface(initial_model, x_values)
            dynamic_volatility = self.compute_volatility_surface(dynamic_model, x_values)
            
            # Calculate differences
            volatility_difference = dynamic_volatility - initial_volatility
            
            return {
                "status": "success",
                "model_type": model_type,
                "strikes": x_values.tolist(),
                "initial_volatility": initial_volatility.tolist(),
                "dynamic_volatility": dynamic_volatility.tolist(),
                "volatility_difference": volatility_difference.tolist(),
                "initial_params": initial_params,
                "dynamic_params": dynamic_params,
                "parameter_ranges": self.parameter_ranges,
                "calculation_successful": True
            }
            
        except Exception as e:
            return {
                "status": "error",
                "error": str(e),
                "model_type": model_type,
                "calculation_successful": False
            }
    
    def get_model_info(self, model_type: str) -> Dict[str, Any]:
        """Get model information and default parameters"""
        if model_type not in self.default_params:
            return {
                "status": "error",
                "error": f"Unknown model type: {model_type}",
                "available_models": list(self.default_params.keys())
            }
        
        return {
            "status": "success",
            "model_type": model_type,
            "default_parameters": self.default_params[model_type],
            "parameter_ranges": self.parameter_ranges,
            "description": self._get_model_description(model_type)
        }
    
    def _get_model_description(self, model_type: str) -> str:
        """Get model description"""
        descriptions = {
            "zabr_classic": "ZABR Classic model with volatility function σ(F_t) = α F_t^β",
            "sabr_pde": "SABR PDE model for yield curve dynamics and derivatives pricing",
            "zabr_mixture": "ZABR Mixture model with complex volatility function for negative rates"
        }
        return descriptions.get(model_type, "Unknown model")


def main():
    """Main function to handle command line execution"""
    # Check if this is called with the new API interface (operation + JSON)
    if len(sys.argv) >= 2 and sys.argv[1] in ['calculate', 'get_model_info', 'health_check']:
        operation = sys.argv[1]
        service = ZabrVariablesImpactService()

        if operation == 'health_check':
            # Health check operation
            health_result = {
                'status': 'healthy',
                'service': 'ZABR Variables Impact',
                'available_models': list(service.default_params.keys()),
                'python_version': sys.version,
                'timestamp': datetime.now().isoformat()
            }
            print(json.dumps(health_result))
            return

        elif operation == 'get_model_info':
            # Parse JSON parameters if provided
            if len(sys.argv) >= 3:
                try:
                    params = json.loads(sys.argv[2])
                    model_type = params.get('model_type', 'zabr_classic')
                except json.JSONDecodeError:
                    error_result = {
                        'status': 'error',
                        'error': 'Invalid JSON parameters'
                    }
                    print(json.dumps(error_result))
                    return
            else:
                model_type = 'zabr_classic'

            result = service.get_model_info(model_type)
            print(json.dumps(result))
            return

        elif operation == 'calculate':
            # Parse JSON parameters if provided
            if len(sys.argv) >= 3:
                try:
                    params = json.loads(sys.argv[2])
                    model_type = params.get('model_type', 'zabr_classic')
                    parameters = params.get('parameters', {})

                    # Get default parameters and merge with provided parameters
                    initial_params = service.default_params[model_type]
                    dynamic_params = {**initial_params, **parameters}

                    result = service.calculate_volatility_impact(model_type, initial_params, dynamic_params)
                except json.JSONDecodeError:
                    error_result = {
                        'status': 'error',
                        'error': 'Invalid JSON parameters'
                    }
                    print(json.dumps(error_result))
                    return
                except KeyError as e:
                    error_result = {
                        'status': 'error',
                        'error': f'Unknown model type: {e}'
                    }
                    print(json.dumps(error_result))
                    return
            else:
                error_result = {
                    'status': 'error',
                    'error': 'Missing parameters for calculate operation'
                }
                print(json.dumps(error_result))
                return

            print(json.dumps(result))
            return

    # Legacy interface support
    if len(sys.argv) < 2:
        print("Usage: python ZabrVariablesImpact.py <model_type> [params_json]")
        print("Available models: zabr_classic, sabr_pde, zabr_mixture")
        return

    service = ZabrVariablesImpactService()
    model_type = sys.argv[1]

    if len(sys.argv) > 2:
        try:
            dynamic_params = json.loads(sys.argv[2])
            initial_params = service.default_params[model_type]
            result = service.calculate_volatility_impact(model_type, initial_params, dynamic_params)
        except json.JSONDecodeError as e:
            result = {"status": "error", "error": f"Invalid JSON: {e}"}
        except KeyError as e:
            result = {"status": "error", "error": f"Unknown model type: {model_type}"}
    else:
        result = service.get_model_info(model_type)

    print(json.dumps(result))


if __name__ == "__main__":
    main()
