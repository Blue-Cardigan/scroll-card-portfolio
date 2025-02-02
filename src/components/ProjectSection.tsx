import { motion } from "framer-motion";

interface ProjectSectionProps {
  title: string;
  description: string;
  image: string;
  id: string;
  features: string[];
}

export const ProjectSection = ({ title, description, image, id, features }: ProjectSectionProps) => {
  return (
    <section id={id} className="py-20 scroll-mt-20">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl overflow-hidden"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-[300px] md:h-full">
              <img
                src={image}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4">{title}</h3>
              <p className="text-gray-600 mb-6">{description}</p>
              <div className="space-y-4">
                <h4 className="font-semibold">Key Features:</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  {features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};