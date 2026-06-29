import { Mic, MicOff } from "lucide-react";

export default function VoiceButton({
  listening,
  onStart,
  onStop,
  supported,
}) {
  if (!supported) return null;

  return (
    <button
      onClick={listening ? onStop : onStart}
      className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl transition font-semibold ${
        listening
          ? "bg-red-600 hover:bg-red-700 text-white"
          : "bg-slate-800 hover:bg-slate-700 text-white"
      }`}
    >
      {listening ? <MicOff size={20} /> : <Mic size={20} />}

      {listening ? "Stop Recording" : "Voice Answer"}
    </button>
  );
}