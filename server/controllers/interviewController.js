const Session = require("../models/Session");
const evaluatorAgent = require("../services/evaluatorAgent");

// ================= START INTERVIEW =================
exports.startInterview = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;

    // 🔥 CHECK IF ACTIVE SESSION EXISTS
    const existing = await Session.findOne({
      user: userId,
      isCompleted: false,
    });

    if (existing) {
      return res.status(200).json({
        success: true,
        session: existing,
        message: "Resuming existing session",
      });
    }

    const questionPool = [
      "Tell me about yourself",
      "What are your strengths?",
      "Explain your latest project",
      "Why should we hire you?",
      "Where do you see yourself in 5 years?",
    ];

    const session = await Session.create({
      user: userId,
      questions: [],
      questionPool,
      currentIndex: 0,
      currentQuestion: questionPool[0],
      isCompleted: false,
    });

    res.status(200).json({
      success: true,
      session,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= ACTIVE INTERVIEW =================
exports.getActiveInterview = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;

    const session = await Session.findOne({
      user: userId,
      isCompleted: false,
    });

    res.status(200).json({
      success: true,
      session,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= SUBMIT ANSWER =================
exports.submitAnswer = async (req, res) => {
  try {
    const { sessionId, answer } = req.body;

    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    const question = session.currentQuestion;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "No active question",
      });
    }

    // ================= AI EVALUATION =================
    let evaluation;

    try {
      evaluation = await evaluatorAgent.evaluate(question, answer);
    } catch (err) {
      console.log("Evaluator Error:", err.message);

      evaluation = {
        score: 5,
        feedback: "Evaluation failed but answer saved.",
        strengths: [],
        weaknesses: [],
      };
    }

    session.questions.push({
      question,
      answer,
      score: evaluation.score,
      feedback: evaluation.feedback,
      strengths: evaluation.strengths || [],
      weaknesses: evaluation.weaknesses || [],
    });

    // ================= NEXT QUESTION =================
    session.currentIndex += 1;

    if (session.currentIndex < session.questionPool.length) {
      session.currentQuestion =
        session.questionPool[session.currentIndex];
    } else {
      session.currentQuestion = null;
      session.isCompleted = true;
    }

    await session.save();

    res.status(200).json({
      success: true,
      nextQuestion: session.currentQuestion,
      evaluation,
      isCompleted: session.isCompleted,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= SUMMARY =================
exports.getSummary = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    const total = session.questions.length;

    const avgScore =
      total > 0
        ? session.questions.reduce(
            (acc, q) => acc + (q.score || 0),
            0
          ) / total
        : 0;

    res.status(200).json({
      success: true,
      summary: {
        totalQuestions: total,
        averageScore: avgScore,
        questions: session.questions,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= MY INTERVIEWS =================
exports.getMyInterviews = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;

    const sessions = await Session.find({ user: userId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: sessions.length,
      sessions,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};