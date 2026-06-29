import Sidebar from "../components/dashboard/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex bg-slate-950 text-white min-h-screen">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">

        {/* PAGE CONTENT */}
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  );
}