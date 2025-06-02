import React from 'react';
import Navigation from '../components/Navigation';
import { Palette, Monitor, Lightbulb, Users, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Brand Identity",
      description: "Complete visual identity systems that capture your essence and drive recognition.",
      features: [
        "Logo design & brand marks",
        "Color palette & typography",
        "Brand guidelines & style guides",
        "Business card & stationery design",
        "Brand strategy & positioning"
      ],
      timeline: "3-6 weeks"
    },
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Digital Experiences",
      description: "Interactive interfaces that engage, delight, and convert your audience.",
      features: [
        "Website design & development",
        "Mobile app interface design",
        "User experience optimization",
        "Responsive design systems",
        "Interactive prototyping"
      ],
      timeline: "4-8 weeks"
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Creative Direction",
      description: "Strategic vision that aligns creativity with your business objectives.",
      features: [
        "Creative strategy development",
        "Campaign conceptualization",
        "Art direction & styling",
        "Content visual guidelines",
        "Multi-platform design systems"
      ],
      timeline: "2-4 weeks"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Design Consultation",
      description: "Expert guidance to elevate your existing design and brand strategy.",
      features: [
        "Design audit & analysis",
        "Brand strategy consultation",
        "Design system optimization",
        "Team training & workshops",
        "Ongoing design support"
      ],
      timeline: "1-2 weeks"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Discovery",
      description: "Deep dive into your brand, goals, and target audience to understand the full scope."
    },
    {
      step: "02",
      title: "Strategy",
      description: "Develop a comprehensive design strategy aligned with your business objectives."
    },
    {
      step: "03",
      title: "Design",
      description: "Create exceptional designs through iterative refinement and collaborative feedback."
    },
    {
      step: "04",
      title: "Delivery",
      description: "Deliver polished assets with comprehensive guidelines and ongoing support."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-6">
              Premium Services
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Comprehensive design solutions crafted to elevate your brand and 
              create meaningful connections with your audience.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-24">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group glass p-8 rounded-3xl hover:bg-white/10 transition-all duration-500 glow-hover animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="text-gradient group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <div className="text-right text-sm text-foreground/60">
                    <p>{service.timeline}</p>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gradient mb-4">
                  {service.title}
                </h3>
                
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-sm text-foreground/80">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  to="/contact"
                  className="inline-flex items-center gap-2 text-gradient font-semibold hover:gap-3 transition-all duration-300"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>

          {/* Process */}
          <div className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
                The Process
              </h2>
              <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                A structured approach that ensures exceptional results 
                and seamless collaboration throughout your project.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((phase, index) => (
                <div 
                  key={index}
                  className="text-center group animate-fade-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="relative mb-6">
                    <div className="w-16 h-16 mx-auto bg-optra-gradient rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                      {phase.step}
                    </div>
                    {index < process.length - 1 && (
                      <div className="hidden lg:block absolute top-8 left-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gradient mb-3">
                    {phase.title}
                  </h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center glass p-12 rounded-3xl">
            <h2 className="text-4xl font-bold text-gradient mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
              Let's discuss your vision and create something extraordinary together. 
              Every great design begins with a conversation.
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
                to="/work"
                className="px-8 py-4 border border-white/20 text-foreground font-semibold rounded-full hover:bg-white/5 transition-all duration-300 hover:border-white/40"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
