export default function TypingBubble() {
  return (
    <div className="flex gap-4 mb-6">

      <div className="w-11 h-11 rounded-full bg-cyan-600 flex items-center justify-center">
        🤖
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4">
        <div className="flex gap-2">

          <div className="w-2 h-2 rounded-full bg-white animate-bounce" />

          <div
            className="w-2 h-2 rounded-full bg-white animate-bounce"
            style={{ animationDelay: ".15s" }}
          />

          <div
            className="w-2 h-2 rounded-full bg-white animate-bounce"
            style={{ animationDelay: ".3s" }}
          />

        </div>
      </div>

    </div>
  );
}