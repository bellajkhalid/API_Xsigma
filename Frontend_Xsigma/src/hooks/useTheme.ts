import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(prefersDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const getThemeClasses = () => {
    if (isDark) {
      return {
        background: 'bg-black',
        text: 'text-white',
        cardBg: 'bg-slate-900/50',
        borderColor: 'border-white/10',
        glassBg: 'bg-black/20',
        textSecondary: 'text-gray-300',
        textMuted: 'text-gray-400',
        buttonOutline: 'border-white/20 hover:bg-white/10 text-white',
        codeBg: 'bg-gray-900/50',
        navBg: 'bg-black/80',
        buttonSecondary: 'bg-gray-800 text-white border-gray-600 hover:bg-gray-700',
        codeText: 'text-gray-300',
      };
    } else {
      return {
        background: 'bg-white',
        text: 'text-gray-900',
        cardBg: 'bg-white/90',
        borderColor: 'border-gray-300',
        glassBg: 'bg-white/60',
        textSecondary: 'text-gray-700',
        textMuted: 'text-gray-600',
        buttonOutline: 'border-gray-400 hover:bg-gray-50 text-gray-900',
        codeBg: 'bg-gray-50',
        navBg: 'bg-white/90',
        buttonSecondary: 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50',
        codeText: 'text-gray-800',
      };
    }
  };

  return {
    isDark,
    toggleTheme,
    getThemeClasses,
  };
};
