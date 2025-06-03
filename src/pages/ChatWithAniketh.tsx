
import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { Send, MessageCircle, User, Phone, Mail, Clock, Eye } from 'lucide-react';
import { supabase } from '../integrations/supabase/client';
import { toast } from 'sonner';
import { useSimpleAuth } from '../contexts/SimpleAuthContext';

interface ChatMessage {
  id: string;
  sender_name: string;
  sender_email: string;
  sender_phone?: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

const ChatWithAniketh = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [messagesLoading, setMessagesLoading] = useState(true);
  const { isFounderLoggedIn } = useSimpleAuth();

  useEffect(() => {
    if (isFounderLoggedIn) {
      loadMessages();
    }
  }, [isFounderLoggedIn]);

  const loadMessages = async () => {
    setMessagesLoading(true);
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast.error('Failed to load messages');
      } else {
        setMessages(data || []);
      }
    } catch (error) {
      toast.error('Error loading messages');
    } finally {
      setMessagesLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.name || !newMessage.email || !newMessage.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          sender_name: newMessage.name,
          sender_email: newMessage.email,
          sender_phone: newMessage.phone || null,
          message: newMessage.message
        });

      if (error) {
        toast.error('Failed to send message');
      } else {
        toast.success('Message sent successfully!');
        setNewMessage({ name: '', email: '', phone: '', message: '' });
        if (isFounderLoggedIn) {
          loadMessages();
        }
      }
    } catch (error) {
      toast.error('Error sending message');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('chat_messages')
        .update({ is_read: true })
        .eq('id', messageId);

      if (!error) {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === messageId ? { ...msg, is_read: true } : msg
          )
        );
      }
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <MessageCircle className="w-12 h-12 text-gradient animate-pulse" />
              <h1 className="text-5xl md:text-7xl font-bold text-gradient animate-fade-in">
                Chat with Aniketh
              </h1>
            </div>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              💬 Connect directly with the founder of Optra Design. 
              Share your ideas, ask questions, or discuss your next project.
            </p>
          </div>

          {/* Contact Form */}
          <div className="mb-12">
            <div className="glass p-8 rounded-3xl">
              <h3 className="text-2xl font-bold text-gradient mb-6">Send a Message</h3>
              
              <form onSubmit={handleSendMessage} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-foreground/80 mb-2 font-semibold">
                      <User className="w-4 h-4 inline mr-2" />
                      Name *
                    </label>
                    <input
                      type="text"
                      value={newMessage.name}
                      onChange={(e) => setNewMessage({...newMessage, name: e.target.value})}
                      className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-foreground placeholder-foreground/50 focus:border-white/40 transition-colors"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-foreground/80 mb-2 font-semibold">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email *
                    </label>
                    <input
                      type="email"
                      value={newMessage.email}
                      onChange={(e) => setNewMessage({...newMessage, email: e.target.value})}
                      className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-foreground placeholder-foreground/50 focus:border-white/40 transition-colors"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-foreground/80 mb-2 font-semibold">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={newMessage.phone}
                    onChange={(e) => setNewMessage({...newMessage, phone: e.target.value})}
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-foreground placeholder-foreground/50 focus:border-white/40 transition-colors"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="block text-foreground/80 mb-2 font-semibold">
                    <MessageCircle className="w-4 h-4 inline mr-2" />
                    Message *
                  </label>
                  <textarea
                    value={newMessage.message}
                    onChange={(e) => setNewMessage({...newMessage, message: e.target.value})}
                    rows={6}
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-foreground placeholder-foreground/50 focus:border-white/40 transition-colors resize-none"
                    placeholder="Tell Aniketh about your project, ideas, or questions..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-optra-gradient hover:scale-105 transition-all rounded-xl text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5 inline mr-2" />
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>

          {/* Founder Messages View */}
          {isFounderLoggedIn && (
            <div className="glass p-8 rounded-3xl">
              <h3 className="text-2xl font-bold text-gradient mb-6">
                👑 Founder Dashboard - Incoming Messages
              </h3>
              
              {messagesLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                  <p className="text-foreground/60">Loading messages...</p>
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center py-12">
                  <MessageCircle className="w-16 h-16 text-gradient mx-auto mb-4 opacity-50" />
                  <p className="text-foreground/60">No messages yet</p>
                </div>
              ) : (
                <div className="space-y-6 max-h-[600px] overflow-y-auto">
                  {messages.map((message) => (
                    <div 
                      key={message.id}
                      className={`p-6 rounded-2xl border transition-all ${
                        message.is_read 
                          ? 'bg-white/5 border-white/10' 
                          : 'bg-blue-500/10 border-blue-400/30 shadow-lg'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-[#FF6B35] to-[#E91E63] rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-foreground">{message.sender_name}</h4>
                            <div className="flex items-center gap-4 text-sm text-foreground/60">
                              <span className="flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {message.sender_email}
                              </span>
                              {message.sender_phone && (
                                <span className="flex items-center gap-1">
                                  <Phone className="w-3 h-3" />
                                  {message.sender_phone}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1 text-xs text-foreground/60">
                            <Clock className="w-3 h-3" />
                            {new Date(message.created_at).toLocaleDateString()} {new Date(message.created_at).toLocaleTimeString()}
                          </span>
                          {!message.is_read && (
                            <button
                              onClick={() => markAsRead(message.id)}
                              className="p-1 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                              title="Mark as read"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-foreground/80 leading-relaxed bg-white/5 p-4 rounded-xl">
                        {message.message.split('\n').map((paragraph, i) => (
                          <p key={i} className="mb-2 last:mb-0">{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatWithAniketh;
