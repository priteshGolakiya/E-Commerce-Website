// Import required modules
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { clearCookie } = require("cookie-parser");
const User = require("../../models/userModel");

// login route
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required." });
    return;
  }

  const foundUser = await User.findOne({ email });
  if (!foundUser) {
    res.status(401).json({ error: "User not found!" });
    return;
  }

  const isMatch = await bcrypt.compare(password, foundUser.password);
  if (!isMatch) {
    res.status(401).json({ error: "Incorrect password!" });
    return;
  }

  const user = {
    id: foundUser._id,
    name: foundUser.userName,
    email: foundUser.email,
    role: foundUser.role,
    profilePic: foundUser.profilePic,
  };

  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });

  const tokenOption = {
    httpOnly: true,
  };

  res.cookie("token", token, tokenOption).status(200).json({
    message: "Login successfully",
    data: { user, token },
    success: true,
    error: false,
  });
});

// Sign-up route
const signup = asyncHandler(async (req, res, next) => {
  const { userName, email, password, profilePic } = req.body;
  if (!userName || !email || !password) {
    res.status(400).json({ status: true, message: "Missing fields" });
    return;
  }

  const foundUser = await User.findOne({ email });
  if (foundUser) {
    res.status(409).json({ error: "Email already in use." });
    return;
  }

  const isFirstUser = (await User.countDocuments({})) === 0;
  const role = isFirstUser ? "admin" : "user";

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    userName,
    email,
    password: hashedPassword,
    role,
    profilePic,
  });

  await newUser.save();

  const user = {
    id: newUser._id,
    name: newUser.userName,
    role: newUser.role,
  };

  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });

  res.status(201).json({
    error: false,
    success: true,
    message: "User created successfully!",
    data: { user, token },
  });
});

const userDetails = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    const userData = {
      id: user._id,
      username: user.userName,
      email: user.email,
      role: user.role,
      profilePic: user.profilePic,
    };

    res.status(200).json({
      data: userData,
      error: false,
      success: true,
      message: "User details",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
});

const logout = asyncHandler(async (req, res, next) => {
  try {
    // Clear the token cookie
    res.clearCookie("token");

    // Optionally, perform any other logout logic such as removing tokens from the database

    // Send a response indicating successful logout
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
      error: false, // Keep consistent with success response
      // data: [], // Omit this line if no specific data is needed
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
});

module.exports = logout;

module.exports = { login, signup, userDetails, logout };
