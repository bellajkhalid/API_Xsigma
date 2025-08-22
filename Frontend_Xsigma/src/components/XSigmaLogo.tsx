import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

const XSigmaLogo = () => {
  const { getThemeClasses, isDark } = useTheme();
  const theme = getThemeClasses();
  return (
    <div className="flex flex-col items-center">
      {/* Logo Icon */}
      <motion.div
        className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 mb-6"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src="/X_logo2025.png"
          alt="XSIGMA Logo"
          className="xsigma-logo w-full h-full object-contain drop-shadow-2xl"
          style={{
            filter: isDark
              ? 'brightness(1.1) contrast(1.2) drop-shadow(0 4px 16px rgba(0, 191, 196, 0.5))'
              : 'brightness(0.9) contrast(1.3) drop-shadow(0 4px 16px rgba(10, 31, 68, 0.4))'
          }}
          onError={(e) => {
            // Fallback to .ico if PNG fails
            const target = e.target as HTMLImageElement;
            target.src = "/xsigma_logo.ico";
          }}
        />
      </motion.div>


    </div>
  );
};

export default XSigmaLogo;
