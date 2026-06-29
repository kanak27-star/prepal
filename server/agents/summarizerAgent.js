const model = require("../config/gemini");

exports.generateSummary = async (
  questions
) => {
  try {
    const prompt = `
Analyze this interview:

${questions
  .map(
    (q, i) =>
      `${i + 1}. Q:${q.question}
A:${q.answer}
Score:${q.score}`
  )
  .join("\n")}
`;

    const result =
      await model.generateContent(prompt);

    return result.response.text();
  } catch (err) {
    console.error(
      "SUMMARY ERROR:",
      err
    );

    const avg =
      questions.reduce(
        (sum, q) => sum + q.score,
        0
      ) / questions.length;

    return `
Interview Completed

Average Score: ${avg.toFixed(1)}/10

Level:
${
  avg >= 8
    ? "Advanced"
    : avg >= 5
    ? "Intermediate"
    : "Beginner"
}
`;
  }
};