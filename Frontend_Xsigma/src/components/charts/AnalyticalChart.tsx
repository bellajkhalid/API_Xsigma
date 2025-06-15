import { motion } from "framer-motion";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import { useTheme } from "@/contexts/ThemeContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface AnalyticalChartProps {
  data: any[];
  title: string;
  icon: string;
  primaryKey: string;
  primaryLabel: string;
  yAxisFormatter?: (value: number) => string;
  tooltipFormatter?: (value: number) => string;
  showCurrencyButtons?: boolean;
  currencies?: string[];
  selectedCurrency?: string;
  onCurrencyChange?: (currency: string) => void;
}

const AnalyticalChart = ({
  data,
  title,
  icon,
  primaryKey,
  primaryLabel,
  yAxisFormatter = (value: number) => value.toFixed(3),
  tooltipFormatter = (value: number) => value.toFixed(4),
  showCurrencyButtons = false,
  currencies = ['USD', 'EUR', 'GBP'],
  selectedCurrency = 'USD',
  onCurrencyChange
}: AnalyticalChartProps) => {
  const { getThemeClasses } = useTheme();
  const theme = getThemeClasses();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div 
          className="p-3 rounded-xl border shadow-lg"
          style={{
            backgroundColor: theme.isDark ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.95)',
            border: `1px solid ${theme.isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}`,
            backdropFilter: 'blur(10px)',
            fontFamily: 'Inter, sans-serif'
          }}
        >
          <p className={`text-sm font-medium ${theme.text}`}>
            {label}
          </p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ${tooltipFormatter(entry.value)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-2xl border"
      style={{
        background: theme.isDark 
          ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 50%, rgba(15, 23, 42, 0.9) 100%)'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 50%, rgba(255, 255, 255, 0.95) 100%)',
        borderColor: theme.isDark ? 'rgba(0, 255, 136, 0.3)' : 'rgba(0, 0, 0, 0.1)',
        borderWidth: '2px',
        fontFamily: 'Inter, sans-serif'
      }}
    >
      {/* Gradient Border Effect */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-50"
        style={{
          background: theme.isDark 
            ? 'linear-gradient(135deg, rgba(0, 255, 136, 0.1) 0%, transparent 50%, rgba(0, 255, 136, 0.05) 100%)'
            : 'linear-gradient(135deg, rgba(0, 0, 0, 0.05) 0%, transparent 50%, rgba(0, 0, 0, 0.02) 100%)',
          pointerEvents: 'none'
        }}
      />

      {/* Header */}
      <div className="relative z-10 p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
              style={{
                background: 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
                color: '#000'
              }}
            >
              {icon}
            </div>
            <h3 className={`text-xl font-semibold ${theme.text}`} style={{ fontFamily: 'Inter, sans-serif' }}>
              {title}
            </h3>
          </div>
          
          <Badge 
            variant="secondary" 
            className="bg-green-500/20 text-green-400 border-green-500/30"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Live Data
          </Badge>
        </div>

        {/* Currency Buttons */}
        {showCurrencyButtons && (
          <div className="flex gap-2 mb-4">
            {currencies.map((currency) => (
              <Button
                key={currency}
                variant={selectedCurrency === currency ? "default" : "outline"}
                size="sm"
                onClick={() => onCurrencyChange?.(currency)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${selectedCurrency === currency 
                    ? 'bg-green-500 text-black border-green-500 shadow-lg shadow-green-500/25' 
                    : `${theme.buttonOutline} hover:border-green-500/50 hover:text-green-400`
                  }
                `}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {currency}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Chart Container */}
      <div className="relative z-10 h-80 px-6 pb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00ff88" stopOpacity={0.3}/>
                <stop offset="100%" stopColor="#00ff88" stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={theme.isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} 
            />
            
            <XAxis
              dataKey="x"
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: theme.isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)', 
                fontSize: 12,
                fontFamily: 'Inter, sans-serif'
              }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: theme.isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)', 
                fontSize: 12,
                fontFamily: 'Inter, sans-serif'
              }}
              tickFormatter={yAxisFormatter}
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            <Line
              type="monotone"
              dataKey={primaryKey}
              stroke="#00ff88"
              strokeWidth={3}
              name={primaryLabel}
              dot={{ fill: '#00ff88', strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, stroke: '#00ff88', strokeWidth: 3, fill: '#00ff88' }}
              animationDuration={2000}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default AnalyticalChart;
