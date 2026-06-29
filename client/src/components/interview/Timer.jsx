export default function Timer({ timeLeft }) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="px-5 py-2 rounded-xl bg-slate-900 border border-slate-700">

      <p className="text-xs text-slate-400">
        Remaining Time
      </p>

      <h2 className="text-2xl font-bold text-green-400">
        {String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}
      </h2>

    </div>
  );
}