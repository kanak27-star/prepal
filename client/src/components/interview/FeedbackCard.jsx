export default function FeedbackCard({
  feedback,
  score,
  strengths = [],
  weaknesses = [],
}) {
  if (!feedback) return null;

  return (
    <div className="mt-10 bg-slate-900 border border-slate-800 rounded-2xl p-6">

      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-bold text-green-400">
          AI Feedback
        </h2>

        <div className="bg-cyan-600 px-4 py-2 rounded-xl font-bold">
          ⭐ {score}/10
        </div>

      </div>

      <p className="mt-6 whitespace-pre-wrap text-slate-300 leading-8">
        {feedback}
      </p>

      {strengths.length > 0 && (
        <div className="mt-8">

          <h3 className="text-green-400 font-semibold text-lg mb-3">
            Strengths
          </h3>

          <ul className="space-y-2">
            {strengths.map((item, i) => (
              <li
                key={i}
                className="bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3"
              >
                ✅ {item}
              </li>
            ))}
          </ul>

        </div>
      )}

      {weaknesses.length > 0 && (
        <div className="mt-8">

          <h3 className="text-red-400 font-semibold text-lg mb-3">
            Improvements
          </h3>

          <ul className="space-y-2">
            {weaknesses.map((item, i) => (
              <li
                key={i}
                className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3"
              >
                🔹 {item}
              </li>
            ))}
          </ul>

        </div>
      )}
    </div>
  );
}