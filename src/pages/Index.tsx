import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Stack } from "../components/Stack";
import { ProjectSection } from "../components/ProjectSection";
import { Footer } from "../components/Footer";
import { SmallerProjects } from "../components/SmallerProjects";

const projects = [
  {
    id: "whatgov",
    url: "https://whatgov.co.uk",
    title: "WhatGov - Political Monitoring Platform",
    description: "Full-stack application for easy political monitoring, with individual and enterprise tiers and full SEO. Features modern UI/UX, daily data processing pipeline using Government APIs, Github Actions, Stripe payments, and OpenAI integration.",
    image: "/whatgov-screenshot.png",
    features: [
      "Supabase + RPC Functions",
      "Indexed Database Tables",
      "OpenAI API Integration",
      "Github Actions Workflow",
      "Enterprise & Individual Tiers",
      "Stripe Payment Integration",
    ]
  },
  {
    id: "flood-defence",
    title: "Flood Defence - Department for Business & Trade",
    url: "https://coefficient.ai",
    description: "Tailwind/Python security-oriented platform with sizable codebase hosted on AWS infrastructure. Revamped for open-source while teamed with highly experienced Coefficient team on ACE commission.",
    image: "/coefficient.png",
    features: [
      "GraphQL Static & Dynamic APIs",
      "Custom proxy solution",
      "React Frontend",
      "Python Backend",
      "AWS Infrastructure",
      "Lean Team Rapid Delivery"
    ]
  },
  {
    id: "election-forecast",
    title: "UK Election Forecasting Dashboard",
    url: "https://polling-dashboard-357215153feb.herokuapp.com/",
    description: "Data Visualization Platform showing forecasts using private polling data. Forecasts used industry gold-standard Multilinear Regression with Poststratification (MLP) and display using interactive Plotly diagrams.",
    image: "/sankey.png",
    features: [
      "Multilinear Regression",
      "Poststratification Analysis",
      "Interactive Plotly Charts",
      "Secure Authentication",
      "Private Access Control"
    ]
  },
  {
    id: "ai-workshops",
    title: "AI for Campaigners Workshops",
    url: "https://community.socialmovementtechnologies.org/courses/ai-for-social-justice-groups/",
    description: "Comprehensive 2-hour workshops on LLMs and practical AI applications, delivered to 100+ participants across US, Europe, and Africa.",
    image: "/workshop.png",
    features: [
      "LLM Technology Overview",
      "Practical Applications",
      "International Delivery",
      "100+ Participants",
      "Hands-on Exercises"
    ]
  },
  {
    id: "crm",
    title: "MP Office Casework Management CRM",
    description: "Automated casework management system using Airtable and Make.com, streamlining MP office workflows and email processing.",
    image: "/airtable-make.png",
    features: [
      "Outlook Email Integration",
      "Automated Case Processing",
      "Workflow Management",
      "Airtable Database",
      "Make.com Automation"
    ]
  },
  {
    id: "nlp-analysis",
    title: "Substack Thematic Analysis",
    url: "https://docs.google.com/document/d/1nl4gViPYo7IXjh-jIYkMl0qc2pUG6doWk7fFLYAVChI",
    description: "NLP-based content analysis using advanced topic modeling techniques including TFIDF, LDA, and LLM classification.",
    image: "/lda.png",
    features: [
      "Modified Z-Score ranking",
      "TFIDF Processing",
      "LDA Implementation",
      "LLM Classification",
      "Topic Modeling",
      "Content Insights"
    ]
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 sepia:from-[#fdf6e3] sepia:to-[#faf7ed]">
      <Hero />
      
      {/* <section id="projects" className="py-20">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-slate-900 dark:text-slate-100 sepia:text-orange-900">Featured</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                {...project} 
                index={index}
                url={project.url || ''}
              />
            ))}
          </div>
        </div>
      </section> */}

      <About />
      <Stack />

      {/* Detailed Project Sections */}
      {projects.map((project) => (
        <ProjectSection key={project.id} {...project} url={project.url || ''} />
      ))}
      
      {/* Add the SmallerProjects component here */}
      <SmallerProjects />
      
      <Footer />
    </div>
  );
};

export default Index;