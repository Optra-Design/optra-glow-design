
import React, { useEffect, useState } from 'react';

const BackgroundParticles = () => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    emoji: string;
    size: number;
    speed: number;
  }>>([]);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const emojis = ['✨', '🎨', '💫', '🌟', '⭐', '🔥', '💎', '🚀', '⚡', '💝'];

  useEffect(() => {
    const initialParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      size: Math.random() * 20 + 10,
      speed: Math.random() * 2 + 1,
    }));
    setParticles(initialParticles);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => {
        const distanceFromMouse = Math.sqrt(
          Math.pow(particle.x - mousePosition.x, 2) + 
          Math.pow(particle.y - mousePosition.y, 2)
        );
        
        const influence = Math.max(0, 150 - distanceFromMouse) / 150;
        const drift = influence * 20;
        
        return {
          ...particle,
          x: (particle.x + particle.speed + drift) % window.innerWidth,
          y: particle.y + Math.sin(Date.now() * 0.001 + particle.id) * 0.5,
        };
      }));
    }, 50);

    return () => clearInterval(interval);
  }, [mousePosition]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute particle opacity-30 hover:opacity-60 transition-opacity duration-300"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            fontSize: `${particle.size}px`,
            animationDelay: `${particle.id * 0.2}s`,
          }}
        >
          {particle.emoji}
        </div>
      ))}
    </div>
  );
};

export default BackgroundParticles;
