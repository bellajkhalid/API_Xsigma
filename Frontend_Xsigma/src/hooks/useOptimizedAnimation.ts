import { useEffect, useState } from 'react';

export const useOptimizedAnimation = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    // Check if page is visible to pause animations when not visible
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const getAnimationConfig = (config: any) => {
    if (prefersReducedMotion || !isVisible) {
      return {
        ...config,
        animate: config.initial || {},
        transition: { duration: 0 }
      };
    }
    return config;
  };

  const shouldAnimate = !prefersReducedMotion && isVisible;

  return {
    prefersReducedMotion,
    isVisible,
    shouldAnimate,
    getAnimationConfig
  };
};

export default useOptimizedAnimation;
