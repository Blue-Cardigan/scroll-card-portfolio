import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { ContactLinks } from "./ContactLinks";
import { TypeAnimation } from 'react-type-animation';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";
import type { Engine } from "tsparticles-engine";
import { ChevronDown } from "lucide-react";

export const Hero = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const scrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const projectsSection = document.querySelector('#projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <Particles
        className="absolute inset-0 -z-10"
        init={particlesInit}
        options={{
          particles: {
            number: { value: 30, density: { enable: true, value_area: 800 } },
            color: { value: ["#6366f1", "#3b82f6"] },
            opacity: { 
              value: 0.2,
              random: true,
              anim: { enable: true, speed: 0.5, opacity_min: 0.1 }
            },
            size: { value: 3 },
            move: { enable: true, speed: 1, direction: "none" },
            line_linked: { 
              enable: true, 
              distance: 150, 
              color: "#6366f1", 
              opacity: 0.1,
              width: 1
            }
          },
          interactivity: {
            events: {
              onhover: { enable: true, mode: "repulse" },
              onclick: { enable: true, mode: "push" }
            }
          }
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/90 to-white/90 dark:from-slate-900/95 dark:to-slate-800/95 sepia:from-[#fdf6e3]/90 sepia:to-[#faf7ed]/90 -z-10" />
      <ContactLinks />
      <ThemeToggle />
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 sepia:from-orange-700 sepia:to-amber-700">
              Hi, I'm Jethro!
            </h1>
            <div className="h-1 w-24 mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 sepia:from-orange-700 sepia:to-amber-700 rounded-full" />
          </motion.div>
          
          <div className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 sepia:text-amber-900 mb-12 max-w-2xl mx-auto h-20">
            <TypeAnimation
              sequence={[
                'I build scalable and performant applications',
                1000,
                'I craft pretty user interfaces',
                1000,
                'I build to ship, and adapt quickly',
                1000,
                'I teach and mentor others',
                1000
              ]}
              wrapper="span"
              speed={70}
              repeat={Infinity}
            />
          </div>

          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.a
              href="#projects"
              onClick={scrollToProjects}
              className="group relative inline-flex items-center gap-2 px-8 py-3 bg-blue-600 dark:bg-blue-500 sepia:bg-orange-700 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="relative"
                animate={{ y: [0, 1, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2,
                  ease: "easeInOut"
                }}
              >
                <ChevronDown size={20} />
              </motion.div>
              <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};