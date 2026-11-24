import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Loader2, 
  Lightbulb, 
  HelpCircle, 
  ShieldCheck,
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';
import { CurrentAirQuality } from '../../types/aqi';
import { FamilyProfile } from '../../types/family';
import { askSmogAI } from '../../services/geminiApi';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

interface SmogAIAssistantProps {
  aqiData: CurrentAirQuality;
  profile: FamilyProfile;
  apiKey: string;
  initialQuery?: string;
}

const PRESET_PROMPTS = [
  'DIY Corsi-Rosenthal Box Blueprint & step-by-step assembly',
  'What should our morning school run look like with a 6-year-old?',
  'Why does winter smog peak at 7 AM and 9 PM?',
  'Low-emission home heating on a tight budget',
  'Do indoor plants filter fine PM2.5 or is it a myth?'
];

export const SmogAIAssistant: React.FC<SmogAIAssistantProps> = ({
  aqiData,
  profile,
  apiKey,
  initialQuery
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-init',
      sender: 'assistant',
      text: `Hello ${profile.familyName}! I am your **SmogGuard AI Co-pilot**. 

Currently in **${aqiData.city}**, the air quality is **${aqiData.us_aqi} (${aqiData.category.level})** with PM2.5 at **${aqiData.pollutants.pm2_5} µg/m³**.

How can I help protect your household today? You can ask about:
- **DIY Corsi-Rosenthal Air Purifier** blueprints & CADR sizing
- **Safe outdoor ventilation windows** & thermal inversion physics
- **School drop-off / zero-idle commute** routines
- **Clean heating alternatives** to eliminate biomass/wood burning`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialQuery) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg: Message = {
      id: 'u_' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await askSmogAI({
        prompt: query,
        aqiData,
        profile,
        apiKey
      });

      const aiMsg: Message = {
        id: 'ai_' + Date.now(),
        sender: 'assistant',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: Message = {
        id: 'err_' + Date.now(),
        sender: 'assistant',
        text: 'Sorry, I encountered an issue processing your request. Please try again or switch to our local heuristic engine.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Helper to format basic markdown (bold, lists, headers)
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return (
      <div className="space-y-2 text-xs sm:text-sm leading-relaxed">
        {lines.map((line, idx) => {
          if (line.startsWith('### ')) {
            return (
              <h4 key={idx} className="font-extrabold text-teal-300 text-sm sm:text-base mt-2 mb-1">
                {line.replace('### ', '')}
              </h4>
            );
          }
          if (line.startsWith('#### ')) {
            return (
              <h5 key={idx} className="font-bold text-slate-200 text-xs sm:text-sm mt-1">
                {line.replace('#### ', '')}
              </h5>
            );
          }
          if (line.startsWith('- ') || line.startsWith('* ')) {
            return (
              <div key={idx} className="flex items-start space-x-2 pl-2">
                <span className="text-teal-400 font-bold">•</span>
                <span className="text-slate-300">{formatInlineBold(line.substring(2))}</span>
              </div>
            );
          }
          if (line.trim().match(/^\d+\.\s/)) {
            const num = line.trim().match(/^\d+\.\s/)?.[0];
            const rest = line.trim().replace(/^\d+\.\s/, '');
            return (
              <div key={idx} className="flex items-start space-x-2 pl-2">
                <span className="text-teal-400 font-bold font-mono">{num}</span>
                <span className="text-slate-300">{formatInlineBold(rest)}</span>
              </div>
            );
          }
          if (!line.trim()) {
            return <div key={idx} className="h-1" />;
          }
          return (
            <p key={idx} className="text-slate-300">
              {formatInlineBold(line)}
            </p>
          );
        })}
      </div>
    );
  };

  const formatInlineBold = (str: string) => {
    const parts = str.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="text-slate-100 font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-sm flex flex-col h-[700px]">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-teal-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base sm:text-lg font-bold text-slate-100">
                SmogGuard GenAI Advisor
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-purple-950 text-purple-300 border border-purple-800">
                {apiKey ? 'Gemini 2.5 Flash Lite' : 'Smart Free AI Engine'}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Context: {aqiData.city} (AQI {aqiData.us_aqi}) • {profile.members.length} Household Members
            </p>
          </div>
        </div>

        <button
          onClick={() => setMessages([messages[0]])}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors text-xs flex items-center space-x-1"
          title="Reset Conversation"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Preset Prompts Chips */}
      <div className="py-3 border-b border-slate-800/80 flex items-center space-x-2 overflow-x-auto no-scrollbar shrink-0">
        <span className="text-[11px] font-bold text-slate-400 flex items-center space-x-1 shrink-0">
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
          <span>Quick Prompts:</span>
        </span>
        {PRESET_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            disabled={isLoading}
            className="shrink-0 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-white transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 ${
              msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
              msg.sender === 'user'
                ? 'bg-teal-600 text-slate-950 font-bold'
                : 'bg-slate-800 border border-slate-700 text-teal-400'
            }`}>
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className={`relative group max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 ${
              msg.sender === 'user'
                ? 'bg-teal-600/90 text-slate-950 font-medium'
                : 'bg-slate-950 border border-slate-800 text-slate-200'
            }`}>
              {msg.sender === 'assistant' ? (
                renderFormattedText(msg.text)
              ) : (
                <p className="text-xs sm:text-sm text-slate-950 font-medium leading-relaxed">
                  {msg.text}
                </p>
              )}

              <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-800/40 text-[10px] text-slate-500">
                <span>{msg.timestamp}</span>
                {msg.sender === 'assistant' && (
                  <button
                    onClick={() => copyToClipboard(msg.id, msg.text)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-teal-300 flex items-center space-x-1"
                  >
                    {copiedId === msg.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 text-teal-400 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-center space-x-2">
              <Loader2 className="w-4 h-4 animate-spin text-teal-400" />
              <span>Analyzing diurnal inversion curve & synthesizing medical IAQ guidance...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Field */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="pt-3 border-t border-slate-800 flex items-center space-x-2 shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask SmogGuard AI (e.g. Can I exercise at 2 PM today? How to seal old windows?)..."
          disabled={isLoading}
          className="flex-1 px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="p-3 rounded-2xl bg-teal-600 hover:bg-teal-500 disabled:opacity-50 disabled:hover:bg-teal-600 text-slate-950 font-bold transition-all shadow-md shadow-teal-500/20"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
