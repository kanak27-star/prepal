export default function StatCardSkeleton() {
  return (
    <div className="bg-slate-800 animate-pulse rounded-xl p-4 h-24">
      <div className="h-4 w-24 bg-slate-700 rounded mb-4"></div>
      <div className="h-6 w-16 bg-slate-700 rounded"></div>
    </div>
  );
}