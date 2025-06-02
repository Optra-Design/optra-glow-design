import React, { useEffect } from 'react';
import Navigation from '../components/Navigation';
import AnimatedHeroText from '../components/AnimatedHeroText';
import SecretSudoButton from '../components/SecretSudoButton';
import { ArrowRight, Sparkles, Zap, Palette, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  useEffect(() => {
    // SEO meta tags
    document.title = 'Optra Design - Premium Design Studio by Aniketh | Brand Identity & Digital Experiences';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Optra Design is a premium design studio founded by Aniketh in Bangalore. We create distinctive brand identities, interactive digital experiences, and strategic creative direction that elevates your business.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Optra Design is a premium design studio founded by Aniketh in Bangalore. We create distinctive brand identities, interactive digital experiences, and strategic creative direction that elevates your business.';
      document.head.appendChild(meta);
    }

    // Keywords meta tag
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = 'design studio, brand identity, UI UX design, digital experiences, creative direction, Bangalore designer, Aniketh, Optra Design, web design, graphic design';
      document.head.appendChild(meta);
    }

    console.log(`
    🎨 Welcome to Optra Design's console!
    
    ╔═══════════════════════════════════════╗
    ║           OPTRA DESIGN               ║
    ║        Shape. Style. Scale.          ║
    ║         Founded by Aniketh           ║
    ╚═══════════════════════════════════════╝
    
    Try typing:
    - optra.sudo() for hidden features
    - optra.magic() for something special
    - optra.contact() for quick contact
    
    Built with ❤️ by Aniketh in Bangalore
    `);

    (window as any).optra = {
      sudo: () => {
        document.dispatchEvent(new CustomEvent('sudo-mode-toggle'));
        console.log('🔓 Sudo mode toggled! Welcome to the admin zone, Aniketh!');
      },
      magic: () => {
        document.body.classList.add('glitch');
        setTimeout(() => document.body.classList.remove('glitch'), 2000);
        console.log('✨ Magic activated by the founder!');
      },
      contact: () => {
        window.location.href = 'mailto:aniketh@optra.me';
        console.log('📧 Opening contact to Aniketh...');
      }
    };
  }, []);

  const features = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Brand Identity",
      description: "Distinctive visual systems that capture essence and drive recognition."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Digital Experiences",
      description: "Interactive interfaces that engage, delight, and convert users."
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Creative Direction",
      description: "Strategic vision that aligns creativity with business objectives."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Consultation",
      description: "Expert guidance to elevate your design and brand strategy."
    }
  ];

  return (
    <div className="min-h-screen relative">
      <Navigation />
      <SecretSudoButton />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 relative">
        <AnimatedHeroText />
        
        {/* Caution Button - Hidden Easter Egg */}
        <Link 
          to="/404" 
          className="absolute bottom-8 right-8 opacity-10 hover:opacity-100 transition-opacity duration-300 text-xs text-foreground/50 hover:text-gradient"
          aria-label="Hidden easter egg"
        >
          ⚠️
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-gradient mb-6">
              Crafted by Aniketh
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Every pixel purposeful. Every interaction intentional. 
              Every design decision driven by passion and innovation from Bangalore's premier design studio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-8 glass rounded-2xl hover:bg-white/10 transition-all duration-500 glow-hover animate-fade-in cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-gradient mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-gradient transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 relative">
        <div className="max-w-4xl mx-auto text-center glass p-12 rounded-3xl glow-hover">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Ready to Transform?
          </h2>
          <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
            Let's create something extraordinary together with Aniketh. 
            Premium design solutions that elevate your brand and captivate your audience.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/contact"
              className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FF6B35] via-[#E91E63] to-[#9C27B0] text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 glow-hover"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            
            <Link 
              to="/blog"
              className="px-8 py-4 border border-white/20 text-foreground font-semibold rounded-full hover:bg-white/5 transition-all duration-300 hover:border-white/40 hover:text-gradient"
            >
              Read the Blog
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-sm text-foreground/50">
              Founded by Aniketh in Bangalore • Response within 48 hours • Premium quality guaranteed
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
