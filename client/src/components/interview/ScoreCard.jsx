export default function ScoreCard({
  score,
  feedback,
  strengths,
  weaknesses,
}) {
  if (score === null) return null;

  return (
    <div className="mt-8 rounded-2xl bg-slate-900 border border-slate-700 p-6">

      <h2 className="text-2xl font-bold text-green-400 mb-4">
        AI Feedback
      </h2>

      <div className="text-4xl font-bold text-yellow-400 mb-5">
        ⭐ {score}/10
      </div>

      <p className="text-slate-300 whitespace-pre-wrap leading-7">
        {feedback}
      </p>

      {strengths?.length > 0 && (
        <div className="mt-6">
          <h3 className="text-cyan-400 font-semibold text-lg mb-2">
            Strengths
          </h3>

          <ul className="list-disc ml-5 space-y-2">
            {strengths.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {weaknesses?.length > 0 && (
        <div className="mt-6">
          <h3 className="text-red-400 font-semibold text-lg mb-2">
            Improvements
          </h3>

          <ul className="list-disc ml-5 space-y-2">
            {weaknesses.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}