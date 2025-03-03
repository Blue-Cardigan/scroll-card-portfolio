import type { ComponentType } from 'react';
import { marked } from 'marked';
import { Buffer } from 'buffer';

// Add this polyfill
window.Buffer = Buffer;

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
  };
  readTime: string;
  tags: string[];
  image: string;
  content: string;
}

export interface BlogPostMeta extends Omit<BlogPost, 'content'> {}

function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min`;
}

// Updated glob configuration with better caching
const posts = import.meta.glob('../content/blog/*.md', { 
  eager: true,
  as: 'raw'
});

// Remove gray-matter dependency and implement a simpler frontmatter parser
function parseFrontMatter(content: string) {
  const frontMatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontMatterRegex);
  
  if (!match) {
    return {
      data: {},
      content: content
    };
  }

  const frontMatter = match[1];
  const remainingContent = content.replace(match[0], '').trim();
  
  // Parse the YAML-like front matter
  const data: Record<string, any> = {};
  let currentKey: string | null = null;
  let currentObject: Record<string, any> | null = null;
  
  frontMatter.split('\n').forEach(line => {
    // Skip empty lines
    if (!line.trim()) return;
    
    // Check for indentation to detect nested objects
    const indentMatch = line.match(/^(\s+)/);
    const isIndented = indentMatch !== null;
    
    if (!isIndented) {
      // This is a top-level key
      const [key, ...values] = line.split(':');
      if (key && values.length) {
        currentKey = key.trim();
        const value = values.join(':').trim();
        
        // Check if this is the start of an object (no value after colon)
        if (!value) {
          data[currentKey] = {};
          currentObject = data[currentKey];
        } else {
          // Handle arrays marked with -
          if (value.includes('-')) {
            data[currentKey] = value.split('-')
              .map(item => item.trim())
              .filter(Boolean);
          } else {
            // Remove quotes if present
            data[currentKey] = value.replace(/^['"](.*)['"]$/, '$1');
          }
          currentObject = null;
        }
      }
    } else if (currentObject !== null && currentKey !== null) {
      // This is a nested property
      const trimmedLine = line.trim();
      const [key, ...values] = trimmedLine.split(':');
      if (key && values.length) {
        const nestedKey = key.trim();
        const value = values.join(':').trim();
        
        // Remove quotes if present
        currentObject[nestedKey] = value.replace(/^['"](.*)['"]$/, '$1');
      }
    }
  });

  return {
    data,
    content: remainingContent
  };
}

// Improved caching with TTL and memory management
const postCache: Map<string, { data: BlogPost, timestamp: number }> = new Map();
const postsMetaCache: { data: BlogPostMeta[] | null, timestamp: number } = { data: null, timestamp: 0 };
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds
const MAX_CACHE_SIZE = 50; // Maximum number of posts to keep in cache

// Helper to clean up old cache entries
function cleanupCache() {
  if (postCache.size > MAX_CACHE_SIZE) {
    // Sort by timestamp and remove oldest entries
    const entries = Array.from(postCache.entries())
      .sort((a, b) => b[1].timestamp - a[1].timestamp)
      .slice(0, MAX_CACHE_SIZE);
    
    postCache.clear();
    entries.forEach(([key, value]) => postCache.set(key, value));
  }
}

export async function getBlogPosts(): Promise<BlogPostMeta[]> {
  // Check if we have cached data that's still fresh
  if (postsMetaCache.data && (Date.now() - postsMetaCache.timestamp < CACHE_TTL)) {
    return postsMetaCache.data;
  }
  
  try {
    const allPosts = await Promise.all(
      Object.entries(posts).map(async ([filepath, content]) => {
        try {
          const slug = filepath.split('/').pop()?.replace('.md', '') || '';
          const fileContent = typeof content === 'string' ? content : '';
          const { data, content: markdownContent } = parseFrontMatter(fileContent);
          
          return {
            slug,
            title: data.title || '',
            date: data.date || '',
            excerpt: data.excerpt || '',
            author: data.author || { name: '', avatar: '' },
            tags: Array.isArray(data.tags) ? data.tags : [],
            image: data.image || '',
            readTime: calculateReadTime(markdownContent)
          };
        } catch (error) {
          console.error(`Error processing ${filepath}:`, error);
          return null;
        }
      })
    );

    const result = allPosts
      .filter((post): post is BlogPostMeta => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    // Cache the result before returning
    postsMetaCache.data = result;
    postsMetaCache.timestamp = Date.now();
    return result;
  } catch (error) {
    console.error('Error getting blog posts:', error);
    throw error;
  }
}

// Memoized markdown parser
const parsedMarkdownCache = new Map<string, string>();
async function parseMarkdown(content: string): Promise<string> {
  const cacheKey = content.substring(0, 100); // Use first 100 chars as key to avoid memory issues
  
  if (parsedMarkdownCache.has(cacheKey)) {
    return parsedMarkdownCache.get(cacheKey)!;
  }
  
  const parsed = await marked(content);
  parsedMarkdownCache.set(cacheKey, parsed);
  
  // Limit cache size
  if (parsedMarkdownCache.size > 50) {
    const firstKey = parsedMarkdownCache.keys().next().value;
    parsedMarkdownCache.delete(firstKey);
  }
  
  return parsed;
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
  // Check cache first
  const cachedPost = postCache.get(slug);
  if (cachedPost && (Date.now() - cachedPost.timestamp < CACHE_TTL)) {
    return cachedPost.data;
  }
  
  try {
    // Find the correct file path for the given slug
    const filepath = Object.keys(posts).find(path => path.includes(`/${slug}.md`));
    
    if (!filepath) {
      throw new Error(`Post not found: ${slug}`);
    }

    const content = posts[filepath] as string;
    const { data, content: markdownContent } = parseFrontMatter(content);
    
    const blogPost = {
      slug,
      title: data.title || '',
      date: data.date || '',
      excerpt: data.excerpt || '',
      author: data.author || { name: '', avatar: '' },
      tags: Array.isArray(data.tags) ? data.tags : [],
      image: data.image || '',
      readTime: calculateReadTime(markdownContent),
      content: await parseMarkdown(markdownContent)
    };
    
    // Cache the result
    postCache.set(slug, { data: blogPost, timestamp: Date.now() });
    cleanupCache();
    
    return blogPost;
  } catch (error) {
    console.error(`Error getting blog post ${slug}:`, error);
    throw error;
  }
} 