import {
  Calendar,
  Clock3,
  Trophy,
  ArrowRight,
} from "lucide-react";

export default function RecentInterview({ session }) {
  const totalQuestions =
    session.questions?.length || 0;

  const avg =
    totalQuestions === 0
      ? 0
      : (
          session.questions.reduce(
            (a, q) => a + (q.score || 0),
            0
          ) / totalQuestions
        ).toFixed(1);

  return (
    <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 hover:scale-[1.02] transition">

      <div className="flex justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            {session.topic}
          </h2>

          <p className="text-slate-400 mt-1">
            {session.difficulty || "Easy"} •{" "}
            {session.duration || 15} mins
          </p>

        </div>

        <span
          className={`px-4 py-2 rounded-full text-sm ${
            session.status === "completed"
              ? "bg-green-500/20 text-green-400"
              : "bg-yellow-500/20 text-yellow-400"
          }`}
        >
          {session.status}
        </span>

      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-6">

        <div className="bg-slate-800 rounded-xl p-4">

          <Calendar size={18} />

          <p className="text-slate-400 mt-2">
            Date
          </p>

          <h3>
            {new Date(
              session.createdAt
            ).toLocaleDateString()}
          </h3>

        </div>

        <div className="bg-slate-800 rounded-xl p-4">

          <Clock3 size={18} />

          <p className="text-slate-400 mt-2">
            Questions
          </p>

          <h3>{totalQuestions}</h3>

        </div>

        <div className="bg-slate-800 rounded-xl p-4">

          <Trophy size={18} />

          <p className="text-slate-400 mt-2">
            Avg Score
          </p>

          <h3>{avg}/10</h3>

        </div>

      </div>

      <button className="mt-6 flex items-center gap-2 text-cyan-400 hover:gap-3 transition">

        View Details

        <ArrowRight size={18} />

      </button>

    </div>
  );
}