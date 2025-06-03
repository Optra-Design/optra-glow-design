
import { useState, useEffect } from 'react';
import { apiLLMService, ChatMessage } from '../utils/apiLlmService';

export const useOptraBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [messages, setMessages] = useState<{
    id: number;
    text: string;
    isBot: boolean;
    timestamp: Date;
  }[]>([
    {
      id: 1,
      text: "Hey there! I'm OptraBot ✨ Your AI assistant for Optra Design Studio. I'm here to help with information about our services, team, and how we can bring your design vision to life!",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const addBotMessage = async (text: string, useAI: boolean = false) => {
    setIsTyping(true);
    
    let response = text;
    let newChatHistory = [...chatHistory];
    
    if (useAI && text) {
      try {
        newChatHistory = [
          ...chatHistory,
          { role: 'user', content: text }
        ];
        
        const llmResponse = await apiLLMService.generateResponse(newChatHistory);
        
        newChatHistory = [
          ...newChatHistory,
          { role: 'assistant', content: llmResponse.response }
        ];
        
        response = llmResponse.response;
        
        if (newChatHistory.length > 12) {
          newChatHistory = newChatHistory.slice(newChatHistory.length - 10);
        }
        
        setChatHistory(newChatHistory);
      } catch (error) {
        console.error('Error generating response:', error);
        response = "I'm having trouble responding right now. Please try again in a moment, or feel free to contact Aniketh directly at aniketh@optra.me!";
      }
    }
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: response,
        isBot: true,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 200);
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;
    
    const userMessage = {
      id: Date.now(),
      text,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputText('');

    await addBotMessage(text, true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
    setShowSettings(false);
  };

  return {
    isOpen,
    setIsOpen,
    isMinimized,
    setIsMinimized,
    showSettings,
    setShowSettings,
    messages,
    inputText,
    setInputText,
    isTyping,
    handleSendMessage,
    handleClose
  };
};
