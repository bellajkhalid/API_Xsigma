import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

const PlatformStats = () => {
  const { getThemeClasses } = useTheme();
  const theme = getThemeClasses();



  const testimonials = [
    {
      name: "Prof. James Rodriguez",
      title: "Financial Engineering Professor",
      company: "MIT Sloan",
      avatar: "🎓",
      quote: "Sigma has revolutionized how we teach quantitative finance. The SQL-in-spreadsheet interface makes complex analytics accessible to our students."
    },
    {
      name: "Lisa Thompson", 
      title: "Portfolio Optimization Specialist",
      company: "Goldman Sachs",
      avatar: "📊",
      quote: "The cloud-native architecture and familiar interface have accelerated our model development by 300%."
    },
    {
      name: "Dr. Michael Chen",
      title: "Quantitative Analyst", 
      company: "Two Sigma",
      avatar: "🔬",
      quote: "Sigma's business intelligence capabilities provide the perfect balance of power and usability for our quant teams."
    }
  ];

  return (
    <div className={`py-16 border-t ${theme.borderColor}`}>


      {/* Testimonials Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative overflow-hidden"
      >
        <h3 className={`text-2xl font-bold text-center mb-8 ${theme.text}`}>
          What Industry Leaders Say
        </h3>
        
        <div className="relative">
          <motion.div
            className="flex gap-6"
            animate={{
              x: [0, -100 * testimonials.length]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 15,
                ease: "linear",
              },
            }}
            style={{ width: `${testimonials.length * 200}%` }}
          >
            {/* Render testimonials twice for seamless loop */}
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <motion.div
                key={`${testimonial.name}-${index}`}
                className={`flex-shrink-0 w-96 ${theme.glassBg} backdrop-blur-lg ${theme.borderColor} border rounded-2xl p-6 mx-3`}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className={`font-semibold ${theme.text}`}>{testimonial.name}</h4>
                    <p className={`text-sm ${theme.textSecondary}`}>{testimonial.title}</p>
                    <p className={`text-xs ${theme.textMuted}`}>{testimonial.company}</p>
                  </div>
                </div>
                <blockquote className={`${theme.textSecondary} text-sm leading-relaxed italic`}>
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm">⭐</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PlatformStats;
