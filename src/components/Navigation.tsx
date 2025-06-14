
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { useSimpleAuth } from '../contexts/SimpleAuthContext';
import SimpleLoginDialog from './SimpleLoginDialog';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const location = useLocation();
  const { isFounderLoggedIn, logout } = useSimpleAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Lab', path: '/lab' },
    { name: 'Pulse', path: '/pulse' },
    { name: 'Founder', path: '/founder' },
    { name: 'Blog', path: '/blog' },
    { name: 'Chat with Aniketh', path: '/chat' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-background/90 backdrop-blur-xl border-b border-white/20 shadow-xl' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group z-50">
              <img 
                src="/lovable-uploads/72ca124f-d77a-4c86-bf9f-15d2088962d5.png" 
                alt="Optra Design" 
                className="w-8 h-8 group-hover:scale-110 transition-transform duration-300"
              />
              <span className="text-xl font-bold text-gradient">Optra</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="ml-10 flex items-baseline space-x-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`px-4 py-2 text-sm font-medium transition-all duration-300 relative group rounded-lg ${
                      location.pathname === item.path 
                        ? 'text-gradient bg-white/10' 
                        : 'text-foreground/80 hover:text-foreground hover:bg-white/5'
                    }`}
                  >
                    {item.name}
                    <span className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#FF6B35] via-[#E91E63] to-[#9C27B0] group-hover:w-3/4 transition-all duration-300 ${
                      location.pathname === item.path ? 'w-3/4' : ''
                    }`}></span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Auth & Mobile menu */}
            <div className="flex items-center gap-4">
              {/* Auth Button */}
              <div className="hidden lg:block">
                {isFounderLoggedIn ? (
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-foreground/80">
                      <UserIcon className="w-4 h-4 inline mr-1" />
                      Aniketh
                      <span className="ml-1 text-yellow-400">👑</span>
                    </span>
                    <button
                      onClick={logout}
                      className="p-2 text-foreground/60 hover:text-foreground transition-colors rounded-lg hover:bg-white/10"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowAuth(true)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-white/10 transition-all duration-300 rounded-lg"
                  >
                    <LogIn className="w-4 h-4" />
                    Founder Login
                  </button>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="lg:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 text-foreground hover:text-gradient transition-all duration-300 z-50 relative rounded-lg hover:bg-white/10"
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-white/20 shadow-2xl animate-fade-in">
              <div className="px-4 py-4 space-y-1 max-h-96 overflow-y-auto">
                {navItems.map((item, index) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg ${
                      location.pathname === item.path 
                        ? 'text-gradient bg-white/15' 
                        : 'text-foreground/80 hover:text-foreground hover:bg-white/10'
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {/* Mobile Auth */}
                <div className="border-t border-white/20 pt-4 mt-4">
                  {isFounderLoggedIn ? (
                    <div className="space-y-2">
                      <div className="px-4 py-2 text-sm text-foreground/80">
                        <UserIcon className="w-4 h-4 inline mr-2" />
                        Aniketh
                        <span className="ml-1 text-yellow-400">👑</span>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setIsOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 text-base font-medium text-red-400 hover:bg-red-500/20 transition-all duration-300 rounded-lg"
                      >
                        <LogOut className="w-4 h-4 inline mr-2" />
                        Logout
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setShowAuth(true);
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-base font-medium text-foreground/80 hover:text-foreground hover:bg-white/10 transition-all duration-300 rounded-lg"
                    >
                      <LogIn className="w-4 h-4 inline mr-2" />
                      Founder Login
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <SimpleLoginDialog open={showAuth} onClose={() => setShowAuth(false)} />
    </>
  );
};

export default Navigation;
