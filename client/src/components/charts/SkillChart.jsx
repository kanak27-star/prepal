import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts";

const data = [
  { skill: "React", score: 85 },
  { skill: "DSA", score: 72 },
  { skill: "SQL", score: 90 },
  { skill: "Node", score: 80 },
];

export default function SkillChart() {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 mt-8">

      <h2 className="text-xl font-bold mb-5">
        Skill Progress
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="skill" />
          <Tooltip />
          <Bar dataKey="score" />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}