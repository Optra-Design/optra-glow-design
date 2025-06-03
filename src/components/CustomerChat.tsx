
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../integrations/supabase/client';
import { encryptionService } from '../utils/encryption';
import { toast } from 'sonner';

interface ChatMessage {
  id: string;
  sender_id: string;
  encrypted_content: string;
  iv: string;
  created_at: string;
  decrypted_content?: string;
}

const CustomerChat = () => {
  const { user, isCustomer, profile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatRoom, setChatRoom] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user && isCustomer && isOpen) {
      initializeChat();
    }
  }, [user, isCustomer, isOpen]);

  useEffect(() => {
    if (chatRoom) {
      loadMessages();
      subscribeToMessages();
    }
  }, [chatRoom]);

  const initializeChat = async () => {
    if (!user) return;

    // Check if chat room exists
    let { data: existingRoom } = await supabase
      .from('chat_rooms')
      .select('*')
      .eq('customer_id', user.id)
      .single();

    if (!existingRoom) {
      // Create new chat room
      const { data: newRoom, error } = await supabase
        .from('chat_rooms')
        .insert({ customer_id: user.id })
        .select()
        .single();

      if (error) {
        toast.error('Failed to create chat room');
        return;
      }
      existingRoom = newRoom;
    }

    setChatRoom(existingRoom);
  };

  const loadMessages = async () => {
    if (!chatRoom) return;

    const { data: messageData } = await supabase
      .from('chat_messages')
      .select('*')
      .or(`and(sender_id.eq.${user?.id},recipient_id.is.null),and(sender_id.neq.${user?.id},recipient_id.eq.${user?.id})`)
      .order('created_at', { ascending: true });

    if (messageData) {
      const decryptedMessages = await Promise.all(
        messageData.map(async (msg) => {
          try {
            const decrypted = await encryptionService.decrypt(msg.encrypted_content, msg.iv);
            return { ...msg, decrypted_content: decrypted };
          } catch (error) {
            return { ...msg, decrypted_content: '[Unable to decrypt message]' };
          }
        })
      );
      setMessages(decryptedMessages);
    }
  };

  const subscribeToMessages = () => {
    const channel = supabase
      .channel('chat-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages'
        },
        async (payload) => {
          const newMsg = payload.new as ChatMessage;
          try {
            const decrypted = await encryptionService.decrypt(newMsg.encrypted_content, newMsg.iv);
            setMessages(prev => [...prev, { ...newMsg, decrypted_content: decrypted }]);
          } catch (error) {
            setMessages(prev => [...prev, { ...newMsg, decrypted_content: '[Unable to decrypt message]' }]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !user || !chatRoom || loading) return;

    setLoading(true);
    try {
      const { encryptedData, iv } = await encryptionService.encrypt(newMessage);
      
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          sender_id: user.id,
          encrypted_content: encryptedData,
          iv: iv
        });

      if (error) {
        toast.error('Failed to send message');
      } else {
        setNewMessage('');
      }
    } catch (error) {
      toast.error('Failed to encrypt message');
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!isCustomer) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 w-16 h-16 rounded-full bg-green-500 text-white shadow-lg transition-all duration-300 hover:scale-110 glow-hover"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-28 left-6 z-50 w-96 h-[500px] bg-gray-900/95 backdrop-blur-lg border border-gray-600/50 rounded-2xl shadow-2xl flex flex-col">
          <div className="p-4 border-b border-gray-600/50 flex items-center gap-3">
            <Shield className="w-5 h-5 text-green-400" />
            <div className="flex-1">
              <h3 className="font-bold text-white">Customer Support</h3>
              <p className="text-xs text-green-400">🔒 End-to-end encrypted</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl ${
                    message.sender_id === user?.id
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-700 text-white'
                  }`}
                >
                  <p className="text-sm">{message.decrypted_content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {new Date(message.created_at).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-600/50">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !loading && sendMessage()}
                placeholder="Type your message..."
                className="flex-1 bg-gray-800 border border-gray-600 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-gray-400 transition-colors"
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !newMessage.trim()}
                className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors disabled:opacity-50"
              >
                <Send size={16} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerChat;
