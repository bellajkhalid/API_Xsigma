#!/usr/bin/env python3

import sys
import json
import time
import numpy as np
from xsigmamodules.Util import (
    blackScholes,
    sigmaVolatilityInspired,
    implied_volatility_enum
)
from xsigmamodules.util.numpy_support import xsigmaToNumpy, numpyToXsigma
from xsigmamodules.Market import volatilityModelExtendedSvi
from xsigmamodules.Math import (
    solverOptionsCeres,
    solverOptionsLm,
    solverOptionsNlopt,
    nlopt_algo_name
)

# Cache for sample data to avoid regenerating for repeated calls
_sample_data_cache = None

def generate_sample_data(num_points=39, strike_range=(1800, 2700)):
    """
    Generate sample market data for calibration based on real market data

    Args:
        num_points (int): Number of data points
        strike_range (tuple): Range of strikes (min, max)

    Returns:
        tuple: (calibration_strikes, bid_values, ask_values, mid_values)
    """
    # Real market volatility data from the notebook
    y_values = (
        np.array([
            140.00, 136.62, 133.02, 129.02, 124.96, 120.55, 115.67, 110.16, 106.32, 102.75,
            96.93, 91.39, 85.85, 79.70, 73.11, 68.25, 62.71, 57.30, 49.97, 44.55,
            41.58, 43.20, 47.41, 51.92, 56.99, 60.46, 64.68, 68.47, 72.31, 76.14,
            79.63, 83.10, 86.15, 89.14, 91.85, 94.70, 97.06, 99.70, 101.03
        ]) / 100.0
    )

    strikes = np.linspace(strike_range[0], strike_range[1], num_points)
    spread = np.random.uniform(0, 0.01, num_points)
    bid_values = (
        np.interp(strikes, np.linspace(strike_range[0], strike_range[1], num_points), y_values) - spread
    )
    ask_values = (
        np.interp(strikes, np.linspace(strike_range[0], strike_range[1], num_points), y_values) + spread
    )
    mid_values = 0.5 * (bid_values + ask_values)

    return strikes, bid_values, ask_values, mid_values

def get_sample_data():
    """
    Get or generate sample market data with caching
    
    Returns:
        tuple: (calibration_strikes, bid_values, ask_values, mid_values)
    """
    global _sample_data_cache
    if _sample_data_cache is None:
        _sample_data_cache = generate_sample_data()
    return _sample_data_cache

def validate_params(params):
    """
    Validate input parameters
    
    Args:
        params (dict): Dictionary of input parameters
        
    Raises:
        ValueError: If any parameter is invalid
    """
    if params['n'] <= 0:
        raise ValueError("Parameter 'n' must be positive")
    
    if not (0 <= params['beta'] <= 1):
        raise ValueError("Parameter 'beta' must be between 0 and 1")
        
    if not (-1 <= params['rho'] <= 1):
        raise ValueError("Parameter 'rho' must be between -1 and 1")
        
    if params['expiry'] <= 0:
        raise ValueError("Parameter 'expiry' must be positive")
        
    if params['volvol'] <= 0:
        raise ValueError("Parameter 'volvol' must be positive")

def density_new(obj, strikes, spot, expiry):
    """
    Calculate the probability density function
    
    Args:
        obj: The calibrated volatility model
        strikes (numpy.ndarray): Array of strike prices
        spot (float): Spot price
        expiry (float): Time to expiry
        
    Returns:
        list: Density values corresponding to strikes
    """
    n = len(strikes)
    arrays = {
        "vols": np.zeros(n),
        "atm_sensitivity": np.zeros(n),
        "skew_sensitivity": np.zeros(n),
        "smile_sensitivity": np.zeros(n),
        "put_sensitivity": np.zeros(n),
        "call_sensitivity": np.zeros(n),
        "strike_sensitivity": np.zeros(n),
        "ref_sensitivity": np.zeros(n),
        "atm2_sensitivity": np.zeros(n),
        "ref2_sensitivity": np.zeros(n),
        "strike2_sensitivity": np.zeros(n),
    }

    obj.sensitivities(
        expiry, numpyToXsigma(strikes), *[numpyToXsigma(arr) for arr in arrays.values()]
    )

    density = [
        blackScholes.density(spot, strike, expiry, vol, strike_sens, strike2_sens)
        for strike, vol, strike_sens, strike2_sens in zip(
            strikes,
            arrays["vols"],
            arrays["strike_sensitivity"],
            arrays["strike2_sensitivity"],
        )
    ]

    return density

def calculate_dynamic_vols_and_density(params, model_enum="asv"):
    """
    Calculate volatility and density for dynamic interactive graphs

    Args:
        params (dict): Parameters including fwd, time, ctrl_p, ctrl_c, atm, skew, smile, put, call
        model_enum (str): Model type ("asv" or "svi")

    Returns:
        dict: Contains strikes, vols, and density arrays
    """
    n = 400
    strikes = np.linspace(0.5 * params["fwd"], 2.0 * params["fwd"], n)

    if model_enum == "asv":
        obj = volatilityModelExtendedSvi(
            params["fwd"],
            params["ctrl_p"],
            params["ctrl_c"],
            params["atm"],
            params["skew"],
            params["smile"],
            params["put"],
            params["call"],
        )

        arrays = {
            "vols": np.zeros(n),
            "atm_sensitivity": np.zeros(n),
            "skew_sensitivity": np.zeros(n),
            "smile_sensitivity": np.zeros(n),
            "put_sensitivity": np.zeros(n),
            "call_sensitivity": np.zeros(n),
            "strike_sensitivity": np.zeros(n),
            "ref_sensitivity": np.zeros(n),
            "atm2_sensitivity": np.zeros(n),
            "ref2_sensitivity": np.zeros(n),
            "strike2_sensitivity": np.zeros(n),
        }

        obj.sensitivities(
            params["time"],
            numpyToXsigma(strikes),
            *[numpyToXsigma(arr) for arr in arrays.values()],
        )

        vols = arrays["vols"]
        density = np.array([
            blackScholes.density(
                params["fwd"],
                strike,
                params["time"],
                vol,
                strike_sens,
                strike2_sens,
            )
            for strike, vol, strike_sens, strike2_sens in zip(
                strikes,
                vols,
                arrays["strike_sensitivity"],
                arrays["strike2_sensitivity"],
            )
        ])

    elif model_enum == "svi":
        obj = sigmaVolatilityInspired(
            params["fwd"], params["b"], params["m"], params["sigma"]
        )
        vols = np.zeros(n)
        obj.svi(numpyToXsigma(vols), numpyToXsigma(strikes))
        density = np.exp(-0.5 * ((strikes - params["fwd"]) / vols) ** 2) / (
            vols * np.sqrt(2 * np.pi)
        )

    else:
        raise ValueError("Invalid model type. Choose 'asv' or 'svi'.")

    return {
        "strikes": strikes.tolist(),
        "vols": vols.tolist(),
        "density": density.tolist()
    }

def calculate_vols_and_density(params, computation_type):
    """
    Main calculation function for volatility models and density function
    
    Args:
        params (dict): Input parameters
        computation_type (str): Type of computation to perform
        
    Returns:
        dict: Result in JSON-serializable format
    """
    try:
        # Track performance
        start_time = time.time()
        
        # Validate parameters
        validate_params(params)
        
        # Get sample data (using cache)
        calibration_strikes, bid_values, ask_values, mid_values = get_sample_data()
        
        # Create initial guess for model parameters
        try:
            initial_guess_obj = volatilityModelExtendedSvi(
                params['spot'], 0.2, params['volvol'], params['beta'], 
                params['rho'], params['r'], params['q'], 0.00006
            )
        except Exception as e:
            return {
                "status": "error",
                "error": f"Failed to create initial model: {str(e)}"
            }

        # Calibrate with Ceres solver
        try:
            options_ceres = solverOptionsCeres(500, 1e-14, 1e-14, 1e-14)
            calibrated_obj_ceres = volatilityModelExtendedSvi.calibrate(
                numpyToXsigma(calibration_strikes),
                numpyToXsigma(mid_values),
                params['spot'],
                params['expiry'],
                options_ceres,
                1,
                1,
                initial_guess_obj
            )
        except Exception as e:
            return {
                "status": "error",
                "error": f"Model calibration failed: {str(e)}"
            }

        strikes = np.linspace(1800, 2700, params['n'])

        if computation_type == "volatility_asv":
            try:
                vols = np.zeros(params['n'])
                calibrated_obj_ceres.implied_volatility(
                    numpyToXsigma(vols),
                    numpyToXsigma(strikes),
                    1.0,
                    params['expiry'],
                    implied_volatility_enum.LOG_NORMAL
                )
                
                # Calculate performance metrics
                execution_time = time.time() - start_time
                
                return {
                    "status": "success",
                    "computationType": "volatility_asv",
                    "data": {
                        "calibration_strikes": calibration_strikes.tolist(),
                        "bid_values": bid_values.tolist(),
                        "ask_values": ask_values.tolist(),
                        "mid_values": mid_values.tolist(),
                        "strikes": strikes.tolist(),
                        "vols": vols.tolist()
                    },
                    "performance": {
                        "execution_time_ms": round(execution_time * 1000, 2)
                    }
                }
            except Exception as e:
                return {
                    "status": "error",
                    "error": f"Volatility calculation failed: {str(e)}"
                }

        elif computation_type == "density":
            try:
                density = density_new(calibrated_obj_ceres, strikes, params['spot'], params['expiry'])
                
                # Calculate performance metrics
                execution_time = time.time() - start_time
                
                return {
                    "status": "success",
                    "computationType": "density",
                    "data": {
                        "strikes": strikes.tolist(),
                        "density": density
                    },
                    "performance": {
                        "execution_time_ms": round(execution_time * 1000, 2)
                    }
                }
            except Exception as e:
                return {
                    "status": "error",
                    "error": f"Density calculation failed: {str(e)}"
                }

        elif computation_type == "volatility_svi":
            try:
                initial_values = {
                    "fwd": 1.0,
                    "time": 0.333,
                    "b": 0.1,
                    "m": 0.01,
                    "sigma": 0.4
                }

                obj_svi = sigmaVolatilityInspired(
                    params['spot'],
                    initial_values["b"],
                    initial_values["m"],
                    initial_values["sigma"]
                )
                obj_svi.calibrate(
                    numpyToXsigma(mid_values),
                    numpyToXsigma(calibration_strikes)
                )

                vols = np.zeros(params['n'])
                obj_svi.svi(numpyToXsigma(vols), numpyToXsigma(strikes))

                # Calculate performance metrics
                execution_time = time.time() - start_time

                return {
                    "status": "success",
                    "computationType": "volatility_svi",
                    "data": {
                        "calibration_strikes": calibration_strikes.tolist(),
                        "bid_values": bid_values.tolist(),
                        "ask_values": ask_values.tolist(),
                        "mid_values": mid_values.tolist(),
                        "strikes": strikes.tolist(),
                        "vols": vols.tolist()
                    },
                    "performance": {
                        "execution_time_ms": round(execution_time * 1000, 2)
                    }
                }
            except Exception as e:
                return {
                    "status": "error",
                    "error": f"SVI calculation failed: {str(e)}"
                }

        elif computation_type == "dynamic_asv":
            try:
                # Dynamic ASV calculation with interactive parameters
                dynamic_params = {
                    "fwd": params.get('fwd', 1.0),
                    "time": params.get('time', 0.333),
                    "ctrl_p": params.get('ctrl_p', 0.2),
                    "ctrl_c": params.get('ctrl_c', 0.2),
                    "atm": params.get('atm', 0.1929),
                    "skew": params.get('skew', 0.02268),
                    "smile": params.get('smile', 0.00317),
                    "put": params.get('put', 0.00213),
                    "call": params.get('call', 0.00006),
                }

                result_data = calculate_dynamic_vols_and_density(dynamic_params, "asv")

                # Calculate performance metrics
                execution_time = time.time() - start_time

                return {
                    "status": "success",
                    "computationType": "dynamic_asv",
                    "data": {
                        "calibration_strikes": calibration_strikes.tolist(),
                        "bid_values": bid_values.tolist(),
                        "ask_values": ask_values.tolist(),
                        "mid_values": mid_values.tolist(),
                        **result_data,
                        "parameters": dynamic_params
                    },
                    "performance": {
                        "execution_time_ms": round(execution_time * 1000, 2)
                    }
                }
            except Exception as e:
                return {
                    "status": "error",
                    "error": f"Dynamic ASV calculation failed: {str(e)}"
                }

        elif computation_type == "dynamic_svi":
            try:
                # Dynamic SVI calculation with interactive parameters
                dynamic_params = {
                    "fwd": params.get('fwd', 1.0),
                    "time": params.get('time', 0.333),
                    "b": params.get('b', 0.1),
                    "m": params.get('m', 0.01),
                    "sigma": params.get('sigma', 0.4),
                }

                result_data = calculate_dynamic_vols_and_density(dynamic_params, "svi")

                # Calculate performance metrics
                execution_time = time.time() - start_time

                return {
                    "status": "success",
                    "computationType": "dynamic_svi",
                    "data": {
                        "calibration_strikes": calibration_strikes.tolist(),
                        "bid_values": bid_values.tolist(),
                        "ask_values": ask_values.tolist(),
                        "mid_values": mid_values.tolist(),
                        **result_data,
                        "parameters": dynamic_params
                    },
                    "performance": {
                        "execution_time_ms": round(execution_time * 1000, 2)
                    }
                }
            except Exception as e:
                return {
                    "status": "error",
                    "error": f"Dynamic SVI calculation failed: {str(e)}"
                }
        else:
            return {
                "status": "error",
                "error": f"Unknown computation type: {computation_type}"
            }

    except Exception as e:
        return {
            "status": "error",
            "error": str(e)
        }

def main():
    """
    Main entry point for the script
    Supports both new API interface (operation + JSON) and legacy interface
    """
    # Check if this is called with the new API interface (operation + JSON)
    if len(sys.argv) >= 2 and sys.argv[1] in ['calibrate', 'health_check']:
        operation = sys.argv[1]

        if operation == 'health_check':
            # Health check operation
            health_result = {
                'status': 'healthy',
                'service': 'AnalyticalSigmaVolatilityCalibration',
                'version': '2.1.0',
                'timestamp': str(np.datetime64('now')),
                'checks': {
                    'xsigmamodules': 'available',
                    'numpy': 'available',
                    'solvers': 'available'
                }
            }
            print(json.dumps(health_result))
            return

        elif operation == 'calibrate':
            # Parse JSON parameters if provided
            if len(sys.argv) >= 3:
                try:
                    params = json.loads(sys.argv[2])
                except json.JSONDecodeError:
                    error_result = {
                        'status': 'error',
                        'error': 'Invalid JSON parameters'
                    }
                    print(json.dumps(error_result))
                    sys.exit(1)
            else:
                # Use default parameters
                params = {
                    'n': 200,
                    'spot': 2245.0656,
                    'expiry': 1.0,
                    'r': 0.003,
                    'q': 0.0022,
                    'beta': 0.4158,
                    'rho': 0.2256,
                    'volvol': 0.2256,
                    'computationType': 'volatility_asv'
                }

            try:
                # Extract computation type
                computation_type = params.get('computationType', 'volatility_asv')

                # Calculate volatility and density
                result = calculate_vols_and_density(params, computation_type)

                # Wrap result in API format if not already wrapped
                if 'status' not in result:
                    api_result = {
                        'status': 'success',
                        'data': result,
                        'timestamp': str(np.datetime64('now'))
                    }
                else:
                    api_result = result

                print(json.dumps(api_result))
                return

            except Exception as e:
                error_result = {
                    'status': 'error',
                    'error': str(e),
                    'timestamp': str(np.datetime64('now'))
                }
                print(json.dumps(error_result))
                sys.exit(1)

    # Fallback to legacy interface for backward compatibility
    try:
        if len(sys.argv) < 10:
            raise ValueError("Insufficient arguments")

        # Parse basic command line arguments
        params = {
            'n': int(sys.argv[1]),
            'spot': float(sys.argv[2]),
            'expiry': float(sys.argv[3]),
            'r': float(sys.argv[4]),
            'q': float(sys.argv[5]),
            'beta': float(sys.argv[6]),
            'rho': float(sys.argv[7]),
            'volvol': float(sys.argv[8])
        }
        computation_type = sys.argv[9]

        # Parse additional dynamic parameters if provided
        if len(sys.argv) > 10:
            try:
                # Parse JSON string with additional parameters
                additional_params = json.loads(sys.argv[10])
                params.update(additional_params)
            except (json.JSONDecodeError, IndexError):
                # If JSON parsing fails, try individual parameters
                if len(sys.argv) >= 19:  # All dynamic parameters provided
                    params.update({
                        'fwd': float(sys.argv[10]),
                        'time': float(sys.argv[11]),
                        'ctrl_p': float(sys.argv[12]),
                        'ctrl_c': float(sys.argv[13]),
                        'atm': float(sys.argv[14]),
                        'skew': float(sys.argv[15]),
                        'smile': float(sys.argv[16]),
                        'put': float(sys.argv[17]),
                        'call': float(sys.argv[18])
                    })

        # Perform calculation and print result as JSON
        result = calculate_vols_and_density(params, computation_type)
        print(json.dumps(result))

    except Exception as e:
        print(json.dumps({
            "status": "error",
            "error": str(e)
        }))
        sys.exit(1)

if __name__ == "__main__":
    main()
