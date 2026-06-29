const model = require("../config/gemini");

exports.generateQuestion = async (
  topic,
  difficulty = "Easy"
) => {

  try {

    const prompt = `
You are a Senior FAANG interviewer.

Topic:
${topic}

Difficulty:
${difficulty}

Rules:

- Ask ONE interview question.
- No coding problems.
- No MCQs.
- No puzzles.
- No multiple questions.
- Only conceptual interview questions.
- Maximum 2 sentences.
- Sounds like a real interviewer.

Examples:

"What is Virtual Memory?"

"What is a HashMap?"

"Can you explain ACID properties?"

Return ONLY the interview question.
`;

    const result =
      await model.generateContent(prompt);

    return result.response.text().trim();

  } catch (err) {

    console.log(err);

    return `Can you explain ${topic}?`;

  }

};