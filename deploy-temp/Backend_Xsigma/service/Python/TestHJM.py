#!/usr/bin/env python3
"""
TestHJM - Heath-Jarrow-Morton Interest Rate Model
Converted from TestHJM.ipynb

This script performs HJM interest rate model calibration, simulation, and analysis.
It supports multiple test cases including calibration performance comparison and Monte Carlo simulation.
"""

import time
import numpy as np
import matplotlib.pyplot as plt
import json
import sys
import os
import argparse
from typing import Dict, List, Any, Optional
from itertools import chain

# Add the notebook directory to Python path for xsigmamodules
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '../../../'))

try:
    from xsigmamodules.Random import random_enum
    from xsigmamodules.Analytics import (
        calibrationIrTargetsConfiguration,
        correlationManager,
        calibrationHjmSettings,
        parameter_markovian_hjm_enum,
        calibrationIrHjm,
        parameterMarkovianHjmId,
        parameterMarkovianHjm,
        dynamicInstructionId,
        dynamicInstructionIrMarkovianHjm,
        simulatedMarketDataIrId,
        correlationManagerId,
        dynamicInstructionIrId,
        measureId,
        measure,
        randomConfig,
        simulationManager,
        randomConfigId,
    )
    from xsigmamodules.Util import dayCountConvention
    from xsigmamodules.Vectorization import vector, matrix, tensor
    from xsigmamodules.util.numpy_support import xsigmaToNumpy, numpyToXsigma
    from xsigmamodules.common import helper
    from xsigmamodules.market import market_data
    from xsigmamodules.simulation import simulation
    from xsigmamodules.util.misc import xsigmaGetDataRoot, xsigmaGetTempDir
    from xsigmamodules.Market import (
        discountCurveInterpolated,
        discountCurveId,
        anyId,
        anyContainer,
        anyObject,
        irVolatilityDataSabr,
        discountCurveFlat,
    )
except ImportError as e:
    print(f"Error importing xsigmamodules: {e}", file=sys.stderr)
    sys.exit(1)

# Initialize XSIGMA data root
XSIGMA_DATA_ROOT = xsigmaGetDataRoot()
XSIGMA_TEST_ROOT = xsigmaGetTempDir()

class ConfigurationError(Exception):
    """Custom exception for configuration errors"""
    pass

def load_market_data() -> tuple:
    """Load all required market data files."""
    try:
        # Create discount_id and diffusion_id
        discount_id = discountCurveId("USD", "LIBOR.3M.USD")
        diffusion_id = simulatedMarketDataIrId(discount_id)

        # Load market data files
        discount_curve = discountCurveInterpolated.read_from_json(
            XSIGMA_DATA_ROOT + "/Data/discountCurve.json"
        )
        
        correlation_mgr = correlationManager.read_from_json(
            XSIGMA_DATA_ROOT + "/Data/correlationManager.json"
        )
        
        target_config = calibrationIrTargetsConfiguration.read_from_json(
            XSIGMA_DATA_ROOT + "/Data/calibrationIrTargetsConfiguration.json"
        )
        
        ir_volatility_surface = irVolatilityDataSabr.read_from_json(
            XSIGMA_DATA_ROOT + "/Data/irVolatilityData.json"
        )

        valuation_date = discount_curve.valuation_date()

        return (target_config, discount_curve, ir_volatility_surface, 
                correlation_mgr, valuation_date, discount_id, diffusion_id)
        
    except Exception as e:
        raise ConfigurationError(f"Error loading market data: {str(e)}")

def setup_calibration(diffusion_id, correlation_mgr: correlationManager) -> tuple:
    """Setup calibration parameters."""
    diffusion_ids = [diffusion_id]
    correlation = correlation_mgr.pair_correlation_matrix(diffusion_ids, diffusion_ids)
    
    volatility_bounds = [0.0001, 1]
    decay_bounds = [0.0001, 1.0]
    
    # Standard calibration settings
    calibration_settings = calibrationHjmSettings(
        correlation.rows(),
        volatility_bounds,
        decay_bounds,
        parameter_markovian_hjm_enum.PICEWISE_CONSTANT,
        True,
        200,
        False,
        False,
        1.0,
    )
    
    # AAD calibration settings
    calibration_settings_aad = calibrationHjmSettings(
        correlation.rows(),
        volatility_bounds,
        decay_bounds,
        parameter_markovian_hjm_enum.PICEWISE_CONSTANT,
        True,
        200,
        True,
        False,
        1.0,
    )
    
    convention = dayCountConvention()
    
    return diffusion_ids, correlation, calibration_settings, calibration_settings_aad, convention

def run_calibration_comparison(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Run calibration performance comparison between AAD and standard methods.
    This corresponds to the calibration timing comparison in the notebook.
    """
    try:
        # Load market data
        (target_config, discount_curve, ir_volatility_surface, 
         correlation_mgr, valuation_date, discount_id, diffusion_id) = load_market_data()
        
        # Setup calibration
        (diffusion_ids, correlation, calibration_settings, 
         calibration_settings_aad, convention) = setup_calibration(diffusion_id, correlation_mgr)
        
        # Create calibrator
        calibrator = calibrationIrHjm(valuation_date, target_config)
        
        # Run AAD calibration
        print("PROGRESS: Starting AAD calibration", file=sys.stderr)
        start_time = time.time()
        parameter_aad = calibrator.calibrate(
            parameterMarkovianHjmId(diffusion_id),
            calibration_settings_aad,
            discount_curve,
            ir_volatility_surface,
            correlation_mgr,
        )
        aad_time = time.time() - start_time
        print(f"PROGRESS: AAD calibration completed in {aad_time:.6f} seconds", file=sys.stderr)

        # Run standard calibration
        print("PROGRESS: Starting standard calibration", file=sys.stderr)
        start_time = time.time()
        parameter_standard = calibrator.calibrate(
            parameterMarkovianHjmId(diffusion_id),
            calibration_settings,
            discount_curve,
            ir_volatility_surface,
            correlation_mgr,
        )
        standard_time = time.time() - start_time
        print(f"PROGRESS: Standard calibration completed in {standard_time:.6f} seconds", file=sys.stderr)
        
        # Calculate performance ratio
        performance_ratio = standard_time / aad_time if aad_time > 0 else 0

        # Extract calibration data for frontend (using AAD parameter)
        print("PROGRESS: Extracting calibration data", file=sys.stderr)

        # Get expiry dates and convert to fractions
        expiry = parameter_aad.volatilities_dates()
        expiry_fraction = helper.convert_dates_to_fraction(
            valuation_date,
            expiry,
            convention,
        )

        # Calculate CMS spread pricing for different expiry dates
        cms_calls = []
        try:
            for exp_date in expiry:
                cms_call = calibrator.cms_spread_pricing_experimental(
                    valuation_date, exp_date, parameter_aad, discount_curve
                )
                cms_calls.append(cms_call)
        except Exception as e:
            print(f"PROGRESS: CMS pricing calculation failed: {str(e)}", file=sys.stderr)
            cms_calls = []

        result = {
            'aad_calibration_time': aad_time,
            'standard_calibration_time': standard_time,
            'performance_ratio': performance_ratio,
            'speedup_factor': f"{performance_ratio:.2f}x faster with AAD",
            'calibration_successful': True,
            'valuation_date': str(valuation_date),
            'data_root': XSIGMA_DATA_ROOT,
            'expiry_fraction': expiry_fraction.tolist(),
            'cms_calls': cms_calls,
            'message': 'Calibration comparison completed with numerical data.'
        }
        
        return result
        
    except Exception as e:
        raise ConfigurationError(f"Error in calibration comparison: {str(e)}")

def run_simulation_analysis(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Run Monte Carlo simulation analysis.
    This corresponds to the simulation section in the notebook.
    """
    try:
        # Load market data
        (target_config, discount_curve, ir_volatility_surface, 
         correlation_mgr, valuation_date, discount_id, diffusion_id) = load_market_data()
        
        # Setup calibration
        (diffusion_ids, correlation, calibration_settings, 
         calibration_settings_aad, convention) = setup_calibration(diffusion_id, correlation_mgr)
        
        # Create calibrator and run calibration (using AAD for speed)
        calibrator = calibrationIrHjm(valuation_date, target_config)
        parameter = calibrator.calibrate(
            parameterMarkovianHjmId(diffusion_id),
            calibration_settings_aad,
            discount_curve,
            ir_volatility_surface,
            correlation_mgr,
        )
        
        print("PROGRESS: Setting up simulation", file=sys.stderr)

        # Setup market container
        anyids = [anyId(discount_id)]
        anyobject = [anyObject(discount_curve)]
        
        anyids.append(anyId(correlationManagerId()))
        anyobject.append(anyObject(correlation_mgr))
        
        anyids.append(anyId(parameterMarkovianHjmId(diffusion_id)))
        anyobject.append(anyObject(parameter))
        
        anyids.append(anyId(dynamicInstructionIrId(diffusion_id)))
        anyobject.append(anyObject(dynamicInstructionIrMarkovianHjm()))
        
        anyids.append(anyId(measureId()))
        anyobject.append(anyObject(measure(discount_id)))
        
        # Configure simulation parameters
        num_of_paths = int(params.get('num_paths', 262144 * 2))
        config = randomConfig(random_enum.SOBOL_BROWNIAN_BRIDGE, 12765793, num_of_paths)
        
        anyids.append(anyId(randomConfigId()))
        anyobject.append(anyObject(config))
        
        market = anyContainer(anyids, anyobject)
        
        # Setup simulation dates
        simulation_dates = helper.simulation_dates(valuation_date, "3M", 120)
        maturity = max(simulation_dates)
        
        # Create market data object
        mkt_data_obj = market_data.market_data(XSIGMA_DATA_ROOT)
        
        # Create and run simulation
        sim = simulation.Simulation(
            mkt_data_obj,
            num_of_paths,
            target_config.frequency(),
            target_config.expiries(),
            target_config.cms_tenors(),
            target_config.coterminal(),
            maturity,
            simulation_dates,
        )
        
        print("PROGRESS: Running simulation", file=sys.stderr)
        sim.run_simulation(diffusion_ids, market, simulation_dates)
        print("PROGRESS: Simulation completed", file=sys.stderr)

        # Extract actual numerical results for frontend
        print("PROGRESS: Processing simulation results", file=sys.stderr)

        # Get model and market volatility data
        x = list(sim.results.model_swaption_implied.keys())
        model_vols = np.array(list(sim.results.model_swaption_implied.values())).T * 10000
        market_vols = np.array(list(sim.results.market_swaption_implied.values())).T * 10000

        print(f"PROGRESS: Model volatility shape: {model_vols.shape}", file=sys.stderr)
        print(f"PROGRESS: Market volatility shape: {market_vols.shape}", file=sys.stderr)

        # Calculate error matrices
        error = np.asarray(
            [model_vols[i] - market_vols[i] for i in range(len(model_vols))]
        )

        # Ensure we have at least 4 datasets by padding with zeros if necessary
        num_datasets = len(model_vols)
        print(f"PROGRESS: Number of datasets available: {num_datasets}", file=sys.stderr)

        # Helper function to safely get data or return zeros
        def safe_get_data(data_array, index, default_size=None):
            if index < len(data_array):
                return data_array[index].tolist()
            else:
                # Return zeros if dataset doesn't exist
                if default_size is None and len(data_array) > 0:
                    default_size = len(data_array[0])
                elif default_size is None:
                    default_size = 10  # fallback size
                return [0.0] * default_size

        # Structure volatility data for frontend (ensure 4 datasets)
        volatility_data = {
            "data1": {
                "model": safe_get_data(model_vols, 0),
                "market": safe_get_data(market_vols, 0)
            },
            "data2": {
                "model": safe_get_data(model_vols, 1),
                "market": safe_get_data(market_vols, 1)
            },
            "data3": {
                "model": safe_get_data(model_vols, 2),
                "market": safe_get_data(market_vols, 2)
            },
            "data4": {
                "model": safe_get_data(model_vols, 3),
                "market": safe_get_data(market_vols, 3)
            }
        }

        # Structure error data for frontend (ensure 4 datasets)
        error_data = {
            "data1": safe_get_data(error, 0),
            "data2": safe_get_data(error, 1),
            "data3": safe_get_data(error, 2),
            "data4": safe_get_data(error, 3)
        }

        # Get expiry fractions for x-axis
        expiry = parameter.volatilities_dates()
        expiry_fraction = helper.convert_dates_to_fraction(
            valuation_date,
            expiry,
            convention,
        )

        result = {
            'simulation_successful': True,
            'num_paths': num_of_paths,
            'simulation_dates_count': len(simulation_dates),
            'maturity': str(maturity),
            'valuation_date': str(valuation_date),
            'NI_Volatility_Bps': volatility_data,
            'Error_Bps': error_data,
            'expiry_fraction': expiry_fraction.tolist(),
            'message': 'Simulation completed successfully with numerical data.',
            'parameters': {
                'num_paths': num_of_paths,
                'frequency': target_config.frequency(),
                'simulation_length': len(simulation_dates)
            }
        }
        
        return result

    except Exception as e:
        print(f"PROGRESS: Simulation analysis failed with error: {str(e)}", file=sys.stderr)
        import traceback
        print(f"PROGRESS: Full traceback: {traceback.format_exc()}", file=sys.stderr)
        raise ConfigurationError(f"Error in simulation analysis: {str(e)}")

def calculate_hjm_model(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Main HJM calculation function that routes to appropriate test case.

    Args:
        params: Dictionary containing calculation parameters

    Returns:
        Dictionary containing calculated HJM data
    """
    test_case = params.get('test', 1)
    output_type = params.get('output_type', 'calibration_comparison')

    # Route to appropriate calculation based on test case
    if test_case == 1 or output_type == 'calibration_comparison':
        return run_calibration_comparison(params)
    elif test_case == 2 or output_type == 'simulation_analysis':
        return run_simulation_analysis(params)
    else:
        # Default to calibration comparison
        return run_calibration_comparison(params)

def main():
    """Main function to handle command line execution"""
    # Check if this is called with the new API interface (operation + JSON)
    if len(sys.argv) >= 2 and sys.argv[1] in ['calculate', 'health_check']:
        operation = sys.argv[1]

        if operation == 'health_check':
            # Health check operation
            health_result = {
                'status': 'healthy',
                'service': 'TestHJM',
                'version': '1.0.0',
                'timestamp': str(np.datetime64('now')),
                'checks': {
                    'xsigmamodules': 'available',
                    'numpy': 'available',
                    'matplotlib': 'available',
                    'data_root': XSIGMA_DATA_ROOT,
                    'test_root': XSIGMA_TEST_ROOT
                }
            }
            print(json.dumps(health_result))
            return

        elif operation == 'calculate':
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
                params = {}

            # Map test case to output_type if provided
            if 'test' in params:
                test_case = params['test']
                if test_case == 1:
                    params['output_type'] = 'calibration_comparison'
                elif test_case == 2:
                    params['output_type'] = 'simulation_analysis'

            try:
                # Calculate HJM model
                result = calculate_hjm_model(params)

                # Wrap result in API format
                api_result = {
                    'status': 'success',
                    'data': result,
                    'timestamp': str(np.datetime64('now'))
                }
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

    # Fallback to original argparse interface for backward compatibility
    parser = argparse.ArgumentParser(description='Calculate TestHJM Interest Rate Model')
    parser.add_argument('--test', type=int, default=1, choices=[1, 2],
                       help='Test case: 1=calibration_comparison, 2=simulation_analysis')
    parser.add_argument('--num_paths', type=int, default=524288,
                       help='Number of Monte Carlo paths for simulation')
    parser.add_argument('--output_type', type=str, default='calibration_comparison',
                       choices=['calibration_comparison', 'simulation_analysis'],
                       help='Type of output to generate')
    parser.add_argument('--format', type=str, default='json', choices=['json'],
                       help='Output format')

    args = parser.parse_args()

    # Convert args to parameters dictionary
    params = {
        'test': args.test,
        'num_paths': args.num_paths,
        'output_type': args.output_type
    }

    try:
        # Calculate HJM model
        result = calculate_hjm_model(params)

        # Output results
        if args.format == 'json':
            print(json.dumps(result, indent=2))

    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
