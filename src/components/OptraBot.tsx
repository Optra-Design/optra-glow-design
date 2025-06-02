
import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Heart, Zap } from 'lucide-react';

const OptraBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey there! I'm OptraBot ✨ I'm here to help you discover Aniketh's design work, learn about Optra's services, or connect you directly with the founder. What interests you?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickReplies = [
    "Tell me about Aniketh",
    "What services do you offer?",
    "Show me the blog",
    "Schedule a meeting",
    "SUDO mode access"
  ];

  const botResponses: { [key: string]: string } = {
    "aniketh": "Aniketh is the passionate founder behind Optra Design! 🎨 Based in Bangalore, he's a solo creative force who believes in the power of exceptional design to transform businesses. He founded Optra with a vision to deliver hyper-premium experiences that truly matter. Check out the /founder page to learn more about his journey! ✨",
    "founder": "Aniketh founded Optra Design as a solo venture in Bangalore! 🚀 He's passionate about creating design solutions that don't just look beautiful, but drive real business results. His philosophy: every pixel should have a purpose, every interaction should feel intentional. Want to meet him? He's usually just an email away! 😊",
    "services": "Optra specializes in premium digital experiences! 🎯 We offer brand identity design, interactive web experiences, creative direction, and strategic consultation. Each project is crafted with meticulous attention to detail by Aniketh himself. What specific service interests you? 🎨",
    "meeting": "I'd love to help you connect with Aniketh! 📅 For the fastest response, reach out to aniketh@optra.me - you'll hear back within 48 hours. Or share your project details here and I'll make sure they reach him! He's always excited to discuss new projects. ✨",
    "work": "Our portfolio showcases transformative brand identities and digital experiences that drive results! 🌟 Each project tells a unique story of creativity meeting strategy. Unfortunately, we removed the work page to focus on new exciting features, but you can always email Aniketh for case studies! 📧",
    "blog": "Check out our new blog at /blog! 📝 Aniketh shares insights about design, creativity, and the journey of building exceptional experiences. It's where strategy meets storytelling! ✨",
    "sudo": "Psst... 🤫 Looking for SUDO mode? Try clicking the top-left corner of the screen or press Ctrl+Shift+S. Only true design nerds find this! 😉 There might be other easter eggs hidden around too... 🥚",
    "contact": "Ready to create something amazing? 🚀 Reach out to aniketh@optra.me and let's start the conversation! Aniketh personally responds to every inquiry within 48 hours. Based in Bangalore but working globally! 🌍"
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen && messages.length === 1) {
        setIsOpen(true);
        addBotMessage("Still exploring? I'm here if you need a guide through Aniketh's design universe! Try asking about SUDO mode for some hidden features 🎉");
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, [isOpen, messages.length]);

  const addBotMessage = (text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        text,
        isBot: true,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSendMessage = (text: string) => {
    const userMessage = {
      id: Date.now(),
      text,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    const lowercaseText = text.toLowerCase();
    let responseKey = '';

    if (lowercaseText.includes('aniketh') || lowercaseText.includes('founder') || lowercaseText.includes('who')) {
      responseKey = lowercaseText.includes('aniketh') ? 'aniketh' : 'founder';
    } else if (lowercaseText.includes('service') || lowercaseText.includes('what') || lowercaseText.includes('do')) {
      responseKey = 'services';
    } else if (lowercaseText.includes('meeting') || lowercaseText.includes('schedule') || lowercaseText.includes('contact')) {
      responseKey = 'contact';
    } else if (lowercaseText.includes('work') || lowercaseText.includes('portfolio') || lowercaseText.includes('project')) {
      responseKey = 'work';
    } else if (lowercaseText.includes('blog') || lowercaseText.includes('read') || lowercaseText.includes('article')) {
      responseKey = 'blog';
    } else if (lowercaseText.includes('sudo') || lowercaseText.includes('admin') || lowercaseText.includes('hidden')) {
      responseKey = 'sudo';
    } else {
      addBotMessage("That's an interesting question! 🤔 I'm still learning, but Aniketh would love to chat about it directly. Reach out to aniketh@optra.me for detailed discussions! In the meantime, try exploring our services or checking out the founder's story. Any other questions? 😊");
      return;
    }

    addBotMessage(botResponses[responseKey]);
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
        <div className="fixed bottom-28 right-6 z-50 w-80 h-96 bg-background/95 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl flex flex-col animate-slide-in-right glow-hover">
          <div className="p-4 border-b border-white/20 flex items-center gap-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <div>
              <h3 className="font-bold text-gradient">OptraBot</h3>
              <p className="text-xs text-foreground/70">Aniketh's AI assistant</p>
            </div>
            <Sparkles className="w-4 h-4 text-gradient ml-auto animate-spin" style={{ animationDuration: '3s' }} />
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}
              >
                <div
                  className={`max-w-xs p-3 rounded-2xl ${
                    message.isBot
                      ? 'bg-white/10 text-foreground border border-white/20'
                      : 'bg-optra-gradient text-white'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/10 p-3 rounded-2xl border border-white/20">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-white/20">
            <div className="flex flex-wrap gap-1 mb-3">
              {quickReplies.slice(0, 3).map((reply, index) => (
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
                placeholder="Ask me anything..."
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
        </div>
      )}
    </>
  );
};

export default OptraBot;
