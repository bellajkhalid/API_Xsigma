import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, ComposedChart, Bar } from 'recharts';
import { Activity, Clock, Zap, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";

interface ASVParameters {
  n: number;
  fwd: number;
  time: number;
  ctrl_p: number;
  ctrl_c: number;
  atm: number;
  skew: number;
  smile: number;
  put: number;
  call: number;
  test: number;
}

interface TestCaseConfig {
  id: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  defaults: Omit<ASVParameters, 'test'>;
  expectedFields: string[];
}

const TEST_CASES: TestCaseConfig[] = [
  {
    id: 1,
    name: 'Volatility Surface',
    description: 'Basic volatility surface calculation with large forward scenario',
    icon: '📊',
    color: 'from-blue-500 to-blue-600',
    defaults: {
      n: 200, fwd: 2245.0656707892695, time: 1.0, ctrl_p: 0.2, ctrl_c: 0.2,
      atm: 1.1, skew: 3.5, smile: 17, put: 0.7, call: 0.06
    },
    expectedFields: ['strikes', 'Tab_1', 'Tab_2']
  },
  {
    id: 2,
    name: 'Sensitivity Analysis',
    description: 'Volatility sensitivity with ctrl_c variations (0.2 vs 4.0)',
    icon: '📈',
    color: 'from-green-500 to-green-600',
    defaults: {
      n: 200, fwd: 1.0, time: 0.333, ctrl_p: 0.2, ctrl_c: 0.2,
      atm: 0.1929, skew: 0.02268, smile: 0.00317, put: -0.00213, call: -0.00006
    },
    expectedFields: ['strikes', 'Tab_1', 'Tab_2']
  },
  {
    id: 3,
    name: 'Density Analysis',
    description: 'Probability density calculation with analytical and bump methods',
    icon: '🌊',
    color: 'from-purple-500 to-purple-600',
    defaults: {
      n: 200, fwd: 1.0, time: 0.333, ctrl_p: 0.2, ctrl_c: 0.2,
      atm: 0.1929, skew: 0.02268, smile: 0.00317, put: -0.00213, call: -0.00006
    },
    expectedFields: ['strikes', 'Tab_1', 'Tab_2']
  },
  {
    id: 4,
    name: 'Probability Analysis',
    description: 'Cumulative probability analysis with monotonicity checks',
    icon: '⚡',
    color: 'from-red-500 to-red-600',
    defaults: {
      n: 200, fwd: 1.0, time: 0.333, ctrl_p: 0.2, ctrl_c: 0.2,
      atm: 0.1929, skew: 0.02268, smile: 0.00317, put: -0.00213, call: -0.00006
    },
    expectedFields: ['strikes', 'Tab_1', 'Tab_2']
  }
];

interface AnalyticalSigmaVolatilityModelProps {
  outputType?: 'volatility_surface' | 'vols_plus_minus' | 'density' | 'probability';
}

const AnalyticalSigmaVolatilityModel = ({ outputType }: AnalyticalSigmaVolatilityModelProps = {}) => {
  const { getThemeClasses } = useTheme();
  const theme = getThemeClasses();

  // Determine initial test case based on outputType
  const getInitialTestCase = () => {
    switch (outputType) {
      case 'volatility_surface': return 1;
      case 'vols_plus_minus': return 2;
      case 'density': return 3;
      case 'probability': return 4;
      default: return 1;
    }
  };

  const [selectedTestCase, setSelectedTestCase] = useState<number>(getInitialTestCase());
  const [parameters, setParameters] = useState<ASVParameters>({
    ...TEST_CASES[getInitialTestCase() - 1].defaults,
    test: getInitialTestCase()
  });
  const [results, setResults] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiMetrics, setApiMetrics] = useState<any>(null);

  const currentTestCase = TEST_CASES.find(tc => tc.id === selectedTestCase) || TEST_CASES[0];

  // Update parameters when test case changes
  useEffect(() => {
    const testCase = TEST_CASES.find(tc => tc.id === selectedTestCase);
    if (testCase) {
      setParameters({
        ...testCase.defaults,
        test: selectedTestCase
      });
    }
  }, [selectedTestCase]);

  // Disable test case selection when outputType is specified
  useEffect(() => {
    if (outputType) {
      // Don't allow changing test case when outputType is specified
      const initialTestCase = getInitialTestCase();
      setSelectedTestCase(initialTestCase);
    }
  }, [outputType]);

  const handleParameterChange = (key: keyof ASVParameters, value: string) => {
    setParameters(prev => ({
      ...prev,
      [key]: key === 'test' || key === 'n' ? parseInt(value) : parseFloat(value)
    }));
  };

  const calculateASV = async () => {
    setIsCalculating(true);
    setError(null);
    
    try {
      const apiUrl = 'http://localhost:5005/api/analytical-sigma';
      
      const response = await fetch(`${apiUrl}?${new URLSearchParams({
        test: parameters.test.toString(),
        n: parameters.n.toString(),
        fwd: parameters.fwd.toString(),
        time: parameters.time.toString(),
        ctrl_p: parameters.ctrl_p.toString(),
        ctrl_c: parameters.ctrl_c.toString(),
        atm: parameters.atm.toString(),
        skew: parameters.skew.toString(),
        smile: parameters.smile.toString(),
        put: parameters.put.toString(),
        call: parameters.call.toString()
      })}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.status === 'error') {
        throw new Error(data.error || 'Unknown API error');
      }

      setResults(data.data);
      setApiMetrics(data.meta);
      
    } catch (err) {
      console.error('ASV Calculation Error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsCalculating(false);
    }
  };

  // Prepare chart data based on test case
  const getChartData = () => {
    if (!results) return [];

    return results.strikes.map((strike: number, index: number) => {
      let primary, secondary;

      switch (selectedTestCase) {
        case 1: // Volatility Surface
          primary = results.volatilities[index];
          secondary = null;
          break;
        case 2: // Vols Plus/Minus
          primary = results.vols_plus[index];
          secondary = results.vols_minus[index];
          break;
        case 3: // Density
          primary = results.density_bump[index];
          secondary = results.density[index];
          break;
        case 4: // Probability
          primary = results.probability_bump[index];
          secondary = results.probability[index];
          break;
        default:
          primary = results.volatilities[index];
          secondary = null;
      }

      return {
        strike: strike,
        primary,
        secondary,
        index: index
      };
    });
  };

  const chartData = getChartData();

  // Get chart configuration based on test case
  const getChartConfig = () => {
    switch (selectedTestCase) {
      case 1:
        return {
          primaryLabel: 'Vols',
          secondaryLabel: null, // No secondary curve for test case 1
          primaryColor: '#00ff88',
          secondaryColor: '#ffa502',
          yAxisFormatter: (value: number) => value.toFixed(3),
          tooltipFormatter: (value: number) => value.toFixed(4)
        };
      case 2:
        return {
          primaryLabel: 'Vols plus',
          secondaryLabel: 'Vols minus',
          primaryColor: '#00ff88',
          secondaryColor: '#ffa502',
          yAxisFormatter: (value: number) => value.toFixed(3),
          tooltipFormatter: (value: number) => value.toFixed(4)
        };
      case 3:
        return {
          primaryLabel: 'Density bump',
          secondaryLabel: 'density',
          primaryColor: '#00ff88',
          secondaryColor: '#ffa502',
          yAxisFormatter: (value: number) => value.toExponential(2),
          tooltipFormatter: (value: number) => value.toExponential(4)
        };
      case 4:
        return {
          primaryLabel: 'probability_bump',
          secondaryLabel: 'probability Bump',
          primaryColor: '#00ff88',
          secondaryColor: '#ffa502',
          yAxisFormatter: (value: number) => value.toFixed(3),
          tooltipFormatter: (value: number) => value.toFixed(4)
        };
      default:
        return {
          primaryLabel: 'Primary',
          secondaryLabel: 'Secondary',
          primaryColor: '#00ff88',
          secondaryColor: '#ffa502',
          yAxisFormatter: (value: number) => value.toFixed(3),
          tooltipFormatter: (value: number) => value.toFixed(4)
        };
    }
  };

  const chartConfig = getChartConfig();

  return (
    <div className="space-y-6">


      {/* Description Section - Only show for main ASV page */}
      {!outputType && (
        <Card className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border`}>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${theme.text}`}>
                  📚 About Analytical Sigma Volatility
                </h3>
                <div className={`${theme.textMuted} space-y-3 text-sm leading-relaxed`}>
                  <p>
                    The <strong className="text-red-400">Analytical Sigma Volatility (ASV)</strong> model provides
                    efficient and accurate volatility surface calculations using advanced mathematical techniques.
                    This implementation offers four distinct test cases, each optimized for specific market scenarios.
                  </p>
                  <p>
                    Our model combines <strong className="text-blue-400">analytical solutions</strong> with
                    <strong className="text-green-400"> numerical optimization</strong> to deliver real-time
                    volatility surfaces with sub-millisecond execution times.
                  </p>
                </div>
              </div>
              <div>
                <h3 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${theme.text}`}>
                  🎯 Key Features
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className={`p-3 rounded-lg ${theme.glassBg} ${theme.borderColor} border`}>
                    <div className="text-blue-400 font-medium text-sm">Fast Execution</div>
                    <div className={`${theme.textMuted} text-xs`}>&lt; 1ms calculation</div>
                  </div>
                  <div className={`p-3 rounded-lg ${theme.glassBg} ${theme.borderColor} border`}>
                    <div className="text-green-400 font-medium text-sm">4 Test Cases</div>
                    <div className={`${theme.textMuted} text-xs`}>Specialized scenarios</div>
                  </div>
                  <div className={`p-3 rounded-lg ${theme.glassBg} ${theme.borderColor} border`}>
                    <div className="text-purple-400 font-medium text-sm">Real-time</div>
                    <div className={`${theme.textMuted} text-xs`}>Live calculations</div>
                  </div>
                  <div className={`p-3 rounded-lg ${theme.glassBg} ${theme.borderColor} border`}>
                    <div className="text-orange-400 font-medium text-sm">Analytics</div>
                    <div className={`${theme.textMuted} text-xs`}>Deep insights</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}



      {/* Model Details Section - Only show for main ASV page */}
      {!outputType && (
        <Card className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border`}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${theme.text}`}>
              📋 Model Details & Use Cases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-4 rounded-lg ${theme.glassBg} ${theme.borderColor} border`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl">📈</div>
                  <div>
                    <h4 className={`font-semibold ${theme.text}`}>Volatility Surface</h4>
                    <div className={`text-sm ${theme.textMuted}`}>3D volatility surface generation</div>
                  </div>
                </div>
                <div className={`text-sm ${theme.textMuted} space-y-2`}>
                  <p><strong className="text-blue-400">Purpose:</strong> Generate comprehensive 3D volatility surfaces for option pricing and risk management</p>
                  <p><strong className="text-green-400">Use Cases:</strong> Market making, portfolio optimization, derivatives pricing, volatility trading</p>
                  <p><strong className="text-purple-400">Output:</strong> Interactive 3D surface with strike/time dimensions</p>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${theme.glassBg} ${theme.borderColor} border`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl">📊</div>
                  <div>
                    <h4 className={`font-semibold ${theme.text}`}>Sensitivity Analysis</h4>
                    <div className={`text-sm ${theme.textMuted}`}>Volatility Greeks and sensitivity</div>
                  </div>
                </div>
                <div className={`text-sm ${theme.textMuted} space-y-2`}>
                  <p><strong className="text-blue-400">Purpose:</strong> Analyze volatility sensitivity and Greeks for hedging strategies</p>
                  <p><strong className="text-green-400">Use Cases:</strong> Delta hedging, gamma scalping, vega risk management</p>
                  <p><strong className="text-purple-400">Output:</strong> Volatility curves with +/- variations and sensitivity metrics</p>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${theme.glassBg} ${theme.borderColor} border`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl">🌊</div>
                  <div>
                    <h4 className={`font-semibold ${theme.text}`}>Density Analysis</h4>
                    <div className={`text-sm ${theme.textMuted}`}>Probability density functions</div>
                  </div>
                </div>
                <div className={`text-sm ${theme.textMuted} space-y-2`}>
                  <p><strong className="text-blue-400">Purpose:</strong> Calculate and visualize probability density functions for risk assessment</p>
                  <p><strong className="text-green-400">Use Cases:</strong> Risk-neutral density estimation, tail risk analysis, stress testing</p>
                  <p><strong className="text-purple-400">Output:</strong> Smooth density distribution curves with statistical metrics</p>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${theme.glassBg} ${theme.borderColor} border`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl">📉</div>
                  <div>
                    <h4 className={`font-semibold ${theme.text}`}>Probability Analysis</h4>
                    <div className={`text-sm ${theme.textMuted}`}>Cumulative probability distributions</div>
                  </div>
                </div>
                <div className={`text-sm ${theme.textMuted} space-y-2`}>
                  <p><strong className="text-blue-400">Purpose:</strong> Compute cumulative probability distributions for VaR and stress testing</p>
                  <p><strong className="text-green-400">Use Cases:</strong> Value-at-Risk calculations, regulatory reporting, scenario analysis</p>
                  <p><strong className="text-purple-400">Output:</strong> Cumulative probability curves with confidence intervals</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Only show interactive sections for sub-models, not main ASV page */}
      {outputType && (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* Sensitivity Analysis Visualization */}
          <Card className="xl:col-span-2 ${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border">
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${theme.text}`}>
                📈 {currentTestCase.name} Analysis
                <Badge variant="outline" className={`bg-gradient-to-r ${currentTestCase.color} text-white border-none`}>
                  {currentTestCase.name}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {results ? (
                <div className="h-80 mb-4">
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
                        tickFormatter={chartConfig.yAxisFormatter}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: theme.isDark ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)',
                          border: 'none',
                          borderRadius: '8px',
                          color: theme.isDark ? '#fff' : '#000'
                        }}
                        formatter={(value: any) => [`${chartConfig.tooltipFormatter(value)}`, chartConfig.primaryLabel]}
                        labelFormatter={(value) => `Strike: ${value}`}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="primary"
                        stroke={chartConfig.primaryColor}
                        strokeWidth={3}
                        name={chartConfig.primaryLabel}
                        dot={{ fill: chartConfig.primaryColor, strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: chartConfig.primaryColor, strokeWidth: 2, fill: chartConfig.primaryColor }}
                      />
                      {chartConfig.secondaryLabel && (
                        <Line
                          type="monotone"
                          dataKey="secondary"
                          stroke={chartConfig.secondaryColor}
                          strokeWidth={3}
                          name={chartConfig.secondaryLabel}
                          dot={{ fill: chartConfig.secondaryColor, strokeWidth: 2, r: 4 }}
                          activeDot={{ r: 6, stroke: chartConfig.secondaryColor, strokeWidth: 2, fill: chartConfig.secondaryColor }}
                        />
                      )}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <motion.div
                  className="h-80 flex items-center justify-center mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-center">
                    <motion.div
                      className="text-4xl mb-2"
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
                      {currentTestCase.icon}
                    </motion.div>
                    <motion.p
                      className={`${theme.textMuted} text-sm`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Configure parameters to see visualization
                    </motion.p>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>

          {/* Parameters Panel */}
          <Card className="xl:col-span-1 ${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border">
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${theme.text}`}>
                ⚙️ Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                <div>
                  <Label htmlFor="n" className={theme.text}>Data Points (n)</Label>
                  <Input
                    id="n"
                    type="number"
                    min="10"
                    max="2000"
                    value={parameters.n}
                    onChange={(e) => handleParameterChange('n', e.target.value)}
                    className={`${theme.glassBg} ${theme.borderColor}`}
                  />
                </div>
                <div>
                  <Label htmlFor="fwd" className={theme.text}>Forward</Label>
                  <Input
                    id="fwd"
                    type="number"
                    step="0.001"
                    value={parameters.fwd}
                    onChange={(e) => handleParameterChange('fwd', e.target.value)}
                    className={`${theme.glassBg} ${theme.borderColor}`}
                  />
                </div>
                <div>
                  <Label htmlFor="time" className={theme.text}>Time</Label>
                  <Input
                    id="time"
                    type="number"
                    step="0.001"
                    value={parameters.time}
                    onChange={(e) => handleParameterChange('time', e.target.value)}
                    className={`${theme.glassBg} ${theme.borderColor}`}
                  />
                </div>
                <div>
                  <Label htmlFor="ctrl_p" className={theme.text}>Control P</Label>
                  <Input
                    id="ctrl_p"
                    type="number"
                    step="0.001"
                    value={parameters.ctrl_p}
                    onChange={(e) => handleParameterChange('ctrl_p', e.target.value)}
                    className={`${theme.glassBg} ${theme.borderColor}`}
                  />
                </div>
                <div>
                  <Label htmlFor="ctrl_c" className={theme.text}>Control C</Label>
                  <Input
                    id="ctrl_c"
                    type="number"
                    step="0.001"
                    value={parameters.ctrl_c}
                    onChange={(e) => handleParameterChange('ctrl_c', e.target.value)}
                    className={`${theme.glassBg} ${theme.borderColor}`}
                  />
                </div>
                <div>
                  <Label htmlFor="atm" className={theme.text}>ATM Volatility</Label>
                  <Input
                    id="atm"
                    type="number"
                    step="0.001"
                    value={parameters.atm}
                    onChange={(e) => handleParameterChange('atm', e.target.value)}
                    className={`${theme.glassBg} ${theme.borderColor}`}
                  />
                </div>
                <div>
                  <Label htmlFor="skew" className={theme.text}>Skew</Label>
                  <Input
                    id="skew"
                    type="number"
                    step="0.001"
                    value={parameters.skew}
                    onChange={(e) => handleParameterChange('skew', e.target.value)}
                    className={`${theme.glassBg} ${theme.borderColor}`}
                  />
                </div>
                <div>
                  <Label htmlFor="smile" className={theme.text}>Smile</Label>
                  <Input
                    id="smile"
                    type="number"
                    step="0.001"
                    value={parameters.smile}
                    onChange={(e) => handleParameterChange('smile', e.target.value)}
                    className={`${theme.glassBg} ${theme.borderColor}`}
                  />
                </div>
                <div>
                  <Label htmlFor="put" className={theme.text}>Put Wing</Label>
                  <Input
                    id="put"
                    type="number"
                    step="0.001"
                    value={parameters.put}
                    onChange={(e) => handleParameterChange('put', e.target.value)}
                    className={`${theme.glassBg} ${theme.borderColor}`}
                  />
                </div>
                <div>
                  <Label htmlFor="call" className={theme.text}>Call Wing</Label>
                  <Input
                    id="call"
                    type="number"
                    step="0.001"
                    value={parameters.call}
                    onChange={(e) => handleParameterChange('call', e.target.value)}
                    className={`${theme.glassBg} ${theme.borderColor}`}
                  />
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={calculateASV}
                  disabled={isCalculating}
                  className={`w-full button-gradient bg-gradient-to-r ${currentTestCase.color} transition-all duration-300 hover:shadow-lg hover:shadow-${currentTestCase.color.split('-')[1]}-500/25`}
                >
                  {isCalculating ? (
                    <>
                      <motion.div
                        className="rounded-full h-4 w-4 border-b-2 border-white mr-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      ></motion.div>
                      Calculating {currentTestCase.name}...
                    </>
                  ) : (
                    <>
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Zap className="w-4 h-4 mr-2" />
                      </motion.div>
                      Calculate {currentTestCase.name}
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
                <div className={`p-3 rounded-lg ${theme.glassBg} ${theme.borderColor} border`}>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-medium text-green-400">Calculation Successful</span>
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
      )}

      {/* Results Analytics Panel */}
      {results && outputType && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Performance Metrics */}
          <Card className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${theme.text}`}>
                ⚡ Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400 mb-2">
                    {apiMetrics?.executionTime?.toFixed(1)}ms
                  </div>
                  <div className={`text-sm ${theme.textMuted}`}>Execution Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400 mb-2">
                    {chartData.length}
                  </div>
                  <div className={`text-sm ${theme.textMuted}`}>Data Points</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-2">
                    {apiMetrics?.responseTime}ms
                  </div>
                  <div className={`text-sm ${theme.textMuted}`}>API Response</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400 mb-2">
                    {apiMetrics?.cached ? 'Yes' : 'No'}
                  </div>
                  <div className={`text-sm ${theme.textMuted}`}>Cached Result</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistical Analysis */}
          <Card className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${theme.text}`}>
                📊 Statistical Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              {(() => {
                const primaryData = chartData.map(d => d.primary);
                const secondaryData = chartData.map(d => d.secondary);

                const primaryStats = {
                  min: Math.min(...primaryData),
                  max: Math.max(...primaryData),
                  mean: primaryData.reduce((a, b) => a + b, 0) / primaryData.length,
                  std: Math.sqrt(primaryData.reduce((a, b) => a + Math.pow(b - (primaryData.reduce((c, d) => c + d, 0) / primaryData.length), 2), 0) / primaryData.length)
                };

                return (
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium mb-2 text-blue-400">{chartConfig.primaryLabel}</div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex justify-between">
                          <span className={theme.textMuted}>Min:</span>
                          <span>{chartConfig.tooltipFormatter(primaryStats.min)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={theme.textMuted}>Max:</span>
                          <span>{chartConfig.tooltipFormatter(primaryStats.max)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={theme.textMuted}>Mean:</span>
                          <span>{chartConfig.tooltipFormatter(primaryStats.mean)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={theme.textMuted}>Std:</span>
                          <span>{chartConfig.tooltipFormatter(primaryStats.std)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Test-specific analytics */}
                    <div>
                      <div className="text-sm font-medium mb-2 text-green-400">Test Parameters</div>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className={theme.textMuted}>Forward:</span>
                          <span>{results.parameters?.fwd}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={theme.textMuted}>Time:</span>
                          <span>{results.parameters?.time}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={theme.textMuted}>ATM Vol:</span>
                          <span>{results.parameters?.atm}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        </div>
      )}


    </div>
  );
};

export default AnalyticalSigmaVolatilityModel;
