import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-lg border-b border-white/20">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-5">

        <h1 className="text-3xl font-extrabold text-white">
          PrepPal AI
        </h1>

        <div className="space-x-8 hidden md:flex">

          <a href="#features" className="text-white">
            Features
          </a>

          <a href="#stats" className="text-white">
            Analytics
          </a>

          <a href="#contact" className="text-white">
            Contact
          </a>

        </div>

        <Link
          to="/login"
          className="bg-white text-indigo-600 px-5 py-2 rounded-full font-bold"
        >
          Login
        </Link>

      </div>
    </nav>
  );
}