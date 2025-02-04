import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface SmallerProject {
  title: string;
  description: string;
  url: string;
  tech: string;
}

const projects: SmallerProject[] = [
  {
    title: "SMS AI Chatbot - We Are Civitas",
    description: "Automated text messaging system for community engagement",
    url: "https://www.wearecivitas.com/",
    tech: "Firebase, Twilio"
  },
  {
    title: "Data Analysis - Parliamentary Workflow Study",
    description: "Analysis of spending patterns to identify workflow optimisations",
    url: "https://docs.google.com/document/d/106aimSyecfLhBjJ9iFV4Izxvz2HZAHCk_X2QJXPKVkk",
    tech: "Python, Pandas"
  },
  {
    title: "EasyMail - Campaign Letter Writing Integration",
    description: "Automated letter writing system for non-profit organizations",
    url: "https://easymail.civita.co.uk/",
    tech: "Firebase, Supabase"
  },
  {
    title: "Medical Justice Software Consultation",
    description: "Software transition strategy and implementation planning",
    url: "https://medicaljustice.org.uk/",
    tech: "Structured interviews, Research"
  }
];

// Duplicate projects for seamless loop
const duplicatedProjects = [...projects, ...projects];

export const SmallerProjects = () => {
  return (
    <section className="py-8 overflow-hidden">
      <div className="container px-4 mx-auto">
        
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute -left-5 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute -right-5 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10" />
          
          {/* Carousel Track */}
          <motion.div
            className="flex gap-6"
            animate={{
              x: ["0%", "-50%"]
            }}
            transition={{
              x: {
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }
            }}
          >
            {duplicatedProjects.map((project, index) => (
              <motion.div
                key={`${project.title}-${index}`}
                className="w-[400px] shrink-0"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="glass-card p-8 rounded-xl h-full hover:shadow-lg transition-all duration-300">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block h-full"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <ExternalLink 
                        size={20} 
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" 
                      />
                    </div>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="text-sm font-medium text-primary dark:text-primary-foreground">
                      {project.tech}
                    </div>
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 