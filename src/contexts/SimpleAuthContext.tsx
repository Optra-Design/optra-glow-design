
import React, { createContext, useContext, useState, useEffect } from 'react';
import { FounderConfig } from '../utils/founderConfig';

interface SimpleAuthContextType {
  isFounderLoggedIn: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const SimpleAuthContext = createContext<SimpleAuthContextType | undefined>(undefined);

export const useSimpleAuth = () => {
  const context = useContext(SimpleAuthContext);
  if (!context) {
    throw new Error('useSimpleAuth must be used within a SimpleAuthProvider');
  }
  return context;
};

export const SimpleAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isFounderLoggedIn, setIsFounderLoggedIn] = useState(false);

  useEffect(() => {
    // Check if founder is already logged in from localStorage
    const founderLogin = localStorage.getItem('founderLoggedIn');
    if (founderLogin === 'true') {
      setIsFounderLoggedIn(true);
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    if (FounderConfig.validateFounderCredentials(email, password)) {
      setIsFounderLoggedIn(true);
      localStorage.setItem('founderLoggedIn', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsFounderLoggedIn(false);
    localStorage.removeItem('founderLoggedIn');
  };

  return (
    <SimpleAuthContext.Provider value={{
      isFounderLoggedIn,
      login,
      logout
    }}>
      {children}
    </SimpleAuthContext.Provider>
  );
};
