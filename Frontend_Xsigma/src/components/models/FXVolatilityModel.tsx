import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, Clock, Zap, TrendingUp, AlertCircle, CheckCircle, BarChart3, Layers } from "lucide-react";


interface FXVolatilityData {
  atm_curve?: {
    expiries: number[];
    interpolated_vols: number[];
    market_expiries: number[];
    market_vols: number[];
  };
  models_comparison?: {
    strike_ratio: number[];
    vol_call_put: number[];
    vol_instrument: number[];
    vol_delta: number[];
    vol_svi: number[];
    expiry_time: number;
    forward_rate: number;
  };
  market_data?: {
    calibration_tenors: string[];
    vols_atm_mkt: number[];
  };
}

const FXVolatilityModel = () => {
  const { getThemeClasses, isDark } = useTheme();
  const theme = getThemeClasses();

  const [activeView, setActiveView] = useState<'atm_curve' | 'models_comparison' | 'market_data'>('atm_curve');
  const [data, setData] = useState<FXVolatilityData>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiMetrics, setApiMetrics] = useState<any>(null);

  const views = [
    {
      id: 'atm_curve' as const,
      name: 'ATM Volatility Curve',
      description: 'Interpolated ATM volatility curve with market data points',
      icon: '📈',
      color: 'from-blue-500 to-blue-600',
      endpoint: '/api/fx-volatility/atm-curve'
    },
    {
      id: 'models_comparison' as const,
      name: 'Models Comparison',
      description: 'Compare Call/Put, Instrument, Delta, and SVI volatility models',
      icon: '🔄',
      color: 'from-green-500 to-green-600',
      endpoint: '/api/fx-volatility/models-comparison'
    },
    {
      id: 'market_data' as const,
      name: 'Market Data',
      description: 'Current market data and calibration parameters',
      icon: '💰',
      color: 'from-purple-500 to-purple-600',
      endpoint: '/api/fx-volatility/market-data'
    }
  ];

  const currentView = views.find(v => v.id === activeView) || views[0];

  const fetchData = async (viewId: typeof activeView) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const view = views.find(v => v.id === viewId);
      if (!view) throw new Error('Invalid view');

      const response = await fetch(`http://localhost:5005${view.endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.status === 'error') {
        throw new Error(result.error || 'Unknown API error');
      }

      setData(prev => ({
        ...prev,
        [viewId]: result.data
      }));
      setApiMetrics(result.api);
      
    } catch (err) {
      console.error('FX Volatility Error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Load data when view changes
  useEffect(() => {
    fetchData(activeView);
  }, [activeView]);

  // Prepare chart data based on active view
  const getChartData = () => {
    switch (activeView) {
      case 'atm_curve':
        if (!data.atm_curve) return [];
        return data.atm_curve.expiries.map((expiry, index) => ({
          expiry: expiry,
          interpolated: data.atm_curve!.interpolated_vols[index],
          market: data.atm_curve!.market_expiries.includes(expiry) 
            ? data.atm_curve!.market_vols[data.atm_curve!.market_expiries.indexOf(expiry)]
            : null
        }));

      case 'models_comparison':
        if (!data.models_comparison) return [];
        return data.models_comparison.strike_ratio.map((ratio, index) => ({
          strike_ratio: ratio,
          call_put: data.models_comparison!.vol_call_put[index],
          instrument: data.models_comparison!.vol_instrument[index],
          delta: data.models_comparison!.vol_delta[index],
          svi: data.models_comparison!.vol_svi[index]
        }));

      case 'market_data':
        if (!data.market_data) return [];
        return data.market_data.calibration_tenors.map((tenor, index) => ({
          tenor: tenor,
          volatility: data.market_data!.vols_atm_mkt[index]
        }));

      default:
        return [];
    }
  };

  const chartData = getChartData();

  return (
    <div className="space-y-6">


      {/* Description Section */}
      <Card className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border`}>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className={`text-xl font-corporate font-semibold mb-4 flex items-center gap-2 ${theme.text}`}>
                📚 About FX Volatility Models
              </h3>
              <div className={`${theme.textMuted} space-y-3 text-sm leading-relaxed font-clean`}>
                <p>
                  Our <strong className="text-orange-400 font-mono">FX Volatility Models</strong> provide comprehensive
                  volatility surface modeling for foreign exchange markets using advanced mathematical frameworks
                  including quadratic smile interpolation and extended SVI parameterization.
                </p>
                <p>
                  The implementation supports <strong className="text-blue-400 font-code">multiple interpolation methods</strong>:
                  Call/Put Variance, Instrument Vol, Fixed Strike (Delta), and Extended SVI for robust
                  <strong className="text-green-400 font-mono"> arbitrage-free surfaces</strong>.
                </p>
              </div>
            </div>
            <div>
              <h3 className={`text-xl font-corporate font-semibold mb-4 flex items-center gap-2 ${theme.text}`}>
                🎯 Key Features
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className={`p-3 rounded-lg ${theme.glassBg} ${theme.borderColor} border`}>
                  <div className="text-blue-400 font-mono font-medium text-sm">ATM Interpolation</div>
                  <div className={`${theme.textMuted} text-xs font-clean`}>Mean-reverting curves</div>
                </div>
                <div className={`p-3 rounded-lg ${theme.glassBg} ${theme.borderColor} border`}>
                  <div className="text-green-400 font-mono font-medium text-sm">4 Model Types</div>
                  <div className={`${theme.textMuted} text-xs font-clean`}>Comprehensive comparison</div>
                </div>
                <div className={`p-3 rounded-lg ${theme.glassBg} ${theme.borderColor} border`}>
                  <div className="text-purple-400 font-mono font-medium text-sm">Market Data</div>
                  <div className={`${theme.textMuted} text-xs font-clean`}>Real market calibration</div>
                </div>
                <div className={`p-3 rounded-lg ${theme.glassBg} ${theme.borderColor} border`}>
                  <div className="text-orange-400 font-mono font-medium text-sm">Extended SVI</div>
                  <div className={`${theme.textMuted} text-xs font-clean`}>Advanced parameterization</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* View Selector */}
        <Card className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border`}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${theme.text}`}>
              🎯 Analysis Views
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {views.map((view) => (
                <motion.div
                  key={view.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    activeView === view.id
                      ? `bg-gradient-to-r ${view.color} text-white`
                      : `${theme.glassBg} ${theme.borderColor} border hover:border-opacity-50`
                  }`}
                  onClick={() => setActiveView(view.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-xl">{view.icon}</div>
                    <div className="flex-1">
                      <div className={`font-medium text-sm ${activeView === view.id ? 'text-white' : theme.text}`}>
                        {view.name}
                      </div>
                      <div className={`text-xs ${activeView === view.id ? 'text-white/80' : theme.textMuted}`}>
                        {view.id.replace('_', ' ')}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className={`p-3 rounded-lg ${theme.glassBg} ${theme.borderColor} border`}>
              <div className={`text-sm font-medium mb-2 ${theme.text}`}>{currentView.name}</div>
              <div className={`text-xs ${theme.textMuted} leading-relaxed`}>
                {currentView.description}
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={() => fetchData(activeView)}
                disabled={isLoading}
                className={`w-full bg-gradient-to-r ${currentView.color} transition-all duration-300 hover:shadow-lg`}
              >
                {isLoading ? (
                  <>
                    <motion.div
                      className="rounded-full h-4 w-4 border-b-2 border-white mr-2"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    ></motion.div>
                    Loading...
                  </>
                ) : (
                  <>
                    <motion.div
                      className="mr-2"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      {currentView.icon}
                    </motion.div>
                    Refresh {currentView.name}
                  </>
                )}
              </Button>
            </motion.div>
          </CardContent>
        </Card>

        {/* Main Chart Area */}
        <Card className={`xl:col-span-3 ${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border`}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${theme.text}`}>
              <BarChart3 className="w-5 h-5" />
              {currentView.name}
              {apiMetrics && (
                <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                  {apiMetrics.responseTime}ms
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-4 border-red-500/50 bg-red-500/10">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-red-400">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {isLoading ? (
              <div className="flex items-center justify-center h-96">
                <motion.div
                  className="rounded-full h-12 w-12 border-b-2 border-primary"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                ></motion.div>
              </div>
            ) : chartData.length > 0 ? (
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  {activeView === 'atm_curve' && (
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
                      <XAxis
                        dataKey="expiry"
                        stroke={isDark ? '#ffffff' : '#374151'}
                        fontSize={12}
                        tickFormatter={(value) => value.toFixed(2)}
                        tick={{ fill: isDark ? '#ffffff' : '#374151' }}
                      />
                      <YAxis
                        stroke={isDark ? '#ffffff' : '#374151'}
                        fontSize={12}
                        tickFormatter={(value) => (value * 100).toFixed(1) + '%'}
                        tick={{ fill: isDark ? '#ffffff' : '#374151' }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: isDark ? '#1f2937' : '#ffffff',
                          border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                          borderRadius: '8px',
                          color: isDark ? '#ffffff' : '#374151'
                        }}
                        formatter={(value: number) => [(value * 100).toFixed(2) + '%', '']}
                        labelFormatter={(label) => `Expiry: ${Number(label).toFixed(2)} years`}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="interpolated"
                        stroke="#3B82F6"
                        strokeWidth={2}
                        name="Interpolated Volatility"
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="market"
                        stroke="#10B981"
                        strokeWidth={2}
                        name="Market Data"
                        connectNulls={false}
                        dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  )}

                  {activeView === 'models_comparison' && (
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
                      <XAxis
                        dataKey="strike_ratio"
                        stroke={isDark ? '#ffffff' : '#374151'}
                        fontSize={12}
                        tickFormatter={(value) => value.toFixed(2)}
                        tick={{ fill: isDark ? '#ffffff' : '#374151' }}
                      />
                      <YAxis
                        stroke={isDark ? '#ffffff' : '#374151'}
                        fontSize={12}
                        tickFormatter={(value) => (value * 100).toFixed(1) + '%'}
                        tick={{ fill: isDark ? '#ffffff' : '#374151' }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: isDark ? '#1f2937' : '#ffffff',
                          border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                          borderRadius: '8px',
                          color: isDark ? '#ffffff' : '#374151'
                        }}
                        formatter={(value: number) => [(value * 100).toFixed(2) + '%', '']}
                        labelFormatter={(label) => `Strike Ratio: ${Number(label).toFixed(2)}`}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="call_put" stroke="#3B82F6" strokeWidth={2} name="Call/Put Variance" dot={false} />
                      <Line type="monotone" dataKey="instrument" stroke="#10B981" strokeWidth={2} name="Instrument Vol" dot={false} />
                      <Line type="monotone" dataKey="delta" stroke="#8B5CF6" strokeWidth={2} name="Delta (Fixed Strike)" dot={false} />
                      <Line type="monotone" dataKey="svi" stroke="#EF4444" strokeWidth={2} name="Extended SVI" dot={false} />
                    </LineChart>
                  )}

                  {activeView === 'market_data' && (
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
                      <XAxis
                        dataKey="tenor"
                        stroke={isDark ? '#ffffff' : '#374151'}
                        fontSize={12}
                        tick={{ fill: isDark ? '#ffffff' : '#374151' }}
                      />
                      <YAxis
                        stroke={isDark ? '#ffffff' : '#374151'}
                        fontSize={12}
                        tickFormatter={(value) => (value * 100).toFixed(1) + '%'}
                        tick={{ fill: isDark ? '#ffffff' : '#374151' }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: isDark ? '#1f2937' : '#ffffff',
                          border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                          borderRadius: '8px',
                          color: isDark ? '#ffffff' : '#374151'
                        }}
                        formatter={(value: number) => [(value * 100).toFixed(2) + '%', 'ATM Volatility']}
                        labelFormatter={(label) => `Tenor: ${label}`}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="volatility"
                        stroke="#8B5CF6"
                        strokeWidth={2}
                        name="ATM Volatility"
                        dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <div className="text-4xl mb-4">📊</div>
                  <div className={`${theme.textMuted} mb-2`}>No data available</div>
                  <div className={`${theme.textMuted} text-sm`}>Click refresh to load {currentView.name}</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* API Metrics */}
      {apiMetrics && (
        <Card className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border`}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${theme.text} font-corporate`}>
              <Activity className="w-5 h-5" />
              API Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className={`p-3 rounded-lg ${theme.glassBg} ${theme.borderColor} border text-center`}>
                <div className="text-blue-400 font-clean font-medium text-sm">Response Time</div>
                <div className={`${theme.text} text-lg font-mono font-bold tracking-wider`}>{apiMetrics.responseTime}ms</div>
              </div>
              <div className={`p-3 rounded-lg ${theme.glassBg} ${theme.borderColor} border text-center`}>
                <div className="text-green-400 font-clean font-medium text-sm">Operation</div>
                <div className={`${theme.text} text-lg font-code font-bold`}>{apiMetrics.operation}</div>
              </div>
              <div className={`p-3 rounded-lg ${theme.glassBg} ${theme.borderColor} border text-center`}>
                <div className="text-purple-400 font-clean font-medium text-sm">Version</div>
                <div className={`${theme.text} text-lg font-mono font-bold`}>{apiMetrics.version}</div>
              </div>
              <div className={`p-3 rounded-lg ${theme.glassBg} ${theme.borderColor} border text-center`}>
                <div className="text-orange-400 font-clean font-medium text-sm">Status</div>
                <div className="flex items-center justify-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className={`${theme.text} text-sm font-mono font-bold`}>Success</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FXVolatilityModel;
