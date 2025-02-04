import { motion } from "framer-motion";
import { 
  FaReact, 
  FaNodeJs, 
  FaPython, 
  FaAws, 
  FaDocker
} from "react-icons/fa";
import { 
  SiTypescript, 
  SiSupabase, 
  SiTailwindcss, 
  SiDjango, 
  SiNextdotjs, 
  SiGraphql,
  SiHeroku,
  SiFirebase,
  SiRedis,
  SiMapbox,
  SiApollographql,
  SiVercel,
} from "react-icons/si";
import { BsWindowStack, BsServer, BsGear } from "react-icons/bs";
import { useState } from "react";

const systems = {
  "whatgov": {
    name: "WhatGov",
    stack: ["Supabase", "Next.js", "TypeScript", "React", "Node.js", "Vercel", "Tailwind", "Redis", "Firebase"],
    systems: [
      "OAuth2 with emails",
      "Profile management & preference collection",
      "Daily data processing pipeline",
      "OpenAI integration",
      "Enterprise user management"
    ]
  },
  "flood-defence": {
    name: "Flood Defence",
    stack: ["Python", "React", "AWS", "GraphQL", "Docker", "Tailwind", "Apollo Client", "Mapbox GL", "Django"],
    systems: [
      "GraphQL API with Ariadne",
      "Custom proxy solution",
      "AWS infrastructure (ECS, RDS, S3)",
      "Security-oriented architecture"
    ]
  },
  "election-forecast": {
    name: "Election Forecast",
    stack: ["Python", "FastAPI", "Heroku"],
    systems: [
      "Statistical modeling pipeline",
      "Plotly dashboards",
      "PostgreSQL integration",
      "Secure data visualization"
    ]
  }
};

const stack = [
  {
    category: "Frontend",
    icon: BsWindowStack,
    items: [
      { name: "React", icon: FaReact, color: "#61DAFB" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
      { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Apollo Client", icon: SiApollographql, color: "#311C87" },
      { name: "Mapbox GL", icon: SiMapbox, color: "#000000" },
    ]
  },
  {
    category: "Backend",
    icon: BsServer,
    items: [
      { name: "Python", icon: FaPython, color: "#3776AB" },
      { name: "Node.js", icon: FaNodeJs, color: "#339933" },
      { name: "Django", icon: SiDjango, color: "#092E20" },
      { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
      { name: "Redis", icon: SiRedis, color: "#DC382D" },
    ]
  },
  {
    category: "Infrastructure",
    icon: BsGear,
    items: [
      { name: "AWS", icon: FaAws, color: "#FF9900" },
      { name: "Docker", icon: FaDocker, color: "#2496ED" },
      { name: "Vercel", icon: SiVercel, color: "#000000" },
      { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
      { name: "Heroku", icon: SiHeroku, color: "#430098"},
    ]
  }
];

export const Stack = () => {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const getSystemsForSkill = (skillName: string) => {
    // Collect all systems from projects that use this skill
    const relevantSystems: Array<{ project: string; systems: string[] }> = [];
    
    for (const [projectKey, projectData] of Object.entries(systems)) {
      if (projectData.stack.includes(skillName)) {
        relevantSystems.push({
          project: projectData.name,
          systems: projectData.systems
        });
      }
    }
    
    return relevantSystems;
  };

  const SystemsList = ({ systems, isMobile = false }: { 
    systems: Array<{ project: string; systems: string[] }>, 
    isMobile?: boolean 
  }) => {
    const totalItems = systems.reduce((sum, { systems }) => sum + systems.length, 0);
    const shouldUseGrid = totalItems > 6 || isMobile;

    return (
      <div 
        className={
          shouldUseGrid 
            ? "grid grid-cols-1 md:grid-cols-2 gap-6" 
            : "flex flex-col gap-6"
        }
      >
        {systems.map(({ project, systems }) => (
          <div key={project} className="space-y-3">
            <h4 className="font-semibold text-sm text-accent">{project}</h4>
            <ul className="space-y-2">
              {systems.map((system, index) => (
                <motion.li
                  key={system}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center gap-2 text-sm"
                >
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  {system}
                </motion.li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  const PlaceholderGrid = () => {
    const hexSizes = [
      [14, 14, 14],    // Top row
      [16, 18, 16],    // Middle row
      [14, 14, 14],    // Bottom row
    ];

    return (
      <div className="grid gap-3">
        {hexSizes.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-3">
            {row.map((size, colIndex) => (
              <motion.div
                key={`${rowIndex}-${colIndex}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.15, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: (rowIndex * 3 + colIndex) * 0.1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
                className="relative"
                style={{
                  width: `${size * 4}px`,
                  height: `${size * 4}px`,
                }}
              >
                <div 
                  className="absolute inset-0 bg-current"
                  style={{
                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  }}
                />
                {rowIndex === 1 && colIndex === 1 && (
                  <motion.div
                    className="absolute inset-0 bg-accent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                    style={{
                      clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const SystemsPanel = ({ isMobile = false }) => {
    const containerClasses = isMobile 
      ? "lg:hidden mt-8 w-full" 
      : "hidden lg:block w-[300px] shrink-0";

    const relevantSystems = activeSkill ? getSystemsForSkill(activeSkill) : [];

    return (
      <div className={containerClasses}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="p-6 glass-card rounded-lg h-[400px] overflow-y-auto"
        >
          {activeSkill ? (
            <div className="h-full">
              <h3 className="text-xl font-semibold mb-4">
                {relevantSystems.length > 0 
                  ? `Projects using ${activeSkill}`
                  : `No projects currently showcasing ${activeSkill}`}
              </h3>
              <SystemsList systems={relevantSystems} isMobile={isMobile} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
              <PlaceholderGrid />
              <p className="mt-6 text-sm">
                Hover over a skill to see related projects
              </p>
            </div>
          )}
        </motion.div>
      </div>
    );
  };

  return (
    <section id="stack" className="py-20 bg-muted">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center dark:text-white">Stack</h2>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left sidebar - Category icons */}
          <div className="flex lg:flex-col gap-8 lg:gap-[120px] lg:pt-[17px] justify-center shrink-0">
            {stack.map((category) => (
              <motion.div
                key={category.category}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="cursor-pointer"
              >
                <category.icon 
                  size={24} 
                  className="dark:text-white" 
                  title={category.category}
                />
              </motion.div>
            ))}
          </div>

          {/* Center - Honeycomb grid with fixed width */}
          <div className="flex-1 flex justify-center">
            <div className="honeycomb-grid w-full max-w-[800px]">
              {stack.map((category) => (
                <div key={category.category} className="category-row">
                  {category.items.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="hexagon-wrapper"
                      onMouseEnter={() => setActiveSkill(skill.name)}
                      onMouseLeave={() => setActiveSkill(null)}
                    >
                      <div className="hexagon glass-card flex flex-col items-center justify-center gap-2">
                        <skill.icon size={32} style={{ color: skill.color }} />
                        <span className="text-sm font-medium">{skill.name}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Right sidebar - Systems panel */}
          <SystemsPanel />
        </div>

        {/* Mobile systems panel */}
        <SystemsPanel isMobile />
      </div>
    </section>
  );
};