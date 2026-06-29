export default function LoadingHistory() {
  return (
    <div className="space-y-6">

      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-6 animate-pulse"
        >

          <div className="flex justify-between">

            <div className="space-y-3">

              <div className="h-6 w-48 bg-slate-700 rounded" />

              <div className="h-4 w-32 bg-slate-800 rounded" />

            </div>

            <div className="h-10 w-20 bg-slate-700 rounded-xl" />

          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">

            <div className="bg-slate-800 rounded-xl h-24" />

            <div className="bg-slate-800 rounded-xl h-24" />

          </div>

          <div className="mt-8 h-12 bg-slate-700 rounded-xl" />

        </div>
      ))}

    </div>
  );
}