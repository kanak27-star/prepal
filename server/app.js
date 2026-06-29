const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRoutes = require("./routes/auth");
const interviewRoutes = require("./routes/interview");

const errorHandler = require("./middleware/errorHandler");

const app = express();
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, try again later",
});

const morgan = require("morgan");

app.use(morgan("dev"));

app.use(limiter);
// SECURITY
app.use(helmet());

// CORS
app.use(
  cors({
    origin: "http://localhost:5173", // later change to frontend domain
    credentials: true,
  })
);

// BODY LIMIT
app.use(express.json({ limit: "10kb" }));

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/user", require("./routes/user"));

// HEALTH CHECK
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "PrepPal API running 🚀",
  });
});

// ERROR HANDLER (LAST)
app.use(errorHandler);

module.exports = app;