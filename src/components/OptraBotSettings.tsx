
import React from 'react';
import { X, Zap, Brain, Shield } from 'lucide-react';

interface OptraBotSettingsProps {
  onClose: () => void;
  setIsLLMLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const OptraBotSettings: React.FC<OptraBotSettingsProps> = ({ onClose }) => {
  return (
    <div className="p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-gradient flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Bot Settings
        </h3>
        <button
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex-1 space-y-4">
        <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <h4 className="flex items-center gap-2 mb-2 font-medium text-blue-400">
            <Brain className="w-4 h-4" />
            AI Technology
          </h4>
          <p className="text-xs text-blue-300 mb-3">
            OptraBot uses advanced AI technology developed specifically for Optra Design Studio. Fast, intelligent responses powered by our own AI infrastructure.
          </p>
          <div className="text-xs text-gray-300">
            Status: <span className="text-green-400">Active & Ready</span>
          </div>
        </div>
        
        <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
          <h4 className="font-medium mb-2 text-green-300">Performance</h4>
          <p className="text-xs text-green-400">
            Lightning fast responses using Optra's optimized AI models. Trained specifically on design expertise and Optra's knowledge base.
          </p>
        </div>
        
        <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
          <h4 className="flex items-center gap-2 font-medium mb-2 text-purple-300">
            <Shield className="w-4 h-4" />
            Privacy & Security
          </h4>
          <p className="text-xs text-purple-400">
            Your conversations are processed securely. OptraBot is designed with privacy in mind and integrates seamlessly with Optra's design philosophy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OptraBotSettings;
