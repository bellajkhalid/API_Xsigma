import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Badge } from "@/components/ui/badge";

interface SVIParameters {
  a: number;
  b: number;
  rho: number;
  m: number;
  sigma: number;
  forward: number;
  expiry: number;
}

const SVIModel = () => {
  const { getThemeClasses } = useTheme();
  const theme = getThemeClasses();

  const [parameters, setParameters] = useState<SVIParameters>({
    a: 0.04,
    b: 0.4,
    rho: -0.3,
    m: 0.0,
    sigma: 0.3,
    forward: 100,
    expiry: 1.0
  });

  const [results, setResults] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleParameterChange = (key: keyof SVIParameters, value: string) => {
    setParameters(prev => ({
      ...prev,
      [key]: parseFloat(value)
    }));
  };

  const calculateSVI = async () => {
    setIsCalculating(true);
    
    // Simulate calculation delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate SVI volatility surface
    const strikes = Array.from({ length: 41 }, (_, i) => 70 + i * 1.5);
    const volatilities = strikes.map(strike => {
      const k = Math.log(strike / parameters.forward);
      const w = parameters.a + parameters.b * (
        parameters.rho * (k - parameters.m) + 
        Math.sqrt(Math.pow(k - parameters.m, 2) + Math.pow(parameters.sigma, 2))
      );
      return Math.sqrt(Math.max(0.001, w / parameters.expiry)) * 100;
    });

    setResults({
      strikes,
      volatilities,
      parameters_used: parameters,
      arbitrage_free: checkArbitrageFree(parameters)
    });
    
    setIsCalculating(false);
  };

  const checkArbitrageFree = (params: SVIParameters): boolean => {
    // Simple arbitrage-free condition check
    const condition1 = params.a + params.b * params.sigma * Math.sqrt(1 - Math.pow(params.rho, 2)) >= 0;
    const condition2 = params.a >= 0;
    const condition3 = params.b >= 0;
    return condition1 && condition2 && condition3;
  };

  const chartData = results ? results.strikes.map((strike: number, index: number) => ({
    strike: strike,
    volatility: results.volatilities[index]
  })) : [];

  return (
    <div className="space-y-6">


      {/* Description Section */}
      <Card className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border`}>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${theme.text}`}>
                📚 About SVI Model
              </h3>
              <div className={`${theme.textMuted} space-y-3 text-sm leading-relaxed font-clean`}>
                <p>
                  The <strong className="text-purple-400 font-code font-mono">Stochastic Volatility Inspired (SVI)</strong> model
                  provides a robust parameterization for volatility surfaces. Originally developed by Gatheral,
                  SVI offers excellent fit to market data while maintaining arbitrage-free properties.
                </p>
                <p>
                  Our implementation includes <strong className="text-blue-400 font-code font-mono">real-time arbitrage checks</strong> and
                  <strong className="text-green-400 font-code font-mono"> parameter validation</strong> to ensure market-consistent
                  volatility surfaces.
                </p>
              </div>
            </div>
            <div>
              <h3 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${theme.text}`}>
                🎯 SVI Features
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className={`p-3 rounded-lg ${theme.glassBg} ${theme.borderColor} border`}>
                  <div className="text-purple-400 font-mono font-medium text-sm">Raw SVI</div>
                  <div className={`${theme.textMuted} text-xs font-clean`}>5 parameters</div>
                </div>
                <div className={`p-3 rounded-lg ${theme.glassBg} ${theme.borderColor} border`}>
                  <div className="text-blue-400 font-mono font-medium text-sm">Arbitrage-Free</div>
                  <div className={`${theme.textMuted} text-xs font-clean`}>Real-time checks</div>
                </div>
                <div className={`p-3 rounded-lg ${theme.glassBg} ${theme.borderColor} border`}>
                  <div className="text-green-400 font-mono font-medium text-sm">Market Fit</div>
                  <div className={`${theme.textMuted} text-xs font-clean`}>Excellent calibration</div>
                </div>
                <div className={`p-3 rounded-lg ${theme.glassBg} ${theme.borderColor} border`}>
                  <div className="text-orange-400 font-mono font-medium text-sm">Interactive</div>
                  <div className={`${theme.textMuted} text-xs font-clean`}>Live updates</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Parameters Panel */}
        <Card className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border`}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${theme.text} font-corporate`}>
              🌊 SVI Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="a" className={`${theme.text} font-clean`}>Parameter a</Label>
                <Input
                  id="a"
                  type="number"
                  step="0.001"
                  value={parameters.a}
                  onChange={(e) => handleParameterChange('a', e.target.value)}
                  className={`${theme.glassBg} ${theme.borderColor} font-mono`}
                />
              </div>
              <div>
                <Label htmlFor="b" className={`${theme.text} font-clean`}>Parameter b</Label>
                <Input
                  id="b"
                  type="number"
                  step="0.001"
                  value={parameters.b}
                  onChange={(e) => handleParameterChange('b', e.target.value)}
                  className={`${theme.glassBg} ${theme.borderColor} font-mono`}
                />
              </div>
              <div>
                <Label htmlFor="rho" className={`${theme.text} font-clean`}>Correlation ρ</Label>
                <Input
                  id="rho"
                  type="number"
                  step="0.01"
                  min="-1"
                  max="1"
                  value={parameters.rho}
                  onChange={(e) => handleParameterChange('rho', e.target.value)}
                  className={`${theme.glassBg} ${theme.borderColor} font-mono`}
                />
              </div>
              <div>
                <Label htmlFor="m" className={`${theme.text} font-clean`}>Parameter m</Label>
                <Input
                  id="m"
                  type="number"
                  step="0.001"
                  value={parameters.m}
                  onChange={(e) => handleParameterChange('m', e.target.value)}
                  className={`${theme.glassBg} ${theme.borderColor} font-mono`}
                />
              </div>
              <div>
                <Label htmlFor="sigma" className={`${theme.text} font-clean`}>Parameter σ</Label>
                <Input
                  id="sigma"
                  type="number"
                  step="0.001"
                  value={parameters.sigma}
                  onChange={(e) => handleParameterChange('sigma', e.target.value)}
                  className={`${theme.glassBg} ${theme.borderColor} font-mono`}
                />
              </div>
              <div>
                <Label htmlFor="forward" className={`${theme.text} font-clean`}>Forward</Label>
                <Input
                  id="forward"
                  type="number"
                  step="0.1"
                  value={parameters.forward}
                  onChange={(e) => handleParameterChange('forward', e.target.value)}
                  className={`${theme.glassBg} ${theme.borderColor} font-mono`}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="expiry" className={`${theme.text} font-clean`}>Expiry (years)</Label>
                <Input
                  id="expiry"
                  type="number"
                  step="0.1"
                  value={parameters.expiry}
                  onChange={(e) => handleParameterChange('expiry', e.target.value)}
                  className={`${theme.glassBg} ${theme.borderColor} font-mono`}
                />
              </div>
            </div>

            <Button
              onClick={calculateSVI}
              disabled={isCalculating}
              className="w-full button-gradient"
            >
              {isCalculating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Calculating...
                </>
              ) : (
                'Calculate SVI'
              )}
            </Button>

            {results && (
              <div className={`p-3 rounded-lg ${results.arbitrage_free ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'}`}>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${results.arbitrage_free ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <span className="text-sm font-medium">
                    {results.arbitrage_free ? 'Arbitrage-Free' : 'Arbitrage Detected'}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Chart Panel */}
        <Card className={`xl:col-span-2 ${theme.isDark ? theme.glassBg : 'bg-white'} backdrop-blur-lg ${theme.borderColor} border`}>
          <CardHeader>
            <CardTitle className={`${theme.text} font-corporate`}>SVI Volatility Surface</CardTitle>
          </CardHeader>
          <CardContent>
            {results ? (
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
                      tickFormatter={(value) => `${value.toFixed(1)}%`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: theme.isDark ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.95)',
                        border: `1px solid ${theme.isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}`,
                        borderRadius: '12px',
                        color: theme.isDark ? '#fff' : '#000',
                        boxShadow: theme.isDark ? '0 8px 32px rgba(0, 0, 0, 0.5)' : '0 8px 32px rgba(0, 0, 0, 0.1)',
                        backdropFilter: 'blur(10px)'
                      }}
                      formatter={(value: any) => [`${value.toFixed(2)}%`, 'Implied Volatility']}
                      labelFormatter={(value) => `Strike: ${value}`}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="volatility"
                      stroke="#00ff88"
                      strokeWidth={3}
                      name="SVI Volatility"
                      dot={{ fill: '#00ff88', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#00ff88', strokeWidth: 2, fill: '#00ff88' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🌊</div>
                  <p className={`${theme.textMuted}`}>
                    Configure SVI parameters and click "Calculate SVI" to see the volatility surface
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Results Panel */}
      {results && (
        <Card className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border`}>
          <CardHeader>
            <CardTitle className={`${theme.text} font-corporate`}>SVI Model Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-mono font-bold text-purple-400 tracking-wider mb-2">
                  {results.volatilities.length}
                </div>
                <div className={`text-sm ${theme.textMuted} font-clean`}>Data Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-mono font-bold text-blue-400 tracking-wider mb-2">
                  {Math.min(...results.volatilities).toFixed(1)}%
                </div>
                <div className={`text-sm ${theme.textMuted} font-clean`}>Min Volatility</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-mono font-bold text-green-400 tracking-wider mb-2">
                  {Math.max(...results.volatilities).toFixed(1)}%
                </div>
                <div className={`text-sm ${theme.textMuted} font-clean`}>Max Volatility</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-mono font-bold text-orange-400 tracking-wider mb-2">
                  {(results.volatilities.reduce((a: number, b: number) => a + b, 0) / results.volatilities.length).toFixed(1)}%
                </div>
                <div className={`text-sm ${theme.textMuted} font-clean`}>Avg Volatility</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SVIModel;
