import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { Play, Pause, RotateCcw, Palette, Music, Zap } from 'lucide-react';

// Enhanced Experiment Components
const ColorHarmonics = ({ isPlaying, clickCount }: { isPlaying: boolean; clickCount: number }) => {
  const [hue, setHue] = useState(0);
  const [pattern, setPattern] = useState(0);
  const [explosions, setExplosions] = useState<Array<{ id: number; x: number; y: number; hue: number }>>([]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setHue(prev => (prev + 2) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    // Create explosion effect on click
    if (clickCount > 0) {
      const newExplosion = {
        id: Date.now(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        hue: Math.random() * 360
      };
      setExplosions(prev => [...prev, newExplosion]);
      
      // Remove explosion after animation
      setTimeout(() => {
        setExplosions(prev => prev.filter(exp => exp.id !== newExplosion.id));
      }, 1000);
    }
  }, [clickCount]);

  const patterns = [
    { name: 'Spiral', multiplier: 15 },
    { name: 'Grid', multiplier: 45 },
    { name: 'Wave', multiplier: 72 }
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6 relative">
      <div className="flex gap-2 mb-4">
        {patterns.map((p, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              setPattern(i);
            }}
            className={`px-3 py-1 rounded-full text-xs transition-all hover:scale-110 ${
              pattern === i ? 'bg-optra-gradient text-white' : 'bg-white/10 text-foreground/70'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-8 gap-2 relative">
        {Array.from({ length: 64 }, (_, i) => (
          <div
            key={i}
            className="w-8 h-8 rounded-lg transition-all duration-500 hover:scale-125 cursor-pointer animate-pulse"
            style={{
              backgroundColor: `hsl(${(hue + i * patterns[pattern].multiplier) % 360}, 70%, 60%)`,
              transform: `rotate(${hue + i * 5}deg) scale(${1 + Math.sin(hue * 0.1 + i) * 0.2})`,
              boxShadow: `0 0 ${20 + Math.sin(hue * 0.1 + i) * 10}px hsla(${(hue + i * patterns[pattern].multiplier) % 360}, 70%, 60%, 0.6)`
            }}
          />
        ))}
        
        {/* Explosion effects */}
        {explosions.map(explosion => (
          <div
            key={explosion.id}
            className="absolute w-16 h-16 rounded-full animate-ping"
            style={{
              left: `${explosion.x}%`,
              top: `${explosion.y}%`,
              backgroundColor: `hsl(${explosion.hue}, 100%, 50%)`,
              boxShadow: `0 0 50px hsl(${explosion.hue}, 100%, 50%)`
            }}
          />
        ))}
      </div>
      <div className="text-xs text-foreground/60 animate-bounce">🎨 Click the experiment area for color explosions!</div>
    </div>
  );
};

const MotionStudies = ({ isPlaying, mousePosition }: { isPlaying: boolean; mousePosition: { x: number; y: number } }) => {
  const [time, setTime] = useState(0);
  const [magnetism, setMagnetism] = useState(1);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setTime(prev => prev + 0.15);
    }, 16);
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    // Increase magnetism based on mouse movement
    setMagnetism(1 + Math.sin(Date.now() * 0.005) * 0.5);
  }, [mousePosition]);

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={i}
          className="absolute border-2 rounded-full"
          style={{
            width: `${60 + i * 30}px`,
            height: `${60 + i * 30}px`,
            opacity: 0.8 - i * 0.08,
            transform: `rotate(${time * (20 + i * 8) * magnetism}deg) scale(${1 + Math.sin(time + i) * 0.3})`,
            borderColor: `hsl(${(time * 30 + i * 45) % 360}, 80%, 60%)`,
            borderWidth: `${2 + Math.sin(time + i) * 2}px`,
            filter: `blur(${Math.sin(time + i) * 2}px)`
          }}
        />
      ))}
      <div 
        className="w-16 h-16 bg-optra-gradient rounded-full relative z-10 animate-pulse"
        style={{
          transform: `scale(${1 + Math.sin(time * 3) * 0.4}) rotate(${time * 50}deg)`,
          boxShadow: `0 0 30px rgba(255, 100, 200, 0.8)`
        }}
      />
      <div className="absolute bottom-4 text-xs text-foreground/60 animate-pulse">
        🌟 Mouse movement affects the gravitational pull!
      </div>
    </div>
  );
};

const TypographyLab = ({ isPlaying }: { isPlaying: boolean }) => {
  const [currentText, setCurrentText] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const [rainbow, setRainbow] = useState(false);
  const texts = ['OPTRA', 'DESIGN', 'LAB', 'CREATIVE', 'FUTURE', 'ART', 'MAGIC', 'WONDER'];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setGlitch(true);
      setRainbow(Math.random() > 0.5);
      setTimeout(() => {
        setCurrentText(prev => (prev + 1) % texts.length);
        setGlitch(false);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8">
      <div className={`text-7xl font-black transition-all duration-500 cursor-pointer hover:scale-110 ${
        glitch ? 'animate-pulse scale-125 skew-x-12' : ''
      } ${rainbow ? 'text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500' : 'text-gradient'}`}>
        {texts[currentText]}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {texts.map((text, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentText(i);
              setGlitch(true);
              setTimeout(() => setGlitch(false), 200);
            }}
            className={`px-2 py-1 rounded text-xs transition-all hover:scale-110 ${
              currentText === i ? 'bg-optra-gradient text-white' : 'bg-white/10 text-foreground/70'
            }`}
          >
            {text}
          </button>
        ))}
      </div>
      <div className="text-xs text-foreground/60 animate-bounce">✨ Click words or wait for magic transforms!</div>
    </div>
  );
};

const InteractiveParticles = ({ mousePosition, isPlaying }: { mousePosition: { x: number; y: number }, isPlaying: boolean }) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; vx: number; vy: number; size: number; color: number; trail: Array<{x: number; y: number}> }>>([]);

  useEffect(() => {
    const initialParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 400,
      y: Math.random() * 300,
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 3,
      size: Math.random() * 8 + 4,
      color: Math.random() * 360,
      trail: []
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
        
        if (distance < 200) {
          const force = (200 - distance) / 200 * 0.8;
          newVx += (dx / distance) * force * 0.15;
          newVy += (dy / distance) * force * 0.15;
        }
        
        const newX = (particle.x + newVx + 400) % 400;
        const newY = (particle.y + newVy + 300) % 300;
        
        // Add to trail
        const newTrail = [...particle.trail, { x: newX, y: newY }].slice(-8);
        
        return {
          ...particle,
          x: newX,
          y: newY,
          vx: newVx * 0.99,
          vy: newVy * 0.99,
          color: (particle.color + 2) % 360,
          trail: newTrail
        };
      }));
    };

    const interval = setInterval(animateParticles, 16);
    return () => clearInterval(interval);
  }, [mousePosition, isPlaying]);

  return (
    <div className="relative w-96 h-72 border border-white/20 rounded-lg overflow-hidden bg-black/30">
      {particles.map(particle => (
        <div key={particle.id}>
          {/* Trail effect */}
          {particle.trail.map((point, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${point.x}px`,
                top: `${point.y}px`,
                width: `${particle.size * (i / particle.trail.length)}px`,
                height: `${particle.size * (i / particle.trail.length)}px`,
                background: `hsla(${particle.color}, 70%, 60%, ${i / particle.trail.length * 0.5})`,
              }}
            />
          ))}
          {/* Main particle */}
          <div
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: `hsl(${particle.color}, 70%, 60%)`,
              boxShadow: `0 0 ${particle.size * 3}px hsla(${particle.color}, 70%, 60%, 0.8)`
            }}
          />
        </div>
      ))}
      <div className="absolute bottom-2 left-2 text-xs text-foreground/60 animate-bounce">
        🎯 Chase the particles with your mouse!
      </div>
    </div>
  );
};

const SoundVisualizer = ({ isPlaying }: { isPlaying: boolean }) => {
  const [bars, setBars] = useState<number[]>(Array(20).fill(0));
  const [beat, setBeat] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      const newBars = bars.map((_, i) => {
        const base = Math.sin(Date.now() * 0.01 + i * 0.5) * 50 + 50;
        const random = Math.random() * 60;
        return Math.max(10, base + random);
      });
      setBars(newBars);
      setBeat(Math.random() > 0.7);
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className={`w-full h-full flex items-end justify-center gap-1 transition-all ${beat ? 'scale-110' : ''}`}>
      {bars.map((height, i) => (
        <div
          key={i}
          className="transition-all duration-100 rounded-t hover:scale-110 cursor-pointer"
          style={{
            width: '18px',
            height: `${height + 30}px`,
            background: `linear-gradient(to top, 
              hsl(${i * 18}, 80%, 50%), 
              hsl(${i * 18 + 60}, 80%, 70%), 
              hsl(${i * 18 + 120}, 80%, 90%))`,
            boxShadow: `0 0 15px hsla(${i * 18}, 80%, 50%, 0.7)`,
            transform: beat && i % 3 === 0 ? 'scaleY(1.3)' : 'scaleY(1)'
          }}
        />
      ))}
      <div className="absolute bottom-4 text-xs text-foreground/60 animate-pulse">
        🎵 Feel the rhythm of creativity!
      </div>
    </div>
  );
};

const GeometryLab = ({ isPlaying, clickCount }: { isPlaying: boolean; clickCount: number }) => {
  const [rotation, setRotation] = useState(0);
  const [complexity, setComplexity] = useState(3);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setRotation(prev => prev + 3);
    }, 16);
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    // Increase complexity on clicks
    if (clickCount > 0) {
      setComplexity(prev => Math.min(8, prev + 1));
      setTimeout(() => setComplexity(3), 2000);
    }
  }, [clickCount]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-64 h-64">
        {Array.from({ length: complexity }, (_, i) => (
          <div 
            key={i}
            className="absolute border-4 rounded-full animate-pulse"
            style={{ 
              inset: `${i * 20}px`,
              transform: `rotate(${rotation * (1 + i * 0.3)}deg)`,
              borderColor: `hsl(${(rotation + i * 60) % 360}, 80%, 60%)`,
              borderWidth: `${4 - i * 0.3}px`,
              filter: `blur(${i * 0.5}px)`,
              boxShadow: `0 0 ${20 + i * 5}px hsla(${(rotation + i * 60) % 360}, 80%, 60%, 0.5)`
            }}
          />
        ))}
        <div 
          className="absolute inset-16 bg-optra-gradient rounded-full animate-pulse"
          style={{ 
            transform: `scale(${1 + Math.sin(rotation * 0.05) * 0.3}) rotate(${rotation * 2}deg)`,
            boxShadow: '0 0 40px rgba(255, 100, 200, 0.8)'
          }}
        />
      </div>
      <div className="absolute bottom-4 text-xs text-foreground/60 animate-bounce">
        🔮 Click to add more dimensions!
      </div>
    </div>
  );
};

const Lab = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentExperiment, setCurrentExperiment] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const experiments = [
    { name: 'Color Harmonics', icon: Palette, component: ColorHarmonics },
    { name: 'Motion Studies', icon: Zap, component: MotionStudies },
    { name: 'Typography Lab', icon: Music, component: TypographyLab },
    { name: 'Interactive Particles', icon: Play, component: InteractiveParticles },
    { name: 'Sound Visualizer', icon: Music, component: SoundVisualizer },
    { name: 'Geometry Lab', icon: Palette, component: GeometryLab }
  ];

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleExperimentClick = () => {
    setClickCount(prev => prev + 1);
  };

  const CurrentExperiment = experiments[currentExperiment].component;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Navigation />
      
      <div className="relative z-10 pt-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-6xl font-black text-gradient mb-4">CREATIVE LAB</h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Interactive experiments in design, motion, and visual storytelling
            </p>
          </div>

          {/* Controls */}
          <div className="flex justify-center items-center gap-6 mb-8">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2 px-6 py-3 bg-optra-gradient text-white rounded-full hover:scale-105 transition-all shadow-lg"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            
            <button
              onClick={() => {
                setIsPlaying(false);
                setClickCount(0);
                setCurrentExperiment(0);
              }}
              className="flex items-center gap-2 px-4 py-3 bg-white/10 text-foreground rounded-full hover:bg-white/20 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>

          {/* Experiment Selector */}
          <div className="flex justify-center mb-8">
            <div className="flex gap-2 p-2 bg-white/10 rounded-full backdrop-blur-sm">
              {experiments.map((exp, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentExperiment(i)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:scale-105 ${
                    currentExperiment === i 
                      ? 'bg-optra-gradient text-white' 
                      : 'text-foreground/70 hover:bg-white/10'
                  }`}
                >
                  <exp.icon className="w-4 h-4" />
                  {exp.name}
                </button>
              ))}
            </div>
          </div>

          {/* Experiment Display */}
          <div 
            className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-3xl p-8 min-h-[500px] cursor-pointer"
            onMouseMove={handleMouseMove}
            onClick={handleExperimentClick}
          >
            <CurrentExperiment 
              isPlaying={isPlaying}
              clickCount={clickCount}
              mousePosition={mousePosition}
            />
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 mt-8 text-center">
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-gradient">{experiments[currentExperiment].name}</div>
              <div className="text-sm text-foreground/60">Current Experiment</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-gradient">{clickCount}</div>
              <div className="text-sm text-foreground/60">Interactions</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-gradient">{isPlaying ? 'LIVE' : 'PAUSED'}</div>
              <div className="text-sm text-foreground/60">Status</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lab;
