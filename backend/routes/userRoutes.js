const router = require("express").Router();
const User = require("../models/User");

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
    user.status = "online";
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

module.exports = router;
