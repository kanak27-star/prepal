import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function SkillChart({ sessions }) {
  const data =
    sessions?.map((s, index) => {
      const questions = s.questions || [];

      const avg =
        questions.length === 0
          ? 0
          : (
              questions.reduce(
                (sum, q) => sum + (q.score || 0),
                0
              ) / questions.length
            ).toFixed(1);

      return {
        interview: index + 1,
        score: Number(avg),
      };
    }) || [];

  return (
    <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">

      <h2 className="text-2xl font-bold mb-6">
        📈 Performance Trend
      </h2>

      {data.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          No interview data available.
        </div>
      ) : (
        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <LineChart data={data}>
            <CartesianGrid stroke="#334155" />

            <XAxis dataKey="interview" />

            <YAxis domain={[0, 10]} />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="score"
              stroke="#06b6d4"
              strokeWidth={4}
            />
          </LineChart>
        </ResponsiveContainer>
      )}

    </div>
  );
}