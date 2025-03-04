import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Stack } from "../components/Stack";
import { ProjectSection, getMainProjects } from "../components/ProjectSection";
import { Footer } from "../components/Footer";
import { Helmet } from 'react-helmet-async';

const Index = () => {
  // You can customize these values or pull them from a config
  const title = "Jethro Reeve - Full Stack Developer";
  const description = "Full Stack Developer & Political Technology Specialist with expertise in React, TypeScript, and political technology solutions.";
  const siteUrl = "https://jethroreeve.co.uk";
  
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={siteUrl} />
        
        {/* Open Graph Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${siteUrl}/og-image.png`} />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${siteUrl}/og-image.png`} />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 sepia:from-[#fdf6e3] sepia:to-[#faf7ed]">
        <Hero />
        <About />
        <Stack />

        <h2 className="mt-16 text-3xl md:text-4xl font-bold mb-12 text-center dark:text-white">Project Timeline</h2>
        <div className="relative container px-4 mx-auto my-8">
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20 dark:from-primary/30 dark:via-primary/60 dark:to-primary/30" />
          
          {getMainProjects().map((project, index) => (
            <ProjectSection 
              key={project.id} 
              {...project} 
              url={project.url || ''} 
              isEven={index % 2 === 0}
            />
          ))}
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;