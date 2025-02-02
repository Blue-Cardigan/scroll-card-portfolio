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
} from "react-icons/si";

const skills = [
  { name: "React", icon: FaReact, color: "#61DAFB" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Node.js", icon: FaNodeJs, color: "#339933" },
  { name: "Python", icon: FaPython, color: "#3776AB" },
  { name: "SQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Django", icon: SiDjango, color: "#092E20" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
  { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
  { name: "AWS", icon: FaAws, color: "#FF9900" },
  { name: "Docker", icon: FaDocker, color: "#2496ED" },
  { name: "Heroku", icon: SiHeroku, color: "#430098"},
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
];

export const Skills = () => {
  return (
    <section className="py-20">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center dark:text-white">Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card rounded-xl p-6 text-center hover:shadow-xl transition-shadow flex flex-col items-center gap-3"
            >
              <skill.icon size={40} style={{ color: skill.color }} />
              <span className="text-lg font-medium">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};