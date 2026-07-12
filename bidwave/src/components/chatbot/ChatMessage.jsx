export default function ChatMessage({ message }) {
  const isBot = message.role === "bot";
  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed
        ${
          isBot
            ? "bg-[#4B0082]/8 dark:bg-[#9D4EDD]/10 text-[#1A1A1A] dark:text-[#E0E0E0] rounded-tl-sm"
            : "bg-[#4B0082] dark:bg-[#9D4EDD] text-white rounded-tr-sm"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}
