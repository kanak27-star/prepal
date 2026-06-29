import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/api";

import InterviewHeader from "../components/interview/InterviewHeader";
import ChatMessage from "../components/interview/ChatMessage";
import TypingBubble from "../components/interview/TypingBubble";
import AnswerBox from "../components/interview/AnswerBox";
import FeedbackCard from "../components/interview/FeedbackCard";

export default function Interview() {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const bottomRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [answer, setAnswer] = useState("");

  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [strengths, setStrengths] = useState([]);
  const [weaknesses, setWeaknesses] = useState([]);

  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);

  const [timeLeft, setTimeLeft] = useState(15 * 60);

  // =========================
  // LOAD SESSION (REAL SOURCE OF TRUTH)
  // =========================
  const loadSession = async () => {
    try {
      const res = await API.get("/interview/active");

      const session = res.data.session;

      if (!session) {
        navigate("/dashboard");
        return;
      }

      setMessages([
        {
          role: "assistant",
          text: session.currentQuestion,
        },
      ]);

    } catch (err) {
      console.log(err);

      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  // =========================
  // AUTO SCROLL
  // =========================
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // =========================
  // TIMER
  // =========================
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate(`/summary/${sessionId}`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, sessionId]);

  // =========================
  // INIT
  // =========================
  useEffect(() => {
    loadSession();
  }, []);

  // =========================
  // SUBMIT ANSWER
  // =========================
  const submitAnswer = async () => {
    if (!answer.trim()) return;

    const userAnswer = answer;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: userAnswer },
    ]);

    setAnswer("");
    setLoading(true);

    try {
      const res = await API.post("/interview/answer", {
        sessionId,
        answer: userAnswer,
      });

      const evaluation = res.data.evaluation;

      setFeedback(evaluation.feedback);
      setScore(evaluation.score);
      setStrengths(evaluation.strengths || []);
      setWeaknesses(evaluation.weaknesses || []);

      // =========================
      // COMPLETED
      // =========================
      if (res.data.isCompleted) {
        setTimeout(() => {
          navigate(`/summary/${sessionId}`);
        }, 1200);
        return;
      }

      // =========================
      // NEXT QUESTION
      // =========================
      setTyping(true);

      setTimeout(() => {
        setTyping(false);

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: res.data.nextQuestion,
          },
        ]);
      }, 800);

    } catch (err) {
      console.log(err);
      alert("Submit failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <InterviewHeader
        timeLeft={timeLeft}
        onEnd={() => navigate(`/summary/${sessionId}`)}
      />

      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* CHAT */}
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              role={msg.role}
              text={msg.text}
            />
          ))}

          {typing && <TypingBubble />}

          <div ref={bottomRef} />
        </div>

        {/* ANSWER BOX */}
        <AnswerBox
          answer={answer}
          setAnswer={setAnswer}
          loading={loading}
          onSubmit={submitAnswer}
        />

        {/* FEEDBACK */}
        <FeedbackCard
          feedback={feedback}
          score={score}
          strengths={strengths}
          weaknesses={weaknesses}
        />

      </div>
    </div>
  );
}