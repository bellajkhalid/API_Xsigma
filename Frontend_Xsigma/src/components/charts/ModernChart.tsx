import { motion } from "framer-motion";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart } from 'recharts';
import { useTheme } from "@/contexts/ThemeContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ModernChartProps {
  data: any[];
  title: string;
  icon: string;
  primaryKey: string;
  secondaryKey?: string;
  primaryLabel: string;
  secondaryLabel?: string;
  primaryColor?: string;
  secondaryColor?: string;
  yAxisFormatter?: (value: number) => string;
  tooltipFormatter?: (value: number) => string;
  showTimeButtons?: boolean;
}

const ModernChart = ({
  data,
  title,
  icon,
  primaryKey,
  secondaryKey,
  primaryLabel,
  secondaryLabel,
  primaryColor = "#00ff88",
  secondaryColor = "#ffa502",
  yAxisFormatter = (value: number) => value.toFixed(3),
  tooltipFormatter = (value: number) => value.toFixed(4),
  showTimeButtons = true
}: ModernChartProps) => {
  const { getThemeClasses } = useTheme();
  const theme = getThemeClasses();
  const [selectedTimeframe, setSelectedTimeframe] = useState('Real-time');
  const [chartType, setChartType] = useState<'line' | 'area'>('line');

  const timeframes = ['Real-time', '1D', '1W', '1M'];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-900/95 backdrop-blur-lg border border-gray-700/50 rounded-xl p-4 shadow-2xl"
        >
          <p className="text-gray-300 text-sm mb-2">Strike: {label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-white text-sm font-medium">
                {entry.name}: {tooltipFormatter(entry.value)}
              </span>
            </div>
          ))}
        </motion.div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 rounded-2xl ${
        theme.isDark
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
          : 'bg-gradient-to-br from-white via-gray-50 to-white'
      }`}></div>
      <div className={`absolute inset-0 rounded-2xl ${
        theme.isDark
          ? 'bg-gradient-to-t from-green-500/5 via-transparent to-blue-500/5'
          : 'bg-gradient-to-t from-green-500/3 via-transparent to-blue-500/3'
      }`}></div>

      {/* Main Container */}
      <div className={`relative backdrop-blur-lg rounded-2xl p-6 overflow-hidden ${
        theme.isDark
          ? 'bg-gray-900/80 border border-gray-700/50'
          : 'bg-white/90 border border-gray-200/50'
      }`}>
        
        {/* Animated Background Elements */}
        <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl ${
          theme.isDark
            ? 'bg-gradient-to-br from-green-500/10 to-transparent'
            : 'bg-gradient-to-br from-green-500/5 to-transparent'
        }`}></div>
        <div className={`absolute bottom-0 left-0 w-24 h-24 rounded-full blur-2xl ${
          theme.isDark
            ? 'bg-gradient-to-tr from-blue-500/10 to-transparent'
            : 'bg-gradient-to-tr from-blue-500/5 to-transparent'
        }`}></div>
        
        {/* Header */}
        <div className="relative z-10 flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center text-xl shadow-lg"
            >
              {icon}
            </motion.div>
            <div>
              <h3 className={`text-xl font-bold ${theme.text}`}>{title}</h3>
              <p className={`text-sm ${theme.textMuted}`}>Advanced Analytics</p>
            </div>
          </div>
          
          {/* Chart Type Toggle */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setChartType(chartType === 'line' ? 'area' : 'line')}
              className={`text-xs ${chartType === 'line' ? 'bg-green-500/20 text-green-400' : theme.textMuted} hover:bg-green-500/30`}
            >
              {chartType === 'line' ? '📈' : '📊'}
            </Button>
          </div>
        </div>

        {/* Time Frame Buttons */}
        {showTimeButtons && (
          <div className="relative z-10 flex items-center gap-2 mb-6">
            {timeframes.map((timeframe) => (
              <motion.button
                key={timeframe}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedTimeframe === timeframe
                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                    : theme.isDark
                      ? 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-gray-300'
                      : 'bg-gray-100/50 text-gray-600 hover:bg-gray-200/50 hover:text-gray-700'
                }`}
              >
                {timeframe}
              </motion.button>
            ))}
          </div>
        )}

        {/* Chart Container */}
        <div className="relative z-10 h-80">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'line' ? (
              <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <defs>
                  <linearGradient id="primaryGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={primaryColor} stopOpacity={0.3}/>
                    <stop offset="100%" stopColor={primaryColor} stopOpacity={0}/>
                  </linearGradient>
                  {secondaryKey && (
                    <linearGradient id="secondaryGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={secondaryColor} stopOpacity={0.3}/>
                      <stop offset="100%" stopColor={secondaryColor} stopOpacity={0}/>
                    </linearGradient>
                  )}
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                <XAxis
                  dataKey="strike"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: theme.isDark ? '#9CA3AF' : '#6B7280', fontSize: 12 }}
                  tickFormatter={(value) => value.toFixed(1)}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: theme.isDark ? '#9CA3AF' : '#6B7280', fontSize: 12 }}
                  tickFormatter={yAxisFormatter}
                />
                
                <Tooltip content={<CustomTooltip />} />
                
                <Line
                  type="monotone"
                  dataKey={primaryKey}
                  stroke={primaryColor}
                  strokeWidth={3}
                  name={primaryLabel}
                  dot={false}
                  filter="url(#glow)"
                  animationDuration={2000}
                />
                
                {secondaryKey && (
                  <Line
                    type="monotone"
                    dataKey={secondaryKey}
                    stroke={secondaryColor}
                    strokeWidth={2}
                    name={secondaryLabel}
                    dot={false}
                    strokeDasharray="8 4"
                    animationDuration={2000}
                    animationBegin={300}
                  />
                )}
              </LineChart>
            ) : (
              <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={primaryColor} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={primaryColor} stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                
                <XAxis
                  dataKey="strike"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: theme.isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)', fontSize: 12 }}
                  tickFormatter={(value) => value.toFixed(1)}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: theme.isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)', fontSize: 12 }}
                  tickFormatter={yAxisFormatter}
                />
                
                <Tooltip content={<CustomTooltip />} />
                
                <Area
                  type="monotone"
                  dataKey={primaryKey}
                  stroke={primaryColor}
                  fill="url(#areaGradient)"
                  strokeWidth={3}
                  name={primaryLabel}
                  animationDuration={2000}
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="relative z-10 flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: primaryColor }}
            ></motion.div>
            <span className={`text-sm ${theme.textMuted}`}>{primaryLabel}</span>
          </div>
          {secondaryKey && (
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: secondaryColor }}
              ></motion.div>
              <span className={`text-sm ${theme.textMuted}`}>{secondaryLabel}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ModernChart;
