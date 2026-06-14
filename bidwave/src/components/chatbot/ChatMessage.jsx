export default function ChatMessage({ message }) {
  const isBot = message.role === "bot";

  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed
        ${
          isBot
            ? "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-sm"
            : "bg-orange-500 text-white rounded-tr-sm"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}
