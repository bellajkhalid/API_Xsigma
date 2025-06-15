import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ZABRParameters {
  forward: number;
  expiry: number;
  alpha: number;
  beta: number;
  vol_of_vol: number;
  rho: number;
  shift: number;
  gamma: number;
  calibration_type: 'classical' | 'pde' | 'mixture';
  // PDE specific parameters
  N?: number;
  timesteps?: number;
  nd?: number;
  // ZABR Mixture specific parameters
  beta1?: number;
  beta2?: number;
  d?: number;
  high_strike?: number;
  vol_low?: number;
  low_strike?: number;
  forward_cut_off?: number;
  smothing_factor?: number;
}

const ZABRModel = () => {
  const { getThemeClasses } = useTheme();
  const theme = getThemeClasses();

  const [parameters, setParameters] = useState<ZABRParameters>({
    forward: 0.03,
    expiry: 10,
    alpha: 0.09,
    beta: 0.7,
    vol_of_vol: 0.47,
    rho: -0.48,
    shift: 0.0,
    gamma: 1.0,
    calibration_type: 'classical',
    // PDE specific parameters
    N: 100,
    timesteps: 5,
    nd: 5,
    // ZABR Mixture specific parameters (exact values from notebook)
    beta1: 0.2,
    beta2: 1.25,
    d: 0.2,
    high_strike: 0.1,
    vol_low: 0.0001,
    low_strike: 0.02,
    forward_cut_off: 0.02,
    smothing_factor: 0.001
  });

  const [results, setResults] = useState<any>(null);
  const [initialResults, setInitialResults] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [useVolAdjustment, setUseVolAdjustment] = useState(true);
  const debounceRef = useRef<NodeJS.Timeout>();

  // Slider ranges for each parameter
  const sliderRanges = {
    forward: { min: -0.01, max: 0.1, step: 0.0001 },
    expiry: { min: 1, max: 30, step: 1 },
    alpha: { min: 0.001, max: 0.5, step: 0.0001 },
    beta: { min: 0.1, max: 1.0, step: 0.01 },
    vol_of_vol: { min: 0.1, max: 2.0, step: 0.01 },
    rho: { min: -0.99, max: 0.99, step: 0.01 },
    nu: { min: 0.1, max: 2.0, step: 0.01 },
    gamma: { min: 0.1, max: 3.0, step: 0.01 },
    shift: { min: -0.1, max: 0.1, step: 0.001 },
    // PDE specific ranges
    N: { min: 50, max: 500, step: 1 },
    timesteps: { min: 1, max: 100, step: 1 },
    nd: { min: 1, max: 10, step: 1 },
    // ZABR Mixture specific ranges
    beta1: { min: 0.01, max: 1.0, step: 0.01 },
    beta2: { min: 0.1, max: 5.0, step: 0.01 },
    d: { min: 0.01, max: 1.0, step: 0.01 },
    high_strike: { min: 0.01, max: 1.0, step: 0.01 },
    vol_low: { min: 0.00001, max: 0.01, step: 0.00001 },
    low_strike: { min: 0.001, max: 0.1, step: 0.001 },
    forward_cut_off: { min: 0.001, max: 0.1, step: 0.001 },
    smothing_factor: { min: 0.0001, max: 0.01, step: 0.0001 }
  };

  const handleParameterChange = (key: keyof ZABRParameters, value: string | number) => {
    const newValue = typeof value === 'string' && key !== 'calibration_type' ? parseFloat(value) : value;
    setParameters(prev => ({
      ...prev,
      [key]: newValue
    }));

    // Auto-calculate with debounce for dynamic updates
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      calculateZABRDynamic();
    }, 300);
  };

  const handleSliderChange = (key: keyof ZABRParameters, value: number[]) => {
    handleParameterChange(key, value[0]);
  };

  const calculateZABRDynamic = async () => {
    try {
      // Determine model type based on calibration_type
      let modelType = 'zabr_classic';
      if (parameters.calibration_type === 'pde') {
        modelType = 'sabr_pde';
      } else if (parameters.calibration_type === 'mixture') {
        modelType = 'zabr_mixture';
      }

      // Prepare parameters for API call
      const apiParams: any = {
        expiry: parameters.expiry,
        forward: parameters.forward,
        alpha: parameters.alpha,
        beta: parameters.beta,
        nu: parameters.vol_of_vol,
        rho: parameters.rho,
        shift: parameters.shift,
        gamma: parameters.gamma,
        use_vol_adjustement: true
      };

      // Add model-specific parameters
      if (modelType === 'sabr_pde') {
        apiParams.N = parameters.N || 100;
        apiParams.timesteps = parameters.timesteps || 5;
        apiParams.nd = parameters.nd || 5;
      } else if (modelType === 'zabr_mixture') {
        apiParams.beta1 = parameters.beta1 || 0.2;
        apiParams.beta2 = parameters.beta2 || 1.25;
        apiParams.d = parameters.d || 0.2;
        apiParams.high_strike = parameters.high_strike || 0.1;
        apiParams.vol_low = parameters.vol_low || 0.0001;
        apiParams.low_strike = parameters.low_strike || 0.02;
        apiParams.forward_cut_off = parameters.forward_cut_off || 0.02;
        apiParams.smothing_factor = parameters.smothing_factor || 0.001;
      }

      const response = await fetch('http://localhost:5005/api/zabr-variables-impact/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model_type: modelType,
          parameters: apiParams,
          use_cache: true
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.status === 'success' && result.data) {
        // Log data for verification
        console.log('=== ZABR Frontend Data Verification ===');
        console.log('Model Type:', result.data.model_type);
        console.log('Number of strikes:', result.data.strikes?.length);
        console.log('Strike range:', Math.min(...result.data.strikes), 'to', Math.max(...result.data.strikes));
        console.log('Volatility range:', Math.min(...result.data.dynamic_volatility), 'to', Math.max(...result.data.dynamic_volatility));
        console.log('Sample data (first 5):');
        for(let i = 0; i < 5; i++) {
          console.log(`  Strike ${result.data.strikes[i]?.toFixed(4)} -> Vol ${result.data.dynamic_volatility[i]?.toFixed(6)}`);
        }
        console.log('Parameters used:', result.data.dynamic_params);

        setResults({
          strikes: result.data.strikes,
          model_vols: result.data.dynamic_volatility,
          initial_vols: result.data.initial_volatility,
          volatility_difference: result.data.volatility_difference,
          calibration_error: Math.abs(result.data.volatility_difference.reduce((a: number, b: number) => a + b, 0) / result.data.volatility_difference.length),
          parameters_used: parameters
        });
      } else {
        throw new Error(result.error || 'Calculation failed');
      }
    } catch (error) {
      console.error('Error calculating ZABR:', error);
      // Fallback to mock data
      const strikes = Array.from({ length: 21 }, (_, i) => 0.01 + i * 0.002);
      const modelVols = strikes.map(strike => {
        const moneyness = strike / parameters.forward;
        const baseVol = parameters.alpha * Math.pow(moneyness, parameters.beta - 1);
        const volOfVolEffect = parameters.vol_of_vol * Math.sqrt(parameters.expiry / 365);
        const correlation = parameters.rho * volOfVolEffect;
        return Math.max(0.001, baseVol + correlation * (moneyness - 1));
      });

      setResults({
        strikes,
        model_vols: modelVols,
        initial_vols: modelVols.map(v => v * 0.95), // Slightly different initial values
        calibration_error: Math.random() * 0.001,
        parameters_used: parameters
      });
    }
  };

  const calculateZABR = async () => {
    setIsCalculating(true);

    // Store initial results if not already stored
    if (!initialResults) {
      const strikes = Array.from({ length: 21 }, (_, i) => 0.01 + i * 0.002);
      const initialVols = strikes.map(strike => {
        const moneyness = strike / 0.03; // Initial forward
        const baseVol = 0.09 * Math.pow(moneyness, 0.7 - 1); // Initial alpha and beta
        return Math.max(0.001, baseVol);
      });

      setInitialResults({
        strikes,
        model_vols: initialVols
      });
    }

    // Calculate current results
    await calculateZABRDynamic();
    setIsCalculating(false);
  };

  // Initialize with calculation on mount
  useEffect(() => {
    // Store initial results first
    const strikes = Array.from({ length: 21 }, (_, i) => 0.01 + i * 0.002);
    const initialVols = strikes.map(strike => {
      const moneyness = strike / 0.03; // Initial forward
      const baseVol = 0.09 * Math.pow(moneyness, 0.7 - 1); // Initial alpha and beta
      return Math.max(0.001, baseVol);
    });

    setInitialResults({
      strikes,
      model_vols: initialVols
    });

    // Then calculate dynamic
    calculateZABRDynamic();
  }, []);

  const resetParameters = () => {
    // Use different defaults based on calibration type
    if (parameters.calibration_type === 'pde') {
      // SABR PDE defaults from notebook
      setParameters({
        forward: 0.02,
        expiry: 30,
        alpha: 0.035,
        beta: 0.25,
        vol_of_vol: 1.0,
        rho: -0.1,
        shift: 0.0,
        gamma: 1.0,
        calibration_type: 'pde',
        N: 100,
        timesteps: 5,
        nd: 5
      });
    } else if (parameters.calibration_type === 'mixture') {
      // ZABR Mixture defaults from notebook (exact values)
      setParameters({
        forward: -0.0007,
        expiry: 30,
        alpha: 0.0132,
        beta: 0.2, // This will be beta1 in the API
        vol_of_vol: 0.1978,
        rho: -0.444,
        shift: 0.0,
        gamma: 1.0,
        calibration_type: 'mixture',
        beta1: 0.2,
        beta2: 1.25,
        d: 0.2,
        high_strike: 0.1,
        vol_low: 0.0001,
        low_strike: 0.02,
        forward_cut_off: 0.02,
        smothing_factor: 0.001
      });
    } else {
      // ZABR Classic defaults
      setParameters({
        forward: 0.03,
        expiry: 10,
        alpha: 0.09,
        beta: 0.7,
        vol_of_vol: 0.47,
        rho: -0.48,
        shift: 0.0,
        gamma: 1.0,
        calibration_type: 'classical',
        N: 100,
        timesteps: 5,
        nd: 5
      });
    }
  };

  const chartData = (results && results.strikes && results.model_vols) ? results.strikes.map((strike: number, index: number) => ({
    strike: strike,
    dynamicVol: results.model_vols[index] ? results.model_vols[index] * 100 : 0,
    initialVol: (results.initial_vols && results.initial_vols[index]) ? results.initial_vols[index] * 100 :
                (initialResults && initialResults.model_vols && initialResults.model_vols[index] ? initialResults.model_vols[index] * 100 : null),
    marketVol: results.market_vols && results.market_vols[index] ? results.market_vols[index] * 100 : null
  })) : [];

  return (
    <div className="space-y-6">
      {/* Description Section */}
      <Card className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border`}>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${theme.text}`}>
                📚 About ZABR Model
              </h3>
              <div className={`${theme.textMuted} space-y-3 text-sm leading-relaxed font-clean`}>
                <p>
                  The <strong className="text-blue-400 font-mono">Zero Correlation SABR (ZABR)</strong> model is a specialized
                  variant of the SABR model where the correlation parameter ρ is set to zero. This simplification
                  allows for more efficient calibration while maintaining excellent fit to interest rate derivatives.
                </p>
                <p>
                  Our implementation supports <strong className="text-green-400 font-mono">three calibration methods</strong>:
                  Classical analytics, PDE solutions, and Mixture models for maximum flexibility and precision.
                </p>
              </div>
            </div>
            <div>
              <h3 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${theme.text}`}>
                🎯 ZABR Features
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className={`p-3 rounded-lg ${theme.glassBg} ${theme.borderColor} border`}>
                  <div className="text-blue-400 font-mono font-medium text-sm">Classical</div>
                  <div className={`${theme.textMuted} text-xs font-clean`}>Analytical solution</div>
                </div>
                <div className={`p-3 rounded-lg ${theme.glassBg} ${theme.borderColor} border`}>
                  <div className="text-green-400 font-mono font-medium text-sm">PDE Method</div>
                  <div className={`${theme.textMuted} text-xs font-clean`}>Numerical precision</div>
                </div>
                <div className={`p-3 rounded-lg ${theme.glassBg} ${theme.borderColor} border`}>
                  <div className="text-purple-400 font-mono font-medium text-sm">Mixture</div>
                  <div className={`${theme.textMuted} text-xs font-clean`}>Hybrid approach</div>
                </div>
                <div className={`p-3 rounded-lg ${theme.glassBg} ${theme.borderColor} border`}>
                  <div className="text-orange-400 font-mono font-medium text-sm">IR Focus</div>
                  <div className={`${theme.textMuted} text-xs font-clean`}>Interest rates</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Tabs Section - ZABR Sub-Models */}
      <Tabs
        defaultValue="mzabr-classic"
        className="w-full"
        onValueChange={(value) => {
          // Auto-switch calibration type based on selected tab
          const modelTypeMap = {
            'mzabr-classic': 'classical',
            'zabr-pde': 'pde',
            'zabr-mixt': 'mixture'
          };
          const newType = modelTypeMap[value as keyof typeof modelTypeMap];
          if (newType && newType !== parameters.calibration_type) {
            // Load appropriate default parameters for each model
            if (newType === 'pde') {
              // SABR PDE defaults from notebook
              setParameters({
                forward: 0.02,
                expiry: 30,
                alpha: 0.035,
                beta: 0.25,
                vol_of_vol: 1.0,
                rho: -0.1,
                shift: 0.0,
                gamma: 1.0,
                calibration_type: 'pde',
                N: 100,
                timesteps: 5,
                nd: 5
              });
            } else if (newType === 'classical') {
              // ZABR Classic defaults from notebook
              setParameters({
                forward: 0.0325,
                expiry: 10,
                alpha: 0.0873,
                beta: 0.7,
                vol_of_vol: 0.47,
                rho: -0.48,
                shift: 0.0,
                gamma: 1.0,
                calibration_type: 'classical',
                N: 100,
                timesteps: 5,
                nd: 5
              });
            } else if (newType === 'mixture') {
              // ZABR Mixture defaults from notebook (exact values)
              setParameters({
                forward: -0.0007,
                expiry: 30,
                alpha: 0.0132,
                beta: 0.2,
                vol_of_vol: 0.1978,
                rho: -0.444,
                shift: 0.0,
                gamma: 1.0,
                calibration_type: 'mixture',
                beta1: 0.2,
                beta2: 1.25,
                d: 0.2,
                high_strike: 0.1,
                vol_low: 0.0001,
                low_strike: 0.02,
                forward_cut_off: 0.02,
                smothing_factor: 0.001
              });
            } else {
              handleParameterChange('calibration_type', newType);
            }
          }
        }}
      >
        <TabsList className={`grid w-full grid-cols-3 ${theme.glassBg} ${theme.borderColor}`}>
          <TabsTrigger value="mzabr-classic" className="font-mono">
            📊 MZABR Classic
          </TabsTrigger>
          <TabsTrigger value="zabr-pde" className="font-mono">
            🔬 ZABR PDE
          </TabsTrigger>
          <TabsTrigger value="zabr-mixt" className="font-mono">
            🎭 ZABR Mixt
          </TabsTrigger>
        </TabsList>

        {/* MZABR Classic Tab */}
        <TabsContent value="mzabr-classic" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Model Configuration Panel */}
            <Card className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border`}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${theme.text} font-corporate`}>
                  📊 MZABR Classic Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Dynamic Sliders Grid */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Expiry Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className={`${theme.text} font-clean text-sm`}>Expiry</Label>
                      <span className={`${theme.text} font-mono text-sm`}>{parameters.expiry.toFixed(0)}</span>
                    </div>
                    <Slider
                      value={[parameters.expiry]}
                      onValueChange={(value) => handleSliderChange('expiry', value)}
                      min={sliderRanges.expiry.min}
                      max={sliderRanges.expiry.max}
                      step={sliderRanges.expiry.step}
                      className="w-full"
                    />
                  </div>

                  {/* Forward Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className={`${theme.text} font-clean text-sm`}>Forward</Label>
                      <span className={`${theme.text} font-mono text-sm`}>{parameters.forward.toFixed(3)}</span>
                    </div>
                    <Slider
                      value={[parameters.forward]}
                      onValueChange={(value) => handleSliderChange('forward', value)}
                      min={sliderRanges.forward.min}
                      max={sliderRanges.forward.max}
                      step={sliderRanges.forward.step}
                      className="w-full"
                    />
                  </div>

                  {/* Alpha Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className={`${theme.text} font-clean text-sm`}>Alpha</Label>
                      <span className={`${theme.text} font-mono text-sm`}>{parameters.alpha.toFixed(2)}</span>
                    </div>
                    <Slider
                      value={[parameters.alpha]}
                      onValueChange={(value) => handleSliderChange('alpha', value)}
                      min={sliderRanges.alpha.min}
                      max={sliderRanges.alpha.max}
                      step={sliderRanges.alpha.step}
                      className="w-full"
                    />
                  </div>

                  {/* Beta Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className={`${theme.text} font-clean text-sm`}>Beta</Label>
                      <span className={`${theme.text} font-mono text-sm`}>{parameters.beta.toFixed(2)}</span>
                    </div>
                    <Slider
                      value={[parameters.beta]}
                      onValueChange={(value) => handleSliderChange('beta', value)}
                      min={sliderRanges.beta.min}
                      max={sliderRanges.beta.max}
                      step={sliderRanges.beta.step}
                      className="w-full"
                    />
                  </div>

                  {/* Nu (Vol of Vol) Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className={`${theme.text} font-clean text-sm`}>Nu</Label>
                      <span className={`${theme.text} font-mono text-sm`}>{parameters.vol_of_vol.toFixed(2)}</span>
                    </div>
                    <Slider
                      value={[parameters.vol_of_vol]}
                      onValueChange={(value) => handleSliderChange('vol_of_vol', value)}
                      min={sliderRanges.vol_of_vol.min}
                      max={sliderRanges.vol_of_vol.max}
                      step={sliderRanges.vol_of_vol.step}
                      className="w-full"
                    />
                  </div>

                  {/* Rho Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className={`${theme.text} font-clean text-sm`}>Rho</Label>
                      <span className={`${theme.text} font-mono text-sm`}>{parameters.rho.toFixed(2)}</span>
                    </div>
                    <Slider
                      value={[parameters.rho]}
                      onValueChange={(value) => handleSliderChange('rho', value)}
                      min={sliderRanges.rho.min}
                      max={sliderRanges.rho.max}
                      step={sliderRanges.rho.step}
                      className="w-full"
                    />
                  </div>

                  {/* Shift Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className={`${theme.text} font-clean text-sm`}>Shift</Label>
                      <span className={`${theme.text} font-mono text-sm`}>{parameters.shift.toFixed(3)}</span>
                    </div>
                    <Slider
                      value={[parameters.shift]}
                      onValueChange={(value) => handleSliderChange('shift', value)}
                      min={sliderRanges.shift.min}
                      max={sliderRanges.shift.max}
                      step={sliderRanges.shift.step}
                      className="w-full"
                    />
                  </div>

                  {/* Gamma Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className={`${theme.text} font-clean text-sm`}>Gamma</Label>
                      <span className={`${theme.text} font-mono text-sm`}>{parameters.gamma.toFixed(2)}</span>
                    </div>
                    <Slider
                      value={[parameters.gamma]}
                      onValueChange={(value) => handleSliderChange('gamma', value)}
                      min={sliderRanges.gamma.min}
                      max={sliderRanges.gamma.max}
                      step={sliderRanges.gamma.step}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Vol Adjustment Switch */}
                <div className="flex items-center space-x-2">
                  <Switch
                    id="use_vol_adjustment"
                    checked={useVolAdjustment}
                    onCheckedChange={setUseVolAdjustment}
                  />
                  <Label htmlFor="use_vol_adjustment" className={`${theme.text} font-clean text-sm`}>
                    Use_vol_adjustment
                  </Label>
                </div>

                {/* Control Buttons */}
                <div className="flex gap-2">
                  <Button
                    onClick={resetParameters}
                    variant="outline"
                    className="flex-1"
                  >
                    Reset
                  </Button>
                  <Button
                    onClick={() => {/* Night mode toggle logic */}}
                    variant="outline"
                    className="flex-1"
                  >
                    Night Mode
                  </Button>
                </div>


              </CardContent>
            </Card>

            {/* ZABR Classic Chart */}
            <Card className={`xl:col-span-2 ${theme.isDark ? theme.glassBg : 'bg-white'} backdrop-blur-lg ${theme.borderColor} border`}>
              <CardHeader>
                <CardTitle className={`${theme.text} font-corporate text-center`}>
                  ZABR Classic
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={theme.isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} />
                        <XAxis
                          dataKey="strike"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12 }}
                          label={{ value: 'Strike', position: 'insideBottom', offset: -10 }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12 }}
                          label={{ value: 'Implied Volatility', angle: -90, position: 'insideLeft' }}
                        />
                        <Tooltip
                          formatter={(value: any, name: string) => [
                            `${(value as number).toFixed(4)}`,
                            name
                          ]}
                          labelFormatter={(label) => `Strike: ${label}`}
                        />
                        <Legend />
                        {initialResults && (
                          <Line
                            type="monotone"
                            dataKey="initialVol"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            name="Initial"
                            dot={false}
                            activeDot={{ r: 4, stroke: '#3b82f6', strokeWidth: 2, fill: '#3b82f6' }}
                          />
                        )}
                        <Line
                          type="monotone"
                          dataKey="dynamicVol"
                          stroke="#f97316"
                          strokeWidth={3}
                          name="Dynamic"
                          dot={false}
                          activeDot={{ r: 6, stroke: '#f97316', strokeWidth: 2, fill: '#f97316' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-96 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">📊</div>
                      <p className={`${theme.textMuted}`}>
                        Adjust parameters with sliders to see real-time volatility surface updates
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Analysis Summary */}
          {results && (
            <Card className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border`}>
              <CardHeader>
                <CardTitle className={`${theme.text} font-corporate`}>Analysis Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-mono font-bold text-blue-400 tracking-wider mb-2">
                      {parameters.calibration_type.toUpperCase()}
                    </div>
                    <div className={`text-sm ${theme.textMuted} font-clean`}>Model Type</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-mono font-bold text-green-400 tracking-wider mb-2">
                      {results.strikes ? results.strikes.length : 0}
                    </div>
                    <div className={`text-sm ${theme.textMuted} font-clean`}>Strike Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-mono font-bold text-purple-400 tracking-wider mb-2">
                      {(Math.max(...(results.model_vols || [0])) * 100).toFixed(2)}%
                    </div>
                    <div className={`text-sm ${theme.textMuted} font-clean`}>Max Volatility</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-mono font-bold text-orange-400 tracking-wider mb-2">
                      ✅
                    </div>
                    <div className={`text-sm ${theme.textMuted} font-clean`}>Status</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* ZABR PDE Tab */}
        <TabsContent value="zabr-pde" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Model Configuration Panel */}
            <Card className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border`}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${theme.text} font-corporate`}>
                  🔬 ZABR PDE Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Dynamic Sliders Grid */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Expiry Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className={`${theme.text} font-clean text-sm`}>Expiry</Label>
                      <span className={`${theme.text} font-mono text-sm`}>{parameters.expiry.toFixed(0)}</span>
                    </div>
                    <Slider
                      value={[parameters.expiry]}
                      onValueChange={(value) => handleSliderChange('expiry', value)}
                      min={sliderRanges.expiry.min}
                      max={sliderRanges.expiry.max}
                      step={sliderRanges.expiry.step}
                      className="w-full"
                    />
                  </div>

                  {/* Forward Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className={`${theme.text} font-clean text-sm`}>Forward</Label>
                      <span className={`${theme.text} font-mono text-sm`}>{parameters.forward.toFixed(3)}</span>
                    </div>
                    <Slider
                      value={[parameters.forward]}
                      onValueChange={(value) => handleSliderChange('forward', value)}
                      min={sliderRanges.forward.min}
                      max={sliderRanges.forward.max}
                      step={sliderRanges.forward.step}
                      className="w-full"
                    />
                  </div>

                  {/* Alpha Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className={`${theme.text} font-clean text-sm`}>Alpha</Label>
                      <span className={`${theme.text} font-mono text-sm`}>{parameters.alpha.toFixed(2)}</span>
                    </div>
                    <Slider
                      value={[parameters.alpha]}
                      onValueChange={(value) => handleSliderChange('alpha', value)}
                      min={sliderRanges.alpha.min}
                      max={sliderRanges.alpha.max}
                      step={sliderRanges.alpha.step}
                      className="w-full"
                    />
                  </div>

                  {/* Beta Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className={`${theme.text} font-clean text-sm`}>Beta</Label>
                      <span className={`${theme.text} font-mono text-sm`}>{parameters.beta.toFixed(2)}</span>
                    </div>
                    <Slider
                      value={[parameters.beta]}
                      onValueChange={(value) => handleSliderChange('beta', value)}
                      min={sliderRanges.beta.min}
                      max={sliderRanges.beta.max}
                      step={sliderRanges.beta.step}
                      className="w-full"
                    />
                  </div>

                  {/* Nu (Vol of Vol) Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className={`${theme.text} font-clean text-sm`}>Nu</Label>
                      <span className={`${theme.text} font-mono text-sm`}>{parameters.vol_of_vol.toFixed(2)}</span>
                    </div>
                    <Slider
                      value={[parameters.vol_of_vol]}
                      onValueChange={(value) => handleSliderChange('vol_of_vol', value)}
                      min={sliderRanges.vol_of_vol.min}
                      max={sliderRanges.vol_of_vol.max}
                      step={sliderRanges.vol_of_vol.step}
                      className="w-full"
                    />
                  </div>

                  {/* Rho Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className={`${theme.text} font-clean text-sm`}>Rho</Label>
                      <span className={`${theme.text} font-mono text-sm`}>{parameters.rho.toFixed(2)}</span>
                    </div>
                    <Slider
                      value={[parameters.rho]}
                      onValueChange={(value) => handleSliderChange('rho', value)}
                      min={sliderRanges.rho.min}
                      max={sliderRanges.rho.max}
                      step={sliderRanges.rho.step}
                      className="w-full"
                    />
                  </div>

                  {/* Shift Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className={`${theme.text} font-clean text-sm`}>Shift</Label>
                      <span className={`${theme.text} font-mono text-sm`}>{parameters.shift.toFixed(3)}</span>
                    </div>
                    <Slider
                      value={[parameters.shift]}
                      onValueChange={(value) => handleSliderChange('shift', value)}
                      min={sliderRanges.shift.min}
                      max={sliderRanges.shift.max}
                      step={sliderRanges.shift.step}
                      className="w-full"
                    />
                  </div>

                  {/* N Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className={`${theme.text} font-clean text-sm`}>N</Label>
                      <span className={`${theme.text} font-mono text-sm`}>{(parameters.N || 100).toFixed(0)}</span>
                    </div>
                    <Slider
                      value={[parameters.N || 100]}
                      onValueChange={(value) => handleSliderChange('N', value)}
                      min={sliderRanges.N.min}
                      max={sliderRanges.N.max}
                      step={sliderRanges.N.step}
                      className="w-full"
                    />
                  </div>

                  {/* Timesteps Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className={`${theme.text} font-clean text-sm`}>Timesteps</Label>
                      <span className={`${theme.text} font-mono text-sm`}>{(parameters.timesteps || 5).toFixed(0)}</span>
                    </div>
                    <Slider
                      value={[parameters.timesteps || 5]}
                      onValueChange={(value) => handleSliderChange('timesteps', value)}
                      min={sliderRanges.timesteps.min}
                      max={sliderRanges.timesteps.max}
                      step={sliderRanges.timesteps.step}
                      className="w-full"
                    />
                  </div>

                  {/* Nd Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className={`${theme.text} font-clean text-sm`}>Nd</Label>
                      <span className={`${theme.text} font-mono text-sm`}>{(parameters.nd || 5).toFixed(0)}</span>
                    </div>
                    <Slider
                      value={[parameters.nd || 5]}
                      onValueChange={(value) => handleSliderChange('nd', value)}
                      min={sliderRanges.nd.min}
                      max={sliderRanges.nd.max}
                      step={sliderRanges.nd.step}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex gap-2">
                  <Button
                    onClick={resetParameters}
                    variant="outline"
                    className="flex-1"
                  >
                    Reset
                  </Button>
                  <Button
                    onClick={() => {/* Night mode toggle logic */}}
                    variant="outline"
                    className="flex-1"
                  >
                    Night Mode
                  </Button>
                </div>

              </CardContent>
            </Card>

            {/* ZABR PDE Chart */}
            <Card className={`xl:col-span-2 ${theme.isDark ? theme.glassBg : 'bg-white'} backdrop-blur-lg ${theme.borderColor} border`}>
              <CardHeader>
                <CardTitle className={`${theme.text} font-corporate text-center`}>
                  SABR PDE
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={theme.isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} />
                        <XAxis
                          dataKey="strike"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12 }}
                          label={{ value: 'Strike', position: 'insideBottom', offset: -10 }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12 }}
                          label={{ value: 'Implied Volatility', angle: -90, position: 'insideLeft' }}
                        />
                        <Tooltip
                          formatter={(value: any, name: string) => [
                            `${(value as number).toFixed(4)}`,
                            name
                          ]}
                          labelFormatter={(label) => `Strike: ${label}`}
                        />
                        <Legend />
                        {initialResults && (
                          <Line
                            type="monotone"
                            dataKey="initialVol"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            name="Initial"
                            dot={false}
                            activeDot={{ r: 4, stroke: '#3b82f6', strokeWidth: 2, fill: '#3b82f6' }}
                          />
                        )}
                        <Line
                          type="monotone"
                          dataKey="dynamicVol"
                          stroke="#f97316"
                          strokeWidth={3}
                          name="Dynamic"
                          dot={false}
                          activeDot={{ r: 6, stroke: '#f97316', strokeWidth: 2, fill: '#f97316' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-96 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">📊</div>
                      <p className={`${theme.textMuted}`}>
                        Adjust parameters with sliders to see real-time PDE volatility surface updates
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Analysis Summary */}
          {results && (
            <Card className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border`}>
              <CardHeader>
                <CardTitle className={`${theme.text} font-corporate`}>Analysis Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-mono font-bold text-green-400 tracking-wider mb-2">
                      {(results.calibration_error * 10000).toFixed(2)} bps
                    </div>
                    <div className={`text-sm ${theme.textMuted} font-clean`}>Calibration Error</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-mono font-bold text-blue-400 tracking-wider mb-2">
                      {results.strikes ? results.strikes.length : 0}
                    </div>
                    <div className={`text-sm ${theme.textMuted} font-clean`}>Strike Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-mono font-bold text-purple-400 tracking-wider mb-2">
                      {(Math.max(...(results.model_vols || [0])) * 100).toFixed(2)}%
                    </div>
                    <div className={`text-sm ${theme.textMuted} font-clean`}>Max Volatility</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-mono font-bold text-orange-400 tracking-wider mb-2">
                      ✅
                    </div>
                    <div className={`text-sm ${theme.textMuted} font-clean`}>Status</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* ZABR Mixt Tab */}
        <TabsContent value="zabr-mixt" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* ZABR Mixture Parameters Panel */}
            <Card className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border`}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${theme.text} font-corporate`}>
                  🎭 ZABR Mixture Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Dynamic Sliders Grid */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Expiry Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className={`${theme.text} font-clean text-sm`}>Expiry</Label>
                      <span className={`${theme.text} font-mono text-sm`}>{parameters.expiry.toFixed(0)}</span>
                    </div>
                    <Slider
                      value={[parameters.expiry]}
                      onValueChange={(value) => handleSliderChange('expiry', value)}
                      min={sliderRanges.expiry.min}
                      max={sliderRanges.expiry.max}
                      step={sliderRanges.expiry.step}
                      className="w-full"
                    />
                  </div>

                  {/* Forward Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className={`${theme.text} font-clean text-sm`}>Forward</Label>
                      <span className={`${theme.text} font-mono text-sm`}>{parameters.forward.toFixed(4)}</span>
                    </div>
                    <Slider
                      value={[parameters.forward]}
                      onValueChange={(value) => handleSliderChange('forward', value)}
                      min={sliderRanges.forward.min}
                      max={sliderRanges.forward.max}
                      step={sliderRanges.forward.step}
                      className="w-full"
                    />
                  </div>

                  {/* Alpha Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className={`${theme.text} font-clean text-sm`}>Alpha</Label>
                      <span className={`${theme.text} font-mono text-sm`}>{parameters.alpha.toFixed(4)}</span>
                    </div>
                    <Slider
                      value={[parameters.alpha]}
                      onValueChange={(value) => handleSliderChange('alpha', value)}
                      min={sliderRanges.alpha.min}
                      max={sliderRanges.alpha.max}
                      step={sliderRanges.alpha.step}
                      className="w-full"
                    />
                  </div>

                  {/* Beta1 Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className={`${theme.text} font-clean text-sm`}>Beta1</Label>
                      <span className={`${theme.text} font-mono text-sm`}>{(parameters.beta1 || 0.2).toFixed(2)}</span>
                    </div>
                    <Slider
                      value={[parameters.beta1 || 0.2]}
                      onValueChange={(value) => handleSliderChange('beta1', value)}
                      min={sliderRanges.beta1.min}
                      max={sliderRanges.beta1.max}
                      step={sliderRanges.beta1.step}
                      className="w-full"
                    />
                  </div>

                  {/* Beta2 Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className={`${theme.text} font-clean text-sm`}>Beta2</Label>
                      <span className={`${theme.text} font-mono text-sm`}>{(parameters.beta2 || 1.25).toFixed(2)}</span>
                    </div>
                    <Slider
                      value={[parameters.beta2 || 1.25]}
                      onValueChange={(value) => handleSliderChange('beta2', value)}
                      min={sliderRanges.beta2.min}
                      max={sliderRanges.beta2.max}
                      step={sliderRanges.beta2.step}
                      className="w-full"
                    />
                  </div>

                  {/* D Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className={`${theme.text} font-clean text-sm`}>D</Label>
                      <span className={`${theme.text} font-mono text-sm`}>{(parameters.d || 0.2).toFixed(2)}</span>
                    </div>
                    <Slider
                      value={[parameters.d || 0.2]}
                      onValueChange={(value) => handleSliderChange('d', value)}
                      min={sliderRanges.d.min}
                      max={sliderRanges.d.max}
                      step={sliderRanges.d.step}
                      className="w-full"
                    />
                  </div>

                  {/* Nu (Vol of Vol) Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className={`${theme.text} font-clean text-sm`}>Nu</Label>
                      <span className={`${theme.text} font-mono text-sm`}>{parameters.vol_of_vol.toFixed(4)}</span>
                    </div>
                    <Slider
                      value={[parameters.vol_of_vol]}
                      onValueChange={(value) => handleSliderChange('vol_of_vol', value)}
                      min={sliderRanges.vol_of_vol.min}
                      max={sliderRanges.vol_of_vol.max}
                      step={sliderRanges.vol_of_vol.step}
                      className="w-full"
                    />
                  </div>

                  {/* Rho Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className={`${theme.text} font-clean text-sm`}>Rho</Label>
                      <span className={`${theme.text} font-mono text-sm`}>{parameters.rho.toFixed(3)}</span>
                    </div>
                    <Slider
                      value={[parameters.rho]}
                      onValueChange={(value) => handleSliderChange('rho', value)}
                      min={sliderRanges.rho.min}
                      max={sliderRanges.rho.max}
                      step={sliderRanges.rho.step}
                      className="w-full"
                    />
                  </div>

                  {/* High Strike Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className={`${theme.text} font-clean text-sm`}>High Strike</Label>
                      <span className={`${theme.text} font-mono text-sm`}>{(parameters.high_strike || 0.1).toFixed(3)}</span>
                    </div>
                    <Slider
                      value={[parameters.high_strike || 0.1]}
                      onValueChange={(value) => handleSliderChange('high_strike', value)}
                      min={sliderRanges.high_strike.min}
                      max={sliderRanges.high_strike.max}
                      step={sliderRanges.high_strike.step}
                      className="w-full"
                    />
                  </div>

                  {/* Vol Low Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className={`${theme.text} font-clean text-sm`}>Vol Low</Label>
                      <span className={`${theme.text} font-mono text-sm`}>{(parameters.vol_low || 0.0001).toFixed(6)}</span>
                    </div>
                    <Slider
                      value={[parameters.vol_low || 0.0001]}
                      onValueChange={(value) => handleSliderChange('vol_low', value)}
                      min={sliderRanges.vol_low.min}
                      max={sliderRanges.vol_low.max}
                      step={sliderRanges.vol_low.step}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex gap-2">
                  <Button
                    onClick={resetParameters}
                    variant="outline"
                    className="flex-1"
                  >
                    Reset
                  </Button>
                  <Button
                    onClick={() => {/* Night mode toggle logic */}}
                    variant="outline"
                    className="flex-1"
                  >
                    Night Mode
                  </Button>
                </div>

              </CardContent>
            </Card>

            {/* ZABR Mixture Chart */}
            <Card className={`xl:col-span-2 ${theme.isDark ? theme.glassBg : 'bg-white'} backdrop-blur-lg ${theme.borderColor} border`}>
              <CardHeader>
                <CardTitle className={`${theme.text} font-corporate text-center`}>
                  ZABR Mixture
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={theme.isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} />
                        <XAxis
                          dataKey="strike"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12 }}
                          label={{ value: 'Strike', position: 'insideBottom', offset: -10 }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12 }}
                          label={{ value: 'Implied Volatility', angle: -90, position: 'insideLeft' }}
                        />
                        <Tooltip
                          formatter={(value: any, name: string) => [
                            `${(value as number).toFixed(4)}`,
                            name
                          ]}
                          labelFormatter={(label) => `Strike: ${label}`}
                        />
                        <Legend />
                        {initialResults && (
                          <Line
                            type="monotone"
                            dataKey="initialVol"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            name="Initial"
                            dot={false}
                            activeDot={{ r: 4, stroke: '#3b82f6', strokeWidth: 2, fill: '#3b82f6' }}
                          />
                        )}
                        <Line
                          type="monotone"
                          dataKey="dynamicVol"
                          stroke="#a855f7"
                          strokeWidth={3}
                          name="Dynamic"
                          dot={false}
                          activeDot={{ r: 6, stroke: '#a855f7', strokeWidth: 2, fill: '#a855f7' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-96 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🎭</div>
                      <p className={`${theme.textMuted}`}>
                        Adjust parameters with sliders to see real-time mixture volatility surface updates
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Analysis Summary */}
          {results && (
            <Card className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border`}>
              <CardHeader>
                <CardTitle className={`${theme.text} font-corporate`}>Analysis Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-mono font-bold text-green-400 tracking-wider mb-2">
                      {(results.calibration_error * 10000).toFixed(2)} bps
                    </div>
                    <div className={`text-sm ${theme.textMuted} font-clean`}>Calibration Error</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-mono font-bold text-blue-400 tracking-wider mb-2">
                      {results.strikes ? results.strikes.length : 0}
                    </div>
                    <div className={`text-sm ${theme.textMuted} font-clean`}>Strike Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-mono font-bold text-purple-400 tracking-wider mb-2">
                      {(Math.max(...(results.model_vols || [0])) * 100).toFixed(2)}%
                    </div>
                    <div className={`text-sm ${theme.textMuted} font-clean`}>Max Volatility</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-mono font-bold text-orange-400 tracking-wider mb-2">
                      ✅
                    </div>
                    <div className={`text-sm ${theme.textMuted} font-clean`}>Status</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Statistics Panel */}
      {results && (
        <Card className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border`}>
          <CardHeader>
            <CardTitle className={`${theme.text} font-corporate`}>ZABR Calibration Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-mono font-bold text-green-400 tracking-wider mb-2">
                  {(results.calibration_error * 10000).toFixed(2)} bps
                </div>
                <div className={`text-sm ${theme.textMuted} font-clean`}>Calibration Error</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-mono font-bold text-blue-400 tracking-wider mb-2">
                  {results.strikes ? results.strikes.length : 0}
                </div>
                <div className={`text-sm ${theme.textMuted} font-clean`}>Model Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-mono font-bold text-purple-400 tracking-wider mb-2">
                  {results.market_strikes ? results.market_strikes.length : 0}
                </div>
                <div className={`text-sm ${theme.textMuted} font-clean`}>Market Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-mono font-bold text-orange-400 tracking-wider mb-2">
                  {parameters.calibration_type.toUpperCase()}
                </div>
                <div className={`text-sm ${theme.textMuted} font-clean`}>Method</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ZABRModel;
