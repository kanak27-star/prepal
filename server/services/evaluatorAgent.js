// server/services/evaluatorAgent.js

module.exports = {
  evaluate: async (question, answer) => {
    // 🔹 Simple mock evaluation logic (you can later replace with AI/Gemini/OpenAI)

    let score = 0;
    let feedback = "";

    if (!answer || answer.trim().length === 0) {
      return {
        score: 0,
        feedback: "No answer provided.",
      };
    }

    // basic heuristics
    const length = answer.trim().length;

    if (length < 20) {
      score = 2;
      feedback = "Answer is too short. Try adding more explanation.";
    } else if (length < 80) {
      score = 5;
      feedback = "Good attempt, but could be more detailed.";
    } else {
      score = 8;
      feedback = "Well explained answer with good detail.";
    }

    return {
      score,
      feedback,
    };
  },
};