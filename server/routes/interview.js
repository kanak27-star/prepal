const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth");

const {
  startInterview,
  submitAnswer,
  getSummary,
  getMyInterviews,
  getActiveInterview
} = require("../controllers/interviewController");

// ================= START =================
router.post("/start", protect, startInterview);

// ================= ACTIVE SESSION (NEW FIX) =================
router.get("/active", protect, getActiveInterview);

// ================= ANSWER =================
router.post("/answer", protect, submitAnswer);

// ================= SUMMARY =================
router.get("/:id/summary", protect, getSummary);

// ================= MY INTERVIEWS =================
router.get("/my", protect, getMyInterviews);

module.exports = router;