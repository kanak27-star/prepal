import { Send } from "lucide-react";

export default function AnswerBox({
  answer,
  setAnswer,
  loading,
  onSubmit,
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mt-8">

      <textarea
        rows={8}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your answer here..."
        className="w-full bg-transparent outline-none resize-none text-white text-lg"
      />

      <div className="flex justify-end mt-5">

        <button
          onClick={onSubmit}
          disabled={loading}
          className="bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-700 px-6 py-3 rounded-xl flex items-center gap-2 transition"
        >
          <Send size={18} />

          {loading ? "Evaluating..." : "Submit Answer"}
        </button>

      </div>

    </div>
  );
}