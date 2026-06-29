import { Clock3, LogOut } from "lucide-react";

export default function InterviewHeader({ timeLeft, onEnd }) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const timerColor =
    timeLeft > 300
      ? "text-green-400"
      : timeLeft > 120
      ? "text-yellow-400"
      : "text-red-500";

  return (
    <div className="sticky top-0 z-50 bg-slate-950 border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-bold text-white">
            PrepPal AI Interview
          </h1>

          <p className="text-slate-400 text-sm">
            Practice with an AI interviewer
          </p>
        </div>

        <div className="flex items-center gap-6">

          <div
            className={`flex items-center gap-2 font-bold text-xl ${timerColor}`}
          >
            <Clock3 size={22} />

            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </div>

          <button
            onClick={onEnd}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl transition"
          >
            <LogOut size={18} />
            End Interview
          </button>

        </div>

      </div>
    </div>
  );
}