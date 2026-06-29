const express = require("express");
const cors = require("cors");

const app = express();

// =========================
// MIDDLEWARE
// =========================

// CORS (PUT HERE ✅)
app.use(
  cors({
    origin: "http://localhost:5173", // change to Vercel URL later
    credentials: true,
  })
);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =========================
// ROUTES
// =========================
app.use("/api/auth", require("./routes/auth"));
app.use("/api/interview", require("./routes/interview"));
//app.use("/api/dashboard", require("./routes/dashboard"));

// =========================
// HEALTH CHECK
// =========================
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

module.exports = app;