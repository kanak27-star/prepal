import { Bot, User } from "lucide-react";

export default function ChatMessage({ role, text }) {
  const isAI = role === "assistant";

  return (
    <div
      className={`flex gap-4 mb-6 ${
        isAI ? "justify-start" : "justify-end"
      }`}
    >
      {isAI && (
        <div className="w-11 h-11 rounded-full bg-cyan-600 flex items-center justify-center">
          <Bot size={22} className="text-white" />
        </div>
      )}

      <div
        className={`max-w-3xl rounded-2xl px-5 py-4 ${
          isAI
            ? "bg-slate-900 border border-slate-800"
            : "bg-cyan-600 text-white"
        }`}
      >
        <div className="font-semibold mb-2">
          {isAI ? "PrepPal AI" : "You"}
        </div>

        <div className="leading-8 whitespace-pre-wrap">
          {text}
        </div>
      </div>

      {!isAI && (
        <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center">
          <User size={22} className="text-slate-800" />
        </div>
      )}
    </div>
  );
}