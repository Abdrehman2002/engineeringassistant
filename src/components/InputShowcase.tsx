import { useState, useEffect, useRef } from 'react';
import { EngineeringInput } from './EngineeringInput';

const WEBHOOK_URL = 'https://syvairorpa.app.n8n.cloud/webhook/98faca23-7517-457a-ac1b-ff083485143c/chat';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function InputShowcase() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: message,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Send to n8n webhook
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatInput: message,
          sessionId: localStorage.getItem('sessionId') || crypto.randomUUID(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();

      // Save session ID
      if (data.sessionId) {
        localStorage.setItem('sessionId', data.sessionId);
      }

      // Add assistant response
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.output || data.response || 'Sorry, I could not process your request.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, there was an error processing your request. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30 relative">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] pointer-events-none"></div>
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-gradient-to-br from-violet-200/40 to-fuchsia-200/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-gradient-to-tr from-blue-200/40 to-cyan-200/40 rounded-full blur-3xl"></div>

      {/* Scrollable Content Container */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto relative z-10">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 py-6 sm:py-8 min-h-full flex flex-col">
          {/* Title Section */}
          <div className={`text-center space-y-6 flex-shrink-0 ${messages.length > 0 ? 'mb-8' : 'mb-10'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-fuchsia-500/10 border border-violet-200/50 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 animate-pulse"></div>
              <span className="text-sm font-medium bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                AI-Powered API 650
              </span>
            </div>

            <h1 className={`font-bold tracking-tight transition-all duration-300 ${messages.length > 0 ? 'text-3xl sm:text-4xl' : 'text-5xl sm:text-6xl lg:text-7xl'}`}>
              <span className="bg-gradient-to-r from-slate-900 via-violet-800 to-slate-900 bg-clip-text text-transparent leading-tight block">
                API 650
              </span>
            </h1>

            {messages.length === 0 && (
              <p className="text-slate-600 text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
                Get instant answers on API 650 standards, tank design, material selection,
                <span className="text-violet-600 font-medium"> seismic analysis</span>, and specifications
              </p>
            )}
          </div>

          {/* Messages Area */}
          {messages.length > 0 && (
            <div className="space-y-6 mb-8">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center mr-3 flex-shrink-0 shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  )}
                  <div
                    className={`max-w-2xl rounded-3xl px-6 py-4 shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 text-white shadow-violet-500/25'
                        : 'bg-white/90 backdrop-blur-xl border border-slate-200/60 text-slate-800 shadow-slate-200/50'
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed text-[15px]">{msg.content}</p>
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center ml-3 flex-shrink-0 shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center mr-3 flex-shrink-0 shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="max-w-2xl rounded-3xl px-6 py-4 bg-white/90 backdrop-blur-xl border border-slate-200/60 shadow-sm shadow-slate-200/50">
                    <div className="flex space-x-1.5">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Feature Cards - Only show when no messages */}
          {messages.length === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 mb-8">
              <div className="group bg-white/70 border border-slate-200/60 rounded-2xl p-8 backdrop-blur-xl hover:border-violet-300/70 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-500 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-violet-500/25">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-slate-900 font-bold text-lg mb-2 group-hover:text-violet-600 transition-colors">Instant Answers</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Get API 650 insights powered by advanced AI in real-time</p>
              </div>

              <div className="group bg-white/70 border border-slate-200/60 rounded-2xl p-8 backdrop-blur-xl hover:border-fuchsia-300/70 hover:shadow-xl hover:shadow-fuchsia-500/10 transition-all duration-500 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-pink-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-fuchsia-500/25">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-slate-900 font-bold text-lg mb-2 group-hover:text-fuchsia-600 transition-colors">Accurate Calculations</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Precise tank design calculations and structural analysis</p>
              </div>

              <div className="group bg-white/70 border border-slate-200/60 rounded-2xl p-8 backdrop-blur-xl hover:border-blue-300/70 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/25">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-slate-900 font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">Expert Knowledge</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Access comprehensive API 650 knowledge and standards</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Input at Bottom - ChatGPT Style */}
      <div className="flex-shrink-0 border-t border-slate-200/60 bg-white/80 backdrop-blur-xl relative z-20">
        <div className="max-w-5xl mx-auto">
          <EngineeringInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}
