const express = require("express");
const cors = require("cors");

const app = express();

// =========================
// CORS
// =========================

const allowedOrigins = [
  "http://localhost:5173",
  "https://prepal-five.vercel.app",
  "https://prepal-git-main-kanaks-projects-ce135129.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without an Origin header (Postman, curl, etc.)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("Blocked by CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight requests
app.options("*", cors());

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