import { motion } from "framer-motion";
import { ArrowLeft, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";

const BackHomeButton = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-6 right-6 z-50"
    >
      <div className="flex items-center bg-gray-800/80 backdrop-blur-lg rounded-full border border-gray-600/30 overflow-hidden">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.location.href = '/'}
          className="flex items-center gap-2 px-4 py-3 text-white hover:bg-white/10 rounded-none border-r border-gray-600/30"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium">Back to</span>
        </Button>
        
        {/* Theme Toggle */}
        <motion.button
          onClick={toggleTheme}
          className="relative flex items-center justify-center w-16 h-12 bg-gradient-to-r from-blue-400 to-yellow-400 rounded-full m-1"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Toggle Background */}
          <motion.div
            className="absolute inset-1 bg-white rounded-full shadow-lg"
            animate={{
              x: isDark ? 0 : 24,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
          />
          
          {/* Sun Icon */}
          <motion.div
            className="absolute left-2 flex items-center justify-center w-8 h-8"
            animate={{
              scale: isDark ? 1 : 0.8,
              opacity: isDark ? 1 : 0.6
            }}
          >
            <Sun className="w-4 h-4 text-yellow-500" />
          </motion.div>
          
          {/* Moon Icon */}
          <motion.div
            className="absolute right-2 flex items-center justify-center w-8 h-8"
            animate={{
              scale: isDark ? 0.8 : 1,
              opacity: isDark ? 0.6 : 1
            }}
          >
            <Moon className="w-4 h-4 text-blue-600" />
          </motion.div>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default BackHomeButton;
