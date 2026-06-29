import { ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EmptyHistory() {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl py-16 px-8 text-center">

      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full bg-cyan-600 flex items-center justify-center">
          <ClipboardList
            size={40}
            className="text-white"
          />
        </div>
      </div>

      <h2 className="text-3xl font-bold text-white">
        No Interviews Yet
      </h2>

      <p className="text-slate-400 mt-4 max-w-md mx-auto">
        You haven't completed any AI interviews yet.
        Start your first interview and your history will
        appear here.
      </p>

      <button
        onClick={() => navigate("/dashboard")}
        className="mt-8 bg-cyan-600 hover:bg-cyan-700 px-8 py-3 rounded-xl font-semibold transition"
      >
        Start Interview
      </button>

    </div>
  );
}