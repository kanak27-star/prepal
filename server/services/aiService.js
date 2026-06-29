const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

/**
 * Evaluate interview answer
 */
exports.evaluateAnswer = async (question, answer) => {
  try {
    if (!question || !answer) {
      throw new Error("Question and answer are required");
    }

    const prompt = `
You are an expert interview evaluator.

Evaluate the candidate's response.

Return ONLY valid JSON:
{
  "score": number (0-10),
  "feedback": "short interview feedback",
  "strengths": ["point1", "point2"],
  "weaknesses": ["point1", "point2"]
}

Rules:
- Be strict but fair
- Keep feedback concise
- No extra text outside JSON

Question:
${question}

Answer:
${answer}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    let parsed;

    try {
      parsed = JSON.parse(text);
    } catch (err) {
      const match = text.match(/\{[\s\S]*\}/);
      parsed = match ? JSON.parse(match[0]) : null;
    }

    if (!parsed) {
      return {
        score: 0,
        feedback: "Could not parse AI response",
        strengths: [],
        weaknesses: ["Invalid AI output"],
      };
    }

    return {
      score: parsed.score || 0,
      feedback: parsed.feedback || "",
      strengths: parsed.strengths || [],
      weaknesses: parsed.weaknesses || [],
    };
  } catch (error) {
    return {
      score: 0,
      feedback: "AI evaluation failed: " + error.message,
      strengths: [],
      weaknesses: ["Service error"],
    };
  }
};