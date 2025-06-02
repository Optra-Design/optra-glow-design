
import React from 'react';
import Navigation from '../components/Navigation';
import { Mail, Phone, MapPin, Clock, MessageCircle, Zap, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-6">
              Let's Connect
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              💬 Ready to transform your vision into extraordinary design? 
              Let's start the conversation and create something amazing together.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Contact CTA */}
            <div className="glass p-8 rounded-3xl text-center">
              <h2 className="text-3xl font-bold text-gradient mb-6">Ready to Start?</h2>
              <p className="text-foreground/70 mb-8">
                Drop us an email and let's discuss your project in detail. We'll get back to you within 48 hours.
              </p>
              <a
                href="mailto:aniketh@optra.me?subject=Project Inquiry&body=Hi Aniketh,%0D%0A%0D%0AI'm interested in working with Optra Design. Here are my project details:%0D%0A%0D%0AProject Type:%0D%0ABudget Range:%0D%0ATimeline:%0D%0AProject Description:%0D%0A%0D%0ALooking forward to hearing from you!"
                className="inline-flex items-center gap-3 bg-optra-gradient hover:scale-105 transition-transform px-8 py-4 rounded-2xl text-white font-semibold text-lg"
              >
                <Send className="w-6 h-6" />
                Send Email
              </a>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="glass p-8 rounded-3xl">
                <h2 className="text-2xl font-bold text-gradient mb-6">Get in Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-optra-gradient rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <a href="mailto:aniketh@optra.me" className="text-foreground/70 hover:text-gradient transition-colors">
                        aniketh@optra.me
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Location</p>
                      <p className="text-foreground/70">Bangalore, India</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Response Time</p>
                      <p className="text-foreground/70">Within 48 hours</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Chat with OptraBot</p>
                      <p className="text-foreground/70">Available 24/7 for instant help</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass p-8 rounded-3xl">
                <h3 className="text-xl font-bold text-gradient mb-4">What to Expect</h3>
                <ul className="space-y-3 text-foreground/80">
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span>Personal response from Aniketh within 48 hours</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-400" />
                    <span>Initial consultation to understand your vision</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-green-400" />
                    <span>Customized proposal based on your needs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-purple-400" />
                    <span>Transparent timeline and pricing discussion</span>
                  </li>
                </ul>
              </div>

              <div className="glass p-6 rounded-3xl text-center">
                <p className="text-foreground/70 mb-4">
                  ⚡ Need immediate assistance?
                </p>
                <p className="text-sm text-foreground/60">
                  Try our OptraBot in the bottom right corner for instant answers about services, pricing, and more!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
