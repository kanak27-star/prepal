const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    role: {
      type: String,
      default: "General",
    },

    experience: {
      type: String,
      default: "Not specified",
    },

    status: {
      type: String,
      enum: ["Completed"],
      default: "Completed",
    },

    score: {
      type: Number,
      default: 0,
    },

    summary: {
      type: String,
      default: "",
    },

    // 🔥 store full performance snapshot
    questions: [
      {
        question: String,
        answer: String,
        score: Number,
        feedback: String,
        strengths: [String],
        weaknesses: [String],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Interview", interviewSchema);