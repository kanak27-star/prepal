const model = require("../config/gemini");

exports.nextQuestion = async (
  previousQuestions,
  topic,
  difficulty = "Easy"
) => {
  try {
    const history = previousQuestions
      .map(
        (q, i) => `
Question ${i + 1}:
${q.question}

Candidate Answer:
${q.answer}

Score:
${q.score}/10
`
      )
      .join("\n");

    const prompt = `
You are a Senior Google Software Engineer taking a technical interview.

Topic:
${topic}

Difficulty:
${difficulty}

Interview History:
${history}

Rules:

- Ask ONE interview question only.
- Don't ask coding problems.
- Don't ask MCQs.
- Don't ask multiple questions.
- Keep it conversational.
- If candidate answered poorly, ask an easier conceptual question.
- If candidate answered well, gradually increase difficulty.
- Questions should feel like Google Interview Warmup or ChatGPT Voice Interview.

Return ONLY the next question.
`;

    const result = await model.generateContent(prompt);

    return result.response.text().trim();

  } catch (err) {

    console.log(err);

    return `Can you explain another important concept related to ${topic}?`;

  }
};