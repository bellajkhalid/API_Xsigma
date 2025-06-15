import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, Clock, Zap, TrendingUp, AlertCircle, CheckCircle, Settings, BarChart3 } from "lucide-react";

interface CalibrationParameters {
  computationType: string;
  n: number;
  spot: number;
  expiry: number;
  r: number;
  q: number;
  beta: number;
  rho: number;
  volvol: number;
  // Dynamic parameters
  fwd?: number;
  time?: number;
  ctrl_p?: number;
  ctrl_c?: number;
  atm?: number;
  skew?: number;
  smile?: number;
  put?: number;
  call?: number;
  // SVI parameters
  b?: number;
  m?: number;
  sigma?: number;
}

interface CalibrationResults {
  status: string;
  computationType: string;
  data: {
    calibration_strikes?: number[];
    bid_values?: number[];
    ask_values?: number[];
    mid_values?: number[];
    strikes: number[];
    vols?: number[];
    density?: number[];
  };
  performance: {
    execution_time_ms: number;
  };
  metadata: {
    execution_time_ms: number;
    timestamp: string;
    computation_type: string;
    cached: boolean;
    test_case: string;
  };
}

interface ApiMetrics {
  responseTime: number;
  cached: boolean;
}

// Computation type configurations
const COMPUTATION_TYPES = {
  volatility_asv: {
    name: 'ASV Volatility',
    description: 'Analytical Sigma Volatility model calibration with implied volatilities',
    icon: '📈',
    color: 'from-blue-500 to-blue-600',
    defaults: {
      n: 400,
      spot: 2245.0656,
      expiry: 1.0,
      r: 0.003,
      q: 0.0022,
      beta: 0.4158,
      rho: 0.2256,
      volvol: 0.2
    }
  },
  density: {
    name: 'Density Function',
    description: 'Computes probability density functions based on calibrated model',
    icon: '🌊',
    color: 'from-green-500 to-green-600',
    defaults: {
      n: 150,
      spot: 2000.0,
      expiry: 0.5,
      r: 0.02,
      q: 0.01,
      beta: 0.5,
      rho: -0.3,
      volvol: 0.3
    }
  },
  volatility_svi: {
    name: 'SVI Volatility',
    description: 'Stochastic Volatility Inspired model calibration',
    icon: '⚡',
    color: 'from-purple-500 to-purple-600',
    defaults: {
      n: 100,
      spot: 1800.0,
      expiry: 0.25,
      r: 0.015,
      q: 0.005,
      beta: 0.7,
      rho: 0.1,
      volvol: 0.4
    }
  },
  dynamic_asv: {
    name: 'Dynamic ASV',
    description: 'Interactive ASV model with real-time parameter sliders (like notebook)',
    icon: '🎛️',
    color: 'from-cyan-500 to-cyan-600',
    defaults: {
      n: 400,
      spot: 2273.684211,
      expiry: 1.0,
      r: 0.003,
      q: 0.0022,
      beta: 0.4158,
      rho: 0.2256,
      volvol: 0.2,
      fwd: 1.0,
      time: 0.333,
      ctrl_p: 0.2,
      ctrl_c: 0.2,
      atm: 0.1929,
      skew: 0.02268,
      smile: 0.00317,
      put: 0.00213,
      call: 0.00006
    }
  },
  dynamic_svi: {
    name: 'Dynamic SVI',
    description: 'Interactive SVI model with real-time parameter sliders (like notebook)',
    icon: '🎚️',
    color: 'from-orange-500 to-orange-600',
    defaults: {
      n: 400,
      spot: 2273.684211,
      expiry: 1.0,
      r: 0.003,
      q: 0.0022,
      beta: 0.4158,
      rho: 0.2256,
      volvol: 0.2,
      fwd: 1.0,
      time: 0.333,
      b: 0.1,
      m: 0.01,
      sigma: 0.4
    }
  }
};

interface AnalyticalSigmaVolatilityCalibrationProps {
  computationType?: string;
}

const AnalyticalSigmaVolatilityCalibration: React.FC<AnalyticalSigmaVolatilityCalibrationProps> = ({
  computationType: propComputationType
}) => {
  const { getThemeClasses } = useTheme();
  const theme = getThemeClasses();

  const [selectedComputationType, setSelectedComputationType] = useState<string>(
    propComputationType || 'dynamic_asv'
  );
  const [parameters, setParameters] = useState<CalibrationParameters>(
    {
      computationType: propComputationType || 'dynamic_asv',
      ...COMPUTATION_TYPES[propComputationType as keyof typeof COMPUTATION_TYPES]?.defaults || COMPUTATION_TYPES.dynamic_asv.defaults
    }
  );
  const [results, setResults] = useState<CalibrationResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiMetrics, setApiMetrics] = useState<ApiMetrics | null>(null);
  const [autoUpdateTimer, setAutoUpdateTimer] = useState<NodeJS.Timeout | null>(null);

  // Separate data states for the two charts
  const [volatilityData, setVolatilityData] = useState<any[]>([]);
  const [densityData, setDensityData] = useState<any[]>([]);

  // Initial values for comparison
  const initialValues = {
    fwd: 1.0,
    time: 0.333,
    ctrl_p: 0.2,
    ctrl_c: 0.2,
    atm: 0.1929,
    skew: 0.02268,
    smile: 0.00317,
    put: 0.00213,
    call: 0.00006
  };

  const currentComputationType = COMPUTATION_TYPES[selectedComputationType as keyof typeof COMPUTATION_TYPES];

  // Update parameters when computation type changes
  useEffect(() => {
    const computationType = propComputationType || selectedComputationType;
    const newDefaults = COMPUTATION_TYPES[computationType as keyof typeof COMPUTATION_TYPES].defaults;
    const newParams = {
      computationType: computationType,
      ...newDefaults
    };
    setParameters(newParams);
    setResults(null);
    setError(null);

    // Auto-calculate for dynamic types when they are first selected
    if (computationType === 'dynamic_asv' || computationType === 'dynamic_svi') {
      setTimeout(() => {
        calculateCalibrationWithParams(newParams);
      }, 100); // Small delay to ensure state is updated
    }
  }, [selectedComputationType, propComputationType]);

  const handleParameterChange = (key: string, value: string) => {
    const newParams = {
      ...parameters,
      [key]: key === 'computationType' ? value : parseFloat(value) || 0
    };
    setParameters(newParams);

    // Auto-update for dynamic types
    if (selectedComputationType === 'dynamic_asv' || selectedComputationType === 'dynamic_svi') {
      triggerAutoUpdate(newParams);
    }
  };

  // Debounced auto-update function
  const triggerAutoUpdate = useCallback((newParams: CalibrationParameters) => {
    // Clear existing timer
    if (autoUpdateTimer) {
      clearTimeout(autoUpdateTimer);
    }

    // Set new timer for auto-update (500ms delay)
    const timer = setTimeout(() => {
      calculateCalibrationWithParams(newParams);
    }, 500);

    setAutoUpdateTimer(timer);
  }, [autoUpdateTimer]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (autoUpdateTimer) {
        clearTimeout(autoUpdateTimer);
      }
    };
  }, [autoUpdateTimer]);

  // Generic calculation function that can use custom parameters
  const calculateCalibrationWithParams = async (customParams?: CalibrationParameters) => {
    console.log('🚀 Starting calibration calculation...');
    const paramsToUse = customParams || parameters;
    console.log('Parameters to use:', paramsToUse);
    setIsCalculating(true);
    setError(null);
    const startTime = Date.now();

    try {
      const response = await fetch('http://localhost:5005/api/AnalyticalSigmaVolatilityCalibration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paramsToUse),
      });

      const responseTime = Date.now() - startTime;

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      console.log('Calibration strikes:', data.data?.calibration_strikes);
      console.log('Bid values:', data.data?.bid_values);
      console.log('Ask values:', data.data?.ask_values);
      console.log('Mid values:', data.data?.mid_values);
      console.log('Strikes:', data.data?.strikes);
      console.log('Vols:', data.data?.vols);

      // Fix missing computationType for legacy endpoint
      if (!data.computationType && !data.metadata?.computationType && !data.data?.computationType) {
        // Default to volatility_asv for ASV Volatility computation type
        data.computationType = paramsToUse.computationType || 'volatility_asv';
        console.log('Added missing computationType:', data.computationType);
      }

      setResults(data);
      setApiMetrics({
        responseTime,
        cached: data.metadata?.cached || false
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsCalculating(false);
    }
  };

  // Test backend connection
  const testBackendConnection = async () => {
    console.log('🧪 Testing backend connection...');
    try {
      const response = await fetch('http://localhost:5005/health');
      const data = await response.json();
      console.log('✅ Backend health check:', data);
      return true;
    } catch (error) {
      console.error('❌ Backend connection failed:', error);
      return false;
    }
  };

  // Wrapper function for manual calculation (button click)
  const calculateCalibration = async () => {
    console.log('🔥🔥🔥 BUTTON CLICKED! 🔥🔥🔥');
    console.log('Current parameters:', parameters);

    // Test backend connection first
    const isBackendConnected = await testBackendConnection();
    if (!isBackendConnected) {
      setError('Backend connection failed. Please check if the backend server is running on port 5005.');
      return;
    }

    calculateCalibrationWithParams();
  };

  // Function to calculate volatility smile data for dynamic charts
  const calculateVolatilitySmile = useCallback((params: any) => {
    // Generate dynamic strike range based on current forward (like Backend_Xsigma)
    // Use 50% to 150% of forward price for optimal view
    const minStrike = Math.max(0.1, params.fwd * 0.5);
    const maxStrike = params.fwd * 1.5;
    const strikes = Array.from({length: 100}, (_, i) =>
      minStrike + i * (maxStrike - minStrike) / 99
    );

    // Calculate initial volatility (using initial values)
    const initialVol = strikes.map(strike => {
      const x = (strike - initialValues.fwd) / initialValues.fwd;
      return Math.max(0.1, initialValues.atm + initialValues.skew * x + initialValues.smile * x * x);
    });

    // Calculate current volatility (using current parameters)
    const currentVol = strikes.map(strike => {
      const x = (strike - params.fwd) / params.fwd;
      return Math.max(0.1, params.atm + params.skew * x + params.smile * x * x);
    });

    return strikes.map((strike, index) => ({
      strike,
      initialVol: initialVol[index],
      currentVol: currentVol[index]
    }));
  }, [initialValues.fwd, initialValues.atm, initialValues.skew, initialValues.smile]);

  // Function to calculate density data for dynamic charts
  const calculateDensity = useCallback((params: any) => {
    // Generate dynamic strike range based on current forward (like Backend_Xsigma)
    // Use 50% to 150% of forward price for optimal view
    const minStrike = Math.max(0.1, params.fwd * 0.5);
    const maxStrike = params.fwd * 1.5;
    const strikes = Array.from({length: 100}, (_, i) =>
      minStrike + i * (maxStrike - minStrike) / 99
    );

    // Calculate initial density (using initial values)
    const initialDensity = strikes.map(strike => {
      const x = (strike - initialValues.fwd) / initialValues.fwd;
      const vol = Math.max(0.1, initialValues.atm + initialValues.skew * x + initialValues.smile * x * x);
      // Improved density calculation to match notebook shape
      const normalizedStrike = (strike - initialValues.fwd) / (vol * Math.sqrt(initialValues.time || 0.333));
      return Math.exp(-0.5 * normalizedStrike * normalizedStrike) / (vol * Math.sqrt(2 * Math.PI * (initialValues.time || 0.333)));
    });

    // Calculate current density (using current parameters)
    const currentDensity = strikes.map(strike => {
      const x = (strike - params.fwd) / params.fwd;
      const vol = Math.max(0.1, params.atm + params.skew * x + params.smile * x * x);
      // Improved density calculation to match notebook shape
      const normalizedStrike = (strike - params.fwd) / (vol * Math.sqrt(params.time || 0.333));
      return Math.exp(-0.5 * normalizedStrike * normalizedStrike) / (vol * Math.sqrt(2 * Math.PI * (params.time || 0.333)));
    });

    return strikes.map((strike, index) => ({
      strike,
      initialDensity: initialDensity[index],
      currentDensity: currentDensity[index]
    }));
  }, [initialValues.fwd, initialValues.atm, initialValues.skew, initialValues.smile, initialValues.time]);

  // Calculate dynamic domains for axes based on current data
  const getVolatilityDomain = useCallback(() => {
    if (!volatilityData || volatilityData.length === 0) return { xDomain: [0, 2], yDomain: [0, 1] };

    const strikes = volatilityData.map(d => d.strike);
    const vols = volatilityData.flatMap(d => [d.initialVol, d.currentVol]).filter(v => v != null);

    const xMin = Math.min(...strikes);
    const xMax = Math.max(...strikes);
    const yMin = Math.max(0, Math.min(...vols) * 0.9); // Add 10% padding
    const yMax = Math.max(...vols) * 1.1; // Add 10% padding

    return {
      xDomain: [xMin, xMax],
      yDomain: [yMin, yMax]
    };
  }, [volatilityData]);

  const getDensityDomain = useCallback(() => {
    if (!densityData || densityData.length === 0) return { xDomain: [0, 2], yDomain: [0, 1] };

    const strikes = densityData.map(d => d.strike);
    const densities = densityData.flatMap(d => [d.initialDensity, d.currentDensity]).filter(v => v != null);

    const xMin = Math.min(...strikes);
    const xMax = Math.max(...strikes);
    const yMin = Math.max(0, Math.min(...densities) * 0.9); // Add 10% padding
    const yMax = Math.max(...densities) * 1.1; // Add 10% padding

    return {
      xDomain: [xMin, xMax],
      yDomain: [yMin, yMax]
    };
  }, [densityData]);

  // Update chart data when parameters change
  useEffect(() => {
    if (selectedComputationType === 'dynamic_asv' || selectedComputationType === 'dynamic_svi') {
      const volData = calculateVolatilitySmile(parameters);
      const denData = calculateDensity(parameters);
      setVolatilityData(volData);
      setDensityData(denData);
    }
  }, [parameters, selectedComputationType, calculateVolatilitySmile, calculateDensity]);

  // Prepare chart data to match the original notebook exactly
  const chartData = useMemo(() => {
    if (!results) {
      // Demo data that matches the original notebook's volatility smile shape
      const demoStrikes = Array.from({length: 100}, (_, i) => 1800 + i * 10);
      const demoVols = demoStrikes.map(strike => {
        // Create the exact smile shape from the notebook image
        const x = (strike - 2200) / 400; // Normalize around center
        return 0.4 + 0.6 * x * x; // U-shaped curve like in the images
      });

      return demoStrikes.map((strike, index) => ({
        strike,
        vols: demoVols[index]
      }));
    }

    // Get computation type from metadata or data
    const computationType = results.metadata?.computationType || results.computationType || results.data?.computationType;
    console.log('Detected computation type:', computationType);

    // For volatility_asv and volatility_svi types, show calibration with market data points
    if (computationType === 'volatility_asv' || computationType === 'volatility_svi') {
      console.log('Processing calibration data:', results.data);
      console.log('Results object:', results);

      // Create a map to combine calibrated volatilities with market data points
      const dataMap = new Map();

      // Add calibrated volatility curve data
      if (results.data.strikes && results.data.vols) {
        results.data.strikes.forEach((strike, index) => {
          dataMap.set(strike, {
            strike,
            calibratedVol: results.data.vols[index],
            mid: null,
            bid: null,
            ask: null
          });
        });
      }

      // Add market data points (Mid, Bid, Ask) - merge with existing strikes or add new ones
      if (results.data.calibration_strikes) {
        results.data.calibration_strikes.forEach((strike, index) => {
          const existing = dataMap.get(strike) || { strike, calibratedVol: null, mid: null, bid: null, ask: null };
          existing.mid = results.data.mid_values?.[index] || null;
          existing.bid = results.data.bid_values?.[index] || null;
          existing.ask = results.data.ask_values?.[index] || null;
          dataMap.set(strike, existing);
        });
      }

      // Convert map to array and sort by strike
      const chartPoints = Array.from(dataMap.values()).sort((a, b) => a.strike - b.strike);
      console.log('Final chart points:', chartPoints);
      console.log('Chart points length:', chartPoints.length);
      console.log('Sample chart point:', chartPoints[0]);
      return chartPoints;
    }

    // For density type, show density curve
    if (computationType === 'density') {
      return results.data.strikes?.map((strike, index) => ({
        strike,
        density: results.data.density?.[index] || 0
      })) || [];
    }

    // For dynamic types, handled separately in the dynamic charts section
    return [];
  }, [results]);

  const computationType = results?.metadata?.computationType || results?.computationType || results?.data?.computationType;

  const chartConfig = {
    primaryLabel: computationType === 'density' ? 'Density' : 'Implied Volatility',
    secondaryLabel: 'Market Data',
    primaryColor: '#00ff88', // Green for calibrated volatility line (SVI style)
    secondaryColor: '#ffa502',
    yAxisFormatter: (value: number) => computationType === 'density' ? value.toFixed(4) : value.toFixed(2),
    tooltipFormatter: (value: number) => computationType === 'density' ? value.toFixed(6) : value.toFixed(4)
  };

  return (
    <div className="space-y-6 p-6">
      {/* About and Key Features Section - Only show for main ASV Calibration page */}
      {!propComputationType && (
        <Card className={`${theme.isDark ? theme.glassBg : 'bg-white'} backdrop-blur-lg ${theme.borderColor} border`}>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className={`text-xl font-corporate font-semibold mb-4 flex items-center gap-2 ${theme.text}`}>
                  📚 About ASV Calibration
                </h3>
                <div className={`${theme.textMuted} space-y-3 text-sm leading-relaxed font-clean`}>
                  <p>
                    Our <strong className="text-cyan-400 font-mono">ASV Calibration</strong> provides comprehensive
                    volatility model calibration for analytical sigma volatility models using advanced mathematical frameworks
                    including dynamic parameter adjustment and real-time visualization.
                  </p>
                  <p>
                    The implementation supports <strong className="text-blue-400 font-code">multiple calibration methods</strong>:
                    ASV Volatility, Density Functions, SVI Volatility, and Dynamic Interactive Models for robust
                    <strong className="text-green-400 font-mono"> real-time calibration</strong>.
                  </p>
                </div>
              </div>
              <div>
                <h3 className={`text-xl font-corporate font-semibold mb-4 flex items-center gap-2 ${theme.text}`}>
                  🎯 Key Features
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className={`p-3 rounded-lg ${theme.isDark ? theme.glassBg : 'bg-gray-50'} ${theme.borderColor} border`}>
                    <div className="text-blue-400 font-mono font-medium text-sm">ATM Interpolation</div>
                    <div className={`${theme.textMuted} text-xs font-clean`}>Mean-reverting curves</div>
                  </div>
                  <div className={`p-3 rounded-lg ${theme.isDark ? theme.glassBg : 'bg-gray-50'} ${theme.borderColor} border`}>
                    <div className="text-green-400 font-mono font-medium text-sm">5 Model Types</div>
                    <div className={`${theme.textMuted} text-xs font-clean`}>Comprehensive comparison</div>
                  </div>
                  <div className={`p-3 rounded-lg ${theme.isDark ? theme.glassBg : 'bg-gray-50'} ${theme.borderColor} border`}>
                    <div className="text-purple-400 font-mono font-medium text-sm">Market Data</div>
                    <div className={`${theme.textMuted} text-xs font-clean`}>Real market calibration</div>
                  </div>
                  <div className={`p-3 rounded-lg ${theme.isDark ? theme.glassBg : 'bg-gray-50'} ${theme.borderColor} border`}>
                    <div className="text-orange-400 font-mono font-medium text-sm">Extended SVI</div>
                    <div className={`${theme.textMuted} text-xs font-clean`}>Advanced parameterization</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className={`grid grid-cols-1 ${propComputationType ? 'xl:grid-cols-3' : 'xl:grid-cols-4'} gap-6`}>
        {/* Computation Type Selector - Only show for main ASV Calibration page */}
        {!propComputationType && (
          <Card className={`${theme.isDark ? theme.glassBg : 'bg-white'} backdrop-blur-lg ${theme.borderColor} border`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${theme.text} font-corporate`}>
                <Settings className="w-5 h-5" />
                Computation Type
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {Object.entries(COMPUTATION_TYPES).map(([key, config]) => (
                  <motion.div
                    key={key}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedComputationType === key
                        ? `bg-gradient-to-r ${config.color} text-white`
                        : `${theme.isDark ? theme.glassBg : 'bg-gray-50'} ${theme.borderColor} border hover:border-opacity-50`
                    }`}
                    onClick={() => setSelectedComputationType(key)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-xl">{config.icon}</div>
                      <div className="flex-1">
                        <div className={`font-medium text-sm ${selectedComputationType === key ? 'text-white' : theme.text}`}>
                          {config.name}
                        </div>
                        <div className={`text-xs ${selectedComputationType === key ? 'text-white/80' : theme.textMuted}`}>
                          {key}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className={`p-3 rounded-lg ${theme.isDark ? theme.glassBg : 'bg-gray-50'} ${theme.borderColor} border`}>
                <div className={`text-sm font-medium mb-2 ${theme.text}`}>{currentComputationType.name}</div>
                <div className={`text-xs ${theme.textMuted} leading-relaxed`}>
                  {currentComputationType.description}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Parameters Panel */}
        <Card className={`xl:col-span-2 ${theme.isDark ? theme.glassBg : 'bg-white'} backdrop-blur-lg ${theme.borderColor} border`}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${theme.text} font-corporate`}>
              ⚙️ Calibration Parameters
              <Badge variant="outline" className={`bg-gradient-to-r ${currentComputationType.color} text-white border-none`}>
                {currentComputationType.name}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Only show basic input parameters for non-dynamic types */}
            {selectedComputationType !== 'dynamic_asv' && selectedComputationType !== 'dynamic_svi' && (
              <div className="grid grid-cols-4 lg:grid-cols-8 gap-3">
              <div>
                <Label htmlFor="n" className={`${theme.text} font-clean text-xs`}>Data Points (n)</Label>
                <Input
                  id="n"
                  type="number"
                  min="10"
                  max="2000"
                  value={parameters.n}
                  onChange={(e) => handleParameterChange('n', e.target.value)}
                  className={`${theme.isDark ? theme.glassBg : 'bg-white'} ${theme.borderColor} h-8 text-sm`}
                />
              </div>
              <div>
                <Label htmlFor="spot" className={`${theme.text} font-clean text-xs`}>Spot Price</Label>
                <Input
                  id="spot"
                  type="number"
                  step="0.001"
                  value={parameters.spot}
                  onChange={(e) => handleParameterChange('spot', e.target.value)}
                  className={`${theme.isDark ? theme.glassBg : 'bg-white'} ${theme.borderColor} h-8 text-sm`}
                />
              </div>
              <div>
                <Label htmlFor="expiry" className={`${theme.text} font-clean text-xs`}>Expiry</Label>
                <Input
                  id="expiry"
                  type="number"
                  step="0.001"
                  value={parameters.expiry}
                  onChange={(e) => handleParameterChange('expiry', e.target.value)}
                  className={`${theme.isDark ? theme.glassBg : 'bg-white'} ${theme.borderColor} h-8 text-sm`}
                />
              </div>
              <div>
                <Label htmlFor="r" className={`${theme.text} font-clean text-xs`}>Risk-free Rate</Label>
                <Input
                  id="r"
                  type="number"
                  step="0.001"
                  value={parameters.r}
                  onChange={(e) => handleParameterChange('r', e.target.value)}
                  className={`${theme.isDark ? theme.glassBg : 'bg-white'} ${theme.borderColor} h-8 text-sm`}
                />
              </div>
              <div>
                <Label htmlFor="q" className={`${theme.text} font-clean text-xs`}>Dividend Yield</Label>
                <Input
                  id="q"
                  type="number"
                  step="0.001"
                  value={parameters.q}
                  onChange={(e) => handleParameterChange('q', e.target.value)}
                  className={`${theme.isDark ? theme.glassBg : 'bg-white'} ${theme.borderColor} h-8 text-sm`}
                />
              </div>
              <div>
                <Label htmlFor="beta" className={`${theme.text} font-clean text-xs`}>Beta</Label>
                <Input
                  id="beta"
                  type="number"
                  step="0.001"
                  min="0"
                  max="1"
                  value={parameters.beta}
                  onChange={(e) => handleParameterChange('beta', e.target.value)}
                  className={`${theme.isDark ? theme.glassBg : 'bg-white'} ${theme.borderColor} h-8 text-sm`}
                />
              </div>
              <div>
                <Label htmlFor="rho" className={`${theme.text} font-clean text-xs`}>Rho</Label>
                <Input
                  id="rho"
                  type="number"
                  step="0.001"
                  min="-1"
                  max="1"
                  value={parameters.rho}
                  onChange={(e) => handleParameterChange('rho', e.target.value)}
                  className={`${theme.isDark ? theme.glassBg : 'bg-white'} ${theme.borderColor} h-8 text-sm`}
                />
              </div>
              <div>
                <Label htmlFor="volvol" className={`${theme.text} font-clean text-xs`}>Vol of Vol</Label>
                <Input
                  id="volvol"
                  type="number"
                  step="0.001"
                  value={parameters.volvol}
                  onChange={(e) => handleParameterChange('volvol', e.target.value)}
                  className={`${theme.isDark ? theme.glassBg : 'bg-white'} ${theme.borderColor} h-8 text-sm`}
                />
              </div>
            </div>
            )}

            {/* Dynamic Parameters Section for Interactive Models */}
            {(selectedComputationType === 'dynamic_asv' || selectedComputationType === 'dynamic_svi') && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-4 rounded-lg ${theme.isDark ? theme.glassBg : 'bg-gray-50'} ${theme.borderColor} border`}
              >
                <div className={`text-sm font-medium mb-4 ${theme.text} flex items-center gap-2`}>
                  🎛️ Interactive Parameters (Sliders)
                  <Badge variant="outline" className="text-xs">
                    {selectedComputationType === 'dynamic_asv' ? 'ASV Model' : 'SVI Model'}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedComputationType === 'dynamic_asv' && (
                    <>
                      {/* ASV Dynamic Parameters */}
                      <div className="space-y-3">
                        <Label className={`text-xs font-medium ${theme.text}`}>
                          Fwd: {parameters.fwd?.toFixed(3) || '1.000'}
                        </Label>
                        <Slider
                          value={[parameters.fwd || 1.0]}
                          onValueChange={(value) => handleParameterChange('fwd', value[0].toString())}
                          min={0.25}
                          max={5.0}
                          step={0.01}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className={`text-xs font-medium ${theme.text}`}>
                          Time: {parameters.time?.toFixed(3) || '0.333'}
                        </Label>
                        <Slider
                          value={[parameters.time || 0.333]}
                          onValueChange={(value) => handleParameterChange('time', value[0].toString())}
                          min={0.1}
                          max={10.0}
                          step={0.001}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className={`text-xs font-medium ${theme.text}`}>
                          Ctrl_p: {parameters.ctrl_p?.toFixed(3) || '0.200'}
                        </Label>
                        <Slider
                          value={[parameters.ctrl_p || 0.2]}
                          onValueChange={(value) => handleParameterChange('ctrl_p', value[0].toString())}
                          min={0.05}
                          max={1.0}
                          step={0.01}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className={`text-xs font-medium ${theme.text}`}>
                          Ctrl_c: {parameters.ctrl_c?.toFixed(3) || '0.200'}
                        </Label>
                        <Slider
                          value={[parameters.ctrl_c || 0.2]}
                          onValueChange={(value) => handleParameterChange('ctrl_c', value[0].toString())}
                          min={0.05}
                          max={1.0}
                          step={0.01}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className={`text-xs font-medium ${theme.text}`}>
                          Atm: {parameters.atm?.toFixed(4) || '0.1929'}
                        </Label>
                        <Slider
                          value={[parameters.atm || 0.1929]}
                          onValueChange={(value) => handleParameterChange('atm', value[0].toString())}
                          min={0.0001}
                          max={1.0}
                          step={0.0001}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className={`text-xs font-medium ${theme.text}`}>
                          Skew: {parameters.skew?.toFixed(5) || '0.02268'}
                        </Label>
                        <Slider
                          value={[parameters.skew || 0.02268]}
                          onValueChange={(value) => handleParameterChange('skew', value[0].toString())}
                          min={-0.95}
                          max={0.95}
                          step={0.00001}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className={`text-xs font-medium ${theme.text}`}>
                          Smile: {parameters.smile?.toFixed(5) || '0.00317'}
                        </Label>
                        <Slider
                          value={[parameters.smile || 0.00317]}
                          onValueChange={(value) => handleParameterChange('smile', value[0].toString())}
                          min={-2.0}
                          max={2.0}
                          step={0.00001}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className={`text-xs font-medium ${theme.text}`}>
                          Put: {parameters.put?.toFixed(5) || '0.00213'}
                        </Label>
                        <Slider
                          value={[parameters.put || 0.00213]}
                          onValueChange={(value) => handleParameterChange('put', value[0].toString())}
                          min={-2.0}
                          max={2.0}
                          step={0.00001}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className={`text-xs font-medium ${theme.text}`}>
                          Call: {parameters.call?.toFixed(5) || '0.00006'}
                        </Label>
                        <Slider
                          value={[parameters.call || 0.00006]}
                          onValueChange={(value) => handleParameterChange('call', value[0].toString())}
                          min={-2.0}
                          max={2.0}
                          step={0.00001}
                          className="w-full"
                        />
                      </div>
                    </>
                  )}

                  {selectedComputationType === 'dynamic_svi' && (
                    <>
                      {/* SVI Dynamic Parameters */}
                      <div className="space-y-3">
                        <Label className={`text-xs font-medium ${theme.text}`}>
                          Fwd: {parameters.fwd?.toFixed(3) || '1.000'}
                        </Label>
                        <Slider
                          value={[parameters.fwd || 1.0]}
                          onValueChange={(value) => handleParameterChange('fwd', value[0].toString())}
                          min={0.25}
                          max={2.5}
                          step={0.01}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className={`text-xs font-medium ${theme.text}`}>
                          Time: {parameters.time?.toFixed(3) || '0.333'}
                        </Label>
                        <Slider
                          value={[parameters.time || 0.333]}
                          onValueChange={(value) => handleParameterChange('time', value[0].toString())}
                          min={0.1}
                          max={10.0}
                          step={0.001}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className={`text-xs font-medium ${theme.text}`}>
                          b: {parameters.b?.toFixed(3) || '0.100'}
                        </Label>
                        <Slider
                          value={[parameters.b || 0.1]}
                          onValueChange={(value) => handleParameterChange('b', value[0].toString())}
                          min={0.01}
                          max={1.0}
                          step={0.01}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className={`text-xs font-medium ${theme.text}`}>
                          m: {parameters.m?.toFixed(3) || '0.010'}
                        </Label>
                        <Slider
                          value={[parameters.m || 0.01]}
                          onValueChange={(value) => handleParameterChange('m', value[0].toString())}
                          min={-5.0}
                          max={5.0}
                          step={0.001}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className={`text-xs font-medium ${theme.text}`}>
                          sigma: {parameters.sigma?.toFixed(3) || '0.400'}
                        </Label>
                        <Slider
                          value={[parameters.sigma || 0.4]}
                          onValueChange={(value) => handleParameterChange('sigma', value[0].toString())}
                          min={-1.0}
                          max={1.0}
                          step={0.01}
                          className="w-full"
                        />
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-blue-400">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ℹ️
                    </motion.div>
                    <span>Adjust sliders to see real-time graph updates. Charts update automatically after 500ms delay.</span>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const resetParams = {
                        computationType: selectedComputationType,
                        ...COMPUTATION_TYPES[selectedComputationType as keyof typeof COMPUTATION_TYPES].defaults
                      };
                      setParameters(resetParams);
                      triggerAutoUpdate(resetParams);
                    }}
                    className={`text-xs ${theme.borderColor} hover:bg-blue-500/10`}
                  >
                    🔄 Reset to Initial Values
                  </Button>
                </div>
              </motion.div>
            )}



            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={calculateCalibration}
                disabled={isCalculating}
                className={`w-full bg-gradient-to-r ${currentComputationType.color} transition-all duration-300 hover:shadow-lg`}
              >
                {isCalculating ? (
                  <>
                    <motion.div
                      className="rounded-full h-4 w-4 border-b-2 border-white mr-2"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    ></motion.div>
                    Calibrating {currentComputationType.name}...
                  </>
                ) : (
                  <>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Zap className="w-4 h-4 mr-2" />
                    </motion.div>
                    Calibrate {currentComputationType.name}
                  </>
                )}
              </Button>
            </motion.div>

            {error && (
              <Alert className="border-red-500/30 bg-red-500/20">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-red-400">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {apiMetrics && (
              <div className={`p-3 rounded-lg ${theme.isDark ? theme.glassBg : 'bg-gray-50'} ${theme.borderColor} border`}>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium text-green-400">Calibration Successful</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-blue-400" />
                    <span className={theme.textMuted}>Response: {apiMetrics.responseTime}ms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="w-3 h-3 text-purple-400" />
                    <span className={theme.textMuted}>Cached: {apiMetrics.cached ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

      </div>

      {/* Chart for non-dynamic types */}
      {selectedComputationType !== 'dynamic_asv' && selectedComputationType !== 'dynamic_svi' && (
        <Card className={`${theme.isDark ? theme.glassBg : 'bg-white'} backdrop-blur-lg ${theme.borderColor} border mb-6`}>
          <CardHeader>
            <CardTitle className={`flex items-center justify-between ${theme.text} font-corporate`}>
              <span>📈 {currentComputationType.name} Visualization</span>
              {results && (
                <Badge variant="outline" className={`${theme.text} ${theme.borderColor}`}>
                  {results.computationType}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {console.log('Chart data length:', chartData.length, 'Results:', !!results)}
            {chartData.length > 0 ? (
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} />
                    <XAxis
                      dataKey="strike"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: theme.isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)', fontSize: 12 }}
                      tickFormatter={(value) => value.toFixed(0)}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: theme.isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)', fontSize: 12 }}
                      tickFormatter={(value) => value.toFixed(2)}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: theme.isDark ? '#1f2937' : '#ffffff',
                        border: `1px solid ${theme.isDark ? '#374151' : '#e5e7eb'}`,
                        borderRadius: '8px',
                        color: theme.isDark ? '#f9fafb' : '#111827'
                      }}
                      formatter={(value: any, name: string) => {
                        if (value === null || value === undefined) return ['N/A', name];
                        return [value.toFixed(4), name];
                      }}
                      labelFormatter={(label) => `Strike: ${label}`}
                    />
                    <Legend />

                    {/* For volatility calibration charts - show market data points and calibrated line */}
                    {(computationType === 'volatility_asv' || computationType === 'volatility_svi') && (
                      <>
                        {/* Calibrated Volatility Line */}
                        <Line
                          type="monotone"
                          dataKey="calibratedVol"
                          stroke="#00ff88"
                          strokeWidth={3}
                          name="Calibrated Vol"
                          dot={{ fill: '#00ff88', strokeWidth: 2, r: 4 }}
                          activeDot={{ r: 6, stroke: '#00ff88', strokeWidth: 2, fill: '#00ff88' }}
                          connectNulls={false}
                        />

                        {/* Mid Values */}
                        <Line
                          type="monotone"
                          dataKey="mid"
                          stroke="#3b82f6"
                          strokeWidth={0}
                          dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                          line={false}
                          name="Mid"
                        />

                        {/* Bid Values */}
                        <Line
                          type="monotone"
                          dataKey="bid"
                          stroke="#10b981"
                          strokeWidth={0}
                          dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                          line={false}
                          name="Bid"
                        />

                        {/* Ask Values */}
                        <Line
                          type="monotone"
                          dataKey="ask"
                          stroke="#ef4444"
                          strokeWidth={0}
                          dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                          line={false}
                          name="Ask"
                        />
                      </>
                    )}

                    {/* For density charts */}
                    {results?.computationType === 'density' && (
                      <Line
                        type="monotone"
                        dataKey="density"
                        stroke="#00ff88"
                        strokeWidth={3}
                        name="Density"
                        dot={{ fill: '#00ff88', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: '#00ff88', strokeWidth: 2, fill: '#00ff88' }}
                        connectNulls={false}
                      />
                    )}

                    {/* For demo data */}
                    {!results && (
                      <Line
                        type="monotone"
                        dataKey="vols"
                        stroke="#00ff88"
                        strokeWidth={3}
                        name="Demo Volatility"
                        dot={{ fill: '#00ff88', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: '#00ff88', strokeWidth: 2, fill: '#00ff88' }}
                        connectNulls={false}
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <motion.div
                className="h-96 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center">
                  <motion.div
                    className="text-6xl mb-4"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {currentComputationType.icon}
                  </motion.div>
                  <motion.p
                    className={`${theme.textMuted} mb-4`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Configure parameters and click "Calibrate {currentComputationType.name}" to see results
                  </motion.p>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Two Charts Side by Side - only for dynamic types */}
      {(selectedComputationType === 'dynamic_asv' || selectedComputationType === 'dynamic_svi') && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Volatility Smile Chart */}
          <Card className={`${theme.isDark ? theme.glassBg : 'bg-white'} backdrop-blur-lg ${theme.borderColor} border`}>
            <CardHeader>
              <CardTitle className={`${theme.text} font-corporate`}>📈 Volatility Smile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={volatilityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} />
                    <XAxis
                      dataKey="strike"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: theme.isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)', fontSize: 12 }}
                      tickFormatter={(value) => value.toFixed(1)}
                      domain={getVolatilityDomain().xDomain}
                      type="number"
                      scale="linear"
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: theme.isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)', fontSize: 12 }}
                      tickFormatter={(value) => value.toFixed(2)}
                      domain={getVolatilityDomain().yDomain}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: theme.isDark ? '#1f2937' : '#ffffff',
                        border: `1px solid ${theme.isDark ? '#374151' : '#e5e7eb'}`,
                        borderRadius: '8px',
                        color: theme.isDark ? '#f9fafb' : '#111827',
                        fontSize: '12px'
                      }}
                      formatter={(value: any, name: string) => [
                        value?.toFixed(4) || 'N/A',
                        name === 'initialVol' ? 'Initial Volatility' : 'Current Volatility'
                      ]}
                      labelFormatter={(label) => `Strike: ${Number(label).toFixed(2)}`}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: '12px' }}
                    />

                    {/* Initial Volatility (Orange - dashed) */}
                    <Line
                      type="monotone"
                      dataKey="initialVol"
                      stroke="#f97316"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={false}
                      name="Initial Volatility"
                    />

                    {/* Current Volatility (Green - solid, SVI style) */}
                    <Line
                      type="monotone"
                      dataKey="currentVol"
                      stroke="#00ff88"
                      strokeWidth={3}
                      name="Current Volatility"
                      dot={{ fill: '#00ff88', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#00ff88', strokeWidth: 2, fill: '#00ff88' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Density Chart */}
          <Card className={`${theme.isDark ? theme.glassBg : 'bg-white'} backdrop-blur-lg ${theme.borderColor} border`}>
            <CardHeader>
              <CardTitle className={`${theme.text} font-corporate`}>📊 Density in terms of Strike</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={densityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} />
                    <XAxis
                      dataKey="strike"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: theme.isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)', fontSize: 12 }}
                      tickFormatter={(value) => value.toFixed(1)}
                      domain={getDensityDomain().xDomain}
                      type="number"
                      scale="linear"
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: theme.isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)', fontSize: 12 }}
                      tickFormatter={(value) => value.toFixed(2)}
                      domain={getDensityDomain().yDomain}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: theme.isDark ? '#1f2937' : '#ffffff',
                        border: `1px solid ${theme.isDark ? '#374151' : '#e5e7eb'}`,
                        borderRadius: '8px',
                        color: theme.isDark ? '#f9fafb' : '#111827',
                        fontSize: '12px'
                      }}
                      formatter={(value: any, name: string) => [
                        value?.toFixed(4) || 'N/A',
                        name === 'initialDensity' ? 'Initial Density' : 'Current Density'
                      ]}
                      labelFormatter={(label) => `Strike: ${Number(label).toFixed(2)}`}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: '12px' }}
                    />

                    {/* Initial Density (Orange - dashed) */}
                    <Line
                      type="monotone"
                      dataKey="initialDensity"
                      stroke="#f97316"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={false}
                      name="Initial Density"
                    />

                    {/* Current Density (Green - solid, SVI style) */}
                    <Line
                      type="monotone"
                      dataKey="currentDensity"
                      stroke="#00ff88"
                      strokeWidth={3}
                      name="Current Density"
                      dot={{ fill: '#00ff88', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#00ff88', strokeWidth: 2, fill: '#00ff88' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AnalyticalSigmaVolatilityCalibration;
