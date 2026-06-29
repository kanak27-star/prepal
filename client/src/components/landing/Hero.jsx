import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        <div>

          <motion.h1

            initial={{ opacity:0,y:30 }}
            animate={{ opacity:1,y:0 }}

            className="text-6xl font-black leading-tight text-white"
          >

            Ace Every Interview
            <br />

            with
            <span className="text-cyan-300">
              {" "}AI
            </span>

          </motion.h1>

          <p className="mt-8 text-xl text-slate-200">

            Personalized mock interviews,
            AI feedback,
            analytics,
            resume insights
            and voice interaction.

          </p>

          <button className="mt-10 bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3">

            <Sparkles />

            Start Free

          </button>

        </div>

        <motion.img

          animate={{ y:[0,-15,0] }}

          transition={{
            repeat:Infinity,
            duration:4
          }}

          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800"

          className="rounded-3xl shadow-2xl"

        />

      </div>

    </section>
  );
}