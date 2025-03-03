import { useEffect, useRef } from 'react';

interface ProjectCardProps {
  title: string;
  url: string;
  description: string;
  image: string;
  index: number;
  id: string;
  features: string[];
}

export const ProjectCard = ({ title, url, description, image, index, id }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleClick = () => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      className="parallax-card bg-white/90 dark:bg-gray-800/90 sepia:bg-white/95 backdrop-blur-sm border border-white/20 shadow-lg dark:border-gray-700/20 sepia:border-black/5 rounded-xl p-6 transition-all duration-200 ease-out cursor-pointer"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative h-48 mb-6 overflow-hidden rounded-lg bg-white dark:bg-gray-900 sepia:bg-white">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300 sepia:contrast-100 sepia:saturate-100"
        />
      </div>
      <a href={url} target="_blank" rel="noopener noreferrer" className="block">
        <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">{title}</h3>
      </a>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};