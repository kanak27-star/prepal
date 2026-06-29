import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/api";

export default function Summary() {

  const { sessionId } = useParams();

  const [summary, setSummary] = useState(null);

  useEffect(() => {

    loadSummary();

  }, []);

  const loadSummary = async () => {

    try {

      const res = await API.get(
        `/interview/${sessionId}/summary`
      );

      setSummary(res.data.summary);

    } catch (err) {

      console.log(err);

    }

  };

  if (!summary) {

    return (
      <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center">
        Loading...
      </div>
    );

  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <div className="max-w-5xl mx-auto py-12">

        <h1 className="text-4xl font-bold mb-8">
          Interview Summary
        </h1>

        <div className="bg-slate-900 rounded-2xl p-6 mb-6">

          <p>Total Questions</p>

          <h2 className="text-3xl">
            {summary.totalQuestions}
          </h2>

        </div>

        <div className="bg-slate-900 rounded-2xl p-6 mb-10">

          <p>Average Score</p>

          <h2 className="text-3xl">
            {summary.averageScore.toFixed(1)}/10
          </h2>

        </div>

        {summary.questions.map((q, index) => (

          <div
            key={index}
            className="bg-slate-900 rounded-2xl p-6 mb-6"
          >

            <h2 className="font-bold text-cyan-400">
              Q{index + 1}: {q.question}
            </h2>

            <p className="mt-3">
              <b>Your Answer:</b>
            </p>

            <p>{q.answer}</p>

            <p className="mt-3">
              <b>Feedback:</b>
            </p>

            <p>{q.feedback}</p>

            <p className="mt-3 text-yellow-400">
              ⭐ Score: {q.score}/10
            </p>

          </div>

        ))}

        <Link
          to="/dashboard"
          className="inline-block bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-xl"
        >
          Back to Dashboard
        </Link>

      </div>

    </div>
  );
}