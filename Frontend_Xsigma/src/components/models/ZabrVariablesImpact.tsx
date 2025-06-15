import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';
import { useTheme } from '@/contexts/ThemeContext';

// Model types
type ModelType = 'zabr_classic' | 'sabr_pde' | 'zabr_mixture';

interface ModelParams {
  [key: string]: number | boolean;
}

interface VolatilityResult {
  status: string;
  model_type: string;
  strikes: number[];
  initial_volatility: number[];
  dynamic_volatility: number[];
  volatility_difference: number[];
  initial_params: ModelParams;
  dynamic_params: ModelParams;
  parameter_ranges: Record<string, [number, number, number]>;
  calculation_successful: boolean;
  cached?: boolean;
  response_time_ms?: number;
}

interface ModelInfo {
  status: string;
  model_type: string;
  default_parameters: ModelParams;
  parameter_ranges: Record<string, [number, number, number]>;
  description: string;
}

const ZabrVariablesImpact: React.FC = () => {
  const { getThemeClasses } = useTheme();
  const theme = getThemeClasses();

  // State management
  const [selectedModel, setSelectedModel] = useState<ModelType>('zabr_classic');
  const [modelInfo, setModelInfo] = useState<Record<ModelType, ModelInfo>>({} as Record<ModelType, ModelInfo>);
  const [parameters, setParameters] = useState<ModelParams>({});
  const [volatilityResult, setVolatilityResult] = useState<VolatilityResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isNightMode, setIsNightMode] = useState(false);
  const [autoUpdateTimer, setAutoUpdateTimer] = useState<NodeJS.Timeout | null>(null);

  // API functions
  const fetchModelInfo = useCallback(async (modelType: ModelType) => {
    try {
      const response = await fetch(`http://localhost:5005/api/zabr-variables-impact/model-info/${modelType}`);
      if (!response.ok) throw new Error('Failed to fetch model info');
      const result = await response.json();
      return result.data; // Extract data from service response (nested structure)
    } catch (error) {
      console.error('Error fetching model info:', error);
      toast.error('Failed to fetch model information');
      return null;
    }
  }, []);

  const calculateVolatility = useCallback(async (modelType: ModelType, params: ModelParams) => {
    try {
      setIsCalculating(true);

      const response = await fetch('http://localhost:5005/api/zabr-variables-impact/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model_type: modelType,
          parameters: params
        })
      });

      if (!response.ok) throw new Error('Calculation failed');
      const result = await response.json();

      setVolatilityResult(result.data); // Extract data from service response
      return result.data;
    } catch (error) {
      console.error('Error calculating volatility:', error);
      toast.error('Calculation failed');
      return null;
    } finally {
      setIsCalculating(false);
    }
  }, []);

  // Initialize model info and parameters
  useEffect(() => {
    const initializeModels = async () => {
      const models: ModelType[] = ['zabr_classic', 'sabr_pde', 'zabr_mixture'];
      const modelInfoData: Record<ModelType, ModelInfo> = {} as Record<ModelType, ModelInfo>;

      for (const model of models) {
        const info = await fetchModelInfo(model);
        if (info) {
          modelInfoData[model] = info;
        }
      }

      setModelInfo(modelInfoData);

      // Set initial parameters for the selected model
      if (modelInfoData[selectedModel]) {
        setParameters(modelInfoData[selectedModel].default_parameters);
      }
    };

    initializeModels();
  }, [fetchModelInfo, selectedModel]);

  // Auto-update when parameters change (with debouncing)
  useEffect(() => {
    if (autoUpdateTimer) {
      clearTimeout(autoUpdateTimer);
    }

    if (Object.keys(parameters).length > 0 && modelInfo[selectedModel]) {
      const timer = setTimeout(() => {
        calculateVolatility(selectedModel, parameters);
      }, 300); // 300ms debounce

      setAutoUpdateTimer(timer);
    }

    return () => {
      if (autoUpdateTimer) {
        clearTimeout(autoUpdateTimer);
      }
    };
  }, [parameters, selectedModel, calculateVolatility, modelInfo]);

  // Parameter update handler
  const updateParameter = useCallback((paramName: string, value: number | boolean) => {
    setParameters(prev => ({
      ...prev,
      [paramName]: value
    }));
  }, []);

  // Reset parameters to defaults
  const resetParameters = useCallback(() => {
    if (modelInfo[selectedModel]) {
      setParameters(modelInfo[selectedModel].default_parameters);
    }
  }, [modelInfo, selectedModel]);

  // Prepare chart data
  const chartData = volatilityResult ?
    volatilityResult.strikes.map((strike, index) => ({
      strike: strike,
      initial: volatilityResult.initial_volatility[index],
      dynamic: volatilityResult.dynamic_volatility[index],
      difference: volatilityResult.volatility_difference[index]
    })) : [];

  return (
    <div className={`min-h-screen ${isNightMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className={`text-4xl font-bold mb-2 ${isNightMode ? 'text-white' : 'text-gray-900'}`}>
                ZABR Variables Impact
              </h1>
              <p className={`text-lg ${isNightMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Interactive analysis of ZABR model parameter impacts on volatility surfaces
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className={`text-sm ${isNightMode ? 'text-gray-300' : 'text-gray-600'}`}>Night Mode</span>
                <Switch
                  checked={isNightMode}
                  onCheckedChange={setIsNightMode}
                />
              </div>
              <Button
                onClick={resetParameters}
                variant="outline"
                className={isNightMode ? 'border-gray-600 text-gray-300 hover:bg-gray-800' : ''}
              >
                Reset
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">ZABR Classic</Badge>
            <Badge variant="secondary">SABR PDE</Badge>
            <Badge variant="secondary">ZABR Mixture</Badge>
            <Badge variant="outline">Dynamic Analysis</Badge>
          </div>
        </div>

        {/* Model Selection and Parameters */}
        <Card className={`mb-6 ${isNightMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isNightMode ? 'text-white' : 'text-gray-900'}`}>
              🎛️ Model Configuration
              {isCalculating && (
                <Badge variant="secondary" className="animate-pulse">
                  Calculating...
                </Badge>
              )}
              {volatilityResult?.cached && (
                <Badge variant="outline" className="text-green-600">
                  Cached ({volatilityResult.response_time_ms}ms)
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Model Selection */}
              <div className="lg:col-span-1">
                <label className={`block text-sm font-medium mb-2 ${isNightMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Model Type
                </label>
                <Select value={selectedModel} onValueChange={(value: ModelType) => setSelectedModel(value)}>
                  <SelectTrigger className={isNightMode ? 'bg-gray-700 border-gray-600 text-white' : ''}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={isNightMode ? 'bg-gray-700 border-gray-600' : ''}>
                    <SelectItem value="zabr_classic" className={isNightMode ? 'text-white hover:bg-gray-600' : ''}>
                      ZABR Classic
                    </SelectItem>
                    <SelectItem value="sabr_pde" className={isNightMode ? 'text-white hover:bg-gray-600' : ''}>
                      SABR PDE
                    </SelectItem>
                    <SelectItem value="zabr_mixture" className={isNightMode ? 'text-white hover:bg-gray-600' : ''}>
                      ZABR Mixture
                    </SelectItem>
                  </SelectContent>
                </Select>
                {modelInfo[selectedModel] && (
                  <p className={`text-xs mt-2 ${isNightMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {modelInfo[selectedModel].description}
                  </p>
                )}
              </div>

              {/* Parameter Controls */}
              <div className="lg:col-span-3">
                {modelInfo[selectedModel] && (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {Object.entries(modelInfo[selectedModel].parameter_ranges).map(([paramName, [min, max, step]]) => {
                      const currentValue = parameters[paramName] as number;
                      const isBoolean = typeof modelInfo[selectedModel].default_parameters[paramName] === 'boolean';

                      if (isBoolean) {
                        return (
                          <div key={paramName} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <label className={`text-sm font-medium ${isNightMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                {paramName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </label>
                              <Switch
                                checked={parameters[paramName] as boolean}
                                onCheckedChange={(checked) => updateParameter(paramName, checked)}
                              />
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div key={paramName} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <label className={`text-sm font-medium ${isNightMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              {paramName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </label>
                            <span className={`text-sm font-mono ${isNightMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {typeof currentValue === 'number' ? currentValue.toFixed(3) : currentValue}
                            </span>
                          </div>
                          <Slider
                            value={[currentValue || min]}
                            onValueChange={([value]) => updateParameter(paramName, value)}
                            min={min}
                            max={max}
                            step={step}
                            className="w-full"
                          />
                          <div className={`flex justify-between text-xs ${isNightMode ? 'text-gray-500' : 'text-gray-400'}`}>
                            <span>{min}</span>
                            <span>{max}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Volatility Chart */}
        {volatilityResult && (
          <Card className={`mb-6 ${isNightMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <CardHeader>
              <CardTitle className={`${isNightMode ? 'text-white' : 'text-gray-900'}`}>
                {selectedModel.toUpperCase().replace('_', ' ')} - Implied Volatility
              </CardTitle>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span className={isNightMode ? 'text-gray-300' : 'text-gray-600'}>Initial</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded"></div>
                  <span className={isNightMode ? 'text-gray-300' : 'text-gray-600'}>Dynamic</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={isNightMode ? '#374151' : '#e5e7eb'}
                    />
                    <XAxis
                      dataKey="strike"
                      stroke={isNightMode ? '#9ca3af' : '#6b7280'}
                      fontSize={12}
                    />
                    <YAxis
                      stroke={isNightMode ? '#9ca3af' : '#6b7280'}
                      fontSize={12}
                      tickFormatter={(value) => value.toFixed(4)}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isNightMode ? '#1f2937' : '#ffffff',
                        border: `1px solid ${isNightMode ? '#374151' : '#e5e7eb'}`,
                        borderRadius: '6px',
                        color: isNightMode ? '#ffffff' : '#000000'
                      }}
                      formatter={(value: number, name: string) => [
                        value.toFixed(6),
                        name === 'initial' ? 'Initial' : name === 'dynamic' ? 'Dynamic' : 'Difference'
                      ]}
                      labelFormatter={(label) => `Strike: ${label}`}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="initial"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                      name="Initial"
                    />
                    <Line
                      type="monotone"
                      dataKey="dynamic"
                      stroke="#f97316"
                      strokeWidth={2}
                      dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
                      name="Dynamic"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Summary */}
        {volatilityResult && (
          <Card className={`${isNightMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <CardHeader>
              <CardTitle className={`${isNightMode ? 'text-white' : 'text-gray-900'}`}>
                Analysis Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className={`p-4 rounded-lg ${isNightMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className={`text-sm ${isNightMode ? 'text-gray-400' : 'text-gray-600'}`}>Model Type</div>
                  <div className={`text-lg font-semibold ${isNightMode ? 'text-white' : 'text-gray-900'}`}>
                    {volatilityResult.model_type.toUpperCase().replace('_', ' ')}
                  </div>
                </div>
                <div className={`p-4 rounded-lg ${isNightMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className={`text-sm ${isNightMode ? 'text-gray-400' : 'text-gray-600'}`}>Strike Range</div>
                  <div className={`text-lg font-semibold ${isNightMode ? 'text-white' : 'text-gray-900'}`}>
                    {Math.min(...volatilityResult.strikes).toFixed(2)} - {Math.max(...volatilityResult.strikes).toFixed(2)}
                  </div>
                </div>
                <div className={`p-4 rounded-lg ${isNightMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className={`text-sm ${isNightMode ? 'text-gray-400' : 'text-gray-600'}`}>Max Difference</div>
                  <div className={`text-lg font-semibold ${isNightMode ? 'text-white' : 'text-gray-900'}`}>
                    {Math.max(...volatilityResult.volatility_difference.map(Math.abs)).toFixed(6)}
                  </div>
                </div>
                <div className={`p-4 rounded-lg ${isNightMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className={`text-sm ${isNightMode ? 'text-gray-400' : 'text-gray-600'}`}>Status</div>
                  <div className={`text-lg font-semibold ${
                    volatilityResult.calculation_successful
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}>
                    {volatilityResult.calculation_successful ? 'Success' : 'Failed'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ZabrVariablesImpact;
