
import React from 'react';
import { Settings } from 'lucide-react';

const SecretSudoButton = () => {
  const handleClick = () => {
    document.dispatchEvent(new CustomEvent('sudo-mode-toggle'));
    console.log('🔓 Secret SUDO button activated!');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 left-6 w-8 h-8 opacity-5 hover:opacity-30 transition-opacity duration-500 group z-40"
      title="🔓 Secret Access"
      aria-label="Developer Mode Access"
    >
      <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <Settings className="w-3 h-3 text-white/40 group-hover:text-white/60 transition-colors duration-300" />
      </div>
    </button>
  );
};

export default SecretSudoButton;
