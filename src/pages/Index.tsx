import { Hero } from "../components/Hero";
import { ProjectCard } from "../components/ProjectCard";
import { About } from "../components/About";
import { Skills } from "../components/Skills";
import { ProjectSection } from "../components/ProjectSection";

const projects = [
  {
    id: "whatgov",
    title: "WhatGov - Political Monitoring Platform",
    description: "Full-stack application with individual and enterprise tiers for public political monitoring. Features modern UI/UX, daily data processing pipeline using Government APIs, and OpenAI integration.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    features: [
      "Supabase Backend with RPC Functions",
      "Indexed Database Tables",
      "OpenAI API Integration",
      "Github Actions Workflow",
      "Enterprise & Individual Tiers"
    ]
  },
  {
    id: "flood-defence",
    title: "Flood Defence - Department for Business & Trade",
    description: "Team project developed at Coefficient, combining React frontend with Python backend, hosted on AWS infrastructure.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    features: [
      "React Frontend",
      "Python Backend",
      "AWS Infrastructure",
      "Team Collaboration",
      "Government Client Integration"
    ]
  },
  {
    id: "crm",
    title: "MP Office Casework Management CRM",
    description: "Automated casework management system using Airtable and Make.com, streamlining MP office workflows and email processing.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    features: [
      "Outlook Email Integration",
      "Automated Case Processing",
      "Workflow Management",
      "Airtable Database",
      "Make.com Automation"
    ]
  },
  {
    id: "election-forecast",
    title: "UK Election Forecasting Dashboard",
    description: "Machine Learning Platform and Data Dashboard for private clients with secure login system and specialized audience access.",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    features: [
      "Secure Authentication",
      "MLP Implementation",
      "Interactive Dashboard",
      "Private Access Control",
      "Real-time Updates"
    ]
  },
  {
    id: "ai-workshops",
    title: "AI for Campaigners Workshops",
    description: "Comprehensive 2-hour workshops on LLMs and practical AI applications, delivered to 100+ participants across US, Europe, and Africa.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    features: [
      "LLM Technology Overview",
      "Practical Applications",
      "International Delivery",
      "100+ Participants",
      "Hands-on Exercises"
    ]
  },
  {
    id: "nlp-analysis",
    title: "Substack Thematic Analysis",
    description: "NLP-based content analysis using advanced topic modeling techniques including LDA, LSA, and TF-IDF.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    features: [
      "LDA Implementation",
      "LSA Analysis",
      "TF-IDF Processing",
      "Topic Modeling",
      "Content Insights"
    ]
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Hero />
      
      <section id="projects" className="py-20">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} {...project} index={index} />
            ))}
          </div>
        </div>
      </section>

      <About />
      <Skills />

      {/* Detailed Project Sections */}
      {projects.map((project) => (
        <ProjectSection key={project.id} {...project} />
      ))}
    </div>
  );
};

export default Index;