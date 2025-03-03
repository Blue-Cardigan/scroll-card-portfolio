import matter from 'gray-matter';
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

// Updated glob configuration
const posts = import.meta.glob('../content/blog/*.md', { 
  eager: true,
  as: 'raw'
});

export async function getBlogPosts(): Promise<BlogPostMeta[]> {
  try {
    const allPosts = await Promise.all(
      Object.entries(posts).map(async ([filepath, content]) => {
        try {
          const slug = filepath.split('/').pop()?.replace('.md', '') || '';
          
          // Ensure content is properly handled as a string
          const fileContent = typeof content === 'string' ? content : '';
          const { data, content: markdownContent } = matter(fileContent);
          
          return {
            slug,
            title: data.title,
            date: data.date,
            excerpt: data.excerpt,
            author: data.author,
            tags: data.tags,
            image: data.image,
            readTime: calculateReadTime(markdownContent)
          };
        } catch (error) {
          console.error(`Error processing ${filepath}:`, error);
          return null;
        }
      })
    );

    return allPosts
      .filter((post): post is BlogPostMeta => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error getting blog posts:', error);
    throw error;
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
  try {
    // Find the correct file path for the given slug
    const filepath = Object.keys(posts).find(path => path.includes(`/${slug}.md`));
    
    if (!filepath) {
      throw new Error(`Post not found: ${slug}`);
    }

    const content = posts[filepath] as string;
    const { data, content: markdownContent } = matter(content);
    
    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      author: data.author,
      tags: data.tags,
      image: data.image,
      readTime: calculateReadTime(markdownContent),
      content: await marked(markdownContent)
    };
  } catch (error) {
    console.error(`Error getting blog post ${slug}:`, error);
    throw error;
  }
} 