import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
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
  
  // Animation frame reference to properly cancel animation
  const animationFrameRef = useRef<number | null>(null);
  
  // Store particles in a ref to avoid re-creating on each render
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    radius: number;
    color: string;
    speedX: number;
    speedY: number;
  }>>([]);

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

    // Return a cleanup function to handle component unmounting
    return () => {
      // Cancel any pending animation frames
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Memoize the resize handler to avoid recreating on each render
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
    
    // Re-initialize particles when canvas size changes
    initParticles();
  }, []);

  // Initialize particles only once and store in ref
  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const isDarkMode = document.documentElement.classList.contains('dark');
    const particles = [];
    const particleCount = Math.min(50, Math.floor(canvas.width * canvas.height / 10000));
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: isDarkMode ? 
          `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.1})` : 
          `rgba(0, 0, 0, ${Math.random() * 0.1 + 0.05})`,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5
      });
    }
    
    particlesRef.current = particles;
  }, []);

  // Optimize animation with useCallback to avoid recreation on each render
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Use particles from ref
    const particles = particlesRef.current;
    
    particles.forEach(particle => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Bounce off walls
      if (particle.x < 0 || particle.x > canvas.width) {
        particle.speedX *= -1;
      }
      
      if (particle.y < 0 || particle.y > canvas.height) {
        particle.speedY *= -1;
      }
      
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    });
    
    // Store animation frame ID for cleanup
    animationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  // Initialize animation
  useEffect(() => {
    const initAnimation = () => {
      resizeCanvas();
      animate();
    };
    
    initAnimation();
    
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [resizeCanvas, animate]);

  // Typing animation effect
  useEffect(() => {
    if (typingIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(prev => prev + fullText[typingIndex]);
        setTypingIndex(prev => prev + 1);
      }, 100);
      
      return () => clearTimeout(timeout);
    }
  }, [typingIndex, fullText]);

  // Memoize filtered posts to avoid recalculating on every render
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTag = selectedTag === null || 
        post.tags.includes(selectedTag);
      
      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  // Memoize unique tags to avoid recalculating on every render
  const uniqueTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach(post => {
      post.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }, [posts]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 sepia:bg-[#fdf6e3] relative">
      {/* Background canvas with particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full"
        />
      </div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <Link 
              to="/" 
              className="inline-block mb-8 text-primary hover:text-primary/80 transition-colors"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2"
              >
                <ArrowRight className="rotate-180" size={20} />
                <span className="font-medium">Back to Home</span>
              </motion.div>
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white sepia:text-slate-800">
              Blog
            </h1>
            <div className="h-1 w-16 bg-primary mx-auto mb-6" />
            <p className="text-lg text-slate-600 dark:text-slate-300 sepia:text-slate-600">
              {typedText}
              <span className="inline-block w-1 h-5 bg-primary ml-1 animate-blink" />
            </p>
          </motion.div>
          
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white sepia:bg-[#eee8d5] sepia:border-[#eee8d5] sepia:text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedTag === null
                      ? 'bg-primary text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 sepia:bg-[#eee8d5] sepia:text-slate-700'
                  }`}
                >
                  <Tag size={14} />
                  <span>All</span>
                </button>
                
                {uniqueTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      selectedTag === tag
                        ? 'bg-primary text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 sepia:bg-[#eee8d5] sepia:text-slate-700'
                    }`}
                  >
                    <Tag size={14} />
                    <span>{tag}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
            </div>
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-center text-red-800 dark:text-red-200">
              {error}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-500 dark:text-slate-400">No posts found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid gap-8">
              {filteredPosts.map((post) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-slate-800 sepia:bg-[#fdf6e3] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <Link to={`/blog/${post.slug}`} className="block group">
                    <div className="md:flex">
                      <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                          width="300"
                          height="200"
                        />
                      </div>
                      <div className="p-6 md:w-2/3">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.map(tag => (
                            <span
                              key={tag}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                              onClick={(e) => {
                                e.preventDefault();
                                setSelectedTag(tag);
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <h2 className="text-xl font-bold mb-2 text-slate-900 dark:text-white sepia:text-slate-800 group-hover:text-primary transition-colors">
                          {post.title}
                        </h2>
                        
                        <p className="text-slate-600 dark:text-slate-300 sepia:text-slate-600 mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 sepia:text-slate-500">
                          <div className="flex items-center mr-4">
                            <Calendar size={14} className="mr-1" />
                            <span>{new Date(post.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <Clock size={14} className="mr-1" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 