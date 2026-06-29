import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

import DashboardLayout from "../layouts/DashboardLayout";
import HeroBanner from "../components/HeroBanner";
import StatCard from "../components/dashboard/StatCard";
import SkillChart from "../components/dashboard/SkillChart";

// 🧊 Skeletons (create folder if not created yet)
import StatCardSkeleton from "../components/dashboard/skeleton/StatCardSkeleton";
import ChartSkeleton from "../components/dashboard/skeleton/ChartSkeleton";

export default function Dashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    interviews: 0,
    score: 0,
    skills: [],
  });

  // =========================
  // 📊 FETCH DASHBOARD
  // =========================
  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const res = await API.get("/dashboard");
      setStats(res.data);

    } catch (err) {
      console.log("Dashboard load error:", err);

      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }

    } finally {
      setLoading(false);
    }
  };

  // =========================
  // 🚀 START INTERVIEW
  // =========================
  const startInterview = async () => {
  try {
    // 1. Try to get existing active session first
    const existing = await API.get("/interview/active");

    if (existing.data?.session) {
      const sessionId = existing.data.session._id;

      localStorage.setItem("sessionId", sessionId);
      navigate(`/interview/${sessionId}`);
      return;
    }

    // 2. If no active session → create new
    const res = await API.post("/interview/start", {});

    const sessionId = res.data.session._id;

    localStorage.setItem("sessionId", sessionId);
    navigate(`/interview/${sessionId}`);

  } catch (err) {
    console.log("Start interview error:", err);

    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }
};

  // =========================
  // 🔥 INIT
  // =========================
  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <DashboardLayout>
      <div className="grid grid-cols-12 gap-6 p-4">

        {/* LEFT SIDE */}
        <div className="col-span-12 lg:col-span-8 space-y-6">

          <HeroBanner />

          {/* STATS */}
          <div className="grid grid-cols-2 gap-4">
            {loading ? (
              <>
                <StatCardSkeleton />
                <StatCardSkeleton />
              </>
            ) : (
              <>
                <StatCard title="Interviews" value={stats.interviews} />
                <StatCard title="Average Score" value={stats.score} />
              </>
            )}
          </div>

          {/* CHART */}
          {loading ? (
            <ChartSkeleton />
          ) : (
            <SkillChart data={stats.skills} />
          )}

        </div>

        {/* RIGHT SIDE */}
        <div className="col-span-12 lg:col-span-4 space-y-6">

          {/* BOX 1 */}
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-lg font-semibold mb-2">
              🎯 Upcoming Interview
            </h2>

            <p className="text-gray-500 text-sm">
              Start your AI interview and improve your score.
            </p>

            <button
              onClick={startInterview}
              className="mt-3 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
            >
              Start Now
            </button>
          </div>

          {/* BOX 2 */}
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-lg font-semibold mb-2">
              📊 Performance Tips
            </h2>

            <ul className="text-sm text-gray-600 space-y-2">
              <li>✔ Speak clearly and confidently</li>
              <li>✔ Use structured answers (STAR method)</li>
              <li>✔ Keep answers concise</li>
              <li>✔ Practice daily</li>
            </ul>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}