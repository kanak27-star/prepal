const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth");
const validate = require("../middleware/validateRequest");
const { body } = require("express-validator");

// ✅ IMPORT FIRST (VERY IMPORTANT)
const {
  signup,
  login,
  getMe,
} = require("../controllers/authController");

// SIGNUP
router.post(
  "/signup",
  [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
  ],
  validate,
  signup
);

// LOGIN
router.post("/login", login);

// ME
router.get("/me", protect, getMe);

module.exports = router;