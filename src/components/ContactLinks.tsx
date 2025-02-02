import { motion } from "framer-motion";
import { Linkedin, Mail, Github } from "lucide-react";

export const ContactLinks = () => {
  return (
    <motion.div 
      className="fixed top-4 left-4 bg-white/80 dark:bg-gray-800/80 sepia:bg-amber-50/80 backdrop-blur-sm rounded-full p-2 flex gap-2 shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <a
        href="https://github.com/blue-cardigan"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full transition-colors hover:bg-blue-100 dark:hover:bg-gray-700 sepia:hover:bg-amber-100"
        aria-label="GitHub Profile"
      >
        <Github size={20} className="text-blue-600 dark:text-blue-400 sepia:text-amber-800" />
      </a>
      <a
        href="https://linkedin.com/in/jethroreeve"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full transition-colors hover:bg-blue-100 dark:hover:bg-gray-700 sepia:hover:bg-amber-100"
        aria-label="LinkedIn Profile"
      >
        <Linkedin size={20} className="text-blue-600 dark:text-blue-400 sepia:text-amber-800" />
      </a>
      <a
        href="mailto:jethro@whatgov.co.uk"
        className="p-2 rounded-full transition-colors hover:bg-blue-100 dark:hover:bg-gray-700 sepia:hover:bg-amber-100"
        aria-label="Email Contact"
      >
        <Mail size={20} className="text-blue-600 dark:text-blue-400 sepia:text-amber-800" />
      </a>
    </motion.div>
  );
};