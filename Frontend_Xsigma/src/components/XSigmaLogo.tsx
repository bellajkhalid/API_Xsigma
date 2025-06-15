import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

const XSigmaLogo = () => {
  const { getThemeClasses } = useTheme();
  const theme = getThemeClasses();
  return (
    <div className="flex flex-col items-center">
      {/* Logo Icon */}
      <motion.div
        className="relative w-24 h-24 mb-6"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src="/X_logo.ico"
          alt="XSIGMA Logo"
          className="w-full h-full object-contain"
        />
      </motion.div>
      

    </div>
  );
};

export default XSigmaLogo;
