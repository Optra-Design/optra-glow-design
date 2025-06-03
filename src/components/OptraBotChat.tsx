
import React, { useRef, useEffect } from 'react';
import { Send, User, Bot } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

interface OptraBotChatProps {
  messages: Array<{
    id: number;
    text: string;
    isBot: boolean;
    timestamp: Date;
  }>;
  inputText: string;
  setInputText: (text: string) => void;
  isTyping: boolean;
  onSendMessage: (text: string) => void;
}

const OptraBotChat: React.FC<OptraBotChatProps> = ({
  messages,
  inputText,
  setInputText,
  isTyping,
  onSendMessage
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const quickReplies = [
    "Tell me about Aniketh",
    "What services do you offer?",
    "How can I get in touch?",
    "Show me your portfolio"
  ];

  return (
    <>
      <div className="flex-1 p-4 overflow-y-auto space-y-3 min-h-0">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}
          >
            <div className={`flex items-start gap-2 max-w-[85%] ${message.isBot ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                message.isBot ? 'bg-optra-gradient' : 'bg-gray-600'
              }`}>
                {message.isBot ? <Bot size={14} /> : <User size={14} />}
              </div>
              <div
                className={`p-3 rounded-2xl break-words ${
                  message.isBot
                    ? 'bg-gray-800 text-white border border-gray-600/50'
                    : 'bg-optra-gradient text-white'
                }`}
              >
                <p className="text-sm leading-relaxed text-white">{message.text}</p>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start gap-2 max-w-[85%]">
              <div className="w-7 h-7 rounded-full bg-optra-gradient flex items-center justify-center flex-shrink-0 mt-1">
                <Bot size={14} />
              </div>
              <div className="bg-gray-800 p-3 rounded-2xl border border-gray-600/50">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t border-gray-600/50 flex-shrink-0">
        <div className="flex flex-wrap gap-1 mb-3">
          {quickReplies.slice(0, isMobile ? 2 : 3).map((reply, index) => (
            <button
              key={index}
              onClick={() => onSendMessage(reply)}
              className="text-xs px-3 py-1 bg-gray-700 text-gray-200 rounded-full hover:bg-gray-600 transition-all hover:scale-105 border border-gray-600"
            >
              {reply}
            </button>
          ))}
        </div>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && inputText.trim() && onSendMessage(inputText)}
            placeholder="Ask me about Optra's services..."
            className="flex-1 bg-gray-800 border border-gray-600 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-gray-400 transition-colors placeholder-gray-400"
          />
          <button
            onClick={() => inputText.trim() && onSendMessage(inputText)}
            className="w-10 h-10 bg-optra-gradient rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-200"
          >
            <Send size={16} className="text-white" />
          </button>
        </div>
      </div>
    </>
  );
};

export default OptraBotChat;
