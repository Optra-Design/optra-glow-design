
import React, { useState } from 'react';
import { useUser, User } from '../contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, Crown, Shield, User as UserIcon, Trash2, Edit3, Save, X } from 'lucide-react';

const UserManagement: React.FC = () => {
  const { users, updateUser, deleteUser, isFounder } = useUser();
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<User>>({});

  if (!isFounder) return null;

  const handleEditUser = (user: User) => {
    setEditingUser(user.id);
    setEditForm(user);
  };

  const handleSaveUser = () => {
    if (editingUser && editForm) {
      updateUser(editingUser, editForm);
      setEditingUser(null);
      setEditForm({});
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditForm({});
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'founder': return <Crown className="w-4 h-4 text-yellow-400" />;
      case 'admin': return <Shield className="w-4 h-4 text-blue-400" />;
      case 'client': return <UserIcon className="w-4 h-4 text-green-400" />;
      default: return <UserIcon className="w-4 h-4 text-gray-400" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'founder': return 'text-yellow-400';
      case 'admin': return 'text-blue-400';
      case 'client': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="glass p-6 rounded-3xl">
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-6 h-6 text-gradient" />
        <h3 className="text-2xl font-bold text-gradient">User Management</h3>
        <span className="text-sm text-foreground/60">({users.length} users)</span>
      </div>

      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="p-4 bg-white/5 rounded-xl border border-white/10">
            {editingUser === user.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Name"
                    value={editForm.name || ''}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="bg-white/10 border-white/20"
                  />
                  <select
                    value={editForm.role || 'user'}
                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value as User['role'] })}
                    className="px-3 py-2 bg-white/10 border border-white/20 rounded-md text-foreground"
                  >
                    <option value="user">User</option>
                    <option value="client">Client</option>
                    <option value="admin">Admin</option>
                    {user.role === 'founder' && <option value="founder">Founder</option>}
                  </select>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button onClick={handleSaveUser} size="sm" className="bg-green-500/20 text-green-400 hover:bg-green-500/30">
                    <Save className="w-4 h-4 mr-1" />
                    Save
                  </Button>
                  <Button onClick={handleCancelEdit} size="sm" variant="outline">
                    <X className="w-4 h-4 mr-1" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getRoleIcon(user.role)}
                  <div>
                    <div className="font-semibold text-foreground">{user.name}</div>
                    <div className="text-sm text-foreground/60">{user.email}</div>
                    <div className={`text-xs font-medium ${getRoleColor(user.role)}`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => handleEditUser(user)}
                    size="sm"
                    variant="outline"
                    className="text-blue-400 hover:bg-blue-500/20"
                  >
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  {user.role !== 'founder' && (
                    <Button
                      onClick={() => deleteUser(user.id)}
                      size="sm"
                      variant="outline"
                      className="text-red-400 hover:bg-red-500/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
