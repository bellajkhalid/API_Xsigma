import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModernTextRevealProps {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
  animationType?: 'fade' | 'slide' | 'scale' | 'blur';
}

export const ModernTextReveal: React.FC<ModernTextRevealProps> = ({
  text,
  delay = 0,
  duration = 0.8,
  className = '',
  animationType = 'fade'
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const getAnimationVariants = () => {
    switch (animationType) {
      case 'slide':
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
        };
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 }
        };
      case 'blur':
        return {
          hidden: { opacity: 0, filter: 'blur(10px)' },
          visible: { opacity: 1, filter: 'blur(0px)' }
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
    }
  };

  const variants = getAnimationVariants();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.span
          className={className}
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{
            duration,
            type: "spring",
            stiffness: 100,
            damping: 20
          }}
        >
          {text}
        </motion.span>
      )}
    </AnimatePresence>
  );
};

interface WordByWordRevealProps {
  text: string;
  delay?: number;
  wordDelay?: number;
  className?: string;
}

export const WordByWordReveal: React.FC<WordByWordRevealProps> = ({
  text,
  delay = 0,
  wordDelay = 0.1,
  className = ''
}) => {
  const words = text.split(' ');

  return (
    <span className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: delay + index * wordDelay,
            duration: 0.6,
            type: "spring",
            stiffness: 100
          }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

interface LetterByLetterRevealProps {
  text: string;
  delay?: number;
  letterDelay?: number;
  className?: string;
}

export const LetterByLetterReveal: React.FC<LetterByLetterRevealProps> = ({
  text,
  delay = 0,
  letterDelay = 0.05,
  className = ''
}) => {
  const letters = text.split('');

  return (
    <span className={className}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: delay + index * letterDelay,
            duration: 0.4,
            type: "spring",
            stiffness: 150
          }}
          className="inline-block"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </span>
  );
};

interface GradientTextRevealProps {
  text: string;
  delay?: number;
  className?: string;
  gradientColors?: string[];
}

export const GradientTextReveal: React.FC<GradientTextRevealProps> = ({
  text,
  delay = 0,
  className = '',
  gradientColors = ['#3b82f6', '#8b5cf6', '#10b981']
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const gradientStyle = {
    background: `linear-gradient(135deg, ${gradientColors.join(', ')})`,
    backgroundSize: '200% 200%',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: 'transparent'
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.span
          className={className}
          style={gradientStyle}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{
            opacity: { duration: 0.8 },
            scale: { duration: 0.8, type: "spring", stiffness: 100 },
            backgroundPosition: { 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }
          }}
        >
          {text}
        </motion.span>
      )}
    </AnimatePresence>
  );
};

export default ModernTextReveal;
