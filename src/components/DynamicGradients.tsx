
import React, { useEffect, useState, useCallback } from 'react';

const DynamicGradients = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    setIsActive(true);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const throttledMouseMove = (e: MouseEvent) => {
      handleMouseMove(e);
      clearTimeout(timeout);
      // Much longer timeout for very gradual fade
      timeout = setTimeout(() => setIsActive(false), 3000);
    };

    window.addEventListener('mousemove', throttledMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', throttledMouseMove);
      clearTimeout(timeout);
    };
  }, [handleMouseMove]);

  // More consistent, less jarring opacity values
  const baseOpacity = 0.15;
  const activeOpacity = 0.25;
  const currentOpacity = isActive ? activeOpacity : baseOpacity;

  const gradientStyle = {
    background: `
      radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, 
        rgba(255, 107, 53, ${currentOpacity * 0.8}) 0%, 
        rgba(233, 30, 99, ${currentOpacity * 0.7}) 25%, 
        rgba(156, 39, 176, ${currentOpacity * 0.6}) 50%, 
        rgba(63, 81, 181, ${currentOpacity * 0.5}) 75%, 
        transparent 100%),
      radial-gradient(600px circle at ${mousePosition.x + 200}px ${mousePosition.y - 100}px,
        rgba(255, 193, 7, ${currentOpacity * 0.6}) 0%,
        rgba(76, 175, 80, ${currentOpacity * 0.5}) 40%,
        transparent 80%),
      radial-gradient(900px circle at ${mousePosition.x - 150}px ${mousePosition.y + 150}px,
        rgba(3, 169, 244, ${currentOpacity * 0.7}) 0%,
        rgba(139, 69, 19, ${currentOpacity * 0.4}) 60%,
        transparent 90%),
      linear-gradient(135deg, 
        rgba(255, 107, 53, 0.06) 0%, 
        rgba(233, 30, 99, 0.08) 20%, 
        rgba(156, 39, 176, 0.07) 40%, 
        rgba(63, 81, 181, 0.06) 60%, 
        rgba(0, 150, 136, 0.05) 80%,
        rgba(255, 193, 7, 0.04) 100%)
    `,
    // Much smoother, slower transition
    transition: 'background 4s cubic-bezier(0.25, 0.1, 0.25, 1)',
    willChange: 'background',
  };

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-10"
      style={gradientStyle}
    />
  );
};

export default DynamicGradients;
