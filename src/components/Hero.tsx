import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { ContactLinks } from "./ContactLinks";
import { TypeAnimation } from 'react-type-animation';
import { useState, useEffect } from "react";  // Add useEffect
import { ChevronDown, Code2 } from "lucide-react";

export const Hero = () => {
  const [showCode, setShowCode] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [metrics, setMetrics] = useState({
    cpu: 28,
    throughput: 92,
    cacheHit: 98,
    connections: 65,
    eviction: 0.001
  });

  const [isHovering, setIsHovering] = useState(false);

  // Add a subtle bounce animation to hint at the code peek
  const bounceAnimation = {
    y: [0, -3, 0],
    transition: {
      duration: 1.5,
      repeat: 2,
      repeatType: "reverse" as const,
      ease: "easeInOut",
      delay: 2, // Wait for initial animations to complete
    }
  };

  // Update time and metrics periodically
  useEffect(() => {
    if (!showCode && !isHovering) return;

    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const metricsInterval = setInterval(() => {
      setMetrics(prev => ({
        cpu: Math.min(95, Math.max(20, prev.cpu + (Math.random() - 0.5) * 10)),
        throughput: Math.min(95, Math.max(60, prev.throughput + (Math.random() - 0.5) * 5)),
        cacheHit: Math.min(99, Math.max(85, prev.cacheHit + (Math.random() - 0.5) * 2)),
        connections: Math.min(95, Math.max(70, prev.connections + (Math.random() - 0.5) * 5)),
        eviction: Math.max(0, Math.min(0.1, prev.eviction + (Math.random() - 0.5) * 0.01))
      }));
    }, 2000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(metricsInterval);
    };
  }, [showCode, isHovering]);

  const scrollToStack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const stackSection = document.querySelector('#stack');
    if (stackSection) {
      stackSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const codeSnippet = `import { skills } from "./skills.json";
  
function generateSequence() {  
  try {
    return skills.map(skill => ({
      text: enhance(skill),
      delay: 1000
    }));
  } catch (e) {
    return {
      status: 418,
      retry_after: "caffeine.replenish()"
    }
  }
}`;

  const getFormattedTime = (date: Date) => {
    return date.toISOString().replace('T', ' ').slice(0, 19);
  };

  const serverLogs = `[INFO] ${getFormattedTime(currentTime)} AWS::ECS::Service - Container deployment completed successfully
  [INFO] ${getFormattedTime(new Date(currentTime.getTime() + 1000))} AWS::CloudWatch - CPU utilization: ${metrics.cpu.toFixed(1)}%
  [INFO] ${getFormattedTime(new Date(currentTime.getTime() + 2000))} AWS::Lambda - Function cold start: 85ms
  [INFO] ${getFormattedTime(new Date(currentTime.getTime() + 3000))} AWS::EC2 - System health: Optimal
  [INFO] ${getFormattedTime(new Date(currentTime.getTime() + 4000))} AWS::ApiGateway - Request rate: 2500 req/s
  [INFO] ${getFormattedTime(new Date(currentTime.getTime() + 5000))} AWS::DynamoDB - Provisioned throughput: ${metrics.throughput.toFixed(1)}%
  [INFO] ${getFormattedTime(new Date(currentTime.getTime() + 6000))} AWS::CloudFront - Cache hit ratio: ${metrics.cacheHit.toFixed(1)}%
  [INFO] ${getFormattedTime(new Date(currentTime.getTime() + 7000))} AWS::RDS - Database connections: ${metrics.connections.toFixed(0)}/100
  [INFO] ${getFormattedTime(new Date(currentTime.getTime() + 8000))} AWS::SQS - Average message processing time: 45ms
  [INFO] ${getFormattedTime(new Date(currentTime.getTime() + 9000))} AWS::ElastiCache - Cache eviction: ${metrics.eviction.toFixed(3)}%`;

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/90 to-white/90 dark:from-slate-900/95 dark:to-slate-800/95 sepia:from-[#fdf6e3]/90 sepia:to-[#faf7ed]/90 -z-10" />
      <ContactLinks />
      <ThemeToggle />
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 cursor-pointer"
            onClick={() => setShowCode(prev => !prev)}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary dark:from-primary dark:to-secondary sepia:from-orange-700 sepia:to-amber-700">
              Hi, I'm Jethro!
            </h1>
            <div className="h-1 w-24 mx-auto bg-gradient-to-r from-primary to-secondary dark:from-primary dark:to-secondary sepia:from-orange-700 sepia:to-amber-700 rounded-full" />
          </motion.div>

          <div className="relative">
            <div 
              className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-2xl mx-auto h-20 cursor-pointer relative group" 
              onClick={() => setShowCode(prev => !prev)}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <TypeAnimation
                sequence={[
                  'I build scalable and performant applications',
                  1000,
                  'I craft beautiful user interfaces',
                  1000,
                  'I build to ship, and adapt quickly',
                  1000,
                  'I teach and mentor others',
                  1000
                ]}
                wrapper="span"
                speed={70}
                repeat={Infinity}
              />
              <motion.div 
                className="absolute -right-8 top-1/2 -translate-y-1/2 text-muted-foreground/60 group-hover:text-primary transition-colors"
                animate={!showCode ? bounceAnimation : {}}
              >
                <Code2 
                  size={20} 
                  className={`transform transition-transform duration-300 ${isHovering ? 'rotate-12' : ''}`}
                />
              </motion.div>
            </div>

            <AnimatePresence>
              {showCode && (
                <motion.div
                  initial={{ opacity: 0, y: -20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -20, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative mx-auto mb-12"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <motion.pre
                      className="text-left bg-black/80 backdrop-blur-sm rounded-lg p-6 font-mono text-sm text-green-400 overflow-x-auto"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: 0.2 }}
                    >
                      <TypeAnimation
                        sequence={[codeSnippet]}
                        wrapper="span"
                        speed={70}
                        cursor={true}
                      />
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute right-4 top-4 text-primary/60 group-hover:text-primary transition-colors"
                      >
                        <Code2 size={20} />
                      </motion.div>
                    </motion.pre>

                    <motion.pre
                      className="relative text-left bg-black/80 backdrop-blur-sm rounded-lg overflow-hidden"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="absolute top-0 left-0 right-0 h-8 bg-gray-800/50 rounded-t-lg flex items-center px-4">
                        <div className="flex gap-1.5 absolute left-4">
                          <div className="w-3 h-3 rounded-full bg-red-500/80" />
                          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                          <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        </div>
                        <div className="flex-1 text-center text-gray-400 text-sm">AWS Cloud Console</div>
                      </div>
                      <div className="mt-8 p-6 space-y-1 max-w-[600px]">
                        {serverLogs.split('\n').map((line, index) => (
                          <motion.div 
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ 
                              delay: index * 0.1,
                              duration: 0.3
                            }}
                            className={`font-mono text-sm ${
                              line.includes('[WARN]') 
                                ? 'text-yellow-400' 
                                : 'text-gray-300'
                            } hover:whitespace-normal hover:break-words`}
                          >
                            {line.trim()}
                          </motion.div>
                        ))}
                        <div className="inline-block w-2 h-4 bg-gray-400 animate-pulse" />
                      </div>
                    </motion.pre>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.a
              href="#stack"
              onClick={scrollToStack}
              className="group relative inline-flex items-center gap-2 px-8 py-3 bg-primary dark:bg-primary sepia:bg-orange-700 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="relative"
                animate={{ y: [0, 1, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2,
                  ease: "easeInOut"
                }}
              >
                <ChevronDown size={20} />
              </motion.div>
              <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};