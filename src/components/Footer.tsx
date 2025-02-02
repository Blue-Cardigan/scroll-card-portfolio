import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp, Sun, Moon, Coffee } from "lucide-react";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setTheme = (theme: 'light' | 'dark' | 'sepia') => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  };

  return (
    <footer className="py-8 mt-20 border-t border-slate-200 dark:border-slate-800 sepia:border-orange-200/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <motion.a
              href="https://github.com/blue-cardigan/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 sepia:text-orange-800 sepia:hover:text-orange-600"
            >
              <Github size={20} />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/jethroreeve"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 sepia:text-amber-800 sepia:hover:text-amber-600"
            >
              <Linkedin size={20} />
            </motion.a>
            <motion.a
              href="mailto:jethro@whatgov.co.uk"
              whileHover={{ scale: 1.1 }}
              className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 sepia:text-amber-800 sepia:hover:text-amber-600"
            >
              <Mail size={20} />
            </motion.a>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setTheme('light')}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 sepia:hover:bg-orange-50"
              aria-label="Light mode"
            >
              <Sun size={20} className="text-slate-600 dark:text-slate-400 sepia:text-orange-800" />
            </button>
            <button
              onClick={() => setTheme('dark')}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 sepia:hover:bg-amber-100"
              aria-label="Dark mode"
            >
              <Moon size={20} className="text-gray-600 dark:text-gray-400 sepia:text-amber-800" />
            </button>
            <button
              onClick={() => setTheme('sepia')}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 sepia:hover:bg-amber-100"
              aria-label="Sepia mode"
            >
              <Coffee size={20} className="text-gray-600 dark:text-gray-400 sepia:text-amber-800" />
            </button>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full bg-blue-600 dark:bg-blue-500 sepia:bg-amber-700 text-white shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};