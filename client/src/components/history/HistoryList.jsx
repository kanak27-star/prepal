import { CalendarDays, Trophy, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HistoryCard({ interview }) {
  const navigate = useNavigate();

  const {
    _id,
    averageScore = 0,
    questions = [],
    createdAt,
  } = interview;

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Unknown";

  const badgeColor = () => {
    if (averageScore >= 8) return "bg-green-500";
    if (averageScore >= 5) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500 transition-all duration-300">

      {/* Header */}
      <div className="flex justify-between items-start">

        <div>
          <h2 className="text-white text-xl font-semibold">
            AI Interview
          </h2>

          <div className="flex items-center gap-2 mt-2 text-slate-400 text-sm">
            <CalendarDays size={16} />
            {formattedDate}
          </div>
        </div>

        <div
          className={`${badgeColor()} text-white px-4 py-2 rounded-xl font-bold`}
        >
          {averageScore}/10
        </div>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mt-6">

        <div className="bg-slate-800 rounded-xl p-4">

          <p className="text-slate-400 text-sm">
            Questions
          </p>

          <p className="text-2xl font-bold text-white mt-1">
            {questions.length}
          </p>

        </div>

        <div className="bg-slate-800 rounded-xl p-4">

          <div className="flex items-center gap-2">
            <Trophy
              size={18}
              className="text-yellow-400"
            />

            <span className="text-slate-400 text-sm">
              Avg Score
            </span>
          </div>

          <p className="text-2xl font-bold text-white mt-1">
            {averageScore}/10
          </p>

        </div>

      </div>

      {/* Footer */}
      <button
        onClick={() => navigate(`/summary/${_id}`)}
        className="mt-6 w-full bg-cyan-600 hover:bg-cyan-700 rounded-xl py-3 flex justify-center items-center gap-2 font-semibold transition"
      >
        View Summary
        <ChevronRight size={18} />
      </button>

    </div>
  );
}