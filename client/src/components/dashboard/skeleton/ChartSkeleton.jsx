export default function ChartSkeleton() {
  return (
    <div className="bg-slate-800 animate-pulse rounded-xl p-6 h-64">
      <div className="h-4 w-32 bg-slate-700 rounded mb-6"></div>

      <div className="space-y-3">
        <div className="h-3 bg-slate-700 rounded w-full"></div>
        <div className="h-3 bg-slate-700 rounded w-5/6"></div>
        <div className="h-3 bg-slate-700 rounded w-4/6"></div>
        <div className="h-3 bg-slate-700 rounded w-3/6"></div>
      </div>
    </div>
  );
}