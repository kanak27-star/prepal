import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function HeroBanner() {
  const navigate = useNavigate();

  const startInterview = async () => {
    try {
      const res = await API.post("/interview/start", {
        questions: [
          "Tell me about yourself",
          "What is JavaScript?",
          "Explain React",
        ],
      });

      navigate(`/interview/${res.data.sessionId}`);
    } catch (err) {
      console.log("Failed:", err.response?.data || err.message);
    }
  };

  return (
    <button onClick={startInterview}>
      Start Interview
    </button>
  );
}