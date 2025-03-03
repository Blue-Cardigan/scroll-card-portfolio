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
    <footer className="py-8 mt-20 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <motion.a
              href="https://github.com/blue-cardigan/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="text-muted-foreground hover:text-primary"
            >
              <Github size={20} />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/jethroreeve"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="text-muted-foreground hover:text-primary"
            >
              <Linkedin size={20} />
            </motion.a>
            <motion.a
              href="mailto:jethro@civita.co.uk"
              whileHover={{ scale: 1.1 }}
              className="text-muted-foreground hover:text-primary"
            >
              <Mail size={20} />
            </motion.a>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setTheme('light')}
              className="p-2 rounded-full hover:bg-primary/10"
              aria-label="Light mode"
            >
              <Sun size={20} className="text-muted-foreground" />
            </button>
            <button
              onClick={() => setTheme('dark')}
              className="p-2 rounded-full hover:bg-primary/10"
              aria-label="Dark mode"
            >
              <Moon size={20} className="text-muted-foreground" />
            </button>
            <button
              onClick={() => setTheme('sepia')}
              className="p-2 rounded-full hover:bg-primary/10"
              aria-label="Sepia mode"
            >
              <Coffee size={20} className="text-muted-foreground" />
            </button>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};