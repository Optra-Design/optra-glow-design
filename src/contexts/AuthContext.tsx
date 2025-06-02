
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  user: { email: string } | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    const savedAuth = localStorage.getItem('optra-auth');
    if (savedAuth) {
      const authData = JSON.parse(savedAuth);
      if (authData.email === 'aniketh@optra.me') {
        setIsLoggedIn(true);
        setUser({ email: authData.email });
      }
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    if (email === 'aniketh@optra.me' && password === 'Lendmybooks') {
      setIsLoggedIn(true);
      setUser({ email });
      localStorage.setItem('optra-auth', JSON.stringify({ email, timestamp: Date.now() }));
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('optra-auth');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
