const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { forgotPassword, updatePassword } = require("../controllers/authController");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

router.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    createSendToken(user, 201, res);
  } catch (error) {
    console.log(error);
    res.json({
      message: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      message: "Entrez les coordonnées",
    });
  }
  const user = await User.findOne({ email: email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.json({
      message: "Incoorect password or email",
    });
  }
  createSendToken(user, 200, res);
});

router.post("/forgotPassword",forgotPassword)
router.patch("/updatePassword/:token",updatePassword)

module.exports = router;
