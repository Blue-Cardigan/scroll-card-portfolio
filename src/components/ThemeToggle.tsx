import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Coffee } from 'lucide-react';

type Theme = 'light' | 'dark' | 'sepia';

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.className = savedTheme;
    }
  }, []);

  const toggleTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.className = newTheme;
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