
interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface LLMResponse {
  response: string;
  success: boolean;
  error?: string;
}

export const callLLM = async (messages: ChatMessage[], apiKey?: string): Promise<LLMResponse> => {
  // If no API key provided, fall back to enhanced static responses
  if (!apiKey) {
    return generateEnhancedResponse(messages[messages.length - 1].content);
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
            content: `You are OptraBot, Aniketh's AI assistant for Optra Design Studio. You're knowledgeable about:
            - Aniketh: Founder of Optra Design, based in Bangalore, passionate about premium design
            - Services: Brand identity, web design, creative direction, consultation
            - Contact: aniketh@optra.me, responds within 48 hours
            - Studio: Solo operation focused on quality over quantity
            - Style: Premium, thoughtful design that drives business results
            
            Be helpful, friendly, and professional. Keep responses concise but informative. Use emojis sparingly but effectively. Always try to guide users toward contacting Aniketh for project discussions.`
          },
          ...messages
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return {
      response: data.choices[0]?.message?.content || "I'm having trouble responding right now. Please try asking again!",
      success: true
    };
  } catch (error) {
    console.error('LLM API Error:', error);
    return generateEnhancedResponse(messages[messages.length - 1].content);
  }
};

const generateEnhancedResponse = (userMessage: string): LLMResponse => {
  const lowercaseMessage = userMessage.toLowerCase();
  
  // Enhanced pattern matching with more sophisticated responses
  const responses: { [key: string]: string[] } = {
    aniketh: [
      "Aniketh is the creative force behind Optra Design! 🎨 Based in Bangalore, he's passionate about creating design solutions that don't just look beautiful, but drive real business results. His philosophy: every pixel should have a purpose. Want to know more about his journey? Check out the /founder page! ✨",
      "Meet Aniketh - the founder who believes design can change everything! 🚀 He started Optra as a solo venture to deliver hyper-premium experiences. Based in Bangalore but working globally, he personally handles every project. Ready to discuss your vision with him? Drop an email at aniketh@optra.me! 😊"
    ],
    services: [
      "Optra specializes in premium digital experiences that make an impact! 🎯 We offer brand identity design, interactive web experiences, creative direction, and strategic consultation. Each project is personally crafted by Aniketh with meticulous attention to detail. What type of project are you considering? 🎨",
      "Our services are designed to transform your business: ✨ Brand Identity (logos, visual systems), Web Design (interactive experiences), Creative Direction (strategic vision), and Consultation (design strategy). Every project gets Aniketh's personal touch. Which service interests you most? 🚀"
    ],
    contact: [
      "Ready to start something amazing? 🌟 The best way to reach Aniketh is via email at aniketh@optra.me - you'll get a personal response within 48 hours! You can also use our contact form for detailed project information. He loves discussing new projects and creative challenges! 📧",
      "Let's connect! 🤝 Aniketh personally responds to every inquiry at aniketh@optra.me within 48 hours. Based in Bangalore but working with clients globally. Whether it's a quick question or a major project, he's excited to hear from you! ✨"
    ],
    pricing: [
      "Great question about pricing! 💰 Every project is unique, so Aniketh prefers to understand your specific needs first before providing a customized quote. Reach out to aniketh@optra.me with your project details, and you'll get transparent pricing tailored to your requirements! 📊",
      "Investment varies based on project scope and complexity! 💎 Aniketh believes in transparent, value-based pricing. Share your project details via aniketh@optra.me and you'll receive a personalized proposal within 48 hours. Quality design is an investment in your business success! ✨"
    ],
    help: [
      "I'm here to help you discover Optra's world! 🤖 I can tell you about Aniketh, our services, guide you to our blog, help you get in touch, or even share some hidden features. I can also discuss pricing, timelines, or our design process. What would you like to explore? ✨",
      "Happy to assist! 🌟 I can help with information about Aniketh's background, our design services, contact details, project timelines, pricing, or guide you to specific pages. I might even know about some easter eggs hidden around the site! What can I help you discover? 🎨"
    ]
  };

  // Find matching response category
  let responseCategory = 'default';
  for (const [key, categoryResponses] of Object.entries(responses)) {
    if (lowercaseMessage.includes(key) || 
        (key === 'aniketh' && (lowercaseMessage.includes('founder') || lowercaseMessage.includes('who'))) ||
        (key === 'services' && (lowercaseMessage.includes('what') || lowercaseMessage.includes('do'))) ||
        (key === 'contact' && (lowercaseMessage.includes('reach') || lowercaseMessage.includes('email') || lowercaseMessage.includes('meeting'))) ||
        (key === 'help' && (lowercaseMessage.includes('assist') || lowercaseMessage.includes('guide')))) {
      responseCategory = key;
      break;
    }
  }

  // Additional specific patterns
  if (lowercaseMessage.includes('blog')) {
    return {
      response: "Check out our new blog at /blog! 📝 Aniketh shares insights about design, creativity, and the journey of building exceptional experiences. It's where strategy meets storytelling! Perfect for design enthusiasts and business owners alike. ✨",
      success: true
    };
  }

  if (lowercaseMessage.includes('lab')) {
    return {
      response: "Our Design Lab at /lab is where magic happens! 🧪 It's packed with interactive experiments showcasing color theory, motion studies, and creative explorations. Perfect for seeing Optra's innovative approach to design. Try the particle system - it responds to your mouse! ✨",
      success: true
    };
  }

  if (lowercaseMessage.includes('pulse')) {
    return {
      response: "The Studio Pulse at /pulse gives you real-time insights into our creative process! 📊 See live metrics, current projects, and get a behind-the-scenes look at how Optra operates. It's transparency meets creativity! ⚡",
      success: true
    };
  }

  // Get response from category
  if (responseCategory !== 'default' && responses[responseCategory]) {
    const categoryResponses = responses[responseCategory];
    const randomResponse = categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
    return { response: randomResponse, success: true };
  }

  // Default responses for unmatched queries
  const defaultResponses = [
    "That's an interesting question! 🤔 I'm here to help you learn about Aniketh, our design services, pricing, or connect you directly. What specific aspect of Optra Design interests you most? I'm also great at finding contact information! 😊",
    "Great question! 🌟 I can share details about our services, help you connect with Aniketh, discuss pricing, or guide you through our portfolio. I might also know about some hidden features around the site! What would you like to explore? ✨",
    "I'd love to help you with that! 🚀 I specialize in information about Optra's services, Aniketh's background, project details, or getting you connected for consultations. Is there something specific about our design approach you'd like to know? 🎨"
  ];

  return {
    response: defaultResponses[Math.floor(Math.random() * defaultResponses.length)],
    success: true
  };
};
