// ======================
// SUBMIT ANSWER
// ======================

exports.submitAnswer = async (sessionId, answer) => {
  const session = await Session.findById(sessionId);

  if (!session) {
    throw new Error("Session not found");
  }

  const question = session.currentQuestion;

  // Save candidate answer in chat
  session.conversation.push({
    role: "user",
    message: answer,
  });

  // Evaluate answer
  const evaluation = await evaluatorAgent.evaluate(
    question,
    answer
  );

  // Save structured data for reports
  session.questions.push({
    question,
    answer,
    score: evaluation.score,
    feedback: evaluation.feedback,
    strengths: evaluation.strengths,
    improvements: evaluation.improvements,
    timestamp: new Date(),
  });

  // Save AI feedback in chat
  session.conversation.push({
    role: "assistant",
    message:
      `Feedback\n\n` +
      `${evaluation.feedback}\n\n` +
      `⭐ Score: ${evaluation.score}/10`,
  });

  // Generate next interview question
  const nextQuestion = await followUpAgent.nextQuestion(
    session.questions,
    session.topic,
    session.difficulty
  );

  session.currentQuestion = nextQuestion;

  // Save next AI question
  session.conversation.push({
    role: "assistant",
    message: nextQuestion,
  });

  await session.save();

  return {
    score: evaluation.score,
    feedback: evaluation.feedback,
    strengths: evaluation.strengths,
    improvements: evaluation.improvements,
    nextQuestion,
    conversation: session.conversation,
  };
};

// ======================
// SUMMARY
// ======================

exports.getSummary = async (sessionId) => {
  const session = await Session.findById(sessionId);

  if (!session) {
    throw new Error("Session not found");
  }

  const summary = await summarizerAgent.generateSummary(
    session.questions
  );

  session.status = "completed";

  await session.save();

  return {
    summary,
    session,
    conversation: session.conversation,
  };
};