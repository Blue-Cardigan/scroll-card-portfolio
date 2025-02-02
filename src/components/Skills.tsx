import { motion } from "framer-motion";

const skills = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "SQL",
  "Supabase",
  "Tailwind CSS",
  "Next.js",
  "GraphQL",
  "AWS",
  "Docker",
];

export const Skills = () => {
  return (
    <section className="py-20">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card rounded-xl p-6 text-center hover:shadow-xl transition-shadow"
            >
              <span className="text-lg font-medium">{skill}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};