const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { promisify } = require("util");
exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.json({
      message: "Vous n'etes pas connecté",
    });
  }
  let decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return res.json({
      message: "L'utilisateur n'existe plus",
    });
  }
  req.user = freshUser;
  next();
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.json({
        message: "Vous n'avez pas la permission",
      });
    }
    next();
  };
};
