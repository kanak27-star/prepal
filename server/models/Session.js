const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },

    score: { type: Number, default: 0 },
    feedback: { type: String, default: "" },

    strengths: { type: [String], default: [] },
    weaknesses: { type: [String], default: [] },
  },
  { _id: false }
);

const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Question flow
    questionPool: {
      type: [String],
      default: [],
    },

    currentQuestion: {
      type: String,
      default: null,
    },

    currentIndex: {
      type: Number,
      default: 0,
    },

    questions: {
      type: [questionSchema],
      default: [],
    },

    // Status
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", sessionSchema);