
import React, { useState, useEffect } from 'react';
import { Settings, Palette, Layout, Zap, LogIn, LogOut, User, Sparkles, Smartphone, Bug } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const SudoMode = () => {
  const [isActive, setIsActive] = useState(false);
  const [theme, setTheme] = useState('default');
  const [layout, setLayout] = useState('default');
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touchCount, setTouchCount] = useState(0);
  const { isLoggedIn, login, logout, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleSudoToggle = () => {
      setIsActive(prev => !prev);
    };

    const handleKeyboardShortcut = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'S') {
        e.preventDefault();
        setIsActive(prev => !prev);
      }
    };

    // Mobile sudo mode activation - tap top-right corner 5 times quickly
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      const x = touch.clientX;
      const y = touch.clientY;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Check if touch is in top-right corner (within 80px from edges)
      if (x > windowWidth - 80 && y < 80) {
        setTouchCount(prev => prev + 1);
        
        // Reset counter after 2 seconds
        setTimeout(() => setTouchCount(0), 2000);
        
        // Activate sudo mode after 5 quick taps
        if (touchCount >= 4) {
          setIsActive(true);
          setTouchCount(0);
          console.log('📱 Mobile SUDO MODE activated! 5 taps detected.');
        }
      }
    };

    document.addEventListener('sudo-mode-toggle', handleSudoToggle);
    document.addEventListener('keydown', handleKeyboardShortcut);
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    
    return () => {
      document.removeEventListener('sudo-mode-toggle', handleSudoToggle);
      document.removeEventListener('keydown', handleKeyboardShortcut);
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, [touchCount]);

  const themes = [
    { id: 'default', name: 'Optra', class: '' },
    { id: 'neon', name: 'Neon', class: 'filter hue-rotate-90 saturate-200 brightness-110' },
    { id: 'retro', name: 'Retro', class: 'filter sepia(0.7) hue-rotate(290deg) saturate(150)' },
    { id: 'cyberpunk', name: 'Cyber', class: 'filter hue-rotate(180deg) saturate-200 contrast-125' },
    { id: 'mono', name: 'Mono', class: 'filter grayscale contrast-125 brightness-110' },
    { id: 'vibrant', name: 'Ultra', class: 'filter saturate-300 brightness-125 contrast-110' }
  ];

  const layouts = [
    { id: 'default', name: 'Default', class: '' },
    { id: 'compact', name: 'Compact', class: 'text-sm scale-95 tracking-tight' },
    { id: 'spacious', name: 'Spacious', class: 'text-lg scale-105 tracking-wide' },
    { id: 'zen', name: 'Zen', class: 'tracking-widest leading-relaxed' }
  ];

  const applyTheme = (themeId: string) => {
    const themeObj = themes.find(t => t.id === themeId);
    if (themeObj) {
      document.body.className = themeObj.class;
      setTheme(themeId);
    }
  };

  const applyLayout = (layoutId: string) => {
    const layoutObj = layouts.find(l => l.id === layoutId);
    if (layoutObj) {
      const main = document.querySelector('main') || document.body;
      main.className = layoutObj.class;
      setLayout(layoutId);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      setShowLogin(false);
      setEmail('');
      setPassword('');
      console.log('🎉 Welcome back, Aniketh! Admin powers activated.');
    } else {
      alert('❌ Invalid credentials - only Aniketh has access!');
    }
  };

  if (!isActive) return null;

  return (
    <div className="fixed top-4 left-4 z-50 bg-background/95 backdrop-blur-lg border border-white/30 rounded-3xl p-6 shadow-2xl animate-fade-in glow-hover max-w-sm">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-6 h-6 text-gradient animate-spin" style={{ animationDuration: '3s' }} />
        <h3 className="font-bold text-gradient text-lg">SUDO MODE</h3>
        <span className="text-xs bg-red-500/30 text-red-400 px-3 py-1 rounded-full animate-pulse font-bold">ADMIN</span>
      </div>
      
      <div className="space-y-6">
        <div className="border-b border-white/20 pb-4">
          {isLoggedIn ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 p-3 bg-green-500/20 rounded-xl">
                <User className="w-5 h-5 text-green-400" />
                <div className="flex-1">
                  <div className="text-sm font-bold text-green-400">Aniketh</div>
                  <div className="text-xs text-green-400/70">Founder & Admin</div>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div>
              <button
                onClick={() => setShowLogin(!showLogin)}
                className="flex items-center gap-3 p-3 text-sm bg-blue-500/20 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-all w-full justify-center hover:scale-105"
              >
                <LogIn className="w-5 h-5" />
                <span className="font-semibold">Founder Login</span>
              </button>
              
              {showLogin && (
                <form onSubmit={handleLogin} className="mt-4 space-y-3">
                  <input
                    type="email"
                    placeholder="aniketh@optra.me"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 text-sm bg-white/10 border border-white/30 rounded-xl focus:border-white/50 transition-colors"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 text-sm bg-white/10 border border-white/30 rounded-xl focus:border-white/50 transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full p-3 text-sm bg-green-500/20 text-green-400 rounded-xl hover:bg-green-500/30 transition-all hover:scale-105 font-semibold"
                  >
                    <Sparkles className="w-4 h-4 inline mr-2" />
                    Access Admin Panel
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <Bug className="w-5 h-5" />
            <span className="text-sm font-bold">Developer Tools</span>
          </div>
          <div className="space-y-2">
            <button
              onClick={() => navigate('/test-404')}
              className="w-full p-3 text-sm bg-orange-500/20 text-orange-400 rounded-xl hover:bg-orange-500/30 transition-all hover:scale-105 font-semibold"
            >
              Test 404 Page
            </button>
            <button
              onClick={() => navigate('/non-existent-route')}
              className="w-full p-3 text-sm bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-all hover:scale-105 font-semibold"
            >
              Trigger Real 404
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <Palette className="w-5 h-5" />
            <span className="text-sm font-bold">Visual Theme</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {themes.map(themeObj => (
              <button
                key={themeObj.id}
                onClick={() => applyTheme(themeObj.id)}
                className={`p-3 text-xs rounded-xl border transition-all duration-300 hover:scale-105 font-semibold ${
                  theme === themeObj.id 
                    ? 'border-white/50 bg-white/20 scale-105 text-white' 
                    : 'border-white/20 hover:border-white/40 hover:bg-white/10'
                }`}
              >
                {themeObj.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <Layout className="w-5 h-5" />
            <span className="text-sm font-bold">Layout Mode</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {layouts.map(layoutObj => (
              <button
                key={layoutObj.id}
                onClick={() => applyLayout(layoutObj.id)}
                className={`p-3 text-xs rounded-xl border transition-all duration-300 hover:scale-105 font-semibold ${
                  layout === layoutObj.id 
                    ? 'border-white/50 bg-white/20 scale-105 text-white' 
                    : 'border-white/20 hover:border-white/40 hover:bg-white/10'
                }`}
              >
                {layoutObj.name}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            document.body.className = '';
            setTheme('default');
            setLayout('default');
            console.log('🔄 All customizations reset!');
          }}
          className="w-full p-3 text-sm bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-all hover:scale-105 font-bold"
        >
          <Zap className="w-4 h-4 inline mr-2" />
          Reset Everything
        </button>
      </div>

      <div className="text-xs text-foreground/60 mt-6 space-y-1 leading-relaxed">
        <p><strong>Desktop:</strong> Top-left corner or Ctrl+Shift+S</p>
        <p><strong>Mobile:</strong> <Smartphone className="w-3 h-3 inline mx-1" />Tap top-right corner 5x quickly</p>
        <p><strong>Easter Eggs:</strong> Konami code, triple-click, Ctrl+Shift+M</p>
        <p><strong>Note:</strong> Visual changes are temporary, blog edits are permanent</p>
      </div>
    </div>
  );
};

export default SudoMode;
