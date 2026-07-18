import React, { useState, useRef, useEffect } from "react";
import { X, Send, Bot, Loader2 } from "lucide-react";

// 🔑 Set VITE_GROQ_API_KEY in your .env file (or in Vercel → Environment Variables)
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || "YOUR_API_KEY_HERE";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT = `You are Hamza Akhtar's personal AI assistant, embedded on his portfolio website.

ABOUT HAMZA:
Hamza Akhtar is an AI Automation Expert, Creative Developer, and Full-Stack Web Engineer. He builds intelligent systems that automate workflows, crafts performant web experiences with React/TypeScript, and blends animation, 3D, and AI into immersive digital products.

FEATURED PROJECTS:
- AI-Powered World Generation Engine — Python procedural world generation using Random Forest, Decision Tree and KNN for intelligent terrain, with pseudo-3D rendering (github.com/Hamza1106/AI-Map-Generator).
- Royal Dastarkhuwan — a premium restaurant web experience with cinematic UI and booking flows.
- Jamaica Tour Management System — a full-stack taxi/tour booking platform with an admin dashboard, driver management, and analytics.
- HerCare AI — a bilingual (English/Roman Urdu) women's health platform with an AI symptom checker chatbot.
- Wear-IT Store — a full e-commerce storefront.
- Pizza House 3D — an interactive 3D web experience.

HIRE / WORK WITH HAMZA:
- Fiverr: https://www.fiverr.com/orbit_flow — visitors can hire Hamza there for web development, automation, and AI integration gigs.
- GitHub: https://github.com/Hamza1106
- LinkedIn: https://linkedin.com/in/hamza-akhtar-8ab424415/
- Email: hamzaqureshi0128@gmail.com

Keep responses concise, friendly, and helpful. When someone asks about hiring Hamza, freelance work, or pricing, point them to his Fiverr profile above. When asked about his work, mention relevant projects from the list. When asked to contact him, share the email, GitHub, and LinkedIn above.`;

const StreamlitWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm Hamza's AI assistant 👋 Ask me anything about his skills, projects, or how to hire him!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  // Shift the widget up whenever the footer's "Back to top" button scrolls
  // into view, so the two never overlap in the bottom-right corner.
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setNearFooter(entry.isIntersecting),
      { rootMargin: "0px 0px -40px 0px", threshold: 0 },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            max_tokens: 500,
            messages: [
              {
                role: "system",
                content: SYSTEM_PROMPT,
              },
              ...updatedMessages,
            ],
          }),
        }
      );

      const data = await response.json();

      const reply =
        data?.choices?.[0]?.message?.content ||
        "Sorry, I couldn't respond right now.";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: reply,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Please try again!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: nearFooter ? "110px" : "30px",
        right: "30px",
        zIndex: 1000,
        fontFamily: "inherit",
        transition: "bottom 0.3s ease",
      }}
    >
      {/* Toggle Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            color: "#fff",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "50px",
            padding: "12px 28px",
            fontSize: "14px",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "pointer",
            backdropFilter: "blur(12px)",
            transition: "all 0.3s",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(139,92,246,0.5)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 25px rgba(139,92,246,0.25)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.03)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.2)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
          }}
        >
          <span style={{ fontSize: "18px" }}>🤖</span>
          <span>Hamza's AI Agent</span>
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div
          style={{
            width: "370px",
            height: "560px",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(139,92,246,0.15)",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(10, 10, 15, 0.97)",
            backdropFilter: "blur(20px)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Bot size={16} color="#fff" />
              </div>
              <div>
                <div style={{ color: "#fff", fontSize: "14px", fontWeight: "600" }}>
                  Hamza's AI Assistant
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#22c55e",
                    }}
                  />
                  <span style={{ color: "#22c55e", fontSize: "11px" }}>Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#888",
                cursor: "pointer",
                padding: "6px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.15)";
                (e.currentTarget as HTMLButtonElement).style.color = "#ef4444";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(239,68,68,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
                (e.currentTarget as HTMLButtonElement).style.color = "#888";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)";
              }}
            >
              <X size={15} />
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              scrollbarWidth: "none",
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "82%",
                    padding: "10px 14px",
                    borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    background:
                      msg.role === "user"
                        ? "linear-gradient(135deg, #8b5cf6, #7c3aed)"
                        : "rgba(255,255,255,0.05)",
                    border:
                      msg.role === "user"
                        ? "none"
                        : "1px solid rgba(255,255,255,0.07)",
                    color: "#e5e7eb",
                    fontSize: "13px",
                    lineHeight: "1.6",
                    boxShadow:
                      msg.role === "user"
                        ? "0 4px 15px rgba(139,92,246,0.3)"
                        : "none",
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    padding: "10px 16px",
                    borderRadius: "16px 16px 16px 4px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#888",
                    fontSize: "13px",
                  }}
                >
                  <Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} />
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: "12px 16px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              gap: "8px",
              background: "rgba(255,255,255,0.01)",
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              disabled={loading}
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                padding: "10px 14px",
                color: "#e5e7eb",
                fontSize: "13px",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(139,92,246,0.5)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.1)";
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{
                background: input.trim() && !loading
                  ? "linear-gradient(135deg, #8b5cf6, #7c3aed)"
                  : "rgba(255,255,255,0.05)",
                border: "none",
                borderRadius: "12px",
                padding: "10px 14px",
                cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
                opacity: input.trim() && !loading ? 1 : 0.4,
              }}
            >
              <Send size={15} color="#fff" />
            </button>
          </div>
        </div>
      )}

      {/* CSS for spinner */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default StreamlitWidget;