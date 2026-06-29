export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 text-center">

        <h2 className="text-2xl font-bold text-cyan-400">
          PrepPal
        </h2>

        <p className="text-slate-400 mt-3">
          AI Powered Interview Preparation Platform
        </p>

        <div className="flex justify-center gap-6 mt-6">
          <a href="#">GitHub</a>
          <a href="#">LinkedIn</a>
          <a href="#">Portfolio</a>
        </div>

        <p className="text-slate-500 mt-8">
          Made with ❤️ by PrepPal
        </p>

      </div>
    </footer>
  );
}