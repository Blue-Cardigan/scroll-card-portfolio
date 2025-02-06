import { motion } from "framer-motion";
import { 
  FaReact, 
  FaAws, 
  FaDocker,
} from "react-icons/fa";
import { 
  SiTypescript, 
  SiSupabase, 
  SiTailwindcss, 
  SiDjango, 
  SiNextdotjs, 
  SiGraphql,
  SiStripe,
  SiFirebase,
  SiRedis,
  SiMapbox,
  SiApollographql,
  SiVercel,
  SiLangchain,
} from "react-icons/si";
import { BsWindowStack, BsServer, BsGear } from "react-icons/bs";
import { useState } from "react";

const systems = {
  "whatgov": {
    name: "WhatGov",
    stack: ["Supabase", "Next.js", "TypeScript", "React", "Node.js", "Vercel", "Tailwind", "Redis", "Stripe"],
    systems: [
      "OAuth2",
      "User Tier management",
      "Profile management & personalisation",
      "Stripe payment processing",
      "Daily data processing pipeline",
      "OpenAI integration",
      "Enterprise user management"
    ]
  },
  "flood-defence": {
    name: "Flood Defence",
    stack: ["TypeScript", "Python", "React", "AWS", "GraphQL", "Docker", "Tailwind", "Apollo Client", "Mapbox GL", "Django", "NetworkX"],
    systems: [
      "React frontend, Python backend",
      "GraphQL API with Ariadne",
      "Custom proxy solution",
      "AWS infrastructure (ECS, RDS, S3)",
      "Security-first architecture"
    ]
  },
  "tuc-chatbot": {
    name: "TUC Training Chatbot",
    stack: ["Vercel", "Supabase", "Next.js", "Tailwind"],
    systems: [
      "AI-powered chat interface",
      "Training content integration",
      "User session management",
      "Response optimization"
    ]
  },
  "election-forecast": {
    name: "Election Forecast",
    stack: ["Python", "FastAPI"],
    systems: [
      "Statistical modeling pipeline",
      "Plotly dashboards",
      "PostgreSQL integration",
      "Secure data visualization"
    ]
  },
  "sms-chatbot": {
    name: "SMS AI Chatbot",
    stack: ["Firebase", "Twilio"],
    systems: [
      "Automated messaging system",
      "Community engagement features",
      "AI response handling"
    ]
  },
  "easymail": {
    name: "EasyMail",
    stack: ["Firebase", "Supabase"],
    systems: [
      "Automated letter writing",
      "Non-profit integration",
      "Campaign management"
    ]
  },
  "electoral-commission-bot": {
    name: "Electoral Commission ChatBot",
    stack: ["Pinecone/Langchain"],
    systems: [
      "Vector database integration",
      "RAG implementation",
      "Electoral guidance AI assistant",
      "Document embeddings"
    ]
  },
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
      { name: "Django", icon: SiDjango, color: "#092E20" },
      { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
      { name: "Redis", icon: SiRedis, color: "#DC382D" },
      { 
        name: "Pinecone +Langchain",
        icon: SiLangchain, 
        color: "#3178C6" 
      },
      { 
        name: "NetworkX", 
        icon: () => <img src="/networkx.png" alt="NetworkX" className="w-8 h-8" />, 
        color: "#009688" 
      },
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
      { name: "Stripe", icon: SiStripe, color: "#008CDD"},
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
        // Break after 2 projects to avoid overspill
        if (relevantSystems.length >= 2) break;
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
      : "hidden lg:block w-[400px] shrink-0";

    const relevantSystems = activeSkill ? getSystemsForSkill(activeSkill) : [];

    return (
      <div className={containerClasses}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="p-6 glass-card rounded-lg h-[425px] overflow-y-auto dark:bg-gray-800/80"
        >
          {activeSkill ? (
            <div className="h-full">
              <h3 className="text-l font-semibold mb-4 dark:text-gray-200">
                {relevantSystems.length > 0 
                  ? `Projects using ${activeSkill}`
                  : `No projects currently showcasing ${activeSkill}`}
              </h3>
              <SystemsList systems={relevantSystems} isMobile={isMobile} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground dark:text-gray-400">
              <PlaceholderGrid />
              <p className="mt-6 text-sm">
                ← Hover on a Honeycomb
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
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center dark:text-white">I've worked with</h2>
        
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Center - Honeycomb grid */}
          <div className="flex-1 flex justify-center items-center">
            <div className="honeycomb-grid">
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
                        <skill.icon className="shrink-0" style={{ color: skill.color }}/>
                        <span className="font-medium whitespace-pre-line">{skill.name}</span>
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