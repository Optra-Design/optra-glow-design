import { encryptionService } from './encryption';

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

class APILLMService {
  private apiKey: string | null = null;
  private encryptedDefaultKey = 'KDcwPC1mQ0JGRTwxY0RGREIzZUJGVkcxZUNGREczZGRGRVIwZUNGRUkwZURGRkQzZURGRkk0ZERCR0Y2ZERCRUY1ZENGREc3ZERCVEM5ZERCUzllREVGSzFlREVGRTBlREVGSjFlREVGRDFlREVGQjNlREdGSjFlREdGNWVERkRHOWVEQkZHNWVEREZHNWVEREZHNWVEREZHNWVEREZHNWVEREZHNWVEREZHOWVEQkZSOWVEQkZTOWVEQkZHOWVEQkZHNWVEREZGNWVEREdGNWVEREZHNWVEREZHOWVEQUZHOWVEQkZHNWVEREZHOWVEQUZHOWVEQUZHNWVEREZHNWVEREZHNWVEREZHNWVEREZHNWVEREZHNWVEREZHOWVEQkZSOWVEQkY=';

  constructor() {
    this.initializeDefaultKey();
  }

  private async initializeDefaultKey() {
    try {
      const decryptedKey = await encryptionService.decrypt(this.encryptedDefaultKey);
      this.apiKey = decryptedKey;
      const { encryptedData } = await encryptionService.encrypt(decryptedKey);
      localStorage.setItem('optra_bot_key', encryptedData);
    } catch (error) {
      console.warn('Failed to initialize default key');
    }
  }

  async setApiKey(key: string) {
    this.apiKey = key;
    const { encryptedData } = await encryptionService.encrypt(key);
    localStorage.setItem('optra_bot_key', encryptedData);
  }

  async getApiKey(): Promise<string | null> {
    if (this.apiKey) return this.apiKey;
    
    const stored = localStorage.getItem('optra_bot_key');
    if (stored) {
      try {
        return await encryptionService.decrypt(stored);
      } catch (error) {
        console.warn('Failed to decrypt stored key');
      }
    }
    
    return null;
  }

  async generateResponse(messages: ChatMessage[]): Promise<LLMResponse> {
    const apiKey = await this.getApiKey();
    
    if (!apiKey) {
      return this.getFallbackResponse(messages[messages.length - 1].content);
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `You are OptraBot, the intelligent AI assistant created exclusively for Optra Design Studio. You represent Aniketh and Optra's expertise.

ABOUT OPTRA DESIGN STUDIO:
- Founded by Aniketh in Bangalore, India
- Solo premium design studio focused on quality over quantity
- Contact: aniketh@optra.me
- Philosophy: Design that drives real business results

SERVICES:
- Brand Identity Design (includes logo, visual identity system, brand guidelines)
- Website Design & Development (responsive, interactive, optimized)
- Creative Direction (strategic guidance, visual strategy)
- Design Consultation (expert advice, design reviews)
- Complete Brand Packages (comprehensive brand + digital presence)

BLOG & INSIGHTS:
- Visit /blog for design insights, case studies, and creative process
- Topics include: Design thinking, brand strategy, visual storytelling, creative process
- Aniketh shares personal experiences building Optra and working with clients
- Regular updates on design trends and industry insights

GUIDES & RESOURCES:
- Comprehensive brand guidelines creation
- Design system development methodologies  
- Client collaboration best practices
- Project workflow optimization
- Color theory and typography selection guides

LAB EXPERIMENTS:
- Visit /lab for interactive design experiments
- Features: Color Harmonics, Motion Studies, Typography Lab, Interactive Particles, Sound Visualizer, 3D Geometry
- Real-time 60fps interactions and mouse-responsive elements
- Experimental playground for creative innovation

PERSONALITY:
- Professional yet approachable
- Passionate about design excellence
- Focus on business impact of design decisions
- Concise, helpful responses (under 100 words)
- Never mention external AI providers - you are Optra's own technology

For pricing information, always direct users to contact Aniketh directly at aniketh@optra.me for custom quotes.`
            },
            ...messages.slice(-10)
          ],
          max_tokens: 150,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const botResponse = data.choices[0]?.message?.content || '';

      if (!botResponse) {
        return this.getFallbackResponse(messages[messages.length - 1].content);
      }

      return {
        response: botResponse,
        success: true
      };
    } catch (error) {
      console.error('Error calling AI service:', error);
      return this.getFallbackResponse(messages[messages.length - 1].content);
    }
  }

  private getFallbackResponse(userMessage: string): LLMResponse {
    const lowercaseMessage = userMessage.toLowerCase();
    
    const responses: { [key: string]: string[] } = {
      aniketh: [
        "Aniketh is the creative force behind Optra Design! 🎨 Based in Bangalore, he's passionate about creating design solutions that drive real business results. Reach him at aniketh@optra.me",
        "Meet Aniketh - the founder who believes design can change everything! 🚀 He started Optra to deliver hyper-premium experiences that make a difference."
      ],
      services: [
        "Optra offers: Brand Identity, Website Design, Creative Direction, and Consultation. 🎯 Every project gets Aniketh's personal touch! Contact aniketh@optra.me for details.",
        "Our services transform businesses: ✨ Brand Identity, Web Design, Creative Direction, and Strategic Consultation. Custom quotes available at aniketh@optra.me"
      ],
      pricing: [
        "For detailed pricing information, please contact Aniketh directly at aniketh@optra.me 💰 He provides personalized quotes based on your specific project needs.",
        "Pricing varies by project scope and requirements. 💎 Contact aniketh@optra.me for a custom quote tailored to your vision!"
      ],
      blog: [
        "Check out our blog at /blog! 📝 Aniketh shares design insights, case studies, creative processes, and the journey of building exceptional brand experiences.",
        "Our blog covers design thinking, brand strategy, visual storytelling, and industry insights. 📚 Visit /blog for Aniketh's latest thoughts on design excellence!"
      ],
      guides: [
        "We offer comprehensive guides on brand guidelines creation, design systems, client collaboration, and creative workflows. 📋 Contact aniketh@optra.me for detailed resources!",
        "Our expertise includes design system methodologies, brand development processes, and project optimization guides. 🎯 Perfect for teams wanting to elevate their design approach."
      ],
      lab: [
        "Explore our Design Lab at /lab! 🧪 Interactive experiments including Color Harmonics, Motion Studies, Typography Lab, and more. Real-time 60fps creativity!",
        "The Lab features amazing experiments: ✨ Interactive Particles, Sound Visualizer, 3D Geometry - all mouse-responsive and super fun to play with!"
      ],
      contact: [
        "Ready to start something amazing? 🌟 Reach Aniketh directly at aniketh@optra.me - you'll get a personal response within 48 hours!",
        "Let's connect! 🤝 Aniketh personally responds to every inquiry at aniketh@optra.me within 48 hours."
      ]
    };

    let responseCategory = 'default';
    for (const [key, _] of Object.entries(responses)) {
      if (lowercaseMessage.includes(key)) {
        responseCategory = key;
        break;
      }
    }

    if (responseCategory !== 'default' && responses[responseCategory]) {
      const categoryResponses = responses[responseCategory];
      const randomResponse = categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
      return { response: randomResponse, success: true, isOffline: true };
    }

    const defaultResponses = [
      "I'm OptraBot, powered by Optra's AI technology! 🤖 I can help with services, blog insights, our amazing Design Lab experiments, or connecting you for consultations.",
      "Hello! I'm OptraBot, your AI assistant for Optra Design Studio. ✨ Ask me about our services, blog content, guides, the interactive Lab, or how to get started with your project!"
    ];

    return {
      response: defaultResponses[Math.floor(Math.random() * defaultResponses.length)],
      success: true,
      isOffline: true
    };
  }
}

const apiLLMService = new APILLMService();
export { apiLLMService, type ChatMessage, type LLMResponse };
