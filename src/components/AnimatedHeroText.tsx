
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const AnimatedHeroText = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const motionVerbs = ['Shape', 'Flow', 'Pulse', 'Rise', 'Form', 'Flex'];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % motionVerbs.length);
        setIsAnimating(false);
      }, 300);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center space-y-4 container-safe">
      <div className="text-6xl md:text-8xl lg:text-9xl font-black leading-none">
        <div className="relative inline-block">
          <span 
            className={`text-gradient transition-all duration-300 ${
              isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
            }`}
          >
            {motionVerbs[currentWordIndex]}.
          </span>
        </div>
        <br />
        <span className="text-gradient">Style.</span>
        <br />
        <span className="text-gradient">Scale.</span>
      </div>
      
      <p className="text-xl md:text-2xl text-foreground/70 max-w-2xl mx-auto leading-relaxed px-4">
        Hyper-premium digital design and branding that shapes experiences, 
        styles interactions, and scales ambitions.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 px-4">
        <Link 
          to="/contact"
          className="group relative px-8 py-4 bg-gradient-to-r from-[#FF6B35] via-[#E91E63] to-[#9C27B0] text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 glow-hover"
        >
          <span className="relative z-10 flex items-center gap-2">
            Start Your Project
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </span>
          <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </Link>
      </div>
    </div>
  );
};

export default AnimatedHeroText;
