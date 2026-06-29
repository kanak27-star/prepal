import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function HeroBanner() {
  const navigate = useNavigate();

  const startInterview = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first.");
        navigate("/login");
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/api/interview/start",
        {
          questions: [
            "Tell me about yourself",
            "What is JavaScript?",
            "Explain React",
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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