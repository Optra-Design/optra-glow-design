
import React from 'react';
import Navigation from '../components/Navigation';
import { MapPin, Clock, Mail, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-6">
              About Optra
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              A solo founder's journey to create extraordinary digital experiences 
              that matter, delight, and transform.
            </p>
          </div>

          {/* Story */}
          <div className="space-y-12">
            <div className="glass p-8 rounded-3xl">
              <h2 className="text-3xl font-bold text-gradient mb-6">The Story</h2>
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-foreground/80 leading-relaxed mb-4">
                  Optra was born from a simple belief: exceptional design has the power to 
                  transform businesses, elevate experiences, and create lasting impact. 
                  Founded as a solo design studio in the vibrant tech hub of Bangalore, 
                  Optra represents the convergence of creativity and strategy.
                </p>
                <p className="text-foreground/80 leading-relaxed mb-4">
                  Every project is approached with meticulous attention to detail, 
                  understanding that great design isn't just about aesthetics—it's about 
                  solving problems, telling stories, and creating connections that resonate 
                  with audiences on a deeper level.
                </p>
                <p className="text-foreground/80 leading-relaxed">
                  The name "Optra" reflects our core philosophy: the ability to shape 
                  perceptions, style interactions, and scale impact through thoughtful, 
                  purposeful design decisions.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass p-8 rounded-3xl">
                <h3 className="text-2xl font-bold text-gradient mb-4">Vision</h3>
                <p className="text-foreground/80 leading-relaxed">
                  To become the go-to design partner for ambitious brands and visionary 
                  leaders who understand the transformative power of exceptional design 
                  and aren't afraid to stand out.
                </p>
              </div>

              <div className="glass p-8 rounded-3xl">
                <h3 className="text-2xl font-bold text-gradient mb-4">Approach</h3>
                <p className="text-foreground/80 leading-relaxed">
                  Collaborative, detail-oriented, and results-driven. Every project 
                  begins with deep understanding, evolves through iterative refinement, 
                  and concludes with solutions that exceed expectations.
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="glass p-8 rounded-3xl">
              <h2 className="text-3xl font-bold text-gradient mb-8">Core Values</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-optra-gradient rounded-full flex items-center justify-center">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-gradient mb-2">Passion</h4>
                  <p className="text-sm text-foreground/70">
                    Every pixel, every interaction, every decision driven by genuine passion for craft.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-optra-gradient rounded-full flex items-center justify-center">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-gradient mb-2">Excellence</h4>
                  <p className="text-sm text-foreground/70">
                    Uncompromising commitment to quality, refinement, and exceptional outcomes.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-optra-gradient rounded-full flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-gradient mb-2">Impact</h4>
                  <p className="text-sm text-foreground/70">
                    Design that doesn't just look good—it achieves goals and drives results.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="glass p-8 rounded-3xl text-center">
              <h2 className="text-3xl font-bold text-gradient mb-6">Let's Connect</h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-foreground/70">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>Bangalore, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>Response within 48 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  <a href="mailto:aniketh@optra.me" className="hover:text-gradient transition-colors duration-300">
                    aniketh@optra.me
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
