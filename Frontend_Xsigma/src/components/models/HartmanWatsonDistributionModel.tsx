import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Calculator, Settings, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface HartmanWatsonParams {
  n: number;
  t: number;
  size_roots: number;
  x_0: number;
  x_n: number;
  distribution_type: string;
}

interface TestCase {
  id: number;
  name: string;
  description: string;
  parameters: HartmanWatsonParams;
}

interface CalculationResult {
  x_points: number[];
  distribution_values: number[];
  parameters: HartmanWatsonParams;
  metadata: {
    calculation_type: string;
    timestamp: string;
    data_points: number;
  };
}

const HartmanWatsonDistributionModel: React.FC = () => {
  const navigate = useNavigate();
  const [params, setParams] = useState<HartmanWatsonParams>({
    n: 64,
    t: 0.5,
    size_roots: 32,
    x_0: -5.0,
    x_n: 3.1,
    distribution_type: 'MIXTURE'
  });
  
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [selectedTestCase, setSelectedTestCase] = useState<number>(1);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Theme configuration
  const theme = {
    glassBg: 'bg-white/10 dark:bg-gray-900/10',
    borderColor: 'border-gray-200/20 dark:border-gray-700/20',
    text: 'text-gray-900 dark:text-white',
    mutedText: 'text-gray-600 dark:text-gray-400'
  };

  // Load test cases on component mount
  useEffect(() => {
    fetchTestCases();
  }, []);

  const fetchTestCases = async () => {
    try {
      const response = await fetch('http://localhost:5005/api/hartman-watson/test-cases');
      const data = await response.json();
      
      if (data.success && data.data.test_cases) {
        setTestCases(data.data.test_cases);
      }
    } catch (error) {
      console.error('Error fetching test cases:', error);
    }
  };

  const handleTestCaseChange = (testCaseId: number) => {
    setSelectedTestCase(testCaseId);
    const testCase = testCases.find(tc => tc.id === testCaseId);
    if (testCase) {
      setParams(testCase.parameters);
    }
  };

  const handleParameterChange = (key: keyof HartmanWatsonParams, value: string | number) => {
    setParams(prev => ({
      ...prev,
      [key]: typeof value === 'string' && key !== 'distribution_type' ? parseFloat(value) || 0 : value
    }));
  };

  const calculateDistribution = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:5005/api/hartman-watson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setResult(data.data);
      } else {
        setError(data.error || 'Calculation failed');
      }
    } catch (error) {
      setError('Network error occurred');
      console.error('Error calculating distribution:', error);
    } finally {
      setLoading(false);
    }
  };

  const currentTestCase = testCases.find(tc => tc.id === selectedTestCase);

  // Chart configuration
  const chartData = result ? {
    labels: result.x_points,
    datasets: [
      {
        label: 'Hartman Watson Distribution',
        data: result.distribution_values,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.1,
      },
    ],
  } : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgb(156, 163, 175)',
          font: {
            family: 'JetBrains Mono, monospace',
          },
        },
      },
      title: {
        display: true,
        text: 'Hartman Watson Distribution',
        color: 'rgb(156, 163, 175)',
        font: {
          family: 'IBM Plex Sans, sans-serif',
          size: 16,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'X Values',
          color: 'rgb(156, 163, 175)',
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
        },
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Distribution Values',
          color: 'rgb(156, 163, 175)',
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
        },
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 p-6">


      {/* About Section */}
      <Card className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border mb-6`}>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${theme.text}`}>
                📚 About Hartman Watson Distribution
              </h3>
              <div className={`${theme.textMuted} space-y-3 text-sm leading-relaxed`}>
                <p>
                  Our <strong className="text-blue-400">Hartman Watson Distribution</strong> provides
                  advanced probability distribution modeling using sophisticated mathematical techniques
                  including Gaussian quadrature integration and numerical optimization methods.
                </p>
                <p>
                  The implementation supports <strong className="text-green-400">multiple distribution types</strong>:
                  Classical and Mixture models with configurable parameters for
                  robust <strong className="text-purple-400">statistical analysis</strong>.
                </p>
              </div>
            </div>
            <div>
              <h3 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${theme.text}`}>
                🎯 Key Features
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className={`p-3 rounded-lg ${theme.glassBg} ${theme.borderColor} border`}>
                  <div className="text-blue-400 font-medium text-sm">Gaussian Quadrature</div>
                  <div className={`${theme.textMuted} text-xs`}>High-precision integration</div>
                </div>
                <div className={`p-3 rounded-lg ${theme.glassBg} ${theme.borderColor} border`}>
                  <div className="text-green-400 font-medium text-sm">2 Distribution Types</div>
                  <div className={`${theme.textMuted} text-xs`}>Classical & Mixture</div>
                </div>
                <div className={`p-3 rounded-lg ${theme.glassBg} ${theme.borderColor} border`}>
                  <div className="text-purple-400 font-medium text-sm">Real-time Calculation</div>
                  <div className={`${theme.textMuted} text-xs`}>Interactive parameters</div>
                </div>
                <div className={`p-3 rounded-lg ${theme.glassBg} ${theme.borderColor} border`}>
                  <div className="text-orange-400 font-medium text-sm">Configurable Range</div>
                  <div className={`${theme.textMuted} text-xs`}>Flexible X-axis bounds</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Control Panel */}
      <Card className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border mb-6`}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${theme.text} font-corporate`}>
            🎛️ Control Panel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-7 gap-4 items-end">
            {/* Parameters in single row */}
            <div>
              <Label htmlFor="n" className="text-sm font-medium">Data Points (n)</Label>
              <Input
                id="n"
                type="number"
                value={params.n}
                onChange={(e) => handleParameterChange('n', parseInt(e.target.value))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="t" className="text-sm font-medium">Time (t)</Label>
              <Input
                id="t"
                type="number"
                step="0.1"
                value={params.t}
                onChange={(e) => handleParameterChange('t', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="size_roots" className="text-sm font-medium">Quadrature Roots</Label>
              <Input
                id="size_roots"
                type="number"
                value={params.size_roots}
                onChange={(e) => handleParameterChange('size_roots', parseInt(e.target.value))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="x_0" className="text-sm font-medium">X Min</Label>
              <Input
                id="x_0"
                type="number"
                step="0.1"
                value={params.x_0}
                onChange={(e) => handleParameterChange('x_0', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="x_n" className="text-sm font-medium">X Max</Label>
              <Input
                id="x_n"
                type="number"
                step="0.1"
                value={params.x_n}
                onChange={(e) => handleParameterChange('x_n', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="distribution_type" className="text-sm font-medium">Distribution Type</Label>
              <Select value={params.distribution_type} onValueChange={(value) => handleParameterChange('distribution_type', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MIXTURE">Mixture</SelectItem>
                  <SelectItem value="CLASSICAL">Classical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Button
                onClick={calculateDistribution}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <Calculator className="w-4 h-4 mr-2" />
                {loading ? 'Calculating...' : 'Calculate'}
              </Button>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Chart Panel */}
      <Card className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border`}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${theme.text} font-corporate`}>
            📊 Distribution Visualization
          </CardTitle>
        </CardHeader>
        <CardContent>
          {result && chartData ? (
            <div className="h-96">
              <Line data={chartData} options={chartOptions} />
            </div>
          ) : (
            <div className="h-96 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  Click "Calculate Distribution" to generate the chart
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Test Cases Section */}
      <div className="mt-8">
        <Card className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border`}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${theme.text} font-corporate`}>
              🎯 Test Cases
            </CardTitle>
            <div className={`text-sm ${theme.textMuted} mt-2`}>
              Pre-configured test scenarios for Hartman Watson Distribution
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {testCases.map((testCase) => (
                <Card
                  key={testCase.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedTestCase === testCase.id
                      ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => handleTestCaseChange(testCase.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-lg font-bold">
                        {testCase.id}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-semibold text-sm mb-1 ${theme.text}`}>
                          {testCase.name}
                        </h4>
                        <p className={`text-xs ${theme.textMuted} leading-relaxed`}>
                          {testCase.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HartmanWatsonDistributionModel;
