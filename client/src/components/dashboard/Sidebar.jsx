import {
  LayoutDashboard,
  History,
  BarChart3,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-200 ${
      isActive
        ? "bg-cyan-500 text-white shadow-md"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 h-screen flex flex-col justify-between">

      {/* TOP SECTION */}
      <div className="p-6">

        {/* BRAND */}
        <h1 className="text-3xl font-bold text-cyan-400 mb-10 tracking-wide">
          PrepPal
        </h1>

        {/* NAVIGATION */}
        <nav className="space-y-3">

          <NavLink to="/dashboard" className={linkClass}>
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink to="/history" className={linkClass}>
            <History size={20} />
            History
          </NavLink>

          <NavLink to="/analytics" className={linkClass}>
            <BarChart3 size={20} />
            Analytics
          </NavLink>

        </nav>

      </div>

      {/* BOTTOM SECTION */}
      <div className="p-6 border-t border-slate-800">

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-red-500 hover:bg-red-600 transition-all duration-200 text-white"
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </aside>
  );
}