const express = require("express");
const router = express.Router();

const { askGemini } = require("../services/aiService");

router.get("/", async (req, res) => {
  try {
    const answer = await askGemini("Say Hello from PrepPal");

    res.json({
      success: true,
      answer,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

module.exports = router;