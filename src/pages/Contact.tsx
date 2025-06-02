
import React from 'react';
import Navigation from '../components/Navigation';
import { Mail, MapPin, Clock, ExternalLink, ArrowRight } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-6">
              Let's Create Together
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              Ready to transform your vision into extraordinary reality? 
              Reach out directly and let's explore the possibilities.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact CTA */}
            <div className="glass p-8 rounded-3xl text-center">
              <h2 className="text-3xl font-bold text-gradient mb-6">Get in Touch</h2>
              <p className="text-foreground/70 mb-8 text-lg">
                Ready to start your project? Send me an email and let's discuss your vision.
              </p>
              
              <a
                href="mailto:aniketh@optra.me?subject=Project Inquiry&body=Hi Aniketh,%0D%0A%0D%0AI'd like to discuss a project with you.%0D%0A%0D%0AProject details:%0D%0A- %0D%0A- %0D%0A- %0D%0A%0D%0ABest regards"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#FF6B35] via-[#E91E63] to-[#9C27B0] text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 glow-hover text-lg"
              >
                <Mail className="w-6 h-6" />
                Send Email
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-sm text-foreground/50">
                  Direct email: 
                  <a 
                    href="mailto:aniketh@optra.me" 
                    className="text-gradient hover:underline ml-1 transition-all duration-300"
                  >
                    aniketh@optra.me
                  </a>
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="glass p-6 rounded-3xl">
                <h3 className="text-xl font-bold text-gradient mb-4">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#FF6B35] to-[#E91E63] rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:aniketh@optra.me" className="text-foreground/70 hover:text-gradient transition-colors duration-300">
                        aniketh@optra.me
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#E91E63] to-[#9C27B0] rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-foreground/70">Bangalore, India</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#9C27B0] to-[#3F51B5] rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Response Time</p>
                      <p className="text-foreground/70">Within 48 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass p-6 rounded-3xl">
                <h3 className="text-xl font-bold text-gradient mb-4">What to Expect</h3>
                <ul className="space-y-3 text-foreground/70">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-[#FF6B35] to-[#E91E63] rounded-full mt-2 flex-shrink-0"></div>
                    <span>Detailed project discussion and requirement analysis</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-[#E91E63] to-[#9C27B0] rounded-full mt-2 flex-shrink-0"></div>
                    <span>Custom proposal with timeline and pricing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-[#9C27B0] to-[#3F51B5] rounded-full mt-2 flex-shrink-0"></div>
                    <span>Collaborative design process with regular updates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-[#3F51B5] to-[#FF6B35] rounded-full mt-2 flex-shrink-0"></div>
                    <span>Exceptional results that exceed expectations</span>
                  </li>
                </ul>
              </div>

              <div className="glass p-6 rounded-3xl">
                <h3 className="text-xl font-bold text-gradient mb-4">Quick Links</h3>
                <div className="grid grid-cols-2 gap-4">
                  <a 
                    href="/services" 
                    className="text-sm text-foreground/70 hover:text-gradient transition-colors duration-300 flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Services
                  </a>
                  <a 
                    href="/about" 
                    className="text-sm text-foreground/70 hover:text-gradient transition-colors duration-300 flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    About
                  </a>
                  <a 
                    href="/founder" 
                    className="text-sm text-foreground/70 hover:text-gradient transition-colors duration-300 flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Founder
                  </a>
                  <a 
                    href="/blog" 
                    className="text-sm text-foreground/70 hover:text-gradient transition-colors duration-300 flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Blog
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

export default Contact;
