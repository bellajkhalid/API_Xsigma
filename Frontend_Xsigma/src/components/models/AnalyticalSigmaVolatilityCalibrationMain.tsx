import React from 'react';
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Clock, Zap, TrendingUp, Settings, BarChart3 } from "lucide-react";

const AnalyticalSigmaVolatilityCalibrationMain: React.FC = () => {
  const { getThemeClasses } = useTheme();
  const theme = getThemeClasses();

  const calibrationTypes = [
    {
      id: 'volatility_asv',
      name: 'ASV Volatility',
      description: 'Analytical Sigma Volatility model calibration with implied volatilities',
      icon: '📈',
      color: 'from-blue-500 to-blue-600',
      features: ['Market Data Calibration', 'Implied Volatility Curves', 'Real-time Calculation']
    },
    {
      id: 'density',
      name: 'Density Function',
      description: 'Computes probability density functions based on calibrated model',
      icon: '🌊',
      color: 'from-green-500 to-green-600',
      features: ['Probability Density', 'Risk-neutral Measure', 'Distribution Analysis']
    },
    {
      id: 'volatility_svi',
      name: 'SVI Volatility',
      description: 'Stochastic Volatility Inspired model calibration',
      icon: '⚡',
      color: 'from-purple-500 to-purple-600',
      features: ['SVI Parameterization', 'Arbitrage-free Surfaces', 'Extended SVI']
    },
    {
      id: 'dynamic_asv',
      name: 'Dynamic ASV',
      description: 'Interactive ASV model with real-time parameter sliders',
      icon: '🎛️',
      color: 'from-cyan-500 to-cyan-600',
      features: ['Interactive Sliders', 'Real-time Updates', 'Parameter Sensitivity']
    },
    {
      id: 'dynamic_svi',
      name: 'Dynamic SVI',
      description: 'Interactive SVI model with real-time parameter sliders',
      icon: '🎚️',
      color: 'from-orange-500 to-orange-600',
      features: ['Dynamic Parameters', 'Live Visualization', 'Instant Feedback']
    }
  ];

  const keyFeatures = [
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Real-time Calibration",
      description: "Advanced calibration algorithms with instant parameter adjustment and live visualization updates.",
      color: "text-blue-400"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Performance Optimized",
      description: "High-performance computing with caching strategies for sub-millisecond response times.",
      color: "text-green-400"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Interactive Models",
      description: "Dynamic parameter sliders with automatic graph updates for immediate visual feedback.",
      color: "text-yellow-400"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Market Integration",
      description: "Direct integration with market data sources for real-world calibration scenarios.",
      color: "text-purple-400"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Main Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >

      </motion.div>

      {/* About Section */}
      <Card className={`${theme.isDark ? theme.glassBg : 'bg-white'} backdrop-blur-lg ${theme.borderColor} border`}>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className={`text-2xl font-corporate font-semibold mb-4 flex items-center gap-3 ${theme.text}`}>
                📚 About ASV Calibration
              </h3>
              <div className={`${theme.textMuted} space-y-4 text-base leading-relaxed font-clean`}>
                <p>
                  The <strong className="text-cyan-400 font-mono">ASV Calibration Suite</strong> provides 
                  comprehensive volatility model calibration for analytical sigma volatility models using 
                  advanced mathematical frameworks including dynamic parameter adjustment and real-time visualization.
                </p>
                <p>
                  Our implementation supports <strong className="text-blue-400 font-code">5 calibration methods</strong>: 
                  ASV Volatility, Density Functions, SVI Volatility, and Dynamic Interactive Models (ASV & SVI) 
                  for robust <strong className="text-green-400 font-mono">real-time calibration</strong>.
                </p>
                <p>
                  Each calibration type is optimized for specific use cases, from market data fitting to 
                  interactive parameter exploration with immediate visual feedback.
                </p>
              </div>
            </div>
            <div>
              <h3 className={`text-2xl font-corporate font-semibold mb-4 flex items-center gap-3 ${theme.text}`}>
                🎯 Key Features
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {keyFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg ${theme.isDark ? theme.glassBg : 'bg-gray-50'} ${theme.borderColor} border`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`${feature.color} mt-1`}>
                        {feature.icon}
                      </div>
                      <div>
                        <div className={`font-mono font-medium text-sm ${theme.text}`}>{feature.title}</div>
                        <div className={`${theme.textMuted} text-xs font-clean mt-1`}>{feature.description}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calibration Types Grid */}
      <div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`text-3xl font-corporate font-bold mb-6 ${theme.text} text-center`}
        >
          Calibration Methods
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calibrationTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Card className={`${theme.isDark ? theme.glassBg : 'bg-white'} backdrop-blur-lg ${theme.borderColor} border hover:border-primary/50 transition-all duration-300 h-full`}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-3 ${theme.text} font-corporate`}>
                    <div className={`text-2xl p-2 rounded-lg bg-gradient-to-r ${type.color} text-white`}>
                      {type.icon}
                    </div>
                    <div>
                      <div className="text-lg">{type.name}</div>
                      <Badge variant="outline" className={`bg-gradient-to-r ${type.color} text-white border-none text-xs`}>
                        {type.id}
                      </Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`${theme.textMuted} text-sm font-clean mb-4 leading-relaxed`}>
                    {type.description}
                  </p>
                  <div className="space-y-2">
                    {type.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-[#22c55e]"></div>
                        <span className={`${theme.textMuted} text-xs font-clean`}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Technical Specifications */}
      <Card className={`${theme.isDark ? theme.glassBg : 'bg-white'} backdrop-blur-lg ${theme.borderColor} border`}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-3 ${theme.text} font-corporate`}>
            <Settings className="w-6 h-6" />
            Technical Specifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className={`p-4 rounded-lg ${theme.isDark ? theme.glassBg : 'bg-gray-50'} ${theme.borderColor} border`}>
              <div className="text-cyan-400 font-mono font-medium text-sm">Calibration Engine</div>
              <div className={`${theme.textMuted} text-xs font-clean mt-1`}>Ceres Solver with Extended SVI</div>
            </div>
            <div className={`p-4 rounded-lg ${theme.isDark ? theme.glassBg : 'bg-gray-50'} ${theme.borderColor} border`}>
              <div className="text-blue-400 font-mono font-medium text-sm">Performance</div>
              <div className={`${theme.textMuted} text-xs font-clean mt-1`}>Sub-millisecond response times</div>
            </div>
            <div className={`p-4 rounded-lg ${theme.isDark ? theme.glassBg : 'bg-gray-50'} ${theme.borderColor} border`}>
              <div className="text-green-400 font-mono font-medium text-sm">Data Points</div>
              <div className={`${theme.textMuted} text-xs font-clean mt-1`}>Up to 2000 calibration points</div>
            </div>
            <div className={`p-4 rounded-lg ${theme.isDark ? theme.glassBg : 'bg-gray-50'} ${theme.borderColor} border`}>
              <div className="text-purple-400 font-mono font-medium text-sm">Visualization</div>
              <div className={`${theme.textMuted} text-xs font-clean mt-1`}>Real-time interactive charts</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Hint */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className={`text-center p-6 rounded-lg ${theme.isDark ? theme.glassBg : 'bg-gray-50'} ${theme.borderColor} border`}
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <BarChart3 className="w-6 h-6 text-primary" />
          <span className={`${theme.text} font-corporate font-medium`}>Ready to Start Calibrating?</span>
        </div>
        <p className={`${theme.textMuted} text-sm font-clean`}>
          Select a calibration method from the sidebar to begin interactive model calibration with real-time parameter adjustment.
        </p>
      </motion.div>
    </div>
  );
};

export default AnalyticalSigmaVolatilityCalibrationMain;
