import { useEffect, useState } from "react";
import API from "../api/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

export default function Analytics() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/interview/my")
      .then((res) => setSessions(res.data.sessions || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // =========================
  // SAFE DEFAULTS
  // =========================
  const safeSessions = sessions || [];

  let totalScore = 0;
  let questionCount = 0;

  const scoreTrend = [];

  // =========================
  // MAIN LOOP (SAFE)
  // =========================
  safeSessions.forEach((s, idx) => {
    const questions = s.questions || [];

    let sessionTotal = 0;
    let sessionCount = 0;

    questions.forEach((q) => {
      const score = q.score || 0;

      totalScore += score;
      questionCount++;

      sessionTotal += score;
      sessionCount++;
    });

    scoreTrend.push({
      session: `S${idx + 1}`,
      score: sessionCount ? sessionTotal / sessionCount : 0,
    });
  });

  const avg =
    questionCount === 0
      ? 0
      : (totalScore / questionCount).toFixed(1);

  // =========================
  // SKILL DISTRIBUTION
  // =========================
  const skillsMap = {};

  safeSessions.forEach((s) => {
    (s.questions || []).forEach((q) => {
      const key = q.category || "General";

      if (!skillsMap[key]) skillsMap[key] = [];

      skillsMap[key].push(q.score || 0);
    });
  });

  const skillsData = Object.keys(skillsMap).map((key) => {
    const arr = skillsMap[key];

    return {
      name: key,
      value: arr.length
        ? (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1)
        : 0,
    };
  });

  // =========================
  // PERFORMANCE SPLIT
  // =========================
  let good = 0,
    average = 0,
    poor = 0;

  safeSessions.forEach((s) => {
    (s.questions || []).forEach((q) => {
      const score = q.score || 0;

      if (score >= 8) good++;
      else if (score >= 5) average++;
      else poor++;
    });
  });

  const pieData = [
    { name: "Good", value: good },
    { name: "Average", value: average },
    { name: "Poor", value: poor },
  ];

  const COLORS = ["#22C55E", "#F97316", "#EF4444"];

  // =========================
  // LOADING UI
  // =========================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 space-y-6">

      {/* HEADER */}
      <div className="bg-slate-900 p-5 rounded-xl">
        <h2 className="text-xl font-bold">Analytics Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-slate-300">
          <p>📊 Interviews: {safeSessions.length}</p>
          <p>⭐ Avg Score: {avg}/10</p>
          <p>🔥 Total Questions: {questionCount}</p>
        </div>
      </div>

      {/* SCORE TREND */}
      <div className="bg-slate-900 p-5 rounded-xl">
        <h3 className="mb-4 font-semibold">Score Trend</h3>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={scoreTrend}>
            <XAxis dataKey="session" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="#6366F1" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* SKILLS */}
        <div className="bg-slate-900 p-5 rounded-xl">
          <h3 className="mb-4 font-semibold">Skill Performance</h3>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={skillsData}>
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="value" fill="#22C55E" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE */}
        <div className="bg-slate-900 p-5 rounded-xl">
          <h3 className="mb-4 font-semibold">Performance Split</h3>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
}