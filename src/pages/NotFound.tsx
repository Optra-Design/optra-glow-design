
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, Search, ArrowLeft, Zap, RotateCw, Sparkles, GamepadIcon } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();
  const [glitchText, setGlitchText] = useState('404');
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [shakeIntensity, setShakeIntensity] = useState(0);
  const [secretClicks, setSecretClicks] = useState(0);
  const [showSecret, setShowSecret] = useState(false);

  useEffect(() => {
    console.error(
      "🚨 404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    // Enhanced glitch effect for 404 text
    const glitchInterval = setInterval(() => {
      const glitchOptions = ['404', '4∅4', '4Ø4', '₄0₄', '404', '╔═╗', '███', '┬ ┬┬', '├─┤', '░▒▓'];
      setGlitchText(glitchOptions[Math.floor(Math.random() * glitchOptions.length)]);
    }, 150);

    // Generate floating particles
    const particleArray = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 800),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 600),
    }));
    setParticles(particleArray);

    // Screen shake effect on load
    setShakeIntensity(1);
    setTimeout(() => setShakeIntensity(0), 2000);

    return () => clearInterval(glitchInterval);
  }, [location.pathname]);

  const suggestions = [
    { path: '/', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { path: '/about', label: 'About', icon: <Search className="w-4 h-4" /> },
    { path: '/services', label: 'Services', icon: <Zap className="w-4 h-4" /> },
    { path: '/contact', label: 'Contact', icon: <ArrowLeft className="w-4 h-4" /> },
  ];

  const handleSecretClick = () => {
    setSecretClicks(prev => prev + 1);
    if (secretClicks >= 4) {
      setShowSecret(true);
      setSecretClicks(0);
      document.body.style.filter = 'hue-rotate(180deg) saturate(1.5)';
      setTimeout(() => {
        document.body.style.filter = '';
        setShowSecret(false);
      }, 3000);
    }
  };

  const generateExplosion = (x: number, y: number) => {
    const newParticles = Array.from({ length: 10 }, (_, i) => ({
      id: Date.now() + i,
      x,
      y,
    }));
    setParticles(prev => [...prev, ...newParticles]);
    setTimeout(() => setParticles(prev => prev.slice(10)), 2000);
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
          className="absolute opacity-30 animate-bounce cursor-pointer hover:scale-150 transition-transform"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            animationDelay: `${particle.id * 0.1}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
          onClick={(e) => generateExplosion(e.clientX, e.clientY)}
        >
          {['💫', '⭐', '✨', '🌟', '💥', '🎯', '🔥'][particle.id % 7]}
        </div>
      ))}

      <div className="text-center z-10 max-w-3xl mx-auto px-4">
        {/* Enhanced glitching 404 */}
        <div className="mb-8">
          <h1 
            className="text-8xl md:text-9xl font-black text-gradient mb-4 cursor-pointer hover:scale-110 transition-transform duration-300"
            onClick={handleSecretClick}
            style={{
              textShadow: '0 0 20px rgba(255, 107, 53, 0.5), 0 0 40px rgba(233, 30, 99, 0.3)',
              filter: `hue-rotate(${Math.random() * 360}deg)`,
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
          
          {/* Interactive elements */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => {
                setShakeIntensity(1);
                setTimeout(() => setShakeIntensity(0), 1000);
              }}
              className="px-4 py-2 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500/30 transition-all hover:scale-110 animate-bounce"
            >
              <RotateCw className="w-4 h-4 inline mr-2" />
              Shake Screen
            </button>
            
            <button
              onClick={() => {
                const colors = ['hue-rotate(90deg)', 'hue-rotate(180deg)', 'hue-rotate(270deg)', ''];
                document.body.style.filter = colors[Math.floor(Math.random() * colors.length)];
              }}
              className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-full hover:bg-purple-500/30 transition-all hover:scale-110"
            >
              <Sparkles className="w-4 h-4 inline mr-2" />
              Color Shift
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
              <h3 className="text-xl font-bold text-gradient">Interactive Zone</h3>
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
                ✨ Make Everything Glow
              </button>
              
              <button
                onClick={() => {
                  const newParticles = Array.from({ length: 20 }, (_, i) => ({
                    id: Date.now() + i,
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                  }));
                  setParticles(prev => [...prev, ...newParticles]);
                }}
                className="p-4 bg-green-500/20 text-green-400 rounded-xl hover:bg-green-500/30 transition-all hover:scale-105 font-semibold"
              >
                🎆 Particle Burst
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
                  🎉 SECRET UNLOCKED! You found the hidden interactive mode!
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
            <Sparkles className="w-6 h-6 animate-spin" />
          </Link>
        </div>

        {/* Fun fact */}
        <div className="mt-8 text-xs text-foreground/50 animate-fade-in">
          <p>💡 Fun fact: This 404 page has {particles.length} interactive elements!</p>
          <p>🎮 Try clicking on the floating emojis and the 404 number!</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
