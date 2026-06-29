const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// helper
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

/* ---------------- SIGNUP ---------------- */
exports.signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });

  if (existing) {
    return res.status(400).json({
      success: false,
      message: "Email already exists",
    });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  res.status(201).json({
    success: true,
    token: generateToken(user._id),
    user,
  });
});

/* ---------------- LOGIN ---------------- */
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const token = generateToken(user._id);

  res.status(200).json({
    success: true,
    token,
    user,
  });
});

/* ---------------- GET ME ---------------- */
exports.getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});