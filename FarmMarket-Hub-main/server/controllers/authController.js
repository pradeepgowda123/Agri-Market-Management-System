const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const Market = require("../models/Market");

const apiResponse = require("../utils/apiResponse");
const MESSAGES = require("../constants/messages");

const generateToken = require("../utils/generateToken");

// @desc    Register User
// @route   POST /api/auth/register
// @access  Public (Later only Super Admin)

const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    market
  } = req.body;

  // Required fields
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Name, Email and Password are required");
  }

  // Email already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // If role is admin, market is required
  if (role === "admin") {
    if (!market) {
      res.status(400);
      throw new Error("Market is required for admin");
    }

    const marketExists = await Market.findById(market);

    if (!marketExists) {
      res.status(404);
      throw new Error("Market not found");
    }
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    market: role === "admin" ? market : null,
  });

  apiResponse(
    res,
    201,
    true,
    MESSAGES.AUTH.REGISTER_SUCCESS,
    {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      market: user.market,
    }
  );
});


// @desc    Login User
// @route   POST /api/auth/login
// @access  Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check required fields
  if (!email || !password) {
    res.status(400);
    throw new Error("Email and Password are required");
  }

  // Find user by email
  const user = await User.findOne({ email }).populate("market");

  if (!user) {
    res.status(401);
    throw new Error(MESSAGES.AUTH.INVALID_CREDENTIALS);
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(401);
    throw new Error(MESSAGES.AUTH.INVALID_CREDENTIALS);
  }

  // Generate JWT
  const token = generateToken(user._id);

  apiResponse(
    res,
    200,
    true,
    MESSAGES.AUTH.LOGIN_SUCCESS,
    {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      market: user.market,
      token,
    }
  );
});


module.exports = {
  registerUser,
  loginUser,
};