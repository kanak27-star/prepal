const express = require("express");
const cors = require("cors");

const app = express();

// =========================
// CORS CONFIG (PRODUCTION READY)
// =========================

const allowedOrigins = [
  "http://localhost:5173",
  "https://prepal-git-main-kanaks-projects-ce135129.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman or mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// =========================
// BODY PARSERS
// =========================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =========================
// ROUTES
// =========================
app.use("/api/auth", require("./routes/auth"));
app.use("/api/interview", require("./routes/interview"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

// =========================
// HEALTH CHECK
// =========================
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

module.exports = app;