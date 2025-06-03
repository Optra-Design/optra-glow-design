
import { pipeline } from '@huggingface/transformers';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface LLMResponse {
  response: string;
  success: boolean;
  error?: string;
  isOffline?: boolean;
}

class FreeLLMService {
  private textGenerator: any = null;
  private isInitializing = false;
  private initialized = false;

  async initialize(): Promise<boolean> {
    if (this.initialized) return true;
    if (this.isInitializing) return false;

    this.isInitializing = true;
    
    try {
      console.log('🤖 Initializing free LLM...');
      
      // Use a small, fast model for better performance
      this.textGenerator = await pipeline(
        'text-generation',
        'onnx-community/Qwen2.5-0.5B-Instruct',
        { 
          device: 'webgpu',
          dtype: 'fp16'
        }
      );
      
      this.initialized = true;
      this.isInitializing = false;
      console.log('✅ Free LLM initialized successfully!');
      return true;
    } catch (error) {
      console.warn('⚠️ WebGPU failed, falling back to CPU:', error);
      try {
        this.textGenerator = await pipeline(
          'text-generation',
          'onnx-community/Qwen2.5-0.5B-Instruct',
          { device: 'cpu' }
        );
        this.initialized = true;
        this.isInitializing = false;
        console.log('✅ Free LLM initialized on CPU!');
        return true;
      } catch (cpuError) {
        console.error('❌ LLM initialization failed:', cpuError);
        this.isInitializing = false;
        return false;
      }
    }
  }

  async generateResponse(messages: ChatMessage[]): Promise<LLMResponse> {
    if (!this.initialized) {
      const initSuccess = await this.initialize();
      if (!initSuccess) {
        return this.getFallbackResponse(messages[messages.length - 1].content);
      }
    }

    try {
      const lastMessage = messages[messages.length - 1];
      
      // Create a context-aware prompt
      const systemPrompt = `You are OptraBot, an AI assistant for Optra Design Studio founded by Aniketh in Bangalore. You help with:
- Information about Aniketh and his design work
- Services: Brand identity, web design, creative direction
- Contact: aniketh@optra.me
- Studio philosophy: Premium design that drives results

Be helpful, concise, and professional. Keep responses under 100 words.`;

      const prompt = `${systemPrompt}\n\nUser: ${lastMessage.content}\nAssistant:`;

      const result = await this.textGenerator(prompt, {
        max_new_tokens: 150,
        temperature: 0.7,
        do_sample: true,
        top_p: 0.9,
        repetition_penalty: 1.1
      });

      // Extract the generated text
      let response = '';
      if (Array.isArray(result)) {
        response = result[0]?.generated_text || '';
      } else {
        response = result.generated_text || '';
      }

      // Clean up the response
      response = response.replace(prompt, '').trim();
      
      // Fall back if response is empty or invalid
      if (!response) {
        return this.getFallbackResponse(lastMessage.content);
      }

      return {
        response,
        success: true
      };
    } catch (error) {
      console.error('Error generating LLM response:', error);
      return this.getFallbackResponse(messages[messages.length - 1].content);
    }
  }

  private getFallbackResponse(userMessage: string): LLMResponse {
    const lowercaseMessage = userMessage.toLowerCase();
    
    // Enhanced pattern matching with more sophisticated responses
    const responses: { [key: string]: string[] } = {
      aniketh: [
        "Aniketh is the creative force behind Optra Design! 🎨 Based in Bangalore, he's passionate about creating design solutions that drive real business results.",
        "Meet Aniketh - the founder who believes design can change everything! 🚀 He started Optra as a solo venture to deliver hyper-premium experiences."
      ],
      services: [
        "Optra specializes in premium digital experiences! 🎯 We offer brand identity design, interactive web experiences, creative direction, and strategic consultation.",
        "Our services transform your business: ✨ Brand Identity (logos, visual systems), Web Design, Creative Direction, and Consultation. Every project gets Aniketh's personal touch."
      ],
      contact: [
        "Ready to start something amazing? 🌟 The best way to reach Aniketh is via email at aniketh@optra.me - you'll get a personal response within 48 hours!",
        "Let's connect! 🤝 Aniketh personally responds to every inquiry at aniketh@optra.me within 48 hours."
      ],
      pricing: [
        "Great question about pricing! 💰 Every project is unique, so Aniketh provides customized quotes. Reach out to aniketh@optra.me with your project details!",
        "Investment varies based on project scope and complexity! 💎 Aniketh believes in transparent, value-based pricing."
      ],
      help: [
        "I'm here to help you discover Optra's world! 🤖 I can tell you about Aniketh, our services, guide you to our blog, help you get in touch, or share hidden features.",
        "Happy to assist! 🌟 I can help with information about Aniketh's background, our design services, contact details, or guide you to specific pages."
      ]
    };
  
    // Find matching response category
    let responseCategory = 'default';
    for (const [key, _] of Object.entries(responses)) {
      if (lowercaseMessage.includes(key)) {
        responseCategory = key;
        break;
      }
    }
  
    // Additional specific patterns
    if (lowercaseMessage.includes('blog')) {
      return {
        response: "Check out our new blog at /blog! 📝 Aniketh shares insights about design, creativity, and the journey of building exceptional experiences.",
        success: true,
        isOffline: true
      };
    }
  
    // Get response from category
    if (responseCategory !== 'default' && responses[responseCategory]) {
      const categoryResponses = responses[responseCategory];
      const randomResponse = categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
      return { response: randomResponse, success: true, isOffline: true };
    }
  
    // Default responses for unmatched queries
    const defaultResponses = [
      "I'm running in offline mode - I can still help with basic information about Optra Design and Aniketh's services. 🤔",
      "I'm currently using my offline database. I specialize in information about Optra's services, Aniketh's background, and getting you connected for consultations. 🎨"
    ];
  
    return {
      response: defaultResponses[Math.floor(Math.random() * defaultResponses.length)],
      success: true,
      isOffline: true
    };
  }
}

// Create a singleton instance
const freeLLMService = new FreeLLMService();

export { freeLLMService, type ChatMessage, type LLMResponse };
