export default function Features() {
  return (
    <section className="py-16 px-8 bg-white">
      <h2 className="text-3xl font-bold text-center mb-10">
        Why Choose PrepAI?
      </h2>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="p-6 rounded-xl shadow">
          <h3 className="font-bold">🤖 AI Interviewer</h3>
          <p>Practice with an intelligent interviewer.</p>
        </div>

        <div className="p-6 rounded-xl shadow">
          <h3 className="font-bold">💻 Coding</h3>
          <p>Solve coding problems in real time.</p>
        </div>

        <div className="p-6 rounded-xl shadow">
          <h3 className="font-bold">📊 Analytics</h3>
          <p>Track your interview performance.</p>
        </div>

        <div className="p-6 rounded-xl shadow">
          <h3 className="font-bold">🎯 Feedback</h3>
          <p>Get AI-generated improvement tips.</p>
        </div>
      </div>
    </section>
  );
}