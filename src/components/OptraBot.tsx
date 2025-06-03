
import React, { lazy, Suspense } from 'react';
import { MessageCircle, X, Sparkles, Settings, Minimize2, Maximize2, Zap } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';
import { useOptraBot } from '../hooks/useOptraBot';
import OptraBotChat from './OptraBotChat';

const OptraBotSettings = lazy(() => import('./OptraBotSettings'));

const OptraBot = () => {
  const {
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
  } = useOptraBot();

  const isMobile = useIsMobile();

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
        <div className={`fixed z-50 bg-gray-900/95 backdrop-blur-lg border border-gray-600/50 rounded-2xl shadow-2xl flex flex-col transition-all duration-300 ${
          isMobile 
            ? isMinimized 
              ? 'bottom-28 right-6 w-16 h-16' 
              : 'bottom-6 left-4 right-4 h-[70vh] max-h-[600px]'
            : isMinimized 
              ? 'bottom-28 right-6 w-16 h-16'
              : 'bottom-28 right-6 w-96 h-[500px]'
        }`}>
          {isMinimized ? (
            <button
              onClick={() => setIsMinimized(false)}
              className="w-full h-full flex items-center justify-center text-gradient hover:scale-110 transition-transform"
            >
              <Maximize2 className="w-6 h-6" />
            </button>
          ) : showSettings ? (
            <Suspense fallback={
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            }>
              <OptraBotSettings 
                onClose={() => setShowSettings(false)} 
                setIsLLMLoaded={() => {}}
              />
            </Suspense>
          ) : (
            <>
              <div className="p-4 border-b border-gray-600/50 flex items-center gap-3 flex-shrink-0">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gradient truncate">OptraBot</h3>
                  <p className="text-xs text-gray-300 flex items-center gap-1 truncate">
                    <Zap className="w-3 h-3 flex-shrink-0" />
                    Optra AI Assistant
                  </p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => setShowSettings(true)}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsMinimized(true)}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleClose}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <Sparkles className="w-4 h-4 text-gradient animate-spin" style={{ animationDuration: '3s' }} />
                </div>
              </div>

              <OptraBotChat
                messages={messages}
                inputText={inputText}
                setInputText={setInputText}
                isTyping={isTyping}
                onSendMessage={handleSendMessage}
              />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default OptraBot;
