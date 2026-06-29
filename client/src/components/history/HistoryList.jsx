import HistoryCard from "./HistoryCard";

export default function HistoryList({ interviews = [] }) {
  if (!interviews.length) {
    return (
      <div className="text-center text-slate-400 py-10">
        No interviews found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {interviews.map((interview) => (
        <HistoryCard
          key={interview._id}
          interview={interview}
        />
      ))}
    </div>
  );
}