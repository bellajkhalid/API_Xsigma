#!/usr/bin/env python3
"""
Analytical Sigma Volatility Calculator
Converted from AnalyticalSigmaVolatility_fixed_executed.ipynb

This script calculates volatility surfaces using the Extended SVI model.
It supports multiple output types for different analysis needs.
"""

import numpy as np
import matplotlib.pyplot as plt
import json
import sys
import os
import argparse
from typing import Dict, List, Any, Optional

# Add the notebook directory to Python path for xsigmamodules
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '../../../'))

try:
    from xsigmamodules.Util import (
        blackScholes,
        implied_volatility_enum,
    )
    from xsigmamodules.Market import volatilityModelExtendedSvi
    from xsigmamodules.util.misc import xsigmaGetDataRoot
    from xsigmamodules.util.numpy_support import numpyToXsigma
except ImportError as e:
    print(f"Error importing xsigmamodules: {e}", file=sys.stderr)
    sys.exit(1)

# Initialize XSIGMA data root
XSIGMA_DATA_ROOT = xsigmaGetDataRoot()

def calculate_volatility_surface(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Calculate volatility surface using Extended SVI model

    Args:
        params: Dictionary containing calculation parameters

    Returns:
        Dictionary containing calculated volatility data
    """
    output_type = params.get('output_type', 'volatility_surface')

    # Set default parameters based on output type (from notebook analysis)
    if output_type == 'volatility_surface':
        # Case 1: Basic volatility surface parameters (Cellule 2)
        default_fwd = 2245.0656707892695
        default_time = 1.0
        default_atm = 1.1
        default_skew = 3.5
        default_smile = 17
        default_put = 0.7
        default_call = 0.06
    elif output_type in ['vols_plus_minus', 'density', 'probability', 'all']:
        # Cases 2-4: Sensitivity/density/probability parameters (Cellule 3)
        default_fwd = 1.0
        default_time = 0.333
        default_atm = 0.1929
        default_skew = 0.02268
        default_smile = 0.00317
        default_put = -0.00213
        default_call = -0.00006
    else:
        # Default fallback to Case 1
        default_fwd = 2245.0656707892695
        default_time = 1.0
        default_atm = 1.1
        default_skew = 3.5
        default_smile = 17
        default_put = 0.7
        default_call = 0.06

    # Extract parameters with appropriate defaults
    n = int(params.get('n', 200))
    fwd = float(params.get('fwd', default_fwd))
    time = float(params.get('time', default_time))
    ctrl_p = float(params.get('ctrl_p', 0.2))
    ctrl_c = float(params.get('ctrl_c', 0.2))
    atm = float(params.get('atm', default_atm))
    skew = float(params.get('skew', default_skew))
    smile = float(params.get('smile', default_smile))
    put = float(params.get('put', default_put))
    call = float(params.get('call', default_call))
    
    # Calculate strikes and initialize volatility arrays
    strikes = np.linspace(0.25 * fwd, 2.0 * fwd, n)
    vols = np.zeros(n)
    vols0 = np.zeros(n)
    vols0.fill(atm)
    
    # Create volatility model and calculate implied volatilities
    obj = volatilityModelExtendedSvi(fwd, ctrl_p, ctrl_c, atm, skew, smile, put, call)
    obj.implied_volatility(
        numpyToXsigma(vols),
        numpyToXsigma(strikes),
        fwd,
        time,
        implied_volatility_enum.LOG_NORMAL,
    )
    
    # Base result
    result = {
        'strikes': strikes.tolist(),
        'volatilities': vols.tolist(),
        'atm_volatilities': vols0.tolist(),
        'parameters': {
            'n': n, 'fwd': fwd, 'time': time, 'ctrl_p': ctrl_p, 'ctrl_c': ctrl_c,
            'atm': atm, 'skew': skew, 'smile': smile, 'put': put, 'call': call,
            'output_type': output_type
        },
        'output_type': output_type
    }
    
    # Calculate additional data based on output_type
    if output_type in ['vols_plus_minus', 'all']:
        # Case 2: Sensitivity analysis with different ctrl_c values (from notebook cellule 3-4)
        strikes_sens = np.linspace(0.3, 2.0, n)
        vols_plus = np.zeros(n)
        vols_minus = np.zeros(n)

        # Plus scenario (original ctrl_c)
        obj_plus = volatilityModelExtendedSvi(fwd, ctrl_p, ctrl_c, atm, skew, smile, put, call)
        obj_plus.implied_volatility(
            numpyToXsigma(vols_plus),
            numpyToXsigma(strikes_sens),
            fwd,
            time,
            implied_volatility_enum.LOG_NORMAL,
        )

        # Minus scenario (modified ctrl_c = 4.0)
        obj_minus = volatilityModelExtendedSvi(fwd, ctrl_p, 4.0, atm, skew, smile, put, call)
        obj_minus.implied_volatility(
            numpyToXsigma(vols_minus),
            numpyToXsigma(strikes_sens),
            fwd,
            time,
            implied_volatility_enum.LOG_NORMAL,
        )

        result.update({
            'strikes_sensitivity': strikes_sens.tolist(),
            'vols_plus': vols_plus.tolist(),
            'vols_minus': vols_minus.tolist(),
            'ctrl_c_plus': ctrl_c,
            'ctrl_c_minus': 4.0
        })
    
    if output_type in ['density', 'probability', 'all']:
        # Cases 3-4: Calculate density and probability using sensitivities (from notebook cellules 6-7)

        # First, calculate sensitivities using the same strikes as main calculation
        vols_sens = np.zeros(n)
        atm_sensitivity = np.zeros(n)
        skew_sensitivity = np.zeros(n)
        smile_sensitivity = np.zeros(n)
        put_sensitivity = np.zeros(n)
        call_sensitivity = np.zeros(n)
        strike_sensitivity = np.zeros(n)
        ref_sensitivity = np.zeros(n)
        atm2_sensitivity = np.zeros(n)
        ref2_sensitivity = np.zeros(n)
        strike2_sensitivity = np.zeros(n)

        obj_sens = volatilityModelExtendedSvi(fwd, ctrl_p, ctrl_c, atm, skew, smile, put, call)
        obj_sens.sensitivities(
            time,
            numpyToXsigma(strikes),
            numpyToXsigma(vols_sens),
            numpyToXsigma(atm_sensitivity),
            numpyToXsigma(skew_sensitivity),
            numpyToXsigma(smile_sensitivity),
            numpyToXsigma(put_sensitivity),
            numpyToXsigma(call_sensitivity),
            numpyToXsigma(strike_sensitivity),
            numpyToXsigma(ref_sensitivity),
            numpyToXsigma(atm2_sensitivity),
            numpyToXsigma(ref2_sensitivity),
            numpyToXsigma(strike2_sensitivity),
        )

        # Calculate density and probability using blackScholes functions
        density = []
        probability = []

        for i in range(len(strikes)):
            # Case 3: Density calculation (cellule 7)
            density_value = blackScholes.density(
                fwd, strikes[i], time, vols_sens[i], strike_sensitivity[i], strike2_sensitivity[i]
            )
            density.append(density_value)

            # Case 4: Probability calculation (cellule 7)
            proba_value = blackScholes.probability(
                fwd, strikes[i], time, vols_sens[i], strike_sensitivity[i]
            )
            probability.append(proba_value)

        density = np.array(density)
        probability = np.array(probability)

        # Calculate density_bump and probability_bump (cellule 8)
        density_bump = []
        probability_bump = []
        bump = 0.000001

        for i in range(len(strikes)):
            strikes_tmp = np.array([strikes[i] - bump, strikes[i], strikes[i] + bump])
            vols_tmp = np.zeros(3)
            obj_bump = volatilityModelExtendedSvi(fwd, ctrl_p, ctrl_c, atm, skew, smile, put, call)
            obj_bump.implied_volatility(
                numpyToXsigma(vols_tmp),
                numpyToXsigma(strikes_tmp),
                fwd,
                time,
                implied_volatility_enum.LOG_NORMAL,
            )

            value_down = blackScholes.price(fwd, strikes[i] - bump, time, vols_tmp[0], 1.0, 1.0)
            value = blackScholes.price(fwd, strikes[i], time, vols_tmp[1], 1.0, 1.0)
            value_up = blackScholes.price(fwd, strikes[i] + bump, time, vols_tmp[2], 1.0, 1.0)

            density_bump.append((value_up + value_down - 2 * value) / (bump * bump))
            probability_bump.append(1 + (value_up - value_down) / (2.0 * bump))

        density_bump = np.array(density_bump)
        probability_bump = np.array(probability_bump)

        result.update({
            'density': density.tolist(),
            'probability': probability.tolist(),
            'density_bump': density_bump.tolist(),
            'probability_bump': probability_bump.tolist()
        })
    
    return result

def main():
    """Main function to handle command line execution"""
    # Check if this is called with the new API interface (operation + JSON)
    if len(sys.argv) >= 2 and sys.argv[1] in ['calculate', 'health_check']:
        operation = sys.argv[1]

        if operation == 'health_check':
            # Health check operation
            health_result = {
                'status': 'healthy',
                'service': 'AnalyticalSigmaVolatility',
                'version': '2.1.0',
                'timestamp': str(np.datetime64('now')),
                'checks': {
                    'xsigmamodules': 'available',
                    'numpy': 'available',
                    'matplotlib': 'available'
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
                    params['output_type'] = 'volatility_surface'
                elif test_case == 2:
                    params['output_type'] = 'vols_plus_minus'
                elif test_case == 3:
                    params['output_type'] = 'density'
                elif test_case == 4:
                    params['output_type'] = 'probability'

            try:
                # Calculate volatility surface
                result = calculate_volatility_surface(params)

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
    parser = argparse.ArgumentParser(description='Calculate Analytical Sigma Volatility')
    parser.add_argument('--n', type=int, default=200, help='Number of calculation points')
    parser.add_argument('--fwd', type=float, default=2245.0656707892695, help='Forward price')
    parser.add_argument('--time', type=float, default=1.0, help='Time to expiry')
    parser.add_argument('--ctrl_p', type=float, default=0.2, help='Control parameter P')
    parser.add_argument('--ctrl_c', type=float, default=0.2, help='Control parameter C')
    parser.add_argument('--atm', type=float, default=1.1, help='At-the-money volatility')
    parser.add_argument('--skew', type=float, default=3.5, help='Skew parameter')
    parser.add_argument('--smile', type=float, default=17, help='Smile parameter')
    parser.add_argument('--put', type=float, default=0.7, help='Put parameter')
    parser.add_argument('--call', type=float, default=0.06, help='Call parameter')
    parser.add_argument('--output_type', type=str, default='volatility_surface',
                       choices=['volatility_surface', 'vols_plus_minus', 'sensitivity', 'density', 'probability', 'all'],
                       help='Type of output to generate')
    parser.add_argument('--format', type=str, default='json', choices=['json', 'csv'],
                       help='Output format')
    parser.add_argument('--plot', action='store_true', help='Generate plot')

    args = parser.parse_args()
    
    # Convert args to parameters dictionary
    params = {
        'n': args.n,
        'fwd': args.fwd,
        'time': args.time,
        'ctrl_p': args.ctrl_p,
        'ctrl_c': args.ctrl_c,
        'atm': args.atm,
        'skew': args.skew,
        'smile': args.smile,
        'put': args.put,
        'call': args.call,
        'output_type': args.output_type
    }
    
    try:
        # Calculate volatility surface
        result = calculate_volatility_surface(params)
        
        # Output results
        if args.format == 'json':
            print(json.dumps(result, indent=2))
        elif args.format == 'csv':
            # Simple CSV output for basic data
            print("Strike,Volatility,ATM_Volatility")
            for i, strike in enumerate(result['strikes']):
                print(f"{strike},{result['volatilities'][i]},{result['atm_volatilities'][i]}")
        
        # Generate plot if requested
        if args.plot:
            plt.figure(figsize=(12, 8))
            
            # Main volatility surface
            plt.subplot(2, 2, 1)
            plt.plot(result['strikes'], result['volatilities'], 'b-', linewidth=2, label='Volatilities')
            plt.plot(result['strikes'], result['atm_volatilities'], 'r--', linewidth=1, label='ATM Volatilities')
            plt.xlabel('Strikes')
            plt.ylabel('Volatility')
            plt.title('Volatility Surface')
            plt.legend()
            plt.grid(True)
            
            # Sensitivity analysis if available
            if 'vols_plus' in result:
                plt.subplot(2, 2, 2)
                plt.plot(result['strikes_sensitivity'], result['vols_plus'], 'g-', linewidth=2, label=f'ctrl_c = {result["ctrl_c_plus"]}')
                plt.plot(result['strikes_sensitivity'], result['vols_minus'], 'r-', linewidth=2, label=f'ctrl_c = {result["ctrl_c_minus"]}')
                plt.xlabel('Strikes')
                plt.ylabel('Volatility')
                plt.title('Sensitivity Analysis')
                plt.legend()
                plt.grid(True)
            
            # Density if available
            if 'density' in result:
                plt.subplot(2, 2, 3)
                plt.plot(result['strikes_sensitivity'], result['density'], 'm-', linewidth=2, label='Density')
                plt.xlabel('Strikes')
                plt.ylabel('Density')
                plt.title('Probability Density')
                plt.legend()
                plt.grid(True)
            
            # Probability if available
            if 'probability' in result:
                plt.subplot(2, 2, 4)
                plt.plot(result['strikes_sensitivity'], result['probability'], 'c-', linewidth=2, label='Cumulative Probability')
                plt.xlabel('Strikes')
                plt.ylabel('Probability')
                plt.title('Cumulative Probability')
                plt.legend()
                plt.grid(True)
            
            plt.tight_layout()
            plt.show()
            
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
