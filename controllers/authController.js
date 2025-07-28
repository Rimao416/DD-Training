const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
const { promisify } = require("util");
const sendEmail = require("../utils/email");
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

exports.forgotPassword = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    return res.json({
      message: "Cet utilisateur n'existe pas",
    });
  }
  // Générer le token ici
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/users/resetPassword/${resetToken}`;
  const message = `Mot de passe oublié ? Confirmez votre identité ici ${resetURL}`;
  // ENVOYER UN MAIL
  try {
    await sendEmail({
      email: user.email,
      subject: "Votre token a une validité de 10 Minuites",
      message,
    });
    res.status(200).json({
      status: "success",
      message: "Le token est envoyé",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(400).json({
      status: "error",
      message: "Erreur lors de l'envoie du mail",
    });
  }
};

exports.updatePassword = async (req, res) => {
  // Get user based sur le token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  }).select("+password");
  if (!user) {
    return res.status(400).json({
      status: "error",
      message: "Le token est invalide ou a expiré",
    });
  }
  (user.password = req.body.password),
    (user.passwordConfirm = req.body.passwordConfirm),
    (user.passwordResetToken = undefined),
    (user.passwordResetExpires = undefined);
  await user.save();
  res.status(200).json({
    status: "success",
    message: "Mot de passe changé avec succès",
  });
};
