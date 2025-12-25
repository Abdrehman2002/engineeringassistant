import { useEffect, useState } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';
import './App.css';
import { InputShowcase } from './components/InputShowcase';

export const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDemo, setShowDemo] = useState(true);

  useEffect(() => {
    // Initialize fullscreen chat - ChatGPT style
    createChat({
      // n8n Webhook URL
      webhookUrl: 'https://syvairorpa.app.n8n.cloud/webhook/98faca23-7517-457a-ac1b-ff083485143c/chat',

      // Fullscreen Mode - ChatGPT Style
      mode: 'fullscreen',

      // Target Container
      target: '#n8n-chat',

      // Session Management
      chatSessionKey: 'sessionId',
      loadPreviousSession: true,

      // Input Configuration
      chatInputKey: 'chatInput',

      // Language
      defaultLanguage: 'en',

      // Welcome Screen
      showWelcomeScreen: false,

      // Initial Messages
      initialMessages: [
        'Hello! I\'m your API 650 Assistant.',
        'I can help you with API 650 standards, tank design, material selection, seismic analysis, and specifications.',
        'What would you like to know?'
      ],

      // Internationalization
      i18n: {
        en: {
          title: 'API 650',
          subtitle: 'AI-powered API 650 expertise',
          footer: '',
          getStarted: 'Start new conversation',
          inputPlaceholder: 'Ask anything...',
          closeButtonTooltip: 'Close chat',
        }
      },

      // Optional: File uploads
      // allowFileUploads: true,
      // allowedFilesMimeTypes: 'image/*,application/pdf,.dwg,.dxf,.xlsx,.csv',

      // Additional metadata
      metadata: {
        interface: 'chatgpt-style-react',
        version: '2.0.0'
      }
    });

    console.log('🏗️ Rack Engineering Assistant - ChatGPT Style UI loaded');
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const startNewChat = () => {
    localStorage.removeItem('sessionId');
    window.location.reload();
  };

  if (showDemo) {
    return <InputShowcase />;
  }

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <button className="new-chat-btn" onClick={startNewChat}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            New conversation
          </button>
        </div>

        <div className="sidebar-content">
          <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Previous conversations will appear here
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="brand-info">
            <div className="brand-logo">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" fill="currentColor"/>
              </svg>
            </div>
            <div className="brand-text">
              <h3>API 650</h3>
              <p>Powered by AI</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="main-content">
        {/* Top Navigation */}
        <nav className="top-nav">
          <button className="menu-toggle" onClick={toggleSidebar}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <div className="nav-title">
            <span className="gradient-text">API 650</span>
          </div>
          <div style={{ width: '40px' }}></div>
        </nav>

        {/* Chat Container */}
        <div id="n8n-chat"></div>
      </main>
    </div>
  );
};

export default App;
