import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, Briefcase, Code, Layers } from 'lucide-react';
import { SITE_CONTENT, SKILLS_DATA, EXPERIENCE_DATA, PROJECTS_DATA } from '../constants';

// --- CONFIGURATION ---
// Get API Key from environment variables (Vite)
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || '';
const COOLDOWN_DURATION = 5; // Seconds

const MODELS = [
    "google/gemini-2.0-flash-exp:free",
    "google/gemini-2.0-flash-thinking-exp:free",
    "meta-llama/llama-3.2-3b-instruct:free",
    "microsoft/phi-3-medium-128k-instruct:free"
];

// Prepare minified data for AI context to save tokens
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

// Topic Definitions
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
    reasoning_details?: any; // To preserve reasoning for OpenRouter/DeepSeek models
}

const ChatBot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTopic, setActiveTopic] = useState<Topic>('general');
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Greetings! I'm Nikko's AI Assistant. Select a topic below or ask me anything!" }
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
            setMessages(prev => [...prev, { role: 'assistant', content: "⚠️ API Key is missing. Please add VITE_OPENROUTER_API_KEY to your .env.local file." }]);
            return;
        }

        const userMessage: Message = { role: 'user', content: messageText };
        setInput('');

        // Add user message to UI immediately
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
            // Prepare messages for API with dynamic system prompt
            const systemMessage = { role: 'system', content: getSystemPrompt(currentTopic) };
            const apiMessages = [systemMessage, ...messages, userMessage].map(m => ({
                role: m.role,
                content: m.content,
                reasoning_details: m.reasoning_details
            }));

            let lastError: any = null;

            // Try models in sequence
            for (const model of MODELS) {
                try {
                    console.log(`Attempting with model: ${model}`);
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
                    console.log(`Response from ${model}:`, data);

                    if (data.error) {
                        // If rate limited or server error, throw to try next model
                        if (data.error.code === 429 || data.error.code >= 500) {
                            throw new Error(data.error.message || `Error with ${model}`);
                        }
                        // For other errors (e.g. auth), stop trying
                        throw new Error(data.error.message);
                    }

                    const choice = data.choices[0].message;
                    const assistantMessage: Message = {
                        role: 'assistant',
                        content: choice.content || "",
                        reasoning_details: choice.reasoning_details
                    };

                    setMessages(prev => [...prev, assistantMessage]);
                    return; // Success! Exit function

                } catch (error: any) {
                    console.warn(`Failed with ${model}:`, error);
                    lastError = error;
                    // Continue to next model
                }
            }

            // If we get here, all models failed
            throw lastError || new Error("All models failed to respond.");

        } catch (error: any) {
            console.error('Chat Error:', error);
            setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${error.message || "Could not connect to AI server. Please try again later."}` }]);
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

    // Filter messages for display (hide system prompt)
    const displayMessages = messages.filter(m => m.role !== 'system');

    const handleTopicSelect = (topic: Topic) => {
        if (topic === activeTopic) return;
        setActiveTopic(topic);

        // Find the prompt for this topic
        const topicDef = TOPICS.find(t => t.id === topic);
        if (topicDef) {
            handleSend(topicDef.prompt, topic);
        }
    };

    return (
        <>
            {/* Toggle Button - MOVED TO LEFT */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-8 left-8 z-50 p-4 rounded-full bg-neon-blue text-slate-900 shadow-[0_0_20px_rgba(0,243,255,0.5)] hover:scale-110 transition-transform duration-300 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
            >
                <MessageSquare size={24} fill="currentColor" />
            </button>

            {/* Chat Window - MOVED TO LEFT */}
            <div className={`fixed bottom-8 left-8 z-50 w-80 md:w-96 h-[500px] flex flex-col glass-panel border border-neon-blue/30 rounded-2xl shadow-2xl transition-all duration-300 origin-bottom-left ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10 pointer-events-none'}`}>

                {/* Header */}
                <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-900/50 rounded-t-2xl">
                    <div className="flex items-center gap-2">
                        <Bot size={20} className="text-neon-blue" />
                        <h3 className="font-orbitron font-bold text-white">NIKS <span className="text-neon-blue"> AI ASSISTANT</span></h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                    {displayMessages.map((msg, idx) => (
                        <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-neon-purple/20 text-neon-purple' : 'bg-neon-blue/20 text-neon-blue'}`}>
                                {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                            </div>
                            <div className={`p-3 rounded-lg text-sm max-w-[80%] ${msg.role === 'user' ? 'bg-neon-purple/10 border border-neon-purple/30 text-slate-200' : 'bg-slate-800 border border-slate-700 text-slate-300'}`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-neon-blue/20 text-neon-blue flex items-center justify-center flex-shrink-0">
                                <Bot size={14} />
                            </div>
                            <div className="p-3 rounded-lg bg-slate-800 border border-slate-700">
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-neon-blue rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                                    <div className="w-2 h-2 bg-neon-blue rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    <div className="w-2 h-2 bg-neon-blue rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Topic Chips */}
                <div className="px-4 py-2 bg-slate-900/30 border-slate-700 overflow-x-auto whitespace-nowrap scrollbar-hide">
                    <div className="flex gap-2 justify-center">
                        {TOPICS.map((topic) => (
                            <button
                                key={topic.id}
                                onClick={() => handleTopicSelect(topic.id)}
                                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs transition-all ${activeTopic === topic.id
                                    ? 'bg-neon-blue text-slate-900 font-bold shadow-[0_0_10px_rgba(0,243,255,0.3)]'
                                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700'
                                    }`}
                            >
                                <topic.icon size={12} />
                                {topic.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Input */}
                <div className="p-4 border-t border-slate-700 bg-slate-900/50 rounded-b-2xl">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Ask about Nikko..."
                            className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:border-neon-blue outline-none transition-colors"
                        />
                        <button
                            onClick={() => handleSend()}
                            disabled={isLoading || !input.trim() || cooldown > 0}
                            className="p-2 bg-neon-blue/10 text-neon-blue border border-neon-blue/30 rounded-lg hover:bg-neon-blue hover:text-slate-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[40px]"
                        >
                            {cooldown > 0 ? (
                                <span className="text-xs font-bold">{cooldown}</span>
                            ) : (
                                <Send size={18} />
                            )}
                        </button>
                    </div>
                </div>

            </div>
        </>
    );
};

export default ChatBot;
