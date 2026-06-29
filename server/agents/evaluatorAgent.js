const model = require("../config/gemini");

exports.evaluate = async (question, answer) => {
  try {
    const prompt = `
You are a Senior FAANG interviewer.

Interview Question:
${question}

Candidate Answer:
${answer}

Evaluate like ChatGPT.

Rules:
- If answer is gibberish (random letters like "asdf", "abc", "xyz", "cugjc"), score 0-2.
- If answer is partially correct, score 3-6.
- If answer is mostly correct, score 7-8.
- If answer is excellent, score 9-10.

Return ONLY valid JSON.

{
  "score": 0,
  "feedback": "",
  "strengths": [],
  "improvements": []
}
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);

  } catch (err) {

    console.log(err);

    return {
      score: 0,
      feedback: "Unable to evaluate answer.",
      strengths: [],
      improvements: [
        "Please provide a complete answer."
      ]
    };
  }
};