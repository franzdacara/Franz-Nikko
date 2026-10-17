import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Briefcase, Code, Layers, Sparkles } from 'lucide-react';
import { SITE_CONTENT, SKILLS_DATA, EXPERIENCE_DATA, PROJECTS_DATA } from '../constants';

// --- CONFIGURATION ---
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || '';
const COOLDOWN_DURATION = 5;

const MODELS = [
  "google/gemini-2.0-flash-exp:free",
  "google/gemini-2.0-flash-thinking-exp:free",
  "meta-llama/llama-3.2-3b-instruct:free"
];

const MINIFIED_CONTENT = {
  about: SITE_CONTENT.about.description,
  contact: {
    email: SITE_CONTENT.contact.email,
    socials: SITE_CONTENT.contact.socialLinks.map(s => ({ platform: s.platform, url: s.url }))
  },
  skills: SKILLS_DATA.map(s => ({ category: s.title, items: s.skills })),
  experience: EXPERIENCE_DATA.map(e => ({
    role: e.role,
    company: e.company,
    period: e.period,
    desc: e.description,
    tech: e.technologies
  })),
  projects: PROJECTS_DATA.map(p => ({
    title: p.title,
    desc: p.description,
    tech: p.tags,
    link: p.link
  }))
};

type Topic = 'general' | 'skills' | 'experience' | 'projects';

const TOPICS: { id: Topic; label: string; icon: any; prompt: string }[] = [
  { id: 'general', label: 'General', icon: User, prompt: "Tell me about yourself." },
  { id: 'skills', label: 'Skills', icon: Sparkles, prompt: "What are your technical skills?" },
  { id: 'experience', label: 'Experience', icon: Briefcase, prompt: "Tell me about your work experience." },
  { id: 'projects', label: 'Projects', icon: Layers, prompt: "Show me your projects." },
];

const getSystemPrompt = (topic: Topic) => {
  let contextData = {};

  switch (topic) {
    case 'skills':
      contextData = { skills: MINIFIED_CONTENT.skills };
      break;
    case 'experience':
      contextData = { experience: MINIFIED_CONTENT.experience };
      break;
    case 'projects':
      contextData = { projects: MINIFIED_CONTENT.projects };
      break;
    case 'general':
    default:
      contextData = { about: MINIFIED_CONTENT.about, contact: MINIFIED_CONTENT.contact };
      break;
  }

  return `
You are a helpful AI assistant for Nikko's portfolio website. 
Your goal is to answer visitor questions about Nikko based strictly on the provided data.
The user is currently asking about: ${topic.toUpperCase()}.
Keep your answers extremely concise and direct. Avoid unnecessary pleasantries. Aim for 1-2 sentences.
If you don't know the answer based on the data, say so politely.

DATA:
${JSON.stringify(contextData, null, 2)}
`;
};

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  reasoning_details?: any;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTopic, setActiveTopic] = useState<Topic>('general');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Ask me about Nikko's work, skills, or experience." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleSend = async (text?: string, topic?: Topic) => {
    const messageText = text || input;
    const currentTopic = topic || activeTopic;

    if (!messageText.trim() || cooldown > 0) return;
    if (!API_KEY) {
      setMessages(prev => [...prev, { role: 'assistant', content: "API key not configured. Set VITE_OPENROUTER_API_KEY in .env.local." }]);
      return;
    }

    const userMessage: Message = { role: 'user', content: messageText };
    setInput('');
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const systemMessage = { role: 'system', content: getSystemPrompt(currentTopic) };
      const apiMessages = [systemMessage, ...messages, userMessage].map(m => ({
        role: m.role,
        content: m.content,
        reasoning_details: m.reasoning_details
      }));

      let lastError: any = null;

      for (const model of MODELS) {
        try {
          const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${API_KEY}`,
              "HTTP-Referer": window.location.href,
              "X-Title": "Nikko Portfolio",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              model: model,
              messages: apiMessages,
              reasoning: { enabled: true }
            })
          });

          const data = await response.json();

          if (data.error) {
            if (data.error.code === 429 || data.error.code >= 500) {
              throw new Error(data.error.message || `Error with ${model}`);
            }
            throw new Error(data.error.message);
          }

          const choice = data.choices[0].message;
          const assistantMessage: Message = {
            role: 'assistant',
            content: choice.content || "",
            reasoning_details: choice.reasoning_details
          };

          setMessages(prev => [...prev, assistantMessage]);
          return;

        } catch (error: any) {
          lastError = error;
        }
      }

      throw lastError || new Error("All models failed to respond.");

    } catch (error: any) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${error.message || "Connection failed."}` }]);
    } finally {
      setIsLoading(false);
      setCooldown(COOLDOWN_DURATION);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const displayMessages = messages.filter(m => m.role !== 'system');

  const handleTopicSelect = (topic: Topic) => {
    if (topic === activeTopic) return;
    setActiveTopic(topic);
    const topicDef = TOPICS.find(t => t.id === topic);
    if (topicDef) {
      handleSend(topicDef.prompt, topic);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 left-6 z-50 w-10 h-10 flex items-center justify-center border border-border bg-surface-raised text-accent hover:bg-accent hover:text-surface transition-all duration-150 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="Open chat assistant"
      >
        <MessageSquare size={16} />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-6 left-6 z-50 w-80 md:w-96 h-[480px] flex flex-col bg-surface border border-border transition-all duration-200 origin-bottom-left ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4 pointer-events-none'}`}>

        {/* Header */}
        <div className="px-4 py-3 border-b border-border flex justify-between items-center bg-surface-raised">
          <div className="flex items-center gap-2">
            <Bot size={14} className="text-accent" />
            <span className="font-mono text-xs font-bold text-text-primary tracking-wide">AI ASSISTANT</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-text-muted hover:text-text-primary transition-colors"
            aria-label="Close chat"
          >
            <X size={16} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {displayMessages.map((msg, idx) => (
            <div key={idx} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-6 h-6 flex items-center justify-center flex-shrink-0 border ${msg.role === 'user' ? 'border-border text-text-muted' : 'border-accent/30 text-accent'}`}>
                {msg.role === 'user' ? <User size={11} /> : <Bot size={11} />}
              </div>
              <div className={`px-3 py-2 text-xs max-w-[80%] leading-relaxed ${msg.role === 'user'
                  ? 'bg-surface-overlay border border-border text-text-primary'
                  : 'border border-border text-text-secondary'
                }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-2.5">
              <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 border border-accent/30 text-accent">
                <Bot size={11} />
              </div>
              <div className="px-3 py-2 border border-border">
                <span className="font-mono text-xs text-text-muted animate-pulse">···</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Topic Chips */}
        <div className="px-3 py-2 border-t border-border overflow-x-auto">
          <div className="flex gap-1.5">
            {TOPICS.map((topic) => (
              <button
                key={topic.id}
                onClick={() => handleTopicSelect(topic.id)}
                className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono tracking-wide transition-all duration-150 whitespace-nowrap ${activeTopic === topic.id
                    ? 'bg-accent text-surface font-bold'
                    : 'text-text-muted border border-border hover:text-text-primary hover:border-border-hover'
                  }`}
              >
                <topic.icon size={10} />
                {topic.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-3 border-t border-border bg-surface-raised">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about Nikko..."
              className="flex-1 bg-surface border border-border px-3 py-2 text-xs text-text-primary font-mono placeholder:text-text-muted focus:border-accent outline-none transition-colors"
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim() || cooldown > 0}
              className="w-8 h-8 flex items-center justify-center border border-border text-text-muted hover:text-accent hover:border-accent transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {cooldown > 0 ? (
                <span className="text-[10px] font-mono font-bold">{cooldown}</span>
              ) : (
                <Send size={13} />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
