import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FontShowcase = () => {
  const { getThemeClasses } = useTheme();
  const theme = getThemeClasses();

  const fontExamples = [
    {
      name: "Geist (Default)",
      class: "font-sans",
      description: "Clean, modern sans-serif for general UI",
      example: "The quick brown fox jumps over the lazy dog",
      numbers: "1234567890",
      usage: "Headers, body text, general UI"
    },
    {
      name: "Inter",
      class: "font-inter",
      description: "Highly readable, optimized for screens",
      example: "Advanced quantitative finance platform",
      numbers: "€1,234.56 | $9,876.54 | ¥123,456",
      usage: "Long-form text, descriptions"
    },
    {
      name: "JetBrains Mono",
      class: "font-mono",
      description: "Monospace with excellent number alignment",
      example: "volatility = 0.1234 | strike = 100.00",
      numbers: "123.456789 | 987.654321 | 555.000000",
      usage: "Data tables, metrics, parameters"
    },
    {
      name: "Fira Code",
      class: "font-code",
      description: "Code font with programming ligatures",
      example: "σ(K,T) = σ₀ + β·log(K/F) + γ·(log(K/F))²",
      numbers: "=> != >= <= === !== && ||",
      usage: "Mathematical formulas, code snippets"
    },
    {
      name: "IBM Plex Sans",
      class: "font-corporate",
      description: "Professional corporate typeface",
      example: "FX Volatility Models & Risk Analytics",
      numbers: "Risk: 2.34% | VaR: $1,234,567",
      usage: "Professional headers, corporate content"
    },
    {
      name: "Source Sans Pro",
      class: "font-clean",
      description: "Adobe's clean, versatile sans-serif",
      example: "Real-time market data & analytics",
      numbers: "Bid: 1.2345 | Ask: 1.2347 | Spread: 0.0002",
      usage: "Clean interfaces, modern layouts"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-corporate font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
          Typography Showcase
        </h2>
        <p className={`${theme.textSecondary} font-clean text-lg`}>
          Professional fonts optimized for financial applications
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {fontExamples.map((font, index) => (
          <motion.div
            key={font.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border hover:border-primary/50 transition-all duration-300`}>
              <CardHeader>
                <CardTitle className={`flex items-center justify-between ${theme.text}`}>
                  <span className="font-corporate">{font.name}</span>
                  <Badge variant="outline" className="font-mono text-xs">
                    {font.class}
                  </Badge>
                </CardTitle>
                <p className={`${theme.textMuted} text-sm font-clean`}>
                  {font.description}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Text Example */}
                <div>
                  <div className={`text-xs ${theme.textMuted} font-clean mb-2`}>Text Example:</div>
                  <div className={`${font.class} text-lg ${theme.text} leading-relaxed`}>
                    {font.example}
                  </div>
                </div>

                {/* Numbers Example */}
                <div>
                  <div className={`text-xs ${theme.textMuted} font-clean mb-2`}>Numbers & Symbols:</div>
                  <div className={`${font.class} text-base ${theme.text} tracking-wide`}>
                    {font.numbers}
                  </div>
                </div>

                {/* Usage */}
                <div>
                  <div className={`text-xs ${theme.textMuted} font-clean mb-2`}>Best for:</div>
                  <div className={`text-sm ${theme.textSecondary} font-clean italic`}>
                    {font.usage}
                  </div>
                </div>

                {/* Size Variations */}
                <div className="space-y-2">
                  <div className={`text-xs ${theme.textMuted} font-clean`}>Size Variations:</div>
                  <div className="space-y-1">
                    <div className={`${font.class} text-xs ${theme.textMuted}`}>12px - Small text</div>
                    <div className={`${font.class} text-sm ${theme.text}`}>14px - Body text</div>
                    <div className={`${font.class} text-base ${theme.text} font-medium`}>16px - Medium text</div>
                    <div className={`${font.class} text-lg ${theme.text} font-semibold`}>18px - Large text</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Financial Data Example */}
      <Card className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border`}>
        <CardHeader>
          <CardTitle className={`${theme.text} font-corporate`}>
            🏦 Analytix Data Example
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Market Data */}
            <div>
              <h4 className={`font-corporate font-semibold ${theme.text} mb-3`}>Market Data</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-clean text-sm">EUR/USD</span>
                  <span className="font-mono text-sm text-green-400">1.0847</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-clean text-sm">GBP/USD</span>
                  <span className="font-mono text-sm text-red-400">1.2634</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-clean text-sm">USD/JPY</span>
                  <span className="font-mono text-sm text-blue-400">149.82</span>
                </div>
              </div>
            </div>

            {/* Volatility Data */}
            <div>
              <h4 className={`font-corporate font-semibold ${theme.text} mb-3`}>Volatility Surface</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-clean text-sm">ATM Vol</span>
                  <span className="font-mono text-sm text-purple-400">12.34%</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-clean text-sm">25Δ RR</span>
                  <span className="font-mono text-sm text-orange-400">-1.25%</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-clean text-sm">25Δ BF</span>
                  <span className="font-mono text-sm text-cyan-400">0.87%</span>
                </div>
              </div>
            </div>

            {/* Mathematical Formulas */}
            <div>
              <h4 className={`font-corporate font-semibold ${theme.text} mb-3`}>Formulas</h4>
              <div className="space-y-2">
                <div className="font-code text-sm text-blue-400">
                  σ(K,T) = σ₀ + β·log(K/F)
                </div>
                <div className="font-code text-sm text-green-400">
                  C = S₀·N(d₁) - K·e^(-rT)·N(d₂)
                </div>
                <div className="font-code text-sm text-purple-400">
                  VaR = μ - σ·Φ⁻¹(α)
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FontShowcase;
