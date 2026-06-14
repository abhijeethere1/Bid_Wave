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

  // Auto scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    const userMsg = text || input.trim();
    if (!userMsg) return;

    // Add user message
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
        {
          id: Date.now() + 1,
          role: "bot",
          text: res.data.reply,
        },
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
          className="w-80 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          style={{ height: "460px" }}
        >
          {/* Header */}
          <div className="bg-orange-500 px-4 py-3.5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot size={16} className="text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">BidWave Support</p>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-green-300 rounded-full" />
                  <p className="text-orange-100 text-[11px]">Always online</p>
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

            {/* Loading dots */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
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
                  className="text-[11px] font-medium px-2.5 py-1.5 bg-orange-50 dark:bg-orange-500/10 text-orange-500 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-500/20 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-3 pb-3 shrink-0">
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Type a message..."
                className="flex-1 text-sm bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className="p-1.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white rounded-lg transition-all"
              >
                <Send size={13} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all hover:scale-105 flex items-center justify-center"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
        {/* Unread dot */}
        {!isOpen && (
          <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full" />
        )}
      </button>
    </div>
  );
}
