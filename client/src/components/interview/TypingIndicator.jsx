export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-3 mt-4">

      <div className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center">
        🤖
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl px-5 py-4 flex gap-2">

        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>

        <span
          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
          style={{ animationDelay: "0.15s" }}
        ></span>

        <span
          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
          style={{ animationDelay: "0.3s" }}
        ></span>

      </div>

    </div>
  );
}