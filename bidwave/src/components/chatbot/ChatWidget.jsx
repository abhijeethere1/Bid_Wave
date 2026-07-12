import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import ChatMessage from "./ChatMessage";
import api from "../../utils/api";

const INITIAL_MESSAGE = {
  id: 1,
  role: "bot",
  text: "Hi! 👋 I'm BidWave's support assistant. Ask me anything about bidding, selling, payments, or delivery!",
};

const QUICK_QUESTIONS = [
  "How do I place a bid?",
  "How does payment work?",
  "How is delivery handled?",
  "Is BidWave safe?",
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    const userMsg = text || input.trim();
    if (!userMsg) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), role: "user", text: userMsg },
    ]);
    setInput("");
    setLoading(true);
    try {
      const res = await api.post("/chat", { message: userMsg });
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "bot", text: res.data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "bot",
          text: "Sorry, something went wrong. Please try again.",
        },
      ]);
    }
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat Window */}
      {isOpen && (
        <div
          className="w-80 bg-white dark:bg-[#1E1E1E] border border-[#4B0082]/10 dark:border-[#9D4EDD]/15 rounded-2xl shadow-[0_24px_64px_rgba(75,0,130,0.20)] overflow-hidden flex flex-col"
          style={{ height: "460px" }}
        >
          {/* Header */}
          <div className="bg-[#4B0082] dark:bg-[#9D4EDD] px-4 py-3.5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot size={16} className="text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">BidWave Support</p>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
                  <p className="text-white/70 text-[11px]">Always online</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#4B0082]/8 dark:bg-[#9D4EDD]/10 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 bg-[#4B0082] dark:bg-[#9D4EDD] rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="px-4 pb-3 flex flex-wrap gap-1.5 shrink-0">
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-[11px] font-medium px-2.5 py-1.5 bg-[#4B0082]/8 dark:bg-[#9D4EDD]/10 text-[#4B0082] dark:text-[#9D4EDD] rounded-lg hover:bg-[#4B0082]/15 dark:hover:bg-[#9D4EDD]/20 transition-colors border border-[#4B0082]/10 dark:border-[#9D4EDD]/15"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-3 pb-3 shrink-0">
            <div className="flex items-center gap-2 bg-[#FAF9F6] dark:bg-[#121212] border border-[#4B0082]/10 dark:border-[#9D4EDD]/15 rounded-xl px-3 py-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Type a message..."
                className="flex-1 text-sm bg-transparent text-[#1A1A1A] dark:text-[#E0E0E0] placeholder-[#737373] dark:placeholder-[#A0A0A0] focus:outline-none"
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className="p-1.5 bg-[#D4AF37] dark:bg-[#FFD700] hover:brightness-110 disabled:opacity-40 text-[#1A1A1A] rounded-lg transition-all"
              >
                <Send size={13} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button with Tooltip */}
      <div className="relative group/chat">
        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute bottom-full right-0 mb-3 whitespace-nowrap">
            <div className="bg-[#1A1A1A] dark:bg-[#E0E0E0] text-white dark:text-[#1A1A1A] text-xs font-semibold px-3 py-2 rounded-xl shadow-lg opacity-0 group-hover/chat:opacity-100 transition-all duration-200 translate-y-1 group-hover/chat:translate-y-0">
              Need help? 👋
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#1A1A1A] dark:border-t-[#E0E0E0]" />
            </div>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 bg-[#4B0082] dark:bg-[#9D4EDD] hover:brightness-110 text-white rounded-full shadow-[0_8px_32px_rgba(75,0,130,0.35)] dark:shadow-[0_8px_32px_rgba(157,78,221,0.35)] transition-all hover:scale-105 flex items-center justify-center"
        >
          {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
          {!isOpen && (
            <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#D4AF37] dark:bg-[#FFD700] border-2 border-white dark:border-[#121212] rounded-full" />
          )}
        </button>
      </div>
    </div>
  );
}
