import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Search, Tag, Calendar, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getBlogPosts } from "../lib/blog";
import type { BlogPostMeta } from "../lib/blog";

export default function Blog() {
  const [posts, setPosts] = useState<BlogPostMeta[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [typedText, setTypedText] = useState('');
  const fullText = "things I think are worth writing about";
  const [typingIndex, setTypingIndex] = useState(0);

  // Canvas reference for background animation
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.className = savedTheme;
    } else {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = systemPrefersDark ? 'dark' : 'light';
      document.documentElement.className = theme;
      localStorage.setItem('theme', theme);
    }
  }, []);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setIsLoading(true);
        const posts = await getBlogPosts();
        setPosts(posts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  useEffect(() => {
    if (typingIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(prev => prev + fullText[typingIndex]);
        setTypingIndex(typingIndex + 1);
      }, 50); // Adjust speed as needed
      
      return () => clearTimeout(timeout);
    }
  }, [typingIndex, fullText]);

  // Background animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      const heroSection = canvas.parentElement;
      if (heroSection) {
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create code particles
    const particles: {
      x: number;
      y: number;
      size: number;
      speed: number;
      text: string;
      opacity: number;
      color: string;
    }[] = [];
    
    const codeSnippets = [
      '<div>', '</div>', 'const', 'function()', 'return', 'import', 
      'export', 'useState', 'useEffect', '{...}', '=>',
      'AI', 'Cursor', 'Vercel', '</>',
    ];
    
    // Initialize particles
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 8 + Math.random() * 8,
        speed: 0.2 + Math.random() * 0.3,
        text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
        opacity: 0.1 + Math.random() * 0.2,
        color: `hsl(${Math.random() * 60 + 170}, 70%, 60%)`
      });
    }
    
    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        // Move particle upward
        particle.y -= particle.speed;
        
        // Reset position if off-screen
        if (particle.y < -20) {
          particle.y = canvas.height + 20;
          particle.x = Math.random() * canvas.width;
        }
        
        // Draw text
        ctx.font = `${particle.size}px monospace`;
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fillText(particle.text, particle.x, particle.y);
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));

  const filteredPosts = posts.filter(post => {
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section with Background Animation */}
      <section className="py-16 relative overflow-hidden">
        {/* Background Canvas */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full z-200"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 to-background/70 -z-5"></div>
        
        <div className="container px-4 mx-auto relative z-10">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Blog
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {typedText}
            <span className="inline-block w-1 h-5 -mb-0.5 ml-1 bg-primary animate-blink"></span>
          </motion.p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              {allTags.map(tag => (
                <motion.button
                  key={tag}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${
                    selectedTag === tag 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-100 dark:bg-gray-800 text-muted-foreground hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                >
                  <Tag size={14} />
                  {tag}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <Link to={`/blog/${post.slug}`}>
                  <div className="glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-200/50 dark:border-gray-700/50">
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      
                      {/* Tags positioned over image */}
                      <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                          <span 
                            key={tag}
                            className="text-xs px-3 py-1 rounded-full 
                              bg-white/90 dark:bg-gray-900/90 
                              text-primary dark:text-primary-foreground
                              backdrop-blur-sm border border-primary/10
                              font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-6">
                      {/* Meta info with updated styling */}
                      <div className="flex gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1.5 bg-muted/30 px-2 py-1 rounded-md">
                          <Calendar size={14} className="text-primary" />
                          {new Date(post.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1.5 bg-muted/30 px-2 py-1 rounded-md">
                          <Clock size={14} className="text-primary" />
                          {post.readTime}
                        </span>
                      </div>

                      {/* Title and excerpt */}
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground line-clamp-2">
                        {post.excerpt}
                      </p>

                      {/* Read more indicator */}
                      <div className="mt-4 flex items-center gap-2 text-primary font-medium">
                        Read more 
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 