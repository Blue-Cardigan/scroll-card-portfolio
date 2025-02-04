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
  SiPostgresql, 
  SiSupabase, 
  SiTailwindcss, 
  SiDjango, 
  SiNextdotjs, 
  SiGraphql,
  SiHeroku,
  SiFirebase,
  SiVite,
} from "react-icons/si";
import { BsWindowStack, BsServer, BsGear } from "react-icons/bs";

const skills = [
  {
    category: "Frontend",
    icon: BsWindowStack,
    items: [
      { name: "React", icon: FaReact, color: "#61DAFB" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
      { name: "Vite", icon: SiVite, color: "#FFD700" },
    ]
  },
  {
    category: "Backend",
    icon: BsServer,
    items: [
      { name: "Node.js", icon: FaNodeJs, color: "#339933" },
      { name: "Python", icon: FaPython, color: "#3776AB" },
      { name: "Django", icon: SiDjango, color: "#092E20" },
      { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
    ]
  },
  {
    category: "Infrastructure",
    icon: BsGear,
    items: [
      { name: "Docker", icon: FaDocker, color: "#2496ED" },
      { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
      { name: "Heroku", icon: SiHeroku, color: "#430098"},
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
      { name: "AWS", icon: FaAws, color: "#FF9900" },
    ]
  }
];

export const Skills = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container px-41 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center dark:text-white">Skills</h2>
        <div className="flex gap-8">
          {/* Categories labels column */}
          <div className="flex flex-col gap-[90px] pt-[30px]">
            {skills.map((category) => (
              <div 
                key={category.category} 
                className="flex items-center justify-end gap-3 w-48 group/category relative"
                onMouseEnter={() => {
                  const label = document.querySelector(`[data-category="${category.category}"]`);
                  label?.classList.add('visible');
                }}
                onMouseLeave={() => {
                  const label = document.querySelector(`[data-category="${category.category}"]`);
                  label?.classList.remove('visible');
                }}
              >
                <motion.h3 
                  data-category={category.category}
                  className="text-2xl font-semibold absolute right-12 pointer-events-none dark:text-white category-label"
                >
                  {category.category}
                </motion.h3>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <category.icon size={24} className="cursor-pointer dark:text-white" />
                </motion.div>
              </div>
            ))}
          </div>
          {/* Honeycomb grid */}
          <div className="honeycomb-grid">
            {skills.map((category) => (
              <div 
                key={category.category} 
                className="category-row group/hexagons"
                onMouseEnter={() => {
                  const label = document.querySelector(`[data-category="${category.category}"]`);
                  label?.classList.add('visible');
                }}
                onMouseLeave={() => {
                  const label = document.querySelector(`[data-category="${category.category}"]`);
                  label?.classList.remove('visible');
                }}
              >
                {category.items.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="hexagon-wrapper"
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
      </div>
    </section>
  );
};