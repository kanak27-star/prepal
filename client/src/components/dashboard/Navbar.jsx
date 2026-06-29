import { useState } from "react";
import {
  Bell,
  Search,
  Moon,
  Sun,
} from "lucide-react";

export default function Navbar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [dark, setDark] = useState(true);

  const handleSearch = (value) => {
    setQuery(value);
    if (onSearch) onSearch(value);
  };

  const toggleTheme = () => {
    setDark(!dark);

    // optional real theme toggle (future upgrade)
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="flex items-center justify-between mb-10">

      {/* LEFT SIDE */}
      <div>
        <h1 className="text-4xl font-bold">
          Welcome 👋
        </h1>

        <p className="text-slate-400 mt-2">
          Ready to ace today's interview?
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-5">

        {/* SEARCH */}
        <div className="relative">
          <Search
            className="absolute left-4 top-3 text-slate-400"
            size={18}
          />

          <input
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search interviews..."
            className="bg-slate-900 rounded-xl pl-11 pr-5 py-3 w-72 outline-none border border-slate-800"
          />
        </div>

        {/* NOTIFICATIONS */}
        <button className="bg-slate-900 p-3 rounded-xl hover:bg-slate-800">
          <Bell />
        </button>

        {/* THEME TOGGLE */}
        <button
          onClick={toggleTheme}
          className="bg-slate-900 p-3 rounded-xl hover:bg-slate-800"
        >
          {dark ? <Moon /> : <Sun />}
        </button>

      </div>

    </div>
  );
}