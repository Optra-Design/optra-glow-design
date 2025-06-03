
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X, Shield, CreditCard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../integrations/supabase/client';
import { encryptionService } from '../utils/encryption';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatMessage {
  id: string;
  sender_id: string;
  encrypted_content: string;
  iv: string;
  created_at: string;
  decrypted_content?: string;
  is_upi_request?: boolean;
  upi_amount?: number;
}

const FounderChat = () => {
  const { user, profile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showUpiForm, setShowUpiForm] = useState(false);
  const [upiAmount, setUpiAmount] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user && isOpen) {
      loadMessages();
      subscribeToMessages();
    }
  }, [user, isOpen]);

  const loadMessages = async () => {
    if (!user) return;

    const { data: messageData } = await supabase
      .from('chat_messages')
      .select('*')
      .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
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
      .channel('founder-chat')
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

  const sendMessage = async (content: string, isUpiRequest = false, amount?: number) => {
    if (!user || loading) return;

    setLoading(true);
    try {
      const messageContent = isUpiRequest ? `UPI Payment Request: ₹${amount}` : content;
      const { encryptedData, iv } = await encryptionService.encrypt(messageContent);
      
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          sender_id: user.id,
          encrypted_content: encryptedData,
          iv: iv,
          is_upi_request: isUpiRequest,
          upi_amount: amount
        });

      if (error) {
        toast.error('Failed to send message');
      } else {
        setNewMessage('');
        setShowUpiForm(false);
        setUpiAmount('');
      }
    } catch (error) {
      toast.error('Failed to encrypt message');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage(newMessage);
    }
  };

  const handleSendUpiRequest = () => {
    const amount = parseFloat(upiAmount);
    if (amount > 0) {
      sendMessage('', true, amount);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!user) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-20 z-50 w-14 h-14 rounded-full bg-purple-500 text-white shadow-lg transition-all duration-300 hover:scale-110"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-[500px] bg-gray-900/95 backdrop-blur-lg border border-gray-600/50 rounded-2xl shadow-2xl flex flex-col">
          <div className="p-4 border-b border-gray-600/50 flex items-center gap-3">
            <Shield className="w-5 h-5 text-purple-400" />
            <div className="flex-1">
              <h3 className="font-bold text-white">Chat with Founder</h3>
              <p className="text-xs text-purple-400">🔒 End-to-end encrypted</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.length === 0 && (
              <div className="text-center text-gray-400 py-8">
                <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Start a conversation with the founder!</p>
              </div>
            )}
            
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl ${
                    message.sender_id === user?.id
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-700 text-white'
                  } ${message.is_upi_request ? 'border-2 border-yellow-400' : ''}`}
                >
                  {message.is_upi_request && (
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCard className="w-4 h-4 text-yellow-400" />
                      <span className="text-xs font-bold text-yellow-400">UPI REQUEST</span>
                    </div>
                  )}
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
            {showUpiForm ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-yellow-400 font-bold">UPI Payment Request</span>
                </div>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Amount in ₹"
                    value={upiAmount}
                    onChange={(e) => setUpiAmount(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                  <Button
                    onClick={handleSendUpiRequest}
                    disabled={!upiAmount || parseFloat(upiAmount) <= 0}
                    className="bg-yellow-500 hover:bg-yellow-600"
                  >
                    Send
                  </Button>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowUpiForm(false)}
                  className="w-full"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <>
                <div className="flex gap-2 mb-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowUpiForm(true)}
                    className="flex items-center gap-2 text-xs px-3 py-1 h-8"
                    disabled={profile?.role === 'admin'}
                  >
                    <CreditCard className="w-3 h-3" />
                    UPI Request
                  </Button>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !loading && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 bg-gray-800 border border-gray-600 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-gray-400 transition-colors"
                    disabled={loading}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={loading || !newMessage.trim()}
                    className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors disabled:opacity-50"
                  >
                    <Send size={16} className="text-white" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FounderChat;
