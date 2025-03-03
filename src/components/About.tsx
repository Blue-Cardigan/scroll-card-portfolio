import { motion } from "framer-motion";

export const About = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-card rounded-2xl p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <motion.img
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                src="/me3.jpg"
                alt="Profile picture"
                className="w-48 h-48 rounded-full object-cover shadow-lg"
              />
              <div>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  I'm a high-agency fullstack developer with a strong backend foundation and eye for design. 
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  I bootstrap applications and bolster teams, learning and adapting to the tech. I work fast alone and thrive in a strong team dynamic.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  I started using Cursor-IDE in 2023, and have been a daily user since.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};