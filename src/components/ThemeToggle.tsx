import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Coffee } from 'lucide-react';

type Theme = 'light' | 'dark' | 'sepia';

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>('light');
  
  const safeGetItem = (key: string, fallback: string): string => {
    try {
      return localStorage.getItem(key) || fallback;
    } catch (error) {
      console.warn('Unable to access localStorage:', error);
      return fallback;
    }
  };
  
  const safeSetItem = (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn('Unable to write to localStorage:', error);
    }
  };

  useEffect(() => {
    try {
      const storedTheme = safeGetItem('theme', '');
      
      if (storedTheme && ['light', 'dark', 'sepia'].includes(storedTheme)) {
        setTheme(storedTheme as Theme);
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
      }
    } catch (error) {
      setTheme('light');
    }
  }, []);

  useEffect(() => {
    if (!theme) return;
    
    document.documentElement.classList.remove('light', 'dark', 'sepia');
    document.documentElement.classList.add(theme);
    
    safeSetItem('theme', theme);
  }, [theme]);

  const toggleTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <motion.div 
      className="fixed top-4 right-4 bg-white/80 dark:bg-slate-800/80 sepia:bg-[#faf7ed]/80 backdrop-blur-sm rounded-full p-2 flex gap-2 shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={() => toggleTheme('light')}
        className={`p-2 rounded-full transition-colors ${
          theme === 'light' ? 'bg-primary/10 text-primary' : 'hover:bg-primary/10 dark:hover:bg-primary/20 sepia:hover:bg-orange-50'
        }`}
        aria-label="Light mode"
      >
        <Sun size={20} />
      </button>
      <button
        onClick={() => toggleTheme('dark')}
        className={`p-2 rounded-full transition-colors ${
          theme === 'dark' ? 'bg-primary/10 text-primary' : 'hover:bg-primary/10 dark:hover:bg-primary/20'
        }`}
        aria-label="Dark mode"
      >
        <Moon size={20} />
      </button>
      <button
        onClick={() => toggleTheme('sepia')}
        className={`p-2 rounded-full transition-colors ${
          theme === 'sepia' ? 'bg-primary/10 text-primary' : 'hover:bg-primary/10 dark:hover:bg-primary/20'
        }`}
        aria-label="Sepia mode"
      >
        <Coffee size={20} />
      </button>
    </motion.div>
  );
};