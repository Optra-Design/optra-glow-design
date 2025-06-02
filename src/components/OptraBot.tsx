
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Sparkles, Settings, User, Bot, Minimize2, Maximize2, Brain, Key } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';
import { callLLM } from '../utils/llmService';

const OptraBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('optrabot-api-key') || '');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey there! I'm OptraBot ✨ I'm now powered by advanced AI and can have real conversations about Aniketh's work, Optra's services, or anything design-related. What interests you?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
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
    "Show me pricing info",
    "How can I get in touch?",
    "Creative process insights",
    "Portfolio examples"
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen && messages.length === 1) {
        setIsOpen(true);
        addBotMessage("I'm now AI-powered and ready for real conversations! 🤖 Ask me anything about design, Optra's services, or Aniketh's creative approach. I can even discuss your project ideas! ✨");
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, [isOpen, messages.length]);

  const addBotMessage = async (text: string, useAI: boolean = false, conversationHistory: any[] = []) => {
    setIsTyping(true);
    
    let response = text;
    
    if (useAI && text) {
      const chatHistory = conversationHistory.map(msg => ({
        role: msg.isBot ? 'assistant' : 'user' as const,
        content: msg.text
      }));
      
      chatHistory.push({ role: 'user' as const, content: text });
      
      const llmResponse = await callLLM(chatHistory, apiKey || undefined);
      response = llmResponse.response;
    }
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: response,
        isBot: true,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 500 + Math.random() * 1000);
  };

  const handleSendMessage = async (text: string) => {
    const userMessage = {
      id: Date.now(),
      text,
      isBot: false,
      timestamp: new Date()
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputText('');

    // Use AI for response
    await addBotMessage(text, true, updatedMessages);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
    setShowSettings(false);
  };

  const saveApiKey = () => {
    localStorage.setItem('optrabot-api-key', apiKey);
    setShowSettings(false);
  };

  const clearApiKey = () => {
    setApiKey('');
    localStorage.removeItem('optrabot-api-key');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-optra-gradient text-white shadow-lg transition-all duration-300 hover:scale-110 glow-hover ${
          isOpen ? 'rotate-180' : 'animate-bounce-subtle'
        }`}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>

      {isOpen && (
        <div className={`fixed z-50 bg-background/95 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl flex flex-col animate-slide-in-right glow-hover transition-all duration-300 ${
          isMobile 
            ? isMinimized 
              ? 'bottom-28 right-6 w-16 h-16' 
              : 'bottom-6 left-4 right-4 h-[70vh]'
            : isMinimized 
              ? 'bottom-28 right-6 w-16 h-16'
              : 'bottom-28 right-6 w-80 h-96'
        }`}>
          {isMinimized ? (
            <button
              onClick={() => setIsMinimized(false)}
              className="w-full h-full flex items-center justify-center text-gradient hover:scale-110 transition-transform"
            >
              <Maximize2 className="w-6 h-6" />
            </button>
          ) : showSettings ? (
            <div className="p-6 flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gradient flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  AI Settings
                </h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-1 text-foreground/60 hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex-1 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <Key className="w-4 h-4" />
                    OpenAI API Key (Optional)
                  </label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-..."
                    className="w-full bg-white/10 border border-white/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-white/50 transition-colors"
                  />
                  <p className="text-xs text-foreground/60 mt-2">
                    Add your OpenAI API key for enhanced AI responses. Without it, I'll use smart built-in responses.
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={saveApiKey}
                    className="flex-1 bg-green-500/20 text-green-400 px-4 py-2 rounded-lg hover:bg-green-500/30 transition-colors text-sm font-medium"
                  >
                    Save Key
                  </button>
                  <button
                    onClick={clearApiKey}
                    className="flex-1 bg-red-500/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors text-sm font-medium"
                  >
                    Clear
                  </button>
                </div>
                
                <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium text-blue-400">AI Status</span>
                  </div>
                  <p className="text-xs text-blue-300">
                    {apiKey ? '🤖 Enhanced AI enabled with your API key' : '🧠 Smart built-in responses active'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="p-4 border-b border-white/20 flex items-center gap-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <h3 className="font-bold text-gradient">OptraBot</h3>
                  <p className="text-xs text-foreground/70 flex items-center gap-1">
                    <Brain className="w-3 h-3" />
                    AI-Powered Assistant
                  </p>
                </div>
                <button
                  onClick={() => setShowSettings(true)}
                  className="p-1 text-foreground/60 hover:text-foreground transition-colors"
                >
                  <Settings className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1 text-foreground/60 hover:text-foreground transition-colors"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleClose}
                  className="p-1 text-foreground/60 hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <Sparkles className="w-4 h-4 text-gradient animate-spin" style={{ animationDuration: '3s' }} />
              </div>

              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}
                  >
                    <div className={`flex items-end gap-2 max-w-xs ${message.isBot ? 'flex-row' : 'flex-row-reverse'}`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        message.isBot ? 'bg-optra-gradient' : 'bg-white/20'
                      }`}>
                        {message.isBot ? <Bot size={12} /> : <User size={12} />}
                      </div>
                      <div
                        className={`p-3 rounded-2xl ${
                          message.isBot
                            ? 'bg-white/10 text-foreground border border-white/20'
                            : 'bg-optra-gradient text-white'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-end gap-2 max-w-xs">
                      <div className="w-6 h-6 rounded-full bg-optra-gradient flex items-center justify-center">
                        <Bot size={12} />
                      </div>
                      <div className="bg-white/10 p-3 rounded-2xl border border-white/20">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-3 border-t border-white/20">
                <div className="flex flex-wrap gap-1 mb-3">
                  {quickReplies.slice(0, isMobile ? 2 : 3).map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(reply)}
                      className="text-xs px-3 py-1 bg-white/10 rounded-full hover:bg-white/20 transition-all hover:scale-105 border border-white/20"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t border-white/20">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && inputText.trim() && handleSendMessage(inputText)}
                    placeholder="Ask me anything about Optra..."
                    className="flex-1 bg-white/10 border border-white/30 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-white/50 transition-colors"
                  />
                  <button
                    onClick={() => inputText.trim() && handleSendMessage(inputText)}
                    className="w-10 h-10 bg-optra-gradient rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-200"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default OptraBot;
