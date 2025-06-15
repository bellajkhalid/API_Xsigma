import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { toast } from "sonner";

interface TestHJMParameters {
  test: number;
  num_paths: number;
  output_type: 'calibration_comparison' | 'simulation_analysis';
  refresh: boolean;
  display_mode: 'volatility' | 'error' | 'both';
}

interface CalibrationResult {
  aad_calibration_time: number;
  standard_calibration_time: number;
  performance_ratio: number;
  speedup_factor: string;
  calibration_successful: boolean;
  valuation_date: string;
  expiry_fraction: number[];
  cms_calls: number[];
}

interface SimulationResult {
  simulation_successful: boolean;
  num_paths: number;
  simulation_dates_count: number;
  maturity: string;
  valuation_date: string;
  NI_Volatility_Bps: {
    data1: { model: number[]; market: number[] };
    data2: { model: number[]; market: number[] };
    data3: { model: number[]; market: number[] };
    data4: { model: number[]; market: number[] };
  };
  Error_Bps: {
    data1: number[];
    data2: number[];
    data3: number[];
    data4: number[];
  };
  expiry_fraction: number[];
}

const HJMModel = () => {
  const { getThemeClasses } = useTheme();
  const theme = getThemeClasses();

  const [parameters, setParameters] = useState<TestHJMParameters>({
    test: 1,
    num_paths: 524288,
    output_type: 'calibration_comparison',
    refresh: false,
    display_mode: 'volatility'
  });

  const [calibrationResults, setCalibrationResults] = useState<CalibrationResult | null>(null);
  const [simulationResults, setSimulationResults] = useState<SimulationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [activeTab, setActiveTab] = useState('calibration');

  const handleParameterChange = (key: keyof TestHJMParameters, value: string | number | boolean) => {
    setParameters(prev => ({
      ...prev,
      [key]: typeof value === 'string' && key !== 'output_type' && key !== 'display_mode' ? 
        (key === 'test' || key === 'num_paths' ? parseInt(value) : parseFloat(value)) : value
    }));
  };

  const callTestHJMAPI = async (testCase: number) => {
    const baseUrl = 'http://localhost:5005';
    const params = new URLSearchParams({
      test: testCase.toString(),
      num_paths: parameters.num_paths.toString(),
      output_type: testCase === 1 ? 'calibration_comparison' : 'simulation_analysis',
      refresh: parameters.refresh.toString()
    });

    try {
      console.log(`Making API call to: ${baseUrl}/api/test-hjm?${params}`);
      const response = await fetch(`${baseUrl}/api/test-hjm?${params}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API response error:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log('API response:', result);

      // Check if the API returned an error status
      if (result.status === 'error') {
        throw new Error(result.error || 'API returned error status');
      }

      // Return the data portion
      return result.data;
    } catch (error) {
      console.error('TestHJM API call failed:', error);
      // Don't show toast here, let the calling function handle it
      throw error;
    }
  };

  const calculateCalibration = async () => {
    setIsCalculating(true);
    try {
      toast.info('Running HJM calibration comparison...');
      const result = await callTestHJMAPI(1);
      setCalibrationResults(result);
      toast.success('Calibration comparison completed successfully!');
    } catch (error) {
      console.error('Calibration calculation failed:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  const calculateSimulation = async () => {
    setIsCalculating(true);
    try {
      const estimatedTime = Math.ceil(parameters.num_paths / 100000) * 30 + 30;
      const timeMessage = estimatedTime > 60 ?
        `Estimated time: ${Math.ceil(estimatedTime / 60)} minutes` :
        `Estimated time: ${estimatedTime} seconds`;

      toast.info(`Running HJM Monte Carlo simulation with ${parameters.num_paths.toLocaleString()} paths. ${timeMessage}`);
      const result = await callTestHJMAPI(2);

      // Debug logging
      console.log('Simulation API result:', result);

      // Check if result has the expected structure
      if (!result || !result.simulation_successful) {
        throw new Error('Simulation returned unsuccessful result');
      }

      // Validate required data structure
      if (!result.NI_Volatility_Bps || !result.Error_Bps || !result.expiry_fraction) {
        throw new Error('Simulation result missing required data structure');
      }

      setSimulationResults(result);
      toast.success(`Simulation completed successfully! Processed ${result.num_paths?.toLocaleString() || parameters.num_paths.toLocaleString()} paths.`);
    } catch (error) {
      console.error('Simulation calculation failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast.error(`Simulation failed: ${errorMessage}. Try reducing the number of paths for faster calculation.`);
    } finally {
      setIsCalculating(false);
    }
  };

  // Prepare chart data
  const performanceData = calibrationResults ? [
    { method: 'AAD', time: calibrationResults.aad_calibration_time },
    { method: 'Standard', time: calibrationResults.standard_calibration_time }
  ] : [];

  // Prepare all 4 volatility surface datasets (matching original notebook)
  const volatilityData1 = simulationResults ?
    simulationResults.expiry_fraction.map((expiry, index) => ({
      expiry: expiry.toFixed(2),
      model: simulationResults.NI_Volatility_Bps.data1.model[index] || 0,
      market: simulationResults.NI_Volatility_Bps.data1.market[index] || 0,
      error: simulationResults.Error_Bps.data1[index] || 0
    })) : [];

  const volatilityData2 = simulationResults ?
    simulationResults.expiry_fraction.map((expiry, index) => ({
      expiry: expiry.toFixed(2),
      model: simulationResults.NI_Volatility_Bps.data2.model[index] || 0,
      market: simulationResults.NI_Volatility_Bps.data2.market[index] || 0,
      error: simulationResults.Error_Bps.data2[index] || 0
    })) : [];

  const volatilityData3 = simulationResults ?
    simulationResults.expiry_fraction.map((expiry, index) => ({
      expiry: expiry.toFixed(2),
      model: simulationResults.NI_Volatility_Bps.data3.model[index] || 0,
      market: simulationResults.NI_Volatility_Bps.data3.market[index] || 0,
      error: simulationResults.Error_Bps.data3[index] || 0
    })) : [];

  const volatilityData4 = simulationResults ?
    simulationResults.expiry_fraction.map((expiry, index) => ({
      expiry: expiry.toFixed(2),
      model: simulationResults.NI_Volatility_Bps.data4.model[index] || 0,
      market: simulationResults.NI_Volatility_Bps.data4.market[index] || 0,
      error: simulationResults.Error_Bps.data4[index] || 0
    })) : [];

  return (
    <div className="space-y-6">
      {/* Description Section */}
      <Card className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border`}>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${theme.text}`}>
                📚 About TestHJM Model
              </h3>
              <div className={`${theme.textMuted} space-y-3 text-sm leading-relaxed font-clean`}>
                <p>
                  The <strong className="text-green-400 font-mono">Heath-Jarrow-Morton (HJM)</strong> framework provides
                  a comprehensive approach to modeling the entire yield curve evolution. Our TestHJM implementation
                  includes real calibration performance comparison and Monte Carlo simulation capabilities.
                </p>
                <p>
                  Features <strong className="text-blue-400 font-mono">AAD vs Standard calibration</strong> comparison,
                  <strong className="text-purple-400 font-mono"> Monte Carlo simulation</strong> with configurable paths,
                  and real-time volatility surface analysis for interest rate modeling.
                </p>
              </div>
            </div>
            <div>
              <h3 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${theme.text}`}>
                🎯 TestHJM Features
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className={`p-3 rounded-lg ${theme.glassBg} ${theme.borderColor} border`}>
                  <div className="text-green-400 font-mono font-medium text-sm">AAD Calibration</div>
                  <div className={`${theme.textMuted} text-xs font-clean`}>Performance comparison</div>
                </div>
                <div className={`p-3 rounded-lg ${theme.glassBg} ${theme.borderColor} border`}>
                  <div className="text-blue-400 font-mono font-medium text-sm">Monte Carlo</div>
                  <div className={`${theme.textMuted} text-xs font-clean`}>Up to 10M paths</div>
                </div>
                <div className={`p-3 rounded-lg ${theme.glassBg} ${theme.borderColor} border`}>
                  <div className="text-purple-400 font-mono font-medium text-sm">Volatility Surfaces</div>
                  <div className={`${theme.textMuted} text-xs font-clean`}>Model vs Market</div>
                </div>
                <div className={`p-3 rounded-lg ${theme.glassBg} ${theme.borderColor} border`}>
                  <div className="text-orange-400 font-mono font-medium text-sm">Real Data</div>
                  <div className={`${theme.textMuted} text-xs font-clean`}>No mocking</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Tabs Section */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={`grid w-full grid-cols-3 ${theme.glassBg} ${theme.borderColor}`}>
          <TabsTrigger value="calibration" className="font-mono">
            🚀 Calibration Comparison
          </TabsTrigger>
          <TabsTrigger value="simulation" className="font-mono">
            📊 Monte Carlo Simulation
          </TabsTrigger>
          <TabsTrigger value="markov" className="font-mono">
            🔬 Markov Test
          </TabsTrigger>
        </TabsList>

        {/* Calibration Tab */}
        <TabsContent value="calibration" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Calibration Parameters Panel */}
            <Card className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border`}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${theme.text} font-corporate`}>
                  🚀 Calibration Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="refresh" className={`${theme.text} font-clean`}>Force Refresh</Label>
                  <Select
                    value={parameters.refresh.toString()}
                    onValueChange={(value) => handleParameterChange('refresh', value === 'true')}
                  >
                    <SelectTrigger className={`${theme.glassBg} ${theme.borderColor} font-mono`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="false">Use Cache</SelectItem>
                      <SelectItem value="true">Force Refresh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={calculateCalibration}
                  disabled={isCalculating}
                  className="w-full button-gradient"
                >
                  {isCalculating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Calibrating...
                    </>
                  ) : (
                    'Run Calibration Comparison'
                  )}
                </Button>

                {calibrationResults && (
                  <div className="space-y-3 pt-4 border-t border-gray-600">
                    <div className="text-center">
                      <div className="text-lg font-mono font-bold text-green-400 mb-1">
                        {calibrationResults.speedup_factor}
                      </div>
                      <div className={`text-xs ${theme.textMuted} font-clean`}>Performance Improvement</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Calibration Performance Chart */}
            <Card className={`xl:col-span-2 ${theme.isDark ? theme.glassBg : 'bg-white'} backdrop-blur-lg ${theme.borderColor} border`}>
              <CardHeader>
                <CardTitle className={`${theme.text} font-corporate`}>Calibration Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                {calibrationResults ? (
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={theme.isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} />
                        <XAxis dataKey="method" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip />
                        <Bar dataKey="time" fill="#00ff88" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-96 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🚀</div>
                      <p className={`${theme.textMuted}`}>
                        Click "Run Calibration Comparison" to see AAD vs Standard performance
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Simulation Tab */}
        <TabsContent value="simulation" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Simulation Parameters Panel */}
            <Card className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border`}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${theme.text} font-corporate`}>
                  📊 Simulation Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="num_paths" className={`${theme.text} font-clean`}>Monte Carlo Paths</Label>
                  <Input
                    id="num_paths"
                    type="number"
                    min="1000"
                    max="10000000"
                    value={parameters.num_paths}
                    onChange={(e) => handleParameterChange('num_paths', e.target.value)}
                    className={`${theme.glassBg} ${theme.borderColor} font-mono`}
                  />
                  <div className={`text-xs ${theme.textMuted} mt-1 space-y-1`}>
                    <div>Range: 1,000 - 10,000,000 paths</div>
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => handleParameterChange('num_paths', 10000)}
                        className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded hover:bg-green-500/30"
                      >
                        10K (fast)
                      </button>
                      <button
                        onClick={() => handleParameterChange('num_paths', 100000)}
                        className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30"
                      >
                        100K (1min)
                      </button>
                      <button
                        onClick={() => handleParameterChange('num_paths', 524288)}
                        className="px-2 py-1 text-xs bg-purple-500/20 text-purple-400 rounded hover:bg-purple-500/30"
                      >
                        524K (3min)
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="display_mode" className={`${theme.text} font-clean`}>Display Mode</Label>
                  <Select
                    value={parameters.display_mode}
                    onValueChange={(value) => handleParameterChange('display_mode', value)}
                  >
                    <SelectTrigger className={`${theme.glassBg} ${theme.borderColor} font-mono`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="volatility">📈 Volatility Surfaces</SelectItem>
                      <SelectItem value="error">📉 Error Analysis</SelectItem>
                      <SelectItem value="both">📊 Both Views</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className={`text-xs ${theme.textMuted} mt-1`}>
                    Choose analysis focus
                  </div>
                </div>

                <Button
                  onClick={calculateSimulation}
                  disabled={isCalculating}
                  className="w-full button-gradient"
                >
                  {isCalculating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Simulating...
                    </>
                  ) : (
                    'Run Monte Carlo Simulation'
                  )}
                </Button>

                {simulationResults && (
                  <div className="space-y-3 pt-4 border-t border-gray-600">
                    <div className="text-center">
                      <div className="text-lg font-mono font-bold text-green-400 mb-1">
                        {simulationResults.num_paths.toLocaleString()}
                      </div>
                      <div className={`text-xs ${theme.textMuted} font-clean`}>Simulation Paths</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Main Analysis Chart */}
            <Card className={`xl:col-span-2 ${theme.isDark ? theme.glassBg : 'bg-white'} backdrop-blur-lg ${theme.borderColor} border`}>
              <CardHeader>
                <CardTitle className={`${theme.text} font-corporate`}>
                  {parameters.display_mode === 'error' ?
                    '📉 Error Analysis: Model vs Market Differences' :
                    '📈 Volatility Surface: Model vs Market'
                  }
                </CardTitle>
              </CardHeader>
              <CardContent>
                {simulationResults ? (
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={volatilityData1}>
                        <CartesianGrid strokeDasharray="3 3" stroke={theme.isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} />
                        <XAxis dataKey="expiry" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `${value.toFixed(0)} bps`} />
                        <Tooltip formatter={(value: any, name: string) => [`${value.toFixed(2)} bps`, name]} />
                        <Legend />

                        {(parameters.display_mode === 'volatility' || parameters.display_mode === 'both') && (
                          <>
                            <Line type="monotone" dataKey="model" stroke="#00ff88" strokeWidth={3} name="Model" />
                            <Line type="monotone" dataKey="market" stroke="#ffa502" strokeWidth={3} name="Market" strokeDasharray="5 5" />
                          </>
                        )}

                        {(parameters.display_mode === 'error' || parameters.display_mode === 'both') && (
                          <Line
                            type="monotone"
                            dataKey="error"
                            stroke="#ff6b6b"
                            strokeWidth={parameters.display_mode === 'error' ? 4 : 2}
                            name="Error (Model - Market)"
                          />
                        )}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-96 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">
                        {parameters.display_mode === 'error' ? '📉' : '📈'}
                      </div>
                      <p className={`${theme.textMuted}`}>
                        Click "Run Monte Carlo Simulation" to see {
                          parameters.display_mode === 'error' ? 'error analysis' : 'volatility surfaces'
                        }
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* All 4 Volatility Surface Charts (matching original notebook) */}
          {simulationResults && (parameters.display_mode === 'volatility' || parameters.display_mode === 'both') && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Volatility Surface 1 */}
              <Card className={`${theme.isDark ? theme.glassBg : 'bg-white'} backdrop-blur-lg ${theme.borderColor} border`}>
                <CardHeader>
                  <CardTitle className={`${theme.text} font-corporate`}>📈 Volatility Surface 1: Model vs Market</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={volatilityData1}>
                        <CartesianGrid strokeDasharray="3 3" stroke={theme.isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} />
                        <XAxis dataKey="expiry" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} tickFormatter={(value) => `${value.toFixed(0)} bps`} />
                        <Tooltip formatter={(value: any, name: string) => [`${value.toFixed(2)} bps`, name]} />
                        <Legend />
                        <Line type="monotone" dataKey="model" stroke="#00ff88" strokeWidth={3} name="Model" dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="market" stroke="#ffa502" strokeWidth={3} name="Market" strokeDasharray="5 5" dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Volatility Surface 2 */}
              <Card className={`${theme.isDark ? theme.glassBg : 'bg-white'} backdrop-blur-lg ${theme.borderColor} border`}>
                <CardHeader>
                  <CardTitle className={`${theme.text} font-corporate`}>📈 Volatility Surface 2: Model vs Market</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={volatilityData2}>
                        <CartesianGrid strokeDasharray="3 3" stroke={theme.isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} />
                        <XAxis dataKey="expiry" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} tickFormatter={(value) => `${value.toFixed(0)} bps`} />
                        <Tooltip formatter={(value: any, name: string) => [`${value.toFixed(2)} bps`, name]} />
                        <Legend />
                        <Line type="monotone" dataKey="model" stroke="#00ff88" strokeWidth={3} name="Model" dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="market" stroke="#ffa502" strokeWidth={3} name="Market" strokeDasharray="5 5" dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Volatility Surface 3 */}
              <Card className={`${theme.isDark ? theme.glassBg : 'bg-white'} backdrop-blur-lg ${theme.borderColor} border`}>
                <CardHeader>
                  <CardTitle className={`${theme.text} font-corporate`}>📈 Volatility Surface 3: Model vs Market</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={volatilityData3}>
                        <CartesianGrid strokeDasharray="3 3" stroke={theme.isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} />
                        <XAxis dataKey="expiry" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} tickFormatter={(value) => `${value.toFixed(0)} bps`} />
                        <Tooltip formatter={(value: any, name: string) => [`${value.toFixed(2)} bps`, name]} />
                        <Legend />
                        <Line type="monotone" dataKey="model" stroke="#00ff88" strokeWidth={3} name="Model" dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="market" stroke="#ffa502" strokeWidth={3} name="Market" strokeDasharray="5 5" dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Volatility Surface 4 */}
              <Card className={`${theme.isDark ? theme.glassBg : 'bg-white'} backdrop-blur-lg ${theme.borderColor} border`}>
                <CardHeader>
                  <CardTitle className={`${theme.text} font-corporate`}>📈 Volatility Surface 4: Model vs Market</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={volatilityData4}>
                        <CartesianGrid strokeDasharray="3 3" stroke={theme.isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} />
                        <XAxis dataKey="expiry" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} tickFormatter={(value) => `${value.toFixed(0)} bps`} />
                        <Tooltip formatter={(value: any, name: string) => [`${value.toFixed(2)} bps`, name]} />
                        <Legend />
                        <Line type="monotone" dataKey="model" stroke="#00ff88" strokeWidth={3} name="Model" dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="market" stroke="#ffa502" strokeWidth={3} name="Market" strokeDasharray="5 5" dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* All 4 Error Analysis Charts (matching original notebook) */}
          {simulationResults && (parameters.display_mode === 'error' || parameters.display_mode === 'both') && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Error Analysis 1 */}
              <Card className={`${theme.isDark ? theme.glassBg : 'bg-white'} backdrop-blur-lg ${theme.borderColor} border`}>
                <CardHeader>
                  <CardTitle className={`${theme.text} font-corporate`}>📉 Error Analysis 1: Model - Market Differences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={volatilityData1}>
                        <CartesianGrid strokeDasharray="3 3" stroke={theme.isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} />
                        <XAxis dataKey="expiry" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} tickFormatter={(value) => `${value.toFixed(1)} bps`} />
                        <Tooltip formatter={(value: any) => [`${value.toFixed(3)} bps`, 'Error']} />
                        <Legend />
                        <Line type="monotone" dataKey="error" stroke="#ff6b6b" strokeWidth={4} name="Error Set 1" dot={{ fill: '#ff6b6b', r: 5 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Error Analysis 2 */}
              <Card className={`${theme.isDark ? theme.glassBg : 'bg-white'} backdrop-blur-lg ${theme.borderColor} border`}>
                <CardHeader>
                  <CardTitle className={`${theme.text} font-corporate`}>📉 Error Analysis 2: Model - Market Differences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={volatilityData2}>
                        <CartesianGrid strokeDasharray="3 3" stroke={theme.isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} />
                        <XAxis dataKey="expiry" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} tickFormatter={(value) => `${value.toFixed(1)} bps`} />
                        <Tooltip formatter={(value: any) => [`${value.toFixed(3)} bps`, 'Error']} />
                        <Legend />
                        <Line type="monotone" dataKey="error" stroke="#ff9f43" strokeWidth={4} name="Error Set 2" dot={{ fill: '#ff9f43', r: 5 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Error Analysis 3 */}
              <Card className={`${theme.isDark ? theme.glassBg : 'bg-white'} backdrop-blur-lg ${theme.borderColor} border`}>
                <CardHeader>
                  <CardTitle className={`${theme.text} font-corporate`}>📉 Error Analysis 3: Model - Market Differences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={volatilityData3}>
                        <CartesianGrid strokeDasharray="3 3" stroke={theme.isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} />
                        <XAxis dataKey="expiry" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} tickFormatter={(value) => `${value.toFixed(1)} bps`} />
                        <Tooltip formatter={(value: any) => [`${value.toFixed(3)} bps`, 'Error']} />
                        <Legend />
                        <Line type="monotone" dataKey="error" stroke="#a55eea" strokeWidth={4} name="Error Set 3" dot={{ fill: '#a55eea', r: 5 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Error Analysis 4 */}
              <Card className={`${theme.isDark ? theme.glassBg : 'bg-white'} backdrop-blur-lg ${theme.borderColor} border`}>
                <CardHeader>
                  <CardTitle className={`${theme.text} font-corporate`}>📉 Error Analysis 4: Model - Market Differences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={volatilityData4}>
                        <CartesianGrid strokeDasharray="3 3" stroke={theme.isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} />
                        <XAxis dataKey="expiry" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} tickFormatter={(value) => `${value.toFixed(1)} bps`} />
                        <Tooltip formatter={(value: any) => [`${value.toFixed(3)} bps`, 'Error']} />
                        <Legend />
                        <Line type="monotone" dataKey="error" stroke="#26de81" strokeWidth={4} name="Error Set 4" dot={{ fill: '#26de81', r: 5 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Comprehensive Raw Numerical Data Display (all 4 datasets) */}
          {simulationResults && (
            <Card className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border`}>
              <CardHeader>
                <CardTitle className={`${theme.text} font-corporate`}>📊 Complete Numerical Arrays & Error Matrices (All 4 Datasets)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {/* All Volatility Data Sets */}
                  <div>
                    <h4 className={`text-lg font-semibold mb-4 ${theme.text} flex items-center gap-2`}>
                      📈 Volatility Surfaces (bps)
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        {simulationResults.NI_Volatility_Bps.data1.model.length} points each
                      </Badge>
                    </h4>
                    <div className="space-y-3">
                      {[1, 2, 3, 4].map(dataSet => (
                        <div key={dataSet} className={`p-3 rounded-lg ${theme.glassBg} ${theme.borderColor} border`}>
                          <div className="flex justify-between items-center mb-2">
                            <div className="text-blue-400 font-mono font-medium text-sm">Data Set {dataSet}</div>
                            <div className="text-xs text-gray-400">Model vs Market</div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <div className="text-green-400 mb-1">Model:</div>
                              <div className={`${theme.textMuted} font-mono max-h-16 overflow-y-auto bg-black/20 p-2 rounded`}>
                                [{simulationResults.NI_Volatility_Bps[`data${dataSet}` as keyof typeof simulationResults.NI_Volatility_Bps].model.slice(0, 6).map(v => v.toFixed(1)).join(', ')}...]
                              </div>
                            </div>
                            <div>
                              <div className="text-orange-400 mb-1">Market:</div>
                              <div className={`${theme.textMuted} font-mono max-h-16 overflow-y-auto bg-black/20 p-2 rounded`}>
                                [{simulationResults.NI_Volatility_Bps[`data${dataSet}` as keyof typeof simulationResults.NI_Volatility_Bps].market.slice(0, 6).map(v => v.toFixed(1)).join(', ')}...]
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* All Error Matrices */}
                  <div>
                    <h4 className={`text-lg font-semibold mb-4 ${theme.text} flex items-center gap-2`}>
                      📉 Error Matrices (bps)
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                        Model - Market
                      </Badge>
                    </h4>
                    <div className="space-y-3">
                      {[1, 2, 3, 4].map(dataSet => (
                        <div key={dataSet} className={`p-3 rounded-lg ${theme.glassBg} ${theme.borderColor} border`}>
                          <div className="flex justify-between items-center mb-2">
                            <div className="text-red-400 font-mono font-medium text-sm">Error Set {dataSet}</div>
                            <div className="text-xs text-gray-400">
                              Avg: {(simulationResults.Error_Bps[`data${dataSet}` as keyof typeof simulationResults.Error_Bps].reduce((a, b) => a + b, 0) / simulationResults.Error_Bps[`data${dataSet}` as keyof typeof simulationResults.Error_Bps].length).toFixed(2)} bps
                            </div>
                          </div>
                          <div className={`${theme.textMuted} text-xs font-mono max-h-16 overflow-y-auto bg-black/20 p-2 rounded`}>
                            [{simulationResults.Error_Bps[`data${dataSet}` as keyof typeof simulationResults.Error_Bps].slice(0, 8).map(v => v.toFixed(2)).join(', ')}...]
                          </div>
                        </div>
                      ))}

                      {/* Expiry Fractions */}
                      <div className={`p-3 rounded-lg ${theme.glassBg} ${theme.borderColor} border`}>
                        <div className="flex justify-between items-center mb-2">
                          <div className="text-purple-400 font-mono font-medium text-sm">⏱️ Expiry Fractions</div>
                          <div className="text-xs text-gray-400">Time axis data</div>
                        </div>
                        <div className={`${theme.textMuted} text-xs font-mono max-h-16 overflow-y-auto bg-black/20 p-2 rounded`}>
                          [{simulationResults.expiry_fraction.map(v => v.toFixed(3)).join(', ')}]
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Data Export Section */}
                <div className="mt-6 pt-6 border-t border-gray-600">
                  <h4 className={`text-lg font-semibold mb-4 ${theme.text}`}>💾 Data Export & Markov Test</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className={`p-4 rounded-lg ${theme.glassBg} ${theme.borderColor} border text-center`}>
                      <div className="text-2xl mb-2">🎯</div>
                      <div className="text-green-400 font-mono font-bold">4 Surfaces</div>
                      <div className={`text-xs ${theme.textMuted}`}>Complete volatility analysis</div>
                    </div>
                    <div className={`p-4 rounded-lg ${theme.glassBg} ${theme.borderColor} border text-center`}>
                      <div className="text-2xl mb-2">📉</div>
                      <div className="text-red-400 font-mono font-bold">4 Errors</div>
                      <div className={`text-xs ${theme.textMuted}`}>Model vs market differences</div>
                    </div>
                    <div className={`p-4 rounded-lg ${theme.glassBg} ${theme.borderColor} border text-center`}>
                      <div className="text-2xl mb-2">💾</div>
                      <div className="text-blue-400 font-mono font-bold">Cached</div>
                      <div className={`text-xs ${theme.textMuted}`}>10-15 minute TTL</div>
                    </div>
                    <div className={`p-4 rounded-lg ${theme.glassBg} ${theme.borderColor} border text-center`}>
                      <div className="text-2xl mb-2">🔬</div>
                      <div className="text-purple-400 font-mono font-bold">Markov</div>
                      <div className={`text-xs ${theme.textMuted}`}>Statistical test ready</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Markov Test Tab */}
        <TabsContent value="markov" className="space-y-6">
          <Card className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border`}>
            <CardHeader>
              <CardTitle className={`${theme.text} font-corporate`}>🔬 Markov Test Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${theme.text}`}>
                    🧪 About Markov Test
                  </h3>
                  <div className={`${theme.textMuted} space-y-3 text-sm leading-relaxed font-clean`}>
                    <p>
                      The <strong className="text-green-400 font-mono">Markov Test</strong> validates the statistical
                      properties of the HJM model by analyzing the correlation structure and ensuring the model
                      satisfies the Markovian property for interest rate dynamics.
                    </p>
                    <p>
                      This test examines <strong className="text-blue-400 font-mono">correlation matrices</strong>,
                      <strong className="text-purple-400 font-mono"> eigenvalue decomposition</strong>, and
                      <strong className="text-orange-400 font-mono"> statistical significance</strong> of the model parameters.
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${theme.text}`}>
                    📊 Test Components
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className={`p-3 rounded-lg ${theme.glassBg} ${theme.borderColor} border`}>
                      <div className="text-green-400 font-mono font-medium text-sm">Correlation Matrix</div>
                      <div className={`${theme.textMuted} text-xs font-clean`}>Factor correlation analysis</div>
                    </div>
                    <div className={`p-3 rounded-lg ${theme.glassBg} ${theme.borderColor} border`}>
                      <div className="text-blue-400 font-mono font-medium text-sm">Eigenvalues</div>
                      <div className={`${theme.textMuted} text-xs font-clean`}>Principal components</div>
                    </div>
                    <div className={`p-3 rounded-lg ${theme.glassBg} ${theme.borderColor} border`}>
                      <div className="text-purple-400 font-mono font-medium text-sm">Statistical Tests</div>
                      <div className={`${theme.textMuted} text-xs font-clean`}>Significance validation</div>
                    </div>
                    <div className={`p-3 rounded-lg ${theme.glassBg} ${theme.borderColor} border`}>
                      <div className="text-orange-400 font-mono font-medium text-sm">Model Validation</div>
                      <div className={`${theme.textMuted} text-xs font-clean`}>Markov property check</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-600">
                <div className="text-center">
                  <div className="text-6xl mb-4">🔬</div>
                  <h3 className={`text-xl font-semibold mb-4 ${theme.text}`}>Markov Test Implementation</h3>
                  <p className={`${theme.textMuted} mb-6`}>
                    The Markov test functionality is available in your original notebook.
                    This advanced statistical analysis validates the theoretical foundations of the HJM model.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className={`p-4 rounded-lg ${theme.glassBg} ${theme.borderColor} border`}>
                      <div className="text-2xl mb-2">📊</div>
                      <div className="text-green-400 font-mono font-bold">Matrix Analysis</div>
                      <div className={`text-xs ${theme.textMuted}`}>Correlation structure validation</div>
                    </div>
                    <div className={`p-4 rounded-lg ${theme.glassBg} ${theme.borderColor} border`}>
                      <div className="text-2xl mb-2">🧮</div>
                      <div className="text-blue-400 font-mono font-bold">Eigenvalue Test</div>
                      <div className={`text-xs ${theme.textMuted}`}>Principal component analysis</div>
                    </div>
                    <div className={`p-4 rounded-lg ${theme.glassBg} ${theme.borderColor} border`}>
                      <div className="text-2xl mb-2">✅</div>
                      <div className="text-purple-400 font-mono font-bold">Validation</div>
                      <div className={`text-xs ${theme.textMuted}`}>Statistical significance</div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 px-4 py-2">
                      🔬 Advanced Statistical Analysis Available in Original Notebook
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Statistics Panel */}
      {(calibrationResults || simulationResults) && (
        <Card className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border`}>
          <CardHeader>
            <CardTitle className={`${theme.text} font-corporate`}>
              {activeTab === 'calibration' ? 'Calibration Statistics' : 'Simulation Statistics'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activeTab === 'calibration' && calibrationResults && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-mono font-bold text-green-400 tracking-wider mb-2">
                    {calibrationResults.aad_calibration_time.toFixed(3)}s
                  </div>
                  <div className={`text-sm ${theme.textMuted} font-clean`}>AAD Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-mono font-bold text-blue-400 tracking-wider mb-2">
                    {calibrationResults.standard_calibration_time.toFixed(3)}s
                  </div>
                  <div className={`text-sm ${theme.textMuted} font-clean`}>Standard Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-mono font-bold text-purple-400 tracking-wider mb-2">
                    {calibrationResults.performance_ratio.toFixed(1)}x
                  </div>
                  <div className={`text-sm ${theme.textMuted} font-clean`}>Speedup Ratio</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-mono font-bold text-orange-400 tracking-wider mb-2">
                    {calibrationResults.calibration_successful ? '✅' : '❌'}
                  </div>
                  <div className={`text-sm ${theme.textMuted} font-clean`}>Success</div>
                </div>
              </div>
            )}

            {activeTab === 'simulation' && simulationResults && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-mono font-bold text-green-400 tracking-wider mb-2">
                    {simulationResults.num_paths.toLocaleString()}
                  </div>
                  <div className={`text-sm ${theme.textMuted} font-clean`}>MC Paths</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-mono font-bold text-blue-400 tracking-wider mb-2">
                    {simulationResults.simulation_dates_count}
                  </div>
                  <div className={`text-sm ${theme.textMuted} font-clean`}>Simulation Dates</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-mono font-bold text-purple-400 tracking-wider mb-2">
                    {simulationResults.expiry_fraction.length}
                  </div>
                  <div className={`text-sm ${theme.textMuted} font-clean`}>Expiry Points</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-mono font-bold text-orange-400 tracking-wider mb-2">
                    {simulationResults.simulation_successful ? '✅' : '❌'}
                  </div>
                  <div className={`text-sm ${theme.textMuted} font-clean`}>Success</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HJMModel;
