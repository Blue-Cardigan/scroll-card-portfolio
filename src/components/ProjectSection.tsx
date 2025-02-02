import { motion } from "framer-motion";
import { ExternalLink, ChevronRight } from "lucide-react";

interface ProjectSectionProps {
  title: string;
  url: string;
  description: string;
  image: string;
  id: string;
  features: string[];
}

export const ProjectSection = ({ title, description, image, id, features, url }: ProjectSectionProps) => {
  return (
    <section id={id} className="py-16 scroll-mt-20">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-white/80 dark:bg-slate-800/80 sepia:bg-[#faf7ed]/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-[300px] md:h-full group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
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
            <div className="p-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <a 
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group inline-flex items-center gap-2 hover:text-primary dark:hover:text-primary sepia:hover:text-orange-700 transition-colors"
                >
                  <h3 className="text-2xl font-bold dark:text-gray-400 dark-hover:text-white">{title}</h3>
                  <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                </a>
                <p className="text-muted-foreground dark:text-gray-300 sepia:text-amber-900 mt-4 mb-6 leading-relaxed">
                  {description}
                </p>
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground dark:text-gray-200 sepia:text-amber-800">
                    Key Features:
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                        viewport={{ once: true }}
                        className="flex items-start gap-2 text-muted-foreground dark:text-gray-300 sepia:text-amber-900"
                      >
                        <ChevronRight size={16} className="mt-1 flex-shrink-0 text-primary dark:text-primary sepia:text-orange-700" />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};