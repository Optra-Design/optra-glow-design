
import React, { createContext, useContext, useState, useEffect } from 'react';
import { encryptionService } from '../utils/encryption';
import { FounderConfig } from '../utils/founderConfig';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'founder' | 'admin' | 'client' | 'user';
  createdAt: string;
  permissions: {
    canEditPosts: boolean;
    canDeletePosts: boolean;
    canManageUsers: boolean;
    canViewProgress: boolean;
    canEditWebsite: boolean;
  };
  clientInfo?: {
    projectName?: string;
    status?: 'pending' | 'in-progress' | 'completed';
    progress?: number;
    notes?: string;
  };
}

interface UserContextType {
  currentUser: User | null;
  users: User[];
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  updateUser: (userId: string, updates: Partial<User>) => void;
  deleteUser: (userId: string) => void;
  isFounder: boolean;
  isAdmin: boolean;
  canEdit: boolean;
}

const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Load users from localStorage
    const loadData = async () => {
      const savedUsers = localStorage.getItem('optra-users');
      const savedCurrentUser = localStorage.getItem('optra-current-user');
      
      if (savedUsers) {
        try {
          const decryptedUsers = await encryptionService.decrypt(savedUsers, '');
          setUsers(JSON.parse(decryptedUsers));
        } catch (error) {
          console.error('Failed to load users:', error);
        }
      } else {
        // Initialize with founder account using secure config
        const { email } = FounderConfig.getCredentials();
        const founderUser: User = {
          id: 'founder-001',
          email,
          name: 'Aniketh',
          role: 'founder',
          createdAt: new Date().toISOString(),
          permissions: {
            canEditPosts: true,
            canDeletePosts: true,
            canManageUsers: true,
            canViewProgress: true,
            canEditWebsite: true
          }
        };
        setUsers([founderUser]);
        await saveUsers([founderUser]);
      }

      if (savedCurrentUser) {
        try {
          const decryptedUser = await encryptionService.decrypt(savedCurrentUser, '');
          setCurrentUser(JSON.parse(decryptedUser));
        } catch (error) {
          console.error('Failed to load current user:', error);
        }
      }
    };

    loadData();
  }, []);

  const saveUsers = async (newUsers: User[]) => {
    setUsers(newUsers);
    try {
      const { encryptedData } = await encryptionService.encrypt(JSON.stringify(newUsers));
      localStorage.setItem('optra-users', encryptedData);
    } catch (error) {
      console.error('Failed to save users:', error);
    }
  };

  const saveCurrentUser = async (user: User | null) => {
    setCurrentUser(user);
    if (user) {
      try {
        const { encryptedData } = await encryptionService.encrypt(JSON.stringify(user));
        localStorage.setItem('optra-current-user', encryptedData);
      } catch (error) {
        console.error('Failed to save current user:', error);
      }
    } else {
      localStorage.removeItem('optra-current-user');
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Check founder credentials using secure config
    if (FounderConfig.validateFounderCredentials(email, password)) {
      const { email: founderEmail } = FounderConfig.getCredentials();
      const founderUser = users.find(u => u.email === founderEmail) || {
        id: 'founder-001',
        email: founderEmail,
        name: 'Aniketh',
        role: 'founder' as const,
        createdAt: new Date().toISOString(),
        permissions: {
          canEditPosts: true,
          canDeletePosts: true,
          canManageUsers: true,
          canViewProgress: true,
          canEditWebsite: true
        }
      };
      await saveCurrentUser(founderUser);
      return true;
    }

    // For demo purposes, accept any email/password combo for other users
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      await saveCurrentUser(existingUser);
      return true;
    }

    return false;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    if (users.find(u => u.email === email)) {
      return false; // User already exists
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      role: 'user',
      createdAt: new Date().toISOString(),
      permissions: {
        canEditPosts: false,
        canDeletePosts: false,
        canManageUsers: false,
        canViewProgress: false,
        canEditWebsite: false
      }
    };

    await saveUsers([...users, newUser]);
    await saveCurrentUser(newUser);
    return true;
  };

  const logout = () => {
    saveCurrentUser(null);
  };

  const updateUser = async (userId: string, updates: Partial<User>) => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, ...updates } : user
    );
    await saveUsers(updatedUsers);
    
    if (currentUser?.id === userId) {
      await saveCurrentUser({ ...currentUser, ...updates });
    }
  };

  const deleteUser = async (userId: string) => {
    if (currentUser?.role !== 'founder') return;
    const updatedUsers = users.filter(user => user.id !== userId);
    await saveUsers(updatedUsers);
  };

  const isFounder = currentUser?.role === 'founder';
  const isAdmin = currentUser?.role === 'admin' || currentUser?.role === 'founder';
  const canEdit = currentUser?.permissions.canEditPosts || false;

  return (
    <UserContext.Provider value={{
      currentUser,
      users,
      login,
      logout,
      register,
      updateUser,
      deleteUser,
      isFounder,
      isAdmin,
      canEdit
    }}>
      {children}
    </UserContext.Provider>
  );
};
