import { motion } from "framer-motion";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-5">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-slate-900 rounded-3xl shadow-2xl p-8"
      >
        <h1 className="text-4xl font-bold text-center text-cyan-400 mb-2">
          PrepPal AI
        </h1>

        <p className="text-slate-400 text-center mb-8">
          AI Powered Interview Practice
        </p>

        {children}

      </motion.div>
    </div>
  );
}