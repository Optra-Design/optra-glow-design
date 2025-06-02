
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, Search, ArrowLeft, Zap, RotateCw, Sparkles, GamepadIcon, Target, Rocket, Music } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();
  const [glitchText, setGlitchText] = useState('404');
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; velocity: { x: number; y: number } }>>([]);
  const [shakeIntensity, setShakeIntensity] = useState(0);
  const [secretClicks, setSecretClicks] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const [rainbowMode, setRainbowMode] = useState(false);
  const [musicMode, setMusicMode] = useState(false);
  const [particleTrail, setParticleTrail] = useState<Array<{ id: number; x: number; y: number; emoji: string }>>([]);

  useEffect(() => {
    console.error(
      "🚨 404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    // Enhanced glitch effect for 404 text
    const glitchInterval = setInterval(() => {
      const glitchOptions = ['404', '4∅4', '4Ø4', '₄0₄', '404', '╔═╗', '███', '┬ ┬┬', '├─┤', '░▒▓', '■□■', '▲▼▲', '◆◇◆'];
      setGlitchText(glitchOptions[Math.floor(Math.random() * glitchOptions.length)]);
    }, 120);

    // Generate floating particles with physics
    const particleArray = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 800),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 600),
      velocity: {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2
      }
    }));
    setParticles(particleArray);

    // Animate particles
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.velocity.x,
        y: particle.y + particle.velocity.y,
        velocity: {
          x: particle.x > window.innerWidth || particle.x < 0 ? -particle.velocity.x : particle.velocity.x,
          y: particle.y > window.innerHeight || particle.y < 0 ? -particle.velocity.y : particle.velocity.y
        }
      })));
    };

    const particleAnimation = setInterval(animateParticles, 50);

    // Screen shake effect on load
    setShakeIntensity(1);
    setTimeout(() => setShakeIntensity(0), 2000);

    // Mouse trail effect
    const handleMouseMove = (e: MouseEvent) => {
      if (rainbowMode) {
        const newTrail = {
          id: Date.now(),
          x: e.clientX,
          y: e.clientY,
          emoji: ['✨', '🌟', '💫', '⭐', '🎯'][Math.floor(Math.random() * 5)]
        };
        setParticleTrail(prev => [...prev.slice(-10), newTrail]);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(glitchInterval);
      clearInterval(particleAnimation);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [location.pathname, rainbowMode]);

  // Clean up particle trail
  useEffect(() => {
    const cleanup = setInterval(() => {
      setParticleTrail(prev => prev.slice(1));
    }, 500);
    return () => clearInterval(cleanup);
  }, []);

  const suggestions = [
    { path: '/', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { path: '/about', label: 'About', icon: <Search className="w-4 h-4" /> },
    { path: '/services', label: 'Services', icon: <Zap className="w-4 h-4" /> },
    { path: '/contact', label: 'Contact', icon: <ArrowLeft className="w-4 h-4" /> },
  ];

  const handleSecretClick = () => {
    setSecretClicks(prev => prev + 1);
    if (secretClicks >= 6) {
      setShowSecret(true);
      setSecretClicks(0);
      document.body.style.filter = 'hue-rotate(180deg) saturate(1.5)';
      setTimeout(() => {
        document.body.style.filter = '';
        setShowSecret(false);
      }, 5000);
    }
  };

  const generateExplosion = (x: number, y: number) => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: Date.now() + i,
      x,
      y,
      velocity: {
        x: (Math.random() - 0.5) * 10,
        y: (Math.random() - 0.5) * 10
      }
    }));
    setParticles(prev => [...prev, ...newParticles]);
    setTimeout(() => setParticles(prev => prev.slice(15)), 3000);
  };

  const activateRainbowMode = () => {
    setRainbowMode(!rainbowMode);
    if (!rainbowMode) {
      document.body.style.background = 'linear-gradient(45deg, #ff6b35, #e91e63, #9c27b0, #673ab7, #3f51b5, #2196f3, #03a9f4, #00bcd4)';
      document.body.style.backgroundSize = '400% 400%';
      document.body.style.animation = 'gradient 3s ease infinite';
    } else {
      document.body.style.background = '';
      document.body.style.animation = '';
    }
  };

  const playSound = () => {
    setMusicMode(!musicMode);
    if (!musicMode) {
      // Create a simple beep sound
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 440;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    }
  };

  return (
    <div 
      className={`min-h-screen flex items-center justify-center bg-background relative overflow-hidden ${
        shakeIntensity > 0 ? 'animate-pulse' : ''
      }`}
      style={{
        transform: shakeIntensity > 0 ? `translateX(${Math.random() * 4 - 2}px)` : 'none',
      }}
    >
      {/* Enhanced animated background particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute opacity-30 animate-bounce cursor-pointer hover:scale-150 transition-transform pointer-events-auto"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            animationDelay: `${particle.id * 0.1}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
          onClick={(e) => generateExplosion(e.clientX, e.clientY)}
        >
          {['💫', '⭐', '✨', '🌟', '💥', '🎯', '🔥', '🚀', '🎨', '⚡'][particle.id % 10]}
        </div>
      ))}

      {/* Mouse trail particles */}
      {particleTrail.map(trail => (
        <div
          key={trail.id}
          className="absolute pointer-events-none animate-ping"
          style={{
            left: `${trail.x}px`,
            top: `${trail.y}px`,
          }}
        >
          {trail.emoji}
        </div>
      ))}

      <div className="text-center z-10 max-w-4xl mx-auto px-4">
        {/* Enhanced glitching 404 */}
        <div className="mb-8">
          <h1 
            className="text-8xl md:text-9xl font-black text-gradient mb-4 cursor-pointer hover:scale-110 transition-transform duration-300 select-none"
            onClick={handleSecretClick}
            style={{
              textShadow: '0 0 20px rgba(255, 107, 53, 0.5), 0 0 40px rgba(233, 30, 99, 0.3)',
              filter: `hue-rotate(${Math.random() * 360}deg)`,
              animation: rainbowMode ? 'pulse 0.5s ease-in-out infinite alternate' : undefined
            }}
          >
            {glitchText}
          </h1>
          <div className="w-32 h-2 bg-gradient-to-r from-[#FF6B35] via-[#E91E63] to-[#9C27B0] mx-auto animate-pulse rounded-full"></div>
        </div>

        {/* Interactive error message */}
        <div className="glass p-8 rounded-3xl mb-8 animate-fade-in hover:scale-105 transition-transform duration-300">
          <h2 className="text-4xl font-bold text-gradient mb-4 animate-pulse">
            🚀 Lost in Cyberspace!
          </h2>
          <p className="text-xl text-foreground/80 mb-4">
            You've discovered a digital dimension that doesn't exist... yet! 
            Our design algorithms are working to create this page.
          </p>
          <p className="text-sm text-foreground/60 mb-4">
            Attempted route: <code className="bg-white/20 px-3 py-1 rounded-lg font-mono">{location.pathname}</code>
          </p>
          
          {/* Enhanced interactive elements */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            <button
              onClick={() => {
                setShakeIntensity(1);
                setTimeout(() => setShakeIntensity(0), 1000);
              }}
              className="px-4 py-2 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500/30 transition-all hover:scale-110 animate-bounce"
            >
              <RotateCw className="w-4 h-4 inline mr-2" />
              Shake
            </button>
            
            <button
              onClick={() => {
                const colors = ['hue-rotate(90deg)', 'hue-rotate(180deg)', 'hue-rotate(270deg)', ''];
                document.body.style.filter = colors[Math.floor(Math.random() * colors.length)];
              }}
              className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-full hover:bg-purple-500/30 transition-all hover:scale-110"
            >
              <Sparkles className="w-4 h-4 inline mr-2" />
              Color
            </button>

            <button
              onClick={activateRainbowMode}
              className={`px-4 py-2 rounded-full transition-all hover:scale-110 ${
                rainbowMode 
                  ? 'bg-gradient-to-r from-red-500 to-blue-500 text-white' 
                  : 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
              }`}
            >
              <Target className="w-4 h-4 inline mr-2" />
              Rainbow
            </button>

            <button
              onClick={playSound}
              className={`px-4 py-2 rounded-full transition-all hover:scale-110 ${
                musicMode 
                  ? 'bg-green-500/30 text-green-300' 
                  : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
              }`}
            >
              <Music className="w-4 h-4 inline mr-2" />
              Sound
            </button>
          </div>
        </div>

        {/* Enhanced interactive suggestions */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gradient mb-6 animate-fade-in">
            🎯 Navigate to Safety:
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {suggestions.map((suggestion, index) => (
              <Link
                key={suggestion.path}
                to={suggestion.path}
                className="group p-6 glass rounded-2xl hover:bg-white/20 transition-all duration-500 animate-fade-in hover:scale-110 hover:rotate-2"
                style={{ animationDelay: `${index * 0.2}s` }}
                onMouseEnter={(e) => generateExplosion(e.clientX, e.clientY)}
              >
                <div className="text-gradient mb-3 group-hover:scale-125 transition-transform duration-300 group-hover:animate-spin">
                  {suggestion.icon}
                </div>
                <span className="text-sm font-bold group-hover:text-white transition-colors">
                  {suggestion.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Enhanced interactive playground */}
          <div className="glass p-8 rounded-3xl mb-6 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-6">
              <GamepadIcon className="w-6 h-6 text-gradient animate-bounce" />
              <h3 className="text-xl font-bold text-gradient">Interactive Playground</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => {
                  document.querySelectorAll('.glass').forEach(el => {
                    (el as HTMLElement).style.animation = 'glow 1s ease-in-out';
                  });
                }}
                className="p-4 bg-blue-500/20 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-all hover:scale-105 font-semibold"
              >
                ✨ Glow Everything
              </button>
              
              <button
                onClick={() => {
                  const newParticles = Array.from({ length: 30 }, (_, i) => ({
                    id: Date.now() + i,
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    velocity: {
                      x: (Math.random() - 0.5) * 5,
                      y: (Math.random() - 0.5) * 5
                    }
                  }));
                  setParticles(prev => [...prev, ...newParticles]);
                }}
                className="p-4 bg-green-500/20 text-green-400 rounded-xl hover:bg-green-500/30 transition-all hover:scale-105 font-semibold"
              >
                🎆 Particle Storm
              </button>
              
              <button
                onClick={() => {
                  document.body.style.animation = 'pulse 2s ease-in-out';
                  setTimeout(() => document.body.style.animation = '', 2000);
                }}
                className="p-4 bg-yellow-500/20 text-yellow-400 rounded-xl hover:bg-yellow-500/30 transition-all hover:scale-105 font-semibold"
              >
                💥 Screen Pulse
              </button>
            </div>

            {showSecret && (
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl animate-scale-in">
                <p className="text-gradient font-bold animate-pulse">
                  🎉 ULTIMATE SECRET UNLOCKED! You are now a master of chaos! 🎮
                </p>
              </div>
            )}
          </div>

          {/* Enhanced call to action */}
          <Link
            to="/"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#FF6B35] via-[#E91E63] to-[#9C27B0] text-white font-bold rounded-full hover:scale-110 transition-all duration-300 text-lg shadow-2xl animate-bounce"
            style={{
              boxShadow: '0 10px 30px rgba(255, 107, 53, 0.3)',
            }}
          >
            <Home className="w-6 h-6" />
            Return to Reality
            <Rocket className="w-6 h-6 animate-pulse" />
          </Link>
        </div>

        {/* Enhanced fun facts */}
        <div className="mt-8 text-xs text-foreground/50 animate-fade-in space-y-2">
          <p>💡 Fun fact: This 404 page has {particles.length} floating particles!</p>
          <p>🎮 Try clicking on floating emojis, the 404 number ({secretClicks}/7), and hover over navigation!</p>
          <p>🌈 Rainbow mode: {rainbowMode ? 'ON' : 'OFF'} | Sound effects: {musicMode ? 'ON' : 'OFF'}</p>
          <p>✨ Mouse trail particles: {particleTrail.length} active</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
