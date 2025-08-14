#!/usr/bin/env python3

import sys
import json
import numpy as np
from typing import Dict, Any, List
from dataclasses import dataclass

try:
    from xsigmamodules.Math import (
        hartmanWatsonDistribution,
        gaussianQuadrature,
        hartman_watson_distribution_enum,
    )
    from xsigmamodules.Vectorization import vector, matrix, tensor
    from xsigma.util.numpy_support import xsigmaToNumpy, numpyToXsigma
except ImportError as e:
    print(f"Error importing xsigmamodules: {e}", file=sys.stderr)
    sys.exit(1)

@dataclass
class HartmanWatsonParams:
    """Parameters for Hartman Watson Distribution calculation"""
    n: int = 64
    t: float = 0.5
    size_roots: int = 32
    x_0: float = -5.0
    x_n: float = 3.1
    distribution_type: str = "MIXTURE"  # MIXTURE, CLASSICAL, etc.

    @classmethod
    def from_dict(cls, params: Dict[str, Any]) -> 'HartmanWatsonParams':
        """Create parameters from dictionary"""
        return cls(
            n=int(params.get('n', 64)),
            t=float(params.get('t', 0.5)),
            size_roots=int(params.get('size_roots', 32)),
            x_0=float(params.get('x_0', -5.0)),
            x_n=float(params.get('x_n', 3.1)),
            distribution_type=params.get('distribution_type', 'MIXTURE')
        )

    @classmethod
    def from_argv(cls, argv: List[str]) -> 'HartmanWatsonParams':
        """Create parameters from command line arguments"""
        if len(argv) < 2:
            return cls()
        
        try:
            params_json = argv[1]
            params_dict = json.loads(params_json)
            return cls.from_dict(params_dict)
        except (json.JSONDecodeError, IndexError):
            # Fallback to positional arguments
            return cls(
                n=int(argv[1]) if len(argv) > 1 else 64,
                t=float(argv[2]) if len(argv) > 2 else 0.5,
                size_roots=int(argv[3]) if len(argv) > 3 else 32,
                x_0=float(argv[4]) if len(argv) > 4 else -5.0,
                x_n=float(argv[5]) if len(argv) > 5 else 3.1,
                distribution_type=argv[6] if len(argv) > 6 else 'MIXTURE'
            )

def calculate_hartman_watson_distribution(params: HartmanWatsonParams) -> Dict[str, Any]:
    """
    Calculate Hartman Watson Distribution
    
    Args:
        params: HartmanWatsonParams object containing calculation parameters
        
    Returns:
        Dictionary containing calculated distribution data
    """
    try:
        # Initialize vectors for Gaussian quadrature
        roots = vector["double"](params.size_roots)
        w1 = vector["double"](params.size_roots)
        w2 = vector["double"](params.size_roots)
        
        # Calculate Gaussian quadrature weights and roots
        gaussianQuadrature.gauss_kronrod(params.size_roots, roots, w1, w2)
        
        # Create x-axis points
        x_points = np.linspace(params.x_0, params.x_n, params.n)
        r = numpyToXsigma(x_points)
        
        # Initialize result vector
        result_array = np.zeros(params.n)
        result = numpyToXsigma(result_array)
        
        # Get distribution type enum
        dist_type = getattr(hartman_watson_distribution_enum, params.distribution_type, 
                           hartman_watson_distribution_enum.MIXTURE)
        
        # Calculate distribution
        hartmanWatsonDistribution.distribution(result, params.t, r, roots, w1, dist_type)
        
        # Convert result back to numpy
        distribution_values = xsigmaToNumpy(result)
        
        return {
            "x_points": x_points.tolist(),
            "distribution_values": distribution_values.tolist(),
            "parameters": {
                "n": params.n,
                "t": params.t,
                "size_roots": params.size_roots,
                "x_0": params.x_0,
                "x_n": params.x_n,
                "distribution_type": params.distribution_type
            },
            "metadata": {
                "calculation_type": "hartman_watson_distribution",
                "timestamp": str(np.datetime64('now')),
                "data_points": len(x_points)
            }
        }
        
    except Exception as e:
        raise Exception(f"Error calculating Hartman Watson Distribution: {str(e)}")

def get_test_cases() -> Dict[str, Any]:
    """Get predefined test cases for Hartman Watson Distribution"""
    return {
        "test_cases": [
            {
                "id": 1,
                "name": "Default Distribution",
                "description": "Standard Hartman Watson distribution with default parameters",
                "parameters": {
                    "n": 64,
                    "t": 0.5,
                    "size_roots": 32,
                    "x_0": -5.0,
                    "x_n": 3.1,
                    "distribution_type": "MIXTURE"
                }
            },
            {
                "id": 2,
                "name": "High Resolution",
                "description": "Higher resolution calculation with more data points",
                "parameters": {
                    "n": 128,
                    "t": 0.5,
                    "size_roots": 64,
                    "x_0": -5.0,
                    "x_n": 3.1,
                    "distribution_type": "MIXTURE"
                }
            },
            {
                "id": 3,
                "name": "Extended Range",
                "description": "Extended x-axis range for broader distribution view",
                "parameters": {
                    "n": 64,
                    "t": 0.5,
                    "size_roots": 32,
                    "x_0": -8.0,
                    "x_n": 5.0,
                    "distribution_type": "MIXTURE"
                }
            },
            {
                "id": 4,
                "name": "Different Time",
                "description": "Distribution calculation with different time parameter",
                "parameters": {
                    "n": 64,
                    "t": 1.0,
                    "size_roots": 32,
                    "x_0": -5.0,
                    "x_n": 3.1,
                    "distribution_type": "MIXTURE"
                }
            }
        ]
    }

def main() -> None:
    """Main function for command line execution"""
    try:
        if len(sys.argv) > 1 and sys.argv[1] == "test_cases":
            result = get_test_cases()
            print(json.dumps({"status": "success", "data": result, "error": None}))
            return
            
        params = HartmanWatsonParams.from_argv(sys.argv)
        result = calculate_hartman_watson_distribution(params)
        print(json.dumps({"status": "success", "data": result, "error": None}))
        
    except Exception as e:
        print(json.dumps({"status": "error", "data": None, "error": str(e)}))

if __name__ == "__main__":
    main()
