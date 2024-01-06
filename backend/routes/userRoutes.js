const jwt = require("jsonwebtoken");
const router = require("express").Router();
const User = require("../models/User");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} = require("../utils/VerifyToken");

// creating user
router.post("/", async (req, res) => {
  try {
    const { username, email, password, avatar, phoneNumber } = req.body;
    const user = await User.create({
      username,
      email,
      password,
      avatar,
      phoneNumber,
    });
    res.status(201).json({ status: "success", user });
  } catch (e) {
    let msg;
    if (e.code == 11000) {
      msg = "User already exists";
      res.status(401).json({ status: "failure", message: msg });
    } else {
      msg = e.message;
      console.log(e);
      res.status(400).json({ status: "failure", message: msg });
    }
  }
});

// login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.status = "online";
    await user.save();

    res
      .status(200)
      .json({ status: "success", user, accessToken, refreshToken });
  } catch (e) {
    res
      .status(401)
      .json({ status: "failure", message: "Incorrect email or password" });
  }
});

// Logout user
router.post("/logout", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ status: "failure", message: "User not found" });
    }

    res.status(200).json({ status: "success", message: "Logout successful" });
  } catch (e) {
    res
      .status(500)
      .json({ status: "failure", message: "Internal Server Error" });
  }
});
module.exports = router;
