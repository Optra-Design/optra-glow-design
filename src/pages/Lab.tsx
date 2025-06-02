
import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { Beaker, Zap, Palette, Code, Sparkles } from 'lucide-react';

const Lab = () => {
  const [activeExperiment, setActiveExperiment] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const experiments = [
    {
      title: "Color Harmonics",
      description: "Experimental color theory applications",
      component: <ColorHarmonics />
    },
    {
      title: "Motion Studies",
      description: "Fluid animation explorations",
      component: <MotionStudies />
    },
    {
      title: "Typography Lab",
      description: "Dynamic text transformations",
      component: <TypographyLab />
    },
    {
      title: "Interactive Particles",
      description: "Physics-based particle systems",
      component: <InteractiveParticles mousePosition={mousePosition} />
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Beaker className="w-12 h-12 text-gradient animate-bounce-subtle" />
              <h1 className="text-5xl md:text-7xl font-bold text-gradient">
                Design Lab
              </h1>
            </div>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              🧪 Experimental design concepts and interactive explorations. 
              A playground for creative innovation and technical artistry.
            </p>
            <div className="mt-4 text-sm text-foreground/50">
              <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full">
                ⚠️ Experimental Features
              </span>
            </div>
          </div>

          {/* Experiment Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {experiments.map((experiment, index) => (
              <button
                key={index}
                onClick={() => setActiveExperiment(index)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeExperiment === index
                    ? 'bg-optra-gradient text-white scale-105'
                    : 'bg-white/10 text-foreground/70 hover:bg-white/20'
                }`}
              >
                {experiment.title}
              </button>
            ))}
          </div>

          {/* Active Experiment */}
          <div className="glass p-8 rounded-3xl mb-8 min-h-[400px]">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gradient mb-2">
                {experiments[activeExperiment].title}
              </h2>
              <p className="text-foreground/70">
                {experiments[activeExperiment].description}
              </p>
            </div>
            
            <div className="flex items-center justify-center h-80">
              {experiments[activeExperiment].component}
            </div>
          </div>

          {/* Lab Info */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass p-6 rounded-2xl text-center">
              <Code className="w-8 h-8 text-gradient mx-auto mb-3" />
              <h3 className="font-bold text-gradient mb-2">Open Source</h3>
              <p className="text-sm text-foreground/70">
                All experiments are built with modern web technologies
              </p>
            </div>
            
            <div className="glass p-6 rounded-2xl text-center">
              <Zap className="w-8 h-8 text-gradient mx-auto mb-3" />
              <h3 className="font-bold text-gradient mb-2">Real-time</h3>
              <p className="text-sm text-foreground/70">
                Interactive experiences that respond to user input
              </p>
            </div>
            
            <div className="glass p-6 rounded-2xl text-center">
              <Sparkles className="w-8 h-8 text-gradient mx-auto mb-3" />
              <h3 className="font-bold text-gradient mb-2">Innovative</h3>
              <p className="text-sm text-foreground/70">
                Pushing boundaries of digital design possibilities
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Experiment Components
const ColorHarmonics = () => {
  const [hue, setHue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHue(prev => (prev + 1) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="grid grid-cols-5 gap-4">
        {Array.from({ length: 25 }, (_, i) => (
          <div
            key={i}
            className="w-12 h-12 rounded-lg transition-all duration-1000 hover:scale-110"
            style={{
              backgroundColor: `hsl(${(hue + i * 15) % 360}, 70%, 60%)`,
              transform: `rotate(${hue + i * 5}deg)`
            }}
          />
        ))}
      </div>
    </div>
  );
};

const MotionStudies = () => {
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {Array.from({ length: 3 }, (_, i) => (
        <div
          key={i}
          className="absolute w-20 h-20 border-2 border-gradient rounded-full animate-pulse"
          style={{
            animationDelay: `${i * 0.5}s`,
            animationDuration: '2s',
            transform: `scale(${1 + i * 0.3})`
          }}
        />
      ))}
      <div className="w-8 h-8 bg-optra-gradient rounded-full animate-bounce-subtle" />
    </div>
  );
};

const TypographyLab = () => {
  const [currentText, setCurrentText] = useState(0);
  const texts = ['OPTRA', 'DESIGN', 'LAB', 'EXPERIMENT'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText(prev => (prev + 1) % texts.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-6xl font-black text-gradient animate-pulse">
        {texts[currentText]}
      </div>
    </div>
  );
};

const InteractiveParticles = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; vx: number; vy: number }>>([]);

  useEffect(() => {
    const initialParticles = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 400,
      y: Math.random() * 300,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    }));
    setParticles(initialParticles);
  }, []);

  useEffect(() => {
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => {
        const dx = mousePosition.x - (particle.x + 200);
        const dy = mousePosition.y - (particle.y + 200);
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        let newVx = particle.vx;
        let newVy = particle.vy;
        
        if (distance < 100) {
          newVx += dx * 0.001;
          newVy += dy * 0.001;
        }
        
        return {
          ...particle,
          x: (particle.x + newVx + 400) % 400,
          y: (particle.y + newVy + 300) % 300,
          vx: newVx * 0.99,
          vy: newVy * 0.99,
        };
      }));
    };

    const interval = setInterval(animateParticles, 16);
    return () => clearInterval(interval);
  }, [mousePosition]);

  return (
    <div className="relative w-96 h-72 border border-white/20 rounded-lg overflow-hidden">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-3 h-3 bg-optra-gradient rounded-full"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            transition: 'all 0.1s ease-out'
          }}
        />
      ))}
    </div>
  );
};

export default Lab;
