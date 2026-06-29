import { useEffect, useMemo, useState } from "react";
import API from "../api/api";

import DashboardLayout from "../layouts/DashboardLayout";

import HistoryList from "../components/history/HistoryList";
import EmptyHistory from "../components/history/EmptyHistory";
import LoadingHistory from "../components/history/LoadingHistory";

export default function History() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await API.get("/interview/my");

      setInterviews(res.data.interviews || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredInterviews = useMemo(() => {
    let data = [...interviews];

    if (search.trim()) {
      data = data.filter((item) =>
        (item.role || "AI Interview")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    switch (sort) {
      case "highest":
        data.sort(
          (a, b) =>
            (b.averageScore || 0) -
            (a.averageScore || 0)
        );
        break;

      case "lowest":
        data.sort(
          (a, b) =>
            (a.averageScore || 0) -
            (b.averageScore || 0)
        );
        break;

      default:
        data.sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        );
    }

    return data;
  }, [interviews, search, sort]);

  return (
    <DashboardLayout>

      <div className="max-w-6xl mx-auto px-6 py-8">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div>
            <h1 className="text-3xl font-bold text-white">
              Interview History
            </h1>

            <p className="text-slate-400 mt-2">
              Review all your previous AI interviews.
            </p>
          </div>

          <div className="flex gap-3">

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white outline-none"
            />

            <select
              value={sort}
              onChange={(e) =>
                setSort(e.target.value)
              }
              className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white"
            >
              <option value="latest">
                Latest
              </option>

              <option value="highest">
                Highest Score
              </option>

              <option value="lowest">
                Lowest Score
              </option>
            </select>

          </div>

        </div>

        {loading ? (
          <LoadingHistory />
        ) : filteredInterviews.length === 0 ? (
          <EmptyHistory />
        ) : (
          <HistoryList
            interviews={filteredInterviews}
          />
        )}

      </div>

    </DashboardLayout>
  );
}