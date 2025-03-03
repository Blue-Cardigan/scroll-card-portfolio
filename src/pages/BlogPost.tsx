import { motion } from "framer-motion";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { getBlogPost } from "../lib/blog";
import type { BlogPost as BlogPostType } from "../lib/blog";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setError('Post not found');
        setLoading(false);
        return;
      }

      try {
        const postData = await getBlogPost(slug);
        setPost(postData);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load post:', err);
        setError('Failed to load post');
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  // Handle 404 gracefully
  useEffect(() => {
    if (error === 'Post not found') {
      navigate('/blog', { replace: true });
    }
  }, [error, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post not found</h1>
          <Link 
            to="/blog"
            className="text-primary hover:underline inline-flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <motion.section 
        className="relative h-[60vh] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
        </div>
        
        <div className="container px-4 mx-auto relative z-10 text-white">
          <Link 
            to="/blog"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Blog
          </Link>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {post.title}
          </motion.h1>

          <motion.div 
            className="flex items-center gap-6 text-white/80"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-2">
              <img 
                src={post.author.avatar} 
                alt={post.author.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span>{post.author.name}</span>
            </div>
            <span className="flex items-center gap-1">
              <Calendar size={16} />
              {new Date(post.date).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={16} />
              {post.readTime}
            </span>
          </motion.div>
        </div>
      </motion.section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-2 mb-8">
              {post.tags.map(tag => (
                <span 
                  key={tag}
                  className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm text-muted-foreground"
                >
                  <Tag size={14} className="inline mr-1" />
                  {tag}
                </span>
              ))}
            </div>
            
            <motion.div 
              className="prose dark:prose-invert max-w-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </section>
    </div>
  );
} 