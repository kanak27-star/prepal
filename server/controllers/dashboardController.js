exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user?.id;

    // dummy data (abhi ke liye safe working)
    res.json({
      interviews: 3,
      score: 75,
      skills: ["JavaScript", "React", "Node.js"],
      userId: userId || null,
    });
  } catch (err) {
    res.status(500).json({
      message: "Dashboard error",
      error: err.message,
    });
  }
};