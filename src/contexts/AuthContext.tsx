
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../integrations/supabase/client';
import { FounderConfig } from '../utils/founderConfig';
import { cleanupAuthState, forceCleanReload } from '../utils/authCleanup';

interface Profile {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'customer' | 'user';
  created_at?: string;
  updated_at?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  isCustomer: boolean;
  isLoggedIn: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    console.log('AuthProvider: Setting up auth state listener');

    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!mounted) return;

        console.log('Auth state change:', event, session?.user?.email);
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user && event === 'SIGNED_IN') {
          console.log('User signed in, fetching profile...');
          // Defer profile fetching to prevent deadlocks
          setTimeout(async () => {
            if (!mounted) return;
            
            try {
              const { data: profileData, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .maybeSingle();
              
              if (!error && profileData && mounted) {
                console.log('Profile loaded:', profileData);
                // Ensure the role is properly typed
                const typedProfile: Profile = {
                  id: profileData.id,
                  email: profileData.email,
                  name: profileData.name,
                  role: (profileData.role === 'admin' || profileData.role === 'customer' || profileData.role === 'user') 
                    ? profileData.role 
                    : 'user',
                  created_at: profileData.created_at,
                  updated_at: profileData.updated_at
                };
                setProfile(typedProfile);
              } else {
                console.log('Profile not found, creating default for founder...');
                // Create a default profile for the founder if it doesn't exist
                const { email } = FounderConfig.getCredentials();
                if (session.user.email === email && mounted) {
                  const defaultProfile: Profile = {
                    id: session.user.id,
                    email: session.user.email || email,
                    name: 'Aniketh',
                    role: 'admin'
                  };
                  setProfile(defaultProfile);
                  console.log('Default founder profile created');
                }
              }
            } catch (error) {
              console.warn('Error fetching profile:', error);
            } finally {
              if (mounted) setLoading(false);
            }
          }, 100);
        } else if (event === 'SIGNED_OUT') {
          console.log('User signed out, clearing profile');
          setProfile(null);
          if (mounted) setLoading(false);
        } else {
          if (mounted) setLoading(false);
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      console.log('Initial session check:', session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      if (!session) {
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      console.log('SignIn attempt for:', email);
      
      // Clean up any existing state first
      cleanupAuthState();

      // Force sign out any existing session
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        console.log('No existing session to sign out');
      }

      // Check for founder credentials using secure config
      if (FounderConfig.validateFounderCredentials(email, password)) {
        console.log('Founder credentials detected');
        
        // Try to sign in with Supabase first
        const { data, error: signInError } = await supabase.auth.signInWithPassword({ 
          email, 
          password 
        });
        
        if (!signInError && data.user) {
          console.log('Founder signed in successfully');
          return { error: null };
        }
        
        console.log('Sign in failed, trying sign up for founder:', signInError);
        
        // If sign in fails, try to sign up the founder account
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: { name: 'Aniketh' }
          }
        });
        
        if (signUpError) {
          console.error('Founder signup failed:', signUpError);
          return { error: signUpError };
        }
        
        console.log('Founder account created, check email for confirmation');
        return { error: null };
      }
      
      // For all other users, use regular Supabase auth
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        console.error('Regular user sign in failed:', error);
        return { error };
      }
      
      console.log('Regular user signed in successfully');
      return { error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { error: { message: 'Sign in failed' } };
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      console.log('SignUp attempt for:', email);
      cleanupAuthState();
      
      const redirectUrl = `${window.location.origin}/`;
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: { name }
        }
      });
      
      if (error) {
        console.error('Sign up failed:', error);
      } else {
        console.log('Sign up successful, check email for confirmation');
      }
      
      return { error };
    } catch (error) {
      console.error('Sign up error:', error);
      return { error: { message: 'Sign up failed' } };
    }
  };

  const signOut = async () => {
    try {
      console.log('Signing out...');
      cleanupAuthState();
      await supabase.auth.signOut({ scope: 'global' });
      forceCleanReload();
    } catch (error) {
      console.error('Sign out error:', error);
      // Force cleanup and redirect even if signOut fails
      forceCleanReload();
    }
  };

  // Legacy methods for SudoMode compatibility
  const login = (email: string, password: string): boolean => {
    return FounderConfig.validateFounderCredentials(email, password);
  };

  const logout = () => {
    signOut();
  };

  const isAdmin = profile?.role === 'admin';
  const isCustomer = profile?.role === 'customer';
  const isLoggedIn = !!user && !!session;

  return (
    <AuthContext.Provider value={{
      user,
      session,
      profile,
      loading,
      signIn,
      signUp,
      signOut,
      isAdmin,
      isCustomer,
      isLoggedIn,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};
