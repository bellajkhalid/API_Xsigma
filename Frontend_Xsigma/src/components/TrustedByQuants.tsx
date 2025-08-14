import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { BarChart3, TrendingUp, Calculator, Zap } from "lucide-react";

interface ModelSelectorProps {
  analytixModels: Array<{
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
    features: string[];
  }>;
  onModelSelect: (modelId: string) => void;
}

const ModelSelector = ({ analytixModels, onModelSelect }: ModelSelectorProps) => {
  const { getThemeClasses } = useTheme();
  const theme = getThemeClasses();

  const stats = [
    { label: 'Active Models', value: '24', change: '+6 this month', icon: BarChart3 },
    { label: 'Portfolio Value', value: '$4.2M', change: '+8.3%', icon: TrendingUp },
    { label: 'Risk Metrics', value: '0.94', change: 'Optimal', icon: Calculator },
    { label: 'Processing Speed', value: '2.1ms', change: '', icon: Zap }
  ];

  return (
    <div className="py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-[#22c55e] bg-clip-text text-transparent">
          Choose Your XSigma Models
        </h2>
        <p className={`${theme.textSecondary} text-lg max-w-3xl mx-auto`}>
          Select the perfect XSigma configuration for your quantitative analysis needs.
          Each model is optimized for specific financial scenarios and risk assessments.
        </p>
      </motion.div>

      {/* Scrolling Financial Models */}
      <div className="relative overflow-hidden mb-16">
        <motion.div
          className="flex gap-6"
          animate={{
            x: [0, -100 * financialModels.length]
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
          style={{ width: `${financialModels.length * 200}%` }}
        >
          {/* Render models twice for seamless loop */}
          {[...financialModels, ...financialModels].map((model, index) => (
            <motion.div
              key={`${model.id}-${index}`}
              className={`flex-shrink-0 w-96 ${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border rounded-2xl p-6 mx-3 cursor-pointer group`}
              onClick={() => onModelSelect(model.id)}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative z-10">
                <div className={`w-16 h-16 bg-gradient-to-r ${model.color} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {model.icon}
                </div>
                <h3 className={`text-xl font-bold mb-4 ${theme.text} group-hover:text-primary transition-colors duration-300`}>
                  {model.name}
                </h3>
                <p className={`${theme.textSecondary} mb-4 leading-relaxed`}>
                  {model.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {model.features.map((feature, idx) => (
                    <li key={idx} className={`text-sm ${theme.textMuted} flex items-center gap-2`}>
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Call to Action */}
                <div className={`pt-4 border-t ${theme.borderColor}`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${theme.textMuted}`}>Click to explore</span>
                    <motion.div
                      className="w-8 h-8 bg-gradient-to-r from-primary to-[#22c55e] rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <span className="text-black text-sm">→</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Quick Stats - Below the scrolling models */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className={`${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border rounded-2xl p-6 text-center group hover:border-primary/50 transition-all duration-300`}
          >
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-4">
                <stat.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className={`text-sm font-medium ${theme.textMuted} uppercase tracking-wider mb-3`}>
                {stat.label}
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-[#22c55e] bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              {stat.change && (
                <div className="text-sm text-green-400 flex items-center justify-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {stat.change}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

    </div>
  );
};

export default ModelSelector;
