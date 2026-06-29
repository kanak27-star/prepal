import {
  User,
  Award,
  Flame,
  Brain,
} from "lucide-react";

export default function ProfileCard() {
  return (
    <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">

      <div className="flex justify-center">

        <div className="w-24 h-24 rounded-full bg-cyan-500 flex items-center justify-center">

          <User size={42} />

        </div>

      </div>

      <h2 className="text-center text-2xl font-bold mt-5">
        AI Candidate
      </h2>

      <p className="text-center text-slate-400">
        Ready for Placements 🚀
      </p>

      <div className="space-y-5 mt-8">

        <div className="flex justify-between">

          <span className="flex gap-2">
            <Flame />
            Streak
          </span>

          <b>7 Days</b>

        </div>

        <div className="flex justify-between">

          <span className="flex gap-2">
            <Award />
            Badge
          </span>

          <b>Gold</b>

        </div>

        <div className="flex justify-between">

          <span className="flex gap-2">
            <Brain />
            Confidence
          </span>

          <b>88%</b>

        </div>

      </div>

    </div>
  );
}