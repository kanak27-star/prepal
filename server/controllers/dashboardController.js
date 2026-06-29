const Session = require("../models/Session");

exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;

    // Sirf completed interviews
    const sessions = await Session.find({
      user: userId,
      isCompleted: true,
    });

    let totalQuestions = 0;
    let totalScore = 0;

    const skillMap = {};

    sessions.forEach((session) => {
      (session.questions || []).forEach((q) => {
        const score = q.score || 0;

        totalQuestions++;
        totalScore += score;

        // Agar category nahi hai to General
        const category = q.category || "General";

        if (!skillMap[category]) {
          skillMap[category] = {
            total: 0,
            count: 0,
          };
        }

        skillMap[category].total += score;
        skillMap[category].count++;
      });
    });

    const averageScore =
      totalQuestions > 0
        ? Number((totalScore / totalQuestions).toFixed(1))
        : 0;

    const skills = Object.keys(skillMap).map((key) => ({
      name: key,
      score: Number(
        (
          skillMap[key].total /
          skillMap[key].count
        ).toFixed(1)
      ),
    }));

    res.status(200).json({
      interviews: sessions.length,
      score: averageScore,
      skills,
    });

  } catch (err) {
    console.error("Dashboard Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};