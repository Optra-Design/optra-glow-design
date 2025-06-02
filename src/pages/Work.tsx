
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Work = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: "Zenith Finance",
      category: "brand-identity",
      type: "Brand Identity & Digital Platform",
      description: "Complete brand transformation for a fintech startup, including logo design, visual identity, and responsive web platform.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800",
      tags: ["Branding", "Web Design", "Fintech"],
      year: "2024",
      link: "#"
    },
    {
      id: 2,
      title: "Artisan Collective",
      category: "web-design",
      type: "E-commerce Platform",
      description: "Premium e-commerce experience for luxury handcrafted goods, focusing on storytelling and artisan showcase.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      tags: ["E-commerce", "UX/UI", "Luxury"],
      year: "2024",
      link: "#"
    },
    {
      id: 3,
      title: "TechFlow Solutions",
      category: "brand-identity",
      type: "Corporate Rebrand",
      description: "Modern rebrand for B2B software company, creating a cohesive system across all touchpoints.",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800",
      tags: ["Rebrand", "B2B", "Software"],
      year: "2023",
      link: "#"
    },
    {
      id: 4,
      title: "Wellness Studio",
      category: "web-design",
      type: "Booking Platform",
      description: "Serene digital experience for wellness center with integrated booking system and member portal.",
      image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=800",
      tags: ["Wellness", "Booking", "Health"],
      year: "2023",
      link: "#"
    },
    {
      id: 5,
      title: "EcoVenture",
      category: "brand-identity",
      type: "Sustainable Brand",
      description: "Environmental consultancy brand that reflects their commitment to sustainability and innovation.",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
      tags: ["Sustainability", "Consulting", "Environment"],
      year: "2023",
      link: "#"
    },
    {
      id: 6,
      title: "Creative Agency Hub",
      category: "web-design",
      type: "Portfolio Showcase",
      description: "Dynamic portfolio platform for creative agency with immersive project presentations.",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800",
      tags: ["Portfolio", "Creative", "Agency"],
      year: "2024",
      link: "#"
    }
  ];

  const filters = [
    { id: 'all', label: 'All Work' },
    { id: 'brand-identity', label: 'Brand Identity' },
    { id: 'web-design', label: 'Web Design' },
    { id: 'app-design', label: 'App Design' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-6">
              Selected Works
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              A curated collection of projects that showcase our commitment to 
              exceptional design and meaningful impact.
            </p>
          </div>

          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-optra-gradient text-white'
                    : 'bg-white/10 text-foreground/70 hover:bg-white/20 hover:text-foreground'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id}
                className="group glass rounded-3xl overflow-hidden hover:bg-white/10 transition-all duration-500 glow-hover animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden aspect-video">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/30">
                    <ExternalLink className="w-5 h-5 text-white" />
                  </button>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gradient bg-white/10 px-3 py-1 rounded-full">
                      {project.year}
                    </span>
                    <span className="text-xs text-foreground/60">
                      {project.type}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gradient mb-3 group-hover:text-white transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-foreground/70 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="text-xs px-2 py-1 bg-white/10 rounded-full text-foreground/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button className="flex items-center gap-2 text-gradient font-semibold text-sm hover:gap-3 transition-all duration-300">
                    View Project
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
            {[
              { number: "50+", label: "Projects Completed" },
              { number: "25+", label: "Happy Clients" },
              { number: "3", label: "Years Experience" },
              { number: "100%", label: "Satisfaction Rate" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="text-center glass p-6 rounded-2xl animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                  {stat.number}
                </div>
                <div className="text-foreground/70 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center glass p-12 rounded-3xl">
            <h2 className="text-4xl font-bold text-gradient mb-6">
              Ready to Create Your Next Project?
            </h2>
            <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
              Join our collection of successful projects. Let's create something 
              extraordinary that sets you apart from the competition.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/contact"
                className="group flex items-center gap-2 px-8 py-4 bg-optra-gradient text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 glow-hover"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              
              <Link 
                to="/services"
                className="px-8 py-4 border border-white/20 text-foreground font-semibold rounded-full hover:bg-white/5 transition-all duration-300 hover:border-white/40"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
