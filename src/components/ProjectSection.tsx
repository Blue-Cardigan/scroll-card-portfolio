import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronRight } from "lucide-react";
import { main as mainProjects, small as smallProjects } from "../content/projects.json";

interface SmallProject {
  title: string;
  description: string;
  url: string;
  tech: string;
  endDate: string;
}

interface ProjectSectionProps {
  title: string;
  url: string;
  description: string;
  image: string;
  id: string;
  features: string[];
  endDate: string;
  isMinor: boolean;
  isEven: boolean;
  smallProjects?: SmallProject[];
}

// Update date formatting helper to handle empty dates
const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return ''; // Handle invalid dates
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  } catch {
    return ''; // Handle any parsing errors
  }
};

const formatTitle = (title: string) => {
  return title.split('-')[0].trim();
};

// Static data processing
const processedMainProjects = mainProjects
  .filter((project, index, self) => 
    index === self.findIndex((p) => p.id === project.id)
  )
  .sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime());

const processedSmallProjects = smallProjects.sort((a, b) => 
  new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
);

// Helper function for date calculations
const dateDiffInDays = (date1: string, date2: string) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return Math.abs(d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24);
};

// Create a static map of project assignments
const projectAssignments = (() => {
  const assignments = new Map();
  
  processedSmallProjects.forEach((smallProject) => {
    let bestMatch = {
      projectId: processedMainProjects[0].id,
      distance: Infinity
    };

    processedMainProjects.forEach((mainProject) => {
      const distance = dateDiffInDays(smallProject.endDate, mainProject.endDate);
      const currentAssignedCount = [...assignments.values()]
        .filter(id => id === mainProject.id).length;

      if (distance < bestMatch.distance && currentAssignedCount < 2) {
        bestMatch = {
          projectId: mainProject.id,
          distance
        };
      }
    });

    assignments.set(smallProject.title, bestMatch.projectId);
  });

  return assignments;
})();

export const ProjectSection = ({ 
  title, 
  description, 
  image, 
  id, 
  features, 
  url, 
  endDate,
  isMinor,
  isEven,
}: Omit<ProjectSectionProps, 'smallProjects'>) => {
  // Get assigned small projects for this section
  const sectionSmallProjects = processedSmallProjects.filter(
    sp => projectAssignments.get(sp.title) === id
  );

  return (
    <section id={id} className={`
      relative
      ${isMinor ? '-my-8' : '-my-4'}
      ${isMinor ? 'py-4' : 'py-6'}
    `}>
      {/* Small Project Overlays with improved positioning */}
      {sectionSmallProjects.map((project, index) => (
        <motion.div
          key={project.title}
          className={`
            absolute z-20
            ${isEven 
              ? 'left-[55%] translate-x-8' 
              : 'right-[55%] -translate-x-8'
            }
            ${index === 0 ? 'top-[30%]' : 'top-[70%]'}
          `}
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ 
            opacity: 1, 
            scale: 0.5,
            y: [0, -4, 0], 
          }}
          transition={{ 
            duration: 0.8,
            y: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <motion.div
            className="relative group"
            whileHover={{ scale: 2.5 }}
            transition={{ duration: 0.3 }}
          >
            {/* Circle background with gradient */}
            <motion.div
              className={`
                absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 
                dark:from-primary/30 dark:to-primary/10 backdrop-blur-sm 
                rounded-full shadow-lg
                ${isEven ? 'origin-left' : 'origin-right'} // Expand from the timeline side
              `}
              layoutId={`circle-${project.title}`}
              initial={{ borderRadius: '100%' }}
              whileHover={{ 
                borderRadius: '12px',
                transition: { duration: 0.3 }
              }}
            />
            
            {/* Content */}
            <div className="relative w-128 h-24 flex items-center justify-center">
              {/* Default state */}
              <div className="opacity-100 group-hover:opacity-0 transition-opacity absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-s font-medium text-primary">
                  {formatTitle(project.title)}
                </span>
              </div>
              
              {/* Expanded state */}
              <div className={`
                opacity-0 group-hover:opacity-100 transition-opacity p-4 w-64
                flex flex-col gap-2
                bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm
                rounded-xl shadow-lg border border-gray-100 dark:border-gray-700
                ${isEven ? 'text-left' : 'text-right'} // Align text based on side
              `}>
                <a 
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group/link"
                >
                  <h4 className={`
                    text-sm font-semibold text-primary 
                    group-hover/link:text-primary/80 transition-colors 
                    flex items-center gap-1.5
                    ${isEven ? 'flex-row' : 'flex-row-reverse'}
                  `}>
                    {project.title}
                    <ExternalLink size={14} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed my-2">
                    {project.description}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {project.tech.split(',').map((tech, i) => (
                      <span key={i} className="text-[10px] font-medium text-primary/80 px-2 py-0.5 bg-primary/5 rounded-full">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, x: isEven ? -20 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className={`
          relative grid grid-cols-1 gap-4
          ${isEven ? 'md:pr-[52%]' : 'md:pl-[52%]'}
          ${isEven ? 'ml-auto' : 'mr-auto'}
        `}
      >
        {/* Timeline connector */}
        <div className={`
          absolute top-1/2 hidden md:block
          ${isEven ? 'right-0 left-[98%]' : 'left-0 right-[98%]'}
          h-0.5 bg-gray-200 dark:bg-gray-700
        `} />

        {/* Date indicator */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 px-3 py-1 rounded-full text-sm border border-gray-200 dark:border-gray-700 z-10">
          {formatDate(endDate)}
        </div>

        <div className={`
          bg-white/80 dark:bg-slate-800/80 sepia:bg-[#faf7ed]/80 
          backdrop-blur-md rounded-xl overflow-hidden shadow-lg
          hover:shadow-xl transition-all duration-300
          ${isMinor ? 'p-3' : 'p-4'}
        `}>
          <div className="flex flex-col gap-3">
            <div className="relative group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className={`relative overflow-hidden rounded-lg ${isMinor ? 'h-24' : 'h-36'}`}
              >
                <a href={url} target="_blank" rel="noopener noreferrer" className="block h-full">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
                    <ExternalLink className="text-white" size={24} />
                  </div>
                </a>
              </motion.div>
            </div>

            <div>
              <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group inline-flex items-center gap-2 hover:text-primary transition-colors"
              >
                <h3 className={`font-bold ${isMinor ? 'text-xl' : 'text-2xl'} dark:text-gray-400`}>{title}</h3>
                <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
              </a>
              <p className="text-muted-foreground dark:text-gray-300 mt-2 leading-relaxed">
                {description}
              </p>
              {!isMinor && (
                <div className="mt-3">
                  <h4 className="font-semibold text-foreground dark:text-gray-200 mb-1">
                    Key Features:
                  </h4>
                  <ul className="grid grid-cols-2 gap-1">
                    {features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                        viewport={{ once: true }}
                        className="flex items-start gap-2 text-muted-foreground dark:text-gray-300"
                      >
                        <ChevronRight size={16} className="mt-1 flex-shrink-0 text-primary" />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

// Export utility for Index.tsx
export const getMainProjects = () => processedMainProjects;