import { useEffect, useState } from "react";
import API from "../api/api";
import DashboardLayout from "../layouts/DashboardLayout";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
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
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const res = await API.get("/interview/my");

      setSessions(res.data.sessions || []);
    } catch (err) {
      console.error("Analytics Error:", err);
      setSessions([]);
    } finally {
      setLoading(false);
    }
  };

  const safeSessions = sessions || [];

  let totalScore = 0;
  let totalQuestions = 0;

  const trendData = [];

  safeSessions.forEach((session, index) => {
    const questions = session.questions || [];

    let sessionScore = 0;

    questions.forEach((q) => {
      totalScore += q.score || 0;
      totalQuestions++;
      sessionScore += q.score || 0;
    });

    trendData.push({
      session: `S${index + 1}`,
      score:
        questions.length > 0
          ? Number(
              (
                sessionScore /
                questions.length
              ).toFixed(1)
            )
          : 0,
    });
  });

  const averageScore =
    totalQuestions > 0
      ? (totalScore / totalQuestions).toFixed(1)
      : "0.0";

  let good = 0;
  let average = 0;
  let poor = 0;

  safeSessions.forEach((session) => {
    (session.questions || []).forEach((q) => {
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

  const COLORS = ["#22C55E", "#F59E0B", "#EF4444"];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-white text-center mt-20">
          Loading Analytics...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">

        <div className="bg-slate-900 p-6 rounded-2xl">

          <h1 className="text-3xl font-bold text-white">
            Analytics Dashboard
          </h1>

          <div className="grid md:grid-cols-3 gap-4 mt-6">

            <div className="bg-slate-800 rounded-xl p-4">
              <p className="text-slate-400">
                Interviews
              </p>

              <h2 className="text-3xl text-white font-bold">
                {safeSessions.length}
              </h2>
            </div>

            <div className="bg-slate-800 rounded-xl p-4">
              <p className="text-slate-400">
                Average Score
              </p>

              <h2 className="text-3xl text-white font-bold">
                {averageScore}/10
              </h2>
            </div>

            <div className="bg-slate-800 rounded-xl p-4">
              <p className="text-slate-400">
                Questions Answered
              </p>

              <h2 className="text-3xl text-white font-bold">
                {totalQuestions}
              </h2>
            </div>

          </div>

        </div>

        <div className="bg-slate-900 p-6 rounded-2xl">
          <h2 className="text-xl font-bold mb-4 text-white">
            Score Trend
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <XAxis dataKey="session" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#06B6D4"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-slate-900 p-6 rounded-2xl">
            <h2 className="text-xl font-bold mb-4 text-white">
              Performance Split
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {pieData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl">
            <h2 className="text-xl font-bold mb-4 text-white">
              Session Scores
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trendData}>
                <XAxis dataKey="session" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="score"
                  fill="#06B6D4"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}