import React, { useState, useEffect, useRef } from 'react';
import Vapi from '@vapi-ai/web';

interface VapiWidgetProps {
  apiKey: "4ebe96c0-9d5d-4fdc-a126-933084c4643a";
  assistantId: "a73322f1-0caa-41b4-a376-0a9b8d1ee7ff";
}

const VapiWidget: React.FC<VapiWidgetProps> = ({ apiKey, assistantId }) => {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<Array<{ role: string; text: string }>>([]);
  
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const vapiInstance = new Vapi(apiKey);
    setVapi(vapiInstance);

    vapiInstance.on('call-start', () => {
      console.log('Call started');
      setIsConnected(true);
    });

    vapiInstance.on('call-end', () => {
      console.log('Call ended');
      setIsConnected(false);
      setIsSpeaking(false);
      setTranscript([]); // Reset transcript on end
    });

    vapiInstance.on('speech-start', () => {
      setIsSpeaking(true);
    });

    vapiInstance.on('speech-end', () => {
      setIsSpeaking(false);
    });

    vapiInstance.on('message', (message: any) => {
      if (message.type === 'transcript' && message.transcriptType === 'final') {
        setTranscript((prev) => [
          ...prev,
          { role: message.role, text: message.transcript },
        ]);
      }
    });

    vapiInstance.on('error', (error) => {
      console.error('Vapi error:', error);
    });

    return () => {
      vapiInstance?.stop();
    };
  }, [apiKey]);

  // Auto scroll effect
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcript]);

  const startCall = () => vapi?.start(assistantId);
  const endCall = () => vapi?.stop();

  return (
    <div style={{
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      zIndex: 1000,
      fontFamily: 'inherit'
    }}>
      {!isConnected ? (
        <button
          onClick={startCall}
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '50px',
            padding: '12px 28px',
            fontSize: '14px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            letterSpacing: '0.5px'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
          }}
        >
          <span style={{ fontSize: '18px' }}>🎙️</span>
          <span>Talk to Assistant</span>
          <span style={{ fontSize: '10px', opacity: 0.5, marginLeft: '4px' }}>▼</span>
        </button>
      ) : (
        <div style={{
          background: 'rgba(10, 15, 28, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '24px',
          width: '340px',
          boxShadow: '0 15px 50px rgba(0, 0, 0, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#fff',
          animation: 'slideUp 0.4s ease-out'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: isSpeaking ? '#00f2fe' : '#6366f1',
                boxShadow: isSpeaking ? '0 0 15px #00f2fe' : 'none',
                animation: isSpeaking ? 'pulse 1.5s infinite' : 'none'
              }}></div>
              <span style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '1px', opacity: 0.8 }}>
                {isSpeaking ? 'ASSISTANT SPEAKING' : 'LISTENING...'}
              </span>
            </div>
            <button
              onClick={endCall}
              style={{
                background: 'rgba(255, 68, 68, 0.15)',
                color: '#ff4d4d',
                border: '1px solid rgba(255, 68, 68, 0.3)',
                borderRadius: '10px',
                padding: '5px 14px',
                fontSize: '11px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: '0.3s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 68, 68, 0.25)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 68, 68, 0.15)'}
            >
              EXIT
            </button>
          </div>
          
          <div 
            ref={scrollRef}
            style={{
              maxHeight: '220px',
              overflowY: 'auto',
              paddingRight: '8px',
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.9)',
              lineHeight: '1.6'
            }}
            className="custom-scroll"
          >
            {transcript.length === 0 ? (
              <div style={{ textAlign: 'center', marginTop: '20px', opacity: 0.3 }}>
                <p>How can I help you today?</p>
              </div>
            ) : (
              transcript.map((msg, i) => (
                <div key={i} style={{ 
                  marginBottom: '12px', 
                  textAlign: msg.role === 'user' ? 'right' : 'left' 
                }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '10px 14px',
                    borderRadius: msg.role === 'user' ? '15px 15px 2px 15px' : '15px 15px 15px 2px',
                    background: msg.role === 'user' ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.07)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    maxWidth: '85%'
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.6; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .custom-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default VapiWidget;

// Usage in your app:
// <VapiWidget 
//   apiKey="your_public_api_key" 
//   assistantId="your_assistant_id" 
// />
