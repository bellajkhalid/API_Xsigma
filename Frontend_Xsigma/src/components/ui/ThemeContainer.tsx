import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

interface ThemeContainerProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'card' | 'glass' | 'nav';
  animated?: boolean;
  animationDelay?: number;
  style?: React.CSSProperties;
}

const ThemeContainer: React.FC<ThemeContainerProps> = ({
  children,
  className = '',
  variant = 'default',
  animated = false,
  animationDelay = 0,
  style,
}) => {
  const { isDark, getThemeClasses } = useTheme();
  const theme = getThemeClasses();

  // Get background class based on variant and theme
  const getBackgroundClass = () => {
    switch (variant) {
      case 'card':
        return theme.cardBg;
      case 'glass':
        return theme.glassBg;
      case 'nav':
        return theme.navBg;
      case 'default':
      default:
        return isDark ? 'bg-black' : 'bg-white';
    }
  };

  // Get border class based on theme
  const getBorderClass = () => {
    return theme.borderColor;
  };

  // Combine all classes
  const containerClasses = cn(
    'transition-all duration-300 ease-in-out',
    getBackgroundClass(),
    theme.text,
    className
  );

  // Animation variants for framer-motion
  const animationVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: animationDelay,
        ease: "easeOut"
      }
    }
  };

  if (animated) {
    return (
      <motion.div
        className={containerClasses}
        style={style}
        initial="hidden"
        animate="visible"
        variants={animationVariants}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={containerClasses} style={style}>
      {children}
    </div>
  );
};

// Specialized variants for common use cases
export const ThemeCard: React.FC<Omit<ThemeContainerProps, 'variant'>> = (props) => (
  <ThemeContainer {...props} variant="card" />
);

export const ThemeGlass: React.FC<Omit<ThemeContainerProps, 'variant'>> = (props) => (
  <ThemeContainer {...props} variant="glass" />
);

export const ThemeNav: React.FC<Omit<ThemeContainerProps, 'variant'>> = (props) => (
  <ThemeContainer {...props} variant="nav" />
);

export default ThemeContainer;
