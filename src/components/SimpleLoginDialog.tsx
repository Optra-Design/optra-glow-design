
import React, { useState } from 'react';
import { X, LogIn } from 'lucide-react';
import { useSimpleAuth } from '../contexts/SimpleAuthContext';
import { toast } from 'sonner';

interface SimpleLoginDialogProps {
  open: boolean;
  onClose: () => void;
}

const SimpleLoginDialog: React.FC<SimpleLoginDialogProps> = ({ open, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useSimpleAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (login(email, password)) {
      toast.success('Welcome back, Aniketh!');
      onClose();
      setEmail('');
      setPassword('');
    } else {
      toast.error('Invalid credentials');
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative glass p-8 rounded-3xl shadow-2xl w-full max-w-md mx-4 animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-foreground/60 hover:text-foreground transition-colors rounded-lg hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <LogIn className="w-12 h-12 text-gradient mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gradient">Founder Login</h2>
          <p className="text-foreground/80">Access admin features</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-foreground placeholder-foreground/50 focus:border-white/40 transition-colors"
              required
            />
          </div>
          
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-foreground placeholder-foreground/50 focus:border-white/40 transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-optra-gradient hover:scale-105 transition-all rounded-xl text-white font-semibold"
          >
            Login as Founder
          </button>
        </form>
      </div>
    </div>
  );
};

export default SimpleLoginDialog;
