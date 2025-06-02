
import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { Beaker, Zap, Palette, Code, Sparkles, RotateCcw, Play, Pause, Volume2 } from 'lucide-react';

const Lab = () => {
  const [activeExperiment, setActiveExperiment] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(true);

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
      icon: <Palette className="w-6 h-6" />,
      component: <ColorHarmonics isPlaying={isPlaying} />
    },
    {
      title: "Motion Studies",
      description: "Fluid animation explorations",
      icon: <Zap className="w-6 h-6" />,
      component: <MotionStudies isPlaying={isPlaying} />
    },
    {
      title: "Typography Lab",
      description: "Dynamic text transformations",
      icon: <Code className="w-6 h-6" />,
      component: <TypographyLab isPlaying={isPlaying} />
    },
    {
      title: "Interactive Particles",
      description: "Physics-based particle systems",
      icon: <Sparkles className="w-6 h-6" />,
      component: <InteractiveParticles mousePosition={mousePosition} isPlaying={isPlaying} />
    },
    {
      title: "Sound Visualizer",
      description: "Audio-reactive visual patterns",
      icon: <Volume2 className="w-6 h-6" />,
      component: <SoundVisualizer isPlaying={isPlaying} />
    },
    {
      title: "3D Geometry",
      description: "Interactive 3D shape experiments",
      icon: <RotateCcw className="w-6 h-6" />,
      component: <GeometryLab isPlaying={isPlaying} />
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
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto mb-6">
              🧪 Experimental design concepts and interactive explorations. 
              A playground for creative innovation and technical artistry.
            </p>
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
                ⚠️ Experimental Features
              </span>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span className="text-sm">{isPlaying ? 'Pause' : 'Play'} Animations</span>
              </button>
            </div>
            <div className="text-sm text-foreground/60">
              💡 Tip: Hover over experiments and move your mouse around!
            </div>
          </div>

          {/* Experiment Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {experiments.map((experiment, index) => (
              <button
                key={index}
                onClick={() => setActiveExperiment(index)}
                className={`group p-4 rounded-2xl font-medium transition-all duration-300 ${
                  activeExperiment === index
                    ? 'bg-optra-gradient text-white scale-105 shadow-lg'
                    : 'glass text-foreground/70 hover:bg-white/20 hover:scale-105'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className={`transition-transform duration-300 ${activeExperiment === index ? 'animate-bounce-subtle' : 'group-hover:scale-110'}`}>
                    {experiment.icon}
                  </div>
                  <span className="text-sm font-semibold">{experiment.title}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Active Experiment */}
          <div className="glass p-8 rounded-3xl mb-8 min-h-[500px]">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                {experiments[activeExperiment].icon}
                <h2 className="text-3xl font-bold text-gradient">
                  {experiments[activeExperiment].title}
                </h2>
              </div>
              <p className="text-foreground/70 mb-4">
                {experiments[activeExperiment].description}
              </p>
              <div className="text-sm text-foreground/50">
                Experiment #{activeExperiment + 1} of {experiments.length}
              </div>
            </div>
            
            <div className="flex items-center justify-center min-h-[350px] rounded-2xl bg-white/5 p-6">
              {experiments[activeExperiment].component}
            </div>
          </div>

          {/* Lab Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="glass p-6 rounded-2xl text-center hover:bg-white/10 transition-colors">
              <Code className="w-8 h-8 text-gradient mx-auto mb-3" />
              <h3 className="font-bold text-gradient mb-2">6 Experiments</h3>
              <p className="text-sm text-foreground/70">Active lab projects</p>
            </div>
            
            <div className="glass p-6 rounded-2xl text-center hover:bg-white/10 transition-colors">
              <Zap className="w-8 h-8 text-gradient mx-auto mb-3" />
              <h3 className="font-bold text-gradient mb-2">Real-time</h3>
              <p className="text-sm text-foreground/70">60fps interactions</p>
            </div>
            
            <div className="glass p-6 rounded-2xl text-center hover:bg-white/10 transition-colors">
              <Sparkles className="w-8 h-8 text-gradient mx-auto mb-3" />
              <h3 className="font-bold text-gradient mb-2">Interactive</h3>
              <p className="text-sm text-foreground/70">Mouse-responsive</p>
            </div>

            <div className="glass p-6 rounded-2xl text-center hover:bg-white/10 transition-colors">
              <Beaker className="w-8 h-8 text-gradient mx-auto mb-3" />
              <h3 className="font-bold text-gradient mb-2">Open Source</h3>
              <p className="text-sm text-foreground/70">Built with React</p>
            </div>
          </div>

          {/* Fun Facts */}
          <div className="glass p-8 rounded-3xl text-center">
            <h3 className="text-2xl font-bold text-gradient mb-6">🎨 Lab Insights</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
              <div>
                <div className="text-2xl font-bold text-gradient mb-2">∞</div>
                <div className="text-foreground/70">Possible color combinations</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gradient mb-2">60fps</div>
                <div className="text-foreground/70">Smooth animations</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gradient mb-2">3D</div>
                <div className="text-foreground/70">Interactive experiences</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gradient mb-2">✨</div>
                <div className="text-foreground/70">Pure creativity</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Experiment Components
const ColorHarmonics = ({ isPlaying }: { isPlaying: boolean }) => {
  const [hue, setHue] = useState(0);
  const [pattern, setPattern] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setHue(prev => (prev + 1) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const patterns = [
    { name: 'Spiral', multiplier: 15 },
    { name: 'Grid', multiplier: 45 },
    { name: 'Wave', multiplier: 72 }
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6">
      <div className="flex gap-2 mb-4">
        {patterns.map((p, i) => (
          <button
            key={i}
            onClick={() => setPattern(i)}
            className={`px-3 py-1 rounded-full text-xs transition-colors ${
              pattern === i ? 'bg-optra-gradient text-white' : 'bg-white/10 text-foreground/70'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-8 gap-2">
        {Array.from({ length: 64 }, (_, i) => (
          <div
            key={i}
            className="w-8 h-8 rounded-lg transition-all duration-1000 hover:scale-125 cursor-pointer"
            style={{
              backgroundColor: `hsl(${(hue + i * patterns[pattern].multiplier) % 360}, 70%, 60%)`,
              transform: `rotate(${hue + i * 5}deg)`,
              boxShadow: `0 0 20px hsla(${(hue + i * patterns[pattern].multiplier) % 360}, 70%, 60%, 0.3)`
            }}
            onClick={() => setHue(hue + 30)}
          />
        ))}
      </div>
      <div className="text-xs text-foreground/60">Click any square to shift colors!</div>
    </div>
  );
};

const MotionStudies = ({ isPlaying }: { isPlaying: boolean }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setTime(prev => prev + 0.1);
    }, 16);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          className="absolute border-2 border-gradient rounded-full"
          style={{
            width: `${60 + i * 40}px`,
            height: `${60 + i * 40}px`,
            opacity: 0.7 - i * 0.1,
            transform: `rotate(${time * (30 + i * 10)}deg) scale(${1 + Math.sin(time + i) * 0.2})`,
            borderColor: `hsl(${(time * 20 + i * 60) % 360}, 70%, 60%)`
          }}
        />
      ))}
      <div 
        className="w-12 h-12 bg-optra-gradient rounded-full relative z-10"
        style={{
          transform: `scale(${1 + Math.sin(time * 2) * 0.3})`
        }}
      />
      <div className="absolute bottom-4 text-xs text-foreground/60">
        Orbital motion study
      </div>
    </div>
  );
};

const TypographyLab = ({ isPlaying }: { isPlaying: boolean }) => {
  const [currentText, setCurrentText] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const texts = ['OPTRA', 'DESIGN', 'LAB', 'CREATIVE', 'FUTURE', 'ART'];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => {
        setCurrentText(prev => (prev + 1) % texts.length);
        setGlitch(false);
      }, 200);
    }, 2000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8">
      <div className={`text-6xl font-black text-gradient transition-all duration-500 ${glitch ? 'animate-pulse scale-110' : ''}`}>
        {texts[currentText]}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {texts.map((text, i) => (
          <button
            key={i}
            onClick={() => setCurrentText(i)}
            className={`px-3 py-1 rounded text-xs transition-colors ${
              currentText === i ? 'bg-optra-gradient text-white' : 'bg-white/10 text-foreground/70'
            }`}
          >
            {text}
          </button>
        ))}
      </div>
      <div className="text-xs text-foreground/60">Click to change text</div>
    </div>
  );
};

const InteractiveParticles = ({ mousePosition, isPlaying }: { mousePosition: { x: number; y: number }, isPlaying: boolean }) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; vx: number; vy: number; size: number; color: number }>>([]);

  useEffect(() => {
    const initialParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 400,
      y: Math.random() * 300,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 6 + 3,
      color: Math.random() * 360
    }));
    setParticles(initialParticles);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => {
        const dx = mousePosition.x - (particle.x + 200);
        const dy = mousePosition.y - (particle.y + 200);
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        let newVx = particle.vx;
        let newVy = particle.vy;
        
        if (distance < 150) {
          const force = (150 - distance) / 150 * 0.5;
          newVx += (dx / distance) * force * 0.1;
          newVy += (dy / distance) * force * 0.1;
        }
        
        return {
          ...particle,
          x: (particle.x + newVx + 400) % 400,
          y: (particle.y + newVy + 300) % 300,
          vx: newVx * 0.98,
          vy: newVy * 0.98,
          color: (particle.color + 1) % 360
        };
      }));
    };

    const interval = setInterval(animateParticles, 16);
    return () => clearInterval(interval);
  }, [mousePosition, isPlaying]);

  return (
    <div className="relative w-96 h-72 border border-white/20 rounded-lg overflow-hidden bg-black/20">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full transition-all duration-75"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `hsl(${particle.color}, 70%, 60%)`,
            boxShadow: `0 0 ${particle.size * 2}px hsla(${particle.color}, 70%, 60%, 0.6)`
          }}
        />
      ))}
      <div className="absolute bottom-2 left-2 text-xs text-foreground/60">
        Move mouse to interact
      </div>
    </div>
  );
};

const SoundVisualizer = ({ isPlaying }: { isPlaying: boolean }) => {
  const [bars, setBars] = useState<number[]>(Array(16).fill(0));

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setBars(prev => prev.map(() => Math.random() * 100));
    }, 150);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="w-full h-full flex items-end justify-center gap-2">
      {bars.map((height, i) => (
        <div
          key={i}
          className="transition-all duration-150 rounded-t"
          style={{
            width: '20px',
            height: `${height + 20}px`,
            background: `linear-gradient(to top, hsl(${i * 22.5}, 70%, 60%), hsl(${i * 22.5 + 60}, 70%, 80%))`,
            boxShadow: `0 0 10px hsla(${i * 22.5}, 70%, 60%, 0.5)`
          }}
        />
      ))}
    </div>
  );
};

const GeometryLab = ({ isPlaying }: { isPlaying: boolean }) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setRotation(prev => prev + 2);
    }, 16);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-48 h-48">
        <div 
          className="absolute inset-0 border-4 border-gradient rounded-full"
          style={{ transform: `rotate(${rotation}deg)` }}
        />
        <div 
          className="absolute inset-6 border-2 border-blue-400 rounded-full"
          style={{ transform: `rotate(${-rotation * 1.5}deg)` }}
        />
        <div 
          className="absolute inset-12 border-2 border-purple-400 rounded-full"
          style={{ transform: `rotate(${rotation * 2}deg)` }}
        />
        <div 
          className="absolute inset-20 bg-optra-gradient rounded-full"
          style={{ transform: `scale(${1 + Math.sin(rotation * 0.1) * 0.2})` }}
        />
      </div>
    </div>
  );
};

export default Lab;
